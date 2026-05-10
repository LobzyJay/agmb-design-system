"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB TextFact — Wise pattern (PRD §4.5).
// Type-led editorial fact. Eyebrow + headline-scale numeric/serif + optional
// source/context line. Used for the M-REIF first-mover / ₦2.8B / 97 families
// moments inside §07 HighlightTrust + §03 stats supporting context.
//
// Anatomy:
//   ESTABLISHED · CBN-REGULATED  ← eyebrow (Inter 11px gold uppercase)
//   ₦2.8B (or "97 Nigerian")     ← value (numeric XL OR serif Display)
//   Disbursed in the past year   ← context (Inter, ag-muted)
//   ──────                       ← optional gold rule below

export type TextFactValueStyle = "numeric" | "serif";
export type TextFactSize = "xl" | "m";

export interface TextFactProps {
  eyebrow?: React.ReactNode;
  value: React.ReactNode;
  context?: React.ReactNode;
  /** numeric → Geist Mono; serif → Libre Baskerville italic. */
  valueStyle?: TextFactValueStyle;
  size?: TextFactSize;
  /** Optional 1px gold rule below the block. */
  rule?: boolean;
  inverse?: boolean;
  className?: string;
}

const SIZE_CLASS: Record<TextFactSize, string> = {
  xl: "text-4xl md:text-5xl leading-none",
  m:  "text-2xl md:text-3xl leading-tight",
};

export const TextFact: React.FC<TextFactProps> = ({
  eyebrow,
  value,
  context,
  valueStyle = "numeric",
  size = "xl",
  rule = false,
  inverse = false,
  className,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {eyebrow && (
      <p className={cn(
        "eyebrow",
        inverse && "!text-ag-gold",
      )}>
        {eyebrow}
      </p>
    )}
    <p
      className={cn(
        "tracking-tight font-medium",
        SIZE_CLASS[size],
        valueStyle === "numeric" ? "numeric" : "bi-serif italic",
        inverse ? "text-ag-cream" : "text-ag-navy",
      )}
    >
      {value}
    </p>
    {context && (
      <p className={cn(
        "text-sm leading-snug",
        inverse ? "text-ag-cream/70" : "text-ag-muted",
      )}>
        {context}
      </p>
    )}
    {rule && <span className="block h-px w-12 bg-ag-gold mt-1" aria-hidden="true" />}
  </div>
);
TextFact.displayName = "TextFact";
