"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB StatBlock primitive — PRD §4.5 + §03.
// JetBrains/Geist Mono numeric XL + Inter eyebrow label + 2px gold top rule.
// Used in §03 stats counter (4-column grid on navy).
//
// Anatomy:
//   ──────  ← 2px gold top rule (full width of the block)
//
//   ₦2.8B   ← numeric XL (Geist Mono / 56px desktop)
//   DISBURSED · 12 MONTHS  ← eyebrow (Inter 11px, gold, uppercase)
//   to 97 Nigerian families  ← optional sub-line (Inter, ag-muted/cream-70)

export interface StatBlockProps {
  /** Pre-formatted numeric value (e.g. "₦2.8B", "20+", "97"). */
  value: React.ReactNode;
  /** Eyebrow label (uppercase). */
  label: React.ReactNode;
  /** Optional sub-line context. */
  context?: React.ReactNode;
  /** Light mode for navy backgrounds — flips text colour to ag-cream. */
  inverse?: boolean;
  className?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({ value, label, context, inverse, className }) => (
  <div
    /* M5 hairline diet (carried into Fix-4): no gold border-top.
       The numeric carries the moment alone at the new scale. */
    className={cn(
      "flex flex-col gap-3",
      className,
    )}
  >
    <p
      className={cn(
        /* Fix-4 stats scale: lifts to 5xl/6xl/7xl so the value reads at the
           same weight register as the new section H2 (72px).
           pair.numeric.emphasis (2026-05-09): on a light surface (no inverse),
           the hero numeric switches to navy.vivid — the "AGMB moment" colour
           move. On dark / inverse, keep cream. The .numeric weight bump rule
           in globals.css handles the weight side on dark surfaces. */
        "numeric font-semibold tracking-[-0.04em] text-5xl md:text-6xl lg:text-7xl leading-none",
        inverse ? "text-ag-cream" : "text-ag-navy-vivid",
      )}
    >
      {value}
    </p>
    <p
      className={cn(
        /* Eyebrow label — decorative-gold per gold-demotion v3 (gold reserved
           for hairlines + eyebrow accents only). Reads on both light and dark
           surfaces. */
        "text-[11px] font-semibold tracking-[0.08em] uppercase text-ag-gold",
      )}
    >
      {label}
    </p>
    {context && (
      <p
        className={cn(
          "text-sm leading-snug",
          inverse ? "text-ag-cream/70" : "text-ag-muted",
        )}
      >
        {context}
      </p>
    )}
  </div>
);
StatBlock.displayName = "StatBlock";
