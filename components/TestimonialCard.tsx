"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB TestimonialCard — PRD §4.5 + §3.3 / §08 carousel card.
// First-name + last-initial only (NDPR-safe), location, product taken,
// 1-sentence outcome, environmental portrait at 64px circular crop.
//
// Used in §08 horizontal carousel beneath the hero pull-quote.

export interface TestimonialCardProps {
  /** Cropped circular portrait — 64px in spec. Pass src or full element. */
  portraitSrc?: string;
  portraitAlt?: string;
  /** First-name + last-initial only. */
  attribution: React.ReactNode;
  location: React.ReactNode;
  product: React.ReactNode;
  /** 1-sentence outcome. */
  outcome: React.ReactNode;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  portraitSrc,
  portraitAlt,
  attribution,
  location,
  product,
  outcome,
  className,
}) => (
  <article
    className={cn(
      "flex flex-col gap-4 bg-ag-white border border-ag-border rounded-card p-5 w-72 md:w-80 shrink-0",
      // v2 surface-flatness pass (Adewale 2026-05-09): default flat, elevation on hover only.
      "hover-lift hover:shadow-soft-1 hover:border-ag-text",
      className,
    )}
  >
    <header className="flex items-center gap-3">
      {portraitSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={portraitSrc}
          alt={portraitAlt ?? ""}
          className="w-16 h-16 rounded-full object-cover bg-ag-light shrink-0"
          width={64}
          height={64}
        />
      ) : (
        <span
          className="w-16 h-16 rounded-full bg-ag-cream border border-ag-border shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ag-text leading-tight">{attribution}</p>
        <p className="text-xs text-ag-muted leading-tight mt-0.5">{location}</p>
      </div>
    </header>
    <p className="text-sm leading-snug text-ag-text">{outcome}</p>
    <p className="eyebrow !text-ag-gold mt-auto">{product}</p>
  </article>
);
TestimonialCard.displayName = "TestimonialCard";
