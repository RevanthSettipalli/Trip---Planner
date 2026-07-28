'use client';

import { useState } from 'react';
import { SlidersHorizontal, Sparkles, Send, History } from 'lucide-react';

interface RefinementBarProps {
  onRefine: (instruction: string) => void;
  isRefining: boolean;
  history?: string[];
}

export default function RefinementBar({ onRefine, isRefining, history = [] }: RefinementBarProps) {
  const [instruction, setInstruction] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim() || isRefining) return;
    onRefine(instruction.trim());
    setInstruction('');
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-sky-500 text-white">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-100">AI Refinement Loop</h3>
          <p className="text-[11px] text-slate-400">Want to adjust this plan? Type follow-up modifications below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g. Make Day 2 less intense on walking, or add a vegan ramen stop on Day 1..."
          disabled={isRefining}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          disabled={!instruction.trim() || isRefining}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
        >
          {isRefining ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Refining...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tweak Plan</span>
            </>
          )}
        </button>
      </form>

      {/* Refinement History Log */}
      {history.length > 0 && (
        <div className="pt-2 border-t border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <History className="w-3 h-3" /> Refinement History:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {history.map((prompt, idx) => (
              <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                "{prompt}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
