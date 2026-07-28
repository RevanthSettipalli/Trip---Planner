'use client';

import { useState } from 'react';
import { Calendar, Plus, Clock, DollarSign, Layers } from 'lucide-react';
import { DayItinerary, ItineraryStop } from '@/lib/types';
import StopCard from './StopCard';
import AddStopModal from './AddStopModal';

interface DayViewProps {
  days: DayItinerary[];
  activeDayTab: number;
  onSelectDayTab: (dayNumber: number) => void;
  onMoveStopUp: (dayNumber: number, index: number) => void;
  onMoveStopDown: (dayNumber: number, index: number) => void;
  onRemoveStop: (dayNumber: number, stopId: string) => void;
  onEditStop: (dayNumber: number, updatedStop: ItineraryStop) => void;
  onAddStop: (dayNumber: number, newStop: Omit<ItineraryStop, 'id'>) => void;
}

export default function DayView({
  days,
  activeDayTab,
  onSelectDayTab,
  onMoveStopUp,
  onMoveStopDown,
  onRemoveStop,
  onEditStop,
  onAddStop,
}: DayViewProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const activeDay = days.find((d) => d.dayNumber === activeDayTab) || days[0];

  // Calculate day total stats
  const totalMinutes = activeDay ? activeDay.stops.reduce((acc, s) => acc + s.durationMinutes, 0) : 0;
  const totalHours = (totalMinutes / 60).toFixed(1);
  const totalEstCost = activeDay ? activeDay.stops.reduce((acc, s) => acc + s.estimatedCost, 0) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Day Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => {
          const isActive = day.dayNumber === activeDayTab;
          return (
            <button
              key={day.dayNumber}
              onClick={() => onSelectDayTab(day.dayNumber)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day {day.dayNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {day.stops.length} stops
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Day Header & Stats Card */}
      {activeDay && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Day {activeDay.dayNumber} Overview
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {activeDay.theme}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                {activeDay.theme}
              </h2>
            </div>

            {/* Day Stat Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>{totalHours} hrs planned</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>${totalEstCost} day est.</span>
              </div>
            </div>
          </div>

          {activeDay.summary && (
            <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
              {activeDay.summary}
            </p>
          )}
        </div>
      )}

      {/* Stops List Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            <span>Itinerary Timeline & Stops ({activeDay?.stops.length || 0})</span>
          </h3>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/50 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Stop</span>
          </button>
        </div>

        {activeDay && activeDay.stops.length > 0 ? (
          <div className="space-y-3">
            {activeDay.stops.map((stop, index) => (
              <StopCard
                key={stop.id || index}
                stop={stop}
                index={index}
                totalStops={activeDay.stops.length}
                dayNumber={activeDay.dayNumber}
                onMoveUp={() => onMoveStopUp(activeDay.dayNumber, index)}
                onMoveDown={() => onMoveStopDown(activeDay.dayNumber, index)}
                onRemove={() => onRemoveStop(activeDay.dayNumber, stop.id)}
                onEdit={(updated) => onEditStop(activeDay.dayNumber, updated)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">No stops planned for this day yet.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow"
            >
              + Add First Stop
            </button>
          </div>
        )}
      </div>

      {/* Add Stop Modal */}
      <AddStopModal
        isOpen={isAddModalOpen}
        dayNumber={activeDayTab}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddStop}
      />
    </div>
  );
}
