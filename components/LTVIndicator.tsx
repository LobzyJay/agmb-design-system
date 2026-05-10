"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { LTV_SAFE_MAX, LTV_CAUTION_MAX } from "@/constants/mortgage";

// AGMB LTVIndicator pill — PRD §4.5 + §5.1.
// Displays loan-to-value ratio with a band-coloured pill (green / amber / red),
// label, percentage, and an inline-message slot for the LTV warning when >90%.
//
// Bands (constants/mortgage.ts):
//   green ≤80%  — safe, most products accept
//   amber 80–90 — caution, deposit may be required
//   red   >90%  — most products reject
//
// 7 states: default | hover | focus-visible | active | disabled | loading | error
// Hover/focus/active only apply when interactive (e.g. tooltip trigger). For static
// display use the non-interactive variant.

export type LTVBand = "safe" | "caution" | "warning";

export interface LTVIndicatorProps {
  /** LTV percentage (0–100+). Out-of-range values clamp visually but the value itself is shown. */
  value: number;
  /** Visual variant — usually derived from value, override only for explicit design moments. */
  band?: LTVBand;
  /** Optional message — shown alongside the pill. The PRD §5.1 LTV warning copy lives here. */
  message?: React.ReactNode;
  /** Loading state — pill shows a skeleton; value not displayed until loaded. */
  loading?: boolean;
  /** Disabled — render at half opacity, no interaction. */
  disabled?: boolean;
  className?: string;
}

const BAND_VISUALS: Record<LTVBand, { bg: string; text: string; ring: string; label: string }> = {
  safe: {
    bg: "bg-ag-green/10",
    text: "text-ag-green",
    ring: "ring-1 ring-ag-green/30",
    label: "Safe",
  },
  caution: {
    bg: "bg-ag-amber/10",
    text: "text-ag-amber",
    ring: "ring-1 ring-ag-amber/30",
    label: "Caution",
  },
  warning: {
    bg: "bg-ag-red/10",
    text: "text-ag-red",
    ring: "ring-1 ring-ag-red/30",
    label: "High",
  },
};

export function bandFromValue(value: number): LTVBand {
  if (value <= LTV_SAFE_MAX) return "safe";
  if (value <= LTV_CAUTION_MAX) return "caution";
  return "warning";
}

export const LTVIndicator: React.FC<LTVIndicatorProps> = ({
  value,
  band: bandProp,
  message,
  loading,
  disabled,
  className,
}) => {
  const band = bandProp ?? bandFromValue(value);
  const visuals = BAND_VISUALS[band];

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2", className)} aria-busy="true">
        <div className="h-7 w-24 rounded-full bg-ag-light animate-pulse" />
        {message && <div className="h-3 w-40 rounded bg-ag-light animate-pulse" />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        disabled && "opacity-50",
        className,
      )}
      data-band={band}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 self-start rounded-full px-3 py-1",
          "transition-token",
          visuals.bg,
          visuals.text,
          visuals.ring,
        )}
        role="status"
        aria-label={`Loan-to-value ratio ${value} percent — ${visuals.label}`}
      >
        <svg
          width="8" height="8" viewBox="0 0 8 8" fill="currentColor"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider">{visuals.label}</span>
        <span className="numeric text-sm font-medium">{value}%</span>
      </div>
      {message && (
        <p className={cn("text-xs leading-snug", visuals.text)}>
          {message}
        </p>
      )}
    </div>
  );
};
LTVIndicator.displayName = "LTVIndicator";
