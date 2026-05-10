"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Nudge — Wise primitive (PRD §4.5).
// Soft re-engagement prompt. Used for:
//   - Wizard resume: "Continue where you left off?" (Resume / Start over)
//   - Calculator return: "Pick up from your saved scenario?" (Restore / Dismiss)
//
// Anatomy:
//   ┌──────────────────────────────────────────────┐
//   │ Continue where you left off?                 │
//   │ Step 3 of 5 — Property details.              │
//   │                                              │
//   │ [Resume]  [Start over]                       │
//   └──────────────────────────────────────────────┘
//
// Distinct from CriticalBanner: not an alert, not dismissible by default
// (you choose between the actions). Cream surface, gold accent.

export interface NudgeProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary action — typically "Resume" / "Restore". */
  primaryAction: React.ReactNode;
  /** Secondary action — typically "Start over" / "Dismiss". */
  secondaryAction?: React.ReactNode;
  /** Optional icon at the leading edge. */
  icon?: React.ReactNode;
  className?: string;
}

export const Nudge: React.FC<NudgeProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  icon,
  className,
}) => (
  <div
    className={cn(
      "relative bg-ag-white border border-ag-border rounded-card p-5",
      // v2 surface-flatness pass (Adewale 2026-05-09): cards default flat-with-borders.
      // Elevation is reserved for hover state. Soft-1 only — no soft-2/3 on rest.
      "hover-lift hover:shadow-soft-1",
      "before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:bg-ag-gold before:rounded-r",
      className,
    )}
    role="region"
    aria-label="Resume prompt"
  >
    <div className="flex items-start gap-3">
      {icon && <span className="shrink-0 mt-0.5 text-ag-gold">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-ag-text leading-snug">{title}</p>
        {description && (
          <p className="text-sm text-ag-muted leading-snug mt-1">{description}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </div>
  </div>
);
Nudge.displayName = "Nudge";
