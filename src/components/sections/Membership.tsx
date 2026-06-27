import { SectionHeading, Stagger, StaggerItem, Button, Reveal } from "@/components/ui";
import { fadeUpSm } from "@/lib/motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS: {
  Icon: LucideIcon;
  name: string;
  price: string;
  period: string | null;
  tagline: string;
  highlight: boolean;
  elite: boolean;
  features: string[];
  cta: string;
}[] = [
  {
    Icon: Star,
    name: "Starter",
    price: "$20",
    period: "/mo",
    tagline: "Begin your journey, no strings attached.",
    highlight: false,
    elite: false,
    features: [
      "Workout logging",
      "Basic exercise library",
      "Goal tracking",
      "1 active training plan",
    ],
    cta: "Get Started",
  },
  {
    Icon: Zap,
    name: "Pro",
    price: "$39",
    period: "/mo",
    tagline: "The complete personalisation stack.",
    highlight: true,
    elite: false,
    features: [
      "Everything in Starter",
      "Personalised plans on our machines",
      "Meal planning with macro targets",
      "Smart push reminders",
      "Progress analytics & charts",
      "Unlimited plan history",
    ],
    cta: "Start 7-Day Trial",
  },
  {
    Icon: Crown,
    name: "Elite",
    price: "$69",
    period: "/mo",
    tagline: "For athletes who demand more.",
    highlight: false,
    elite: true,
    features: [
      "Everything in Pro",
      "Personal trainer plans built around your goals",
      "Weekly plan adjustments based on your progress",
      "1-on-1 form & technique feedback sessions",
      "Priority machine booking",
      "Custom nutrition consultation",
      "Early access to new features",
    ],
    cta: "Go Elite",
  },
];

function PlanCard({
  Icon,
  name,
  price,
  period,
  tagline,
  highlight,
  elite,
  features,
  cta,
}: (typeof PLANS)[0]) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[28px] border p-7 sm:p-8",
        highlight
          ? "card-surface-active border-volt/40 shadow-[0_0_48px_-12px_rgb(var(--c-volt)/0.25)]"
          : elite
            ? "border-amber-500/30 bg-gradient-to-b from-amber-950/30 via-stone-900/60 to-stone-950/80 shadow-[0_0_56px_-12px_rgba(245,158,11,0.2)]"
            : "card-surface border-iron/30"
      )}
    >
      {/* Elite crown glow accent */}
      {elite && (
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-amber-400/5 to-transparent" />
      )}

      {/* Most popular badge */}
      {highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="btn-primary-gradient rounded-full px-4 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-void">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Elite badge */}
      {elite && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full border border-amber-500/40 bg-amber-950/80 px-4 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-amber-400">
            ELITE ACCESS
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <div
          className={cn(
            "mb-4 flex h-10 w-10 items-center justify-center rounded-full border",
            highlight
              ? "border-volt/35 bg-volt/10 text-volt"
              : elite
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                : "border-iron/50 bg-coal text-ash"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <p className={cn("font-mono text-[10px] tracking-[0.25em]", elite ? "text-amber-500/60" : "text-ash/50")}>{name.toUpperCase()}</p>
        <div className="mt-1 flex items-end gap-1">
          <span
            className={cn(
              "font-display text-4xl font-bold leading-none tracking-tight",
              highlight ? "text-volt" : elite ? "text-amber-400" : "text-pure"
            )}
          >
            {price}
          </span>
          {period && (
            <span className="mb-0.5 font-sans text-sm text-ash/60">{period}</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ash">{tagline}</p>
      </div>

      {/* Feature list */}
      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                highlight
                  ? "border-volt/30 bg-volt/10"
                  : elite
                    ? "border-amber-500/30 bg-amber-500/10"
                    : "border-iron/50 bg-coal"
              )}
            >
              <Check
                className={cn("h-3 w-3", highlight ? "text-volt" : elite ? "text-amber-400" : "text-ash/60")}
                strokeWidth={2.5}
              />
            </span>
            <span className={cn("text-sm leading-relaxed", elite ? "text-amber-100/75" : "text-bone/80")}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlight ? "primary" : "secondary"}
        className={cn("w-full justify-center", elite && "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400/60")}
      >
        {cta}
      </Button>
    </article>
  );
}

export function Membership() {
  return (
    <section className="section">
      <SectionHeading
        top="Simple"
        accent="Pricing"
        subtitle="One plan for every stage of your journey. Upgrade or downgrade anytime."
        className="section-container"
      />

      <Stagger
        stagger={0.1}
        delayChildren={0.1}
        className="section-container grid grid-cols-1 items-start gap-6 pt-6 sm:grid-cols-3 sm:gap-5 lg:gap-6"
      >
        {PLANS.map((plan) => (
          <StaggerItem key={plan.name} variants={fadeUpSm}>
            <PlanCard {...plan} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="section-container mt-10 text-center" delay={0.4}>
        <p className="text-sm text-ash/60">
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </Reveal>
    </section>
  );
}
