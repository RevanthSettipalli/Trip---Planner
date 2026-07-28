'use client';

import { DollarSign, PieChart } from 'lucide-react';
import { BudgetCategoryBreakdown } from '@/lib/types';

interface BudgetChartProps {
  breakdown: BudgetCategoryBreakdown[];
  totalBudget: number;
  currency: string;
}

const BAR_COLORS = [
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-indigo-500',
];

export default function BudgetChart({ breakdown, totalBudget, currency }: BudgetChartProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Estimated Budget Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Categorized expense estimation</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">Total Est.</span>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            {currency} ${totalBudget}
          </span>
        </div>
      </div>

      {/* Visual Stacked Bar */}
      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            style={{ width: `${item.percentage}%` }}
            className={`h-full ${BAR_COLORS[idx % BAR_COLORS.length]} transition-all duration-500`}
            title={`${item.category}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Legend & Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${BAR_COLORS[idx % BAR_COLORS.length]}`} />
              <span className="font-medium text-slate-700 dark:text-slate-300">{item.category}</span>
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-100">
              ${item.amount} <span className="text-slate-400 font-normal">({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
