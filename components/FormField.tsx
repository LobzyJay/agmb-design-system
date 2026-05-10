"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB FormField primitive — PRD §4.5 (Form & input primitives).
// Generic label-above + input + helper + error slot.
// 48px height, 1px border, 8px radius, 2px navy focus ring (PRD §4.6 + §4.4 a11y).
// 7 states: default | hover | focus-visible | active | disabled | loading | error
//
// Used directly for free-text and validated formats (BVN, NIN, name, phone, email).
// MoneyInput composes this primitive with currency-prefix + paste-aware formatting.

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Visible label above the input (PRD §7 a11y: never placeholder-only). */
  label: string;
  /** Helper text below the input (Inter, ag-muted). */
  helper?: string;
  /** Error message — when present, switches the field to the error visual state. */
  error?: string;
  /** Suppresses the visible label (still applied as aria-label) — only for tightly-spaced contexts. */
  hideLabel?: boolean;
  /** Element rendered before the input — currency prefix, search icon, etc. */
  prefix?: React.ReactNode;
  /** Element rendered after the input — toggle, unit, % switch, etc. */
  suffix?: React.ReactNode;
  /** Loading spinner inside the field (e.g. async validation in flight). */
  loading?: boolean;
  /** Force a visual state for design review / Storybook. Do NOT use in production code. */
  forceState?: "hover" | "focus-visible" | "active";
}

const Spinner = () => (
  <svg className="animate-spin h-4 w-4 text-ag-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
    <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, helper, error, hideLabel, prefix, suffix, loading, forceState, className, id, disabled, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = helper ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium text-ag-text",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required && <span className="text-ag-red ml-0.5" aria-hidden="true">*</span>}
        </label>
        <div
          className={cn(
            "group relative flex items-center h-12 rounded-input border bg-ag-white",
            "transition-token",
            // base
            "border-ag-border",
            // hover (only when no forced state and not disabled/error)
            !disabled && !error && !forceState && "hover:border-ag-text",
            // focus-within (the input has focus)
            !disabled && !error && !forceState && "focus-within:border-ag-navy focus-within:ring-2 focus-within:ring-ag-navy focus-within:ring-offset-1 focus-within:ring-offset-ag-cream",
            // error overrides
            error && "border-ag-red focus-within:border-ag-red focus-within:ring-2 focus-within:ring-ag-red",
            // disabled
            disabled && "bg-ag-light cursor-not-allowed",
            // forceState — Storybook only
            forceState === "hover" && "!border-ag-text",
            forceState === "focus-visible" && "!border-ag-navy !ring-2 !ring-ag-navy !ring-offset-1",
            forceState === "active" && "!border-ag-navy",
          )}
        >
          {prefix && (
            <span className="pl-3.5 pr-1 text-ag-muted shrink-0 numeric" aria-hidden="true">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error || undefined}
            aria-describedby={cn(helperId, errorId) || undefined}
            className={cn(
              "flex-1 min-w-0 bg-transparent px-3.5 text-base text-ag-text placeholder:text-ag-muted",
              "outline-none disabled:cursor-not-allowed disabled:text-ag-muted",
              prefix ? "pl-1" : null,
              suffix ? "pr-1" : null,
            )}
            {...props}
          />
          {loading && <span className="pr-3.5 shrink-0">{<Spinner />}</span>}
          {!loading && suffix && (
            <span className="pr-2 shrink-0 flex items-center">{suffix}</span>
          )}
        </div>
        {helper && !error && (
          <p id={helperId} className="text-xs text-ag-muted leading-snug">{helper}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-ag-red leading-snug font-medium">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";
