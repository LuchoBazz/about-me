import type { ExperiencePosition } from './types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Months elapsed since year 0 for a `YYYY-MM` string (or the current month when omitted). */
function toMonthIndex(value?: string): number {
  if (!value) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
}

function formatMonth(value: string): string {
  const index = toMonthIndex(value);
  return `${MONTHS[index % 12]} ${Math.floor(index / 12)}`;
}

export function formatDateRange({ start, end }: ExperiencePosition): string {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : 'Present'}`;
}

/** Inclusive month count, matching LinkedIn (Jan–Sep = 9 months). */
export function positionMonths({ start, end }: ExperiencePosition): number {
  return Math.max(toMonthIndex(end) - toMonthIndex(start) + 1, 1);
}

/** Total months covered by any position, so overlaps are not double-counted. */
export function companyMonths(positions: ExperiencePosition[]): number {
  const covered = new Set<number>();
  for (const { start, end } of positions) {
    for (let m = toMonthIndex(start); m <= toMonthIndex(end); m++) covered.add(m);
  }
  return Math.max(covered.size, 1);
}

export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}
