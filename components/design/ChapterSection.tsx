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
//
// 2026-05-10 — optional `collapsible` mode for long text-heavy subsections
// (Voice / Vocabulary / Grammar). Header stays visible always so the page
// structure is scannable from any scroll position; the body collapses to
// just the header until the user clicks to expand. Uses the
// grid-template-rows trick — CSS-only animation, no Framer Motion, safe
// next to GSAP-using ScrollProgressPath on the same page.
export interface SubsectionProps {
  id: string;
  /** Numeric prefix (e.g. "01.2"). */
  number?: string;
  titleSans: string;
  titleSerif: string;
  description?: React.ReactNode;
  /** When true, the body block becomes collapsible behind the header. */
  collapsible?: boolean;
  /** When `collapsible`, start collapsed. Default: false (open by default). */
  defaultCollapsed?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Inline chevron for the collapsible header — kept tiny so it doesn't
// compete with the bi-script title typographically.
const SectionChevron: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M4 7l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Subsection: React.FC<SubsectionProps> = ({
  id,
  number,
  titleSans,
  titleSerif,
  description,
  collapsible = false,
  defaultCollapsed = false,
  className,
  children,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const isOpen = !collapsed;
  const bodyId = `${id}-body`;

  // Non-collapsible path — original behaviour, unchanged.
  if (!collapsible) {
    return (
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
  }

  // Collapsible path — header becomes a button that toggles the body.
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-6", className)}>
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        className={cn(
          "w-full text-left group cursor-pointer max-w-3xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-4 focus-visible:ring-offset-ag-white rounded-sm",
        )}
      >
        <header className="flex flex-col gap-4">
          {number && (
            <div className="flex flex-col gap-2.5">
              <NumericPrefix number={number} tone="default" />
              <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            </div>
          )}
          <div className="flex items-start justify-between gap-6">
            <h3
              id={`${id}-title`}
              className="bi-section text-ag-navy text-2xl md:text-4xl leading-tight tracking-tight"
            >
              <span className="bi-sans">{titleSans}</span>{" "}
              <span className="bi-serif">{titleSerif}</span>
            </h3>
            <SectionChevron
              className={cn(
                "shrink-0 mt-3 md:mt-5 text-ag-muted transition-token",
                "group-hover:text-ag-navy",
                isOpen && "rotate-180 text-ag-navy",
              )}
            />
          </div>
          {description && (
            <p className="text-sm md:text-base text-ag-muted leading-relaxed mt-1">
              {description}
            </p>
          )}
        </header>
      </button>

      {/* Body — collapses via grid-template-rows trick. The mt-10/md:mt-14
          spacer lives inside the collapse so it disappears with the body. */}
      <div
        id={bodyId}
        role="region"
        aria-labelledby={`${id}-title`}
        style={{
          transition: "grid-template-rows var(--motion-duration-fast) var(--motion-ease-default)",
        }}
        className={cn("grid", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div className="mt-10 md:mt-14">{children}</div>
        </div>
      </div>
    </section>
  );
};
Subsection.displayName = "DesignSubsection";
