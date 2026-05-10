"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB CriticalBanner — Wise primitive (PRD §4.5).
// Page-level critical state. Red left rule, dismissible.
// Used for: enquiry submission failure, NDPR consent missing, network error,
// session-expired wizard recovery prompts.
//
// Anatomy:
//   ▌Submission failed  Try again or use WhatsApp fallback.        [✕]
//
// The CriticalBanner is page-scoped — sits above the affected surface, not
// inside a form field (use <InlinePrompt intent="error"> for that).

export type CriticalBannerIntent = "error" | "warning";

export interface CriticalBannerProps {
  intent?: CriticalBannerIntent;
  title?: React.ReactNode;
  children: React.ReactNode;
  /** Optional action — typically a retry button. */
  action?: React.ReactNode;
  /** When provided, the banner becomes dismissible. */
  onDismiss?: () => void;
  className?: string;
}

const INTENT_VISUALS: Record<CriticalBannerIntent, { rule: string; bg: string; text: string; titleText: string }> = {
  error: {
    rule: "border-l-4 border-ag-red",
    bg: "bg-ag-red/5",
    text: "text-ag-text",
    titleText: "text-ag-red",
  },
  warning: {
    rule: "border-l-4 border-ag-amber",
    bg: "bg-ag-amber/5",
    text: "text-ag-text",
    titleText: "text-ag-amber",
  },
};

export const CriticalBanner: React.FC<CriticalBannerProps> = ({
  intent = "error",
  title,
  children,
  action,
  onDismiss,
  className,
}) => {
  const v = INTENT_VISUALS[intent];
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex items-start gap-4 p-4 rounded-r-lg",
        v.bg, v.rule, v.text,
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("font-semibold leading-snug mb-1", v.titleText)}>{title}</p>
        )}
        <div className="text-sm leading-snug">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 -m-1 rounded text-ag-muted hover:text-ag-text transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};
CriticalBanner.displayName = "CriticalBanner";
