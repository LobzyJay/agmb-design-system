"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ListItem primitive — Wise lift (PRD §4.5).
// One anatomy, seven interaction modes:
//   button | checkbox | icon-button | navigation | no-action | radio | switch
//
// Anatomy:
//   ┌────────────────────────────────────────────────────┐
//   │ [leading]  Title             helper      [trailing] │
//   │            Description                              │
//   └────────────────────────────────────────────────────┘
//
// Selection state (radio / checkbox / switch):
//   - Selected: 2px ag-navy border, ag-cream surface, navy text
//   - Default:  1px ag-border, ag-white surface
//   - Hover:    border darkens to ag-text
//   - Disabled: opacity 50%, cursor not-allowed
//
// Used in:
//   §04 product cards (variant=navigation)
//   §05 calculator (variant=radio for mortgage type)
//   Utility 3 wizard (variant=radio for employment status, NHF, etc.; switch for marital)
//   §11 footer + nav (variant=navigation)

export type ListItemVariant =
  | "button"
  | "checkbox"
  | "icon-button"
  | "navigation"
  | "no-action"
  | "radio"
  | "switch";

export interface ListItemProps {
  variant: ListItemVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-edge helper (e.g. "9.5%", "20 years"). Hidden on the smallest interaction modes. */
  helper?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  /** For radio: name + value pair. For checkbox: defaults to title. */
  name?: string;
  value?: string;
  /** Pointer / keyboard activation. Receives the variant-appropriate event. */
  onSelect?: () => void;
  className?: string;
  /** Force a visual state for design review / Storybook. Do NOT use in production. */
  forceState?: "hover" | "focus-visible" | "active";
}

const Chevron = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RadioGlyph: React.FC<{ checked: boolean; disabled?: boolean }> = ({ checked, disabled }) => (
  <span
    className={cn(
      "shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border transition-token",
      checked ? "border-ag-navy border-[6px]" : "border-ag-border border-2",
      disabled && "opacity-50",
    )}
    aria-hidden="true"
  />
);

const CheckboxGlyph: React.FC<{ checked: boolean; disabled?: boolean }> = ({ checked, disabled }) => (
  <span
    className={cn(
      "shrink-0 inline-flex items-center justify-center w-5 h-5 rounded border transition-token",
      checked ? "bg-ag-navy border-ag-navy text-ag-cream" : "bg-ag-white border-ag-border",
      disabled && "opacity-50",
    )}
    aria-hidden="true"
  >
    {checked && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.5l2.5 2.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

const SwitchGlyph: React.FC<{ checked: boolean; disabled?: boolean }> = ({ checked, disabled }) => (
  <span
    className={cn(
      "shrink-0 inline-flex items-center w-10 h-6 rounded-full border transition-token",
      checked ? "bg-ag-navy border-ag-navy" : "bg-ag-light border-ag-border",
      disabled && "opacity-50",
    )}
    aria-hidden="true"
  >
    <span
      className={cn(
        "block w-4 h-4 rounded-full bg-ag-white transition-token",
        checked ? "translate-x-5" : "translate-x-1",
      )}
    />
  </span>
);

export const ListItem: React.FC<ListItemProps> = ({
  variant,
  title,
  description,
  helper,
  leading,
  trailing,
  selected = false,
  disabled = false,
  loading = false,
  name,
  value,
  onSelect,
  className,
  forceState,
}) => {
  // Pick the rendered tag based on variant
  const Tag: React.ElementType =
    variant === "navigation" ? "a" :
    variant === "no-action"  ? "div" :
    "button";

  const interactive = variant !== "no-action";

  const handleActivate = () => {
    if (!disabled && !loading && interactive) onSelect?.();
  };

  // Variant-specific glyphs at the trailing edge
  const variantTrailing =
    variant === "radio" ? <RadioGlyph checked={selected} disabled={disabled} /> :
    variant === "checkbox" ? <CheckboxGlyph checked={selected} disabled={disabled} /> :
    variant === "switch" ? <SwitchGlyph checked={selected} disabled={disabled} /> :
    variant === "navigation" ? <Chevron /> :
    null;

  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      role={
        variant === "radio" ? "radio" :
        variant === "checkbox" ? "checkbox" :
        variant === "switch" ? "switch" :
        undefined
      }
      aria-checked={
        (variant === "radio" || variant === "checkbox" || variant === "switch")
          ? selected
          : undefined
      }
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-selected={selected || undefined}
      data-name={name}
      data-value={value}
      onClick={handleActivate}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!interactive || disabled || loading) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      tabIndex={interactive && !disabled ? 0 : -1}
      className={cn(
        "group relative w-full text-left flex items-start gap-4 px-4 py-3.5 rounded-input border bg-ag-white",
        "transition-token select-none",
        // base border
        selected ? "border-ag-navy border-2" : "border-ag-border",
        // selected surface
        selected && "bg-ag-cream",
        // hover
        interactive && !disabled && !forceState && "hover:border-ag-text",
        // focus-visible
        interactive && !disabled && !forceState &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 focus-visible:ring-offset-ag-cream",
        // disabled
        disabled && "opacity-50 cursor-not-allowed",
        // forceState — Storybook only
        forceState === "hover" && "!border-ag-text",
        forceState === "focus-visible" && "!ring-2 !ring-ag-navy !ring-offset-2",
        forceState === "active" && "translate-y-[1px]",
        className,
      )}
    >
      {leading && <span className="shrink-0 mt-0.5">{leading}</span>}
      <span className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-base font-semibold text-ag-text leading-snug">{title}</span>
        {description && (
          <span className="text-sm text-ag-muted leading-snug">{description}</span>
        )}
      </span>
      {helper && (
        <span className="shrink-0 text-sm text-ag-muted numeric self-center">{helper}</span>
      )}
      {(variantTrailing || trailing) && (
        <span className="shrink-0 self-center flex items-center gap-2">
          {trailing}
          {variantTrailing}
        </span>
      )}
    </Tag>
  );
};
ListItem.displayName = "ListItem";
