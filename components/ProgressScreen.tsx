"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ProgressScreen — Wise pattern (PRD §4.5 + §5.3 wizard).
// Loading state during server-side validation between wizard steps. Shown only
// for network-bound transitions; local-only steps transition instantly.
//
// Anatomy:
//   ⟳                          ← spinner
//   STEP 3 of 5                ← step indicator (eyebrow)
//   Verifying property value.  ← bi-serif italic context line
//   This usually takes a moment ← muted reassurance

export interface ProgressScreenProps {
  /** Eyebrow indicator — e.g. "Step 3 of 5", "Submitting…". */
  step?: React.ReactNode;
  /** Italic-serif headline describing what's happening. */
  title: React.ReactNode;
  /** Reassurance copy below. */
  description?: React.ReactNode;
  /** Compact — inline rather than full-screen. */
  compact?: boolean;
  className?: string;
}

const Spinner = () => (
  <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="var(--ag-border)" strokeWidth="3" />
    <path d="M2 12a10 10 0 0 1 10-10" stroke="var(--ag-gold)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  step,
  title,
  description,
  compact = false,
  className,
}) => (
  <section
    className={cn(
      "flex flex-col items-center gap-3 text-center",
      compact ? "py-6 px-4" : "py-20 px-6",
      className,
    )}
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <Spinner />
    {step && <p className="eyebrow mt-2">{step}</p>}
    <p className="bi-section bi-serif italic text-ag-navy text-2xl md:text-3xl leading-tight tracking-tight">
      {title}
    </p>
    {description && (
      <p className="text-sm text-ag-muted leading-snug max-w-md">{description}</p>
    )}
  </section>
);
ProgressScreen.displayName = "ProgressScreen";
