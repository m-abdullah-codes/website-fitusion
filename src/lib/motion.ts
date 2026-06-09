import { type Variants } from "motion/react";

/* ════════════════════════════════════════════════════════════════════
   MOTION — single source of truth for the site's animation language.

   The vocabulary is deliberately "athletic": fast, confident power-eases
   with a touch of overshoot, mirroring the kinetic feel of the brand.
   Every variant animates ONLY transform / opacity / filter so the GPU
   does the work and scrolling stays at 60fps. Reveal triggers fire ONCE.
   Reduced-motion is honoured by the components that consume these.
   ════════════════════════════════════════════════════════════════════ */

/** Smooth decelerating power-ease — the house curve (matches Testimonials). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Springy overshoot — for "pop" entrances (matches the hero chip keyframe). */
export const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

/** Shared in-view trigger config: reveal once, when ~22% has entered. */
export const VIEWPORT = { once: true, amount: 0.22 } as const;

/* ── Single-element reveals ─────────────────────────────────────────── */

/** The workhorse: rise 24px + fade in. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Smaller travel — for dense lists / inline items. */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Premium variant — adds a brief blur-clear on top of the rise. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Scale-in with a hint of overshoot — for cards / media tiles. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_POP },
  },
};

/* ── Stagger containers ─────────────────────────────────────────────── */

/**
 * Parent container that releases its children in sequence.
 * Children should carry one of the item variants above (`hidden` / `show`).
 */
export const staggerContainer = (
  stagger = 0.09,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
