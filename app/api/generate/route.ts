import { NextRequest, NextResponse } from 'next/server';
import { callAIModel } from '@/lib/ai-service';
import { SimulationMode } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, simulationMode = 'none' } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { 
          message: 'Please provide a valid trip description prompt.', 
          code: 'INVALID_INPUT' 
        }, 
        { status: 400 }
      );
    }

    const itinerary = await callAIModel(prompt, simulationMode as SimulationMode);
    return NextResponse.json(itinerary, { status: 200 });

  } catch (error: any) {
    console.error('API /api/generate Error:', error);
    
    const statusCode = error.code === 'TIMEOUT' ? 504 : 500;
    return NextResponse.json(
      {
        message: error.message || 'Failed to process AI generation request',
        code: error.code || 'SERVER_ERROR',
        details: error.details || String(error),
        rawOutputSnippet: error.rawOutputSnippet
      },
      { status: statusCode }
    );
  }
}
