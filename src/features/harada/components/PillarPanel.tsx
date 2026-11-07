import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { actionKey, hasText, pct, pillarTitle } from '../lib/model';
import type { Goal } from '../types';
import { BTN, FOCUS, ProgressBar, iconFor } from './ui';

export function PillarPanel(p: {
  goal: Goal;
  index: number;
  doneCount: number;
  total: number;
  onClose: () => void;
  onToggle: (pillar: number, action: number, el: HTMLElement) => void;
  onNavigate: (i: number) => void;
}) {
  const pillar = p.goal.pillars[p.index];
  const Icon = iconFor(pillar.icon);
  const n = p.goal.pillars.length;
  const prev = (p.index + n - 1) % n;
  const next = (p.index + 1) % n;
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500 dark:text-blue-950">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-blue-800 dark:text-blue-200">Pillar {p.index + 1} of {n}</p>
            <h2 className="text-lg font-bold leading-snug">{pillarTitle(pillar, p.index)}</h2>
          </div>
          <button type="button" onClick={p.onClose} aria-label="Close details" className={`rounded-md p-2 hover:bg-blue-100 dark:hover:bg-blue-900 ${FOCUS}`}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={pct(p.doneCount, p.total)} label={`Progress for pillar ${p.index + 1}`} className="bg-blue-600 dark:bg-blue-400" />
          <span className="whitespace-nowrap text-sm font-semibold tabular-nums">{p.doneCount}/{p.total}</span>
        </div>
      </div>
      <ul className="flex-1 space-y-2 overflow-y-auto p-4">
        {pillar.actions.map((text, i) => {
          const written = hasText(text);
          const done = !!p.goal.done[actionKey(p.index, i)];
          return (
            <li key={i}>
              <label
                className={`flex items-start gap-3 rounded-lg border p-3 text-sm leading-snug transition-colors focus-within:ring-2 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400 ${
                  !written
                    ? 'border-dashed border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                    : done
                      ? 'cursor-pointer border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                      : 'cursor-pointer border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/70'
                }`}
              >
                <input
                  type="checkbox"
                  checked={done && written}
                  disabled={!written}
                  onChange={(e) => p.onToggle(p.index, i, e.currentTarget)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-700 focus:outline-none"
                />
                <span className={done && written ? 'text-slate-600 line-through dark:text-slate-400' : ''}>
                  <span className="mr-1.5 font-semibold tabular-nums text-slate-600 dark:text-slate-400">{p.index + 1}.{i + 1}</span>
                  {written ? text : <em>Not written yet</em>}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between gap-2 border-t border-slate-200 p-3 dark:border-slate-700">
        <button type="button" onClick={() => p.onNavigate(prev)} className={BTN}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />Pillar {prev + 1}
        </button>
        <button type="button" onClick={() => p.onNavigate(next)} className={BTN}>
          Pillar {next + 1}<ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
