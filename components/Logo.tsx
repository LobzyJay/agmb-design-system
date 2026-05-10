import * as React from "react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site-config";

// AGMB Logo primitive — 2026-05-10.
// Single source of truth for every brand-mark surface: site header, footer,
// favicon, OG image, /design § 02 specimens, social embeds, print exports.
//
// 6 variants:
//   wordmark-coloured     · navy + gold + white  · default · light surfaces
//   wordmark-mono-white   · white only           · dark surfaces / on-photography
//   wordmark-mono-black   · black only           · print, formal, single-colour
//   icon-coloured         · navy + gold + white  · compact spaces with brand wordmark
//   icon-mono-white       · white only           · favicons / single-colour dark
//   icon-mono-black       · black only           · favicons / single-colour light
//
// Asset path: public/brand/logo/agmb-{wordmark|icon}-{coloured|mono-white|mono-black}.svg
//
// Coloured SVGs are pre-coloured with `--ag-navy` (#0A2540) and `--ag-gold`
// (#C8972A) at file level — recoloured 2026-05-10 from the original artwork
// (which used #061F39 / #DDA73A) to match the locked design system tokens.
//
// Implementation note: uses a plain <img> tag rather than next/image because
// SVGs are vector and don't benefit from Next's raster optimisation, and we
// avoid the `dangerouslyAllowSVG` config flag that would otherwise be required.
//
// Anti-pattern register (enforced in /design § 02):
//   · don't recolour outside the 6 variants
//   · don't rotate, mirror, or stretch
//   · don't add drop-shadows, glows, or strokes
//   · don't crop or pad the artwork unevenly — use clearspace = 1× icon height
//   · don't render below 24px (icon) / 96px (wordmark) — sub-pixel render breaks
//   · don't overlay on busy imagery without a scrim layer

export type LogoVariant =
  | "wordmark-coloured"
  | "wordmark-mono-white"
  | "wordmark-mono-black"
  | "icon-coloured"
  | "icon-mono-white"
  | "icon-mono-black";

interface VariantSpec {
  /** Public-folder URL of the SVG asset. */
  src: string;
  /** Original artwork width in viewBox units (pre-aspect-ratio scale). */
  viewWidth: number;
  /** Original artwork height in viewBox units. */
  viewHeight: number;
  /** Whether this variant carries the wordmark or just the icon. Drives default sizing. */
  kind: "wordmark" | "icon";
}

// Assets live under public/brand/logo/. Paths run through `asset()` so the
// GitHub Pages basePath prefix is applied at build time when set.
const VARIANTS: Record<LogoVariant, VariantSpec> = {
  "wordmark-coloured":   { src: asset("/brand/logo/agmb-wordmark-coloured.svg"),   viewWidth: 1850, viewHeight: 523, kind: "wordmark" },
  "wordmark-mono-white": { src: asset("/brand/logo/agmb-wordmark-mono-white.svg"), viewWidth: 1850, viewHeight: 523, kind: "wordmark" },
  "wordmark-mono-black": { src: asset("/brand/logo/agmb-wordmark-mono-black.svg"), viewWidth: 1850, viewHeight: 523, kind: "wordmark" },
  "icon-coloured":       { src: asset("/brand/logo/agmb-icon-coloured.svg"),       viewWidth: 659,  viewHeight: 506, kind: "icon"     },
  "icon-mono-white":     { src: asset("/brand/logo/agmb-icon-mono-white.svg"),     viewWidth: 632,  viewHeight: 466, kind: "icon"     },
  "icon-mono-black":     { src: asset("/brand/logo/agmb-icon-mono-black.svg"),     viewWidth: 632,  viewHeight: 466, kind: "icon"     },
};

/** Minimum sizes below which sub-pixel render breaks. Enforced in /design § 02. */
export const LOGO_MIN_HEIGHT = {
  icon: 24,
  wordmark: 32,
} as const;

export interface LogoProps {
  /** Default: `wordmark-coloured`. */
  variant?: LogoVariant;
  /**
   * Logo height in CSS pixels. Width is derived from the artwork's aspect ratio.
   * Defaults: 48 for wordmark variants, 32 for icon variants.
   * Enforce minimums via `LOGO_MIN_HEIGHT` — do not render below those values.
   */
  height?: number;
  /**
   * Decorative use — sets `aria-hidden="true"` and empty alt. Use when the logo is
   * paired with a sibling text label that already names the brand (e.g. footer with
   * "AG Mortgage Bank Plc" wordmark beside it).
   */
  decorative?: boolean;
  /**
   * Override the accessible name. Default: "AG Mortgage Bank Plc".
   * Pass a localised name when documenting the logo on a non-English surface.
   */
  label?: string;
  /** Additional class names — passes to the underlying `<img>`. */
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "wordmark-coloured",
  height,
  decorative = false,
  label,
  className,
}) => {
  const spec = VARIANTS[variant];
  const computedHeight = height ?? (spec.kind === "wordmark" ? 48 : 32);
  // Aspect-correct width — round to avoid sub-pixel layout shifts.
  const computedWidth = Math.round((spec.viewWidth / spec.viewHeight) * computedHeight);

  // Minimum-size guard — log a console warning in development if the consumer is
  // rendering below the legibility floor. Production renders silently to avoid
  // partner / embed surfaces shipping warnings.
  if (process.env.NODE_ENV !== "production") {
    const min = LOGO_MIN_HEIGHT[spec.kind];
    if (computedHeight < min) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Logo] Rendering "${variant}" at ${computedHeight}px — below the ` +
          `${min}px minimum. Sub-pixel render may break the artwork.`,
      );
    }
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={spec.src}
      alt={decorative ? "" : (label ?? "AG Mortgage Bank Plc")}
      width={computedWidth}
      height={computedHeight}
      draggable={false}
      aria-hidden={decorative ? true : undefined}
      className={cn("block select-none", className)}
    />
  );
};
Logo.displayName = "Logo";
