'use client';

import { useState } from 'react';
import { AlertOctagon, RefreshCw, ChevronDown, ChevronUp, ShieldAlert, Code } from 'lucide-react';
import { ApiErrorResponse } from '@/lib/types';

interface ErrorBannerProps {
  error: ApiErrorResponse;
  onRetry: () => void;
  onDismiss?: () => void;
}

export default function ErrorBanner({ error, onRetry, onDismiss }: ErrorBannerProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="w-full bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900/60 rounded-2xl p-5 shadow-lg text-slate-800 dark:text-slate-100 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-500 text-white shrink-0 shadow-md">
            <AlertOctagon className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">
                AI Output Handling Error
              </h3>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-md bg-rose-200 dark:bg-rose-900/80 text-rose-900 dark:text-rose-300">
                {error.code}
              </span>
            </div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300 mt-1">
              {error.message}
            </p>
            {error.details && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                {error.details}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onRetry}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>

      {/* Expandable Technical Details & Raw Output Inspector */}
      {error.rawOutputSnippet && (
        <div className="mt-4 pt-3 border-t border-rose-200 dark:border-rose-900/40">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-semibold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showDetails ? 'Hide Raw AI Output' : 'Inspect Raw AI Output Snippet'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showDetails && (
            <div className="mt-2.5 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-40 border border-slate-800 shadow-inner">
              <pre>{error.rawOutputSnippet}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
