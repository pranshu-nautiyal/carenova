export default function KnowledgeGraphHero() {
  const nodes = [
    { id: "you", x: 200, y: 200, r: 26, label: "You", color: "var(--teal)" },
    { id: "sym1", x: 60, y: 100, r: 14, label: "Cough", color: "var(--coral)" },
    { id: "sym2", x: 60, y: 260, r: 12, label: "Fatigue", color: "var(--coral)" },
    { id: "med1", x: 340, y: 90, r: 16, label: "Lisinopril", color: "var(--ink)" },
    { id: "med2", x: 350, y: 220, r: 14, label: "Metformin", color: "var(--ink)" },
    { id: "cond1", x: 200, y: 60, r: 15, label: "Hypertension", color: "var(--leaf)" },
    { id: "cond2", x: 200, y: 340, r: 15, label: "Diabetes T2", color: "var(--leaf)" },
    { id: "lab1", x: 320, y: 320, r: 13, label: "HbA1c 7.3", color: "var(--amber)" },
    { id: "lab2", x: 90, y: 340, r: 12, label: "eGFR 76", color: "var(--amber)" },
    { id: "doc1", x: 380, y: 160, r: 11, label: "Consult 5/2", color: "var(--ink-30)" },
  ];
  const edges: [string, string, string?][] = [
    ["you", "sym1"],
    ["you", "sym2"],
    ["you", "med1"],
    ["you", "med2"],
    ["you", "cond1"],
    ["you", "cond2"],
    ["you", "lab1"],
    ["you", "lab2"],
    ["you", "doc1"],
    ["med1", "sym1", "may cause"],
    ["med2", "cond2"],
    ["med1", "cond1"],
    ["lab1", "cond2"],
    ["lab2", "med1"],
  ];
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      <svg viewBox="0 0 420 420" className="w-full h-full">
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--teal-soft)" stopOpacity="0.9" />
            <stop offset="70%" stopColor="var(--teal-soft)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="210" cy="210" r="200" fill="url(#halo)" />
        {edges.map(([a, b, lbl], i) => {
          const na = map[a];
          const nb = map[b];
          const mx = (na.x + nb.x) / 2;
          const my = (na.y + nb.y) / 2;
          return (
            <g key={i}>
              <line
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="var(--ink-30)"
                strokeWidth="1"
                strokeDasharray={lbl ? "3 3" : "none"}
              />
              {lbl && (
                <text
                  x={mx}
                  y={my - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--ink-50)"
                  className="font-display"
                >
                  {lbl}
                </text>
              )}
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.id} style={{ animationDelay: `${i * 0.25}s` }} className="animate-pulse-node">
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={n.id === "you" ? 1 : 0.9} />
            {n.id === "you" && (
              <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="var(--teal)" strokeOpacity="0.3" />
            )}
            <text
              x={n.x}
              y={n.y + n.r + 12}
              textAnchor="middle"
              fontSize={n.id === "you" ? "11" : "10"}
              fontWeight={n.id === "you" ? "600" : "500"}
              fill="var(--ink)"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating stat cards */}
      <FloatingCard className="absolute -left-4 top-6 animate-float-slow" delay="0.2s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Interaction flagged</div>
        <div className="mt-1 text-sm font-medium">Lisinopril → dry cough</div>
        <div className="mt-0.5 text-xs text-[color:var(--ink-70)]">Confidence: high</div>
      </FloatingCard>

      <FloatingCard className="absolute -right-2 top-24 animate-float-slower" delay="0.6s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Next visit</div>
        <div className="mt-1 text-sm font-medium">Dr. Reid · Aug 4</div>
        <div className="mt-0.5 text-xs text-[color:var(--ink-70)]">Prep pack ready · $30</div>
      </FloatingCard>

      <FloatingCard className="absolute -left-2 bottom-8 animate-float-slow" delay="1s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">HbA1c trend</div>
        <div className="mt-1 text-sm font-medium">8.4 → 7.3 over 24 mo</div>
        <div className="mt-0.5 text-xs text-[color:var(--ink-70)]">Target: &lt; 7.0</div>
      </FloatingCard>

      <FloatingCard className="absolute -right-4 bottom-16 animate-float-slower" delay="1.3s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Docs unified</div>
        <div className="mt-1 text-sm font-medium">32 records · 4 portals</div>
        <div className="mt-0.5 text-xs text-[color:var(--ink-70)]">Auto-linked to your graph</div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`bg-white shadow-[0_10px_30px_-15px_rgba(14,31,28,0.2)] border border-[color:var(--line)] rounded-2xl p-3 max-w-[180px] ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}
