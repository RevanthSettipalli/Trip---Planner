'use client';

import { useState } from 'react';
import { ShieldAlert, Bug, RefreshCw, Check, AlertTriangle, Clock, ServerOff } from 'lucide-react';
import { SimulationMode } from '@/lib/types';

interface FailureSimulatorProps {
  currentMode: SimulationMode;
  onModeChange: (mode: SimulationMode) => void;
}

const SIMULATION_OPTIONS: { mode: SimulationMode; label: string; icon: any; description: string }[] = [
  {
    mode: 'none',
    label: 'Normal AI Mode',
    icon: Check,
    description: 'Standard reliable parsing & real/mock LLM execution.',
  },
  {
    mode: 'malformed_json',
    label: 'Malformed JSON Output',
    icon: Bug,
    description: 'Simulates AI output with unclosed braces or syntax errors.',
  },
  {
    mode: 'wrong_schema',
    label: 'Wrong Schema Shape',
    icon: AlertTriangle,
    description: 'Simulates response missing required day arrays or key fields.',
  },
  {
    mode: 'timeout',
    label: 'Network Timeout',
    icon: Clock,
    description: 'Simulates slow 12-second latency exceeding timeout limits.',
  },
  {
    mode: 'server_error',
    label: 'Server 500 Failure',
    icon: ServerOff,
    description: 'Simulates backend API crash or rate limit error.',
  },
  {
    mode: 'empty_response',
    label: 'Empty AI Response',
    icon: ShieldAlert,
    description: 'Simulates model returning blank string or zero tokens.',
  },
];

export default function FailureSimulator({ currentMode, onModeChange }: FailureSimulatorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Evaluator Test Panel: Resilience & Failure Handling
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Active Mode: <strong className="text-amber-800 dark:text-amber-300 font-semibold">{currentMode}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 transition-all flex items-center gap-1.5"
        >
          <Bug className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Close Simulator' : 'Test Failure Modes'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {SIMULATION_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = currentMode === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => onModeChange(opt.mode)}
                className={`text-left p-3 rounded-lg border text-xs transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md font-semibold'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-amber-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                <p className={`text-[11px] leading-snug ${isSelected ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
