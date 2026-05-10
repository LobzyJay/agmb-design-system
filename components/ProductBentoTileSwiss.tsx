"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ProductBentoTileSwiss — Direction B · Swiss data register.
//
// Register: Bloomberg / FT data terminal · flat · no decoration · structured.
// Müller-Brockmann grid discipline applied to mortgage product tiles.
// Every tile leads with data. Prose is secondary. Typography is sans-dominant.
//
// Surface architecture:
//   Hero:  bg-ag-white · border border-ag-border hairline · no shadow at rest ·
//          title in bi-section bi-sans · 3-row metric strip below hairline rule
//   Mid:   bg-ag-white · border border-ag-border · 2-row metric strip ·
//          small → arrow bottom-right as navigation signal
//   Wide:  bg-ag-white · border border-ag-border · horizontal data ribbon ·
//          title-left · 4-metric strip-middle · CTA-right
//
// Grid model: grid-cols-3 gap-px bg-ag-border (the gap IS the divider line).
// Tiles use bg-ag-white to fill, so hairline gaps show through naturally.
// Hero spans col-span-2, mid spans col-span-1 each, wide spans col-span-3.
// The BentoGridSwiss wrapper component is exported from this file.
//
// Hover: bg-ag-light (pale grey shift). No lift. No shadow change.
// Gold rule: NONE. Direction B is gold-free by design — institutional
//            clarity is the identity signal.
//
// Motion: transition-token-base. Respects prefers-reduced-motion.
//
// dataRows prop (Direction B specific): replaces prose descriptions
// with structured metric rows (label · value pairs) in tabular numerics.
// When omitted, variant-specific defaults are applied.
//
// Props: superset of ProductBentoTileProps — drop-in compatible.

export type ProductBentoTileSwissVariant = "hero" | "mid" | "wide";
export type ProductBentoTileSwissTier = "flagship" | "secondary";

export interface ProductBentoTileSwissProps {
  variant: ProductBentoTileSwissVariant;
  tier?: ProductBentoTileSwissTier;
  /** Eyebrow above the title (e.g. "NHF MORTGAGE"). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Not used in Swiss direction — metric rows replace imagery. Accepted for API compatibility. */
  imageSrc?: string;
  imageAlt?: string;
  /** Not used in Swiss direction — arrow signal replaces icons. Accepted for API compatibility. */
  icon?: React.ReactNode;
  /** Link target. Renders the tile as <a>; otherwise <article>. */
  href?: string;
  /** Link label (e.g. "Details →"). */
  ctaLabel?: React.ReactNode;
  className?: string;
  /** Structured metric rows — the primary information carrier in this direction. */
  dataRows?: Array<{ label: string; value: string }>;
}

// ── Metric label + value row ──────────────────────────────────────────────────
// Used inside all three variants. Eyebrow-style label, tabular-nums value.
const MetricRow: React.FC<{ label: string; value: string; isLast?: boolean }> = ({
  label,
  value,
  isLast,
}) => (
  <div
    className={cn(
      "flex items-baseline justify-between gap-4 py-[7px]",
      !isLast && "border-b border-ag-border",
    )}
  >
    <span
      className="text-ag-muted text-[10px] uppercase tracking-[0.08em]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {label}
    </span>
    <span
      className="text-ag-navy text-xs font-semibold tabular-nums"
      style={{ fontFamily: "var(--font-numeric)", fontVariantNumeric: "tabular-nums" }}
    >
      {value}
    </span>
  </div>
);

// ── Horizontal metric cell — used in wide variant ─────────────────────────────
const MetricCell: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-start px-5 first:pl-0 last:pr-0">
    <span
      className="text-ag-muted text-[9px] uppercase tracking-[0.1em] mb-1"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {label}
    </span>
    <span
      className="text-ag-navy text-sm font-semibold tabular-nums"
      style={{ fontFamily: "var(--font-numeric)", fontVariantNumeric: "tabular-nums" }}
    >
      {value}
    </span>
  </div>
);

// ── Default metric sets per product tier ─────────────────────────────────────
// Used when no dataRows prop is provided.
const DEFAULT_HERO_ROWS: Array<{ label: string; value: string }> = [
  { label: "Rate",        value: "6.0% p.a." },
  { label: "Term",        value: "Up to 30 yrs" },
  { label: "Max. loan",   value: "₦15,000,000" },
];

const DEFAULT_MID_ROWS: Array<{ label: string; value: string }> = [
  { label: "Rate",    value: "9.5% p.a." },
  { label: "Term",    value: "20 yrs max" },
];

const DEFAULT_WIDE_ROWS: Array<{ label: string; value: string }> = [
  { label: "Duration",  value: "30 min" },
  { label: "Channel",   value: "In-person" },
  { label: "Booking",   value: "No fee" },
  { label: "Languages", value: "EN · YO · IG" },
];

// Hover state: bg-ag-light (pale grey). No shadow, no lift — flat register.
const HOVER_FLAT = "hover:bg-ag-light cursor-pointer";

export const ProductBentoTileSwiss: React.FC<ProductBentoTileSwissProps> = ({
  variant,
  tier = "flagship",
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "Details →",
  className,
  dataRows,
}) => {
  const Tag: React.ElementType = href ? "a" : "article";

  // ── Hero ───────────────────────────────────────────────────────────────────
  if (variant === "hero") {
    const rows = dataRows ?? DEFAULT_HERO_ROWS;
    return (
      <Tag
        href={href}
        className={cn(
          "group relative bg-ag-white",
          "border border-ag-border",
          "flex flex-col",
          "p-6 md:p-8",
          "transition-token-base",
          href && HOVER_FLAT,
          className,
        )}
        data-variant="hero"
        data-tier={tier}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <p
            className="text-ag-muted text-[10px] uppercase tracking-[0.08em] mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {eyebrow}
          </p>
        )}

        {/* Title — bi-section bi-sans per spec */}
        <h3 className="bi-section bi-sans text-ag-navy text-2xl md:text-3xl font-semibold leading-snug tracking-tight">
          {title}
        </h3>

        {description && (
          <p className="text-ag-muted text-xs mt-2 leading-relaxed max-w-sm">{description}</p>
        )}

        {/* Metric strip — hairline top rule separates copy from data */}
        <div className="border-t border-ag-border mt-5 pt-1 flex-1 flex flex-col justify-end">
          {rows.map((row, i) => (
            <MetricRow
              key={row.label}
              label={row.label}
              value={row.value}
              isLast={i === rows.length - 1}
            />
          ))}
        </div>

        {/* CTA — uppercase tracking, text-ag-navy-vivid, no button treatment */}
        {href && (
          <div className="mt-5 pt-4 border-t border-ag-border flex items-center justify-between">
            <span
              className="text-ag-navy-vivid text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {ctaLabel}
            </span>
            {/* Arrow navigation signal */}
            <span className="text-ag-navy-vivid text-sm" aria-hidden="true">&rarr;</span>
          </div>
        )}
      </Tag>
    );
  }

  // ── Wide ───────────────────────────────────────────────────────────────────
  if (variant === "wide") {
    const rows = dataRows ?? DEFAULT_WIDE_ROWS;
    return (
      <Tag
        href={href}
        className={cn(
          "group relative bg-ag-white",
          "border border-ag-border",
          "flex flex-col md:flex-row md:items-center",
          "p-6 md:p-7",
          "transition-token-base",
          href && HOVER_FLAT,
          className,
        )}
        data-variant="wide"
        data-tier={tier}
      >
        {/* Left — title block with left/right hairline separator */}
        <div className="flex-none md:w-64 pr-0 md:pr-6 mb-4 md:mb-0 md:border-r md:border-ag-border">
          {eyebrow && (
            <p
              className="text-ag-muted text-[10px] uppercase tracking-[0.08em] mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {eyebrow}
            </p>
          )}
          <h3 className="bi-section bi-sans text-ag-navy text-lg md:text-xl font-semibold leading-snug tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-ag-muted text-xs mt-1 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Middle — horizontal metric strip */}
        <div className="flex-1 min-w-0 flex flex-row flex-wrap gap-y-3 md:gap-y-0 divide-x divide-ag-border md:pl-6">
          {rows.map((row) => (
            <MetricCell key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        {/* Right — CTA with left separator */}
        {href && (
          <div className="mt-4 md:mt-0 md:pl-6 md:ml-4 md:border-l md:border-ag-border shrink-0">
            <span
              className="text-ag-navy-vivid text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {ctaLabel}
            </span>
          </div>
        )}
      </Tag>
    );
  }

  // ── Mid ────────────────────────────────────────────────────────────────────
  const rows = dataRows ?? DEFAULT_MID_ROWS;
  return (
    <Tag
      href={href}
      className={cn(
        "group relative bg-ag-white",
        "border border-ag-border",
        "flex flex-col",
        "p-5 md:p-6",
        "transition-token-base",
        href && HOVER_FLAT,
        className,
      )}
      data-variant="mid"
      data-tier={tier}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <p
          className="text-ag-muted text-[10px] uppercase tracking-[0.08em] mb-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {eyebrow}
        </p>
      )}

      {/* Title — sans only in Swiss register */}
      <h4 className="bi-sans text-ag-navy text-sm md:text-base font-semibold leading-snug tracking-tight mb-4">
        {title}
      </h4>

      {/* Metric rows — the semantic substance */}
      <div className="border-t border-ag-border mt-auto">
        {rows.map((row, i) => (
          <MetricRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={i === rows.length - 1}
          />
        ))}
      </div>

      {/* Navigation arrow — bottom-right, as spec'd */}
      {href && (
        <div className="mt-4 flex items-center justify-between border-t border-ag-border pt-3">
          <span
            className="text-ag-navy-vivid text-[9px] font-semibold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {ctaLabel}
          </span>
          <span className="text-ag-navy-vivid text-xs" aria-hidden="true">&rarr;</span>
        </div>
      )}
    </Tag>
  );
};
ProductBentoTileSwiss.displayName = "ProductBentoTileSwiss";

// ── BentoGridSwiss — wrapper ───────────────────────────────────────────────────
// Implements the hairline-divider grid: gap-px, bg-ag-border as the gap fill.
// Tiles set their own bg-ag-white to "push through" the hairline.
// Hero col-span-2, mid col-span-1 each, wide col-span-3.
// Use this wrapper in the specimen and on the product page.
export interface BentoGridSwissProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGridSwiss: React.FC<BentoGridSwissProps> = ({ children, className }) => (
  <div
    className={cn(
      "grid grid-cols-3 bg-ag-border border border-ag-border",
      className,
    )}
    style={{ gap: "1px" }}
  >
    {children}
  </div>
);
BentoGridSwiss.displayName = "BentoGridSwiss";
