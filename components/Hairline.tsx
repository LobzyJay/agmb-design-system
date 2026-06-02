import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Hairline — a 1px divider tuned per surface (faint cream on navy, faint
// navy on cream). Horizontal by default; vertical for inline dividers.

export interface HairlineProps {
  surface?: "navy" | "cream";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Hairline: React.FC<HairlineProps> = ({ surface = "navy", orientation = "horizontal", className }) => (
  <span
    aria-hidden
    className={cn(
      surface === "navy" ? "bg-[var(--color-hairline-on-navy)]" : "bg-[var(--color-hairline-on-cream)]",
      orientation === "horizontal" ? "block h-px w-full" : "block w-px self-stretch",
      className,
    )}
  />
);
