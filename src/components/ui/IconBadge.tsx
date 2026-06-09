import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  /** Render the glyph as a solid fill instead of an outline. */
  filled?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { wrap: "w-7 h-7",   icon: "w-3.5 h-3.5" },
  md: { wrap: "w-10 h-10", icon: "w-5 h-5"     },
  lg: { wrap: "w-12 h-12", icon: "w-6 h-6"     },
};

export function IconBadge({ icon: Icon, size = "md", filled = false, className }: IconBadgeProps) {
  const s = sizeMap[size];
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-volt/10 text-volt shrink-0",
        s.wrap,
        className
      )}
    >
      <Icon
        strokeWidth={filled ? 1 : 1.5}
        fill={filled ? "currentColor" : "none"}
        className={s.icon}
      />
    </div>
  );
}
