import { TripItinerary } from './types';

const STORAGE_KEY = 'ai_trip_planner_saved_trips_v1';
const ACTIVE_TRIP_KEY = 'ai_trip_planner_active_id_v1';

export function getSavedTrips(): TripItinerary[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read trips from localStorage:', err);
    return [];
  }
}

export function saveTrip(trip: TripItinerary): TripItinerary[] {
  if (typeof window === 'undefined') return [];
  try {
    const currentTrips = getSavedTrips();
    const existingIndex = currentTrips.findIndex(t => t.id === trip.id);
    
    let updatedTrips: TripItinerary[];
    if (existingIndex >= 0) {
      updatedTrips = [...currentTrips];
      updatedTrips[existingIndex] = { ...trip, updatedAt: new Date().toISOString() };
    } else {
      updatedTrips = [{ ...trip, createdAt: new Date().toISOString() }, ...currentTrips];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    localStorage.setItem(ACTIVE_TRIP_KEY, trip.id);
    return updatedTrips;
  } catch (err) {
    console.error('Failed to save trip to localStorage:', err);
    return [];
  }
}

export function deleteTrip(tripId: string): TripItinerary[] {
  if (typeof window === 'undefined') return [];
  try {
    const currentTrips = getSavedTrips();
    const updatedTrips = currentTrips.filter(t => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    
    if (localStorage.getItem(ACTIVE_TRIP_KEY) === tripId) {
      localStorage.removeItem(ACTIVE_TRIP_KEY);
    }
    return updatedTrips;
  } catch (err) {
    console.error('Failed to delete trip from localStorage:', err);
    return [];
  }
}

export function getActiveTripId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_TRIP_KEY);
}
