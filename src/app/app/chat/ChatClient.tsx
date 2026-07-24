"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string; sources?: string[]; typing?: boolean };

const responsesByPatient: Record<string, Record<string, { content: string; sources: string[] }>> = {
  sarah: {
    cough: {
      content: "Based on your logs, your dry cough started around July 13 and has appeared on 4 of the last 10 days. This is the classic ACE-inhibitor cough — reported in ~10% of patients on Lisinopril.\n\nSince your Lisinopril has been effective for your blood pressure, you likely don't want to just stop it. But there's a well-established alternative: an ARB like losartan works on the same pathway without causing the cough.\n\nI'd bring this up at your August 4 visit with Dr. Reid — I've already added it to your prep pack.",
      sources: ["Your symptom log (7 entries, 7/13–7/22)", "Lisinopril label — DailyMed", "AHA 2024 hypertension guideline", "Your BP trend chart"],
    },
    hba1c: {
      content: "Your HbA1c is 7.3, and the ADA recommends most adults with type 2 diabetes target below 7.0.\n\nGood news: you're trending in the right direction. Over 24 months you've gone from 8.4 → 7.3 — real progress. The gap left is what a moderate intensification would close: a second agent (SGLT2 or GLP-1), tighter carb management around dinner, or a modest metformin increase.\n\nNot urgent, but worth a conversation Aug 4.",
      sources: ["Your lab report — Quest 6/14/2026", "24-month HbA1c trend", "ADA Standards of Care 2026 § 9.3", "Your late-dinner pattern"],
    },
    default: {
      content: "I answer only when I can ground the answer in your data. Try asking about your cough, your HbA1c, screenings, or your Aug 4 visit.",
      sources: ["Your active health graph"],
    },
  },
  james: {
    hf: {
      content: "Yes — the pattern you're logging is exactly what Dr. Sun asked you to watch for.\n\n1. Weight up 3 lbs in a week without diet change.\n2. Bilateral ankle swelling by evening.\n3. New fatigue climbing stairs.\n4. BNP has been slowly rising (390 → 385 range).\n\nAny one of these on its own would be minor. Together they suggest early fluid overload — early HF decompensation. Do not wait until July 28. Call Dr. Sun's nurse line today. They may adjust your Furosemide dose or add a short course of extra diuresis.",
      sources: ["Your symptom log (7/15–7/22)", "Weight tracker", "BNP trend 2024–2026", "AHA HF self-monitoring guide", "Dr. Sun's post-admission plan"],
    },
    ibuprofen: {
      content: "No — you should stop the ibuprofen.\n\nApixaban (Eliquis) is an anticoagulant. Ibuprofen and other NSAIDs raise your GI bleeding risk substantially when combined. You've logged ibuprofen 4× in the last 30 days for knee pain.\n\nSafer options: acetaminophen (Tylenol) up to 3g/day, topical diclofenac gel for the knee itself, or a formal referral to PT. Ask Dr. Sun before starting anything new — with your kidneys at eGFR 52, some pain meds need dose adjustment too.",
      sources: ["Your OTC log", "Apixaban label — DailyMed", "AGS Beers Criteria 2023", "Your recent renal panel"],
    },
    bnp: {
      content: "BNP is a hormone your heart releases when it's under strain. High BNP = heart working harder than it should.\n\nYours today: 385 pg/mL. Normal is under 100. Yours is elevated because of your heart failure — that's expected, and it's actually better than your worst reading (520 in April 2024). It's the direction that matters most — if BNP starts climbing sharply, that's a sign of decompensation.",
      sources: ["Your BNP results 2024–2026", "AHA heart failure staging guide"],
    },
    default: {
      content: "I ground answers in your records. Try asking about your fluid overload signs, ibuprofen safety, BNP, or which meds care about your kidneys.",
      sources: ["Your active health graph"],
    },
  },
  maya: {
    migraine: {
      content: "Two things drive your migraines in the data I can see: skipped meals and short sleep.\n\nYour two July migraines both followed a night with under 6 hours of sleep AND a skipped meal. Your tension headaches don't follow this pattern — they follow long screen-time days. That tells us the mechanism is likely different.\n\nPractical experiment for the next 2 weeks: 3 meals a day (no skipping), 7-hour sleep minimum, magnesium 400mg at night. Log everything. If migraine count drops, you've got your levers. Bring the data to Dr. Kim.",
      sources: ["Your symptom log (past 60 days)", "Your sleep tracker", "Your meal log", "AAN 2019 migraine trigger guide"],
    },
    prediabetes: {
      content: "Officially, yes — but this is where you can change the story.\n\nYour fasting glucose is 108 (100–125 = prediabetes range) and HbA1c is 5.7 (5.7–6.4 = prediabetes). With PCOS this trajectory is common. What matters is you're 24 and metformin is already on board.\n\nThe interventions with real evidence at your stage: strength training 2–3×/week, 20–30g protein at breakfast, and going for a 10-min walk after your largest meal. These outperform every supplement on the market for insulin sensitivity.",
      sources: ["Your labs 2024–2026", "ADA Standards of Care 2026", "Your PCOS diagnostic workup"],
    },
    imitrex: {
      content: "You have three options that all save real money on Imitrex:\n\n1. **Switch to generic sumatriptan.** Same drug, no brand markup. Costco pharmacy has it around $28 out of pocket vs. $340 for brand.\n2. **Manufacturer coupon.** GSK's Imitrex savings program covers up to $200/fill for commercial-plan users. You qualify.\n3. **Ask about rizatriptan.** Also generic, some people find it more effective — worth a trial if #1 doesn't work as well.\n\nEasiest single action: text Dr. Kim to change the label from brand to generic on your next refill.",
      sources: ["Your July pharmacy claim", "GoodRx price index", "Your BlueCross HMO plan detail"],
    },
    default: {
      content: "I ground answers in your records. Try asking about your migraine triggers, prediabetes status, or how to cut your Imitrex cost.",
      sources: ["Your active health graph"],
    },
  },
};

function pickResponse(patientId: string, q: string) {
  const l = q.toLowerCase();
  const bank = responsesByPatient[patientId] ?? responsesByPatient.sarah;

  if (patientId === "sarah") {
    if (l.match(/cough|medication|side effect/)) return bank.cough;
    if (l.match(/hba1c|a1c|sugar|diabetes/)) return bank.hba1c;
    return bank.default;
  }
  if (patientId === "james") {
    if (l.match(/heart failure|decompensat|swelling|weight|fluid|call/)) return bank.hf;
    if (l.match(/ibuprofen|nsaid|advil|pain/)) return bank.ibuprofen;
    if (l.match(/bnp/)) return bank.bnp;
    return bank.default;
  }
  if (patientId === "maya") {
    if (l.match(/migraine|trigger|headache/)) return bank.migraine;
    if (l.match(/prediabet|diabet|a1c|glucose/)) return bank.prediabetes;
    if (l.match(/imitrex|sumatriptan|cost|save|cheap/)) return bank.imitrex;
    return bank.default;
  }
  return bank.default;
}

export default function ChatClient({
  patientName,
  docsCount,
  suggestions,
  patientId,
}: {
  patientName: string;
  docsCount: number;
  suggestions: string[];
  patientId: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi ${patientName} — I've read all ${docsCount} of your records and know your full graph. Ask me anything about your health. Every answer I give you is grounded in your own data with sources shown.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || sending) return;
    setSending(true);
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setMessages((m) => [...m, { role: "assistant", content: "", typing: true }]);
    setTimeout(() => {
      const r = pickResponse(patientId, q);
      setMessages((m) => {
        const next = m.slice(0, -1);
        next.push({ role: "assistant", content: r.content, sources: r.sources });
        return next;
      });
      setSending(false);
    }, 900);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((m, i) => (<Message key={i} msg={m} />))}
        </div>
      </div>

      {messages.length === 1 && (
        <div className="max-w-3xl mx-auto w-full px-6 md:px-10 pb-4">
          <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-3">Try asking</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-sm px-3 py-2 rounded-full border border-[color:var(--line-strong)] hover:bg-[color:var(--cream-2)] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-[color:var(--line)] bg-[color:var(--cream)]">
        <div className="max-w-3xl mx-auto w-full px-6 md:px-10 py-4">
          <div className="flex items-center gap-2 card p-2 pl-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Ask about your labs, meds, symptoms, or next visit…"
              className="flex-1 bg-transparent outline-none text-sm py-2"
            />
            <button onClick={() => send()} disabled={!input.trim() || sending} className="btn-primary !py-2 !px-4 text-sm disabled:opacity-50">Ask</button>
          </div>
          <div className="mt-2 text-[10px] text-[color:var(--ink-50)] text-center">
            CareNova is not a doctor. In an emergency, call 911.
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-[color:var(--teal)] text-[color:var(--cream)] text-sm">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-[color:var(--teal-soft)] flex-shrink-0 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="var(--teal)" />
          <circle cx="5" cy="6" r="1" fill="var(--cream)" />
          <circle cx="11" cy="6" r="1" fill="var(--cream)" />
          <circle cx="8" cy="11" r="1.3" fill="var(--cream)" />
        </svg>
      </div>
      <div className="flex-1 max-w-[85%]">
        {msg.typing ? (
          <div className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm card-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--ink-70)] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--ink-70)] animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--ink-70)] animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <>
            <div className="px-5 py-4 rounded-2xl rounded-tl-sm card-soft text-sm leading-relaxed whitespace-pre-wrap">
              {msg.content.split("**").map((part, i) => i % 2 === 0 ? part : <strong key={i} className="font-medium">{part}</strong>)}
            </div>
            {msg.sources && (
              <div className="mt-3 pl-1">
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--ink-50)] mb-1.5">Grounded in</div>
                <ul className="space-y-1">
                  {msg.sources.map((s) => (
                    <li key={s} className="text-xs text-[color:var(--ink-70)] flex gap-2">
                      <span className="text-[color:var(--teal)]">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
