import { useEffect, useMemo, useState } from 'react';
import { actionKey, exampleGoal, sanitizeGoals } from '../lib/model';
import type { Goal } from '../types';

// Persistence layer: swap this hook's body for an API/DB later; components only use the returned API.
const STORAGE_KEY = 'harada-hub-v1';

function load(): Goal[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? [exampleGoal()] : sanitizeGoals(JSON.parse(raw));
  } catch {
    return [exampleGoal()];
  }
}

export interface GoalsApi {
  goals: Goal[];
  addGoal: (g: Goal) => void;
  updateGoal: (g: Goal) => void;
  deleteGoal: (id: string) => void;
  resetProgress: (id: string) => void;
  setDone: (id: string, pillar: number, action: number, value: boolean) => void;
}

export function useGoals(): GoalsApi {
  const [goals, setGoals] = useState<Goal[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch {
      /* storage unavailable: keep working in memory */
    }
  }, [goals]);

  return useMemo<GoalsApi>(
    () => ({
      goals,
      addGoal: (g) => setGoals((p) => [...p, g]),
      updateGoal: (g) => setGoals((p) => p.map((x) => (x.id === g.id ? g : x))),
      deleteGoal: (id) => setGoals((p) => p.filter((x) => x.id !== id)),
      resetProgress: (id) => setGoals((p) => p.map((x) => (x.id === id ? { ...x, done: {} } : x))),
      setDone: (id, pi, ai, value) =>
        setGoals((p) =>
          p.map((x) => {
            if (x.id !== id) return x;
            const done = { ...x.done };
            if (value) done[actionKey(pi, ai)] = true;
            else delete done[actionKey(pi, ai)];
            return { ...x, done };
          }),
        ),
    }),
    [goals],
  );
}
