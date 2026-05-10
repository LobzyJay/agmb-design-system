"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB TextDisclaimer — Wise pattern (PRD §4.5).
// Regulatory-tone copy block. Inter 12–13px, muted colour, optional gold left rule.
// Used in: §05 calculator indicative-rate notice, §11 footer regulatory disclosures,
// Utility 3 wizard BVN/NIN privacy reassurance, NDPR consent context.

export interface TextDisclaimerProps {
  children: React.ReactNode;
  /** Decorative gold rule on the left edge — used in calculator + wizard contexts. */
  rule?: boolean;
  /** Inverse for navy backgrounds. */
  inverse?: boolean;
  /** Compact — drops bottom margin and rule, used inline in dense forms. */
  compact?: boolean;
  className?: string;
}

export const TextDisclaimer: React.FC<TextDisclaimerProps> = ({
  children,
  rule = false,
  inverse = false,
  compact = false,
  className,
}) => (
  <p
    className={cn(
      "text-xs leading-snug",
      compact ? "" : "text-[13px]",
      inverse ? "text-ag-cream/70" : "text-ag-muted",
      rule && "border-l-2 border-ag-gold pl-3",
      className,
    )}
  >
    {children}
  </p>
);
TextDisclaimer.displayName = "TextDisclaimer";
