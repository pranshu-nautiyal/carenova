import Topbar from "@/components/app/Topbar";
import { medications, interactions } from "@/lib/mockData";

export default function MedicationsPage() {
  return (
    <>
      <Topbar
        title="Medications"
        subtitle="Your active list, adherence, side effects to watch, and interaction analysis."
        actions={<button className="btn-primary text-sm !py-2.5 !px-4">+ Add medication</button>}
      />

      <div className="px-6 md:px-10 py-8 space-y-8 max-w-6xl">
        {/* Interaction warnings */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">Interaction watch</div>
              <div className="text-xs text-[color:var(--ink-70)] mt-0.5">Cross-checked against your active meds and logged OTC use</div>
            </div>
            <span className="chip chip-amber">{interactions.length} to review</span>
          </div>
          <div className="space-y-3">
            {interactions.map((i) => (
              <div key={i.id} className="card-soft p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`chip ${
                        i.severity === "moderate" ? "chip-coral" :
                        i.severity === "minor" ? "chip-amber" : "chip-teal"
                      }`}>
                        {i.severity}
                      </span>
                      <span className="text-sm font-medium">
                        {i.drugs.join(" ✕ ")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[color:var(--ink-70)] leading-relaxed">{i.plain}</p>
                    <div className="mt-2.5 text-xs">
                      <span className="text-[color:var(--ink-50)] uppercase tracking-widest mr-2">Action</span>
                      <span>{i.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Med list */}
        <div>
          <div className="text-sm font-medium mb-4">Active medications ({medications.length})</div>
          <div className="grid md:grid-cols-2 gap-4">
            {medications.map((m) => (
              <div key={m.id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-medium">{m.name}</div>
                    <div className="text-xs text-[color:var(--ink-70)]">{m.brand}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{m.dose}</div>
                    <div className="text-xs text-[color:var(--ink-70)]">{m.frequency}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[color:var(--line)] grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="text-[color:var(--ink-50)] uppercase tracking-widest text-[10px]">For</div>
                    <div className="mt-1">{m.for}</div>
                  </div>
                  <div>
                    <div className="text-[color:var(--ink-50)] uppercase tracking-widest text-[10px]">Prescriber</div>
                    <div className="mt-1">{m.prescriber}</div>
                  </div>
                  <div>
                    <div className="text-[color:var(--ink-50)] uppercase tracking-widest text-[10px]">Since</div>
                    <div className="mt-1">{m.started}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[color:var(--ink-70)]">Adherence (last 30 days)</span>
                    <span className="font-medium">{(m.adherence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-[color:var(--cream-2)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        m.adherence > 0.9 ? "bg-[color:var(--leaf)]" :
                        m.adherence > 0.8 ? "bg-[color:var(--amber)]" :
                        "bg-[color:var(--coral)]"
                      }`}
                      style={{ width: `${m.adherence * 100}%` }}
                    />
                  </div>
                </div>

                {m.sideEffects.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[color:var(--line)]">
                    <div className="text-[color:var(--ink-50)] uppercase tracking-widest text-[10px] mb-2">Watch for</div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sideEffects.map((s) => (
                        <span key={s} className="chip !text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {m.nextRefill && (
                  <div className="mt-4 pt-4 border-t border-[color:var(--line)] flex items-center justify-between text-xs">
                    <span className="text-[color:var(--ink-70)]">Next refill: {m.nextRefill}</span>
                    <span className={m.refillsLeft && m.refillsLeft <= 1 ? "text-[color:var(--coral)]" : "text-[color:var(--ink-70)]"}>
                      {m.refillsLeft} left
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
