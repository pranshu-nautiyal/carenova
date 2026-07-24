const features = [
  {
    title: "One knowledge graph, your whole story",
    body: "Every symptom, med, lab value, document, and visit becomes a node. CareNova connects them with medical meaning — 'metformin may cause nausea', 'HbA1c is affected by lifestyle' — and it grows denser the more you use it.",
    icon: "graph",
  },
  {
    title: "AI reads your documents",
    body: "Upload a PDF, snap a photo of a prescription bottle, or connect your patient portal. Medical NLP extracts entities, normalizes them to standard codes, and threads them into your timeline with source citations.",
    icon: "doc",
  },
  {
    title: "Medication side-effect watch",
    body: "New symptom after a new med? CareNova sees the temporal pattern, checks it against the drug label, and tells you whether it's likely, possible, or unrelated — before your next appointment.",
    icon: "pill",
  },
  {
    title: "Lab trends, not just numbers",
    body: "Your HbA1c isn't a single value — it's a trajectory. CareNova flags values trending toward abnormal even while still in range, and shows them against guideline-based targets like ADA and AHA.",
    icon: "trend",
  },
  {
    title: "Proactive appointments",
    body: "Symptom escalating, screening overdue, chronic follow-up due — CareNova classifies urgency (routine / soon / urgent) and drafts a 'what to bring' summary that you can hand to your doctor.",
    icon: "cal",
  },
  {
    title: "Cost transparency, before the visit",
    body: "See real estimated cost per visit, prescription, or lab against your deductible and out-of-pocket max. Generic alternatives surfaced automatically.",
    icon: "money",
  },
  {
    title: "Chatbot grounded in your data",
    body: "Ask 'why is my cough not going away?' and get an answer sourced to your own logs and your own labs — not a generic health article. Emergency signals immediately route to emergency guidance.",
    icon: "chat",
  },
  {
    title: "Interactive health timeline",
    body: "Zoom out to see 5 years, zoom in to see this week. Symptoms, meds, labs, documents, visits, and AI insights all on one line so nothing falls through the cracks.",
    icon: "timeline",
  },
];

import { Reveal } from "./Reveal";

export default function Features() {
  return (
    <section id="platform" className="max-w-7xl mx-auto px-6 py-24">
      <Reveal className="max-w-3xl mb-14">
        <div className="chip mb-6">The platform</div>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
          Eight things working together, {" "}
          <span className="font-display text-[color:var(--teal)]">not eight apps</span>.
        </h2>
        <p className="mt-5 text-[color:var(--ink-70)]">
          Pieces of this exist separately today. CareNova is the first place they reason across each
          other, on top of your own data.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 60}>
            <div className="card p-6 h-full hover:border-[color:var(--line-strong)] hover:-translate-y-0.5 transition-all duration-300">
              <FeatureIcon kind={f.icon} />
              <h3 className="mt-5 text-base font-medium leading-snug">{f.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-70)] leading-relaxed">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ kind }: { kind: string }) {
  const common = "w-10 h-10 rounded-xl bg-[color:var(--teal-soft)] flex items-center justify-center text-[color:var(--teal-2)]";
  const paths: Record<string, React.ReactNode> = {
    graph: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="4" cy="4" r="2" fill="currentColor" />
        <circle cx="16" cy="4" r="2" fill="currentColor" />
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <circle cx="4" cy="16" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        <path d="M4 4l6 6M16 4l-6 6M10 10l-6 6M10 10l6 6" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    doc: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v3h3M7 10h6M7 13h6M7 16h4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    pill: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="7" width="16" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 7v6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    trend: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 15l4-5 3 3 5-7 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cal: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    money: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v8M8 8h3.5a1.5 1.5 0 010 3H8a1.5 1.5 0 000 3h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    chat: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4h14v10H7l-4 4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    timeline: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 10h16" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="10" r="1.6" fill="currentColor" />
        <circle cx="10" cy="10" r="1.6" fill="currentColor" />
        <circle cx="15" cy="10" r="1.6" fill="currentColor" />
      </svg>
    ),
  };
  return <div className={common}>{paths[kind]}</div>;
}
