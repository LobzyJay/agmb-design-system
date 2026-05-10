"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { GoldShader } from "@/components/GoldShader";

// AGMB SuccessScreen — Wise pattern (PRD §4.5 + §5.3 wizard post-submit).
// Reference number + next steps + secondary actions. Replaces the wizard
// view on submit success.
//
// Anatomy:
//   ✓                                       ← <GoldShader shape="tick" /> celebration glyph
//   Application received.                   ← bi-serif XL navy
//   AGMB-2026-0048213                        ← reference (.numeric · Inter Tight tabular, navy.vivid)
//
//   What happens next:
//   1. A mortgage advisor will call within 2 working days.
//   2. We'll email an offer letter once your application clears credit assessment.
//   3. Sign the offer to lock the indicative rate.
//
//   [ Download PDF copy ]   [ Calculate another scenario ]   [ Return home ]
//
// Adewale 2026-05-09 v4: the celebration tick is now a procedural metallic
// gold canvas (GoldShader) — multi-layer composition with eased orbit + apex
// catch. Reads as warm metal under spot light, the single sanctioned gold
// surface remaining after the v3 demotion. Reference number stays in
// navy.vivid (the new emphasis register) — gold is decorative-only.

export interface SuccessScreenProps {
  title: React.ReactNode;
  /** Reference number — rendered via `.numeric` (Inter Tight tabular), gold. */
  reference?: React.ReactNode;
  /** "What happens next" — ordered list. */
  steps?: React.ReactNode[];
  /** Secondary action row. */
  actions?: React.ReactNode;
  /** Optional decorative glyph above the title. */
  icon?: React.ReactNode;
  /** Compact — sits inline rather than full-screen. */
  compact?: boolean;
  className?: string;
}

const DefaultTickIcon = () => <GoldShader shape="tick" size={56} />;

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  reference,
  steps,
  actions,
  icon,
  compact = false,
  className,
}) => (
  <section
    className={cn(
      "flex flex-col gap-6 max-w-xl mx-auto text-center",
      compact ? "py-8 px-4" : "py-20 px-6",
      className,
    )}
    role="status"
    aria-live="polite"
  >
    <div className="self-center">{icon ?? <DefaultTickIcon />}</div>
    <h2 className="bi-display text-ag-navy text-4xl md:text-5xl leading-tight tracking-tight">
      <span className="bi-serif">{title}</span>
    </h2>
    {reference && (
      /* pair.numeric.emphasis (Adewale 2026-05-09 v3 gold demotion):
         reference number renders in navy.vivid — the new emphasis register.
         Reference is a celebration moment but stays disciplined to the new
         dual-blue + vivid emphasis system; gold demoted from text emphasis. */
      <p className="numeric text-ag-navy-vivid text-xl tracking-wider">{reference}</p>
    )}
    {steps && steps.length > 0 && (
      <div className="text-left bg-ag-cream border border-ag-border rounded-lg p-6 mt-4">
        <p className="eyebrow mb-3 !text-ag-navy">What happens next</p>
        <ol className="flex flex-col gap-3 numeric-counter">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-snug text-ag-text">
              <span className="numeric font-semibold text-ag-navy-vivid shrink-0 w-6">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    )}
    {actions && <div className="flex flex-wrap items-center justify-center gap-3 mt-2">{actions}</div>}
  </section>
);
SuccessScreen.displayName = "SuccessScreen";
