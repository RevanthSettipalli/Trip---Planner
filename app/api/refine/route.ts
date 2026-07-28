import { NextRequest, NextResponse } from 'next/server';
import { callAIRefine } from '@/lib/ai-service';
import { SimulationMode } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentItinerary, refinementInstruction, simulationMode = 'none' } = body;

    if (!currentItinerary || !refinementInstruction) {
      return NextResponse.json(
        { 
          message: 'Both currentItinerary and refinementInstruction are required.', 
          code: 'INVALID_INPUT' 
        }, 
        { status: 400 }
      );
    }

    const updatedItinerary = await callAIRefine(
      currentItinerary, 
      refinementInstruction, 
      simulationMode as SimulationMode
    );

    return NextResponse.json(updatedItinerary, { status: 200 });

  } catch (error: any) {
    console.error('API /api/refine Error:', error);
    
    return NextResponse.json(
      {
        message: error.message || 'Failed to refine itinerary',
        code: error.code || 'SERVER_ERROR',
        details: error.details || String(error)
      },
      { status: 500 }
    );
  }
}
