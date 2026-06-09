import {
  Clock, Flame, Dumbbell, User2, HeartPulse, Users,
  TrendingUp, Zap, Crown, Leaf, HeartHandshake, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatChip } from "@/components/ui/StatChip";

function DemoSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div>
        <p className="font-mono text-xs text-volt uppercase tracking-[0.12em]">{label}</p>
        <div className="h-px bg-iron mt-2" />
      </div>
      {children}
    </section>
  );
}

const LOGO_BRANDS = [
  "Under Armour", "Reebok", "Adidas", "Puma", "The North Face", "Nike",
];

export default function UIDemoPage() {
  return (
    <main className="min-h-screen bg-void text-bone px-8 md:px-16 py-16 space-y-24">

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="border-b border-iron pb-8">
        <p className="font-mono text-xs text-volt uppercase tracking-[0.12em] mb-2">FiTusion · UI Kit</p>
        <h1 className="text-display text-6xl text-pure">Component Demo</h1>
        <p className="mt-3 text-ash text-base">
          All variants rendered for sign-off. No motion yet — static pass only.
        </p>
      </header>

      {/* ── 01 Button ───────────────────────────────────────── */}
      <DemoSection label="01 — Button">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">primary</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Get Started</Button>
              <Button variant="primary" arrow>Let&apos;s Start</Button>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">secondary</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="secondary">Contact Us</Button>
              <Button variant="secondary" arrow>See Plan</Button>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-3">ghost</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="ghost">Learn More</Button>
              <Button variant="ghost" arrow>Read More</Button>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ── 02 SectionHeading ───────────────────────────────── */}
      <DemoSection label="02 — SectionHeading">
        <div className="space-y-16 py-4 bg-pitch rounded-xl px-8 border border-iron">
          <div className="pt-8">
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-6">with subtitle</p>
            <SectionHeading
              top="Inspired to"
              accent="Inspire Your Best Self"
              subtitle="We're Your Partner In Achieving A Healthier, Stronger, And More Confident You."
            />
          </div>
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-6">without subtitle</p>
            <SectionHeading top="Discover" accent="What Sets Us Apart" />
          </div>
          <div className="pb-8">
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-6">train section</p>
            <SectionHeading top="Train Smarter" accent="Unleash Your Potential" />
          </div>
        </div>
      </DemoSection>

      {/* ── 03 StatChip ─────────────────────────────────────── */}
      <DemoSection label="03 — StatChip">
        <div>
          <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4">hero chips</p>
          <div className="flex flex-wrap gap-3 bg-pitch p-8 rounded-xl border border-iron">
            <StatChip icon={Clock}    label="Hours"    value="1.5" unit="HRS"   />
            <StatChip icon={User2}    label="Poses"    value="20"               />
            <StatChip icon={Flame}    label="Calories" value="550" unit="KCAL"  />
            <StatChip icon={Dumbbell} label="Sets"     value="5"   unit="SETS"  />
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4">experience chips</p>
          <div className="flex flex-wrap gap-3 bg-pitch p-8 rounded-xl border border-iron">
            <StatChip icon={HeartPulse} label="Heart Rate"  value="95"   unit="BPM"   />
            <StatChip icon={Activity}   label="Step Count"  value="1024" unit="STEPS" />
          </div>
        </div>
      </DemoSection>

      {/* ── 04 Card ─────────────────────────────────────────── */}
      <DemoSection label="04 — Card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* default */}
          <Card className="p-6 space-y-3">
            <IconBadge icon={HeartPulse} />
            <h3 className="text-xl font-bold text-pure">Cardio Training</h3>
            <p className="text-ash text-sm leading-relaxed">
              Endurance-building sessions that improve cardiovascular health and stamina.
            </p>
            <Button variant="ghost" arrow>See Plan</Button>
          </Card>

          {/* active (volt border) */}
          <Card className="p-6 space-y-3 border-volt">
            <IconBadge icon={Dumbbell} />
            <h3 className="text-xl font-bold text-pure">
              Strength <span className="text-volt">Build</span>
            </h3>
            <p className="text-ash text-sm leading-relaxed">
              Progressive overload programs to build functional, lasting strength.
            </p>
            <Button variant="ghost" arrow>See Plan</Button>
          </Card>

          {/* default */}
          <Card className="p-6 space-y-3">
            <IconBadge icon={Flame} />
            <h3 className="text-xl font-bold text-pure">Fat Loss</h3>
            <p className="text-ash text-sm leading-relaxed">
              High-intensity protocols designed to maximize caloric burn.
            </p>
            <Button variant="ghost" arrow>See Plan</Button>
          </Card>

        </div>
      </DemoSection>

      {/* ── 05 IconBadge ────────────────────────────────────── */}
      <DemoSection label="05 — IconBadge">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4">sizes</p>
            <div className="flex items-end gap-8">
              {(["sm", "md", "lg"] as const).map((s) => (
                <div key={s} className="text-center">
                  <IconBadge icon={Flame} size={s} />
                  <p className="font-mono text-[10px] text-smoke mt-2">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4">icon variety</p>
            <div className="flex flex-wrap gap-3">
              {[Leaf, Users, TrendingUp, Zap, Crown, HeartHandshake, Dumbbell, Clock, Flame, Activity].map(
                (Icon, i) => <IconBadge key={i} icon={Icon} />
              )}
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ── 06 Marquee ──────────────────────────────────────── */}
      <DemoSection label="06 — Marquee">
        <div className="bg-pitch border border-iron rounded-xl py-8 space-y-8">
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4 px-8">forward</p>
            <Marquee
              items={LOGO_BRANDS.map((name) => (
                <span
                  key={name}
                  className="font-display text-xl uppercase tracking-[0.15em] text-smoke hover:text-bone transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            />
          </div>
          <div className="h-px bg-iron mx-8" />
          <div>
            <p className="font-mono text-[10px] text-smoke uppercase tracking-wide mb-4 px-8">reverse</p>
            <Marquee
              reverse
              speed={20}
              items={LOGO_BRANDS.map((name) => (
                <span key={name} className="font-mono text-sm uppercase tracking-[0.2em] text-iron hover:text-smoke transition-colors cursor-default">
                  {name}
                </span>
              ))}
            />
          </div>
        </div>
      </DemoSection>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-iron pt-8 flex justify-between items-center">
        <p className="font-mono text-xs text-smoke">FiTusion UI Kit · Phase 1 · Static pass complete</p>
        <p className="font-mono text-xs text-volt">6 / 6 components</p>
      </footer>

    </main>
  );
}
