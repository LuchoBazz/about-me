export interface Pillar {
  title: string;
  icon: string;
  actions: string[];
}

export interface Goal {
  id: string;
  name: string;
  mainGoal: string;
  pillars: Pillar[];
  /** Completed actions keyed by "pillar-action" (see actionKey). */
  done: Record<string, true>;
  createdAt: number;
}

export interface GoalStats {
  pillarDone: number[];
  pillarTotal: number[];
  done: number;
  total: number;
}

export interface ParsedGrid {
  mainGoal: string;
  pillars: { title: string; actions: string[] }[];
}
