"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB RepaymentSplitBar — PRD §5.1 calculator output enhancement
// (research §3 P1 · Mercury-grade restraint).
//
// One horizontal bar, two segments — Principal vs Interest across the full
// tenure. The single most-consequential glanceable insight on a 20–30-year
// mortgage decision: how much of what you pay is principal vs interest.
//
// Anatomy (updated 2026-05-09 v4 restyle):
//   ┌──────────────────────────────────────────────────────────────┐
//   │ [PRINCIPAL →]          [INTEREST →]                          │ ← above-bar annotations
//   │ ████████████████████████ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                   │ ← 12px height · radius.full
//   │          principal               interest                    │ ← inline labels (≥ 40% only)
//   │                                                              │
//   │ narrow (< 240px): inline labels hidden, legend row below     │
//   │ ■ Principal · ₦60.0M    ■ Interest · ₦39.2M                  │
//   └──────────────────────────────────────────────────────────────┘
//
// Label threshold logic:
//   · Both segments ≥ 40% → inline labels inside each segment
//   · Any segment < 40%   → that label shifts ABOVE the bar as an annotation
//                           with a → pointer glyph
//   · Bar width < 240px   → all inline labels hidden; one-line legend below
//
// Tokens (Adewale 2026-05-09 v3 dual-blue swap):
//   surface (light bg)  · principal=ag-navy-vivid  · interest=ag-navy-deep
//   surface (inverse)   · principal=ag-cream       · interest=ag-navy-vivid
//   radius              · radius.full
//   motion              · transition flex-basis @ var(--motion-duration-base) var(--motion-ease-default)
//
// Colour reasoning: the bar is a dual-blue composition. Vivid blue takes the
// spotlight (principal — what you actually own); deep navy carries the rest
// (interest — the cost of borrowing). Gold demoted from the chart per v3.
//
// Accessibility:
//   role="img" with composed aria-label → screen readers read the breakdown
//   even though the absolute totals already render in the stat grid above.
//   Reduced-motion: globals.css `prefers-reduced-motion: reduce` collapses
//   the transition to <0.01ms via the global media query.

export interface RepaymentSplitBarProps {
  /** Principal across the full tenure (₦). */
  principal: number;
  /** Total interest across the full tenure (₦). */
  totalInterest: number;
  /** Inverse variant — for navy / dark surfaces (the calculator's input panel). */
  inverse?: boolean;
  className?: string;
}

// A segment must occupy ≥ this percent to show its label INSIDE the bar.
// Below this, the label shifts ABOVE the bar as an annotation.
// 35% (lowered from 40% 2026-05-09): DEFAULT 60/40 stays inline;
// HEAVY 33/67 alone triggers above-bar for the interest segment.
const INLINE_LABEL_THRESHOLD = 35;

// Bar must be at least this wide (px) to show any inline labels.
// Below this, all labels are hidden and a legend row renders below.
const NARROW_BAR_PX = 240;

function fmtCompact(n: number): string {
  // Compact ₦ display — ₦39,200,000 → ₦39.2M. Consistent with
  // ExpressiveMoneyDisplay's compact mode.
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${Math.round(n).toLocaleString()}`;
}

export const RepaymentSplitBar: React.FC<RepaymentSplitBarProps> = ({
  principal,
  totalInterest,
  inverse,
  className,
}) => {
  const barRef = React.useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = React.useState(false);

  // ResizeObserver — detect when bar collapses below NARROW_BAR_PX.
  // Falls back gracefully when ResizeObserver is unavailable (test envs, very
  // old Safari). The initial measurement runs after first paint.
  React.useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const measure = () => setIsNarrow(el.offsetWidth < NARROW_BAR_PX);
    measure(); // initial

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = principal + totalInterest;

  // ── Empty / loading state ──────────────────────────────────────────
  // Total is 0, no useful split to draw. Render a shimmer skeleton so
  // the layout placeholder reads "loading" not "broken".
  if (total <= 0) {
    return (
      <div
        ref={barRef}
        className={cn(
          "agmb-splitbar-skeleton relative h-3 w-full overflow-hidden rounded-full",
          inverse ? "bg-ag-cream/10" : "bg-ag-light",
          className,
        )}
        role="img"
        aria-label="No repayment to split — enter values to see breakdown."
      >
        {/* Shimmer overlay — animated via @keyframes splitbar-shimmer in globals.css.
            Gated by prefers-reduced-motion: the keyframes block is inside a
            @media (prefers-reduced-motion: no-preference) query, so this element
            renders as a static subdued fill in reduced-motion environments. */}
        <div
          className={cn(
            "agmb-splitbar-shimmer absolute inset-0",
            inverse ? "opacity-20" : "opacity-100",
          )}
          aria-hidden="true"
        />
      </div>
    );
  }

  // ── Split state ────────────────────────────────────────────────────
  const principalPct = (principal / total) * 100;
  const interestPct = 100 - principalPct;

  // Dual-blue swap (Adewale 2026-05-09 v3): principal lifts to navy.vivid as
  // the emphasis stop; interest sits on navy.deep as the quieter dark navy.
  // On inverse navy surfaces both stops shift one slot lighter — principal
  // pops to cream, interest holds at navy.vivid.
  const principalSegmentColor = inverse ? "bg-ag-cream" : "bg-ag-navy-vivid";
  const interestSegmentColor = inverse ? "bg-ag-navy-vivid" : "bg-ag-navy-deep";

  // Label colours: each label sits inside its own segment.
  const principalLabelColor = inverse ? "text-ag-navy" : "text-ag-cream-warm";
  const interestLabelColor = inverse ? "text-ag-cream-warm" : "text-ag-cream-warm";

  // Above-bar annotation colours (muted, on whatever container surface sits
  // behind the bar). Inverse variant inherits --comp-text-muted-on-surface
  // with a fallback to ag-cream-warm for when the FOUNDATION lane token
  // hasn't landed yet.
  const annotationClass = inverse
    ? "text-xs tracking-wide uppercase"
    : "text-ag-muted text-xs tracking-wide uppercase";
  const annotationStyle = inverse
    ? { color: "var(--comp-text-muted-on-surface, var(--ag-cream-warm))" }
    : undefined;

  // Determine per-segment label strategy:
  //   "inline"  — label renders inside the segment
  //   "above"   — label shifts to the annotation row above the bar
  //   "hidden"  — bar too narrow, legend row below handles it
  const principalStrategy = isNarrow
    ? "hidden"
    : principalPct >= INLINE_LABEL_THRESHOLD
      ? "inline"
      : "above";
  const interestStrategy = isNarrow
    ? "hidden"
    : interestPct >= INLINE_LABEL_THRESHOLD
      ? "inline"
      : "above";

  const showAboveRow = principalStrategy === "above" || interestStrategy === "above";

  const ariaLabel = `Principal ${fmtCompact(principal)}, interest ${fmtCompact(totalInterest)}.`;

  return (
    <div ref={barRef} className={cn("w-full", className)}>
      {/* ── Above-bar annotation row ────────────────────────────────
          Renders only when at least one segment is too narrow for an
          inline label but the bar itself is wide enough for legend.
          Each annotation is positioned absolutely over its segment's
          horizontal span so the → pointer is unambiguous. */}
      {showAboveRow && (
        <div className="relative mb-1 flex w-full" aria-hidden="true">
          {principalStrategy === "above" && (
            <span
              className={annotationClass}
              style={{
                ...annotationStyle,
                width: `${principalPct}%`,
                display: "block",
                textAlign: "center",
              }}
            >
              principal →
            </span>
          )}
          {interestStrategy === "above" && (
            <span
              className={annotationClass}
              style={{
                ...annotationStyle,
                width: `${interestPct}%`,
                marginLeft: principalStrategy !== "above" ? `${principalPct}%` : undefined,
                display: "block",
                textAlign: "center",
              }}
            >
              interest →
            </span>
          )}
        </div>
      )}

      {/* ── Bar track ──────────────────────────────────────────────── */}
      <div
        className="flex w-full overflow-hidden rounded-full"
        style={{ height: 12 }}
        role="img"
        aria-label={ariaLabel}
      >
        {/* Principal segment — flex-basis is the GPU-composited animatable
            property (we never animate width directly, per design-taste-frontend §5). */}
        <div
          className={cn(
            "agmb-split-segment relative flex items-center justify-end",
            principalSegmentColor,
          )}
          style={{ flexBasis: `${principalPct}%` }}
        >
          {principalStrategy === "inline" && (
            <span
              className={cn(
                "numeric pr-2 text-[11px] uppercase tracking-[0.08em] font-medium leading-none",
                principalLabelColor,
              )}
            >
              principal
            </span>
          )}
        </div>

        {/* Interest segment */}
        <div
          className={cn(
            "agmb-split-segment relative flex items-center justify-end",
            interestSegmentColor,
          )}
          style={{ flexBasis: `${interestPct}%` }}
        >
          {interestStrategy === "inline" && (
            <span
              className={cn(
                "numeric pr-2 text-[11px] uppercase tracking-[0.08em] font-medium leading-none",
                interestLabelColor,
              )}
            >
              interest
            </span>
          )}
        </div>
      </div>

      {/* ── Narrow-bar legend row ────────────────────────────────────
          Renders when bar is < 240px wide. Inline labels are all hidden;
          this one-line legend carries the labelling duty instead.
          ■ glyphs use the matching segment colour via inline style.    */}
      {isNarrow && (
        <div className="mt-1.5 flex items-center gap-3" aria-hidden="true">
          <span className="text-ag-muted text-xs flex items-center gap-1">
            <span
              style={{
                color: inverse ? "var(--ag-cream)" : "var(--ag-navy-vivid)",
              }}
            >
              &#9632;
            </span>
            Principal · {fmtCompact(principal)}
          </span>
          <span className="text-ag-muted text-xs flex items-center gap-1">
            <span
              style={{
                color: inverse ? "var(--ag-navy-vivid)" : "var(--ag-navy-deep)",
              }}
            >
              &#9632;
            </span>
            Interest · {fmtCompact(totalInterest)}
          </span>
        </div>
      )}
    </div>
  );
};
RepaymentSplitBar.displayName = "RepaymentSplitBar";
