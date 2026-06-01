"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB MoneyInput — naira-prefixed, comma-grouped numeric input (Inter Tight,
// tabular). The ₦ prefix sits inside a 12px-radius field on the cream panel.

export interface MoneyInputProps {
  value: number;
  onChange?: (value: number) => void;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

const fmt = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-NG") : "");

export const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange, id, className, "aria-label": ariaLabel }) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-sm border border-navy-deep/12 bg-white px-4 py-3 focus-within:border-navy-vivid",
      className,
    )}
  >
    <span className="numeric text-base text-text-muted-on-cream" style={{ fontSize: 16 }} aria-hidden>
      ₦
    </span>
    <input
      id={id}
      inputMode="numeric"
      aria-label={ariaLabel}
      className="numeric w-full bg-transparent text-base text-navy-deep outline-none"
      style={{ fontSize: 16 }}
      value={fmt(value)}
      onChange={(e) => onChange?.(Number(e.target.value.replace(/[^0-9]/g, "")))}
    />
  </div>
);
