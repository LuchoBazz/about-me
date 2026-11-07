import { ArrowLeft, Pencil, RotateCcw, Search, TrendingUp, TriangleAlert, Trophy, Target, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HaradaGrid } from '../components/HaradaGrid';
import { PillarPanel } from '../components/PillarPanel';
import { BTN, BTN_DANGER, Dialog, FOCUS, ProgressBar, iconFor } from '../components/ui';
import { burst } from '../hooks/confetti';
import { actionKey, goalStats, pct, pillarTitle } from '../lib/model';
import type { Goal } from '../types';

const CHEERS = [
  'Nice work. One step closer.',
  'Done. Small steps add up.',
  'Checked off. Keep the streak going.',
  'Good. You are building momentum.',
  'Another one down.',
];

export function GoalView(p: {
  goal: Goal;
  onBack: () => void;
  onSetDone: (pillar: number, action: number, value: boolean) => void;
  onReset: () => void;
  onEdit: () => void;
}) {
  const { goal } = p;
  const [query, setQuery] = useState('');
  const [panel, setPanel] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  const stats = useMemo(() => goalStats(goal), [goal]);
  const percent = pct(stats.done, stats.total);
  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (q === '') return 0;
    const m = (s: string) => (s.toLowerCase().includes(q) ? 1 : 0);
    return goal.pillars.reduce((n, x) => n + m(x.title) + x.actions.reduce((k, a) => k + m(a), 0), m(goal.mainGoal));
  }, [q, goal]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(t);
  }, [toast]);

  const say = (text: string) => setToast({ id: Date.now(), text });

  const toggle = useCallback(
    (pi: number, ai: number, el: HTMLElement) => {
      const was = !!goal.done[actionKey(pi, ai)];
      p.onSetDone(pi, ai, !was);
      if (was) return;
      const r = el.getBoundingClientRect();
      const origin = { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight };
      if (stats.done + 1 === stats.total) {
        say(`Goal complete: all ${stats.total} actions done!`);
        void burst('grand', origin);
      } else if (stats.pillarDone[pi] + 1 === stats.pillarTotal[pi]) {
        say(`Pillar complete: ${pillarTitle(goal.pillars[pi], pi)}`);
        void burst('medium', origin);
      } else {
        say(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
        void burst('small', origin);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goal, stats, p.onSetDone],
  );

  const pcts = stats.pillarDone.map((d, i) => (stats.pillarTotal[i] === 0 ? null : pct(d, stats.pillarTotal[i])));
  const vals = pcts.filter((v): v is number => v !== null);
  const best = vals.length ? Math.max(...vals) : 0;
  const worst = vals.length ? Math.min(...vals) : 0;
  const bestIdx = pcts.indexOf(best);
  const worstIdx = pcts.indexOf(worst);
  const spread = best !== worst;

  return (
    <>
      <header className="mx-auto w-full max-w-[1180px] px-3 pt-6 sm:px-6">
        <a href="#" onClick={(e) => { e.preventDefault(); p.onBack(); }} className={`inline-flex items-center gap-1.5 rounded-md py-1 text-sm font-medium text-blue-800 hover:underline dark:text-blue-300 ${FOCUS}`}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />All goals
        </a>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{goal.name}</h1>
            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">Harada Method - Goal Achievement Grid</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={p.onEdit} className={BTN}><Pencil className="h-4 w-4" aria-hidden="true" />Edit goal</button>
            <button type="button" onClick={() => setConfirmReset(true)} className={BTN_DANGER}><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset progress</button>
          </div>
        </div>
        <section aria-label="Overall progress" className="mt-5 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{stats.done} of {stats.total} actions completed</p>
            <p className="text-2xl font-extrabold tabular-nums">{percent}%</p>
          </div>
          <div className="mt-2"><ProgressBar value={percent} label="Overall progress" /></div>
        </section>
        <div className="mt-4">
          <label htmlFor="harada-search" className="sr-only">Search the map</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <input
              id="harada-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the map by keyword"
              autoComplete="off"
              className={`w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${FOCUS}`}
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 ${FOCUS}`}>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p aria-live="polite" className="mt-1.5 min-h-5 text-sm text-slate-700 dark:text-slate-300">
            {q && (matches === 0 ? 'No matches. Try another word.' : `${matches} ${matches === 1 ? 'match' : 'matches'} highlighted`)}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-3 pb-12 sm:px-6">
        <section aria-label="Main goal" className="mb-3 flex gap-3 rounded-xl border border-amber-300 bg-amber-100 p-3 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-50 md:hidden">
          <Target className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-bold leading-snug">{goal.mainGoal}</p>
        </section>
        <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">Tap an action to check it off. Tap a pillar to see its 8 actions in a larger view.</p>
        <HaradaGrid goal={goal} pillarDone={stats.pillarDone} pillarTotal={stats.pillarTotal} percent={percent} query={q} onToggle={toggle} onOpenPillar={setPanel} />

        <section aria-labelledby="harada-stats" className="mt-10">
          <h2 id="harada-stats" className="text-xl font-bold">Quick stats</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Progress per pillar. Select one to open its actions.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {goal.pillars.map((x, i) => {
              const Icon = iconFor(x.icon);
              const v = pct(stats.pillarDone[i], stats.pillarTotal[i]);
              return (
                <li key={i}>
                  <button type="button" onClick={() => setPanel(i)} aria-haspopup="dialog" className={`w-full rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 ${FOCUS}`}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{i + 1}. {pillarTitle(x, i)}</span>
                      {spread && i === bestIdx && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                          <TrendingUp className="h-3 w-3" aria-hidden="true" />Most advanced
                        </span>
                      )}
                      {spread && i === worstIdx && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                          <TriangleAlert className="h-3 w-3" aria-hidden="true" />Needs attention
                        </span>
                      )}
                    </span>
                    <span className="mt-2 flex items-center gap-3">
                      <ProgressBar value={v} label={`Pillar ${i + 1} progress`} className="bg-blue-600 dark:bg-blue-400" />
                      <span className="w-20 text-right text-sm font-semibold tabular-nums">
                        {v}% <span className="font-normal text-slate-600 dark:text-slate-400">({stats.pillarDone[i]}/{stats.pillarTotal[i]})</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <Dialog open={panel !== null} onClose={() => setPanel(null)} label="Pillar details" className="m-0 ml-auto h-full max-h-none w-full max-w-md bg-white p-0 text-slate-900 backdrop:bg-black/50 dark:bg-slate-900 dark:text-slate-100">
        {panel !== null && (
          <PillarPanel goal={goal} index={panel} doneCount={stats.pillarDone[panel]} total={stats.pillarTotal[panel]} onClose={() => setPanel(null)} onToggle={toggle} onNavigate={setPanel} />
        )}
      </Dialog>

      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)} label="Reset progress" className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-black/50 dark:bg-slate-900 dark:text-slate-100">
        <div className="p-5">
          <h2 className="text-lg font-bold">Reset progress for this goal?</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">This clears all {stats.done} completed actions of "{goal.name}". Your other goals are not affected.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setConfirmReset(false)} className={BTN}>Keep progress</button>
            <button
              type="button"
              onClick={() => { p.onReset(); setConfirmReset(false); say('Progress reset. Fresh start.'); }}
              className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />Reset progress
            </button>
          </div>
        </div>
      </Dialog>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[1000] flex justify-center px-4">
        {toast && (
          <div key={toast.id} className="flex max-w-md items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
            <Trophy className="h-4 w-4 shrink-0 text-amber-400 dark:text-amber-600" aria-hidden="true" />{toast.text}
          </div>
        )}
      </div>
    </>
  );
}
