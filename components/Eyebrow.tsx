import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Eyebrow — the site's .eyebrow / eyebrow-row: an uppercase 0.18em label,
// optionally preceded by a small coloured dot/square that signals the section.
// Colour is inherited from context; pass className to set it per surface.

export type EyebrowDot = "gold" | "green" | "navy" | "none";

export interface EyebrowProps {
  children: React.ReactNode;
  dot?: EyebrowDot;
  className?: string;
}

const DOT: Record<Exclude<EyebrowDot, "none">, string> = {
  gold: "bg-gold-vivid",
  green: "bg-green-vivid",
  navy: "bg-navy-vivid",
};

export const Eyebrow: React.FC<EyebrowProps> = ({ children, dot = "none", className }) => (
  <span className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
    {dot !== "none" && <span aria-hidden className={cn("inline-block h-2 w-2 rounded-full", DOT[dot])} />}
    <span>{children}</span>
  </span>
);
