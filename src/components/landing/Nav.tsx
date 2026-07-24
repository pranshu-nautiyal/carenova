import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--cream)]/80 border-b border-[color:var(--line)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-medium tracking-tight">CareNova</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[color:var(--ink-70)]">
          <a href="#platform" className="hover:text-[color:var(--ink)]">Platform</a>
          <a href="#difference" className="hover:text-[color:var(--ink)]">Why CareNova</a>
          <a href="#roadmap" className="hover:text-[color:var(--ink)]">Roadmap</a>
          <a href="#mission" className="hover:text-[color:var(--ink)]">Mission</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/app/dashboard" className="hidden md:inline text-sm text-[color:var(--ink-70)] hover:text-[color:var(--ink)]">Sign in</Link>
          <Link href="/app/dashboard" className="btn-primary text-sm !py-2.5 !px-5">
            Open the demo
            <ArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="13" fill="var(--teal)" />
      <circle cx="9" cy="10" r="2" fill="var(--cream)" />
      <circle cx="19" cy="10" r="2" fill="var(--cream)" />
      <circle cx="14" cy="19" r="2.2" fill="var(--cream)" />
      <path d="M9 10 L14 19 M19 10 L14 19 M9 10 L19 10" stroke="var(--cream)" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
