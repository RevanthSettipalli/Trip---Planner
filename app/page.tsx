'use client';

import { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Sun, 
  Moon, 
  RotateCcw, 
  Github, 
  Layers, 
  Luggage, 
  PieChart, 
  Map, 
  SlidersHorizontal,
  Undo2
} from 'lucide-react';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import TripForm from '@/components/TripForm';
import FailureSimulator from '@/components/FailureSimulator';
import ErrorBanner from '@/components/ErrorBanner';
import ItineraryHeader from '@/components/ItineraryHeader';
import DayView from '@/components/DayView';
import InteractiveMap from '@/components/InteractiveMap';
import RefinementBar from '@/components/RefinementBar';
import BudgetChart from '@/components/BudgetChart';
import PackingChecklist from '@/components/PackingChecklist';
import SavedTripsSidebar from '@/components/SavedTripsSidebar';

export default function Home() {
  const {
    activeTrip,
    savedTrips,
    isLoading,
    isRefining,
    error,
    setError,
    simulationMode,
    setSimulationMode,
    activeDayTab,
    setActiveDayTab,
    toastMessage,
    deletedStopBackup,
    generateTrip,
    refineTrip,
    reorderStop,
    removeStop,
    undoRemoveStop,
    editStop,
    addStop,
    togglePackingItem,
    selectTrip,
    removeSavedTrip,
  } = useTripPlanner();

  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  const activeDay = activeTrip?.days.find((d) => d.dayNumber === activeDayTab) || activeTrip?.days[0];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Trip Craft <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold">AI Planner</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Structured AI Travel Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <span>{toastMessage}</span>
          {deletedStopBackup && (
            <button
              onClick={undoRemoveStop}
              className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all flex items-center gap-1"
            >
              <Undo2 className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Evaluator Failure Simulator Drawer */}
        <FailureSimulator
          currentMode={simulationMode}
          onModeChange={(mode) => setSimulationMode(mode)}
        />

        {/* Free-form Trip Request Form */}
        <TripForm onSubmit={generateTrip} isLoading={isLoading} />

        {/* Error Handling Banner */}
        {error && (
          <ErrorBanner
            error={error}
            onRetry={() => {
              setError(null);
              if (activeTrip?.userPrompt) {
                generateTrip(activeTrip.userPrompt);
              }
            }}
          />
        )}

        {/* Loading Skeleton Loader */}
        {isLoading && (
          <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-6 animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            <div className="flex items-center justify-center gap-3 py-6 text-sm text-sky-500 font-semibold">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Formatting day-by-day stops and JSON schema...</span>
            </div>
          </div>
        )}

        {/* Main Active Itinerary Display */}
        {!isLoading && activeTrip && (
          <div className="space-y-8">
            {/* Header Card */}
            <ItineraryHeader trip={activeTrip} />

            {/* AI Refinement Loop Bar */}
            <RefinementBar
              onRefine={refineTrip}
              isRefining={isRefining}
              history={activeTrip.refinementPrompts}
            />

            {/* Grid Layout: Main Timeline + Sidebar Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Columns: Day View & Timeline */}
              <div className="lg:col-span-2 space-y-8">
                <DayView
                  days={activeTrip.days}
                  activeDayTab={activeDayTab}
                  onSelectDayTab={setActiveDayTab}
                  onMoveStopUp={(dayNum, idx) => reorderStop(dayNum, idx, idx - 1)}
                  onMoveStopDown={(dayNum, idx) => reorderStop(dayNum, idx, idx + 1)}
                  onRemoveStop={removeStop}
                  onEditStop={editStop}
                  onAddStop={addStop}
                />

                {/* Geographic Visual Map */}
                {activeDay && (
                  <InteractiveMap
                    stops={activeDay.stops}
                    dayNumber={activeDay.dayNumber}
                  />
                )}
              </div>

              {/* Right Column: Multi-block widgets (Budget, Packing, Saved Sessions) */}
              <div className="space-y-6">
                {/* Budget Breakdown Chart */}
                <BudgetChart
                  breakdown={activeTrip.budgetBreakdown}
                  totalBudget={activeTrip.estimatedTotalBudget}
                  currency={activeTrip.currency}
                />

                {/* Tailored Packing List */}
                <PackingChecklist
                  items={activeTrip.packingList}
                  onToggle={togglePackingItem}
                />

                {/* Session History Sidebar */}
                <SavedTripsSidebar
                  savedTrips={savedTrips}
                  activeTripId={activeTrip.id}
                  onSelectTrip={selectTrip}
                  onDeleteTrip={removeSavedTrip}
                  onNewTrip={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Trip Craft AI - Frontend Internship Assignment</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">React + Next.js App Router</span>
            <span>•</span>
            <span className="text-sky-500 font-semibold">Structured JSON Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
