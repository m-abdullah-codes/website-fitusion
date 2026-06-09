"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

interface CountUpProps {
  /** Final value to count to (e.g. 1.5, 20, 550, 95, 1024). */
  to: number;
  /** Decimal places to render — 1 for "1.5", 0 for whole reps. */
  decimals?: number;
  /** Count duration in seconds. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts from 0 → `to` the first time it scrolls into view, then stops.
 * Honours reduced-motion (renders the final value immediately) and tears
 * the animation down on unmount so no rAF leaks behind it.
 */
export function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
