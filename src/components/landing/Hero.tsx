import Link from "next/link";
import IllustratedScene from "./IllustratedScene";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
        <div className="animate-fade-up">
          <div className="chip chip-teal mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--teal)]" />
            Built for the Congressional App Challenge · IL-11
          </div>
          <h1 className="text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight">
            Your health,{" "}
            <span className="font-display text-[color:var(--teal)]">finally</span>{" "}
            in one place.
          </h1>
          <p className="mt-6 text-lg text-[color:var(--ink-70)] max-w-xl leading-relaxed">
            Congress gave patients the right to their own medical records. CareNova is the part
            that comes next — an AI that reads them, connects them to your symptoms and meds,
            and explains your health in plain English.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/app/dashboard" className="btn-primary">
              Try the live demo
              <ArrowRight />
            </Link>
            <a href="#platform" className="btn-secondary">
              How it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-[color:var(--ink-50)]">
            <Stat n="32" label="Records unified" />
            <div className="w-px h-8 bg-[color:var(--line)]" />
            <Stat n="4" label="Portals in one graph" />
            <div className="w-px h-8 bg-[color:var(--line)]" />
            <Stat n="12" label="AI insights this month" />
          </div>
        </div>

        <div className="relative">
          <IllustratedScene />
        </div>
      </div>

      <div className="absolute top-24 -right-20 w-[420px] h-[420px] rounded-full bg-[color:var(--teal-soft)] blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-[color:var(--cream-2)] blur-3xl opacity-60 pointer-events-none" />
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl text-[color:var(--ink)] font-medium">{n}</div>
      <div className="text-xs uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
