'use client';

import { useState } from 'react';
import { 
  Utensils, 
  Landmark, 
  Compass, 
  Sparkles, 
  Hotel, 
  Bus, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  DollarSign, 
  MapPin, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { ItineraryStop, StopCategory } from '@/lib/types';

interface StopCardProps {
  stop: ItineraryStop;
  index: number;
  totalStops: number;
  dayNumber: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit: (updatedStop: ItineraryStop) => void;
}

const CATEGORY_CONFIG: Record<StopCategory, { label: string; icon: any; colorClass: string }> = {
  food: { label: 'Food & Dining', icon: Utensils, colorClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200' },
  sightseeing: { label: 'Sightseeing', icon: Landmark, colorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200' },
  activity: { label: 'Activity', icon: Compass, colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200' },
  relaxation: { label: 'Relaxation', icon: Sparkles, colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200' },
  stay: { label: 'Hotel & Stay', icon: Hotel, colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200' },
  transport: { label: 'Transport', icon: Bus, colorClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200' },
};

export default function StopCard({
  stop,
  index,
  totalStops,
  dayNumber,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
}: StopCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(index === 0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Edit form state
  const [title, setTitle] = useState(stop.title);
  const [description, setDescription] = useState(stop.description);
  const [estimatedCost, setEstimatedCost] = useState(stop.estimatedCost);
  const [durationMinutes, setDurationMinutes] = useState(stop.durationMinutes);
  const [insiderTip, setInsiderTip] = useState(stop.insiderTip || '');

  const catInfo = CATEGORY_CONFIG[stop.category] || CATEGORY_CONFIG.sightseeing;
  const CategoryIcon = catInfo.icon;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...stop,
      title,
      description,
      estimatedCost: Number(estimatedCost),
      durationMinutes: Number(durationMinutes),
      insiderTip,
    });
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Index & Category Icon Badge */}
          <div className="flex flex-col items-center shrink-0">
            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center mb-1">
              {index + 1}
            </span>
            <div className={`p-2 rounded-xl border ${catInfo.colorClass}`}>
              <CategoryIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md border capitalize ${catInfo.colorClass}`}>
                {catInfo.label}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono capitalize">
                • {stop.timeOfDay}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug truncate">
              {stop.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {stop.locationName}
            </p>
          </div>
        </div>

        {/* Quick Actions (Reorder & Expand Controls) */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={onMoveUp}
              disabled={index === 0}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 transition-all"
              title="Move Up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onMoveDown}
              disabled={index === totalStops - 1}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 transition-all"
              title="Move Down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Details Drawer */}
      {isExpanded && !isEditing && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {stop.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              {stop.durationMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              Est. ${stop.estimatedCost}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              {stop.locationName}
            </span>
          </div>

          {stop.insiderTip && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Insider Tip:</strong>
                <span>{stop.insiderTip}</span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Stop</span>
            </button>
            <button
              onClick={onRemove}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Mode Inline Form */}
      {isEditing && (
        <form onSubmit={handleSaveEdit} className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Est. Cost ($)</label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Duration (min)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
