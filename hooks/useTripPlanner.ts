'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TripItinerary, ApiErrorResponse, SimulationMode, ItineraryStop } from '@/lib/types';
import { getSavedTrips, saveTrip, deleteTrip, getActiveTripId } from '@/lib/storage';
import { SAMPLE_TRIPS } from '@/lib/mock-data';

export function useTripPlanner() {
  const [activeTrip, setActiveTrip] = useState<TripItinerary | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripItinerary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [simulationMode, setSimulationMode] = useState<SimulationMode>('none');
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Undo buffer for deleted stops
  const [deletedStopBackup, setDeletedStopBackup] = useState<{
    stop: ItineraryStop;
    dayNumber: number;
    index: number;
  } | null>(null);

  // Race condition protection refs
  const activeRequestIdRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load saved trips on mount
  useEffect(() => {
    const loadedTrips = getSavedTrips();
    setSavedTrips(loadedTrips);
    
    const activeId = getActiveTripId();
    if (activeId) {
      const found = loadedTrips.find(t => t.id === activeId);
      if (found) {
        setActiveTrip(found);
        return;
      }
    }

    // Default demo trip if no saved trip exists
    if (loadedTrips.length === 0) {
      setActiveTrip(SAMPLE_TRIPS.tokyo);
    } else {
      setActiveTrip(loadedTrips[0]);
    }
  }, []);

  // Show auto-expiring toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  }, []);

  // Generate new trip from prompt
  const generateTrip = async (userPrompt: string) => {
    setError(null);
    setIsLoading(true);

    // Cancel any in-flight request to prevent race conditions
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const requestId = Date.now();
    activeRequestIdRef.current = requestId;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, simulationMode }),
        signal: abortController.signal,
      });

      // Ignore stale response if user initiated another request in the meantime
      if (requestId !== activeRequestIdRef.current) {
        console.log(`Dropped stale response for request #${requestId}`);
        return;
      }

      if (!res.ok) {
        const errPayload: ApiErrorResponse = await res.json();
        throw errPayload;
      }

      const tripData: TripItinerary = await res.json();

      // Final check before state update
      if (requestId === activeRequestIdRef.current) {
        setActiveTrip(tripData);
        setActiveDayTab(1);
        const updatedList = saveTrip(tripData);
        setSavedTrips(updatedList);
        showToast(`✨ Generated itinerary for ${tripData.destination}!`);
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted for new request');
        return;
      }
      if (requestId === activeRequestIdRef.current) {
        console.error('Trip generation error:', err);
        setError({
          message: err.message || 'An unexpected error occurred while generating your itinerary.',
          code: err.code || 'MODEL_ERROR',
          details: err.details,
          rawOutputSnippet: err.rawOutputSnippet,
        });
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  // Refine existing trip with follow-up prompt
  const refineTrip = async (refinementInstruction: string) => {
    if (!activeTrip) return;

    setError(null);
    setIsRefining(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const requestId = Date.now();
    activeRequestIdRef.current = requestId;

    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentItinerary: activeTrip,
          refinementInstruction,
          simulationMode,
        }),
        signal: abortController.signal,
      });

      if (requestId !== activeRequestIdRef.current) return;

      if (!res.ok) {
        const errPayload: ApiErrorResponse = await res.json();
        throw errPayload;
      }

      const updatedTrip: TripItinerary = await res.json();

      if (requestId === activeRequestIdRef.current) {
        setActiveTrip(updatedTrip);
        const updatedList = saveTrip(updatedTrip);
        setSavedTrips(updatedList);
        showToast('✨ Itinerary refined successfully!');
      }

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      if (requestId === activeRequestIdRef.current) {
        console.error('Refine error:', err);
        setError({
          message: err.message || 'Failed to refine itinerary.',
          code: err.code || 'MODEL_ERROR',
          details: err.details,
        });
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setIsRefining(false);
      }
    }
  };

  // Move stop up or down in day sequence
  const reorderStop = (dayNumber: number, fromIndex: number, toIndex: number) => {
    if (!activeTrip) return;

    const dayIndex = activeTrip.days.findIndex((d) => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const updatedDays = [...activeTrip.days];
    const stops = [...updatedDays[dayIndex].stops];

    if (toIndex < 0 || toIndex >= stops.length) return;

    const [movedStop] = stops.splice(fromIndex, 1);
    stops.splice(toIndex, 0, movedStop);

    updatedDays[dayIndex] = { ...updatedDays[dayIndex], stops };
    const updatedTrip = { ...activeTrip, days: updatedDays };

    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
  };

  // Remove a stop with undo option
  const removeStop = (dayNumber: number, stopId: string) => {
    if (!activeTrip) return;

    const dayIndex = activeTrip.days.findIndex((d) => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const stops = activeTrip.days[dayIndex].stops;
    const stopIndex = stops.findIndex((s) => s.id === stopId);
    if (stopIndex === -1) return;

    const stopToRemove = stops[stopIndex];
    setDeletedStopBackup({ stop: stopToRemove, dayNumber, index: stopIndex });

    const updatedStops = stops.filter((s) => s.id !== stopId);
    const updatedDays = [...activeTrip.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], stops: updatedStops };

    const updatedTrip = { ...activeTrip, days: updatedDays };
    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
    showToast(`Removed "${stopToRemove.title}".`);
  };

  // Undo stop deletion
  const undoRemoveStop = () => {
    if (!deletedStopBackup || !activeTrip) return;

    const { stop, dayNumber, index } = deletedStopBackup;
    const dayIndex = activeTrip.days.findIndex((d) => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const updatedStops = [...activeTrip.days[dayIndex].stops];
    updatedStops.splice(index, 0, stop);

    const updatedDays = [...activeTrip.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], stops: updatedStops };

    const updatedTrip = { ...activeTrip, days: updatedDays };
    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
    setDeletedStopBackup(null);
    showToast(`Restored "${stop.title}".`);
  };

  // Edit existing stop fields
  const editStop = (dayNumber: number, updatedStop: ItineraryStop) => {
    if (!activeTrip) return;

    const dayIndex = activeTrip.days.findIndex((d) => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const updatedStops = activeTrip.days[dayIndex].stops.map((s) =>
      s.id === updatedStop.id ? updatedStop : s
    );

    const updatedDays = [...activeTrip.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], stops: updatedStops };

    const updatedTrip = { ...activeTrip, days: updatedDays };
    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
    showToast(`Updated "${updatedStop.title}".`);
  };

  // Add a new manual stop to a day
  const addStop = (dayNumber: number, newStop: Omit<ItineraryStop, 'id'>) => {
    if (!activeTrip) return;

    const dayIndex = activeTrip.days.findIndex((d) => d.dayNumber === dayNumber);
    if (dayIndex === -1) return;

    const createdStop: ItineraryStop = {
      ...newStop,
      id: `manual-stop-${Date.now()}`,
    };

    const updatedStops = [...activeTrip.days[dayIndex].stops, createdStop];
    const updatedDays = [...activeTrip.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], stops: updatedStops };

    const updatedTrip = { ...activeTrip, days: updatedDays };
    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
    showToast(`Added "${createdStop.title}" to Day ${dayNumber}.`);
  };

  // Toggle item in packing list
  const togglePackingItem = (itemId: string) => {
    if (!activeTrip) return;

    const updatedPacking = activeTrip.packingList.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );

    const updatedTrip = { ...activeTrip, packingList: updatedPacking };
    setActiveTrip(updatedTrip);
    setSavedTrips(saveTrip(updatedTrip));
  };

  // Select a trip from history
  const selectTrip = (tripId: string) => {
    const found = savedTrips.find((t) => t.id === tripId);
    if (found) {
      setActiveTrip(found);
      setActiveDayTab(1);
    }
  };

  // Delete a saved trip
  const removeSavedTrip = (tripId: string) => {
    const remaining = deleteTrip(tripId);
    setSavedTrips(remaining);
    if (activeTrip?.id === tripId) {
      setActiveTrip(remaining[0] || null);
    }
    showToast('Deleted trip session.');
  };

  return {
    activeTrip,
    savedTrips,
    isLoading,
    isRefining,
    error,
    setError,
    simulationMode,
    setSimulationMode,
    activeDayTab,
    setActiveDayTab,
    toastMessage,
    deletedStopBackup,
    generateTrip,
    refineTrip,
    reorderStop,
    removeStop,
    undoRemoveStop,
    editStop,
    addStop,
    togglePackingItem,
    selectTrip,
    removeSavedTrip,
  };
}
