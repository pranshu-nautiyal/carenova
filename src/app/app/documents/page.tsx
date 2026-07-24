"use client";

import Topbar from "@/components/app/Topbar";
import { documents } from "@/lib/mockData";
import { useState } from "react";

export default function DocumentsPage() {
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState(documents[0]);

  return (
    <>
      <Topbar
        title="Documents"
        subtitle="Everything CareNova has read, extracted, and threaded into your graph."
        actions={
          <>
            <button className="btn-secondary text-sm !py-2.5 !px-4">Connect a portal</button>
            <button className="btn-primary text-sm !py-2.5 !px-4">+ Upload</button>
          </>
        }
      />
      <div className="px-6 md:px-10 py-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={`card border-dashed !border-2 p-8 text-center transition-colors ${
              dragOver ? "bg-[color:var(--teal-soft)]" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[color:var(--teal-soft)] flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v10m0-10l-4 4m4-4l4 4M3 15v2h14v-2" stroke="var(--teal-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm font-medium">Drop a lab report, discharge summary, prescription, or photo</div>
            <div className="text-xs text-[color:var(--ink-70)] mt-1">
              PDF, PNG, JPG · CareNova extracts entities to RxNorm, LOINC, ICD-10, SNOMED
            </div>
            <div className="mt-5 flex gap-2 justify-center">
              <button className="btn-secondary text-xs !py-2 !px-3">Browse files</button>
              <button className="btn-secondary text-xs !py-2 !px-3">Take a photo</button>
              <button className="btn-secondary text-xs !py-2 !px-3">Connect Quest</button>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium mb-3">All documents ({documents.length})</div>
            <div className="card divide-y divide-[color:var(--line)]">
              {documents.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`w-full text-left p-4 flex items-center gap-4 hover:bg-[color:var(--cream-2)] transition-colors ${
                    selected.id === d.id ? "bg-[color:var(--cream-2)]" : ""
                  }`}
                >
                  <div className="w-10 h-12 rounded-md bg-[color:var(--cream-2)] border border-[color:var(--line)] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 1h7l3 3v11H3V1z" stroke="var(--ink-70)" strokeWidth="1.3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    <div className="text-xs text-[color:var(--ink-70)] mt-0.5">
                      {d.type} · {d.pages}p · {d.date}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`chip !text-[10px] !py-0.5 !px-1.5 ${d.status === "processed" ? "chip-leaf" : "chip-amber"}`}>
                      {d.status === "processed" ? "Extracted" : "Processing"}
                    </span>
                    <span className="text-[10px] text-[color:var(--ink-50)]">{d.source}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6 h-fit lg:sticky lg:top-24">
          <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-2">Extracted preview</div>
          <div className="text-lg font-medium">{selected.name}</div>
          <div className="text-xs text-[color:var(--ink-70)] mt-0.5">{selected.date} · {selected.source}</div>

          <div className="mt-6 space-y-4">
            <ExtractRow label="Document type" value={selected.type} conf={0.99} />
            <ExtractRow label="Provider" value="Dr. Marcus Reid, MD" conf={0.97} />
            <ExtractRow label="Facility" value="Naperville Internal Medicine" conf={0.95} />
            <ExtractRow label="Values found" value="6 lab measurements" conf={0.98} />
          </div>

          <div className="mt-6 pt-6 border-t border-[color:var(--line)]">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-3">Entities normalized</div>
            <div className="flex flex-wrap gap-1.5">
              {["HbA1c (LOINC 4548-4)", "LDL Cholesterol (LOINC 13457-7)", "TSH (LOINC 3016-3)", "eGFR (LOINC 33914-3)", "Vitamin D 25-OH (LOINC 62292-8)"].map((e) => (
                <span key={e} className="chip !text-[10px]">{e}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[color:var(--line)]">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-3">Threaded into graph</div>
            <div className="text-xs text-[color:var(--ink-70)] leading-relaxed">
              This document is now linked to nodes: <span className="text-[color:var(--ink)] font-medium">Type 2 Diabetes</span>, <span className="text-[color:var(--ink)] font-medium">Hypothyroidism</span>, <span className="text-[color:var(--ink)] font-medium">Vitamin D deficiency</span>, and 6 lab values across your timeline.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ExtractRow({ label, value, conf }: { label: string; value: string; conf: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-[color:var(--ink-70)]">{label}</span>
        <span className="text-[10px] text-[color:var(--ink-50)]">confidence {(conf * 100).toFixed(0)}%</span>
      </div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
