import { SectionHeading, Stagger, StaggerItem, IconBadge } from "@/components/ui";
import { fadeUpSm } from "@/lib/motion";
import { UserPlus, Target, CalendarCheck, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS: {
  number: string;
  Icon: LucideIcon;
  label: string;
  detail: string;
}[] = [
  {
    number: "01",
    Icon: UserPlus,
    label: "Join",
    detail:
      "Create your free account in under two minutes. No commitment, no credit card.",
  },
  {
    number: "02",
    Icon: Target,
    label: "Set Your Goals",
    detail:
      "Pick your target — weight loss, strength, or endurance — and your starting level.",
  },
  {
    number: "03",
    Icon: CalendarCheck,
    label: "Get Your Plan",
    detail:
      "We build a week-by-week programme mapped to the exact machines in our gym.",
  },
  {
    number: "04",
    Icon: TrendingUp,
    label: "Track & Progress",
    detail:
      "Log each session, watch your numbers climb, and evolve your plan as you grow.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <SectionHeading
        top="How It"
        accent="Works"
        subtitle="From the moment you walk in to the day you hit your personal best — one seamless loop."
        className="section-container"
      />

      <div className="section-container">
        <Stagger
          stagger={0.1}
          delayChildren={0.15}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map(({ number, Icon, label, detail }) => (
            <StaggerItem key={label} variants={fadeUpSm}>
              <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-iron/35 bg-coal/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-volt/30 hover:bg-coal/80 hover:shadow-[0_0_32px_-8px_rgb(var(--c-volt)/0.15)]">
                {/* Large decorative step number in the background */}
                <span
                  className="pointer-events-none absolute -right-1 -top-4 select-none font-display text-[7rem] font-black leading-none text-volt/[0.06] transition-colors duration-300 group-hover:text-volt/[0.10]"
                  aria-hidden
                >
                  {number}
                </span>

                {/* Icon badge + step label */}
                <div className="flex items-center gap-3">
                  <IconBadge
                    icon={Icon}
                    size="md"
                    className="rounded-full border border-olive/50 bg-coal"
                  />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-volt/60">
                    STEP {number}
                  </span>
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="mb-2 font-sans text-lg font-bold text-pure">
                    {label}
                  </h3>
                  <p className="text-sm leading-relaxed text-ash">{detail}</p>
                </div>

                {/* Hover accent — volt line slides in from the left along the bottom */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 rounded-b-2xl bg-volt/50 transition-[width] duration-500 ease-out group-hover:w-full" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
