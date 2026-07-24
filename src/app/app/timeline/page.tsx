import Topbar from "@/components/app/Topbar";
import { timeline, labs } from "@/lib/mockData";

const kindColor: Record<string, string> = {
  diagnosis: "var(--coral)",
  medication: "var(--teal)",
  lab: "var(--amber)",
  symptom: "var(--coral)",
  visit: "var(--teal-2)",
  document: "var(--ink-70)",
  insight: "var(--leaf)",
};

const kindLabel: Record<string, string> = {
  diagnosis: "Diagnosis",
  medication: "Medication",
  lab: "Lab",
  symptom: "Symptom",
  visit: "Visit",
  document: "Document",
  insight: "AI Insight",
};

export default function TimelinePage() {
  const sorted = [...timeline].sort((a, b) => b.date.localeCompare(a.date));
  const years = new Set(sorted.map((e) => e.date.slice(0, 4)));

  return (
    <>
      <Topbar
        title="Health Timeline"
        subtitle="Your full story on one line — symptoms, meds, labs, visits, and what CareNova noticed."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Diagnoses", "Labs", "Symptoms", "Visits", "Insights"].map((f) => (
              <button
                key={f}
                className={`chip !text-xs ${f === "All" ? "chip-teal" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      <div className="px-6 md:px-10 py-8 max-w-5xl">
        {/* HbA1c trend banner */}
        <div className="card p-6 mb-8">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-sm font-medium">HbA1c — 24 month trajectory</div>
              <div className="text-xs text-[color:var(--ink-70)] mt-0.5">ADA target: &lt; 7.0 · Your last value: 7.3</div>
            </div>
            <div className="chip chip-leaf">Improving</div>
          </div>
          <TrendChart values={labs[0].trend} dates={labs[0].trendDates} target={7.0} />
        </div>

        {/* Timeline events */}
        <div className="relative">
          <div className="absolute left-[10px] top-2 bottom-2 w-px bg-[color:var(--line-strong)]" />
          {sorted.map((e, idx) => {
            const prev = sorted[idx - 1];
            const yearChange = !prev || prev.date.slice(0, 4) !== e.date.slice(0, 4);
            return (
              <div key={e.id}>
                {yearChange && (
                  <div className="pl-10 pb-3 pt-6 first:pt-0 text-xs uppercase tracking-widest text-[color:var(--ink-50)] font-medium">
                    {e.date.slice(0, 4)}
                  </div>
                )}
                <div className="flex gap-5 pb-6 relative">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-[color:var(--cream)] flex-shrink-0 z-10 mt-1"
                    style={{ background: kindColor[e.kind] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs uppercase tracking-widest text-[color:var(--ink-50)]">{kindLabel[e.kind]}</span>
                      <span className="text-xs text-[color:var(--ink-70)]">{fmtDate(e.date)}</span>
                    </div>
                    <div className="text-base font-medium mt-1">{e.label}</div>
                    <div className="text-sm text-[color:var(--ink-70)] mt-0.5">{e.detail}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-[color:var(--ink-50)] text-center py-4">
          {sorted.length} events across {years.size} years
        </div>
      </div>
    </>
  );
}

function fmtDate(d: string) {
  const [y, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[+m - 1]} ${+day}, ${y}`;
}

function TrendChart({ values, dates, target }: { values: number[]; dates: string[]; target?: number }) {
  const w = 800;
  const h = 140;
  const pad = 30;
  const min = Math.min(...values, target ?? Infinity) - 0.3;
  const max = Math.max(...values, target ?? -Infinity) + 0.3;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return { x, y, v };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const targetY = target !== undefined ? h - pad - ((target - min) / (max - min)) * (h - pad * 2) : null;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {targetY !== null && (
        <>
          <line x1={pad} x2={w - pad} y1={targetY} y2={targetY} stroke="var(--leaf)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={w - pad + 4} y={targetY + 3} fontSize="10" fill="var(--leaf)">Target</text>
        </>
      )}
      <path d={path} fill="none" stroke="var(--teal)" strokeWidth="2" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="var(--teal)" />
          <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fill="var(--ink)">{p.v}</text>
          <text x={p.x} y={h - 8} textAnchor="middle" fontSize="9" fill="var(--ink-50)">{dates[i]}</text>
        </g>
      ))}
    </svg>
  );
}
