import { useEffect, useState } from 'react';
import { GoalEditor } from './components/GoalEditor';
import { Dialog } from './components/ui';
import { useGoals } from './hooks/useGoals';
import { useHash } from './hooks/useHash';
import { emptyGoal, exampleGoal } from './lib/model';
import type { Goal } from './types';
import { GoalView } from './views/GoalView';
import { HomeView } from './views/HomeView';

/** Client-only (render inside <BrowserOnly>): uses localStorage, hash routing and <dialog>. */
export default function HaradaApp() {
  const { goals, addGoal, updateGoal, deleteGoal, resetProgress, setDone } = useGoals();
  const [hash, setHash] = useHash();
  const [editing, setEditing] = useState<{ goal: Goal; isNew: boolean } | null>(null);

  const goalId = hash.startsWith('#goal-') ? hash.slice(6) : null;
  const goal = goalId ? goals.find((g) => g.id === goalId) : undefined;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [goalId]);

  const close = () => setEditing(null);
  const save = (g: Goal) => {
    if (editing?.isNew) {
      addGoal(g);
      setHash(`goal-${g.id}`);
    } else updateGoal(g);
    close();
  };

  return (
    <div className="min-h-[80vh] bg-stone-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {goalId === null ? (
        <HomeView goals={goals} onNew={() => setEditing({ goal: emptyGoal(), isNew: true })} onOpen={(id) => setHash(`goal-${id}`)} onLoadExample={() => addGoal(exampleGoal())} />
      ) : goal ? (
        <GoalView key={goal.id} goal={goal} onBack={() => setHash('')} onSetDone={(pi, ai, v) => setDone(goal.id, pi, ai, v)} onReset={() => resetProgress(goal.id)} onEdit={() => setEditing({ goal, isNew: false })} />
      ) : (
        <main className="mx-auto w-full max-w-xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">That goal no longer exists</h1>
          <p className="mt-2 text-slate-700 dark:text-slate-300">It may have been deleted in this browser.</p>
          <button type="button" onClick={() => setHash('')} className="mt-5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium dark:border-slate-600 dark:bg-slate-800">Back to all goals</button>
        </main>
      )}
      <Dialog open={editing !== null} onClose={close} label={editing?.isNew ? 'New goal' : 'Edit goal'} className="m-0 ml-auto h-full max-h-none w-full max-w-2xl bg-white p-0 text-slate-900 backdrop:bg-black/50 dark:bg-slate-900 dark:text-slate-100">
        {editing && (
          <GoalEditor key={editing.goal.id} initial={editing.goal} isNew={editing.isNew} onSave={save} onClose={close} onDelete={() => { deleteGoal(editing.goal.id); close(); setHash(''); }} />
        )}
      </Dialog>
    </div>
  );
}
