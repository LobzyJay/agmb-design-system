"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Slider — the site's .field range control: a label row (name + live value)
// over a styled range input. Tuned for the cream calculator input panel.

export interface SliderProps {
  label: React.ReactNode;
  /** Pre-formatted display of the current value (e.g. "₦116,500,000"). */
  display?: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  "aria-label"?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  display,
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  "aria-label": ariaLabel,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-text-muted-on-cream" style={{ fontFamily: "var(--font-sans)" }}>
        {label}
      </span>
      {display != null && (
        <span className="text-[13px] text-text-muted-on-cream" style={{ fontFamily: "var(--font-sans)" }}>
          {display}
        </span>
      )}
    </div>
    <input
      type="range"
      className="agmb-slider mt-3"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange?.(Number(e.target.value))}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
    />
  </div>
);
