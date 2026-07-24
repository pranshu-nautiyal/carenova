import { Reveal } from "./Reveal";

export default function Problem() {
  return (
    <section className="border-y border-[color:var(--line)] bg-[color:var(--cream-2)]/50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="max-w-3xl">
          <div className="chip mb-6">The problem</div>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight">
            Patients are the most information-rich, {" "}
            <span className="font-display text-[color:var(--coral)]">least informationally-empowered</span> {" "}
            participants in their own care.
          </h2>
          <p className="mt-6 text-[color:var(--ink-70)] leading-relaxed">
            Your real health story — daily symptoms, subjective changes, labs and reports scattered
            across four different portals — has no home. Provider EHRs only see what happens inside
            a clinic. The result: duplicated tests, missed diagnoses, delayed care, adverse drug
            events, and surprise bills.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-4 gap-4">
          <Reveal delay={50}><StatBlock big="15 min" label="Average appointment window" note="Between visits your health is invisible to your care team." /></Reveal>
          <Reveal delay={150}><StatBlock big="4+" label="Portals per chronic patient" note="Records fragmented across providers, labs, pharmacies." /></Reveal>
          <Reveal delay={250}><StatBlock big="10%" label="ACE inhibitor patients develop dry cough" note="Symptoms rarely connected to the medication that caused them." /></Reveal>
          <Reveal delay={350}><StatBlock big="$120B" label="Wasted annually on duplicated tests" note="Because prior results couldn't be found in time." /></Reveal>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ big, label, note }: { big: string; label: string; note: string }) {
  return (
    <div className="card p-5 h-full">
      <div className="text-3xl font-medium tracking-tight text-[color:var(--teal)]">{big}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="mt-2 text-xs text-[color:var(--ink-70)] leading-relaxed">{note}</div>
    </div>
  );
}
