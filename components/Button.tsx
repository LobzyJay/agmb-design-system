"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Button primitive — PRD §4.6 + §4.4 state matrix.
// 7 states: default | hover | focus-visible | active | disabled | loading | error
// Variants (shadcn-aligned, 2026-05-09 v3 gold-demotion):
//   primary      — pair.cta.primary (navy.vivid + cream.warm), the modern CTA
//   secondary    — outline (navy border + transparent surface)
//   outline      — alias of secondary kept for shadcn API symmetry
//   ghost        — link-like, low-emphasis tertiary
//   destructive  — pair.cta.destructive (feedback.danger + cream)
// 5 variants total. Heritage gold variants (primary-gold / primary-gold-gradient)
// retired 2026-05-09 v3: gold demoted to decorative-only.
// All buttons are 48px min-height (size=md), 16px Inter Tight 600, 6px radius (PRD §4.6).
// Tactile: active:translate-y-[1px] from --tactile-active-y token.

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Marks the button as in an error state (e.g. submission failed) — visual cue only. */
  error?: boolean;
  /** Defaults full-width on mobile in form contexts; opt-in flag for parent-controlled layout. */
  fullWidth?: boolean;
  /** Force a visual state for design review / Storybook. Do NOT use in production code. */
  forceState?: "hover" | "focus-visible" | "active";
}

// 2026-05-09 v3 gold-demotion + shadcn alignment:
//   · `primary` consumes pair.cta.primary (navy.vivid + cream.warm). Hover lifts
//     to navy.vivid/90 (shadcn opacity-modifier convention). Stripe / Mercury /
//     ACI confidence inside the locked navy family.
//   · `secondary` and `outline` are aliases — the considered second action.
//   · `ghost` low-emphasis tertiary.
//   · `destructive` consumes pair.cta.destructive — cancel application,
//     delete saved scenario, the rare stop-and-fix moment.
const VARIANT_DEFAULT: Record<ButtonVariant, string> = {
  // Primary: text colour driven by --pair-cta-primary-text so the
  // [data-surface="dark"] cascade flips it to navy on cream-warm bg.
  // The static `text-ag-cream-warm` class baked the colour and rendered
  // cream-warm-on-cream-warm (invisible) on dark surfaces. Fixed 2026-05-10.
  "primary":     "bg-pair-cta-primary text-[var(--pair-cta-primary-text)] border-transparent shadow-[0_1px_2px_rgba(10,37,64,0.12),0_4px_12px_-2px_rgba(10,37,64,0.18)]",
  "secondary":   "bg-transparent text-ag-navy border-ag-navy",
  "outline":     "bg-transparent text-ag-navy border-ag-navy",
  "ghost":       "bg-transparent text-ag-navy border-transparent",
  "destructive": "bg-ag-red text-ag-cream border-transparent shadow-[0_1px_2px_rgba(180,35,24,0.12),0_4px_12px_-2px_rgba(180,35,24,0.18)]",
};

const VARIANT_HOVER: Record<ButtonVariant, string> = {
  "primary":     "hover:bg-ag-navy-vivid/90 hover:shadow-[0_2px_4px_rgba(10,37,64,0.18),0_10px_28px_-4px_rgba(10,37,64,0.28)] hover:-translate-y-px",
  "secondary":   "hover:bg-ag-navy hover:text-ag-cream hover:border-ag-navy",
  "outline":     "hover:bg-ag-navy hover:text-ag-cream hover:border-ag-navy",
  "ghost":       "hover:bg-ag-navy/5 underline-offset-4",
  "destructive": "hover:bg-ag-red/90 hover:shadow-[0_2px_4px_rgba(180,35,24,0.24),0_10px_28px_-4px_rgba(180,35,24,0.32)] hover:-translate-y-px",
};

// Manual visual override used by Storybook only (no pseudo-state addon yet).
const FORCED_STATE_VISUALS: Record<ButtonVariant, Record<NonNullable<ButtonProps["forceState"]>, string>> = {
  "primary": {
    "hover":         "!bg-ag-navy-vivid/90",
    "focus-visible": "!ring-2 !ring-ag-navy !ring-offset-2",
    "active":        "translate-y-[1px]",
  },
  "secondary": {
    "hover":         "!bg-ag-navy !text-ag-cream !border-ag-navy",
    "focus-visible": "!ring-2 !ring-ag-navy !ring-offset-2",
    "active":        "translate-y-[1px]",
  },
  "outline": {
    "hover":         "!bg-ag-navy !text-ag-cream !border-ag-navy",
    "focus-visible": "!ring-2 !ring-ag-navy !ring-offset-2",
    "active":        "translate-y-[1px]",
  },
  "ghost": {
    "hover":         "!bg-ag-navy/5",
    "focus-visible": "!ring-2 !ring-ag-navy !ring-offset-2",
    "active":        "translate-y-[1px]",
  },
  "destructive": {
    "hover":         "!bg-ag-red/90",
    "focus-visible": "!ring-2 !ring-ag-red !ring-offset-2",
    "active":        "translate-y-[1px]",
  },
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm border",
  md: "h-12 px-5 text-base border",   // 48px — PRD §4.6 baseline
  lg: "h-14 px-7 text-base border",
};

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 -ml-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
    <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      error = false,
      fullWidth = false,
      forceState,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-invalid={error || undefined}
        data-variant={variant}
        data-state={loading ? "loading" : error ? "error" : isDisabled ? "disabled" : "default"}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-button font-semibold",
          "transition-token select-none",
          // tactile press
          "active:translate-y-[1px]",
          // Tailwind ring used for Storybook forceState=focus-visible only.
          // Live focus ring is the global outline rule in globals.css which
          // consumes --comp-cta-primary-accent and remaps to cream-warm inside
          // [data-surface="dark"] for legibility on navy surfaces. PRD §4.4.
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 focus-visible:ring-offset-ag-cream-warm",
          fullWidth && "w-full",
          SIZE[size],
          // base + interaction states (only when enabled and no forceState override)
          !isDisabled && !forceState && [VARIANT_DEFAULT[variant], VARIANT_HOVER[variant]],
          // disabled — overrides variant
          isDisabled && "bg-ag-light text-ag-muted border-ag-border cursor-not-allowed hover:bg-ag-light hover:text-ag-muted",
          // error — danger ring (subtle, doesn't change variant unless explicitly intended)
          error && !isDisabled && "ring-2 ring-ag-red ring-offset-2 ring-offset-ag-cream",
          // forceState — Storybook only
          forceState && [VARIANT_DEFAULT[variant], FORCED_STATE_VISUALS[variant][forceState]],
          className,
        )}
        {...props}
      >
        {loading && <Spinner />}
        <span>{children}</span>
      </button>
    );
  },
);
Button.displayName = "Button";
