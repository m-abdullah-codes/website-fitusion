"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  edgeFadeClass?: string;
}

export function Marquee({
  items,
  speed = 30,
  reverse = false,
  className,
  itemClassName,
  edgeFadeClass = "from-void",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {/* Edge fade-outs */}
      <div className={cn("absolute inset-y-0 left-0 w-20 bg-gradient-to-r to-transparent z-10 pointer-events-none", edgeFadeClass)} />
      <div className={cn("absolute inset-y-0 right-0 w-20 bg-gradient-to-l to-transparent z-10 pointer-events-none", edgeFadeClass)} />

      <div
        className="flex w-max gap-16"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className={cn("shrink-0 flex items-center", itemClassName)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
