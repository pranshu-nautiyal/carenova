import Topbar from "@/components/app/Topbar";
import { getActivePatient } from "@/lib/patients";

export default async function ProvidersPage() {
  const { providers, patient } = await getActivePatient();
  return (
    <>
      <Topbar
        title="Providers & Cost"
        subtitle="In-network doctors matched to your active care needs, with real cost against your plan."
        actions={
          <div className="flex items-center gap-2">
            <span className="chip">{patient.insurance.plan}</span>
            <button className="btn-secondary text-sm !py-2.5 !px-4">Change plan</button>
          </div>
        }
      />
      <div className="px-6 md:px-10 py-8 space-y-8 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-4">
          <SummaryCard title="Deductible" value={`$${patient.insurance.deductibleMet.toLocaleString()}`} of={`$${patient.insurance.deductible.toLocaleString()}`} pct={patient.insurance.deductibleMet / Math.max(1, patient.insurance.deductible)} note="After this, cost-share kicks in." />
          <SummaryCard title="Out-of-pocket max" value={`$${patient.insurance.oopMet.toLocaleString()}`} of={`$${patient.insurance.oopMax.toLocaleString()}`} pct={patient.insurance.oopMet / Math.max(1, patient.insurance.oopMax)} note="Above this, plan pays 100%." />
          <div className="card p-6">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)]">Est. remaining this year</div>
            <div className="mt-3 text-3xl font-medium">${(patient.insurance.oopMax - patient.insurance.oopMet > 0 ? Math.round((patient.insurance.oopMax - patient.insurance.oopMet) * 0.35) : 0).toLocaleString()}</div>
            <div className="mt-2 text-xs text-[color:var(--ink-70)] leading-relaxed">Based on projected visits, prescriptions, and screenings from your graph.</div>
          </div>
        </div>

        <div className="card p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="var(--ink-70)" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="var(--ink-70)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search by specialty, name, or condition" className="flex-1 bg-transparent outline-none text-sm py-1" />
          </div>
          {["Within 10 mi", "In-network", "Telehealth OK"].map((f) => (<span key={f} className="chip chip-teal">{f}</span>))}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-sm font-medium">CareNova recommends</div>
              <div className="text-xs text-[color:var(--ink-70)]">Based on active needs in your graph.</div>
            </div>
          </div>
          <div className="space-y-3">
            {providers.slice(0, 3).map((p) => (<ProviderCard key={p.id} p={p} />))}
          </div>
        </div>

        {providers.length > 3 && (
          <div>
            <div className="text-sm font-medium mb-3">More in-network providers</div>
            <div className="space-y-3">
              {providers.slice(3).map((p) => (<ProviderCard key={p.id} p={p} />))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ProviderCard({ p }: { p: { id: string; name: string; specialty: string; practice: string; distance: number; rating: number; reviews: number; inNetwork: boolean; telehealth: boolean; nextAvailable: string; estimatedCost: number; role: string } }) {
  return (
    <div className="card p-5 flex flex-col md:flex-row md:items-center gap-5">
      <div className="w-12 h-12 rounded-full bg-[color:var(--teal-soft)] text-[color:var(--teal-2)] flex items-center justify-center font-medium flex-shrink-0">
        {p.name.split(" ").slice(1, 3).map((s) => s[0]).join("")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-medium">{p.name}</div>
          <span className="chip !text-[10px]">{p.role}</span>
        </div>
        <div className="text-sm text-[color:var(--ink-70)] mt-0.5">{p.specialty} · {p.practice}</div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[color:var(--ink-70)]">
          <span>★ {p.rating} ({p.reviews})</span>
          <span>· {p.distance} mi</span>
          {p.telehealth && <span>· Telehealth</span>}
          {p.inNetwork ? <span className="text-[color:var(--leaf)]">· In-network</span> : <span className="text-[color:var(--coral)]">· Out-of-network</span>}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-[color:var(--ink-50)]">Next available</div>
        <div className="text-sm font-medium">{p.nextAvailable}</div>
        <div className="text-xs text-[color:var(--ink-70)] mt-1">Est. ${p.estimatedCost} copay</div>
        <button className="btn-primary text-xs !py-2 !px-3 mt-3">Book</button>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, of, pct, note }: { title: string; value: string; of: string; pct: number; note: string }) {
  return (
    <div className="card p-6">
      <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)]">{title}</div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-medium">{value}</span>
        <span className="text-sm text-[color:var(--ink-70)]">of {of}</span>
      </div>
      <div className="mt-3 h-1.5 bg-[color:var(--cream-2)] rounded-full overflow-hidden">
        <div className="h-full bg-[color:var(--teal)] rounded-full" style={{ width: `${Math.min(100, pct * 100)}%` }} />
      </div>
      <div className="mt-3 text-xs text-[color:var(--ink-70)]">{note}</div>
    </div>
  );
}
