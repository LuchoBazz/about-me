import { useEffect, useMemo, useState, type ReactNode } from "react";

type Place = { country: string; city: string; tz: string };
type Segment = [number, number];

type CalcBase = { baseOffset: number; destOffset: number; diff: number };
type CalcError = CalcBase & { error: string };
type CalcOk = CalcBase & {
  error: null;
  s: number;
  length: number;
  destStart: number;
  crossesMidnight: boolean;
  sleepDest: number;
  sleepBase: number;
  sleepLength: number;
  overlap: number;
  free: number;
};
type Calc = CalcError | CalcOk;

const PLACES: Place[] = [
  { country: "Colombia", city: "Bogotá", tz: "America/Bogota" },
  { country: "Georgia", city: "Tbilisi", tz: "Asia/Tbilisi" },
  { country: "Armenia", city: "Yerevan", tz: "Asia/Yerevan" },
  { country: "Türkiye", city: "Istanbul", tz: "Europe/Istanbul" },
  { country: "Spain", city: "Madrid", tz: "Europe/Madrid" },
  { country: "Portugal", city: "Lisbon", tz: "Europe/Lisbon" },
  { country: "United Kingdom", city: "London", tz: "Europe/London" },
  { country: "Germany", city: "Berlin", tz: "Europe/Berlin" },
  { country: "France", city: "Paris", tz: "Europe/Paris" },
  { country: "Italy", city: "Rome", tz: "Europe/Rome" },
  { country: "Poland", city: "Warsaw", tz: "Europe/Warsaw" },
  { country: "Romania", city: "Bucharest", tz: "Europe/Bucharest" },
  { country: "Serbia", city: "Belgrade", tz: "Europe/Belgrade" },
  { country: "Montenegro", city: "Podgorica", tz: "Europe/Podgorica" },
  { country: "Albania", city: "Tirana", tz: "Europe/Tirane" },
  { country: "Croatia", city: "Zagreb", tz: "Europe/Zagreb" },
  { country: "Greece", city: "Athens", tz: "Europe/Athens" },
  { country: "Israel", city: "Tel Aviv", tz: "Asia/Jerusalem" },
  { country: "United Arab Emirates", city: "Dubai", tz: "Asia/Dubai" },
  { country: "Uzbekistan", city: "Tashkent", tz: "Asia/Tashkent" },
  { country: "India", city: "New Delhi", tz: "Asia/Kolkata" },
  { country: "Thailand", city: "Bangkok", tz: "Asia/Bangkok" },
  { country: "Vietnam", city: "Ho Chi Minh City", tz: "Asia/Ho_Chi_Minh" },
  { country: "Indonesia", city: "Bali", tz: "Asia/Makassar" },
  { country: "Japan", city: "Tokyo", tz: "Asia/Tokyo" },
  { country: "Australia", city: "Sydney", tz: "Australia/Sydney" },
  { country: "South Africa", city: "Johannesburg", tz: "Africa/Johannesburg" },
  { country: "United States", city: "New York", tz: "America/New_York" },
  { country: "United States", city: "Los Angeles", tz: "America/Los_Angeles" },
  { country: "Mexico", city: "Mexico City", tz: "America/Mexico_City" },
  { country: "Panama", city: "Panama City", tz: "America/Panama" },
  { country: "Costa Rica", city: "San José", tz: "America/Costa_Rica" },
  { country: "Ecuador", city: "Quito", tz: "America/Guayaquil" },
  { country: "Peru", city: "Lima", tz: "America/Lima" },
  { country: "Chile", city: "Santiago", tz: "America/Santiago" },
  { country: "Argentina", city: "Buenos Aires", tz: "America/Argentina/Buenos_Aires" },
  { country: "Brazil", city: "São Paulo", tz: "America/Sao_Paulo" },
];

const DAY_MIN = 1440;
const NIGHT_START = 22 * 60;
const NIGHT_END = 6 * 60;

function offsetMin(tz: string, date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const o: Record<string, number> = {};
  parts.forEach((p) => {
    o[p.type] = Number(p.value);
  });
  const asUTC = Date.UTC(o.year, o.month - 1, o.day, o.hour, o.minute, o.second);
  return Math.round((asUTC - Math.floor(date.getTime() / 1000) * 1000) / 60000);
}

const mod = (m: number) => ((m % DAY_MIN) + DAY_MIN) % DAY_MIN;

function hhmm(min: number) {
  const m = mod(min);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function utcLabel(min: number) {
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `UTC${min < 0 ? "-" : "+"}${h}${m ? ":" + String(m).padStart(2, "0") : ""}`;
}

function diffLabel(min: number) {
  if (min === 0) return "None";
  const a = Math.abs(min);
  const h = Math.floor(a / 60);
  const m = a % 60;
  return `${min > 0 ? "+" : "-"}${h} h${m ? ` ${m} min` : ""}`;
}

function toMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function duration(start: number, end: number) {
  return end > start ? end - start : end - start + DAY_MIN;
}

function toHours(min: number) {
  return Math.round((min / 60) * 10) / 10;
}

function clockNow(tz: string, date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function splitSegments(start: number, length: number): Segment[] {
  return start + length <= DAY_MIN
    ? [[start, start + length]]
    : [
        [start, DAY_MIN],
        [0, start + length - DAY_MIN],
      ];
}

function intersect(a: Segment[], b: Segment[]): Segment[] {
  const out: Segment[] = [];
  a.forEach(([a1, a2]) => {
    b.forEach(([b1, b2]) => {
      const from = Math.max(a1, b1);
      const to = Math.min(a2, b2);
      if (to > from) out.push([from, to]);
    });
  });
  return out;
}

const pct = (min: number) => `${(min / DAY_MIN) * 100}%`;

function segmentLabel(segments: Segment[], i: number, start: number, length: number) {
  if (segments.length === 1) return `${hhmm(start)} to ${hhmm(start + length)}`;
  return i === 0 ? `${hhmm(start)} →` : `→ ${hhmm(start + length)}`;
}

function Axis() {
  return (
    <div className="relative mb-2 h-4 text-[11px] tabular-nums text-slate-400 dark:text-slate-500" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <span
          key={i}
          className={`absolute top-0 ${i % 2 === 1 ? "hidden sm:block" : ""}`}
          style={{ left: `${i * 12.5}%` }}
        >
          {String(i * 3).padStart(2, "0")}:00
        </span>
      ))}
    </div>
  );
}

function TimelineBar({
  title,
  subtitle,
  start,
  length,
  sleepStart,
  sleepLength,
}: {
  title: string;
  subtitle: string;
  start: number;
  length: number;
  sleepStart: number;
  sleepLength: number;
}) {
  const work = splitSegments(start, length);
  const sleep = splitSegments(sleepStart, sleepLength);
  const overlap = intersect(work, sleep);

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
      </div>

      <div
        role="img"
        aria-label={`${title}: you work from ${hhmm(start)} to ${hhmm(start + length)} and sleep from ${hhmm(
          sleepStart
        )} to ${hhmm(sleepStart + sleepLength)}`}
        className="relative h-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
      >
        <div
          className="absolute inset-y-0 bg-slate-200/70 dark:bg-slate-800"
          style={{ left: 0, width: pct(NIGHT_END) }}
        />
        <div
          className="absolute inset-y-0 bg-slate-200/70 dark:bg-slate-800"
          style={{ left: pct(NIGHT_START), width: pct(DAY_MIN - NIGHT_START) }}
        />

        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="absolute inset-y-0 border-l border-slate-300/50 dark:border-slate-700/60"
            style={{ left: `${i * 12.5}%` }}
          />
        ))}

        {work.map(([a, b], i) => (
          <div
            key={`w${i}`}
            className="absolute top-2 flex h-7 items-center justify-center overflow-hidden whitespace-nowrap rounded-md bg-teal-600 text-xs font-medium tabular-nums text-white dark:bg-teal-500 dark:text-teal-950"
            style={{ left: pct(a), width: `${((b - a) / DAY_MIN) * 100}%` }}
          >
            {segmentLabel(work, i, start, length)}
          </div>
        ))}

        {overlap.map(([a, b], i) => (
          <div
            key={`o${i}`}
            className="absolute top-2 flex h-7 items-center justify-center overflow-hidden whitespace-nowrap rounded-md bg-rose-500 text-xs font-medium text-white dark:bg-rose-400 dark:text-rose-950"
            style={{ left: pct(a), width: `${((b - a) / DAY_MIN) * 100}%` }}
          >
            Overlap
          </div>
        ))}

        {sleep.map(([a, b], i) => (
          <div
            key={`s${i}`}
            className="absolute bottom-2 flex h-4 items-center justify-center overflow-hidden whitespace-nowrap rounded bg-indigo-200 text-[11px] font-medium tabular-nums text-indigo-900 dark:bg-indigo-800 dark:text-indigo-100"
            style={{ left: pct(a), width: `${((b - a) / DAY_MIN) * 100}%` }}
          >
            Sleep {segmentLabel(sleep, i, sleepStart, sleepLength)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
  alert,
}: {
  label: string;
  value: string;
  detail?: string;
  alert?: boolean;
}) {
  return (
    <div className="px-0 py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0">
      <dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
      <dd
        className={`mt-1 text-3xl font-semibold tabular-nums tracking-tight ${
          alert ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-slate-50"
        }`}
      >
        {value}
      </dd>
      {detail && <dd className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</dd>}
    </div>
  );
}

function StatRow({ children }: { children: ReactNode }) {
  return (
    <dl className="grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800 dark:border-slate-800">
      {children}
    </dl>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm text-slate-600 dark:text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function LegendItem({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block h-3 w-3 rounded-sm ${swatch}`} />
      {text}
    </span>
  );
}

const controlClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-400/30";

export default function ComparadorHorarios() {
  const [baseIdx, setBaseIdx] = useState(0);
  const [destIdx, setDestIdx] = useState(1);
  const [start, setStart] = useState("08:00");
  const [end, setEnd] = useState("17:00");
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeUp, setWakeUp] = useState("07:00");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const base = PLACES[baseIdx];
  const dest = PLACES[destIdx];

  const calc = useMemo<Calc>(() => {
    const baseOffset = offsetMin(base.tz, now);
    const destOffset = offsetMin(dest.tz, now);
    const diff = destOffset - baseOffset;

    const s = toMinutes(start || "08:00");
    const e = toMinutes(end || "17:00");
    const d = toMinutes(bedtime || "23:00");
    const w = toMinutes(wakeUp || "07:00");

    if (s === e)
      return { baseOffset, destOffset, diff, error: "Choose an end time that is different from the start time." };
    if (d === w)
      return { baseOffset, destOffset, diff, error: "Choose a wake-up time that is different from your bedtime." };

    const length = duration(s, e);
    const sleepLength = duration(d, w);
    const destStart = mod(s + diff);

    const working = new Array(DAY_MIN).fill(false);
    const sleeping = new Array(DAY_MIN).fill(false);
    for (let i = 0; i < length; i++) working[(destStart + i) % DAY_MIN] = true;
    for (let i = 0; i < sleepLength; i++) sleeping[(d + i) % DAY_MIN] = true;

    let overlap = 0;
    let free = 0;
    for (let m = 0; m < DAY_MIN; m++) {
      if (working[m] && sleeping[m]) overlap++;
      if (!working[m] && !sleeping[m]) free++;
    }

    return {
      baseOffset,
      destOffset,
      diff,
      error: null,
      s,
      length,
      destStart,
      crossesMidnight: destStart + length > DAY_MIN,
      sleepDest: d,
      sleepBase: mod(d - diff),
      sleepLength,
      overlap,
      free,
    };
  }, [base, dest, start, end, bedtime, wakeUp, now]);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Work schedule comparator</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            See how your employer's working hours land in the country where you'll live, and how much of
            your shift cuts into your sleep.
          </p>
        </header>

        <section className="mt-8 space-y-6">
          <Group title="Locations">
            <Field id="base-country" label="Employer's country (base schedule)">
              <select
                id="base-country"
                className={controlClass}
                value={baseIdx}
                onChange={(e) => setBaseIdx(Number(e.target.value))}
              >
                {PLACES.map((p, i) => (
                  <option key={p.tz} value={i}>
                    {p.country} ({p.city})
                  </option>
                ))}
              </select>
            </Field>

            <Field id="dest-country" label="Country where you'll live">
              <select
                id="dest-country"
                className={controlClass}
                value={destIdx}
                onChange={(e) => setDestIdx(Number(e.target.value))}
              >
                {PLACES.map((p, i) => (
                  <option key={p.tz} value={i}>
                    {p.country} ({p.city})
                  </option>
                ))}
              </select>
            </Field>
          </Group>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Group title="Work shift">
              <Field id="start" label="Start (employer's time)">
                <input id="start" type="time" className={controlClass} value={start} onChange={(e) => setStart(e.target.value)} />
              </Field>
              <Field id="end" label="End (employer's time)">
                <input id="end" type="time" className={controlClass} value={end} onChange={(e) => setEnd(e.target.value)} />
              </Field>
            </Group>

            <Group title="Sleep">
              <Field id="bedtime" label={`Bedtime (${dest.country} time)`}>
                <input id="bedtime" type="time" className={controlClass} value={bedtime} onChange={(e) => setBedtime(e.target.value)} />
              </Field>
              <Field id="wake-up" label={`Wake-up (${dest.country} time)`}>
                <input id="wake-up" type="time" className={controlClass} value={wakeUp} onChange={(e) => setWakeUp(e.target.value)} />
              </Field>
            </Group>
          </div>

          <div className="min-h-[1.25rem] text-sm text-rose-600 dark:text-rose-400" role="alert">
            {calc.error}
          </div>
        </section>

        <section className="mt-2" aria-label="Current time in both places">
          <StatRow>
            <Stat
              label="Time difference"
              value={diffLabel(calc.diff)}
              detail={`${dest.country} relative to ${base.country}`}
            />
            <Stat label={`Now in ${base.country}`} value={clockNow(base.tz, now)} detail={utcLabel(calc.baseOffset)} />
            <Stat label={`Now in ${dest.country}`} value={clockNow(dest.tz, now)} detail={utcLabel(calc.destOffset)} />
          </StatRow>
        </section>

        {"s" in calc && (
          <>
            <section className="mt-10" aria-label="Timeline">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900/40">
                <Axis />
                <TimelineBar
                  title={base.country}
                  subtitle={`${base.city}, ${utcLabel(calc.baseOffset)}`}
                  start={calc.s}
                  length={calc.length}
                  sleepStart={calc.sleepBase}
                  sleepLength={calc.sleepLength}
                />
                <TimelineBar
                  title={dest.country}
                  subtitle={`${dest.city}, ${utcLabel(calc.destOffset)}`}
                  start={calc.destStart}
                  length={calc.length}
                  sleepStart={calc.sleepDest}
                  sleepLength={calc.sleepLength}
                />

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <LegendItem swatch="bg-teal-600 dark:bg-teal-500" text="Work hours" />
                  <LegendItem swatch="bg-indigo-200 dark:bg-indigo-800" text="Sleep" />
                  <LegendItem swatch="bg-rose-500 dark:bg-rose-400" text="Work during sleep" />
                  <LegendItem
                    swatch="border border-slate-300 bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800"
                    text="Local night (22:00 to 06:00)"
                  />
                </div>
              </div>
            </section>

            <section className="mt-8" aria-label="Summary">
              <StatRow>
                <Stat
                  label={`Your shift in ${dest.country}`}
                  value={`${hhmm(calc.destStart)} to ${hhmm(calc.destStart + calc.length)}`}
                  detail={`${calc.crossesMidnight ? "Crosses midnight" : "Same day"}, ${toHours(calc.length)} h of work`}
                />
                <Stat
                  label="Overlap with sleep"
                  value={`${toHours(calc.overlap)} h`}
                  alert={calc.overlap > 0}
                  detail={
                    calc.overlap === 0
                      ? "Your shift doesn't interrupt your rest"
                      : "Work hours inside your sleep window"
                  }
                />
                <Stat label="Free waking hours" value={`${toHours(calc.free)} h`} detail="No work, no sleep" />
              </StatRow>
            </section>
          </>
        )}
      </div>
    </div>
  );
}