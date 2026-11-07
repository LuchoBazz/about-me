import {
  EXAMPLE_ICONS,
  EXAMPLE_ID,
  EXAMPLE_MAIN_GOAL,
  EXAMPLE_NAME,
  EXAMPLE_PILLARS,
} from '../data/example';
import type { Goal, GoalStats, ParsedGrid, Pillar } from '../types';

export const ACTIONS_PER_PILLAR = 8;
export const PILLAR_COUNT = 8;
/** Cell index (0-8) inside a 3x3 block -> pillar/action slot (the center, 4, is excluded). */
export const RING = [0, 1, 2, 3, 5, 6, 7, 8] as const;
export const DEFAULT_ICONS = ['flag', 'compass', 'bulb', 'rocket', 'puzzle', 'star', 'leaf', 'heart'];

export const actionKey = (pillar: number, action: number): string => `${pillar}-${action}`;
const KEY_RE = /^[0-7]-[0-7]$/;

export const pct = (done: number, total: number): number =>
  total === 0 ? 0 : Math.round((done / total) * 100);
export const hasText = (s: string): boolean => s.trim() !== '';
export const pillarTitle = (p: Pillar, i: number): string => p.title.trim() || `Pillar ${i + 1}`;

export const exampleGoal = (): Goal => ({
  id: EXAMPLE_ID,
  name: EXAMPLE_NAME,
  mainGoal: EXAMPLE_MAIN_GOAL,
  pillars: EXAMPLE_PILLARS.map((p, i) => ({ title: p.title, icon: EXAMPLE_ICONS[i], actions: [...p.actions] })),
  done: {},
  createdAt: 0,
});

export const emptyGoal = (): Goal => ({
  id: `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
  name: '',
  mainGoal: '',
  pillars: DEFAULT_ICONS.map((icon) => ({ title: '', icon, actions: Array<string>(ACTIONS_PER_PILLAR).fill('') })),
  done: {},
  createdAt: Date.now(),
});

/** Empty actions are excluded from both counts. */
export function goalStats(goal: Goal): GoalStats {
  const pillarDone: number[] = [];
  const pillarTotal: number[] = [];
  goal.pillars.forEach((p, pi) => {
    let d = 0;
    let t = 0;
    p.actions.forEach((a, ai) => {
      if (hasText(a)) {
        t += 1;
        if (goal.done[actionKey(pi, ai)]) d += 1;
      }
    });
    pillarDone.push(d);
    pillarTotal.push(t);
  });
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  return { pillarDone, pillarTotal, done: sum(pillarDone), total: sum(pillarTotal) };
}

const str = (v: unknown, fallback = ''): string => (typeof v === 'string' ? v : fallback);
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/** Validates untrusted stored data; never throws. */
export function sanitizeGoals(raw: unknown): Goal[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: Goal[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    const id = str(item.id);
    if (!/^[A-Za-z0-9-]{1,40}$/.test(id) || seen.has(id)) continue;
    seen.add(id);
    const rawPillars = Array.isArray(item.pillars) ? (item.pillars as unknown[]) : [];
    const pillars: Pillar[] = Array.from({ length: PILLAR_COUNT }, (_, i) => {
      const p = isRecord(rawPillars[i]) ? rawPillars[i] : {};
      const acts = Array.isArray(p.actions) ? (p.actions as unknown[]) : [];
      return {
        title: str(p.title),
        icon: str(p.icon, DEFAULT_ICONS[i]),
        actions: Array.from({ length: ACTIONS_PER_PILLAR }, (_, j) => str(acts[j])),
      };
    });
    const done: Record<string, true> = {};
    if (isRecord(item.done)) {
      for (const [k, v] of Object.entries(item.done)) if (KEY_RE.test(k) && v === true) done[k] = true;
    }
    out.push({
      id,
      name: str(item.name, 'Untitled goal'),
      mainGoal: str(item.mainGoal),
      pillars,
      done,
      createdAt: typeof item.createdAt === 'number' ? item.createdAt : 0,
    });
  }
  return out;
}

/** Parses "Main Goal" + eight "Pillar N: Title" headings followed by numbered actions. */
export function parseHaradaText(text: string): ParsedGrid {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/[*#`]/g, '').trim())
    .filter((l) => l !== '' && !/^[-=_]{3,}$/.test(l));

  let mainGoal = '';
  const mi = lines.findIndex((l) => /^main goal\b/i.test(l));
  if (mi >= 0) {
    const inline = lines[mi].replace(/^main goal\b[\s:–—-]*/i, '').trim();
    const next = lines[mi + 1] ?? '';
    mainGoal = inline || (/^(the 8 pillars|pillar)/i.test(next) ? '' : next);
  }

  const pillars: ParsedGrid['pillars'] = [];
  let current: ParsedGrid['pillars'][number] | null = null;
  for (const line of lines) {
    const h = line.match(/^pillar\s*(\d+)\s*[:.\-–—)]\s*(.+)$/i);
    if (h) {
      current = { title: h[2].trim(), actions: [] };
      pillars.push(current);
      continue;
    }
    const a = line.match(/^(\d+)\s*[.)]\s*(.+)$/);
    if (a && current) current.actions.push(a[2].trim());
  }

  if (pillars.length === 0)
    throw new Error('No pillars found. Each pillar needs a heading like "Pillar 1: Title" followed by numbered actions.');
  if (pillars.length !== PILLAR_COUNT)
    throw new Error(`Found ${pillars.length} pillars, but a Harada grid needs exactly ${PILLAR_COUNT}.`);

  return { mainGoal, pillars: pillars.map((p) => ({ title: p.title, actions: p.actions.slice(0, ACTIONS_PER_PILLAR) })) };
}
