import { Plus, Sparkles, Trophy } from 'lucide-react';
import { BTN, BTN_PRIMARY, FOCUS, ProgressBar } from '../components/ui';
import { RING, actionKey, goalStats, hasText, pct, pillarTitle } from '../lib/model';
import type { Goal } from '../types';

function MiniGrid({ goal }: { goal: Goal }) {
  return (
    <div aria-hidden="true" className="grid h-[84px] w-[84px] shrink-0 grid-cols-3 gap-[3px]">
      {Array.from({ length: 9 }, (_, b) => {
        const center = b === 4;
        const bp = RING.indexOf(b as (typeof RING)[number]);
        return (
          <div key={b} className="grid grid-cols-3 gap-px">
            {Array.from({ length: 9 }, (_, c) => {
              let cls: string;
              if (center) cls = c === 4 ? 'bg-amber-400 dark:bg-amber-500' : 'bg-blue-400 dark:bg-blue-500';
              else if (c === 4) cls = 'bg-blue-400 dark:bg-blue-500';
              else {
                const slot = RING.indexOf(c as (typeof RING)[number]);
                cls = hasText(goal.pillars[bp].actions[slot])
                  ? goal.done[actionKey(bp, slot)] ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-slate-300 dark:bg-slate-600'
                  : 'bg-slate-200/60 dark:bg-slate-800';
              }
              return <span key={c} className={`block ${cls}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

function GoalCard({ goal, onOpen }: { goal: Goal; onOpen: (id: string) => void }) {
  const s = goalStats(goal);
  const percent = pct(s.done, s.total);
  let focus = -1;
  let lowest = 101;
  s.pillarDone.forEach((d, i) => {
    if (s.pillarTotal[i] === 0 || d === s.pillarTotal[i]) return;
    const v = pct(d, s.pillarTotal[i]);
    if (v < lowest) { lowest = v; focus = i; }
  });
  const complete = s.total > 0 && s.done === s.total;
  return (
    <a
      href={`#goal-${goal.id}`}
      onClick={(e) => { e.preventDefault(); onOpen(goal.id); }}
      className={`flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 no-underline transition hover:border-blue-400 hover:text-slate-900 hover:no-underline hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:text-slate-100 ${FOCUS}`}
    >
      <div className="flex gap-4">
        <MiniGrid goal={goal} />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold leading-snug">{goal.name}</h2>
          <p className="mt-1 line-clamp-3 text-sm text-slate-700 dark:text-slate-300">{goal.mainGoal || 'No main goal written yet.'}</p>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-slate-700 dark:text-slate-300">{s.done} of {s.total} actions</span>
          <span className="text-lg font-extrabold tabular-nums">{percent}%</span>
        </div>
        <div className="mt-1.5"><ProgressBar value={percent} label={`Progress for ${goal.name}`} /></div>
        <p className="mt-2 flex min-h-5 items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          {complete ? (<><Trophy className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />All actions done</>)
            : focus >= 0 ? <>Next focus: {pillarTitle(goal.pillars[focus], focus)}</>
            : <>Open it and write your actions</>}
        </p>
      </div>
    </a>
  );
}

export function HomeView(p: { goals: Goal[]; onNew: () => void; onOpen: (id: string) => void; onLoadExample: () => void }) {
  const all = p.goals.map(goalStats);
  const done = all.reduce((a, s) => a + s.done, 0);
  const total = all.reduce((a, s) => a + s.total, 0);
  const summary = [
    { label: p.goals.length === 1 ? 'Goal' : 'Goals', value: String(p.goals.length) },
    { label: 'Actions done', value: `${done}/${total}` },
    { label: 'Overall progress', value: `${pct(done, total)}%` },
  ];
  return (
    <>
      <header className="mx-auto w-full max-w-[1180px] px-3 pt-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">My Harada goals</h1>
            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">One grid per goal. Open a goal to check off its actions.</p>
          </div>
          <button type="button" onClick={p.onNew} className={BTN_PRIMARY}><Plus className="h-4 w-4" aria-hidden="true" />New goal</button>
        </div>
        {p.goals.length > 0 && (
          <section aria-label="Summary" className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-700 dark:bg-slate-700">
            {summary.map((x) => (
              <div key={x.label} className="bg-white p-3 dark:bg-slate-900 sm:p-4">
                <p className="text-xl font-extrabold tabular-nums sm:text-2xl">{x.value}</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 sm:text-sm">{x.label}</p>
              </div>
            ))}
          </section>
        )}
      </header>
      <main className="mx-auto w-full max-w-[1180px] px-3 pb-12 pt-6 sm:px-6">
        {p.goals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold">No goals yet</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-700 dark:text-slate-300">Create your first Harada grid, or load the B2 English example to see how a finished one looks.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={p.onNew} className={BTN_PRIMARY}><Plus className="h-4 w-4" aria-hidden="true" />Create a goal</button>
              <button type="button" onClick={p.onLoadExample} className={BTN}><Sparkles className="h-4 w-4" aria-hidden="true" />Load the example</button>
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.goals.map((g) => (<li key={g.id}><GoalCard goal={g} onOpen={p.onOpen} /></li>))}
            <li>
              <button type="button" onClick={p.onNew} className={`flex h-full min-h-[10rem] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-400 p-4 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300 ${FOCUS}`}>
                <Plus className="h-6 w-6" aria-hidden="true" />New goal
              </button>
            </li>
          </ul>
        )}
      </main>
    </>
  );
}
