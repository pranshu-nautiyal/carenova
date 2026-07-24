"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { patient } from "@/lib/mockData";

const nav = [
  { href: "/app/dashboard", label: "Dashboard", icon: "home" },
  { href: "/app/insights", label: "Insights", icon: "bulb", badge: 3 },
  { href: "/app/timeline", label: "Timeline", icon: "timeline" },
  { href: "/app/graph", label: "Knowledge Graph", icon: "graph" },
  { href: "/app/chat", label: "Ask CareNova", icon: "chat" },
  { href: "/app/documents", label: "Documents", icon: "doc" },
  { href: "/app/medications", label: "Medications", icon: "pill" },
  { href: "/app/providers", label: "Providers & Cost", icon: "money" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-[color:var(--line)] bg-[color:var(--cream)] sticky top-0 h-screen">
      <Link href="/" className="flex items-center gap-2 h-16 px-6 border-b border-[color:var(--line)]">
        <Logo />
        <span className="text-lg font-medium tracking-tight">CareNova</span>
      </Link>

      <div className="px-4 py-5 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[color:var(--teal)] text-[color:var(--cream)] flex items-center justify-center font-medium">
            {patient.name.split(" ").map((s) => s[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{patient.name}</div>
            <div className="text-xs text-[color:var(--ink-70)] truncate">{patient.age} · {patient.location}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                active
                  ? "bg-[color:var(--teal-soft)] text-[color:var(--teal-2)] font-medium"
                  : "text-[color:var(--ink-70)] hover:bg-[color:var(--cream-2)] hover:text-[color:var(--ink)]"
              }`}
            >
              <NavIcon kind={item.icon} active={active} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-[color:var(--coral)] text-white font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[color:var(--line)]">
        <div className="card-soft p-3 text-xs">
          <div className="flex items-center gap-1.5 text-[color:var(--ink-70)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral)]" />
            Demo mode
          </div>
          <div className="mt-1.5 text-[color:var(--ink-70)] leading-relaxed">
            Data shown belongs to a fictional patient, Sarah Chen.
          </div>
        </div>
      </div>
    </aside>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" fill="var(--teal)" />
      <circle cx="9" cy="10" r="2" fill="var(--cream)" />
      <circle cx="19" cy="10" r="2" fill="var(--cream)" />
      <circle cx="14" cy="19" r="2.2" fill="var(--cream)" />
      <path d="M9 10 L14 19 M19 10 L14 19 M9 10 L19 10" stroke="var(--cream)" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}

function NavIcon({ kind, active }: { kind: string; active: boolean }) {
  const color = active ? "var(--teal-2)" : "var(--ink-70)";
  const p: Record<string, React.ReactNode> = {
    home: <path d="M2 8l7-5 7 5v7a1 1 0 01-1 1H3a1 1 0 01-1-1V8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />,
    bulb: <path d="M9 1a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9zM7 15h4M8 17h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
    timeline: <><path d="M2 9h14" stroke={color} strokeWidth="1.5" /><circle cx="4" cy="9" r="1.5" fill={color}/><circle cx="9" cy="9" r="1.5" fill={color}/><circle cx="14" cy="9" r="1.5" fill={color}/></>,
    graph: <><circle cx="4" cy="4" r="1.8" fill={color}/><circle cx="14" cy="4" r="1.8" fill={color}/><circle cx="9" cy="9" r="2.2" fill={color}/><circle cx="4" cy="14" r="1.8" fill={color}/><circle cx="14" cy="14" r="1.8" fill={color}/><path d="M4 4l5 5M14 4l-5 5M9 9l-5 5M9 9l5 5" stroke={color} strokeWidth="0.8" /></>,
    chat: <path d="M3 3h12v9H6l-3 3V3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />,
    doc: <><path d="M4 2h7l3 3v11H4V2z" stroke={color} strokeWidth="1.5" /><path d="M11 2v3h3" stroke={color} strokeWidth="1.5" /></>,
    pill: <><rect x="1" y="6" width="16" height="6" rx="3" stroke={color} strokeWidth="1.5" /><path d="M9 6v6" stroke={color} strokeWidth="1.5" /></>,
    money: <><circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.5" /><path d="M9 5v8M7 7h3.5a1.5 1.5 0 010 3H7a1.5 1.5 0 000 3h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></>,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {p[kind]}
    </svg>
  );
}
