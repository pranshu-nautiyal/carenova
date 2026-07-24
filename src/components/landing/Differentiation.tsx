const rows = [
  {
    product: "Ada Health",
    theyDo: "Session-based AI symptom checker",
    weAdd: "Persistent knowledge graph over time — plus documents, meds, cost tracking",
  },
  {
    product: "Patient portal / PHR apps",
    theyDo: "Store your documents",
    weAdd: "Extract entities, connect them, and reason across every document at once",
  },
  {
    product: "Epocrates",
    theyDo: "Drug interaction reference for providers",
    weAdd: "Patient-facing & proactive — watches your logged symptoms against your active meds",
  },
  {
    product: "Zocdoc / Practo",
    theyDo: "Doctor search & booking",
    weAdd: "Recommends the right specialty from your graph, with real cost before you book",
  },
  {
    product: "Apple Health / Google Fit",
    theyDo: "Display raw wearable data",
    weAdd: "Correlates wearable data with your symptoms, meds, and lab results",
  },
  {
    product: "Epic MyChart",
    theyDo: "Provider-maintained EHR access",
    weAdd: "Cross-provider, patient-owned, with your own logs — not just what the clinic captured",
  },
  {
    product: "Prescience (YC-backed)",
    theyDo: "AI care routing — sold to employers with 100+ staff",
    weAdd: "Direct-to-patient. No employer gatekeeper. Free for anyone with a phone.",
    highlight: true,
  },
];

export default function Differentiation() {
  return (
    <section id="difference" className="border-t border-[color:var(--line)] bg-[color:var(--cream-2)]/40">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-12">
          <div className="chip mb-6">Why CareNova</div>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight">
            Every piece exists somewhere. {" "}
            <span className="font-display text-[color:var(--teal)]">Nothing reasons across them.</span>
          </h2>
          <p className="mt-5 text-[color:var(--ink-70)]">
            The closest competitor, Prescience, only reaches you if your employer buys it. CareNova
            reaches the uninsured, Medicaid patients, gig workers, retirees, and small-business
            employees they structurally exclude.
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 border-b border-[color:var(--line)] text-xs uppercase tracking-widest text-[color:var(--ink-50)]">
            <div className="col-span-3">Existing product</div>
            <div className="col-span-4">What it does</div>
            <div className="col-span-5">What CareNova adds</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.product}
              className={`grid grid-cols-12 px-6 py-5 border-b border-[color:var(--line)] last:border-b-0 text-sm ${
                r.highlight ? "bg-[color:var(--teal-soft)]/40" : ""
              }`}
            >
              <div className="col-span-3 font-medium">{r.product}</div>
              <div className="col-span-4 text-[color:var(--ink-70)]">{r.theyDo}</div>
              <div className="col-span-5">{r.weAdd}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
