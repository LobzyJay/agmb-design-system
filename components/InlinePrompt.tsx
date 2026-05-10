"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB InlinePrompt — Wise primitive (PRD §4.5).
// Within-form contextual help. Three intents: info / warning / error.
// Used for: LTV warnings, BVN/NIN format hints, NHF eligibility flags.
//
// Anatomy:
//   ┌────┬───────────────────────────────────────┐
//   │ ⓘ │ Most mortgage products require at      │
//   │    │ least 10% deposit.                    │
//   └────┴───────────────────────────────────────┘
//
// The icon glyph + colour shift across intents. The container is a soft tint
// of the intent colour. No dismiss control — InlinePrompt sits inside the form
// field's helper/error slot and is dismissed by correcting the input.

export type InlinePromptIntent = "info" | "warning" | "error" | "success";

export interface InlinePromptProps {
  intent?: InlinePromptIntent;
  children: React.ReactNode;
  /** Optional title rendered above the body. */
  title?: React.ReactNode;
  /** Optional override for the leading glyph. */
  icon?: React.ReactNode;
  className?: string;
}

const INTENT_VISUALS: Record<InlinePromptIntent, { bg: string; text: string; ring: string; defaultIcon: React.ReactNode }> = {
  info: {
    bg: "bg-ag-light",
    text: "text-ag-text",
    ring: "ring-1 ring-ag-border",
    defaultIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v4M8 5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-ag-amber/10",
    text: "text-ag-amber",
    ring: "ring-1 ring-ag-amber/30",
    defaultIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5l7 12.5H1L8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 6v3.5M8 11.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  error: {
    bg: "bg-ag-red/10",
    text: "text-ag-red",
    ring: "ring-1 ring-ag-red/30",
    defaultIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  success: {
    bg: "bg-ag-green/10",
    text: "text-ag-green",
    ring: "ring-1 ring-ag-green/30",
    defaultIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2.5 2.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const InlinePrompt: React.FC<InlinePromptProps> = ({
  intent = "info",
  title,
  icon,
  children,
  className,
}) => {
  const v = INTENT_VISUALS[intent];
  return (
    <div
      role={intent === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2.5 px-3 py-2.5 rounded-md text-sm",
        v.bg, v.text, v.ring,
        className,
      )}
    >
      <span className="shrink-0 mt-0.5">{icon ?? v.defaultIcon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold leading-snug mb-0.5">{title}</p>}
        <div className="leading-snug">{children}</div>
      </div>
    </div>
  );
};
InlinePrompt.displayName = "InlinePrompt";
