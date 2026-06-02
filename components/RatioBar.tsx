import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB RatioBar — the calculator's principal/interest split bar: a pill track
// with two fills (cream-warm for the first share, green-vivid for the second).
// `value` is the first share 0–1.

export interface RatioBarProps {
  value: number;
  className?: string;
  "aria-label"?: string;
}

export const RatioBar: React.FC<RatioBarProps> = ({ value, className, "aria-label": ariaLabel = "Ratio" }) => {
  const a = Math.max(0, Math.min(1, value));
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("flex h-1.5 w-full overflow-hidden rounded-pill bg-cream-warm/10", className)}
    >
      <span className="h-full bg-cream-warm" style={{ width: `${a * 100}%` }} />
      <span className="h-full bg-green-vivid" style={{ width: `${(1 - a) * 100}%` }} />
    </div>
  );
};
