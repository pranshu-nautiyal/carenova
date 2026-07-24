"use client";

import Topbar from "@/components/app/Topbar";
import { chatSuggestions, patient } from "@/lib/mockData";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string; sources?: string[]; typing?: boolean };

const scriptedResponses: Record<string, { content: string; sources: string[] }> = {
  cough: {
    content:
      "Based on your logs, your dry cough started around July 13 and has appeared on 4 of the last 10 days. This is the classic ACE-inhibitor cough — reported in ~10% of patients on Lisinopril. It usually starts within a few weeks to months of starting the medication.\n\nSince your Lisinopril has been effective for your blood pressure (you're at 138/86 vs. your pre-treatment 148/94), you likely don't want to just stop it. But there's a well-established alternative: an ARB like losartan works on the same pathway without causing the cough.\n\nI'd bring this up at your August 4 visit with Dr. Reid — I've already added it to your prep pack.",
    sources: [
      "Your symptom log (7 entries, 7/13–7/22)",
      "Lisinopril label — DailyMed (side effects section)",
      "AHA 2024 hypertension guideline (ACE→ARB switch criteria)",
      "Your BP trend chart",
    ],
  },
  hba1c: {
    content:
      "Your HbA1c is 7.3, and the ADA recommends most adults with type 2 diabetes target below 7.0.\n\nThe good news: you're trending in the right direction. Over the last 24 months you've gone from 8.4 → 7.3, which is meaningful progress. The gap left is roughly what a moderate intensification would close — options include adding a second agent (like an SGLT2 inhibitor or GLP-1 agonist), tighter carb management around dinner (I've noticed a pattern of late meals), or a modest metformin dose increase.\n\nThis isn't urgent, but it's worth a conversation at your Aug 4 visit.",
    sources: [
      "Your lab report — Quest Metabolic Panel 6/14/2026",
      "24-month HbA1c trend (6 data points)",
      "ADA Standards of Care 2026 § 9.3",
      "Your symptom log (late-dinner pattern, past 90 days)",
    ],
  },
  screening: {
    content:
      "You have one screening due and one coming up:\n\n**Due now:** Annual diabetic eye exam. Your last dilated exam was August 2025. ADA recommends yearly.\n\n**Due in October:** Foot exam for neuropathy screening. Dr. Reid typically does this in-office.\n\nAn HbA1c recheck is scheduled for December (6 months from your last).\n\nI can book the eye exam with Dr. Nguyen at Naperville Eye Associates for August 11 at 2pm — she's in-network with your BlueCross PPO, and your estimated cost is $30.",
    sources: [
      "Your visit history (last eye exam 8/2025)",
      "ADA Standards of Care 2026 § 12 (screening schedule)",
      "In-network provider directory (BlueCross PPO)",
      "Estimated cost from your plan details",
    ],
  },
  visit: {
    content:
      "Here's what I'd bring to your August 4 visit with Dr. Reid:\n\n**1. The cough.** Log summary shows it started 7/13, present on 4 of 10 days. Ask about switching Lisinopril → an ARB.\n\n**2. eGFR trend.** You've moved from 88 → 76 over 24 months. Still normal, but worth flagging — ask about repeating in 3 months instead of 6.\n\n**3. HbA1c 7.3.** Slightly above ADA target. Ask whether intensification is worth considering.\n\n**4. Vitamin D still low at 24.** Ask about increasing D3 dose or adding K2.\n\n**5. Screening due.** Diabetic eye exam annual — I've queued options.\n\nI've generated a one-page PDF summary of all of this. Want me to send it to Dr. Reid ahead of the visit?",
    sources: [
      "Your last 6 months of records",
      "Your active symptom log",
      "Your lab trends",
      "ADA Standards of Care 2026",
    ],
  },
  labs: {
    content:
      "Here's your June 14 lab panel in plain English:\n\n**HbA1c 7.3%** — Your average blood sugar over the last 3 months. Target for someone with type 2 diabetes is under 7. You're close, and trending down.\n\n**LDL 118 mg/dL** — 'Bad' cholesterol. Target under 100 given your diabetes. Down from 142 two years ago — real progress.\n\n**TSH 2.8 mIU/L** — Your thyroid signal. In the healthy range. Your Levothyroxine dose looks right.\n\n**Vitamin D 24 ng/mL** — Below the 30 threshold. Your body needs it for bone health, mood, immune function. Consider doubling your D3.\n\n**eGFR 76 mL/min/1.73m²** — How well your kidneys are filtering. Normal is above 90. Yours has drifted from 88 → 76 over two years. Not alarming, but the direction matters.\n\n**BP 138/86** — Slightly above target of 130/80. Consistent with the cough issue we discussed.",
    sources: [
      "Quest Diagnostics — Metabolic Panel 6/14/2026",
      "Your 24-month lab history",
      "ADA / AHA / KDIGO reference ranges",
    ],
  },
  default: {
    content:
      "I can only answer confidently when I can ground the answer in your own data. I don't have a strong signal on that specific question yet. Try asking about your labs, your cough, upcoming screenings, or your Aug 4 visit — I have a lot to say about each of those.",
    sources: ["Your active health graph (0 relevant nodes matched)"],
  },
};

function pickResponse(q: string) {
  const l = q.toLowerCase();
  if (l.includes("cough") || l.includes("side effect") || l.includes("medication")) return scriptedResponses.cough;
  if (l.includes("hba1c") || l.includes("sugar") || l.includes("diabetes") || l.includes("a1c")) return scriptedResponses.hba1c;
  if (l.includes("screening") || l.includes("due") || l.includes("checkup")) return scriptedResponses.screening;
  if (l.includes("visit") || l.includes("appointment") || l.includes("ask dr")) return scriptedResponses.visit;
  if (l.includes("lab") || l.includes("result") || l.includes("plain english")) return scriptedResponses.labs;
  return scriptedResponses.default;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi ${patient.name.split(" ")[0]} — I've read all 32 of your records and know your full graph. Ask me anything about your health. Every answer I give you is grounded in your own data with sources shown.`,
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
      const r = pickResponse(q);
      setMessages((m) => {
        const next = m.slice(0, -1);
        next.push({ role: "assistant", content: r.content, sources: r.sources });
        return next;
      });
      setSending(false);
    }, 900);
  }

  return (
    <>
      <Topbar
        title="Ask CareNova"
        subtitle="Grounded in your own graph. Every answer cites its sources."
      />
      <div className="flex-1 flex flex-col min-h-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m, i) => (
              <Message key={i} msg={m} />
            ))}
          </div>
        </div>

        {messages.length === 1 && (
          <div className="max-w-3xl mx-auto w-full px-6 md:px-10 pb-4">
            <div className="text-xs uppercase tracking-widest text-[color:var(--ink-50)] mb-3">Try asking</div>
            <div className="flex flex-wrap gap-2">
              {chatSuggestions.map((s) => (
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask about your labs, meds, symptoms, or next visit…"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || sending}
                className="btn-primary !py-2 !px-4 text-sm disabled:opacity-50"
              >
                Ask
              </button>
            </div>
            <div className="mt-2 text-[10px] text-[color:var(--ink-50)] text-center">
              CareNova is not a doctor. In an emergency, call 911.
            </div>
          </div>
        </div>
      </div>
    </>
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
              {msg.content.split("**").map((part, i) =>
                i % 2 === 0 ? part : <strong key={i} className="font-medium">{part}</strong>
              )}
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
