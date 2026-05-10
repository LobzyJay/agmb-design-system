"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ProductBentoTile — PRD §4.5 + §3.2 §04 bento.
// Variants:
//   hero   — 2/3 width, full-height, image-bg with editorial overlay (NHF tile)
//   mid    — white bg, icon @ 32px navy.vivid, H4 navy, 1-line description, link (M-REIF / Construction / REI / Savings)
//   wide   — full-width row, navy bg, cream text, no image, no decorative gold (Mortgage Advisory)
//
// Rest state: soft navy-tinted shadow (--shadow-tile-rest) prevents
//   dissolving on white-page-bg. Hover escalates to --shadow-soft-1 +
//   1px translateY-up. Stripe-restraint v3 register.
//
// Hover (post v3 gold-demotion): subtle navy.vivid border + 4px translateY-up + tinted shadow.
// No neon glow. No scale-up beyond 1.005. No gold on interactive surfaces.
//
// `tier` prop (Adewale 2026-05-08 hybrid taxonomy): "flagship" | "secondary".
// Flagship = 5 mortgages + advisory (PRD §04). Secondary = 6 savings products (§04b).
//
// Gold demotion (2026-05-09 v3): gold is decorative-only — feathers + GoldShader.
// This primitive carries no gold after restyle. Navy register throughout.
//
// Shadow register (2026-05-09):
//   hero + mid rest: .shadow-tile-rest  — 0 1px 4px navy 6% alpha
//   hero + mid hover: hover:shadow-soft-1 via HOVER_LIFT
//   wide: no shadow — navy bg provides inherent visual weight.

export type ProductBentoTileVariant = "hero" | "mid" | "wide";
export type ProductBentoTileTier = "flagship" | "secondary";

export interface ProductBentoTileProps {
  variant: ProductBentoTileVariant;
  tier?: ProductBentoTileTier;
  /** Eyebrow above the title (e.g. "OUR FLAGSHIP PRODUCT"). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Hero variant — background image source. */
  imageSrc?: string;
  imageAlt?: string;
  /** Mid variant — icon (32px). Use Phosphor or commissioned engraved set. */
  icon?: React.ReactNode;
  /** Link target. Renders the tile as <a>; otherwise <article>. */
  href?: string;
  /** Link label (e.g. "Learn more →"). */
  ctaLabel?: React.ReactNode;
  className?: string;
}

// v3 surface pass (2026-05-09 gold-demotion): flat-with-borders at rest,
// soft-1 shadow on hover only. Hover border swapped from gold to navy.vivid/40.
// Wide variant uses background-shift hover instead of border change.
const HOVER_LIFT = "hover-lift hover:shadow-soft-1";

export const ProductBentoTile: React.FC<ProductBentoTileProps> = ({
  variant,
  tier = "flagship",
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  icon,
  href,
  ctaLabel = "Learn more →",
  className,
}) => {
  const Tag: React.ElementType = href ? "a" : "article";

  if (variant === "hero") {
    return (
      <Tag
        href={href}
        className={cn(
          "group relative isolate overflow-hidden rounded-card bg-ag-cream border border-ag-border",
          "min-h-[24rem] md:min-h-[28rem] flex flex-col justify-end p-8 md:p-10",
          "shadow-tile-rest",
          "transition-token-base", HOVER_LIFT,
          href && "hover:border-ag-navy-vivid/40",
          className,
        )}
        data-variant="hero"
        data-tier={tier}
      >
        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ag-cream via-ag-cream/85 to-ag-cream/30" aria-hidden="true" />
        {eyebrow && <p className="eyebrow mb-3 bi-serif italic text-ag-navy/80 normal-case tracking-normal">{eyebrow}</p>}
        <h3 className="bi-section bi-serif text-ag-navy text-3xl md:text-4xl tracking-tight leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-ag-text mt-3 max-w-md text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
        {href && (
          <span className="mt-5 text-ag-navy-vivid font-semibold text-sm">{ctaLabel}</span>
        )}
      </Tag>
    );
  }

  if (variant === "wide") {
    return (
      <Tag
        href={href}
        className={cn(
          "group relative bg-ag-navy text-ag-cream rounded-card p-6 md:p-8",
          "transition-token", HOVER_LIFT,
          href && "block hover:bg-ag-navy-soft",
          className,
        )}
        data-variant="wide"
        data-tier={tier}
      >
        {eyebrow && <p className="eyebrow mb-2 text-ag-cream/60 text-xs uppercase tracking-[0.08em]">{eyebrow}</p>}
        <h3 className="bi-section bi-serif text-2xl md:text-3xl leading-tight tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-ag-cream/80 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
        {href && (
          <span className="mt-4 inline-flex text-ag-cream-warm font-semibold text-sm">{ctaLabel}</span>
        )}
      </Tag>
    );
  }

  // mid — white surface, navy register, no gold
  return (
    <Tag
      href={href}
      className={cn(
        "group relative bg-ag-white rounded-card p-6 md:p-7 border border-ag-border",
        "shadow-tile-rest",
        "flex flex-col gap-3 transition-token-base", HOVER_LIFT,
        href && "hover:border-ag-navy-vivid/40",
        className,
      )}
      data-variant="mid"
      data-tier={tier}
    >
      {icon && <span className="text-ag-navy-vivid w-8 h-8 inline-flex items-center justify-center">{icon}</span>}
      {eyebrow && <p className="eyebrow text-ag-muted normal-case tracking-normal text-xs">{eyebrow}</p>}
      <h4 className="bi-serif text-xl md:text-2xl text-ag-navy leading-snug">{title}</h4>
      {description && (
        <p className="text-ag-muted text-sm leading-snug">{description}</p>
      )}
      {href && (
        <span className="text-ag-navy-vivid font-semibold text-sm mt-auto">{ctaLabel}</span>
      )}
    </Tag>
  );
};
ProductBentoTile.displayName = "ProductBentoTile";
