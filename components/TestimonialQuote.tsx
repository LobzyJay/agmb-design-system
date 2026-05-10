"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB TestimonialQuote — PRD §4.5 + §3.3 / §08 hero pull-quote.
// Libre Baskerville 36–48px on cream, no quotation-mark glyph (per PRD §3.3 —
// uses a gold vertical hairline as separator between quote and attribution).
// Attribution: Inter 14px small-caps.

export interface TestimonialQuoteProps {
  /** The quote — kept regular Roman; PRD §3.3 reserves italic for editorial moments. */
  quote: React.ReactNode;
  /** First-name + last-initial only per PRD §3.3 NDPR-safe rule. */
  attribution: React.ReactNode;
  /** Location (city / state). */
  location?: React.ReactNode;
  /** Product taken (e.g. "NHF Mortgage"). */
  product?: React.ReactNode;
  /** Inverse for navy backgrounds. */
  inverse?: boolean;
  className?: string;
}

export const TestimonialQuote: React.FC<TestimonialQuoteProps> = ({
  quote,
  attribution,
  location,
  product,
  inverse = false,
  className,
}) => (
  <figure className={cn("flex flex-col gap-6", className)}>
    <blockquote
      className={cn(
        "bi-display bi-serif text-3xl md:text-5xl leading-tight tracking-tight",
        inverse ? "text-ag-cream" : "text-ag-navy",
      )}
    >
      {quote}
    </blockquote>
    <figcaption className="flex items-center gap-3 text-sm">
      <span aria-hidden="true" className="block h-6 w-px bg-ag-gold" />
      <span
        className={cn(
          "uppercase tracking-[0.08em] font-semibold text-xs",
          inverse ? "text-ag-cream/80" : "text-ag-text",
        )}
      >
        {attribution}
        {location && <span className={cn(inverse ? "text-ag-cream/60" : "text-ag-muted", " font-normal normal-case ml-2")}>· {location}</span>}
        {product && <span className={cn(inverse ? "text-ag-cream/60" : "text-ag-muted", " font-normal normal-case ml-2")}>· {product}</span>}
      </span>
    </figcaption>
  </figure>
);
TestimonialQuote.displayName = "TestimonialQuote";
