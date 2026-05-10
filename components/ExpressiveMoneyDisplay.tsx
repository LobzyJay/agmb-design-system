"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { formatNgn, formatNgnCompact, NGN } from "@/lib/money";

// AGMB ExpressiveMoneyDisplay — Wise-derived primitive (PRD §4.5 + §5.1).
//
// Hero-scale money output — Geist Mono XL, currency prefix, animated counter.
// Distinct visual register from <MoneyInput> on purpose: input is "what I entered",
// output is "what it costs me". The calculator §05 leans on this contrast.
//
// Sizes:
//   xl — the §05 hero monthly repayment (`₦485,720`). 56px desktop / 40px mobile per PRD §4.1.
//   m  — total interest, total repayment, paired summary lines. 24px desktop / 20px mobile.
//   sm — inline numeric mention in body copy. 16/16.
//
// Animation:
//   Counter interpolates from previous value to new value across 300ms (PRD §4.3
//   --motion-duration-base). Disabled when prefers-reduced-motion: reduce.
//
// Compact mode collapses ₦39,200,000 → ₦39.2M for the summary lines.

export type ExpressiveMoneyDisplaySize = "xl" | "m" | "sm";

export interface ExpressiveMoneyDisplayProps {
  /** Numeric value to display. Use `null` for the empty/before-input state. */
  value: number | null;
  /** Optional eyebrow label rendered above the value (Inter eyebrow style). */
  label?: React.ReactNode;
  /** Optional sub-line rendered below (e.g. "/month"). */
  trailing?: React.ReactNode;
  size?: ExpressiveMoneyDisplaySize;
  /** Compact format — ₦39.2M / ₦1.4B / falls back to full below 1M. */
  compact?: boolean;
  /** Light mode for navy backgrounds — flips text colour to ag-cream. */
  inverse?: boolean;
  /** Animate transitions between values. Default true; respects prefers-reduced-motion. */
  animate?: boolean;
  className?: string;
  /** ARIA polite live region — set true on the calculator output (PRD §6 a11y). */
  ariaLive?: boolean;
}

const SIZE_CLASS: Record<ExpressiveMoneyDisplaySize, string> = {
  xl: "text-5xl md:text-6xl leading-none",   // ~56px desktop / 48px mobile
  m:  "text-2xl leading-tight",
  sm: "text-base leading-tight",
};

function useAnimatedNumber(target: number | null, animate: boolean): number | null {
  const [display, setDisplay] = React.useState<number | null>(target);
  const frameRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number>(0);
  const fromRef = React.useRef<number>(target ?? 0);

  React.useEffect(() => {
    if (target === null) {
      setDisplay(null);
      return;
    }
    if (!animate) {
      setDisplay(target);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const from = display ?? 0;
    fromRef.current = from;
    startRef.current = performance.now();
    const duration = 300; // PRD §4.3 --motion-duration-base

    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // We intentionally only trigger on `target` change, not `display`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, animate]);

  return display;
}

export const ExpressiveMoneyDisplay: React.FC<ExpressiveMoneyDisplayProps> = ({
  value,
  label,
  trailing,
  size = "xl",
  compact = false,
  inverse = false,
  animate = true,
  className,
  ariaLive,
}) => {
  const animated = useAnimatedNumber(value, animate);
  const formatted = animated === null
    ? null
    : compact
      ? formatNgnCompact(animated)
      : formatNgn(animated);

  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      aria-live={ariaLive ? "polite" : undefined}
      aria-atomic={ariaLive ? "true" : undefined}
    >
      {label && (
        <p className={cn(
          "eyebrow",
          inverse && "!text-ag-gold",
        )}>
          {label}
        </p>
      )}
      <p
        className={cn(
          /* pair.numeric.emphasis (2026-05-09): the XL hero monthly repayment
             on a light surface (calculator output panel · hero stats) renders
             in navy.vivid. The single most-distinctive colour move in AGMB,
             rationed to one moment per viewport. On dark / inverse, keep cream.
             Smaller sizes also follow the rule for consistency. */
          "numeric font-medium tabular-nums tracking-tight",
          SIZE_CLASS[size],
          inverse ? "text-ag-cream" : "text-ag-navy-vivid",
        )}
        data-empty={formatted === null || undefined}
      >
        {formatted === null ? (
          <span className={cn(inverse ? "text-ag-cream/40" : "text-ag-muted/60")}>—</span>
        ) : (
          <>
            <span className={cn(inverse ? "text-ag-cream-warm" : "text-ag-navy-vivid", "mr-1")}>{NGN}</span>
            {formatted}
          </>
        )}
      </p>
      {trailing && (
        <p className={cn(
          "text-sm",
          inverse ? "text-ag-cream/70" : "text-ag-muted",
        )}>
          {trailing}
        </p>
      )}
    </div>
  );
};
ExpressiveMoneyDisplay.displayName = "ExpressiveMoneyDisplay";
