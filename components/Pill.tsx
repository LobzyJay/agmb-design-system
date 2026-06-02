import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Pill — a small rounded-full chip used for nav state, category tags and
// the gold newsroom chip. tone sets the fill/treatment.

export type PillTone = "cream" | "gold-outline" | "glass" | "navy";

export interface PillProps {
  children: React.ReactNode;
  tone?: PillTone;
  className?: string;
}

const TONE: Record<PillTone, string> = {
  cream: "bg-cream-warm text-navy-deep",
  navy: "bg-navy-vivid text-cream-warm",
  "gold-outline": "border border-gold-vivid/50 text-gold-vivid",
  glass: "bg-black/60 text-gold-vivid backdrop-blur-sm",
};

export const Pill: React.FC<PillProps> = ({ children, tone = "cream", className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
      TONE[tone],
      className,
    )}
  >
    {children}
  </span>
);
