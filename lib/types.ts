export type StopCategory = 
  | 'food' 
  | 'sightseeing' 
  | 'activity' 
  | 'relaxation' 
  | 'stay' 
  | 'transport';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface ItineraryStop {
  id: string;
  title: string;
  category: StopCategory;
  description: string;
  timeOfDay: TimeOfDay;
  durationMinutes: number;
  estimatedCost: number;
  locationName: string;
  insiderTip?: string;
  openingHours?: string;
  lat?: number;
  lng?: number;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  dateNote?: string;
  summary?: string;
  stops: ItineraryStop[];
}

export interface BudgetCategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface PackingItem {
  id: string;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Documents' | 'Miscellaneous';
  item: string;
  packed: boolean;
}

export interface TripItinerary {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  estimatedTotalBudget: number;
  currency: string;
  pace: 'relaxed' | 'moderate' | 'fast-paced';
  summary: string;
  days: DayItinerary[];
  packingList: PackingItem[];
  budgetBreakdown: BudgetCategoryBreakdown[];
  createdAt: string;
  updatedAt: string;
  userPrompt: string;
  refinementPrompts?: string[];
}

export type SimulationMode = 
  | 'none' 
  | 'malformed_json' 
  | 'wrong_schema' 
  | 'timeout' 
  | 'server_error' 
  | 'empty_response';

export interface ApiErrorResponse {
  message: string;
  code: 'MALFORMED_JSON' | 'SCHEMA_VALIDATION_ERROR' | 'TIMEOUT' | 'API_KEY_MISSING' | 'MODEL_ERROR' | 'NETWORK_ERROR' | 'EMPTY_RESPONSE';
  details?: string;
  rawOutputSnippet?: string;
}
