import Topbar from "@/components/app/Topbar";
import Link from "next/link";
import {
  patient,
  insights,
  labs,
  medications,
  upcomingAppointments,
  wearable,
  symptoms,
} from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title={`Good morning, ${patient.name.split(" ")[0]}.`}
        subtitle="3 new AI insights since your last visit. 1 needs attention."
        actions={
          <>
            <Link href="/app/chat" className="btn-secondary text-sm !py-2.5 !px-4">
              Ask CareNova
            </Link>
            <button className="btn-primary text-sm !py-2.5 !px-4">
              Log a symptom
            </button>
          </>
        }
      />

      <div className="px-6 md:px-10 py-8 space-y-8 max-w-[1400px]">
        {/* Top row: hero insight + next appt */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card p-6 relative overflow-hidden">
            <div className="flex items-start gap-3 flex-wrap">
              <span className="chip chip-coral">Needs attention · Possible side effect</span>
              <span className="chip">Confidence: high</span>
            </div>
            <h2 className="mt-4 text-xl md:text-2xl font-medium leading-snug max-w-2xl">
              Your <span className="font-display text-[color:var(--coral)]">dry cough</span> may be caused by Lisinopril.
            </h2>
            <p className="mt-3 text-sm text-[color:var(--ink-70)] max-w-2xl leading-relaxed">
              You've logged a dry cough on 4 of the last 10 days, and it hasn't cleared. About 10% of
              ACE-inhibitor patients develop this exact side effect. Worth mentioning at your Aug 4 visit —
              an ARB like losartan is a common alternative.
            </p>
            <div className="mt-5 flex gap-2 flex-wrap">
              <Link href="/app/insights" className="btn-primary text-sm !py-2 !px-4">See full analysis</Link>
              <button className="btn-secondary text-sm !py-2 !px-4">Add to visit prep</button>
            </div>
            <div className="absolute right-6 top-6 opacity-30">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <circle cx="35" cy="35" r="34" stroke="var(--coral)" strokeWidth="1" strokeDasharray="4 3"/>
                <circle cx="35" cy="35" r="8" fill="var(--coral)" fillOpacity="0.3"/>
              </svg>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)]">Next appointment</div>
            <div className="mt-3 text-lg font-medium">{upcomingAppointments[0].provider}</div>
            <div className="text-sm text-[color:var(--ink-70)]">{upcomingAppointments[0].specialty}</div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="w-11 h-11 rounded-lg bg-[color:var(--teal-soft)] text-[color:var(--teal-2)] flex flex-col items-center justify-center leading-none">
                <div className="text-[10px] uppercase mt-0.5">Aug</div>
                <div className="text-base font-medium">4</div>
              </div>
              <div>
                <div>{upcomingAppointments[0].time}</div>
                <div className="text-[color:var(--ink-70)] text-xs">{upcomingAppointments[0].reason}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="chip chip-leaf">Prep pack ready</span>
              <span className="text-[color:var(--ink-70)]">Est. $30</span>
            </div>
          </div>
        </div>

        {/* Second row: vitals + meds + insurance */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Vitals & wearable</div>
              <span className="text-xs text-[color:var(--ink-50)]">last 14 days</span>
            </div>
            <div className="mt-5 space-y-4">
              <VitalRow label="Resting HR" values={wearable.restingHeartRate} unit="bpm" avg={66} />
              <VitalRow label="Sleep" values={wearable.sleepHours} unit="h" avg={6.7} />
              <VitalRow label="BP systolic" values={wearable.bpSystolic} unit="mmHg" avg={138} warn />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Active medications</div>
              <Link href="/app/medications" className="text-xs text-[color:var(--teal-2)]">Manage</Link>
            </div>
            <div className="mt-4 space-y-3">
              {medications.slice(0, 4).map((m) => (
                <div key={m.id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-[color:var(--ink-70)] text-xs">{m.dose} · {m.frequency}</div>
                  </div>
                  <div className="text-xs text-[color:var(--ink-70)]">
                    {(m.adherence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[color:var(--line)] text-xs text-[color:var(--ink-70)] flex justify-between">
              <span>Refill in 8 days: Omeprazole</span>
              <button className="text-[color:var(--teal-2)]">Remind</button>
            </div>
          </div>

          <div className="card p-6">
            <div className="text-sm font-medium">Costs this year</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-medium">${patient.insurance.oopMet.toLocaleString()}</span>
              <span className="text-sm text-[color:var(--ink-70)]">/ ${patient.insurance.oopMax.toLocaleString()} OOP max</span>
            </div>
            <ProgressBar value={patient.insurance.oopMet} max={patient.insurance.oopMax} />
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-medium">${patient.insurance.deductibleMet.toLocaleString()}</span>
              <span className="text-sm text-[color:var(--ink-70)]">/ ${patient.insurance.deductible.toLocaleString()} deductible</span>
            </div>
            <ProgressBar value={patient.insurance.deductibleMet} max={patient.insurance.deductible} />
            <div className="mt-5 text-xs text-[color:var(--ink-70)]">
              {patient.insurance.plan}
            </div>
          </div>
        </div>

        {/* Labs summary */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Latest labs — June 14</div>
              <div className="text-xs text-[color:var(--ink-70)] mt-0.5">6 values from Quest Metabolic Panel</div>
            </div>
            <Link href="/app/timeline" className="text-xs text-[color:var(--teal-2)]">Trend view</Link>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {labs.map((l) => (
              <div key={l.id} className="card-soft p-3">
                <div className="text-xs text-[color:var(--ink-70)] truncate">{l.name}</div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-lg font-medium">{l.value}</span>
                  <span className="text-xs text-[color:var(--ink-70)]">{l.unit}</span>
                </div>
                <div className="mt-1.5">
                  <span
                    className={`chip ${
                      l.status === "above"
                        ? "chip-coral"
                        : l.status === "below"
                        ? "chip-amber"
                        : l.status === "monitor"
                        ? "chip-amber"
                        : "chip-leaf"
                    } !text-[10px] !py-0.5 !px-1.5`}
                  >
                    {l.status === "above" ? "Above target" : l.status === "below" ? "Below target" : l.status === "monitor" ? "Watch" : "Normal"}
                  </span>
                </div>
                <Sparkline values={l.trend} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent insights + symptoms */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Recent AI insights</div>
              <Link href="/app/insights" className="text-xs text-[color:var(--teal-2)]">See all</Link>
            </div>
            <div className="mt-5 divide-y divide-[color:var(--line)]">
              {insights.slice(0, 4).map((i) => (
                <div key={i.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    i.severity === "moderate" ? "bg-[color:var(--coral)]" :
                    i.severity === "minor" ? "bg-[color:var(--amber)]" : "bg-[color:var(--leaf)]"
                  }`}/>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs text-[color:var(--ink-70)]">{i.tag}</span>
                      <span className="text-[10px] text-[color:var(--ink-50)]">{i.date}</span>
                    </div>
                    <div className="text-sm font-medium">{i.title}</div>
                    <div className="text-xs text-[color:var(--ink-70)] mt-1 line-clamp-2">{i.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Latest symptoms</div>
              <button className="text-xs text-[color:var(--teal-2)]">+ Log</button>
            </div>
            <div className="mt-5 space-y-3.5">
              {symptoms.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-start gap-3 text-sm">
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    s.severity >= 4 ? "bg-[color:var(--coral)]" :
                    s.severity >= 3 ? "bg-[color:var(--amber)]" :
                    "bg-[color:var(--leaf)]"
                  }`}/>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{s.label}</div>
                    <div className="text-xs text-[color:var(--ink-70)]">{s.date} · severity {s.severity}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function VitalRow({ label, values, unit, avg, warn }: { label: string; values: number[]; unit: string; avg: number; warn?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-[color:var(--ink-70)]">{label}</span>
        <span>
          <span className={`font-medium ${warn ? "text-[color:var(--coral)]" : ""}`}>{avg}</span>
          <span className="text-xs text-[color:var(--ink-70)] ml-1">{unit}</span>
        </span>
      </div>
      <Sparkline values={values} />
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 120;
  const h = 28;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7 mt-2">
      <polyline points={pts} fill="none" stroke="var(--teal)" strokeWidth="1.5" />
    </svg>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mt-2 h-1.5 bg-[color:var(--cream-2)] rounded-full overflow-hidden">
      <div className="h-full bg-[color:var(--teal)] rounded-full" style={{ width: `${pct}%` }} />
    </div>
  );
}
