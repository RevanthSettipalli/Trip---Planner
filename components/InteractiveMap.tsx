'use client';

import { useState } from 'react';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';
import { ItineraryStop } from '@/lib/types';

interface InteractiveMapProps {
  stops: ItineraryStop[];
  dayNumber: number;
}

export default function InteractiveMap({ stops, dayNumber }: InteractiveMapProps) {
  const [selectedStopId, setSelectedStopId] = useState<string | null>(stops[0]?.id || null);

  const selectedStop = stops.find((s) => s.id === selectedStopId) || stops[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Day {dayNumber} Visual Route Map</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stops.length} stop location coordinates</p>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Geographic Overview
        </span>
      </div>

      {/* Styled Route Map Canvas Container */}
      <div className="relative w-full h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-4 flex flex-col justify-between shadow-inner">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Visual Connecting Path Line */}
        <div className="absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 -translate-y-1/2 rounded-full opacity-60 pointer-events-none" />

        {/* Stop Markers Along Path */}
        <div className="relative z-10 flex items-center justify-between h-full px-4">
          {stops.map((stop, idx) => {
            const isSelected = stop.id === selectedStopId;
            return (
              <button
                key={stop.id || idx}
                onClick={() => setSelectedStopId(stop.id)}
                className={`relative group flex flex-col items-center transition-all ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110 opacity-80'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-lg transition-all border-2 ${
                    isSelected
                      ? 'bg-sky-500 text-white border-white ring-4 ring-sky-500/30'
                      : 'bg-slate-800 text-slate-200 border-slate-700 group-hover:border-sky-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] font-semibold text-slate-300 mt-1 max-w-[80px] truncate text-center bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                  {stop.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Marker Detail Footer inside Map */}
        {selectedStop && (
          <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-xs text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <strong className="font-bold block text-slate-100">{selectedStop.title}</strong>
                <span className="text-[11px] text-slate-400">{selectedStop.locationName}</span>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStop.locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold transition-all flex items-center gap-1"
            >
              <Navigation className="w-3 h-3" />
              <span>Open Map</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
