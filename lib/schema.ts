import { z } from 'zod';
import { TripItinerary, ApiErrorResponse } from './types';

const StopCategorySchema = z.enum([
  'food',
  'sightseeing',
  'activity',
  'relaxation',
  'stay',
  'transport',
]).catch('sightseeing');

const TimeOfDaySchema = z.enum([
  'morning',
  'afternoon',
  'evening',
  'night',
]).catch('morning');

export const ItineraryStopSchema = z.object({
  id: z.string().optional().transform((val, ctx) => val || `stop-${Math.random().toString(36).substring(2, 9)}`),
  title: z.string().min(1, "Stop title is required"),
  category: StopCategorySchema,
  description: z.string().default("Dynamic planned activity"),
  timeOfDay: TimeOfDaySchema,
  durationMinutes: z.coerce.number().min(5).default(60),
  estimatedCost: z.coerce.number().min(0).default(0),
  locationName: z.string().default("Location details provided upon arrival"),
  insiderTip: z.string().optional(),
  openingHours: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const DayItinerarySchema = z.object({
  dayNumber: z.coerce.number().min(1),
  theme: z.string().default("Explore"),
  dateNote: z.string().optional(),
  summary: z.string().optional(),
  stops: z.array(ItineraryStopSchema).min(1, "At least one stop per day is required"),
});

export const BudgetCategoryBreakdownSchema = z.object({
  category: z.string(),
  amount: z.coerce.number().min(0),
  percentage: z.coerce.number().min(0).max(100).default(25),
});

export const PackingItemSchema = z.object({
  id: z.string().optional().transform((val) => val || `pack-${Math.random().toString(36).substring(2, 9)}`),
  category: z.enum(['Essentials', 'Clothing', 'Electronics', 'Documents', 'Miscellaneous']).catch('Essentials'),
  item: z.string(),
  packed: z.boolean().default(false),
});

export const TripItinerarySchema = z.object({
  id: z.string().optional().transform((val) => val || `trip-${Date.now()}`),
  title: z.string().min(1).default("Custom Travel Plan"),
  destination: z.string().min(1).default("Destination"),
  durationDays: z.coerce.number().min(1).default(3),
  estimatedTotalBudget: z.coerce.number().min(0).default(500),
  currency: z.string().default("USD"),
  pace: z.enum(['relaxed', 'moderate', 'fast-paced']).catch('moderate'),
  summary: z.string().default("A custom generated travel itinerary based on your request."),
  days: z.array(DayItinerarySchema).min(1, "Itinerary must contain at least 1 day"),
  packingList: z.array(PackingItemSchema).default([
    { id: 'p1', category: 'Essentials', item: 'Passport / ID', packed: false },
    { id: 'p2', category: 'Electronics', item: 'Phone Charger', packed: false },
    { id: 'p3', category: 'Clothing', item: 'Comfortable Walking Shoes', packed: false }
  ]),
  budgetBreakdown: z.array(BudgetCategoryBreakdownSchema).default([
    { category: 'Sightseeing & Activities', amount: 200, percentage: 40 },
    { category: 'Food & Dining', amount: 150, percentage: 30 },
    { category: 'Local Transport', amount: 100, percentage: 20 },
    { category: 'Miscellaneous', amount: 50, percentage: 10 }
  ]),
  createdAt: z.string().optional().transform((val) => val || new Date().toISOString()),
  updatedAt: z.string().optional().transform((val) => val || new Date().toISOString()),
  userPrompt: z.string().optional().default("Custom request"),
  refinementPrompts: z.array(z.string()).optional().default([]),
});

/**
 * Robust JSON extraction and auto-repair function
 */
export function extractAndParseJSON(rawText: string): any {
  if (!rawText || rawText.trim().length === 0) {
    throw new Error("EMPTY_RESPONSE: The model returned an empty string.");
  }

  let sanitized = rawText.trim();

  // 1. Remove markdown code fence blocks if present (e.g. ```json ... ```)
  const markdownRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = sanitized.match(markdownRegex);
  if (match && match[1]) {
    sanitized = match[1].trim();
  }

  // 2. Locate boundaries of main JSON object if extra text exists before or after
  const firstBrace = sanitized.indexOf('{');
  const lastBrace = sanitized.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    sanitized = sanitized.substring(firstBrace, lastBrace + 1);
  }

  // 3. Attempt standard JSON parsing
  try {
    return JSON.parse(sanitized);
  } catch (initialError: any) {
    // 4. Attempt basic JSON repair heuristics
    try {
      let repaired = sanitized
        // Fix trailing commas in arrays/objects
        .replace(/,\s*([\]}])/g, '$1')
        // Ensure keys are double-quoted if missing quotes
        .replace(/([{,]\s*)([a-zA-Z0-9_]+?)\s*:/g, '$1"$2":');

      return JSON.parse(repaired);
    } catch (repairError) {
      throw new Error(`MALFORMED_JSON: Failed to parse model output into valid JSON. ${initialError.message}`);
    }
  }
}

/**
 * Validates and normalizes raw text into a guaranteed TripItinerary object
 */
export function parseAndValidateTripResponse(rawText: string, userPrompt: string): TripItinerary {
  let parsedObject: any;

  try {
    parsedObject = extractAndParseJSON(rawText);
  } catch (err: any) {
    const errorPayload: ApiErrorResponse = {
      message: err.message || "Failed to extract JSON from AI response.",
      code: err.message.startsWith("EMPTY_RESPONSE") ? "EMPTY_RESPONSE" : "MALFORMED_JSON",
      details: "The LLM response was not valid JSON format or was cut off.",
      rawOutputSnippet: rawText.substring(0, 300)
    };
    throw errorPayload;
  }

  // Ensure userPrompt is attached
  if (typeof parsedObject === 'object' && parsedObject !== null) {
    parsedObject.userPrompt = userPrompt;
  }

  const result = TripItinerarySchema.safeParse(parsedObject);

  if (!result.success) {
    const issueSummary = result.error.issues
      .map(i => `${i.path.join('.')}: ${i.message}`)
      .join("; ");

    const errorPayload: ApiErrorResponse = {
      message: "AI response did not match expected schema structure.",
      code: "SCHEMA_VALIDATION_ERROR",
      details: issueSummary,
      rawOutputSnippet: JSON.stringify(parsedObject, null, 2).substring(0, 300)
    };
    throw errorPayload;
  }

  // Double check IDs on stops & ensure dates are formatted
  const validatedTrip = result.data as TripItinerary;
  validatedTrip.days.forEach((day, dayIndex) => {
    day.stops.forEach((stop, stopIndex) => {
      if (!stop.id) {
        stop.id = `stop-${dayIndex + 1}-${stopIndex + 1}-${Math.random().toString(36).substr(2, 4)}`;
      }
    });
  });

  return validatedTrip;
}
