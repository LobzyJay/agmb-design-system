"use client";
import * as React from "react";
import { FormField, type FormFieldProps } from "./FormField";
import { formatNgn, parseNgn, clampNgn, NGN } from "@/lib/money";

// AGMB MoneyInput — Wise-derived primitive (PRD §4.5 + §5.1).
//
// Anatomy:
//   ┌────────────┐
//   │  Label     │
//   ├────────────┤
//   │ ₦ 5,000,000│  ← currency-prefixed, live-comma-formatted, paste-aware
//   ├────────────┤
//   │ Helper     │
//   └────────────┘
//
// - Strips ₦, commas, and whitespace on paste — `₦5,000,000` parses correctly.
// - Live re-formats on every keystroke without losing the caret on simple appends.
// - Optional min/max clamp on blur.
// - Emits both the formatted string and the parsed number via onValueChange.
//
// Used in: §05 calculator (property value, deposit, loan amount), Utility 3 wizard
// (income, debts, property value, loan amount, deposit).

export interface MoneyInputProps
  extends Omit<FormFieldProps, "onChange" | "value" | "defaultValue" | "type" | "prefix" | "inputMode"> {
  /** Numeric value (controlled). Use `null` for an empty field. */
  value?: number | null;
  /** Initial value (uncontrolled). */
  defaultValue?: number | null;
  /** Lower bound — clamps on blur. */
  min?: number;
  /** Upper bound — clamps on blur. */
  max?: number;
  /** Fired with the parsed numeric value on every change (post-format). */
  onValueChange?: (value: number | null) => void;
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, defaultValue = null, min, max, onValueChange, onBlur, ...rest }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue);
    const current = isControlled ? value ?? null : internalValue;
    const display = current === null ? "" : formatNgn(current);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseNgn(e.target.value);
      if (!isControlled) setInternalValue(parsed);
      onValueChange?.(parsed);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (min !== undefined || max !== undefined) {
        const clamped = clampNgn(current, min ?? -Infinity, max ?? Infinity);
        if (clamped !== current) {
          if (!isControlled) setInternalValue(clamped);
          onValueChange?.(clamped);
        }
      }
      onBlur?.(e);
    };

    return (
      <FormField
        ref={ref}
        prefix={NGN}
        inputMode="numeric"
        autoComplete="off"
        // Always render the formatted string. The input is always treated as
        // controlled internally so we can re-format every keystroke without
        // fighting React's defaultValue lifecycle.
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
    );
  },
);
MoneyInput.displayName = "MoneyInput";
