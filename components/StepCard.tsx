"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB StepCard — PRD §4.5 + §06 How It Works.
// Numbered (gold), Libre Baskerville step title, Inter sub-copy, hairline divider beneath.
// Used in §06 (4-step horizontal flow with sticky scroll-pan).
//
// Anatomy:
//   01.                     ← gold numeric (Geist Mono · large)
//   Apply in 5 minutes      ← bi-serif step title
//   Complete the short      ← sub-copy
//   eligibility check.
//   ──────                  ← hairline divider beneath (gold or border)

export interface StepCardProps {
  /** Step number (rendered with leading zero — "01", "02", etc.). */
  number: number | string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Active step gets gold numeric; inactive uses ag-muted (per §06 sticky-scroll behaviour). */
  active?: boolean;
  /** Inverse for navy backgrounds. */
  inverse?: boolean;
  className?: string;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description, active = false, inverse = false, className }) => {
  const formatted = typeof number === "number" ? number.toString().padStart(2, "0") : number;
  return (
    <article
      className={cn(
        "flex flex-col gap-3",
        className,
      )}
      data-active={active || undefined}
    >
      <p
        className={cn(
          "numeric text-4xl md:text-5xl tracking-tight leading-none transition-token-base",
          active
            ? (inverse ? "text-ag-gold" : "text-ag-gold")
            : (inverse ? "text-ag-cream/40" : "text-ag-muted/50"),
        )}
      >
        {formatted}.
      </p>
      <h3
        className={cn(
          "bi-section bi-serif text-2xl md:text-3xl leading-tight tracking-tight",
          inverse ? "text-ag-cream" : "text-ag-navy",
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "text-sm md:text-base leading-relaxed max-w-sm",
            inverse ? "text-ag-cream/70" : "text-ag-muted",
          )}
        >
          {description}
        </p>
      )}
      <span
        className={cn(
          "block h-px mt-2 transition-token-base",
          active
            ? "bg-ag-gold"
            : (inverse ? "bg-ag-cream/20" : "bg-ag-border"),
        )}
        aria-hidden="true"
      />
    </article>
  );
};
StepCard.displayName = "StepCard";
