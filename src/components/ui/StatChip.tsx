import Image, { type StaticImageData } from "next/image";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBadge } from "./IconBadge";
import { CountUp } from "./CountUp";

interface StatChipProps {
  icon?: LucideIcon;
  imgSrc?: StaticImageData | string;
  label: string;
  value: string;
  unit?: string;
  className?: string;
  /** When set, the value counts up from 0 → countTo the first time in view. */
  countTo?: number;
  /** Decimal places for the counted value (e.g. 1 for "1.5"). */
  countDecimals?: number;
}

export function StatChip({
  icon,
  imgSrc,
  label,
  value,
  unit,
  className,
  countTo,
  countDecimals = 0,
}: StatChipProps) {
  return (
    <div className={cn("stat-card inline-flex flex-col items-center justify-between px-3 py-4 min-w-[90px] min-h-[108px]", className)}>
      {imgSrc ? (
        <Image src={imgSrc} alt="" width={57} height={57} className="object-contain" />
      ) : icon ? (
        <IconBadge icon={icon} size="lg" />
      ) : null}
      <div className="flex flex-col items-center gap-0.5">
        <p className="font-sans text-[12px] text-bone/80 leading-tight">{label}</p>
        <p className="font-sans text-[1.9rem] leading-none text-pure font-bold">
          {countTo !== undefined ? (
            <CountUp to={countTo} decimals={countDecimals} />
          ) : (
            value
          )}
        </p>
        {unit ? (
          <p className="font-mono text-[9px] leading-none text-bone/55 tracking-[0.16em] uppercase">
            {unit}
          </p>
        ) : null}
      </div>
    </div>
  );
}
