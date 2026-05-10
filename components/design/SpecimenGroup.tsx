import * as React from "react";
import { cn } from "@/lib/cn";

// SpecimenGroup — Swiss modular block for the /design page.
//
// Replaces free-floating <eyebrow + grid> pairs across Foundations + Brand.
// Each information block sits as a discrete rectangle on the page grid:
//
//   ┌───────────────────────────────────────────────────────┐
//   │ EYEBROW · LABEL                            n items    │  ← title row
//   ├───────────────────────────────────────────────────────┤  ← 1px hairline
//   │                                                       │
//   │ [content — swatch grid, demo block, table, etc.]      │
//   │                                                       │
//   └───────────────────────────────────────────────────────┘  ← 1px hairline
//
// Müller-Brockmann lineage: 1px structural rules divide the information,
// labelled count anchors the block, no decorative gold and no tinted card
// surface. The block is the white page surface bracketed by ag-border rules.

export interface SpecimenGroupProps {
  /** Eyebrow label — e.g. "Surfaces · light scale". */
  label: React.ReactNode;
  /** Optional right-aligned numeric count — e.g. "3 surfaces". */
  count?: React.ReactNode;
  /** Optional sub-description, sits under the title row inside the block. */
  description?: React.ReactNode;
  /** Drop the bottom hairline rule (when stacking groups directly). */
  noBottomRule?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SpecimenGroup: React.FC<SpecimenGroupProps> = ({
  label,
  count,
  description,
  noBottomRule,
  className,
  children,
}) => (
  <section
    className={cn(
      "border-t border-ag-border",
      !noBottomRule && "border-b",
      className,
    )}
  >
    <header className="flex items-baseline justify-between gap-4 py-4">
      <p className="eyebrow">{label}</p>
      {count !== undefined && count !== null && (
        <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">
          {count}
        </p>
      )}
    </header>
    {description && (
      <p className="text-sm text-ag-muted leading-relaxed max-w-3xl pb-5 border-t border-ag-border pt-4">
        {description}
      </p>
    )}
    <div className={cn(description ? "pt-2 pb-8" : "pt-2 pb-8 border-t border-ag-border")}>
      {children}
    </div>
  </section>
);
SpecimenGroup.displayName = "SpecimenGroup";
