export default function Roadmap() {
  const phases = [
    {
      phase: "Phase 1 — Live in the demo",
      status: "shipping",
      items: [
        "Personal knowledge graph with your symptoms, meds, labs, and conditions",
        "Document upload with medical NLP extraction",
        "Grounded AI chatbot with source citations",
        "Interactive health timeline",
        "Medication interaction & side-effect watch",
        "Provider search with in-network cost estimation",
      ],
    },
    {
      phase: "Phase 2 — In development",
      status: "next",
      items: [
        "Apple Health & Google Fit continuous sync",
        "SMART on FHIR integration with major EHRs",
        "Voice symptom logging with medical NLP",
        "Caregiver mode: manage a parent's or child's record",
        "PDF export in FHIR document format for any provider",
      ],
    },
    {
      phase: "Phase 3 — Research",
      status: "later",
      items: [
        "Wearable-derived early warning for AFib and hypoglycemia",
        "Federated learning across consenting patients to sharpen side-effect detection",
        "Insurance appeal drafting assistance",
        "Multilingual clinical NLP (Spanish, Mandarin, Hindi)",
      ],
    },
  ];

  return (
    <section id="roadmap" className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-3xl mb-12">
        <div className="chip mb-6">Roadmap</div>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
          What's shipping now, {" "}
          <span className="font-display text-[color:var(--teal)]">what's next</span>.
        </h2>
        <p className="mt-5 text-[color:var(--ink-70)]">
          This is a Congressional App Challenge submission for IL-11 — a working, honest phase-one
          product, with a clear public roadmap for what comes after.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {phases.map((p) => (
          <div key={p.phase} className="card p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{p.phase}</div>
              <StatusChip s={p.status} />
            </div>
            <ul className="mt-5 space-y-3">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm text-[color:var(--ink-70)] leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    p.status === "shipping" ? "bg-[color:var(--teal)]" :
                    p.status === "next" ? "bg-[color:var(--amber)]" :
                    "bg-[color:var(--ink-30)]"
                  }`} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusChip({ s }: { s: string }) {
  if (s === "shipping") return <span className="chip chip-teal">Live in demo</span>;
  if (s === "next") return <span className="chip chip-amber">Next</span>;
  return <span className="chip">Later</span>;
}
