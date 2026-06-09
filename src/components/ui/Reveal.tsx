"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

/* ════════════════════════════════════════════════════════════════════
   Scroll-reveal primitives, built on Motion's `whileInView`.

   • <Reveal>       — one element rises/fades in when scrolled into view.
   • <Stagger>      — a container that releases its children in sequence.
   • <StaggerItem>  — a child of <Stagger> (inherits the run from the parent).

   All three collapse to a plain, instantly-visible <div> when the user
   prefers reduced motion, so content is never hidden or animated for them.
   They reveal ONCE (see VIEWPORT) — no work happens after the first pass.
   ════════════════════════════════════════════════════════════════════ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates. */
  delay?: number;
  /** Override the motion variant (defaults to a 24px fade-up). */
  variants?: Variants;
}

export function Reveal({ children, className, delay = 0, variants = fadeUp }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Gap (seconds) between each child's entrance. */
  stagger?: number;
  /** Delay (seconds) before the first child fires. */
  delayChildren?: number;
}

export function Stagger({ children, className, stagger, delayChildren }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Override the per-item variant (defaults to a 24px fade-up). */
  variants?: Variants;
}

export function StaggerItem({ children, className, variants = fadeUp }: StaggerItemProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
