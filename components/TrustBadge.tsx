"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB TrustBadge primitive — PRD §4.5 + §02 hero / §07 trust.
// White bg, 1px ag-border, logo + label inline, 120px min-width, 8px radius.
// Used in: hero trust strip (4 in a row, hairline-divided), §07 logo strip.

export interface TrustBadgeProps {
  /** Short label (e.g. "CBN Licensed", "ISO 9001:2015", "20+ Years"). */
  label: React.ReactNode;
  /** Optional logo / icon — rendered to the left of the label, max 24px. */
  logo?: React.ReactNode;
  /** Inverted variant for navy backgrounds. */
  inverse?: boolean;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ label, logo, inverse, className }) => (
  <div
    className={cn(
      "inline-flex items-center gap-2 rounded-lg px-3 py-2 border min-w-[120px]",
      inverse
        ? "bg-transparent border-ag-cream/20 text-ag-cream"
        : "bg-ag-white border-ag-border text-ag-text",
      className,
    )}
  >
    {logo && <span className="shrink-0 inline-flex items-center justify-center w-6 h-6">{logo}</span>}
    <span className="text-sm font-semibold">{label}</span>
  </div>
);
TrustBadge.displayName = "TrustBadge";
