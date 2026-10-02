import { useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { geoAzimuthalEqualArea, geoBounds, geoCentroid, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import "./europe.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type Mode = "cost" | "rank" | "english";
type Point = [number, number];

interface CostEntry {
  name: string;
  tuition: number;
  living: number;
  note: string;
}
interface EnglishEntry {
  level: string;
  ielts: string;
  ref: string;
  checked: boolean;
  note: string;
}
interface Row extends CostEntry {
  id: string;
  level: string;
  ielts: string;
  ref: string;
  checked: boolean;
  englishNote: string;
  total: number;
  costRank: number;
  costScore: number;
  rankScore: number;
  levelIdx: number;
  levelScore: number;
  score: number;
  pos: number;
}
interface Shape {
  id: string | null;
  name: string;
  eu: boolean;
  d: string;
  c: Point | null;
}
interface TipState {
  id: string;
  x: number;
  y: number;
}

/* ------------------------------------------------------------------ */
/* Data: estimated annual cost in EUR, 2026/27, non-EU student on a    */
/* public-university master's, sharing a flat in a mid-cost city.      */
/* Keys are ISO 3166-1 numeric codes (as used by world-atlas).         */
/* ------------------------------------------------------------------ */
const COSTS: Record<string, CostEntry> = {
  "100": { name: "Bulgaria",    tuition: 3000,  living: 6600,  note: "Public universities charge non-EU students roughly €1,750–3,850 a year. Sofia costs more than Plovdiv or Varna." },
  "642": { name: "Romania",     tuition: 3000,  living: 7800,  note: "Engineering and computer science fees mostly run €2,430–3,800. Bucharest and Cluj cost more than Iași or Timișoara." },
  "191": { name: "Croatia",     tuition: 3000,  living: 8400,  note: "Non-EU fees are roughly €1,000–4,000 a year. Zagreb rents have risen quickly." },
  "703": { name: "Slovakia",    tuition: 3500,  living: 8000,  note: "English-taught programs cost about €1,500–5,000; Slovak-taught programs are free." },
  "300": { name: "Greece",      tuition: 3000,  living: 9000,  note: "Public master's fees vary widely by program, from about €1,500 to over €10,000." },
  "428": { name: "Latvia",      tuition: 4500,  living: 8000,  note: "Fees start around €2,500 and vary by field. Riga is the main study city." },
  "233": { name: "Estonia",     tuition: 4500,  living: 9000,  note: "Fees run roughly €1,500–7,500. Housing in Tallinn is the largest expense." },
  "040": { name: "Austria",     tuition: 1500,  living: 12000, note: "A flat €726.72 per semester at every public university. Graz and Linz are cheaper than Vienna." },
  "440": { name: "Lithuania",   tuition: 5000,  living: 8500,  note: "Master's fees are typically €4,500–9,000; Kaunas is cheaper than Vilnius." },
  "276": { name: "Germany",     tuition: 600,   living: 12500, note: "No tuition in 15 of 16 states; you pay only a semester contribution. Baden-Württemberg adds €3,000 a year and TUM €8,000–12,000. The visa requires €11,904 in a blocked account." },
  "616": { name: "Poland",      tuition: 5000,  living: 9000,  note: "English-taught computer science master's cost about €3,800–6,500. Poznań and Wrocław are cheaper than Warsaw." },
  "705": { name: "Slovenia",    tuition: 5000,  living: 9000,  note: "Free for EU and some Balkan citizens; around €5,000 a year for other non-EU students." },
  "620": { name: "Portugal",    tuition: 4500,  living: 10000, note: "International fees run €3,000–7,000. Porto and Coimbra are much cheaper than Lisbon." },
  "380": { name: "Italy",       tuition: 3000,  living: 11500, note: "Non-EU fees are about €2,000–4,000. The visa requires proof of €10,179.85 a year." },
  "724": { name: "Spain",       tuition: 3000,  living: 11500, note: "Each region sets prices: about €1,800 a year in Andalusia, about €7,200 in Madrid. Many master's last only one year." },
  "203": { name: "Czechia",     tuition: 5300,  living: 10500, note: "Czech-taught programs are free; English computer science master's cost about €5,100–5,400. Brno is cheaper than Prague." },
  "348": { name: "Hungary",     tuition: 6400,  living: 9500,  note: "ELTE's CS, AI and Data Science MSc cost €3,200 per semester for every nationality." },
  "250": { name: "France",      tuition: 3941,  living: 12000, note: "From 2026/27 most non-EU master's students pay €3,941 a year. Paris adds several thousand euros in living costs." },
  "056": { name: "Belgium",     tuition: 4500,  living: 11500, note: "French-speaking universities charge about €4,175; Flemish universities about €1,200–6,000." },
  "442": { name: "Luxembourg",  tuition: 800,   living: 16000, note: "Registration fees are low, but rents are among the highest in the EU." },
  "196": { name: "Cyprus",      tuition: 7000,  living: 10000, note: "Non-EU master's fees range from about €3,500 to €10,000." },
  "470": { name: "Malta",       tuition: 8000,  living: 11500, note: "Non-EU fees vary widely by program; rents have climbed with the island's growth." },
  "246": { name: "Finland",     tuition: 12000, living: 10800, note: "Master's fees are usually €8,000–15,000. The visa requires €800 a month; Helsinki needs more." },
  "752": { name: "Sweden",      tuition: 14000, living: 11500, note: "IT and engineering usually cost SEK 120,000–180,000 a year (about €10,500–15,700)." },
  "208": { name: "Denmark",     tuition: 13000, living: 13500, note: "STEM master's fees run about €10,000–18,000. Copenhagen rents are high." },
  "528": { name: "Netherlands", tuition: 16500, living: 14000, note: "Non-EU master's fees are roughly €12,000–25,000, and student housing is scarce in most cities." },
  "372": { name: "Ireland",     tuition: 22000, living: 15000, note: "Taught master's usually cost €18,000–30,000 or more. A room in Dublin costs €700–1,100 a month." },
};

/* Lowest English score accepted for an English-taught CS/AI master's.
   checked = taken from the university's own admission rules. */
const LEVELS = [
  "A2-low", "A2-medium", "A2-high",
  "B1-low", "B1-medium", "B1-high",
  "B2-low", "B2-medium", "B2-high",
  "C1-low", "C1-medium", "C1-high",
  "C2-low", "C2-medium", "C2-high",
] as const;

const ENGLISH: Record<string, EnglishEntry> = {
  "040": { level: "B2-high",   ielts: "6.5", ref: "TU Wien", checked: true, note: "TU Wien asks for B2 and accepts IELTS 6.5 or TOEFL iBT 87 as proof." },
  "056": { level: "B2-high",   ielts: "6.5", ref: "KU Leuven", checked: true, note: "KU Leuven's general minimum is IELTS 6.5; some engineering and computer science programs ask for 7.0." },
  "100": { level: "B2-low",    ielts: "5.5", ref: "Public universities", checked: false, note: "Usually B2. Several universities run their own English test during admission." },
  "191": { level: "B2-medium", ielts: "6.0", ref: "University of Zagreb", checked: false, note: "English-taught programs generally ask for B2." },
  "196": { level: "B2-medium", ielts: "6.0", ref: "University of Cyprus", checked: false, note: "Usually B2, roughly IELTS 6.0." },
  "203": { level: "B2-medium", ielts: "6.0", ref: "Czech Technical University", checked: true, note: "CTU's Open Informatics master asks for IELTS 6.0 or TOEFL iBT 70." },
  "208": { level: "B2-high",   ielts: "6.5", ref: "DTU and University of Copenhagen", checked: false, note: "Danish master's require the 'English B' level, usually shown as IELTS 6.5." },
  "233": { level: "B2-medium", ielts: "6.0", ref: "TalTech", checked: true, note: "IELTS 6.0 with at least 5.5 in each part, or TalTech's own B2 test." },
  "246": { level: "B2-high",   ielts: "6.5", ref: "Aalto and University of Helsinki", checked: false, note: "Most English-taught master's ask for IELTS 6.5." },
  "250": { level: "B2-medium", ielts: "6.0", ref: "Public universities", checked: false, note: "English-taught master's usually ask for B2. French-taught programs need French at B2 or C1 instead." },
  "276": { level: "B2-medium", ielts: "6.0", ref: "Public universities", checked: false, note: "Most English-taught master's ask for B2 (IELTS 6.0–6.5); TUM asks for 6.5." },
  "300": { level: "B2-medium", ielts: "6.0", ref: "Public universities", checked: false, note: "Usually a B2 certificate." },
  "348": { level: "B2-low",    ielts: "5.5", ref: "ELTE", checked: true, note: "ELTE asks for B2, accepts any certificate and checks your English in an online interview." },
  "372": { level: "B2-high",   ielts: "6.5", ref: "Trinity College Dublin and UCD", checked: false, note: "Most taught master's ask for IELTS 6.5 with no section below 6.0." },
  "380": { level: "B2-medium", ielts: "6.0", ref: "Politecnico di Milano", checked: false, note: "Most English-taught master's ask for B2, about IELTS 6.0." },
  "428": { level: "B2-low",    ielts: "5.5", ref: "Riga Technical University", checked: true, note: "RTU accepts IELTS 5.5 or TOEFL iBT 72 for its English-taught MSc programs." },
  "440": { level: "B2-low",    ielts: "5.5", ref: "Public universities", checked: false, note: "Usually B2, often shown as IELTS 5.5." },
  "442": { level: "B2-high",   ielts: "6.5", ref: "University of Luxembourg", checked: false, note: "English-taught master's usually ask for B2 to C1." },
  "470": { level: "B2-medium", ielts: "6.0", ref: "University of Malta", checked: false, note: "English is an official language; most master's ask for IELTS 6.0–6.5." },
  "528": { level: "B2-high",   ielts: "6.5", ref: "TU Delft", checked: true, note: "TU Delft's Computer Science master asks for IELTS 6.5 overall; some Dutch programs ask for 7.0." },
  "616": { level: "B2-medium", ielts: "6.0", ref: "AGH and Warsaw University of Technology", checked: false, note: "Usually B2. Wrocław Tech asks for IELTS 6.5." },
  "620": { level: "B2-medium", ielts: "6.0", ref: "Public universities", checked: false, note: "English-taught master's usually ask for B2." },
  "642": { level: "B2-low",    ielts: "5.5", ref: "Public universities", checked: false, note: "Usually B2. Many universities give their own English test." },
  "703": { level: "B2-low",    ielts: "5.5", ref: "Public universities", checked: false, note: "English-taught programs usually ask for B2." },
  "705": { level: "B2-medium", ielts: "6.0", ref: "University of Ljubljana", checked: false, note: "English-taught programs usually ask for B2." },
  "724": { level: "B2-medium", ielts: "6.0", ref: "Public universities", checked: false, note: "English-taught master's usually ask for B2. Spanish-taught master's need no English certificate." },
  "752": { level: "B2-high",   ielts: "6.5", ref: "Lund and Uppsala", checked: true, note: "Sweden's 'English 6' level: IELTS 6.5 with no section below 5.5." },
};

/* ------------------------------------------------------------------ */
/* Map geometry (computed at runtime from Natural Earth via world-atlas)*/
/* ------------------------------------------------------------------ */
const W = 800;
const H = 720;
const EU_IDS = [
  "040","056","100","191","196","203","208","233","246","250","276","300","348","372",
  "380","428","440","442","470","528","616","620","642","703","705","724","752",
];
// Better label anchors for countries with overseas territories or odd shapes
const CENTROID_FIX: Record<string, Point> = {
  "250": [2.4, 46.6], "620": [-8.1, 39.6], "724": [-3.6, 40.2], "528": [5.6, 52.2],
  "208": [9.3, 56.0], "470": [14.4, 35.9], "442": [6.1, 49.8], "196": [33.0, 34.9],
};

function buildShapes(): Shape[] {
  const topo = world as unknown as Topology;
  const countries = feature(
    topo,
    topo.objects.countries as GeometryCollection<{ name: string }>,
  );
  const projection = geoAzimuthalEqualArea().rotate([-12, -52]);
  const frame: GeoPermissibleObjects = {
    type: "MultiPoint",
    coordinates: [
      [-11, 35.5], [34.5, 34.6], [32, 70.5], [-10, 60], [28, 71],
      [-9.5, 36.9], [14.4, 35.4], [24.5, 34.6],
    ],
  };
  projection.fitExtent([[12, 12], [W - 12, H - 12]], frame);
  projection.clipExtent([[0, 0], [W, H]]);
  const path = geoPath(projection).digits(1);

  const shapes: Shape[] = [];
  for (const f of countries.features) {
    const id = f.id === undefined ? null : String(f.id);
    const eu = id !== null && EU_IDS.includes(id);
    const [[x0, y0], [x1, y1]] = geoBounds(f);
    const outside = x1 < -32 || x0 > 50 || y1 < 30 || y0 > 75;
    if (outside && !eu) continue;
    const d = path(f);
    if (!d) continue;
    const center = id && CENTROID_FIX[id] ? CENTROID_FIX[id] : geoCentroid(f);
    const c = projection(center as Point);
    shapes.push({
      id,
      name: f.properties.name,
      eu,
      d,
      c: c ? [Math.round(c[0]), Math.round(c[1])] : null,
    });
  }
  return shapes;
}
const SHAPES = buildShapes();

// Small countries get a marker so they can be found and hovered
const MARKERS: Record<string, number> = { "442": 7, "470": 7 };
// Countries large enough to carry a label on the map
const LABELLED = new Set([
  "100","642","300","616","276","250","724","620","380","752","246","040","348","203",
  "528","372","233","428","440","191","703","208","056","196",
]);
// Pixel offsets so labels sit inside oddly shaped countries
const LABEL_NUDGE: Record<string, Point> = { "191": [-14, -10] };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

// Green (1) → yellow → red (100)
const STOPS: [number, [number, number, number]][] = [
  [0.0, [26, 152, 80]],
  [0.25, [145, 207, 96]],
  [0.5, [254, 224, 139]],
  [0.75, [252, 141, 89]],
  [1.0, [215, 48, 39]],
];

function scoreColor(score: number): string {
  const t = Math.min(1, Math.max(0, (score - 1) / 99));
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [t0, c0] = STOPS[i - 1];
      const [t1, c1] = STOPS[i];
      const k = (t - t0) / (t1 - t0);
      const [r, g, b] = c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return "rgb(215, 48, 39)";
}
function textOn(score: number): string {
  const t = (score - 1) / 99;
  return t < 0.12 || t > 0.86 ? "#ffffff" : "#10202c";
}
const GRADIENT = `linear-gradient(90deg, ${STOPS.map(
  ([t]) => `${scoreColor(1 + t * 99)} ${t * 100}%`,
).join(", ")})`;

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
// "B2-low" → "B2−", "B2-medium" → "B2", "B2-high" → "B2+"
function shortLevel(level: string): string {
  const [band, step] = level.split("-");
  return band + (step === "low" ? "−" : step === "high" ? "+" : "");
}
function levelScore(level: string): number {
  return Math.round(1 + (99 * LEVELS.indexOf(level as (typeof LEVELS)[number])) / (LEVELS.length - 1));
}
const LADDER_GROUPS = ["A2", "B1", "B2", "C1", "C2"];

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [mode, setMode] = useState<Mode>("cost");
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tip, setTip] = useState<TipState | null>(null);
  const isEnglish = mode === "english";

  const rows = useMemo<Row[]>(() => {
    const list: Row[] = Object.entries(COSTS).map(([id, c]) => {
      const e = ENGLISH[id];
      return {
        id, ...c,
        level: e.level, ielts: e.ielts, ref: e.ref, checked: e.checked, englishNote: e.note,
        total: c.tuition + c.living,
        costRank: 0, costScore: 0, rankScore: 0,
        levelIdx: LEVELS.indexOf(e.level as (typeof LEVELS)[number]),
        levelScore: levelScore(e.level),
        score: 0, pos: 0,
      };
    });
    list.sort((a, b) => a.total - b.total || a.name.localeCompare(b.name));
    const min = list[0].total;
    const max = list[list.length - 1].total;
    list.forEach((r, i) => {
      r.costRank = i + 1;
      r.costScore = Math.round(1 + (99 * (r.total - min)) / (max - min));
      r.rankScore = Math.round(1 + (99 * i) / (list.length - 1));
    });
    list.forEach((r) => {
      r.score = mode === "cost" ? r.costScore : mode === "rank" ? r.rankScore : r.levelScore;
    });
    if (mode === "english") {
      list.sort((a, b) => a.levelIdx - b.levelIdx || a.total - b.total);
    }
    list.forEach((r, i) => { r.pos = i + 1; });
    return list;
  }, [mode]);

  const byId = useMemo<Record<string, Row>>(
    () => Object.fromEntries(rows.map((r) => [r.id, r])),
    [rows],
  );
  const maxTotal = Math.max(...rows.map((r) => r.total));
  const activeId = hover ?? selected ?? rows[0].id;
  const active = byId[activeId];
  const tuitionShare = (active.tuition / active.total) * 100;

  function onMove(e: ReactPointerEvent<SVGElement>, id: string) {
    const box = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
    if (!box) return;
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setTip({ id, x: Math.min(x + 14, box.width - 230), y: Math.max(8, y - 120) });
  }
  function leave() { setHover(null); setTip(null); }
  function choose(id: string) { setSelected((prev) => (prev === id ? null : id)); }

  const describe = (r: Row) =>
    isEnglish
      ? `${r.name}: minimum English ${r.level}, IELTS ${r.ielts}`
      : `${r.name}: score ${r.score}, ${eur.format(r.total)} per year`;

  const tipRow = tip ? byId[tip.id] : null;

  return (
    <div className="wrap">
      <header>
        <h1>{isEnglish ? "How much English EU master's ask for" : "What a year of study costs across the EU"}</h1>
        <p>
          {isEnglish
            ? "Minimum English level for an English-taught computer science or AI master's at a public university, on a 15-step scale from A2-low to C2-high. Green means a lower requirement."
            : "Annual tuition plus living costs for a non-EU student on a public-university master's, scored from 1 (cheapest) to 100 (most expensive). Hover or tap a country to see the breakdown."}
        </p>
      </header>

      <div className="controls">
        <div>
          <span className="seg-label">Show</span>
          <span className="seg" role="group" aria-label="Map view">
            <button aria-pressed={mode === "cost"} onClick={() => setMode("cost")}>Total cost</button>
            <button aria-pressed={mode === "rank"} onClick={() => setMode("rank")}>Rank order</button>
            <button aria-pressed={mode === "english"} onClick={() => setMode("english")}>English level</button>
          </span>
        </div>

        {isEnglish ? (
          <div className="legend" aria-hidden="true">
            <span>A2-low Easiest</span>
            <div className="bar steps">
              {LEVELS.map((l) => <i key={l} style={{ background: scoreColor(levelScore(l)) }} />)}
            </div>
            <span>C2-high Hardest</span>
          </div>
        ) : (
          <div className="legend" aria-hidden="true">
            <span>1 Cheapest</span>
            <div className="bar" style={{ background: GRADIENT }} />
            <span>100 Most expensive</span>
          </div>
        )}
      </div>

      <div className="grid">
        <div className="map-card">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={isEnglish ? "Map of EU countries colored by minimum English level" : "Map of EU countries colored by study cost score"}
          >
            {SHAPES.map((f) => {
              const r = f.eu && f.id ? byId[f.id] : null;
              if (!r || !f.id) {
                return <path key={f.name} className="country" d={f.d} fill="var(--land)" />;
              }
              const id = f.id;
              return (
                <path
                  key={id}
                  className={"country eu" + (activeId === id && (hover || selected) ? " active" : "")}
                  d={f.d}
                  fill={scoreColor(r.score)}
                  tabIndex={0}
                  role="button"
                  aria-label={describe(r)}
                  onPointerEnter={() => setHover(id)}
                  onPointerMove={(e) => onMove(e, id)}
                  onPointerLeave={leave}
                  onFocus={() => setHover(id)}
                  onBlur={leave}
                  onClick={() => choose(id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(id); }
                  }}
                />
              );
            })}

            {SHAPES.filter((f) => f.id && MARKERS[f.id] && f.c).map((f) => {
              const id = f.id as string;
              const [cx, cy] = f.c as Point;
              return (
                <circle
                  key={"m" + id}
                  cx={cx} cy={cy} r={MARKERS[id]}
                  fill={scoreColor(byId[id].score)}
                  stroke="var(--ink)" strokeWidth={1.2}
                  style={{ cursor: "pointer" }}
                  onPointerEnter={() => setHover(id)}
                  onPointerMove={(e) => onMove(e, id)}
                  onPointerLeave={leave}
                  onClick={() => choose(id)}
                />
              );
            })}

            {SHAPES.filter((f) => f.eu && f.id && LABELLED.has(f.id) && f.c).map((f) => {
              const id = f.id as string;
              const [cx, cy] = f.c as Point;
              const [dx, dy] = LABEL_NUDGE[id] ?? [0, 0];
              const r = byId[id];
              return (
                <text key={"l" + id} className="map-label" x={cx + dx} y={cy + dy}>
                  {isEnglish ? shortLevel(r.level) : r.score}
                </text>
              );
            })}
          </svg>

          {tip && tipRow && (
            <div className="tip" style={{ left: tip.x, top: tip.y }}>
              <strong>{tipRow.name}</strong>
              {isEnglish ? (
                <>
                  <div className="row"><span>Minimum level</span><span><b>{tipRow.level}</b></span></div>
                  <div className="row"><span>IELTS Academic</span><span>{tipRow.ielts}</span></div>
                  <div className="row"><span>Based on</span><span>{tipRow.checked ? "University rules" : "Typical requirement"}</span></div>
                  <div className="row"><span>Total cost per year</span><span>{eur.format(tipRow.total)}</span></div>
                </>
              ) : (
                <>
                  <div className="row"><span>Score</span><span>{tipRow.score} / 100</span></div>
                  <div className="row"><span>Tuition</span><span>{eur.format(tipRow.tuition)}</span></div>
                  <div className="row"><span>Living</span><span>{eur.format(tipRow.living)}</span></div>
                  <div className="row"><span>Total per year</span><span><b>{eur.format(tipRow.total)}</b></span></div>
                </>
              )}
            </div>
          )}
        </div>

        <aside>
          <section className="detail" aria-live="polite">
            {isEnglish ? (
              <>
                <div className="detail-top">
                  <div>
                    <h2>{active.name}</h2>
                    <div className="rank">Minimum English for an English-taught master's</div>
                  </div>
                  <div className="score-badge" style={{ background: scoreColor(active.score), color: textOn(active.score) }}>
                    {shortLevel(active.level)}<small>IELTS {active.ielts}</small>
                  </div>
                </div>
                <div className="total">
                  {active.level}{" "}
                  <span>{active.checked ? "from the university's admission rules" : "typical national requirement"}</span>
                </div>
                <div className="ladder" role="img" aria-label={`Minimum level ${active.level} on a 15-step scale from A2-low to C2-high`}>
                  {LADDER_GROUPS.map((g) => (
                    <div key={g}>
                      <div className="ladder-cells">
                        {(["low", "medium", "high"] as const).map((step) => {
                          const lvl = `${g}-${step}`;
                          const idx = LEVELS.indexOf(lvl as (typeof LEVELS)[number]);
                          return (
                            <span
                              key={lvl}
                              title={lvl}
                              className={"cell" + (idx === active.levelIdx ? " current" : "")}
                              style={{ background: idx <= active.levelIdx ? scoreColor(levelScore(lvl)) : "var(--rule)" }}
                            />
                          );
                        })}
                      </div>
                      <span className="ladder-label">{g}</span>
                    </div>
                  ))}
                </div>
                <p className="note">Reference: {active.ref}. {active.englishNote}</p>
                <p className="note cost-line">
                  Study cost: {eur.format(active.total)} per year (cost score {active.costScore}).
                </p>
              </>
            ) : (
              <>
                <div className="detail-top">
                  <div>
                    <h2>{active.name}</h2>
                    <div className="rank">
                      {active.costRank === 1 ? "Cheapest" : `${ordinal(active.costRank)} cheapest`} of {rows.length} EU countries
                    </div>
                  </div>
                  <div className="score-badge" style={{ background: scoreColor(active.score), color: textOn(active.score) }}>
                    {active.score}<small>of 100</small>
                  </div>
                </div>
                <div className="total">{eur.format(active.total)} <span>per year</span></div>
                <div
                  className="stack"
                  role="img"
                  aria-label={`Tuition ${Math.round(tuitionShare)}%, living ${100 - Math.round(tuitionShare)}%`}
                >
                  <div style={{ width: tuitionShare + "%", background: "var(--tuition)" }} />
                  <div style={{ width: 100 - tuitionShare + "%", background: "var(--living)" }} />
                </div>
                <div className="split">
                  <span><i style={{ background: "var(--tuition)" }} />Tuition {eur.format(active.tuition)}</span>
                  <span><i style={{ background: "var(--living)" }} />Living {eur.format(active.living)}</span>
                </div>
                <p className="note">{active.note}</p>
              </>
            )}
          </section>

          <section className="list">
            <h3>{isEnglish ? "All 27 countries, lowest English requirement first" : "All 27 countries, cheapest first"}</h3>
            <ol>
              {rows.map((r) => (
                <li key={r.id}>
                  <button
                    className={activeId === r.id ? "active" : ""}
                    onPointerEnter={() => setHover(r.id)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(r.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => choose(r.id)}
                    aria-label={`${r.pos}. ${describe(r)}`}
                  >
                    <span className="pos">{r.pos}</span>
                    <span className="name">
                      <b>{r.name}</b>
                      <span className="meter">
                        <div
                          style={{
                            width: (isEnglish ? ((r.levelIdx + 1) / LEVELS.length) * 100 : (r.total / maxTotal) * 100) + "%",
                            background: scoreColor(r.score),
                          }}
                        />
                      </span>
                    </span>
                    <span className="eur">{isEnglish ? `IELTS ${r.ielts}` : eur.format(r.total)}</span>
                    <span className="chip" style={{ background: scoreColor(r.score), color: textOn(r.score) }}>
                      {isEnglish ? shortLevel(r.level) : r.score}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>

      <footer>
        <h4>How the score works</h4>
        <p>
          Each country's total is estimated annual tuition plus annual living costs, in euros, for 2026/27.
          “Total cost” scales scores in proportion to cost between the cheapest (1) and the most expensive (100) country;
          “Rank order” spreads the 27 countries evenly from 1 to 100.
        </p>
        <p>
          Estimates assume a non-EU student at a public university, computer science or IT fees where they differ by
          field, and a room in a shared flat in a mid-cost city. Real costs can be 20–40% higher in capitals such as
          Paris, Amsterdam, Dublin or Warsaw.
        </p>
        <h4>How the English level works</h4>
        <p>
          The level is the lowest English score accepted for an English-taught computer science or AI master's at a
          leading public university in each country, converted from IELTS Academic: 5.5 is B2-low, 6.0 is B2-medium,
          6.5 is B2-high and 7.0 is C1-low. From B1-low (IELTS 4.0) to C1-high (8.0) each step is half an IELTS band;
          the A2 steps sit below that range and the C2 steps above it. Where no university rule was checked, the typical
          national requirement is shown. Programs taught in the local language, such as Spanish-taught master's in
          Spain, need no English certificate.
        </p>
        <p>
          Sources: university fee and admission pages (TU Wien, TU Delft, KU Leuven, Lund, Uppsala, CTU Prague, TalTech,
          Riga Technical University, ELTE), national study portals, official visa funds requirements, and country guides
          from Study.eu, Mastersportal and Nibud. Map shapes: Natural Earth via world-atlas.
        </p>
      </footer>
    </div>
  );
}
