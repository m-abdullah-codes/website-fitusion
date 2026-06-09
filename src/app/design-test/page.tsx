const COLOR_TOKENS = [
  { token: "void",     hex: "#0A0B0A", role: "Page bg",         dark: true  },
  { token: "pitch",    hex: "#0F110F", role: "Alt section bg",  dark: true  },
  { token: "onyx",     hex: "#161916", role: "Card / surface",  dark: true  },
  { token: "graphite", hex: "#1F231F", role: "Elevated hover",  dark: true  },
  { token: "volt",     hex: "#C8FA4B", role: "Primary accent",  dark: false },
  { token: "acid",     hex: "#B4E739", role: "Button hover",    dark: false },
  { token: "citron",   hex: "#E6FF9C", role: "Soft glow / hl",  dark: false },
  { token: "ctaGreen", hex: "#A8D81B", role: "CTA block fill",  dark: false },
  { token: "pure",     hex: "#FFFFFF", role: "Display heading", dark: false },
  { token: "bone",     hex: "#ECEFE8", role: "Body text",       dark: false },
  { token: "ash",      hex: "#9CA098", role: "Secondary text",  dark: false },
  { token: "smoke",    hex: "#5B5F58", role: "Captions",        dark: true  },
  { token: "iron",     hex: "#2A2E29", role: "Borders",         dark: true  },
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-volt uppercase tracking-[0.12em] mb-4">
      {children}
    </p>
  );
}

export default function DesignTestPage() {
  return (
    <main className="min-h-screen bg-void text-bone px-12 py-16 space-y-24">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="border-b border-iron pb-8">
        <p className="font-mono text-xs text-volt uppercase tracking-[0.12em] mb-2">FiTusion</p>
        <h1 className="text-display text-6xl text-pure">Design System</h1>
        <p className="mt-3 text-ash text-base">Token swatches · typography specimens · utility classes</p>
      </header>

      {/* ── Color Tokens ───────────────────────────────────── */}
      <section>
        <Label>01 — Color Tokens</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {COLOR_TOKENS.map(({ token, hex, role, dark }) => (
            <div key={token}>
              <div
                className="h-20 rounded-lg border border-white/10"
                style={{ background: hex }}
              />
              <p className={`mt-2 font-mono text-[11px] font-bold ${dark ? "text-ash" : "text-volt"}`}>
                {token}
              </p>
              <p className="font-mono text-[10px] text-smoke">{hex}</p>
              <p className="text-[11px] text-smoke mt-0.5">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ─────────────────────────────────────── */}
      <section className="space-y-12">
        <Label>02 — Typography</Label>

        {/* Clash Display */}
        <div className="border-l-2 border-volt pl-6">
          <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">
            Clash Display · --font-clash · var weight 200–700
          </p>
          <p className="text-display text-7xl text-pure leading-[0.9]">SCULPT YOUR</p>
          <p className="text-display text-7xl text-volt leading-[0.9]">BODY</p>
          <p className="text-display text-4xl text-citron mt-4">Elevate Your Spirit</p>
          <p className="text-display text-xl text-ash mt-2">Section Heading · Card Title · Label</p>
        </div>

        {/* Clash Display — body weights */}
        <div className="border-l-2 border-iron pl-6">
          <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">
            Clash Display · --font-sans · var weight 200–700
          </p>
          <p className="text-xl font-normal text-bone leading-relaxed max-w-2xl">
            We&apos;re Your Partner In Achieving A Healthier, Stronger, And More Confident You.
            Premium training, expert coaching, real results.
          </p>
          <p className="text-base font-medium text-ash mt-3 max-w-xl leading-relaxed">
            Secondary body copy at medium weight. Labels, captions, supporting text.
          </p>
          <p className="text-sm font-semibold text-smoke mt-2">Semibold caption · Muted label · Fine print</p>
        </div>

        {/* Space Mono */}
        <div className="border-l-2 border-iron pl-6">
          <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">
            Space Mono · --font-mono · 400 &amp; 700
          </p>
          <div className="flex flex-wrap gap-8 items-end">
            <div>
              <p className="font-mono text-6xl text-pure font-bold">1.5K</p>
              <p className="font-mono text-xs text-volt uppercase tracking-[0.12em] mt-1">Hours Trained</p>
            </div>
            <div>
              <p className="font-mono text-6xl text-volt font-bold">550</p>
              <p className="font-mono text-xs text-ash uppercase tracking-[0.12em] mt-1">kcal / session</p>
            </div>
            <div>
              <p className="font-mono text-6xl text-bone font-bold">20</p>
              <p className="font-mono text-xs text-smoke uppercase tracking-[0.12em] mt-1">Poses</p>
            </div>
          </div>
          <p className="font-mono text-sm text-smoke mt-4 uppercase tracking-[0.12em]">
            Overline Label · Stat Unit · Caption
          </p>
        </div>
      </section>

      {/* ── Radius ─────────────────────────────────────────── */}
      <section>
        <Label>03 — Border Radius</Label>
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { cls: "rounded-sm",   label: "rounded-sm",   size: "4px"   },
            { cls: "rounded-md",   label: "rounded-md",   size: "12px"  },
            { cls: "rounded-lg",   label: "rounded-lg",   size: "20px"  },
            { cls: "rounded-xl",   label: "rounded-xl",   size: "28px"  },
            { cls: "rounded-full", label: "rounded-full", size: "pill"  },
          ].map(({ cls, label, size }) => (
            <div key={label} className="text-center">
              <div
                className={`w-20 h-20 bg-graphite border border-iron ${cls}`}
              />
              <p className="font-mono text-[10px] text-volt mt-2">{label}</p>
              <p className="font-mono text-[10px] text-smoke">{size}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shadows ────────────────────────────────────────── */}
      <section>
        <Label>04 — Shadows</Label>
        <div className="flex flex-wrap gap-10">
          <div className="bg-onyx rounded-lg p-8 shadow-soft w-56">
            <p className="font-mono text-xs text-volt">shadow-soft</p>
            <p className="font-mono text-[10px] text-smoke mt-1">0 24px 60px rgba(0,0,0,.5)</p>
            <p className="text-xs text-ash mt-2">Depth · card lift · overlays</p>
          </div>
          <div className="bg-onyx rounded-lg p-8 shadow-glow w-56">
            <p className="font-mono text-xs text-volt">shadow-glow</p>
            <p className="font-mono text-[10px] text-smoke mt-1">0 0 40px rgba(200,250,75,.4)</p>
            <p className="text-xs text-ash mt-2">CTA hover · active states</p>
          </div>
        </div>
      </section>

      {/* ── Utility Classes ────────────────────────────────── */}
      <section>
        <Label>05 — Utility Classes</Label>
        <div className="space-y-8">

          {/* .text-display */}
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-2">.text-display</p>
            <p className="text-display text-5xl text-pure">Train Smarter</p>
            <p className="font-mono text-[10px] text-iron mt-1">
              font-display + uppercase + tracking-tight + leading-[0.95]
            </p>
          </div>

          {/* .volt-glow */}
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-2">.volt-glow</p>
            <div className="relative h-32 bg-pitch rounded-lg flex items-center justify-center overflow-hidden border border-iron">
              <div className="volt-glow absolute inset-0" />
              <p className="relative font-mono text-xs text-volt uppercase tracking-wide z-10">
                radial-gradient lime glow
              </p>
            </div>
          </div>

          {/* .stat-card */}
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-2">.stat-card</p>
            <div className="relative h-40 bg-pitch rounded-lg overflow-hidden border border-iron flex items-center justify-center gap-6">
              {[
                { icon: "⏱", value: "1.5", unit: "HRS" },
                { icon: "🔥", value: "550", unit: "KCAL" },
                { icon: "💪", value: "5",   unit: "SETS" },
              ].map(({ icon, value, unit }) => (
                <div key={unit} className="stat-card px-5 py-3 text-center">
                  <span className="text-xl">{icon}</span>
                  <p className="font-mono text-2xl text-pure font-bold mt-1">{value}</p>
                  <p className="font-mono text-[10px] text-volt uppercase tracking-[0.12em]">{unit}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-iron pt-8 flex justify-between items-center">
        <p className="font-mono text-xs text-smoke">FiTusion Design System · Phase 0 · All tokens confirmed</p>
        <p className="font-mono text-xs text-volt">DESIGN.md v1</p>
      </footer>

    </main>
  );
}
