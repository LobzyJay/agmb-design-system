import * as React from "react";
import { cn } from "@/lib/cn";
import { NumericPrefix } from "./NumericPrefix";

// Anchored chapter wrapper for the design-system docs page.
//
// 2026-05-09 Swiss refinement pass (Müller-Brockmann · Crouwel · Massin):
// the chapter header is now a Swiss specimen row — 1px hairline rule above,
// numeric prefix sitting in the rule line as a structural marker (not
// decorative gold). Below the rule, the bi-script title carries the chapter
// alone. The decorative gold rule is gone; structural ag-border hairline IN.
//
// Carries:
//   - the eyebrow chapter number ("01") — block-level, above the rule
//   - 1px ag-border rule extending the column width
//   - bi-script chapter title (sans + serif halves)
//   - optional intro paragraph
//   - 96px / 48px section padding (desktop / mobile) per task spec

export interface ChapterSectionProps {
  /** Anchor ID (matches sidebar `chapter.id`). */
  id: string;
  /** Two-digit chapter number. */
  number: string;
  /** Bi-script title halves. */
  titleSans: string;
  titleSerif: string;
  /** 1–2 sentence intro paragraph. */
  intro?: React.ReactNode;
  /** (Legacy compat — no-ops in the Swiss pass.) */
  noRule?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  id,
  number,
  titleSans,
  titleSerif,
  intro,
  className,
  children,
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className={cn("scroll-mt-6", className)}
  >
    <div className="px-6 md:px-10 lg:px-14 py-16 md:py-32">
      {/* Swiss specimen header (2026-05-09): numeric eyebrow → 1px hairline →
          bi-script title. The rule is a structural divider extending the
          column width, not a decorative gold accent. */}
      <header className="flex flex-col gap-6 max-w-3xl">
        <div className="flex flex-col gap-3">
          <NumericPrefix number={number} tone="default" />
          <span aria-hidden="true" className="block w-full border-t border-ag-border" />
        </div>
        {/* Brand-engineer pass (2026-05-09): tracking aligned to the
            -0.03em display spec (AGMB_DESIGN_SYSTEM.md
            `font.tracking.display`) so chapter H2s read in the same
            register as the page H1. */}
        <h2
          id={`${id}-title`}
          className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em]"
        >
          <span className="bi-sans">{titleSans}</span>
          {titleSans && titleSerif && " "}
          <span className="bi-serif">{titleSerif}</span>
        </h2>
        {intro && (
          <p className="text-base md:text-lg text-ag-muted leading-relaxed mt-1">
            {intro}
          </p>
        )}
      </header>
      <div className="mt-16 md:mt-24 flex flex-col gap-20 md:gap-32">
        {children}
      </div>
    </div>
  </section>
);
ChapterSection.displayName = "ChapterSection";

// Subsection — anchored heading, bi-section register.
// Swiss refinement: numeric prefix moved out of the title row into a
// structural specimen header — eyebrow above, hairline rule, then h3.
// The h3 carries the subsection alone — typeface contrast does the work.
export interface SubsectionProps {
  id: string;
  /** Numeric prefix (e.g. "01.2"). */
  number?: string;
  titleSans: string;
  titleSerif: string;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Subsection: React.FC<SubsectionProps> = ({
  id,
  number,
  titleSans,
  titleSerif,
  description,
  className,
  children,
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-6", className)}>
    <header className="flex flex-col gap-4 max-w-3xl">
      {number && (
        <div className="flex flex-col gap-2.5">
          <NumericPrefix number={number} tone="default" />
          <span aria-hidden="true" className="block w-full border-t border-ag-border" />
        </div>
      )}
      <h3
        id={`${id}-title`}
        className="bi-section text-ag-navy text-2xl md:text-4xl leading-tight tracking-tight"
      >
        <span className="bi-sans">{titleSans}</span>{" "}
        <span className="bi-serif">{titleSerif}</span>
      </h3>
      {description && (
        <p className="text-sm md:text-base text-ag-muted leading-relaxed mt-1">
          {description}
        </p>
      )}
    </header>
    {/* v2 whitespace lift — bumped 8/10 → 10/14 for ~20% more breathing room. */}
    <div className="mt-10 md:mt-14">{children}</div>
  </section>
);
Subsection.displayName = "DesignSubsection";
