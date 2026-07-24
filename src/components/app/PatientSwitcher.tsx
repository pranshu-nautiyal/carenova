"use client";

import { useState, useTransition } from "react";
import { setActivePatient } from "@/lib/actions";
import type { PatientId } from "@/lib/patients";

export default function PatientSwitcher({
  active,
  list,
}: {
  active: PatientId;
  list: { id: PatientId; name: string; blurb: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const cur = list.find((p) => p.id === active) ?? list[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[color:var(--cream-2)] transition-colors text-left"
      >
        <div className="w-10 h-10 rounded-full bg-[color:var(--teal)] text-[color:var(--cream)] flex items-center justify-center font-medium text-sm flex-shrink-0">
          {cur.name.split(" ").map((s) => s[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate flex items-center gap-1.5">
            {cur.name}
            {pending && <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--teal)] animate-pulse" />}
          </div>
          <div className="text-xs text-[color:var(--ink-70)] truncate">{cur.blurb}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`text-[color:var(--ink-70)] transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-2 right-2 top-full mt-1.5 z-50 card p-1.5 shadow-[0_20px_50px_-20px_rgba(14,31,28,0.3)]">
          <div className="text-[10px] uppercase tracking-widest text-[color:var(--ink-50)] px-2 py-1.5">
            Demo patients
          </div>
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setOpen(false);
                start(() => setActivePatient(p.id));
              }}
              className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${
                p.id === active ? "bg-[color:var(--teal-soft)]" : "hover:bg-[color:var(--cream-2)]"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0 ${
                p.id === active ? "bg-[color:var(--teal)] text-[color:var(--cream)]" : "bg-[color:var(--cream-2)] text-[color:var(--ink-70)]"
              }`}>
                {p.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm truncate ${p.id === active ? "font-medium text-[color:var(--teal-2)]" : ""}`}>
                  {p.name}
                </div>
                <div className="text-[11px] text-[color:var(--ink-70)] truncate">{p.blurb}</div>
              </div>
              {p.id === active && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[color:var(--teal-2)]">
                  <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
          <div className="px-2 py-2 mt-1 border-t border-[color:var(--line)]">
            <div className="text-[11px] text-[color:var(--ink-70)] leading-relaxed">
              All three are fictional patients with fictional data. Toggle to see how CareNova adapts.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
