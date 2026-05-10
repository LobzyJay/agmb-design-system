"use client";
import * as React from "react";
import { FormField, type FormFieldProps } from "./FormField";

// AGMB PercentInput — sibling of MoneyInput (PRD §4.5 + §5.1).
//
// Anatomy:
//   ┌──────────────────────────────────┐
//   │  Label                           │
//   ├──────────────────────────────────┤
//   │  6.00              % [−][+]      │  ← tabular numeric · suffix % · optional stepper
//   ├──────────────────────────────────┤
//   │  Helper                          │
//   └──────────────────────────────────┘
//
// Behaviour:
//   - Suffix `%` glyph: text-ag-muted at rest, text-ag-text at focus (via group class).
//   - Tabular figures via the `numeric` className (Inter Tight `tnum`).
//   - Numeric value at font-weight 500 via the `numeric` class chain.
//   - Focus ring: --ring-ag-navy (inherited from FormField).
//   - `prefers-reduced-motion: reduce` — no transition on value swap; display
//     coercion is synchronous (toFixed), no animation frame involved.
//   - Clamp to [min, max] on blur.
//   - Display coercion: parseFloat(value).toFixed(decimals) so 6 shows as "6.00".
//
// Step buttons (showStepper=true):
//   - Hairline-divided ± icons at the right edge of the field.
//   - aria-label: "Decrease {label} by {step}" / "Increase {label} by {step}".
//   - Hover per pair.cta.subtle rules: bg-ag-light on hover, ag-navy on active.
//   - Keyboard: Enter / Space on each button, arrow keys on the hidden <input>.
//
// 6-state matrix (empty · filled · focus · hover · error · disabled):
//   "loading" excluded — percent is always a local numeric input, no async
//   validation path exists in the mortgage domain. MoneyInput excludes loading
//   from its own surface for the same reason; loading lives in FormField only.
//
// Used in: §05 calculator (rate display + future editable-rate variant),
//   §06 wizard (interest-rate override step).

export interface PercentInputProps
  extends Omit<FormFieldProps, "value" | "defaultValue" | "type" | "suffix" | "inputMode" | "prefix"> {
  /** Controlled numeric value. `null` for an empty field. */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Decimal places for display coercion. Default 2 (mortgage-rate granularity). */
  decimals?: number;
  /** Keyboard / stepper step size. Default 0.05 (mortgage-rate granularity). */
  step?: number;
  /** Lower bound — clamps on blur. Default 0. */
  min?: number;
  /** Upper bound — clamps on blur. Default 50. */
  max?: number;
  /** Render ± step buttons inside the right edge of the field. */
  showStepper?: boolean;
  /** Fired with the parsed numeric value on every change. */
  onValueChange?: (value: number | null) => void;
  /** Size token — matches MoneyInput / FormField size. */
  size?: "sm" | "md" | "lg";
}

// Stepper button — hairline-divided ± icon inside the field.
// Extracted as a local component to keep JSX in the main render clean.
const StepButton: React.FC<{
  direction: "inc" | "dec";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ direction, label, onClick, disabled }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    // pair.cta.subtle: ag-light bg on hover, navy text on active.
    // hairline border-l separates from the % glyph cluster.
    className="
      flex items-center justify-center
      w-8 h-8
      shrink-0
      text-ag-muted
      hover:bg-ag-light hover:text-ag-navy
      active:bg-ag-light active:text-ag-navy
      disabled:pointer-events-none disabled:opacity-40
      transition-token
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-inset
      rounded
    "
    tabIndex={disabled ? -1 : 0}
  >
    {direction === "dec" ? (
      // Minus — single horizontal stroke at optical centre.
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ) : (
      // Plus — cross at optical centre.
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )}
  </button>
);

/** Parse a user-typed percent string. Strips %, whitespace. */
function parsePct(raw: string): number | null {
  const cleaned = raw.replace(/[%\s]/g, "");
  if (cleaned === "") return null;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Clamp a value to [min, max]; return null for null. */
function clampPct(v: number | null, min: number, max: number): number | null {
  if (v === null) return null;
  return Math.min(Math.max(v, min), max);
}

export const PercentInput = React.forwardRef<HTMLInputElement, PercentInputProps>(
  (
    {
      value,
      defaultValue = null,
      decimals = 2,
      step = 0.05,
      min = 0,
      max = 50,
      showStepper = false,
      onValueChange,
      onBlur,
      onChange,
      label,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue);

    // Derive the current numeric value regardless of controlled/uncontrolled mode.
    const current: number | null = isControlled ? (value ?? null) : internalValue;

    // What the <input> should display.
    // Empty field → "" so placeholder is visible.
    // Filled → coerce to fixed-decimal string.
    const display = current === null ? "" : parseFloat(current.toFixed(decimals)).toFixed(decimals);

    const commit = (next: number | null) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parsePct(e.target.value);
      commit(parsed);
      // Pass through to any onChange the caller attached (e.g. RHF register).
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Re-derive from the DOM value, not the closed-over `current`.
      // Rapid paste-then-tab and RHF programmatic blur can land here before
      // the controlled prop has flushed back through React, so reading
      // `current` would clamp a stale value and leak the unclamped one
      // through `onValueChange`.
      const raw = e.target.value;
      const parsed = raw == null || raw === "" ? current : parsePct(raw);
      const clamped = clampPct(parsed, min, max);
      // Coerce to the display precision so the value emitted via
      // `onValueChange` matches what the user sees (toFixed → string → number).
      const coerced = clamped === null ? null : parseFloat(clamped.toFixed(decimals));
      if (coerced !== current) commit(coerced);
      onBlur?.(e);
    };

    const step_ = (direction: 1 | -1) => {
      if (disabled) return;
      const base = current ?? 0;
      const next = clampPct(parseFloat((base + direction * step).toFixed(decimals)), min, max);
      commit(next);
    };

    // The suffix node passed into FormField's `suffix` slot.
    // The `group-focus-within` CSS class on the wrapper div (inside FormField)
    // drives the muted→text colour shift on the % glyph.
    const suffixNode = (
      <span className="flex items-center gap-0 shrink-0 pr-2">
        {/* % glyph — muted at rest, text-ag-text at focus */}
        <span
          className="numeric text-sm font-medium text-ag-muted group-focus-within:text-ag-text transition-token select-none"
          aria-hidden="true"
        >
          %
        </span>

        {showStepper && (
          <>
            {/* Hairline divider between % glyph and ± buttons */}
            <span className="w-px h-5 bg-ag-border mx-2 shrink-0" aria-hidden="true" />
            <StepButton
              direction="dec"
              label={`Decrease ${label} by ${step}%`}
              onClick={() => step_(-1)}
              disabled={disabled || (current !== null && current <= min)}
            />
            <StepButton
              direction="inc"
              label={`Increase ${label} by ${step}%`}
              onClick={() => step_(1)}
              disabled={disabled || (current !== null && current >= max)}
            />
          </>
        )}
      </span>
    );

    return (
      <FormField
        ref={ref}
        label={label}
        suffix={suffixNode}
        inputMode="decimal"
        autoComplete="off"
        type="text"
        // The input is always treated as controlled internally so we can
        // re-coerce every keystroke without fighting React's defaultValue.
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        // Tabular numeric weight — mirrors MoneyInput's rendering.
        // numeric class: font-feature-settings "tnum" 1, font-variant-numeric tabular-nums.
        className={rest.className}
        {...rest}
      />
    );
  },
);
PercentInput.displayName = "PercentInput";
