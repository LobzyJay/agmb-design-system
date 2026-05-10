import * as React from "react";
import { cn } from "@/lib/cn";

// NumericPrefix — Swiss specimen pattern (Müller-Brockmann · Crouwel lineage).
//
// A single primitive for every numeric marker on the /design page:
// chapter ("01"), subsection ("01.2"), specimen counter, list-row index.
// Always Inter Tight, tabular figures, weight 500 (Geist Mono dropped 2026-05-09).
//
// Two modes:
//   - inline (default false) — block-level eyebrow above a hairline rule;
//     used as a Swiss specimen prefix on a section header row.
//   - inline=true            — sits inside a heading, scaled to 0.55em of
//     the parent so it visually attaches to the title without dominating.
//
// Two tones:
//   - "muted"   (default) — ag-muted at 60% opacity. Quiet specimen number.
//   - "default"           — full ag-muted, used when the number IS the focus
//                           (e.g. table-of-contents row).
//
// PRD §4.0 / §7 clearance:
//   - No raw colour: routes through --color-text-muted (ag-muted).
//   - No raw font stack: uses .numeric utility (--font-numeric + tnum + 500).
//   - No emoji, no decorative gold rule: this is a structural marker.

export interface NumericPrefixProps {
  /** Two-digit (e.g. "01") or dotted (e.g. "01.2") numeric marker. */
  number: string;
  /** Inline-with-heading mode — scales to 0.55em + middle-aligns. */
  inline?: boolean;
  /** Tone — "muted" (60% opacity) or "default" (full). */
  tone?: "muted" | "default";
  /** Optional aria-label override; defaults to descriptive prefix. */
  ariaLabel?: string;
  className?: string;
}

export const NumericPrefix: React.FC<NumericPrefixProps> = ({
  number,
  inline = false,
  tone = "muted",
  ariaLabel,
  className,
}) => {
  const toneClass = tone === "muted" ? "text-ag-muted/60" : "text-ag-muted";

  if (inline) {
    return (
      <span
        className={cn(
          "numeric align-middle mr-3 md:mr-4 font-normal text-[0.55em]",
          toneClass,
          className,
        )}
        aria-label={ariaLabel ?? `Section ${number}`}
      >
        {number}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "numeric block text-[10.5px] uppercase tracking-[0.08em]",
        toneClass,
        className,
      )}
      aria-label={ariaLabel ?? `Section ${number}`}
    >
      {number}
    </span>
  );
};
NumericPrefix.displayName = "NumericPrefix";
