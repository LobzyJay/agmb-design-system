"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// Footnote — Stripe + ACI citation pattern, AGMB register.
//
// Used to anchor any unverified or substantiated claim (₦2.8B disbursed,
// CBN licence number, ISO 9001:2015 cert, 97 families, M-REIF first-mover)
// to a numbered source line at the foot of the chapter / section / page.
//
// Pattern:
//
//   <p>
//     ₦2.8B disbursed
//     <Footnote n={1} />
//     to 97 Nigerian families
//     <Footnote n={2} />.
//   </p>
//   …later in the same section / chapter…
//   <FootnoteList items={[
//     { n: 1, source: "AGMB internal disbursement ledger, FY2025." },
//     { n: 2, source: "AGMB customer records, FY2025. NDPR-compliant aggregate." },
//   ]} />
//
// Anatomy:
//   - Footnote: <sup> superscript marker, Geist Mono, 0.65em scale,
//     ag-gold colour at default, navy on hover. Anchor links to
//     `#footnote-{id}-{n}` so keyboard + screen-reader navigation works.
//   - FootnoteList: ordered numeric list at the chapter / section foot,
//     hairline rule above, eyebrow label "Sources", muted small copy.
//
// PRD §4 / §7 clearance:
//   - No raw colour: routes via ag-gold + ag-muted.
//   - No raw font stack: uses .numeric utility for the marker.
//   - Word-level safe: <sup> is a discrete element, never splits a word.
//   - Reduced-motion safe: no animation.

export interface FootnoteProps {
  /** Footnote index (1-based). Must match a FootnoteList item below. */
  n: number;
  /** Optional id-prefix when multiple FootnoteList instances share a page. */
  id?: string;
  className?: string;
}

export const Footnote: React.FC<FootnoteProps> = ({ n, id = "src", className }) => (
  <sup className={cn("inline-block", className)}>
    <a
      href={`#footnote-${id}-${n}`}
      id={`footnote-ref-${id}-${n}`}
      aria-label={`See footnote ${n}`}
      className={cn(
        "numeric text-[0.65em] font-medium align-super leading-none ml-[0.15em]",
        "text-ag-gold hover:text-ag-navy transition-token",
        "focus-visible:outline-none focus-visible:underline underline-offset-2",
      )}
    >
      {n}
    </a>
  </sup>
);
Footnote.displayName = "Footnote";

export interface FootnoteItem {
  n: number;
  /** The source / caveat copy. Plain string — no nested HTML. */
  source: React.ReactNode;
}

export interface FootnoteListProps {
  items: FootnoteItem[];
  /** Optional id-prefix when multiple FootnoteLists share a page. */
  id?: string;
  /** Optional eyebrow override — defaults to "Sources". */
  label?: string;
  className?: string;
}

export const FootnoteList: React.FC<FootnoteListProps> = ({
  items,
  id = "src",
  label = "Sources",
  className,
}) => (
  <aside
    aria-label={label}
    className={cn("border-t border-ag-border pt-6 mt-10", className)}
  >
    <p className="eyebrow mb-3">{label}</p>
    <ol className="flex flex-col gap-1.5">
      {items.map((it) => (
        <li
          key={it.n}
          id={`footnote-${id}-${it.n}`}
          className="text-xs text-ag-muted leading-snug flex gap-2 scroll-mt-6"
        >
          <span className="numeric text-ag-gold shrink-0 w-5">{it.n}.</span>
          <span className="min-w-0">
            {it.source}{" "}
            <a
              href={`#footnote-ref-${id}-${it.n}`}
              aria-label={`Back to reference ${it.n}`}
              className="text-ag-muted/60 hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline underline-offset-2"
            >
              ↩
            </a>
          </span>
        </li>
      ))}
    </ol>
  </aside>
);
FootnoteList.displayName = "FootnoteList";
