'use client';

import { useState } from 'react';
import { Sparkles, MapPin, Compass, Send, Zap } from 'lucide-react';

interface TripFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const SAMPLE_PROMPTS = [
  {
    title: "🌸 Tokyo Food & Anime",
    prompt: "4 days in Tokyo focusing on food, anime, historic shrines, and local hidden gems on a moderate budget."
  },
  {
    title: "🥐 Romantic Paris Escape",
    prompt: "3 days in Paris relaxed pace focused on vintage bistros, art museums, and sunset views along the Seine."
  },
  {
    title: "🌋 Iceland South Coast Roadtrip",
    prompt: "5 days road trip along Iceland South Coast visiting waterfalls, black sand beaches, and geothermal lagoons."
  },
  {
    title: "🍕 Rome & Amalfi Coast Highlights",
    prompt: "6 days in Rome and Amalfi coast with pasta making class, Pompeii ruins, and coastal boat tours."
  }
];

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [promptText, setPromptText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isLoading) return;
    onSubmit(promptText.trim());
  };

  const handleChipClick = (chipPrompt: string) => {
    setPromptText(chipPrompt);
    onSubmit(chipPrompt);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Where would you like to travel?</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Describe your trip in plain English — AI will format your custom itinerary.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g. 5 days in Kyoto and Osaka for a family with a 7-year-old child. Wants ramen, Nintendo World, historic temples, and easy walking pace."
            rows={3}
            disabled={isLoading}
            className="w-full px-4 py-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all resize-none disabled:opacity-50"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              type="submit"
              disabled={!promptText.trim() || isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium text-sm shadow-lg shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Planning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sample Prompt Chips */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Try an Example:</span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip.prompt)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/80 dark:border-slate-700/80 transition-all text-left flex items-center gap-1.5"
              >
                <span>{chip.title}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
