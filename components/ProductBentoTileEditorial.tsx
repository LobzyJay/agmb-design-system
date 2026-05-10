"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ProductBentoTileEditorial — Direction A candidate.
//
// Register: magazine-grade · photo-led · serif italic accents · generous whitespace.
// Reads like The New Yorker / The Atlantic product page — premium, considered, slow.
//
// Layout: asymmetric 7-col grid on the parent side (col-span-4 hero / col-span-3 pair)
// with a full-span wide row below. This component supplies individual tile markup;
// the grid composition lives in the specimen / consuming page.
//
// Hero variant:  feather.atmospheric backdrop (navy.deep ground + bottom-up gradient),
//                generous p-12, serif italic eyebrow, bi-section title text-4xl/5xl,
//                narrow max-w-md description, cream-warm CTA.
//
// Mid variant:   cream surface (ag-cream-warm), no border (only whitespace separates),
//                serif italic eyebrow, bi-serif title text-2xl/3xl, no icon.
//                Typography hierarchy does the work icons did in the baseline.
//
// Wide variant:  full-bleed cream advisory, feather.gold.standard decorative seal
//                strip on the right (registered decorative use — NOT interactive),
//                serif italic eyebrow, large title, navy.vivid CTA.
//
// Motion: transition-token-base + hover-lift. Respects prefers-reduced-motion.
// Gold rule: gold appears only in the wide-variant seal strip — registered
//            decorative use. No gold on any interactive surface.
//
// Props: superset of ProductBentoTileProps — compatible drop-in.

export type ProductBentoTileEditorialVariant = "hero" | "mid" | "wide";
export type ProductBentoTileEditorialTier = "flagship" | "secondary";

export interface ProductBentoTileEditorialProps {
  variant: ProductBentoTileEditorialVariant;
  tier?: ProductBentoTileEditorialTier;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  href?: string;
  ctaLabel?: React.ReactNode;
  className?: string;
  dataRows?: Array<{ label: string; value: string }>;
}

const HOVER_LIFT = "hover-lift hover:shadow-soft-1";

export const ProductBentoTileEditorial: React.FC<ProductBentoTileEditorialProps> = ({
  variant,
  tier = "flagship",
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  ctaLabel = "Read more →",
  className,
}) => {
  const Tag: React.ElementType = href ? "a" : "article";

  // ── Hero ──────────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <Tag
        href={href}
        className={cn(
          "group relative isolate overflow-hidden rounded-card",
          "bg-ag-navy-deep",
          "min-h-[28rem] md:min-h-[34rem] flex flex-col justify-end",
          "p-10 md:p-12",
          "shadow-tile-rest",
          "transition-token-base", HOVER_LIFT,
          href && "hover:border-ag-navy-vivid/30 border border-transparent",
          className,
        )}
        data-variant="hero"
        data-tier={tier}
      >
        {/* Background image layer */}
        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="absolute inset-0 w-full h-full object-cover -z-20 opacity-30"
          />
        )}

        {/* Feather.atmospheric-style gradient — navy.deep base, bottom-up fade */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to top, var(--ag-navy-deep) 40%, rgba(6,26,46,0.72) 70%, rgba(6,26,46,0.38) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Thin gold hairline accent at the top — decorative register, not interactive */}
        <div
          className="absolute top-0 left-10 md:left-12 right-10 md:right-12 h-px -z-10"
          style={{ background: "linear-gradient(to right, transparent, var(--ag-gold), transparent)" }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          {eyebrow && (
            <p className="bi-label bi-serif italic text-ag-cream-warm/70 text-xs tracking-wide mb-4 normal-case">
              {eyebrow}
            </p>
          )}
          <h3 className="bi-section bi-serif text-ag-cream text-3xl md:text-5xl tracking-tight leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-ag-cream/70 mt-4 max-w-md text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}
          {href && (
            <span className="mt-7 inline-block text-ag-cream-warm font-medium text-sm tracking-wide">
              {ctaLabel}
            </span>
          )}
        </div>
      </Tag>
    );
  }

  // ── Wide ──────────────────────────────────────────────────────────────────
  if (variant === "wide") {
    return (
      <Tag
        href={href}
        className={cn(
          "group relative isolate overflow-hidden rounded-card",
          "bg-ag-cream-warm",
          "flex flex-col md:flex-row md:items-end gap-6 md:gap-0",
          "p-10 md:p-12",
          "transition-token-base", HOVER_LIFT,
          href && "border border-ag-border/60 hover:border-ag-navy-vivid/30",
          className,
        )}
        data-variant="wide"
        data-tier={tier}
      >
        {/* Content area — grows to fill */}
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <p className="bi-label bi-serif italic text-ag-navy/60 text-xs tracking-wide mb-4 normal-case">
              {eyebrow}
            </p>
          )}
          <h3 className="bi-section bi-serif text-ag-navy text-2xl md:text-4xl tracking-tight leading-tight max-w-2xl">
            {title}
          </h3>
          {description && (
            <p className="text-ag-muted mt-3 max-w-xl text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}
          {href && (
            <span className="mt-6 inline-block text-ag-navy-vivid font-semibold text-sm">
              {ctaLabel}
            </span>
          )}
        </div>

        {/* Decorative seal strip — feather.gold.standard register.
            Registered decorative use: gold is presentational here, not interactive.
            No link, no button, no role. aria-hidden. */}
        <div
          className="shrink-0 self-stretch md:ml-12 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="hidden md:flex flex-col items-center justify-center w-20 h-full min-h-[6rem] rounded-md opacity-80"
            style={{
              background: "linear-gradient(135deg, var(--ag-gold-soft) 0%, var(--ag-gold-vivid) 50%, var(--ag-gold-rich) 100%)",
            }}
          >
            {/* Decorative monogram */}
            <span
              className="text-ag-navy font-serif font-bold text-2xl select-none"
              style={{ fontFamily: "var(--font-serif)", lineHeight: 1 }}
            >
              AG
            </span>
            <span
              className="mt-1 text-ag-navy/70 text-[9px] uppercase tracking-[0.14em] select-none"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              AGMB
            </span>
          </div>
        </div>
      </Tag>
    );
  }

  // ── Mid ───────────────────────────────────────────────────────────────────
  return (
    <Tag
      href={href}
      className={cn(
        "group relative bg-ag-cream-warm rounded-card",
        "flex flex-col gap-4",
        "p-8 md:p-9",
        "transition-token-base", HOVER_LIFT,
        href && "border border-ag-cream-deep hover:border-ag-navy-vivid/25",
        className,
      )}
      data-variant="mid"
      data-tier={tier}
    >
      {eyebrow && (
        <p className="bi-label bi-serif italic text-ag-navy/55 text-xs tracking-wide normal-case">
          {eyebrow}
        </p>
      )}
      <h4 className="bi-section bi-serif text-ag-navy text-xl md:text-2xl leading-snug tracking-tight">
        {title}
      </h4>
      {description && (
        <p className="text-ag-muted text-sm leading-relaxed">{description}</p>
      )}
      {href && (
        <span className="text-ag-navy-vivid font-semibold text-sm mt-auto">
          {ctaLabel}
        </span>
      )}
    </Tag>
  );
};
ProductBentoTileEditorial.displayName = "ProductBentoTileEditorial";
