export default function IllustratedScene() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto">
      <svg viewBox="0 0 620 560" className="w-full h-auto" aria-label="Illustrated home health scene">
        <defs>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4EFE6" />
            <stop offset="100%" stopColor="#E9E0CE" />
          </linearGradient>
          <linearGradient id="wallBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9F4EA" />
            <stop offset="100%" stopColor="#EFE7D5" />
          </linearGradient>
          <linearGradient id="wallSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EFE7D5" />
            <stop offset="100%" stopColor="#E4D9C1" />
          </linearGradient>
          <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B58A5F" />
            <stop offset="100%" stopColor="#8E6740" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F5F5C" />
            <stop offset="100%" stopColor="#0A4744" />
          </linearGradient>
          <radialGradient id="lamp" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#FFE9BB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE9BB" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="couch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F5F5C" />
            <stop offset="100%" stopColor="#0A4744" />
          </linearGradient>
          <linearGradient id="rug" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E85D3A" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#E85D3A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E85D3A" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Room — isometric back wall */}
        <polygon points="80,120 460,60 460,340 80,400" fill="url(#wallBack)" />
        {/* Side wall */}
        <polygon points="460,60 560,110 560,380 460,340" fill="url(#wallSide)" />
        {/* Floor */}
        <polygon points="80,400 460,340 560,380 560,540 80,540" fill="url(#floor)" />

        {/* Window on back wall */}
        <g>
          <polygon points="140,150 300,120 300,240 140,270" fill="#DEEAE7" />
          <polygon points="140,150 300,120 300,180 140,210" fill="#F0F4EF" opacity="0.5" />
          <line x1="220" y1="135" x2="220" y2="255" stroke="#F4EFE6" strokeWidth="2" />
          <line x1="140" y1="210" x2="300" y2="180" stroke="#F4EFE6" strokeWidth="2" />
          {/* Sun outside */}
          <circle cx="260" cy="155" r="12" fill="#FFC98A" opacity="0.8" />
        </g>

        {/* Lamp glow */}
        <ellipse cx="380" cy="330" rx="140" ry="80" fill="url(#lamp)" opacity="0.7" />

        {/* Shelf on back wall */}
        <g>
          <rect x="330" y="180" width="110" height="4" fill="#8E6740" transform="skewY(-8)" />
          {/* Books */}
          <rect x="340" y="150" width="10" height="30" fill="#0F5F5C" transform="skewY(-8)" />
          <rect x="355" y="145" width="9" height="35" fill="#E85D3A" transform="skewY(-8)" />
          <rect x="368" y="152" width="11" height="28" fill="#B58A5F" transform="skewY(-8)" />
          <rect x="384" y="148" width="9" height="32" fill="#4E8B4A" transform="skewY(-8)" />
          <rect x="398" y="155" width="10" height="25" fill="#E0A800" transform="skewY(-8)" />
          {/* Small pot */}
          <ellipse cx="428" cy="175" rx="8" ry="3" fill="#8E6740" transform="skewY(-8)" />
          <rect x="422" y="170" width="12" height="8" fill="#B58A5F" transform="skewY(-8)" />
        </g>

        {/* Framed art on wall */}
        <g>
          <polygon points="330,80 420,66 420,120 330,134" fill="#0E1F1C" />
          <polygon points="336,86 414,74 414,114 336,126" fill="#F4EFE6" />
          {/* Tiny abstract art — nodes */}
          <circle cx="360" cy="100" r="4" fill="#0F5F5C" />
          <circle cx="380" cy="94" r="3" fill="#E85D3A" />
          <circle cx="395" cy="106" r="3" fill="#E0A800" />
          <line x1="360" y1="100" x2="380" y2="94" stroke="#0E1F1C" strokeWidth="0.6" />
          <line x1="380" y1="94" x2="395" y2="106" stroke="#0E1F1C" strokeWidth="0.6" />
          <line x1="360" y1="100" x2="395" y2="106" stroke="#0E1F1C" strokeWidth="0.6" />
        </g>

        {/* Rug on floor */}
        <polygon points="130,470 380,420 500,455 260,510" fill="url(#rug)" opacity="0.7" />

        {/* Left: potted plant */}
        <g className="animate-float-slower" style={{ transformOrigin: "110px 500px", animationDuration: "8s" }}>
          {/* Pot */}
          <polygon points="90,470 140,470 135,510 95,510" fill="#B58A5F" />
          <polygon points="90,470 140,470 138,478 92,478" fill="#8E6740" />
          {/* Leaves */}
          <path d="M115 470 Q100 440 85 425 Q95 445 105 465" fill="#4E8B4A" />
          <path d="M115 470 Q130 435 150 420 Q135 445 125 468" fill="#5FA05A" />
          <path d="M115 470 Q115 430 118 405 Q120 435 118 468" fill="#4E8B4A" />
          <path d="M112 470 Q95 455 78 448 Q95 462 108 470" fill="#5FA05A" />
        </g>

        {/* Desk */}
        <g>
          {/* Desk top */}
          <polygon points="290,360 480,320 550,340 360,385" fill="url(#deskTop)" />
          <polygon points="360,385 550,340 550,352 360,397" fill="#6B4E30" />
          {/* Legs */}
          <rect x="300" y="380" width="4" height="70" fill="#6B4E30" />
          <rect x="480" y="365" width="4" height="70" fill="#6B4E30" transform="skewY(3)" />

          {/* Laptop */}
          <g>
            <polygon points="380,340 470,320 490,325 400,345" fill="#0E1F1C" />
            <polygon points="380,340 400,345 400,388 380,383" fill="#0E1F1C" />
            {/* Screen */}
            <polygon points="382,340 398,344 398,375 382,371" fill="url(#screen)" />
            {/* Screen content — mini graph */}
            <circle cx="388" cy="358" r="3" fill="#F4EFE6" opacity="0.9" />
            <circle cx="393" cy="354" r="1.5" fill="#F4EFE6" opacity="0.7" />
            <circle cx="393" cy="362" r="1.5" fill="#F4EFE6" opacity="0.7" />
            <line x1="388" y1="358" x2="393" y2="354" stroke="#F4EFE6" strokeWidth="0.5" opacity="0.5" />
            <line x1="388" y1="358" x2="393" y2="362" stroke="#F4EFE6" strokeWidth="0.5" opacity="0.5" />
          </g>

          {/* Coffee cup */}
          <g>
            <ellipse cx="440" cy="335" rx="10" ry="4" fill="#F4EFE6" />
            <path d="M430 335 Q432 350 438 353 L444 352 Q450 348 452 335 Z" fill="#F4EFE6" />
            <path d="M450 340 Q457 340 457 346 Q457 350 452 350" stroke="#F4EFE6" strokeWidth="1.5" fill="none" />
            {/* Steam */}
            <path d="M435 328 Q433 320 437 315" stroke="#B58A5F" strokeWidth="1" fill="none" opacity="0.4" className="animate-float-slow" />
            <path d="M442 326 Q446 320 442 312" stroke="#B58A5F" strokeWidth="1" fill="none" opacity="0.4" className="animate-float-slower" />
          </g>

          {/* Notebook */}
          <g>
            <polygon points="480,335 520,326 530,330 490,340" fill="#E85D3A" />
            <polygon points="490,340 530,330 530,336 490,346" fill="#B94526" />
            <line x1="495" y1="333" x2="518" y2="328" stroke="#F4EFE6" strokeWidth="0.5" />
            <line x1="497" y1="336" x2="520" y2="331" stroke="#F4EFE6" strokeWidth="0.5" />
          </g>
        </g>

        {/* Character seated */}
        <g>
          {/* Chair back */}
          <rect x="330" y="330" width="40" height="60" rx="6" fill="#0F5F5C" transform="skewY(-5)" />
          {/* Body */}
          <path d="M345 355 Q340 380 342 420 L378 420 Q382 385 375 355 Z" fill="#F4EFE6" />
          <path d="M345 355 Q340 380 342 420 L378 420 Q382 385 375 355 Z" fill="#E85D3A" opacity="0.9" />
          {/* Head */}
          <circle cx="360" cy="335" r="18" fill="#E8B896" />
          {/* Hair */}
          <path d="M343 328 Q345 315 360 313 Q378 315 378 330 Q378 322 372 320 Q365 318 358 320 Q350 322 345 328 Z" fill="#3A2418" />
          {/* Arm on desk */}
          <path d="M375 360 Q395 350 405 345 L410 350 Q400 358 385 370 Z" fill="#E85D3A" opacity="0.9" />
          <circle cx="405" cy="348" r="4" fill="#E8B896" />
          {/* Legs implied under desk */}
        </g>

        {/* Floating health chip 1 — on scene, small heart */}
        <g className="animate-pulse-node" style={{ transformOrigin: "500px 200px" }}>
          <rect x="470" y="180" width="60" height="40" rx="10" fill="#FDFBF7" stroke="#0E1F1C" strokeOpacity="0.08" />
          <path d="M480 195 Q477 191 481 189 Q485 189 485 193 Q485 189 489 189 Q493 191 490 195 L485 202 Z" fill="#E85D3A" />
          <text x="497" y="199" fontSize="9" fill="#0E1F1C" fontWeight="500">67 bpm</text>
          <text x="497" y="211" fontSize="7" fill="#0E1F1C" opacity="0.6">resting</text>
        </g>
      </svg>

      {/* Floating cards overlaid on the scene — this is the "richness" layer */}
      <FloatingCard className="absolute -left-2 top-4 animate-float-slow" delay="0.2s">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[color:var(--coral)]" />
          <span className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Side effect</span>
        </div>
        <div className="text-sm font-medium leading-tight">Cough may be from Lisinopril</div>
        <div className="text-[11px] text-[color:var(--ink-70)] mt-0.5">Confidence: high</div>
      </FloatingCard>

      <FloatingCard className="absolute -right-6 top-16 animate-float-slower" delay="0.5s">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[color:var(--teal)]" />
          <span className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Next visit</span>
        </div>
        <div className="text-sm font-medium">Dr. Reid · Aug 4</div>
        <div className="text-[11px] text-[color:var(--ink-70)] mt-0.5">Prep pack ready · $30</div>
      </FloatingCard>

      <FloatingCard className="absolute right-8 top-1/2 -translate-y-1/2 animate-float-slow" delay="0.9s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)] mb-1">HbA1c trend</div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-medium">7.3</span>
          <span className="text-xs text-[color:var(--ink-70)]">from 8.4</span>
        </div>
        <MiniSpark values={[8.4, 8.1, 7.7, 7.5, 7.4, 7.3]} />
      </FloatingCard>

      <FloatingCard className="absolute -left-4 bottom-8 animate-float-slower" delay="1.2s">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[color:var(--leaf)]" />
          <span className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)]">Docs unified</span>
        </div>
        <div className="text-sm font-medium">32 records · 4 portals</div>
        <div className="text-[11px] text-[color:var(--ink-70)] mt-0.5">Auto-threaded into graph</div>
      </FloatingCard>

      <FloatingCard className="absolute right-0 bottom-4 animate-float-slow" delay="1.5s">
        <div className="text-[10px] tracking-widest uppercase text-[color:var(--ink-50)] mb-1">This year</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-medium">$2,210</span>
          <span className="text-[11px] text-[color:var(--ink-70)]">/ $6.5K</span>
        </div>
        <div className="mt-1 h-1 w-24 bg-[color:var(--cream-2)] rounded-full overflow-hidden">
          <div className="h-full bg-[color:var(--teal)] rounded-full" style={{ width: "34%" }} />
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={`bg-white shadow-[0_15px_40px_-18px_rgba(14,31,28,0.25)] border border-[color:var(--line)] rounded-2xl p-3 min-w-[160px] max-w-[200px] ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function MiniSpark({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 100;
  const h = 20;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-4 mt-1">
      <polyline points={pts} fill="none" stroke="var(--teal)" strokeWidth="1.5" />
    </svg>
  );
}
