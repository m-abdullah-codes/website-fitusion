"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const review1 = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012243/review_1_y1o4qb.png";
const review2 = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012243/review_2_vcmleh.png";
const review3 = "https://res.cloudinary.com/djnnc4xvt/image/upload/q_auto/f_auto/v1781012243/review_3_mqp5yh.png";

/* ── Data ──────────────────────────────────────────────────────────── */

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  alt: string;
  /** Pull quote card up on mobile to close gap below figure (image-specific). */
  mobileQuoteOverlap?: string;
  /** Stage aspect ratio for mobile layout. */
  mobileStageAspect: [number, number];
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I Love The Variety Of Workouts On Fit Fusion. Whether It's HIIT, Yoga, Or Strength Training, There's Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!",
    name: "James T.",
    location: "LA, USA",
    rating: 5,
    image: review1,
    alt: "James T.",
    mobileQuoteOverlap: "-mt-[10rem]",
    mobileStageAspect: [794, 1324],
  },
  {
    quote:
      "I've Never Felt Stronger Since Joining Fit Fusion. The Trainers Push You Just Right, And The Community Keeps Every Session Energizing. Best Decision I've Made For My Health!",
    name: "Ryan Blaze",
    location: "Miami, USA",
    rating: 5,
    image: review2,
    alt: "Ryan Blaze",
    mobileStageAspect: [794, 1200],
  },
  {
    quote:
      "From Custom Meal Plans To Personalized Workouts, Fit Fusion Covers Everything. I Dropped 20 Pounds In Three Months And Finally Feel In Control Of My Fitness Journey.",
    name: "Ethan Maxx",
    location: "TX, USA",
    rating: 4,
    image: review3,
    alt: "Ethan Maxx",
    mobileStageAspect: [794, 1200],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = 1 | -1;

function getDirection(from: number, to: number, total: number): Direction {
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return forward <= backward ? 1 : -1;
}

function previewIndices(active: number): [number, number] {
  return [(active + 1) % 3, (active + 2) % 3];
}

/* ── Bits ──────────────────────────────────────────────────────────── */

/* ── Star row tuning — edit these values ───────────────────────────── */
const STAR_LAYOUT = {
  /** Horizontal gap between stars (px). */
  gap: 2.5,
  /** How high the centre star sits above the outer pair (px). 0 = flat row. */
  arch: 5,
  /** Star width & height (px) per position group. */
  size: {
    outer: 14, // 1st & 5th
    inner: 16, // 2nd & 4th
    center: 18, // 3rd (middle)
  },
} as const;

const STAR_COUNT = 5;

function starSizeForIndex(index: number): number {
  const mid = (STAR_COUNT - 1) / 2;
  const distFromCenter = Math.abs(index - mid);
  if (distFromCenter === 2) return STAR_LAYOUT.size.outer;
  if (distFromCenter === 1) return STAR_LAYOUT.size.inner;
  return STAR_LAYOUT.size.center;
}

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={filled ? "text-volt" : "text-smoke/50"}
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9 6.1 20.9l1.1-6.47L2.5 9.85l6.5-.95L12 2.5z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-end"
      style={{ gap: STAR_LAYOUT.gap }}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const pos = i - (STAR_COUNT - 1) / 2;
        const norm = pos / ((STAR_COUNT - 1) / 2);
        const translateY = -STAR_LAYOUT.arch * (1 - norm * norm);
        const size = starSizeForIndex(i);

        return (
          <span
            key={i}
            className="inline-block shrink-0 origin-bottom"
            style={{ transform: `translateY(${translateY.toFixed(2)}px)` }}
          >
            <Star filled={i < rating} size={size} />
          </span>
        );
      })}
    </div>
  );
}

function QuoteCard({
  testimonial,
  direction,
  reducedMotion,
}: {
  testimonial: Testimonial;
  direction: Direction;
  reducedMotion: boolean;
}) {
  const dur = reducedMotion ? 0.2 : 0.65;

  return (
    <motion.div
      custom={direction}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 36, y: 18, filter: "blur(10px)" }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -28, y: -10, filter: "blur(8px)" }
      }
      transition={{ duration: dur, ease: EASE }}
      className="testimonial-quote-card relative overflow-hidden rounded-[26px] p-7 ring-1 ring-cream/10 backdrop-blur-md"
    >
      {/* corner bloom */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-volt/[0.07] blur-3xl"
        aria-hidden
      />

      {/* accent sweep on enter */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/80 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.75, ease: EASE }}
        />
      )}

      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-volt/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
        />
      )}

      <motion.p
        className="text-[15px] leading-relaxed text-bone/85"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.08, duration: dur, ease: EASE }}
      >
        &quot;{testimonial.quote}&quot;
      </motion.p>

      <motion.div
        className="mt-6 flex items-end justify-between gap-4"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.16, duration: dur, ease: EASE }}
      >
        <div>
          <p className="font-display text-xl font-bold normal-case tracking-tight text-linen">
            – {testimonial.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-smoke">{testimonial.location}</p>
        </div>
        <Stars rating={testimonial.rating} />
      </motion.div>
    </motion.div>
  );
}

function NavArrows({
  className,
  activeIndex,
  total,
  onPrev,
  onNext,
  onGoTo,
}: {
  className?: string;
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}) {
  const base =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-bone/70 shadow-arrow backdrop-blur-md transition-colors hover:border-volt/60 hover:bg-volt/8 hover:text-volt hover:shadow-glow-nav";

  return (
    <div className={"flex flex-col items-center gap-4 " + (className ?? "")}>
      <div className="flex items-center gap-3">
      <motion.button
        type="button"
        aria-label="Previous testimonial"
        className={base}
        onClick={onPrev}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
      <motion.button
        type="button"
        aria-label="Next testimonial"
        className={base}
        onClick={onNext}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
      </div>

      {/* progress pills */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => onGoTo(i)}
              className={
                "h-1.5 rounded-full transition-all duration-500 " +
                (active ? "w-8 bg-volt shadow-glow-dot" : "w-1.5 bg-smoke/40 hover:bg-smoke/70")
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function PreviewCard({
  person,
  className,
  offset,
  onSelect,
  reducedMotion,
}: {
  person: Testimonial;
  className?: string;
  offset: 0 | 1;
  onSelect: () => void;
  reducedMotion: boolean;
}) {
  const dur = reducedMotion ? 0.2 : 0.55;

  return (
    <motion.button
      type="button"
      aria-label={`View testimonial from ${person.name}`}
      onClick={onSelect}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: offset === 0 ? 22 : 14, scale: 0.94 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: dur, ease: EASE, delay: offset * 0.06 }}
      whileHover={reducedMotion ? undefined : { scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={
        "group relative cursor-pointer overflow-hidden rounded-[20px] bg-ink text-left opacity-80 ring-1 ring-white/[0.04] " +
        "transition-[box-shadow,opacity,transform] duration-500 hover:opacity-100 hover:ring-volt/30 hover:shadow-glow-preview " +
        (className ?? "")
      }
    >
      <Image
        src={person.image}
        alt={person.alt}
        fill
        className="object-cover object-top grayscale brightness-[0.62] contrast-[1.05] transition-[filter,transform] duration-500 group-hover:brightness-[0.88] group-hover:grayscale-[0.75]"
        sizes="160px"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-0 bg-volt/0 transition-colors duration-300 group-hover:bg-volt/[0.05]" />
      <span className="absolute bottom-3 right-1.5 font-display text-[1.05rem] font-bold italic normal-case tracking-tight text-volt transition-transform duration-300 group-hover:translate-y-[-2px] [writing-mode:vertical-rl] rotate-180">
        {person.name}
      </span>
    </motion.button>
  );
}

/** Pure-atmosphere stage — no clipped shapes, just cinematic light. */
function ActiveStage({
  reducedMotion,
  activeIndex,
}: {
  reducedMotion: boolean;
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* wide ambient olive field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 40% 50%, rgb(var(--c-moss) / 0.42) 0%, rgb(var(--c-moss) / 0.18) 45%, transparent 72%)",
        }}
      />

      {/* tighter spotlight — flares on slide change */}
      <motion.div
        key={activeIndex}
        className="absolute left-[0%] top-[8%] h-[80%] w-[80%]"
        style={{
          background:
            "radial-gradient(ellipse 68% 60% at 46% 42%, rgb(var(--c-grass) / 0.32) 0%, rgb(var(--c-olive) / 0.14) 48%, transparent 72%)",
          filter: "blur(28px)",
        }}
        initial={reducedMotion ? false : { opacity: 0.4, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: EASE }}
      />

      {/* breathing idle pulse */}
      <div
        className={
          "absolute left-[8%] top-[18%] h-[60%] w-[62%] rounded-full " +
          (reducedMotion ? "" : "testimonial-glow-pulse")
        }
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(var(--c-grass) / 0.18) 0%, transparent 68%)",
          filter: "blur(36px)",
        }}
      />

      {/* floor reflection — athlete feet */}
      <div
        className="absolute bottom-0 left-[4%] h-[16%] w-[72%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 42% 60%, rgb(var(--c-cta) / 0.09) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* decorative diagonal accent lines: top-right + bottom-left corners only */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 500 560"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* top-right diagonal line */}
        <line x1="345" y1="2" x2="497" y2="89" stroke="rgb(var(--c-volt) / 0.18)" strokeWidth="1.2" />
        {/* bottom-left diagonal line */}
        <line x1="3" y1="473" x2="155" y2="557" stroke="rgb(var(--c-volt) / 0.18)" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function FeaturedFigure({
  image,
  alt,
  direction,
  reducedMotion,
  variant = "desktop",
}: {
  image: string;
  alt: string;
  direction: Direction;
  reducedMotion: boolean;
  variant?: "desktop" | "mobile";
}) {
  const dur = reducedMotion ? 0.2 : 0.75;
  const isMobile = variant === "mobile";

  return (
    <motion.div
      custom={direction}
      className={isMobile ? "absolute inset-0 z-[1] translate-y-[100px]" : "absolute inset-0 z-10"}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 56, scale: 0.96, filter: "blur(12px)" }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -48, scale: 1.02, filter: "blur(10px)" }
      }
      transition={{ duration: dur, ease: EASE }}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={alt}
          fill
          className={
            (isMobile ? "object-contain object-bottom" : "object-contain object-left-bottom") +
            " contrast-[1.04] brightness-[1.02] grayscale drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
          }
          sizes="(min-width: 1024px) 480px, 90vw"
          priority={false}
        />
      </div>
    </motion.div>
  );
}

/* ── Carousel body ─────────────────────────────────────────────────── */

function TestimonialCarousel() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);

  const active = TESTIMONIALS[activeIndex];
  const [previewA, previewB] = previewIndices(activeIndex);

  const navigate = useCallback((index: number) => {
    setActiveIndex((current) => {
      if (index === current) return current;
      setDirection(getDirection(current, index, TESTIMONIALS.length));
      return index;
    });
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      setDirection(1);
      return (current + 1) % TESTIMONIALS.length;
    });
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => {
      setDirection(-1);
      return (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    });
  }, []);

  /* keyboard arrows when section is focused / visible */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* swipe on touch devices */
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={sectionRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="outline-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Desktop ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto hidden h-[580px] max-w-[1080px] px-6 lg:block">
        {/* faint bridge from stage → previews */}
        <div
          className="pointer-events-none absolute left-[48%] top-[22%] h-px w-[18%] bg-gradient-to-r from-white/10 via-white/5 to-transparent"
          aria-hidden
        />

        <div className="absolute bottom-0 left-0 h-[94%] w-[50%] overflow-visible">
          <ActiveStage reducedMotion={reducedMotion} activeIndex={activeIndex} />
          <div className="relative h-full overflow-visible">
            <AnimatePresence mode="sync" initial={false}>
              <FeaturedFigure
                key={active.alt}
                image={active.image}
                alt={active.alt}
                direction={direction}
                reducedMotion={reducedMotion}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-[5%] left-[21%] z-20 w-[38%]">
          <AnimatePresence mode="wait" initial={false}>
            <QuoteCard
              key={active.name}
              testimonial={active}
              direction={direction}
              reducedMotion={reducedMotion}
            />
          </AnimatePresence>
        </div>

        <NavArrows
          className="absolute left-[57%] top-[4%]"
          activeIndex={activeIndex}
          total={TESTIMONIALS.length}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={navigate}
        />

        <div className="absolute left-[64%] top-[14%] h-[52%] w-[14%]">
          <AnimatePresence mode="wait">
            <PreviewCard
              key={TESTIMONIALS[previewA].name}
              person={TESTIMONIALS[previewA]}
              className="h-full w-full"
              offset={0}
              onSelect={() => navigate(previewA)}
              reducedMotion={reducedMotion}
            />
          </AnimatePresence>
        </div>
        <div className="absolute left-[80%] top-[10%] h-[52%] w-[14%]">
          <AnimatePresence mode="wait">
            <PreviewCard
              key={TESTIMONIALS[previewB].name}
              person={TESTIMONIALS[previewB]}
              className="h-full w-full"
              offset={1}
              onSelect={() => navigate(previewB)}
              reducedMotion={reducedMotion}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile / tablet ─────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:hidden">
        <div className="relative overflow-visible rounded-[28px]">
          {/* Athlete stage — height follows each image's aspect ratio so nothing is clipped */}
          <div
            className="relative mx-auto w-full max-w-[min(100%,320px)] overflow-visible"
            style={{
              aspectRatio: `${active.mobileStageAspect[0]} / ${active.mobileStageAspect[1]}`,
            }}
          >
            <ActiveStage reducedMotion={reducedMotion} activeIndex={activeIndex} />
            <AnimatePresence mode="sync" initial={false}>
              <FeaturedFigure
                key={active.alt}
                image={active.image}
                alt={active.alt}
                direction={direction}
                reducedMotion={reducedMotion}
                variant="mobile"
              />
            </AnimatePresence>
          </div>

          {/* Quote card — overlaps figure from below (per-image tuning when needed) */}
          <div className={"relative z-10 " + (active.mobileQuoteOverlap ?? "-mt-[10rem]")}>
            <AnimatePresence mode="wait" initial={false}>
              <QuoteCard
                key={active.name}
                testimonial={active}
                direction={direction}
                reducedMotion={reducedMotion}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Preview cards flanked by nav arrows */}
        <div className="mt-5 flex items-center gap-3">
          <motion.button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-bone/70 backdrop-blur-sm transition-colors hover:border-volt/60 hover:text-volt"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <div className="flex flex-1 gap-3">
            <div className="relative h-[170px] flex-1 overflow-hidden rounded-[18px]">
              <AnimatePresence mode="wait">
                <PreviewCard
                  key={TESTIMONIALS[previewA].name}
                  person={TESTIMONIALS[previewA]}
                  className="h-full w-full"
                  offset={0}
                  onSelect={() => navigate(previewA)}
                  reducedMotion={reducedMotion}
                />
              </AnimatePresence>
            </div>
            <div className="relative h-[170px] flex-1 overflow-hidden rounded-[18px]">
              <AnimatePresence mode="wait">
                <PreviewCard
                  key={TESTIMONIALS[previewB].name}
                  person={TESTIMONIALS[previewB]}
                  className="h-full w-full"
                  offset={1}
                  onSelect={() => navigate(previewB)}
                  reducedMotion={reducedMotion}
                />
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/50 text-bone/70 backdrop-blur-sm transition-colors hover:border-volt/60 hover:text-volt"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        {/* Progress dots */}
        <div className="mt-5 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => navigate(i)}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (isActive
                    ? "w-8 bg-volt shadow-glow-dot"
                    : "w-1.5 bg-smoke/40 hover:bg-smoke/70")
                }
              />
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing testimonial from {active.name}, {active.location}
      </p>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */

function SlashAccent() {
  return (
    <svg viewBox="0 0 72 36" className="h-9 w-auto text-volt" fill="currentColor" aria-hidden>
      <polygon points="4,33 14,3 19,3 9,33" />
      <polygon points="26,33 36,3 41,3 31,33" />
      <polygon points="48,33 58,3 63,3 53,33" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="section-flush relative overflow-hidden">
      {/* section-wide atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[8%] top-[35%] h-[55%] w-[50%] rounded-full bg-olive/[0.06] blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-iron/30 to-transparent" />
      </div>

      <div className="section-head relative mx-auto max-w-[760px] px-6 text-center">
        <h2 className="font-display text-5xl normal-case leading-[0.95] tracking-tight text-linen sm:text-6xl">
          Your Success
        </h2>
        <h2 className="mt-1 font-display text-5xl normal-case leading-[0.95] tracking-tight sm:text-7xl">
          <span className="text-linen">Stories, </span>
          <span className="text-citron">Our Inspiration</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash">
          See How Our Customers Have Achieved Their Goals And Let Their Journeys Inspire Yours!
        </p>
      </div>

      <div className="relative">
        <TestimonialCarousel />
      </div>

      <div className="relative mt-14 flex justify-center sm:mt-16">
        <SlashAccent />
      </div>
    </section>
  );
}
