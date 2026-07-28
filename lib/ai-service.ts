import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripItinerary, ApiErrorResponse, SimulationMode } from './types';
import { parseAndValidateTripResponse } from './schema';
import { generateMockItinerary } from './mock-data';

const SYSTEM_PROMPT = `
You are an expert travel consultant AI. You MUST respond with ONLY raw JSON matching the following schema.
Do NOT include markdown wrapping like \`\`\`json or preambles.

Expected JSON Structure:
{
  "title": "Short catchy trip name",
  "destination": "City, Country",
  "durationDays": number,
  "estimatedTotalBudget": number,
  "currency": "USD" | "EUR" | "GBP" | "JPY" etc.,
  "pace": "relaxed" | "moderate" | "fast-paced",
  "summary": "High-level overview of the trip experience",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme of the day",
      "dateNote": "Day 1",
      "summary": "Brief summary of day",
      "stops": [
        {
          "id": "stop-1-1",
          "title": "Title of place/activity",
          "category": "food" | "sightseeing" | "activity" | "relaxation" | "stay" | "transport",
          "description": "Engaging description of what to do",
          "timeOfDay": "morning" | "afternoon" | "evening" | "night",
          "durationMinutes": 90,
          "estimatedCost": 20,
          "locationName": "Neighborhood / Street address",
          "insiderTip": "Actionable tip for visitor",
          "openingHours": "e.g. 9:00 AM - 6:00 PM"
        }
      ]
    }
  ],
  "packingList": [
    {
      "id": "p1",
      "category": "Essentials" | "Clothing" | "Electronics" | "Documents" | "Miscellaneous",
      "item": "Item name",
      "packed": false
    }
  ],
  "budgetBreakdown": [
    {
      "category": "Sightseeing & Activities",
      "amount": 200,
      "percentage": 30
    },
    {
      "category": "Food & Dining",
      "amount": 300,
      "percentage": 45
    },
    {
      "category": "Transport",
      "amount": 100,
      "percentage": 15
    },
    {
      "category": "Miscellaneous",
      "amount": 70,
      "percentage": 10
    }
  ]
}
`;

/**
 * Executes prompt call to Gemini or fallback
 */
export async function callAIModel(
  userPrompt: string, 
  simulationMode: SimulationMode = 'none'
): Promise<TripItinerary> {
  // 1. Handle Evaluator Failure Simulation Modes directly for testing
  if (simulationMode !== 'none') {
    if (simulationMode === 'malformed_json') {
      const badText = `{"title": "Broken Trip", "days": [ { "dayNumber": 1, "stops": [{"title": "Unclosed stop"`;
      return parseAndValidateTripResponse(badText, userPrompt);
    }
    if (simulationMode === 'wrong_schema') {
      const wrongShape = JSON.stringify({ tripName: "Wrong Keys", totalDays: "five", items: "invalid" });
      return parseAndValidateTripResponse(wrongShape, userPrompt);
    }
    if (simulationMode === 'empty_response') {
      return parseAndValidateTripResponse("", userPrompt);
    }
    if (simulationMode === 'timeout') {
      await new Promise(res => setTimeout(res, 12000));
      const error: ApiErrorResponse = {
        message: "Request timed out after 10 seconds.",
        code: "TIMEOUT",
        details: "The LLM took too long to respond. Please try again."
      };
      throw error;
    }
    if (simulationMode === 'server_error') {
      const error: ApiErrorResponse = {
        message: "500 Internal Server Error: LLM Provider unavailable.",
        code: "MODEL_ERROR",
        details: "Simulated backend provider outage."
      };
      throw error;
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // 2. Zero-config Fallback Mode if no API key is provided
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    console.log("No GEMINI_API_KEY detected. Using intelligent Mock AI generator.");
    // Simulate brief network delay for realism
    await new Promise(r => setTimeout(r, 1200));
    return generateMockItinerary(userPrompt);
  }

  // 3. Real Gemini API Execution
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUSER TRIP REQUEST:\n"${userPrompt}"`;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return parseAndValidateTripResponse(text, userPrompt);
  } catch (err: any) {
    if (err.code || err.rawOutputSnippet) {
      throw err;
    }

    const errorPayload: ApiErrorResponse = {
      message: err.message || "Failed to generate itinerary with AI model.",
      code: "MODEL_ERROR",
      details: String(err)
    };
    throw errorPayload;
  }
}

/**
 * Handles refinement follow-ups on an existing itinerary
 */
export async function callAIRefine(
  currentItinerary: TripItinerary, 
  refinementInstruction: string,
  simulationMode: SimulationMode = 'none'
): Promise<TripItinerary> {
  const prompt = `Current Itinerary JSON:\n${JSON.stringify(currentItinerary, null, 2)}\n\nUser Refinement Request:\n"${refinementInstruction}"\n\nPlease return the modified full JSON itinerary reflecting the user's requested changes.`;
  
  const updatedTrip = await callAIModel(prompt, simulationMode);
  
  // Preserve original creation history and append refinement prompt
  updatedTrip.userPrompt = currentItinerary.userPrompt;
  updatedTrip.refinementPrompts = [
    ...(currentItinerary.refinementPrompts || []),
    refinementInstruction
  ];
  updatedTrip.updatedAt = new Date().toISOString();

  return updatedTrip;
}
