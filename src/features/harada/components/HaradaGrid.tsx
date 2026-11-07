import { Check, Target } from 'lucide-react';
import { RING, actionKey, hasText, pct, pillarTitle } from '../lib/model';
import type { Goal } from '../types';
import { FOCUS, iconFor } from './ui';

type Toggle = (pillar: number, action: number, el: HTMLElement) => void;

const CELL =
  'group relative flex h-full w-full flex-col items-start rounded-[3px] border p-1 text-left text-[11px] leading-snug transition duration-150 hover:z-20 hover:shadow-md focus-visible:z-20 motion-safe:hover:scale-[1.04] md:p-1.5 lg:text-xs ' +
  FOCUS;
const SIZE = 'aspect-square md:aspect-auto md:min-h-[5.75rem] lg:min-h-[7rem]';
const mark = (m: boolean | null) =>
  m === false ? 'opacity-30' : m === true ? 'z-10 ring-2 ring-indigo-500 dark:ring-indigo-400' : '';

function Tip({ text, col }: { text: string; col: number }) {
  const pos = col < 3 ? 'left-0' : col > 5 ? 'right-0' : 'left-1/2 -translate-x-1/2';
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-full z-30 mb-1.5 w-56 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-normal leading-snug text-white opacity-0 shadow-lg transition-opacity group-focus-visible:opacity-100 dark:bg-slate-100 dark:text-slate-900 [@media(hover:hover)]:group-hover:opacity-100 ${pos}`}
    >
      {text}
    </span>
  );
}

function ActionCell(p: { pillar: number; index: number; text: string; done: boolean; matched: boolean | null; col: number; onToggle: Toggle }) {
  const n = `${p.pillar + 1}.${p.index + 1}`;
  if (!hasText(p.text))
    return (
      <div
        aria-label={`Action ${n}: not written yet`}
        className={`flex flex-col items-start rounded-[3px] border border-dashed border-slate-300 bg-white/50 p-1 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400 md:p-1.5 ${SIZE} ${mark(p.matched)}`}
      >
        <span className="flex h-full w-full items-center justify-center text-[10px] tabular-nums md:hidden">{n}</span>
        <span className="hidden text-[10px] font-semibold tabular-nums md:block">{n}</span>
        <span className="mt-1 hidden text-[11px] italic md:block">Empty. Add it with Edit goal.</span>
      </div>
    );
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={p.done}
      aria-label={`Action ${n}: ${p.text}`}
      onClick={(e) => p.onToggle(p.pillar, p.index, e.currentTarget)}
      className={`${CELL} ${SIZE} ${mark(p.matched)} ${
        p.done
          ? 'border-emerald-300 bg-emerald-50 text-slate-600 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-slate-400'
          : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
      }`}
    >
      <span className="flex h-full w-full items-center justify-center md:hidden">
        {p.done ? (
          <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-400" strokeWidth={3} aria-hidden="true" />
        ) : (
          <span className="text-[10px] font-medium tabular-nums text-slate-600 dark:text-slate-400">{n}</span>
        )}
      </span>
      <span className="hidden w-full items-center justify-between md:flex">
        <span className="text-[10px] font-semibold tabular-nums text-slate-600 dark:text-slate-400">{n}</span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border ${
            p.done
              ? 'border-emerald-700 bg-emerald-700 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-slate-950'
              : 'border-slate-400 dark:border-slate-500'
          }`}
        >
          {p.done && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
        </span>
      </span>
      <span className={`mt-1 hidden md:line-clamp-5 ${p.done ? 'line-through decoration-slate-400 dark:decoration-slate-500' : ''}`}>
        {p.text}
      </span>
      <Tip text={p.text} col={p.col} />
    </button>
  );
}

function PillarCell(p: { index: number; goal: Goal; doneCount: number; total: number; matched: boolean | null; col: number; onOpen: (i: number) => void }) {
  const pillar = p.goal.pillars[p.index];
  const Icon = iconFor(pillar.icon);
  const title = pillarTitle(pillar, p.index);
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`Pillar ${p.index + 1}: ${title}. ${p.doneCount} of ${p.total} actions completed. Open details.`}
      onClick={() => p.onOpen(p.index)}
      className={`${CELL} ${SIZE} border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-50 ${mark(p.matched)}`}
    >
      <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 md:hidden">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="text-[9px] font-semibold tabular-nums">{p.doneCount}/{p.total}</span>
      </span>
      <span className="hidden w-full items-center justify-between md:flex">
        <Icon className="h-4 w-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />
        <span className="text-[10px] font-semibold tabular-nums text-blue-800 dark:text-blue-200">{p.doneCount}/{p.total}</span>
      </span>
      <span className="mt-1 hidden font-semibold md:line-clamp-4">{title}</span>
      <span className="mt-auto hidden h-1 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900 md:block" aria-hidden="true">
        <span className="block h-full rounded-full bg-blue-600 transition-[width] duration-500 dark:bg-blue-400" style={{ width: `${pct(p.doneCount, p.total)}%` }} />
      </span>
      <Tip text={title} col={p.col} />
    </button>
  );
}

function MainCell({ text, percent, matched, col }: { text: string; percent: number; matched: boolean | null; col: number }) {
  return (
    <div
      role="group"
      aria-label={`Main goal: ${text} Overall progress ${percent} percent.`}
      className={`group relative flex flex-col items-center justify-center rounded-[3px] border border-amber-400 bg-amber-200 p-1 text-amber-950 hover:z-20 dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-50 md:items-start md:justify-start md:p-1.5 ${SIZE} ${mark(matched)}`}
    >
      <span className="flex flex-col items-center gap-0.5 md:hidden">
        <Target className="h-4 w-4" aria-hidden="true" />
        <span className="text-[10px] font-bold tabular-nums">{percent}%</span>
      </span>
      <span className="hidden w-full items-center justify-between md:flex">
        <Target className="h-4 w-4" aria-hidden="true" />
        <span className="text-[11px] font-bold tabular-nums">{percent}%</span>
      </span>
      <span className="mt-1 hidden text-[11px] font-bold leading-tight md:line-clamp-[8] lg:text-[13px]">{text}</span>
      <Tip text={text} col={col} />
    </div>
  );
}

export interface HaradaGridProps {
  goal: Goal;
  pillarDone: number[];
  pillarTotal: number[];
  percent: number;
  /** lowercase search query; "" disables highlighting */
  query: string;
  onToggle: Toggle;
  onOpenPillar: (i: number) => void;
}

export function HaradaGrid(p: HaradaGridProps) {
  const match = (s: string): boolean | null => (p.query === '' ? null : s.toLowerCase().includes(p.query));
  const pillarCell = (i: number, key: number, col: number) => (
    <PillarCell key={key} index={i} goal={p.goal} doneCount={p.pillarDone[i]} total={p.pillarTotal[i]} matched={match(p.goal.pillars[i].title)} col={col} onOpen={p.onOpenPillar} />
  );
  return (
    <div id="grid" className="grid grid-cols-3 gap-1 md:gap-2">
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => {
          const block = r * 3 + c;
          const isCenter = block === 4;
          const blockPillar = RING.indexOf(block as (typeof RING)[number]);
          return (
            <div
              key={block}
              role="group"
              aria-label={isCenter ? 'Main goal and the eight pillars' : `Pillar ${blockPillar + 1}: ${pillarTitle(p.goal.pillars[blockPillar], blockPillar)}`}
              className={`grid grid-cols-3 gap-px rounded-md p-px md:gap-0.5 md:p-0.5 ${
                isCenter ? 'bg-amber-100 ring-1 ring-amber-300 dark:bg-amber-950/40 dark:ring-amber-800' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            >
              {Array.from({ length: 9 }, (_, cell) => {
                const col = c * 3 + (cell % 3);
                const slot = RING.indexOf(cell as (typeof RING)[number]);
                if (isCenter) return cell === 4 ? <MainCell key={cell} text={p.goal.mainGoal} percent={p.percent} matched={match(p.goal.mainGoal)} col={col} /> : pillarCell(slot, cell, col);
                if (cell === 4) return pillarCell(blockPillar, cell, col);
                const text = p.goal.pillars[blockPillar].actions[slot];
                return (
                  <ActionCell key={cell} pillar={blockPillar} index={slot} text={text} done={!!p.goal.done[actionKey(blockPillar, slot)]} matched={match(text)} col={col} onToggle={p.onToggle} />
                );
              })}
            </div>
          );
        }),
      )}
    </div>
  );
}
