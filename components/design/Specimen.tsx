import * as React from "react";
import { cn } from "@/lib/cn";

// Wraps a single primitive specimen for the design-system docs.
//
// 2026-05-09 Swiss refinement pass:
// blocks of information are separated by 1px ag-border hairline rules,
// not paragraph spacing or background-tint banding. Each labelled block
// (Anatomy / Live / States / Variants / Code / Anti-pattern) is a discrete
// rectangle with an eyebrow + count above and a hairline rule below it.
// This is the Müller-Brockmann specimen pattern — structural rules over
// decorative cards.
//
// Anatomy:
//   ┌──────────────────────────────────────────────────────────┐
//   │ ComponentName                            Storybook ↗     │  ← title bar
//   │ One-sentence description.                                 │
//   ├──────────────────────────────────────────────────────────┤
//   │ ANATOMY              ← eyebrow + hairline                │
//   │ [diagram]                                                 │
//   ├──────────────────────────────────────────────────────────┤
//   │ LIVE                                                      │
//   │ [rendered primitive]                                      │
//   ├──────────────────────────────────────────────────────────┤
//   │ STATE MATRIX                                              │
//   │ [grid]                                                    │
//   └──────────────────────────────────────────────────────────┘

export interface SpecimenProps {
  /** Anchor ID for the sidebar (e.g. "primitive-button"). */
  id?: string;
  /** Component name as it appears in source (e.g. "Button"). */
  name: string;
  /** 1–2 sentence summary. */
  summary?: React.ReactNode;
  /** Heading level — defaults to h4. */
  headingLevel?: 3 | 4;
  /** Storybook story path (e.g. "primitives-button--primary"). */
  storybookId?: string;
  /** ASCII / styled-box anatomy diagram. */
  anatomy?: React.ReactNode;
  /** Primary live render. Always shown. */
  children: React.ReactNode;
  /** Optional 7-state matrix grid. */
  stateMatrix?: React.ReactNode;
  /** Override the state-matrix block label. Defaults to "7-state matrix · PRD §4.4". */
  stateMatrixLabel?: string;
  /** Optional variant grid. */
  variants?: React.ReactNode;
  /** Optional usage code snippet (use <CodeBlock>). */
  code?: React.ReactNode;
  /** Optional anti-pattern callout (rendered with red rule). */
  antiPattern?: React.ReactNode;
  className?: string;
}

// SpecimenBlock — internal helper. Each labelled block in the specimen
// (Anatomy / Live / States / Variants / Code / Anti-pattern) is a discrete
// rectangle separated by a 1px hairline rule from the next.
const SpecimenBlock: React.FC<{
  label?: string;
  children: React.ReactNode;
  /** Drop the top border — used on the first block after the title bar. */
  noTopRule?: boolean;
  className?: string;
}> = ({ label, children, noTopRule, className }) => (
  <div
    className={cn(
      "px-6 py-8",
      !noTopRule && "border-t border-ag-border",
      className,
    )}
  >
    {label && <p className="eyebrow mb-4">{label}</p>}
    {children}
  </div>
);

export const Specimen: React.FC<SpecimenProps> = ({
  id,
  name,
  summary,
  headingLevel = 4,
  storybookId,
  anatomy,
  children,
  stateMatrix,
  stateMatrixLabel = "7-state matrix · PRD §4.4",
  variants,
  code,
  antiPattern,
  className,
}) => {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <article
      id={id}
      className={cn(
        // Swiss refinement: specimens sit on pure white surface — no card
        // shadow. The 1px ag-border outer + structural hairline rules inside
        // make the block. Title bar uses the same surface as the body —
        // the rule does the dividing, not background tint.
        "scroll-mt-6 bg-ag-white border border-ag-border rounded-lg overflow-hidden",
        className,
      )}
      data-specimen={name}
    >
      {/* Title bar */}
      <header className="px-6 py-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <Heading className="bi-section text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">{name}</span>
          </Heading>
          {summary && (
            <p className="text-sm text-ag-muted leading-snug truncate hidden md:block">
              {typeof summary === "string" ? summary : null}
            </p>
          )}
        </div>
        {storybookId && (
          <a
            href={`http://localhost:6006/?path=/story/${storybookId}`}
            target="_blank"
            rel="noreferrer"
            className="numeric text-[11px] uppercase tracking-[0.08em] text-ag-gold hover:text-ag-navy transition-token shrink-0 focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            Storybook ↗
          </a>
        )}
      </header>

      {/* Mobile-visible summary (header truncates on md+) */}
      {summary && (
        <p className="md:hidden px-6 pb-4 text-sm text-ag-muted leading-snug">{summary}</p>
      )}

      {/* Anatomy — first block, hairline rule above (separates from title bar). */}
      {anatomy && (
        <SpecimenBlock label="Anatomy">
          <pre className="text-[11.5px] leading-relaxed text-ag-muted bg-surface-light-2 border border-ag-border rounded p-4 overflow-x-auto numeric tracking-[0.01em] whitespace-pre">{anatomy}</pre>
        </SpecimenBlock>
      )}

      {/* Live render */}
      <SpecimenBlock label="Live" noTopRule={!anatomy}>
        {summary && !anatomy && (
          <p className="hidden md:block text-sm text-ag-muted leading-snug mb-6 -mt-2">{summary}</p>
        )}
        <div className="rounded-md bg-surface-light-2 border border-dashed border-ag-border p-8">
          {children}
        </div>
      </SpecimenBlock>

      {/* State matrix */}
      {stateMatrix && (
        <SpecimenBlock label={stateMatrixLabel}>
          <div className="rounded-md bg-surface-light-2 border border-dashed border-ag-border p-8">
            {stateMatrix}
          </div>
        </SpecimenBlock>
      )}

      {/* Variants */}
      {variants && (
        <SpecimenBlock label="Variants">
          <div className="rounded-md bg-surface-light-2 border border-dashed border-ag-border p-8">
            {variants}
          </div>
        </SpecimenBlock>
      )}

      {/* Code */}
      {code && (
        <SpecimenBlock label="Usage">
          {code}
        </SpecimenBlock>
      )}

      {/* Anti-pattern — red rule preserved for semantic urgency. */}
      {antiPattern && (
        <SpecimenBlock>
          <div className="border-l-2 border-ag-red bg-ag-red/5 px-4 py-4 rounded-r">
            <p className="eyebrow !text-ag-red mb-1">Don&rsquo;t</p>
            <div className="text-sm text-ag-text leading-snug">{antiPattern}</div>
          </div>
        </SpecimenBlock>
      )}
    </article>
  );
};
Specimen.displayName = "Specimen";

// Helper — renders a labelled cell inside a state matrix grid.
export const StateCell: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({
  label,
  children,
  className,
}) => (
  <div className={cn("flex flex-col items-start gap-2 min-w-0", className)}>
    <div className="w-full flex items-center justify-center min-h-[3rem]">{children}</div>
    <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/80">{label}</span>
  </div>
);
StateCell.displayName = "StateCell";
