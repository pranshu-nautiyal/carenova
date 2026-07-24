import Topbar from "@/components/app/Topbar";
import { getActivePatient } from "@/lib/patients";

export default async function InsightsPage() {
  const { insights } = await getActivePatient();
  return (
    <>
      <Topbar
        title="AI Insights"
        subtitle="Everything CareNova has noticed across your records, symptoms, and meds."
        actions={<button className="btn-secondary text-sm !py-2.5 !px-4">Filter</button>}
      />
      <div className="px-6 md:px-10 py-8 max-w-4xl">
        <div className="space-y-4">
          {insights.map((i) => (
            <div key={i.id} className="card p-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`chip ${
                  i.severity === "moderate" ? "chip-coral" :
                  i.severity === "minor" ? "chip-amber" : "chip-leaf"
                }`}>{i.tag}</span>
                <span className="text-xs text-[color:var(--ink-50)]">{i.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-medium leading-snug">{i.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-70)] leading-relaxed">{i.body}</p>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-2">Sources</div>
                  <ul className="space-y-1.5">
                    {i.sources.map((s) => (
                      <li key={s} className="text-xs text-[color:var(--ink-70)] flex gap-2">
                        <span className="text-[color:var(--teal)]">→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-2">Suggested action</div>
                  <div className="text-sm">{i.action}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="btn-primary text-xs !py-1.5 !px-3">Add to visit prep</button>
                    <button className="btn-secondary text-xs !py-1.5 !px-3">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
