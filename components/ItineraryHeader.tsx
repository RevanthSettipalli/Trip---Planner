'use client';

import { MapPin, Calendar, DollarSign, Gauge, Download, Share2, Printer, Sparkles } from 'lucide-react';
import { TripItinerary } from '@/lib/types';

interface ItineraryHeaderProps {
  trip: TripItinerary;
}

export default function ItineraryHeader({ trip }: ItineraryHeaderProps) {
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${trip.destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}-itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <MapPin className="w-3.5 h-3.5" />
              {trip.destination}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Calendar className="w-3.5 h-3.5" />
              {trip.durationDays} Days
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <DollarSign className="w-3.5 h-3.5" />
              ~{trip.currency} {trip.estimatedTotalBudget} Est. Total
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize">
              <Gauge className="w-3.5 h-3.5" />
              {trip.pace} Pace
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {trip.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {trip.summary}
          </p>

          {trip.userPrompt && (
            <p className="text-xs text-sky-300/80 italic font-mono bg-white/5 px-3 py-2 rounded-lg border border-white/10">
              Prompt: "{trip.userPrompt}"
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-all flex items-center gap-1.5 backdrop-blur-md"
            title="Export JSON Data"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-all flex items-center gap-1.5 backdrop-blur-md"
            title="Print / Save PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
