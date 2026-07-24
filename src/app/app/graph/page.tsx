"use client";

import Topbar from "@/components/app/Topbar";
import { useState } from "react";

type Node = {
  id: string;
  label: string;
  type: "you" | "condition" | "medication" | "symptom" | "lab" | "document" | "provider";
  x: number;
  y: number;
  detail: string;
};

const nodes: Node[] = [
  { id: "you", label: "Sarah Chen", type: "you", x: 500, y: 300, detail: "42 · Naperville, IL · BlueCross PPO" },
  // conditions
  { id: "t2d", label: "Type 2 Diabetes", type: "condition", x: 320, y: 170, detail: "Diagnosed 2019 · HbA1c 7.3" },
  { id: "htn", label: "Hypertension", type: "condition", x: 680, y: 170, detail: "Diagnosed 2017 · 138/86" },
  { id: "hypo", label: "Hypothyroidism", type: "condition", x: 800, y: 300, detail: "Diagnosed 2021 · TSH 2.8" },
  { id: "gerd", label: "GERD", type: "condition", x: 680, y: 440, detail: "Diagnosed 2023" },
  { id: "vd", label: "Vitamin D deficiency", type: "condition", x: 320, y: 440, detail: "Monitoring · 24 ng/mL" },
  // meds
  { id: "metformin", label: "Metformin", type: "medication", x: 200, y: 240, detail: "1000mg BID · adherence 94%" },
  { id: "lisin", label: "Lisinopril", type: "medication", x: 800, y: 90, detail: "20mg daily · adherence 88%" },
  { id: "levo", label: "Levothyroxine", type: "medication", x: 900, y: 220, detail: "75mcg AM · adherence 97%" },
  { id: "ome", label: "Omeprazole", type: "medication", x: 800, y: 500, detail: "20mg daily · adherence 82%" },
  { id: "d3", label: "Vitamin D3", type: "medication", x: 200, y: 500, detail: "2000 IU daily" },
  // symptoms
  { id: "cough", label: "Dry cough", type: "symptom", x: 620, y: 60, detail: "10 days, worse at night" },
  { id: "heartburn", label: "Heartburn", type: "symptom", x: 580, y: 540, detail: "5x last 30 days" },
  { id: "fatigue", label: "Fatigue", type: "symptom", x: 380, y: 540, detail: "Daily, mid-afternoon" },
  { id: "nausea", label: "Nausea", type: "symptom", x: 100, y: 320, detail: "30 min post-metformin" },
  // labs
  { id: "hba1c", label: "HbA1c 7.3", type: "lab", x: 200, y: 100, detail: "Above ADA target 7.0" },
  { id: "egfr", label: "eGFR 76", type: "lab", x: 900, y: 380, detail: "Trending down 88→76" },
  // provider
  { id: "reid", label: "Dr. Reid", type: "provider", x: 500, y: 100, detail: "Primary Care · Aug 4" },
];

const edges: [string, string, string?][] = [
  ["you", "t2d"],
  ["you", "htn"],
  ["you", "hypo"],
  ["you", "gerd"],
  ["you", "vd"],
  ["you", "reid"],
  ["t2d", "metformin", "treats"],
  ["htn", "lisin", "treats"],
  ["hypo", "levo", "treats"],
  ["gerd", "ome", "treats"],
  ["vd", "d3", "treats"],
  ["lisin", "cough", "may cause"],
  ["metformin", "nausea", "may cause"],
  ["gerd", "heartburn", "manifests as"],
  ["t2d", "fatigue", "may cause"],
  ["t2d", "hba1c", "measured by"],
  ["htn", "egfr", "affects"],
  ["lisin", "egfr", "monitored via"],
  ["ome", "metformin", "B12 depletion"],
];

const typeStyles = {
  you: { fill: "var(--teal)", label: "You" },
  condition: { fill: "var(--leaf)", label: "Condition" },
  medication: { fill: "var(--ink)", label: "Medication" },
  symptom: { fill: "var(--coral)", label: "Symptom" },
  lab: { fill: "var(--amber)", label: "Lab" },
  document: { fill: "var(--ink-70)", label: "Document" },
  provider: { fill: "var(--teal-2)", label: "Provider" },
};

export default function GraphPage() {
  const [selected, setSelected] = useState<Node | null>(nodes[0]);
  const [filter, setFilter] = useState<string>("all");

  const visibleTypes = filter === "all" ? null : new Set([filter, "you"]);
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <>
      <Topbar
        title="Knowledge Graph"
        subtitle="Every fact CareNova knows about you, and how it connects. Tap a node to explore."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "condition", "medication", "symptom", "lab"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`chip !text-xs ${filter === f ? "chip-teal" : ""}`}
              >
                {f === "all" ? "Everything" : typeStyles[f as keyof typeof typeStyles].label + "s"}
              </button>
            ))}
          </div>
        }
      />

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 p-6 md:p-10">
          <div className="card overflow-hidden h-[640px] relative">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              <defs>
                <radialGradient id="youGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--teal-soft)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--teal-soft)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="500" cy="300" r="260" fill="url(#youGlow)" />

              {edges.map(([a, b, label], i) => {
                const na = nodeMap[a];
                const nb = nodeMap[b];
                if (visibleTypes && !visibleTypes.has(na.type) && !visibleTypes.has(nb.type)) return null;
                const mx = (na.x + nb.x) / 2;
                const my = (na.y + nb.y) / 2;
                const dim = selected && selected.id !== na.id && selected.id !== nb.id;
                return (
                  <g key={i} opacity={dim ? 0.15 : 1}>
                    <line
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      stroke="var(--ink-30)"
                      strokeWidth="1"
                      strokeDasharray={label ? "4 3" : "none"}
                    />
                    {label && (
                      <text
                        x={mx}
                        y={my - 4}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--ink-50)"
                        className="font-display"
                        style={{ fontStyle: "italic" }}
                      >
                        {label}
                      </text>
                    )}
                  </g>
                );
              })}

              {nodes.map((n) => {
                if (visibleTypes && !visibleTypes.has(n.type)) return null;
                const isSel = selected?.id === n.id;
                const dim = selected && !isSel && !edges.some(([a, b]) => (a === selected.id && b === n.id) || (b === selected.id && a === n.id));
                const r = n.type === "you" ? 22 : isSel ? 15 : 11;
                return (
                  <g
                    key={n.id}
                    onClick={() => setSelected(n)}
                    style={{ cursor: "pointer" }}
                    opacity={dim ? 0.35 : 1}
                  >
                    {isSel && <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke={typeStyles[n.type].fill} strokeOpacity="0.3" strokeWidth="2" />}
                    <circle cx={n.x} cy={n.y} r={r} fill={typeStyles[n.type].fill} />
                    <text x={n.x} y={n.y + r + 14} textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight={isSel ? "600" : "500"}>
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {Object.entries(typeStyles).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs text-[color:var(--ink-70)] bg-[color:var(--cream)]/80 backdrop-blur px-2 py-1 rounded-full border border-[color:var(--line)]">
                  <span className="w-2 h-2 rounded-full" style={{ background: v.fill }} />
                  {v.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-full max-w-sm border-l border-[color:var(--line)] p-6 md:p-8 flex-shrink-0 bg-[color:var(--cream)]">
          {selected ? (
            <div>
              <div className="chip mb-4" style={{ background: typeStyles[selected.type].fill + "20", color: typeStyles[selected.type].fill }}>
                {typeStyles[selected.type].label}
              </div>
              <h3 className="text-xl font-medium">{selected.label}</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-70)]">{selected.detail}</p>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-3">Connections</div>
                <div className="space-y-2">
                  {edges
                    .filter(([a, b]) => a === selected.id || b === selected.id)
                    .map(([a, b, label], i) => {
                      const other = nodeMap[a === selected.id ? b : a];
                      return (
                        <button
                          key={i}
                          onClick={() => setSelected(other)}
                          className="w-full text-left card-soft p-3 hover:border-[color:var(--line-strong)] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: typeStyles[other.type].fill }} />
                            <span className="text-sm font-medium">{other.label}</span>
                          </div>
                          {label && <div className="text-xs text-[color:var(--ink-70)] font-display italic mt-1">{label}</div>}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[color:var(--line)]">
                <div className="text-xs text-[color:var(--ink-70)] leading-relaxed">
                  Graph reasoning highlights: this node appears in <span className="font-medium text-[color:var(--ink)]">2 active AI insights</span>.
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-[color:var(--ink-70)]">Select a node to explore.</div>
          )}
        </aside>
      </div>
    </>
  );
}
