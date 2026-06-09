import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "./Reveal";
import { fadeUp, fadeUpSm } from "@/lib/motion";

interface SectionHeadingProps {
  top: string;
  accent: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ top, accent, subtitle, className }: SectionHeadingProps) {
  return (
    <Stagger className={cn("section-head text-center", className)} stagger={0.12}>
      <StaggerItem variants={fadeUp}>
        <h2 className="font-display normal-case tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl text-linen">
          {top}
        </h2>
      </StaggerItem>
      <StaggerItem variants={fadeUp}>
        <h2 className="font-display normal-case tracking-tight leading-[0.95] text-4xl sm:text-6xl md:text-7xl text-citron mt-1">
          {accent}
        </h2>
      </StaggerItem>
      {subtitle && (
        <StaggerItem variants={fadeUpSm}>
          <p className="mt-5 sm:mt-6 text-ash text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </StaggerItem>
      )}
    </Stagger>
  );
}
