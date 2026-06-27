"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { IconBadge, SectionHeading, Stagger, StaggerItem } from "@/components/ui";
import { fadeUpSm } from "@/lib/motion";
import {
  CalendarCheck,
  TrendingUp,
  UtensilsCrossed,
  Bell,
  Dumbbell,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BENEFITS: {
  icon: LucideIcon;
  headline: string;
  detail: string;
}[] = [
  {
    icon: CalendarCheck,
    headline: "Never wonder what to do today.",
    detail:
      "Your plan tells you exactly which machine, how many sets, and what weight — every single session.",
  },
  {
    icon: TrendingUp,
    headline: "See exactly how far you've come.",
    detail:
      "Visual progress charts track every lift, every week. Proof you can see keeps you coming back.",
  },
  {
    icon: UtensilsCrossed,
    headline: "Fuel your transformation.",
    detail:
      "Meal plans aligned to your calorie and macro targets, built around your training schedule.",
  },
  {
    icon: Bell,
    headline: "Stay on track effortlessly.",
    detail:
      "Smart push reminders nudge you at the right time — no missed session because life got in the way.",
  },
  {
    icon: Dumbbell,
    headline: "Train with purpose on every rep.",
    detail:
      "Every exercise links to a machine that's on our floor. No guesswork, no substitutes.",
  },
  {
    icon: BarChart3,
    headline: "Results you can actually measure.",
    detail:
      "Personal bests, body metrics, streaks. Your data tells the story; you write the ending.",
  },
];

function BenefitCard({
  icon: Icon,
  headline,
  detail,
}: {
  icon: LucideIcon;
  headline: string;
  detail: string;
}) {
  return (
    <article className="card-surface flex h-full shrink-0 w-[82vw] sm:w-[320px] lg:w-[360px] flex-col gap-4 rounded-xl border border-iron/35 p-6 transition-all duration-300 hover:border-volt/25 hover:shadow-glow-preview sm:p-7">
      <IconBadge
        icon={Icon}
        size="md"
        filled
        className="rounded-full bg-coal border border-olive/60"
      />
      <div>
        <h3 className="font-sans text-base font-bold leading-snug text-pure sm:text-lg">
          {headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ash">{detail}</p>
      </div>
    </article>
  );
}

function BenefitsGrid() {
  return (
    <section className="bg-pitch px-6 py-20 sm:py-28">
      <SectionHeading
        top="Why This"
        accent="Gym Is Different"
        subtitle="Everything here is designed to keep you moving — not guessing."
        className="section-container"
      />
      <Stagger
        stagger={0.07}
        delayChildren={0.1}
        className="section-container grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        {BENEFITS.map(({ icon, headline, detail }) => (
          <StaggerItem key={headline} variants={fadeUpSm}>
            <BenefitCard icon={icon} headline={headline} detail={detail} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function Benefits() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    const section = sectionRef.current;
    if (!strip || !section) return;
    const update = () => {
      setMaxX(Math.max(0, strip.scrollWidth - section.clientWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  if (prefersReducedMotion) {
    return <BenefitsGrid />;
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: maxX > 0 ? `calc(100vh + ${maxX}px)` : undefined }}
      className="relative bg-pitch"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-12">
        <SectionHeading
          top="Why This"
          accent="Gym Is Different"
          subtitle="Everything here is designed to keep you moving — not guessing."
          className="section-container px-6 mb-10"
        />

        <motion.div
          ref={stripRef}
          style={{ x }}
          className="flex gap-5 pl-6 will-change-transform"
        >
          {BENEFITS.map(({ icon, headline, detail }) => (
            <BenefitCard key={headline} icon={icon} headline={headline} detail={detail} />
          ))}
          {/* trailing spacer so last card clears the right edge */}
          <div className="shrink-0 w-6" aria-hidden="true" />
        </motion.div>

        {/* scroll progress bar */}
        <div className="section-container px-6 mt-10">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-iron/25">
            <motion.div
              className="h-full rounded-full bg-volt origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
