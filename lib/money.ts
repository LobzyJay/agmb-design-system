// AGMB money utilities — Nigerian Naira (₦) formatting + parsing.
// Used by <MoneyInput> and <ExpressiveMoneyDisplay>. Single source for the
// rules so the input and the output never disagree.

export const NGN = "₦";

/** Format a number as `₦5,000,000`. Returns the prefix-less string by default. */
export function formatNgn(value: number, opts: { prefix?: boolean; decimals?: number } = {}): string {
  if (!Number.isFinite(value)) return "";
  const { prefix = false, decimals = 0 } = opts;
  const formatted = value.toLocaleString("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return prefix ? `${NGN}${formatted}` : formatted;
}

/** Compact format — `₦39.2M`, `₦1.4B`, `₦485,720`. Falls back to full format below 1M. */
export function formatNgnCompact(value: number, opts: { prefix?: boolean } = {}): string {
  if (!Number.isFinite(value)) return "";
  const { prefix = false } = opts;
  const abs = Math.abs(value);
  let body: string;
  if (abs >= 1_000_000_000) body = `${(value / 1_000_000_000).toFixed(1)}B`;
  else if (abs >= 1_000_000) body = `${(value / 1_000_000).toFixed(1)}M`;
  else body = formatNgn(value);
  return prefix ? `${NGN}${body}` : body;
}

/** Parse a user-typed or pasted string into a number. Strips ₦, commas, whitespace. */
export function parseNgn(input: string): number | null {
  const cleaned = input.replace(/[₦\s,]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Clamp a parsed value to [min, max]. Returns the clamped number, or null if input is null. */
export function clampNgn(value: number | null, min: number, max: number): number | null {
  if (value === null) return null;
  return Math.min(Math.max(value, min), max);
}
