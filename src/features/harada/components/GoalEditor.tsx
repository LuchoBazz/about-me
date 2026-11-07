import { ClipboardPaste, TriangleAlert, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { ACTIONS_PER_PILLAR, hasText, parseHaradaText } from '../lib/model';
import type { Goal } from '../types';
import { BTN, BTN_PRIMARY, FOCUS, INPUT, iconFor } from './ui';

const shortName = (s: string): string => {
  const w = s.trim().split(/\s+/).slice(0, 6).join(' ');
  return w.length < s.trim().length ? `${w}...` : w;
};

export function GoalEditor(p: {
  initial: Goal;
  isNew: boolean;
  onSave: (g: Goal) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [goal, setGoal] = useState<Goal>(() => structuredClone(p.initial));
  const [errors, setErrors] = useState<string[]>([]);
  const [paste, setPaste] = useState('');
  const [pasteError, setPasteError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const setTitle = (pi: number, title: string) =>
    setGoal((g) => ({ ...g, pillars: g.pillars.map((x, i) => (i === pi ? { ...x, title } : x)) }));
  const setAction = (pi: number, ai: number, v: string) =>
    setGoal((g) => ({
      ...g,
      pillars: g.pillars.map((x, i) => (i === pi ? { ...x, actions: x.actions.map((a, j) => (j === ai ? v : a)) } : x)),
    }));

  const importPaste = () => {
    try {
      const parsed = parseHaradaText(paste);
      setGoal((g) => ({
        ...g,
        name: g.name.trim() || shortName(parsed.mainGoal),
        mainGoal: parsed.mainGoal || g.mainGoal,
        pillars: g.pillars.map((x, i) => ({
          ...x,
          title: parsed.pillars[i].title,
          actions: Array.from({ length: ACTIONS_PER_PILLAR }, (_, j) => parsed.pillars[i].actions[j] ?? ''),
        })),
      }));
      setPasteError('');
      setPaste('');
    } catch (e) {
      setPasteError(e instanceof Error ? e.message : 'Could not read that text.');
    }
  };

  const save = () => {
    const errs: string[] = [];
    if (!goal.name.trim()) errs.push('Give the goal a short name.');
    if (!goal.mainGoal.trim()) errs.push('Write the main goal.');
    goal.pillars.forEach((x, i) => {
      if (!x.title.trim()) errs.push(`Pillar ${i + 1} needs a title.`);
    });
    setErrors(errs);
    if (errs.length) return;
    p.onSave({
      ...goal,
      name: goal.name.trim(),
      mainGoal: goal.mainGoal.trim(),
      pillars: goal.pillars.map((x) => ({ ...x, title: x.title.trim(), actions: x.actions.map((a) => a.trim()) })),
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
        <h2 className="text-lg font-bold">{p.isNew ? 'New goal' : 'Edit goal'}</h2>
        <button type="button" onClick={p.onClose} aria-label="Close editor" className={`rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${FOCUS}`}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <details className="rounded-lg border border-slate-200 dark:border-slate-700" open={p.isNew}>
          <summary className={`flex cursor-pointer items-center gap-2 rounded-lg p-3 text-sm font-semibold ${FOCUS}`}>
            <ClipboardPaste className="h-4 w-4" aria-hidden="true" />Paste a ready-made grid
          </summary>
          <div className="space-y-2 border-t border-slate-200 p-3 dark:border-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Paste text with a "Main Goal" line and eight headings like "Pillar 1: Title", each followed by numbered actions. The form below fills in automatically.
            </p>
            <label htmlFor="harada-paste" className="sr-only">Grid text</label>
            <textarea
              id="harada-paste"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              rows={6}
              className={`${INPUT} font-mono text-xs`}
              placeholder={'Main Goal\nYour goal here\n\nPillar 1: First pillar\n1. First action\n2. Second action\n...'}
            />
            {pasteError && (
              <p role="alert" className="flex items-start gap-1.5 text-sm text-red-800 dark:text-red-300">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{pasteError}
              </p>
            )}
            <button type="button" onClick={importPaste} disabled={!paste.trim()} className={`${BTN} disabled:opacity-50`}>Fill the form</button>
          </div>
        </details>

        <div className="space-y-3">
          <div>
            <label htmlFor="harada-name" className="mb-1 block text-sm font-medium">Short name</label>
            <input id="harada-name" type="text" value={goal.name} onChange={(e) => setGoal({ ...goal, name: e.target.value })} className={INPUT} placeholder="e.g. Run a half marathon" />
          </div>
          <div>
            <label htmlFor="harada-main" className="mb-1 block text-sm font-medium">Main goal</label>
            <textarea id="harada-main" value={goal.mainGoal} onChange={(e) => setGoal({ ...goal, mainGoal: e.target.value })} rows={3} className={INPUT} placeholder="One sentence: what you want, and by when" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Pillars and actions</h3>
          {goal.pillars.map((x, pi) => {
            const Icon = iconFor(x.icon);
            return (
              <details key={pi} className="rounded-lg border border-slate-200 dark:border-slate-700">
                <summary className={`flex cursor-pointer items-center gap-2 rounded-lg p-3 text-sm ${FOCUS}`}>
                  <Icon className="h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate font-semibold">{pi + 1}. {x.title.trim() || 'Untitled pillar'}</span>
                  <span className="whitespace-nowrap text-xs tabular-nums text-slate-600 dark:text-slate-400">{x.actions.filter(hasText).length}/{ACTIONS_PER_PILLAR} actions</span>
                </summary>
                <div className="space-y-2 border-t border-slate-200 p-3 dark:border-slate-700">
                  <div>
                    <label htmlFor={`pt-${pi}`} className="mb-1 block text-xs font-medium">Pillar {pi + 1} title</label>
                    <input id={`pt-${pi}`} type="text" value={x.title} onChange={(e) => setTitle(pi, e.target.value)} className={INPUT} />
                  </div>
                  {x.actions.map((a, ai) => (
                    <div key={ai}>
                      <label htmlFor={`pa-${pi}-${ai}`} className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Action {pi + 1}.{ai + 1}</label>
                      <input id={`pa-${pi}-${ai}`} type="text" value={a} onChange={(e) => setAction(pi, ai, e.target.value)} className={INPUT} />
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>

        {errors.length > 0 && (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
            <p className="font-semibold">Fix this before saving:</p>
            <ul className="mt-1 list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 p-3 dark:border-slate-700">
        {p.isNew ? (
          <span />
        ) : confirmDelete ? (
          <span className="flex items-center gap-2 text-sm">
            Delete this goal and its progress?
            <button type="button" onClick={p.onDelete} className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">Delete</button>
            <button type="button" onClick={() => setConfirmDelete(false)} className={BTN}>Keep</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)} className={`${BTN} !border-red-300 !text-red-800 hover:!bg-red-50 dark:!border-red-800 dark:!text-red-300 dark:hover:!bg-red-950/50`}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />Delete goal
          </button>
        )}
        <span className="ml-auto flex gap-2">
          <button type="button" onClick={p.onClose} className={BTN}>Cancel</button>
          <button type="button" onClick={save} className={BTN_PRIMARY}>{p.isNew ? 'Create goal' : 'Save changes'}</button>
        </span>
      </div>
    </div>
  );
}
