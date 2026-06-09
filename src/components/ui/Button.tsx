import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  arrow?: boolean;
}

export function Button({
  variant = "primary",
  arrow,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 font-sans font-bold text-sm cursor-pointer select-none transition-all duration-200",
        variant === "primary" && [
          "btn-sheen btn-primary-gradient text-void rounded-full px-7 py-3",
          "hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        ],
        variant === "secondary" && [
          "border border-iron text-bone rounded-full px-7 py-3",
          "hover:bg-graphite hover:border-iron/60",
        ],
        variant === "ghost" && [
          "relative text-bone px-0 py-1",
          "after:content-[''] after:absolute after:bottom-0 after:left-0",
          "after:h-px after:w-0 after:bg-volt",
          "after:transition-[width] after:duration-300",
          "hover:after:w-full hover:text-volt",
        ],
        className
      )}
      {...props}
    >
      {children}
      {arrow && (
        <span className="font-mono text-xs tracking-tighter opacity-70">&gt;&gt;&gt;</span>
      )}
    </button>
  );
}
