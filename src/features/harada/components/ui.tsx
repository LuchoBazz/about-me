import {
  Brain, Code, Compass, Flag, Globe, GraduationCap, Headphones, Heart, Leaf, Lightbulb,
  MessagesSquare, Mic, PenLine, Puzzle, Rocket, Star,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

const ICONS: Record<string, LucideIcon> = {
  chat: MessagesSquare, code: Code, mic: Mic, headphones: Headphones, pen: PenLine, school: GraduationCap,
  globe: Globe, brain: Brain, flag: Flag, compass: Compass, bulb: Lightbulb, rocket: Rocket,
  puzzle: Puzzle, star: Star, leaf: Leaf, heart: Heart,
};
export const iconFor = (name: string): LucideIcon => ICONS[name] ?? Flag;

export const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400';
export const BTN = `inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 ${FOCUS}`;
export const BTN_PRIMARY = `inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 dark:bg-blue-500 dark:text-blue-950 dark:hover:bg-blue-400 ${FOCUS}`;
export const BTN_DANGER = `${BTN} !border-red-300 !text-red-800 hover:!bg-red-50 dark:!border-red-800 dark:!text-red-300 dark:hover:!bg-red-950/50`;
export const INPUT = `w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${FOCUS}`;

/** Native <dialog> wrapper: modal, Esc to close, click on backdrop to close. */
export function Dialog(props: {
  open: boolean;
  onClose: () => void;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (props.open && !d.open) d.showModal();
    if (!props.open && d.open) d.close();
  }, [props.open]);
  return (
    <dialog
      ref={ref}
      aria-label={props.label}
      onClose={props.onClose}
      onClick={(e) => e.target === e.currentTarget && props.onClose()}
      className={props.className}
    >
      {props.open && props.children}
    </dialog>
  );
}

export function ProgressBar(props: { value: number; label: string; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${props.className ?? 'bg-emerald-600 dark:bg-emerald-500'}`}
        style={{ width: `${props.value}%` }}
      />
    </div>
  );
}
