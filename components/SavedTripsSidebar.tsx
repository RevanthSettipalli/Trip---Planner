'use client';

import { useState } from 'react';
import { History, Calendar, MapPin, Trash2, ChevronRight, Compass, PlusCircle } from 'lucide-react';
import { TripItinerary } from '@/lib/types';

interface SavedTripsSidebarProps {
  savedTrips: TripItinerary[];
  activeTripId: string | undefined;
  onSelectTrip: (tripId: string) => void;
  onDeleteTrip: (tripId: string) => void;
  onNewTrip: () => void;
}

export default function SavedTripsSidebar({
  savedTrips,
  activeTripId,
  onSelectTrip,
  onDeleteTrip,
  onNewTrip,
}: SavedTripsSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Saved Sessions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{savedTrips.length} saved trips in memory</p>
          </div>
        </div>

        <button
          onClick={onNewTrip}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Trip</span>
        </button>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {savedTrips.map((t) => {
          const isActive = t.id === activeTripId;
          return (
            <div
              key={t.id}
              className={`group flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                isActive
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 font-semibold shadow-sm'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => onSelectTrip(t.id)}
                className="flex-1 min-w-0 text-left space-y-0.5"
              >
                <div className="flex items-center gap-1.5 truncate font-bold">
                  <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="truncate">{t.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                  <span>{t.durationDays} Days</span>
                  <span>•</span>
                  <span>{t.title}</span>
                </div>
              </button>

              <button
                onClick={() => onDeleteTrip(t.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete Session"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
