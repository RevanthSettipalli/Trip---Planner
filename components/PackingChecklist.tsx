'use client';

import { CheckSquare, Square, Luggage, CheckCircle2 } from 'lucide-react';
import { PackingItem } from '@/lib/types';

interface PackingChecklistProps {
  items: PackingItem[];
  onToggle: (id: string) => void;
}

export default function PackingChecklist({ items, onToggle }: PackingChecklistProps) {
  const packedCount = items.filter((i) => i.packed).length;
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Luggage className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Interactive Packing Checklist</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tailored essentials for this destination</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{packedCount} / {items.length} Packed ({progressPercent}%)</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-full bg-purple-500 transition-all duration-300"
        />
      </div>

      {/* Item Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-all ${
              item.packed
                ? 'bg-purple-50/60 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40 text-slate-400 line-through'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-300'
            }`}
          >
            {item.packed ? (
              <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <span className="font-semibold block">{item.item}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">{item.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
