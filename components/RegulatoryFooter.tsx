"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { TextDisclaimer } from "./TextDisclaimer";

// AGMB RegulatoryFooter — PRD §4.5 + §11.
// NDPR notice + CBN PMI disclosure + ISO + footer nav.
// Inter 12px, 60% opacity, navy background, 4-column on desktop.
//
// Composes <TextDisclaimer> primitives for the regulatory text rows.
// Outstanding from AGMB_SITE_AUDIT.md §6: head office address + branch list +
// customer-care phone(s) — Adewale to provide before deploy.

export interface FooterLinkGroup {
  title: React.ReactNode;
  links: { label: React.ReactNode; href: string }[];
}

/**
 * Verbatim regulatory disclosure shape.
 * - String / ReactNode form: backwards-compatible flat copy block (legacy).
 * - { eyebrow, body } form: category-tagged for legibility — adds a 1-word
 *   uppercase eyebrow above each disclosure (REGULATORY / DEPOSIT INSURANCE
 *   / PRIVACY / QUALITY / SECURITY). Reference: ACI Worldwide footer pattern.
 */
export type RegulatoryDisclosure =
  | React.ReactNode
  | { eyebrow: React.ReactNode; body: React.ReactNode };

export interface RegulatoryFooterProps {
  /** 4-column footer nav. PRD §11 typical structure: Products / About / Resources / Legal. */
  groups: FooterLinkGroup[];
  /** Verbatim regulatory disclosures — sourced from AGMB_COPY_LIBRARY.md §4.10. */
  disclosures: RegulatoryDisclosure[];
  /** Contact lines (email, WhatsApp, branch summary). */
  contact?: React.ReactNode;
  /** Social icon row. */
  social?: React.ReactNode;
  /** Logo / wordmark (vector preferred — currently PNG per audit). */
  logo?: React.ReactNode;
  /** Copyright year — defaults to current. */
  year?: number;
  className?: string;
}

// Type guard — narrows the disclosure to the eyebrow-tagged form. Anything
// React-renderable that isn't a plain object with both keys passes through as
// a flat ReactNode. This keeps the API additive: existing callers passing
// ReactNode[] continue to render exactly as before.
function isTaggedDisclosure(
  d: RegulatoryDisclosure,
): d is { eyebrow: React.ReactNode; body: React.ReactNode } {
  return (
    typeof d === "object" &&
    d !== null &&
    !React.isValidElement(d) &&
    "eyebrow" in (d as Record<string, unknown>) &&
    "body" in (d as Record<string, unknown>)
  );
}

// Dual-blue composition (Adewale 2026-05-09 v3): the footer is the
// canonical "deep navy bg + electric blue plate" surface. Outer wrapper sits on
// `pair.surface.deep` (navy.deep); the bottom copyright strip lifts to
// `pair.surface.dual-blue` (navy.vivid) to land the new signature register.
export const RegulatoryFooter: React.FC<RegulatoryFooterProps> = ({
  groups,
  disclosures,
  contact,
  social,
  logo,
  year = new Date().getFullYear(),
  className,
}) => (
  <footer
    data-pair="surface-deep"
    className={cn(
      "bg-ag-navy-deep text-ag-cream",
      className,
    )}
  >
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col gap-12">
      {/* Top row — logo + contact */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-md">
          {logo}
          {contact && <div className="text-sm leading-relaxed text-ag-cream/80">{contact}</div>}
          {social && <div className="flex items-center gap-3 mt-2">{social}</div>}
        </div>

        {/* 4-column nav */}
        <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:flex-1 md:max-w-3xl">
          {groups.map((group, i) => (
            <div key={i} className="flex flex-col gap-3">
              <p className="eyebrow !text-ag-cream-warm">{group.title}</p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm text-ag-cream/80 hover:text-ag-cream underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy-vivid focus-visible:ring-offset-2 focus-visible:ring-offset-ag-navy-deep rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Disclosure block — verbatim regulatory text.
          Two render modes:
          - Tagged ({ eyebrow, body }): grouped with a gold uppercase eyebrow.
            Reference: ACI Worldwide. Lifts a wall-of-text into 5 scannable
            blocks for a regulated PMI's compliance copy.
          - Flat ReactNode: legacy path, single TextDisclaimer per item. */}
      <div className="flex flex-col gap-5 max-w-4xl">
        {disclosures.map((d, i) =>
          isTaggedDisclosure(d) ? (
            <div key={i} className="flex flex-col gap-1.5">
              <p className="eyebrow !text-ag-cream-warm/80">{d.eyebrow}</p>
              <TextDisclaimer inverse>{d.body}</TextDisclaimer>
            </div>
          ) : (
            <TextDisclaimer key={i} inverse>{d}</TextDisclaimer>
          ),
        )}
      </div>
    </div>

    {/* Bottom strip — pair.surface.dual-blue (navy.vivid plate on navy.deep bg).
        The signature dual-blue moment in the footer: regulatory copy reads
        institutional, but the colour pop is electric blue inside the locked
        navy family — gold demoted out of this strip per v3. */}
    <div data-pair="surface-dual-blue" className="bg-ag-navy-vivid text-ag-cream-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p>© {year} AG Mortgage Bank Plc. All rights reserved.</p>
        <p className="numeric">CBN-licensed PMI · RC No. 471634 · NDIC-insured</p>
      </div>
    </div>
  </footer>
);
RegulatoryFooter.displayName = "RegulatoryFooter";
