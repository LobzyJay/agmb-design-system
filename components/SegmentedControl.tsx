"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB SegmentedControl — the site's .seg: a green-vivid pill track with a sliding
// navy-deep indicator under the active item. Used to switch calculator scenarios.

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  "aria-label": ariaLabel = "Select",
  className,
}) => {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
  const active = controlled ? (value as string) : internal;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = React.useState({ left: 4, width: 0 });

  const measure = React.useCallback(() => {
    const t = trackRef.current;
    const el = refs.current[active];
    if (!t || !el) return;
    const tr = t.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInd({ left: er.left - tr.left, width: er.width });
  }, [active]);

  React.useLayoutEffect(() => measure(), [measure]);
  React.useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const pick = (v: string) => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div ref={trackRef} role="tablist" aria-label={ariaLabel} className={cn("relative inline-flex gap-1 rounded-pill bg-green-vivid p-1", className)}>
      <span
        aria-hidden
        className="absolute bottom-1 top-1 rounded-pill bg-navy-deep"
        style={{ left: ind.left, width: ind.width, transition: "left 280ms var(--ease-standard), width 280ms var(--ease-standard)" }}
      />
      {options.map((o) => {
        const on = o.value === active;
        return (
          <button
            key={o.value}
            ref={(n) => { refs.current[o.value] = n; }}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => pick(o.value)}
            className={cn(
              "relative z-[1] cursor-pointer whitespace-nowrap rounded-pill px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none",
              on ? "text-cream-warm" : "text-navy-deep",
            )}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};
