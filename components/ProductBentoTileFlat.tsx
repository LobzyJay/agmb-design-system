"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ProductBentoTileFlat — Direction B candidate.
//
// Register: Swiss data tiles · flat · structured · financial-instrument register.
// Müller-Brockmann grid discipline. Bloomberg Terminal x Mercury: precise, dense.
//
// NO shadows. NO rounded corners on hero/wide (rounded-sm only — 2px).
// Hairline 1px borders only (navy.vivid at low alpha for separation).
// Navy.vivid icon accents. Inter Tight tabular figures for numerics.
// Structured data list (dataRows prop) replaces prose descriptions.
//
// Hero variant:  cream surface, sharp edges (rounded-sm), 1px navy.vivid hairline,
//                small navy.vivid icon top-left, eyebrow + title + 3-row data list.
//
// Mid variant:   white surface, sharp edges, 1px navy.vivid border, Inter Tight
//                tabular figures for 3-line data list — Bloomberg terminal card.
//                No description prose, no icon — pure data structure.
//
// Wide variant:  navy.deep card, sharp edges, cream typography, structured
//                horizontal data row, CTA on the right.
//
// Layout: uniform 4-col grid — hero col-span-2, mid × 4 each col-span-1,
//         wide col-span-4. Supplied by consuming page / specimen.
//
// Motion: transition-token-base on hover only (border-color flip + subtle
//         translateY). No lift shadow — flat register. Respects
//         prefers-reduced-motion.
//
// Gold rule: no gold at all. Direction B is a full gold-free register —
//            the institutional clarity is the identity signal, not warmth.

export type ProductBentoTileFlatVariant = "hero" | "mid" | "wide";
export type ProductBentoTileFlatTier = "flagship" | "secondary";

export interface ProductBentoTileFlatProps {
  variant: ProductBentoTileFlatVariant;
  tier?: ProductBentoTileFlatTier;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  href?: string;
  ctaLabel?: React.ReactNode;
  className?: string;
  /** Direction B specific — replaces prose description with structured data rows. */
  dataRows?: Array<{ label: string; value: string }>;
}

// Hairline rule separating data rows. The visual grid is made of 1px rules,
// not padding or background tints.
const DataRow: React.FC<{ label: string; value: string; last?: boolean }> = ({
  label,
  value,
  last,
}) => (
  <div
    className={cn(
      "flex items-baseline justify-between gap-4 py-2",
      !last && "border-b border-ag-navy-vivid/12",
    )}
  >
    <span className="text-ag-muted text-xs uppercase tracking-[0.07em]" style={{ fontFamily: "var(--font-sans)" }}>
      {label}
    </span>
    <span
      className="numeric text-ag-navy text-sm font-medium tabular-nums"
      style={{ fontFamily: "var(--font-numeric)", fontVariantNumeric: "tabular-nums" }}
    >
      {value}
    </span>
  </div>
);

// Default data set used when variant=hero and no dataRows prop is passed.
const DEFAULT_HERO_ROWS: Array<{ label: string; value: string }> = [
  { label: "Indicative rate", value: "6.0% p.a." },
  { label: "Term",            value: "Up to 30 yrs" },
  { label: "Eligibility",    value: "NHF members" },
];

const DEFAULT_MID_ROWS: Array<{ label: string; value: string }> = [
  { label: "Rate",      value: "9.5% p.a." },
  { label: "Term",      value: "20 yrs max" },
  { label: "Min. loan", value: "₦5,000,000" },
];

const DEFAULT_WIDE_ROWS: Array<{ label: string; value: string }> = [
  { label: "Duration",  value: "30 min" },
  { label: "Channel",   value: "In-person · Phone" },
  { label: "Fee",       value: "₦0" },
];

export const ProductBentoTileFlat: React.FC<ProductBentoTileFlatProps> = ({
  variant,
  tier = "flagship",
  eyebrow,
  title,
  description,
  icon,
  href,
  ctaLabel = "Learn more →",
  className,
  dataRows,
}) => {
  const Tag: React.ElementType = href ? "a" : "article";

  // ── Hero ──────────────────────────────────────────────────────────────────
  if (variant === "hero") {
    const rows = dataRows ?? DEFAULT_HERO_ROWS;
    return (
      <Tag
        href={href}
        className={cn(
          "group relative bg-ag-cream rounded-sm",
          "border border-ag-navy-vivid/20",
          "flex flex-col gap-0",
          "p-7 md:p-8",
          "transition-token-base",
          href && "hover:border-ag-navy-vivid",
          className,
        )}
        data-variant="hero"
        data-tier={tier}
      >
        {/* Icon — navy.vivid, 24px, top-left */}
        {icon && (
          <span className="text-ag-navy-vivid w-6 h-6 inline-flex items-center justify-center mb-5">
            {icon}
          </span>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            className="text-ag-navy-vivid text-[10px] uppercase tracking-[0.12em] mb-2 font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <h3
          className="text-ag-navy text-xl md:text-2xl font-semibold leading-snug tracking-tight mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </h3>

        {/* Structured data list */}
        <div className="border-t border-ag-navy-vivid/20 mt-auto">
          {rows.map((row, i) => (
            <DataRow key={row.label} label={row.label} value={row.value} last={i === rows.length - 1} />
          ))}
        </div>

        {href && (
          <div className="mt-5 pt-4 border-t border-ag-navy-vivid/12">
            <span
              className="text-ag-navy-vivid text-xs font-semibold uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {ctaLabel}
            </span>
          </div>
        )}
      </Tag>
    );
  }

  // ── Wide ──────────────────────────────────────────────────────────────────
  if (variant === "wide") {
    const rows = dataRows ?? DEFAULT_WIDE_ROWS;
    return (
      <Tag
        href={href}
        className={cn(
          "group relative bg-ag-navy-deep rounded-sm",
          "border border-ag-navy-vivid/30",
          "flex flex-col md:flex-row md:items-center gap-6 md:gap-0",
          "p-7 md:p-8",
          "transition-token-base",
          href && "hover:border-ag-navy-vivid",
          className,
        )}
        data-surface="dark"
        data-variant="wide"
        data-tier={tier}
      >
        {/* Left — label block */}
        <div className="flex-1 min-w-0 pr-0 md:pr-12 md:border-r md:border-ag-navy-vivid/30">
          {eyebrow && (
            <p
              className="text-ag-cream/50 text-[10px] uppercase tracking-[0.12em] mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {eyebrow}
            </p>
          )}
          <h3
            className="text-ag-cream text-xl md:text-2xl font-semibold leading-snug tracking-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h3>
          {description && (
            <p className="text-ag-cream/60 mt-2 text-sm leading-relaxed">{description}</p>
          )}
        </div>

        {/* Right — data grid + CTA */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 md:pl-12 md:flex-1">
          {/* Data rows — horizontal on wide, stacked on narrow */}
          <div className="flex flex-col md:flex-row md:divide-x md:divide-ag-navy-vivid/30 md:gap-0 gap-3 flex-1">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col items-start md:items-center md:px-8 first:md:pl-0 last:md:pr-0">
                <span
                  className="text-ag-cream/50 text-[9px] uppercase tracking-[0.12em] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {row.label}
                </span>
                <span
                  className="numeric text-ag-cream text-sm font-medium tabular-nums"
                  style={{ fontFamily: "var(--font-numeric)", fontVariantNumeric: "tabular-nums" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          {href && (
            <div className="shrink-0 md:pl-8">
              <span
                className="text-ag-cream-warm text-xs font-semibold uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {ctaLabel}
              </span>
            </div>
          )}
        </div>
      </Tag>
    );
  }

  // ── Mid ───────────────────────────────────────────────────────────────────
  const rows = dataRows ?? DEFAULT_MID_ROWS;
  return (
    <Tag
      href={href}
      className={cn(
        "group relative bg-ag-white rounded-sm",
        "border border-ag-navy-vivid/20",
        "flex flex-col gap-0",
        "p-6 md:p-7",
        "transition-token-base",
        href && "hover:border-ag-navy-vivid",
        className,
      )}
      data-variant="mid"
      data-tier={tier}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <p
          className="text-ag-navy-vivid text-[10px] uppercase tracking-[0.12em] mb-2 font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {eyebrow}
        </p>
      )}

      {/* Title — sans only in Direction B, no bi-serif mixing */}
      <h4
        className="text-ag-navy text-base md:text-lg font-semibold leading-snug tracking-tight mb-5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {title}
      </h4>

      {/* Structured data list — the semantic substance */}
      <div className="border-t border-ag-navy-vivid/12 mt-auto">
        {rows.map((row, i) => (
          <DataRow key={row.label} label={row.label} value={row.value} last={i === rows.length - 1} />
        ))}
      </div>

      {href && (
        <div className="mt-4 pt-3 border-t border-ag-navy-vivid/12">
          <span
            className="text-ag-navy-vivid text-xs font-semibold uppercase tracking-[0.08em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {ctaLabel}
          </span>
        </div>
      )}
    </Tag>
  );
};
ProductBentoTileFlat.displayName = "ProductBentoTileFlat";
