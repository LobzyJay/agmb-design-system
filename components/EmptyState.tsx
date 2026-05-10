"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB EmptyState — Wise pattern (PRD §4.5 + §3.5.4).
// Pre-interaction state. Verb prompt + reassurance copy.
// Used in: §05 calculator before first input, §10 news if no press,
// §08 testimonials before consent, Utility 3 wizard idle states.
//
// Per PRD §3.5.4: "Try a property value to see your numbers." — never "No results."

export interface EmptyStateProps {
  /** Verb-led prompt headline (Libre Baskerville, italic). */
  title: React.ReactNode;
  /** Reassurance / instruction copy below. */
  description?: React.ReactNode;
  /** Optional decorative icon / illustration above the title. */
  icon?: React.ReactNode;
  /** Optional action — usually a CTA button. */
  action?: React.ReactNode;
  /** Inverse for navy backgrounds. */
  inverse?: boolean;
  /** Compact — tighter spacing for inline contexts (e.g. calculator output panel). */
  compact?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  inverse = false,
  compact = false,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col items-start gap-3",
      compact ? "py-4" : "py-10",
      className,
    )}
  >
    {icon && (
      <span className={cn("text-ag-gold", compact ? "scale-75" : "")}>{icon}</span>
    )}
    <p
      className={cn(
        "bi-serif italic leading-snug",
        compact ? "text-xl" : "text-2xl md:text-3xl",
        inverse ? "text-ag-cream" : "text-ag-navy",
      )}
    >
      {title}
    </p>
    {description && (
      <p
        className={cn(
          "text-sm leading-snug max-w-md",
          inverse ? "text-ag-cream/70" : "text-ag-muted",
        )}
      >
        {description}
      </p>
    )}
    {action && <div className="mt-3">{action}</div>}
  </div>
);
EmptyState.displayName = "EmptyState";
