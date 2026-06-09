"use client";

import { useId } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading, Button, CountUp, Reveal } from "@/components/ui";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const enduranceImg = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012245/endurance_evolution_jr2pz1.png";
const speedImg = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012244/speed_surge_ete6m6.png";
const runningIcon = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012244/running_icon_evvvx8.png";

/* ── Directional card reveals — each card swings in from its own side ── */
const fromLeft = {
  hidden: { opacity: 0, x: -44, y: 22 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fromRight = {
  hidden: { opacity: 0, x: 44, y: 22 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ── Filled lime glyphs (no badge background) ───────────────────────── */

/** Filled lime heart with a dark heartbeat trace cut across it. */
function HeartGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 20.7 4.3 13C2.9 11.6 2.1 9.8 2.1 8.1A5 5 0 0 1 7.1 3c1.7 0 3.1.7 4 2 .9-1.3 2.3-2 4-2a5 5 0 0 1 5 5.1c0 1.7-.8 3.5-2.2 4.9L12 20.7Z"
      />
      <polyline
        points="5,12.4 8.1,12.4 9.4,9.7 11.2,14.3 12.5,11.9 13.3,12.4 17,12.4"
        fill="none"
        stroke="rgb(var(--c-graphite))"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Stat chips — hero-style surface, tilted, content centered ──────── */

/** Positioned + tilted chip. Sits INSIDE the card so it's clipped at the
 *  card's edge rather than overflowing. */
function TiltChip({
  className,
  tilt,
  children,
}: {
  className?: string;
  tilt: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("absolute z-30", className)}>
      <div style={{ transform: tilt }}>
        <div className="stat-card chip-card flex h-[182px] w-[122px] flex-col items-center justify-center gap-2.5 px-3 pb-7 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Endurance chip — heart, ECG trace, 95 BPM (centered). Leans left (135°). */
function BpmChip({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  // Bold PQRST waveform × 2: P bump → tall R spike → deep S trough → rounded T
  const ecgPoints =
    "0,22 14,22 19,17 24,22 " +
    "28,23 32,2  35,40 38,22 " +
    "44,22 50,13 56,22 " +
    "74,22 79,17 84,22 " +
    "88,23 92,2  95,40 98,22 " +
    "104,22 110,13 116,22 " +
    "130,22";

  return (
    <TiltChip className={className} tilt="rotate(-15deg)">
      <HeartGlyph className={cn("h-8 w-8 text-volt", !reduced && "heartbeat")} />
      <svg viewBox="0 0 130 44" className="w-full" fill="none" aria-hidden>
        {reduced ? (
          <polyline
            points={ecgPoints}
            stroke="rgb(var(--c-ink))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <motion.polyline
            points={ecgPoints}
            stroke="rgb(var(--c-ink))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />
        )}
      </svg>
      <div className="flex flex-col items-center leading-none">
        <CountUp to={95} className="font-mono text-[1.6rem] font-bold text-pure" />
        <span className="mt-1 font-mono text-[9px] tracking-[0.22em] text-bone/55">BPM</span>
      </div>
    </TiltChip>
  );
}

/** Speed chip — runner over a step gauge (centered). Leans right (45°). */
function StepsChip({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const cx = 50;
  const cy = 50;
  const ringR = 42;
  const ringW = 11;
  const innerR = ringR - ringW / 2 - 0.5;
  const c = 2 * Math.PI * ringR;
  /** Fraction of the ring that fills (matches the original 0.28 dash offset). */
  const fill = 0.72;

  const innerGrad = `steps-inner-${uid}`;
  const ringGrad = `steps-ring-${uid}`;
  const ringShadow = `steps-shadow-${uid}`;

  return (
    <TiltChip className={className} tilt="rotate(15deg)">
      <Image src={runningIcon} alt="" width={30} height={30} className="object-contain" />
      <div className="relative h-[108px] w-[108px]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id={innerGrad} cx="38%" cy="30%" r="72%">
              <stop offset="0%" stopColor="rgb(var(--c-onyx))" />
              <stop offset="52%" stopColor="rgb(var(--c-coal))" />
              <stop offset="100%" stopColor="rgb(var(--c-ink))" />
            </radialGradient>
            <linearGradient id={ringGrad} x1="50" y1="6" x2="50" y2="94" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgb(52 56 50)" />
              <stop offset="38%" stopColor="rgb(var(--c-graphite))" />
              <stop offset="100%" stopColor="rgb(var(--c-ink))" />
            </linearGradient>
            <filter id={ringShadow} x="-18%" y="-18%" width="136%" height="136%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="rgb(0 0 0)" floodOpacity="0.5" />
            </filter>
          </defs>

          <circle cx={cx} cy={cy} r={innerR} fill={`url(#${innerGrad})`} />
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            fill="none"
            stroke="rgb(var(--c-pure) / 0.05)"
            strokeWidth="0.6"
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke={`url(#${ringGrad})`}
            strokeWidth={ringW}
            filter={`url(#${ringShadow})`}
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke="rgb(var(--c-pure) / 0.1)"
            strokeWidth={ringW}
            strokeDasharray={`${c * 0.24} ${c * 0.76}`}
            strokeLinecap="round"
            transform={`rotate(-108 ${cx} ${cy})`}
          />

          <g transform={`rotate(-90 ${cx} ${cy})`}>
            {reduced ? (
              <circle
                cx={cx}
                cy={cy}
                r={ringR}
                fill="none"
                className="text-volt"
                stroke="currentColor"
                strokeWidth={ringW}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - fill)}
              />
            ) : (
              <motion.circle
                cx={cx}
                cy={cy}
                r={ringR}
                fill="none"
                className="text-volt"
                stroke="currentColor"
                strokeWidth={ringW}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: fill }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
              />
            )}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <CountUp to={1024} className="font-mono text-[1.38rem] font-bold tracking-tight text-pure" />
          <span className="mt-1 font-mono text-[8px] tracking-[0.2em] text-bone/55">STEPS</span>
        </div>
      </div>
    </TiltChip>
  );
}

/* ── Feature card ───────────────────────────────────────────────────── */

const ENDURANCE_BODY =
  "Boost Your Stamina And Resilience With Tailored Cardio And Endurance Workouts Designed To Keep You Moving, Stronger For Longer.";
const SPEED_BODY =
  "Boost Your Agility And Explosiveness With High-Intensity Sprint And Movement Drills. Speed Surge Is Designed To Take Your Performance To The Next Level!";

function ExpCard({
  title,
  body,
  image,
  imageAlt,
  imageClass,
  imageSide,
  mobileAlign,
  desktopAlign,
  chip,
  articleClass,
}: {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  imageSide: "left" | "right";
  mobileAlign: "left" | "right";
  desktopAlign: "left" | "right";
  chip: React.ReactNode;
  articleClass?: string;
}) {
  return (
    <article className={cn("relative", articleClass)}>
      <div className="exp-card relative flex h-[520px] flex-col justify-end overflow-hidden rounded-[28px] ring-1 ring-white/5 md:h-auto md:aspect-square md:flex-row md:justify-start">
        {/* Photo — full-bleed on mobile, side column on desktop. On desktop the
            figure is anchored toward the content side so any cropping happens on
            the OUTER edge, never on the side facing the copy. */}
        <div
          className={cn(
            "absolute inset-0 md:relative md:inset-auto md:h-auto md:w-[40%]",
            imageSide === "right" ? "md:order-2" : "md:order-1"
          )}
        >
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 24vw, 100vw" className={imageClass} />
        </div>

        {/* Mobile-only dark gradient so the copy reads over the photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent md:hidden" />

        {/* Copy — on mobile the text/button hug the side opposite the chip */}
        <div
          className={cn(
            "relative z-10 flex flex-col px-6 pb-7 md:flex-1 md:justify-start md:px-6 md:pb-8 md:pt-12",
            mobileAlign === "right" ? "items-end text-right" : "items-start text-left",
            desktopAlign === "right" ? "md:items-end md:text-right" : "md:items-start md:text-left",
            imageSide === "right" ? "md:order-1" : "md:order-2"
          )}
        >
          <h3 className="font-sans text-2xl font-bold leading-tight tracking-tight text-volt">{title}</h3>
          <p className="mt-4 max-w-[190px] text-sm leading-relaxed text-bone/75 md:max-w-[280px] md:text-ash">{body}</p>
          <Button variant="primary" className="mt-6 px-7 py-2.5 text-[13px]">
            Read More
          </Button>
        </div>

        {chip}
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section className="section overflow-hidden">
      <SectionHeading
        top="Experience"
        accent="Fitness Like Never Before"
        subtitle="Transform The Way You Train With Innovative Workouts, Expert Guidance, And State-Of-The-Art Facilities."
        className="section-container"
      />

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-10 lg:gap-x-12">
        <Reveal variants={fromLeft}>
          <ExpCard
            title="Endurance Evolution"
            body={ENDURANCE_BODY}
            image={enduranceImg}
            imageAlt="Athlete training for endurance"
            imageClass="object-cover object-top md:object-[right_bottom]"
            imageSide="left"
            mobileAlign="left"
            desktopAlign="right"
            chip={<BpmChip className="right-4 bottom-[-1.5rem] md:right-[3%] md:bottom-[-1.25rem]" />}
          />
        </Reveal>

        <Reveal variants={fromRight} className="md:mt-20">
          <ExpCard
            title="Speed Surge"
            body={SPEED_BODY}
            image={speedImg}
            imageAlt="Athlete training for speed"
            imageClass="object-cover object-top brightness-110 md:object-[left_bottom]"
            imageSide="right"
            mobileAlign="right"
            desktopAlign="left"
            chip={<StepsChip className="left-4 bottom-[-1.5rem] md:left-[2%] md:bottom-[-1.25rem]" />}
          />
        </Reveal>
      </div>
    </section>
  );
}
