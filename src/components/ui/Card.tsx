import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-onyx rounded-lg border border-iron shadow-soft", className)}>
      {children}
    </div>
  );
}
