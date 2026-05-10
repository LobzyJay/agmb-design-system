"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Disclosure primitive (#29) — 2026-05-10.
//
// Stripe FAQ + Mercury card register. Restrained, regulator-safe. Used for
// glossary entries, do/don't pairs, long-form Vocabulary / Grammar / Voice
// sections in /design § 01.7–01.9 where flat exposition would overwhelm.
//
// Architecture notes
// ──────────────────
//
// · CSS-only height transition via the `grid-template-rows: 0fr → 1fr` trick.
//   No Framer Motion, no measurement JS, no GSAP — keeps the page free of
//   the mixed-engine-per-tree anti-pattern that ScrollProgressPath has
//   already claimed for GSAP on /design.
//
// · `data-state="open" | "closed"` on the root for token-driven styling and
//   for downstream consumers (e.g. tests) to assert on state without reading
//   into internals.
//
// · Controlled + uncontrolled modes. Uncontrolled is the common case; pass
//   `open` + `onOpenChange` when a parent needs to enforce single-open
//   accordion behaviour across siblings.
//
// · `inline` variant: bottom-border divider between stacked items. Stack
//   multiple inside a parent <div> and the borders compose into a list.
//   `card` variant: full bordered card. Same primitive — different visual
//   weight for different page contexts.
//
// · Accessibility: native button trigger with `aria-expanded` + `aria-controls`;
//   panel carries `role="region"` + `aria-labelledby`. Closed panels stay in
//   the DOM (visually clipped via grid + overflow) so animation works — the
//   trigger's `aria-expanded` is the canonical state signal for assistive tech.
//
// · 7-state matrix: default · hover · focus-visible · active · disabled apply.
//   Loading + error are not applicable for a static disclosure of text content.

export type DisclosureVariant = "inline" | "card";
export type DisclosureSize = "sm" | "md" | "lg";

export interface DisclosureProps {
  /** Summary row label — the visible click target. */
  title: React.ReactNode;
  /** Optional secondary line below the title — quieter, for context. */
  description?: React.ReactNode;
  /** Uncontrolled initial state. Ignored if `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Fires on every toggle — controlled or uncontrolled. */
  onOpenChange?: (open: boolean) => void;
  /** Visual weight. Default `inline`. */
  variant?: DisclosureVariant;
  /** Trigger row scale. Default `md`. */
  size?: DisclosureSize;
  /** Trigger is non-interactive and visually dimmed. */
  disabled?: boolean;
  /** Forced visual state for design review / Storybook. Not for production. */
  forceState?: "hover" | "focus-visible" | "active";
  className?: string;
  children: React.ReactNode;
}

const SUMMARY_SIZE: Record<DisclosureSize, string> = {
  sm: "py-3 text-sm",
  md: "py-4 text-base",
  lg: "py-5 text-lg",
};

const PANEL_PADDING_BOTTOM: Record<DisclosureSize, string> = {
  sm: "pb-3",
  md: "pb-4",
  lg: "pb-5",
};

// Inline SVG chevron — keeps the primitive self-contained, no icon dependency.
const Chevron: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  description,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  variant = "inline",
  size = "md",
  disabled = false,
  forceState,
  className,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = React.useCallback(() => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [disabled, open, isControlled, onOpenChange]);

  const triggerId = React.useId();
  const panelId = React.useId();

  return (
    <div
      data-state={open ? "open" : "closed"}
      data-variant={variant}
      className={cn(
        // Inline variant: bottom border becomes the rule between stacked items.
        variant === "inline" && "border-b border-ag-border last:border-b-0",
        // Card variant: enclosed bordered card. Slight bg shift when open
        // signals selection without being noisy.
        variant === "card" && [
          "border border-ag-border rounded-card overflow-hidden",
          "bg-ag-white transition-token",
          open && "bg-ag-cream/40 border-ag-navy/15",
        ],
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <button
        id={triggerId}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={panelId}
        // forceState renders the visual treatment of a state without actually
        // entering it — Storybook-only escape hatch.
        data-force-state={forceState}
        className={cn(
          "w-full flex items-start justify-between gap-4 text-left",
          "transition-token group cursor-pointer",
          variant === "card" && "px-5",
          SUMMARY_SIZE[size],
          // text colour: muted at rest, navy on hover / open for register lift.
          "text-ag-text",
          !disabled && "hover:text-ag-navy",
          (forceState === "hover" || open) && "text-ag-navy",
          // Focus ring: system-standard, consumes --comp-cta-primary-accent so
          // it flips correctly on [data-surface="dark"] scopes.
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 focus-visible:ring-offset-ag-white rounded-sm",
          forceState === "focus-visible" && "ring-2 ring-ag-navy ring-offset-2 ring-offset-ag-white",
          // Tactile press, matches Button primitive.
          "active:translate-y-[0.5px]",
          forceState === "active" && "translate-y-[0.5px]",
        )}
      >
        <span className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="font-medium leading-snug">{title}</span>
          {description && (
            <span className="text-sm text-ag-muted leading-snug">{description}</span>
          )}
        </span>
        <Chevron
          className={cn(
            "shrink-0 mt-[0.4em] text-ag-muted transition-token",
            "group-hover:text-ag-navy",
            open && "rotate-180 text-ag-navy",
          )}
        />
      </button>

      {/*
        CSS-only height animation — the grid-template-rows 0fr ↔ 1fr trick.
        Works in every current browser, zero JS, no measurement glitches.
        Content is always rendered (visually clipped when closed) so the
        animation has something to interpolate between.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        // grid-template-rows isn't in the `.transition-token` property list,
        // so we declare the transition inline using the motion tokens directly.
        // Same duration + ease as every other primitive — system motion stays
        // single-source-of-truth.
        style={{
          transition: "grid-template-rows var(--motion-duration-fast) var(--motion-ease-default)",
        }}
        className={cn(
          "grid",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "text-ag-text leading-relaxed",
              variant === "card" && "px-5",
              PANEL_PADDING_BOTTOM[size],
              size === "sm" && "text-sm",
              size !== "sm" && "text-base",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
Disclosure.displayName = "Disclosure";
