"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB PercentInput — sibling of MoneyInput with a trailing % suffix.

export interface PercentInputProps {
  value: number;
  onChange?: (value: number) => void;
  id?: string;
  className?: string;
  "aria-label"?: string;
}

export const PercentInput: React.FC<PercentInputProps> = ({ value, onChange, id, className, "aria-label": ariaLabel }) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-sm border border-navy-deep/12 bg-white px-4 py-3 focus-within:border-navy-vivid",
      className,
    )}
  >
    <input
      id={id}
      inputMode="decimal"
      aria-label={ariaLabel}
      className="numeric w-full bg-transparent text-base text-navy-deep outline-none"
      style={{ fontSize: 16 }}
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange?.(Number(e.target.value.replace(/[^0-9.]/g, "")))}
    />
    <span className="numeric text-base text-text-muted-on-cream" style={{ fontSize: 16 }} aria-hidden>
      %
    </span>
  </div>
);
