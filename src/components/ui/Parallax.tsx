"use client";

import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical drift (px) accumulated over `scrollRange` px of page scroll. */
  scroll?: number;
  /** Max pointer-driven shift (px) at the screen edges. Fine pointers only. */
  mouse?: number;
  /** Scroll distance (px) the `scroll` drift is mapped across. */
  scrollRange?: number;
}

/**
 * Wraps content in a GPU-only parallax layer driven by page scroll and
 * (optionally) pointer position. Pointer tracking is spring-smoothed and
 * limited to fine pointers, so it never fights touch scrolling. Collapses
 * to a static <div> under reduced-motion.
 */
export function Parallax({
  children,
  className,
  scroll = 0,
  mouse = 0,
  scrollRange = 700,
}: ParallaxProps) {
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollDrift = useTransform(scrollY, [0, scrollRange], [0, scroll]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 60, damping: 18, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 60, damping: 18, mass: 0.4 });

  const y = useTransform(() => scrollDrift.get() + springY.get());

  useEffect(() => {
    if (reduced || !mouse) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2 * mouse);
      py.set((e.clientY / window.innerHeight - 0.5) * 2 * mouse);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mouse, px, py]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ x: springX, y }}>
      {children}
    </motion.div>
  );
}
