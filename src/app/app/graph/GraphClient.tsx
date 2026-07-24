"use client";

import { useMemo, useState } from "react";
import type { PatientData } from "@/lib/patients";

type Node = {
  id: string;
  label: string;
  type: "you" | "condition" | "medication" | "symptom" | "lab" | "provider";
  x: number;
  y: number;
  detail: string;
};

type Edge = [string, string, string?];

const typeStyles = {
  you: { fill: "var(--teal)", label: "You" },
  condition: { fill: "var(--leaf)", label: "Condition" },
  medication: { fill: "var(--ink)", label: "Medication" },
  symptom: { fill: "var(--coral)", label: "Symptom" },
  lab: { fill: "var(--amber)", label: "Lab" },
  provider: { fill: "var(--teal-2)", label: "Provider" },
};

function buildGraph(p: PatientData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const CX = 500, CY = 300;
  nodes.push({ id: "you", label: p.patient.name, type: "you", x: CX, y: CY, detail: `${p.patient.age} · ${p.patient.location} · ${p.patient.insurance.plan}` });

  const conds = p.conditions.slice(0, 5);
  conds.forEach((c, i) => {
    const angle = -Math.PI / 2 + (i / conds.length) * Math.PI * 2;
    const x = CX + Math.cos(angle) * 200;
    const y = CY + Math.sin(angle) * 180;
    nodes.push({ id: `c_${c.id}`, label: c.name, type: "condition", x, y, detail: `Since ${c.since} · ${c.icd}` });
    edges.push(["you", `c_${c.id}`]);
  });

  const meds = p.medications.slice(0, 6);
  meds.forEach((m, i) => {
    const angle = (i / meds.length) * Math.PI * 2;
    const x = CX + Math.cos(angle) * 350;
    const y = CY + Math.sin(angle) * 250;
    nodes.push({ id: `m_${m.id}`, label: m.name, type: "medication", x, y, detail: `${m.dose} · ${m.frequency} · adherence ${(m.adherence * 100).toFixed(0)}%` });
    const cond = conds.find((c) => m.for.toLowerCase().includes(c.name.split(" ")[0].toLowerCase()));
    if (cond) edges.push([`c_${cond.id}`, `m_${m.id}`, "treats"]);
    else edges.push(["you", `m_${m.id}`]);
    if (m.sideEffects[0]) {
      const relatedSym = p.symptoms.find((s) => m.sideEffects.some((se) => s.label.toLowerCase().includes(se.split(" ")[0].toLowerCase())));
      if (relatedSym) edges.push([`m_${m.id}`, `s_${relatedSym.id}`, "may cause"]);
    }
  });

  const syms = p.symptoms.slice(0, 5);
  syms.forEach((s, i) => {
    const angle = Math.PI / 2 + (i / syms.length) * Math.PI * 1.5;
    const x = CX + Math.cos(angle) * 300;
    const y = CY + Math.sin(angle) * 220;
    nodes.push({ id: `s_${s.id}`, label: s.label.length > 16 ? s.label.slice(0, 14) + "…" : s.label, type: "symptom", x, y, detail: `${s.date} · severity ${s.severity}/10` });
    if (!edges.some((e) => e[1] === `s_${s.id}`)) edges.push(["you", `s_${s.id}`]);
  });

  const labs = p.labs.slice(0, 3);
  labs.forEach((l, i) => {
    const angle = -Math.PI + (i / labs.length) * Math.PI;
    const x = CX + Math.cos(angle) * 350;
    const y = CY + Math.sin(angle) * 250;
    nodes.push({ id: `l_${l.id}`, label: `${l.name} ${l.value}`, type: "lab", x, y, detail: `${l.reference} · ${l.date}` });
    if (l.status === "above" || l.status === "monitor" || l.status === "below") {
      const cond = conds[0];
      if (cond) edges.push([`c_${cond.id}`, `l_${l.id}`, "measured by"]);
    } else {
      edges.push(["you", `l_${l.id}`]);
    }
  });

  const provider = p.providers[0];
  if (provider) {
    nodes.push({ id: `p_${provider.id}`, label: provider.name.split(" ").slice(0, 2).join(" "), type: "provider", x: CX, y: 90, detail: `${provider.specialty} · ${provider.practice}` });
    edges.push(["you", `p_${provider.id}`]);
  }

  return { nodes, edges };
}

export default function GraphClient({ patient }: { patient: PatientData }) {
  const { nodes, edges } = useMemo(() => buildGraph(patient), [patient]);
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const [selected, setSelected] = useState<Node | null>(nodes[0]);
  const [filter, setFilter] = useState<string>("all");

  const visibleTypes = filter === "all" ? null : new Set([filter, "you"]);

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 min-w-0 p-6 md:p-10">
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          {(["all", "condition", "medication", "symptom", "lab"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`chip !text-xs ${filter === f ? "chip-teal" : ""}`}>
              {f === "all" ? "Everything" : typeStyles[f as keyof typeof typeStyles].label + "s"}
            </button>
          ))}
        </div>
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
              if (!na || !nb) return null;
              if (visibleTypes && !visibleTypes.has(na.type) && !visibleTypes.has(nb.type)) return null;
              const mx = (na.x + nb.x) / 2;
              const my = (na.y + nb.y) / 2;
              const dim = selected && selected.id !== na.id && selected.id !== nb.id;
              return (
                <g key={i} opacity={dim ? 0.15 : 1}>
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--ink-30)" strokeWidth="1" strokeDasharray={label ? "4 3" : "none"} />
                  {label && (<text x={mx} y={my - 4} textAnchor="middle" fontSize="10" fill="var(--ink-50)" style={{ fontStyle: "italic", fontFamily: "var(--font-fraunces), serif" }}>{label}</text>)}
                </g>
              );
            })}

            {nodes.map((n) => {
              if (visibleTypes && !visibleTypes.has(n.type)) return null;
              const isSel = selected?.id === n.id;
              const dim = selected && !isSel && !edges.some(([a, b]) => (a === selected.id && b === n.id) || (b === selected.id && a === n.id));
              const r = n.type === "you" ? 22 : isSel ? 15 : 11;
              return (
                <g key={n.id} onClick={() => setSelected(n)} style={{ cursor: "pointer" }} opacity={dim ? 0.35 : 1}>
                  {isSel && <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke={typeStyles[n.type].fill} strokeOpacity="0.3" strokeWidth="2" />}
                  <circle cx={n.x} cy={n.y} r={r} fill={typeStyles[n.type].fill} />
                  <text x={n.x} y={n.y + r + 14} textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight={isSel ? "600" : "500"}>{n.label}</text>
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
                    if (!other) return null;
                    return (
                      <button key={i} onClick={() => setSelected(other)} className="w-full text-left card-soft p-3 hover:border-[color:var(--line-strong)] transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: typeStyles[other.type].fill }} />
                          <span className="text-sm font-medium">{other.label}</span>
                        </div>
                        {label && <div className="text-xs text-[color:var(--ink-70)] italic mt-1" style={{ fontFamily: "var(--font-fraunces), serif" }}>{label}</div>}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-[color:var(--ink-70)]">Select a node to explore.</div>
        )}
      </aside>
    </div>
  );
}
