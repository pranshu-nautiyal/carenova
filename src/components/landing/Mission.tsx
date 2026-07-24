import Link from "next/link";

export default function Mission() {
  return (
    <section id="mission" className="border-t border-[color:var(--line)]">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="chip mb-6">Mission</div>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight">
            Access is only half the fight. {" "}
            <span className="font-display text-[color:var(--teal)]">Understanding is the other.</span>
          </h2>
          <p className="mt-6 text-[color:var(--ink-70)] leading-relaxed">
            Rep. Bill Foster's Medical Records Access Fairness Act (March 2026) guarantees patients
            free annual access to their own medical records. His Unique Patient Identifier work
            aims to stop health data from being scattered across providers.
          </p>
          <p className="mt-4 text-[color:var(--ink-70)] leading-relaxed">
            CareNova picks up from there. Patients now have the right to their records. We built
            the tool that reads them, connects them, and explains them — so access actually turns
            into understanding.
          </p>
        </div>

        <div className="card-soft p-8">
          <blockquote className="text-xl md:text-2xl leading-snug font-display text-[color:var(--ink)]">
            "Every patient is sitting on the most complete record of their own health that exists.
            They just can't read it, search it, or connect it to anything. We built the tool that can."
          </blockquote>
          <div className="mt-6 text-sm text-[color:var(--ink-70)]">
            — CareNova founding note
          </div>
          <div className="mt-8 pt-6 border-t border-[color:var(--line)] text-sm text-[color:var(--ink-70)]">
            <div className="font-medium text-[color:var(--ink)]">Congressional App Challenge 2026</div>
            <div className="mt-1">Illinois's 11th District · Rep. Bill Foster</div>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--line)] bg-[color:var(--teal)] text-[color:var(--cream)]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
              See what your records could tell you.
            </h3>
            <p className="mt-2 text-white/70 max-w-xl">
              Open a demo patient's full CareNova — knowledge graph, chatbot, timeline, everything.
            </p>
          </div>
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--cream)] text-[color:var(--teal-2)] font-medium hover:bg-white transition-colors"
          >
            Open the demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
