"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Wizard progress primitives — PRD §4.5 + §5.3.
//
// Two paired primitives, exported from one file:
//   <WizardProgressBar>   — quantitative, % complete
//   <WizardStepDots>      — qualitative, anchored step names
//
// Wise discipline: bar + dots are paired, never standalone. Bar shows progress;
// dots show position. Together they tell the user where they are and how far they
// have to go (PRD §5.3 — replaces step-dots-only spec from v2).

export interface WizardProgressBarProps {
  /** 0–1 (preferred) or 0–100. Auto-detects scale. */
  value: number;
  /** Optional label — when present, renders to the right of the bar (Inter eyebrow). */
  label?: React.ReactNode;
  className?: string;
}

export const WizardProgressBar: React.FC<WizardProgressBarProps> = ({ value, label, className }) => {
  const percent = Math.max(0, Math.min(100, value > 1 ? value : value * 100));
  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div
        className="relative flex-1 h-0.5 bg-ag-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        aria-label={typeof label === "string" ? label : "Progress"}
      >
        <div
          className="absolute inset-y-0 left-0 bg-ag-gold rounded-full transition-token-base"
          style={{ width: `${percent}%` }}
        />
      </div>
      {label && (
        <span className="numeric text-xs text-ag-muted shrink-0">{label}</span>
      )}
    </div>
  );
};

export interface WizardStep {
  id: string;
  label: string;
}

export type WizardStepStatus = "pending" | "active" | "complete";

export interface WizardStepDotsProps {
  steps: WizardStep[];
  /** Index of the current step (0-based). All steps before are complete; after are pending. */
  currentIndex: number;
  /** Click handler — only fires for completed steps (returning to a previous step). */
  onStepClick?: (id: string, index: number) => void;
  className?: string;
}

export const WizardStepDots: React.FC<WizardStepDotsProps> = ({
  steps,
  currentIndex,
  onStepClick,
  className,
}) => {
  return (
    <ol className={cn("flex items-start gap-1 w-full", className)}>
      {steps.map((step, i) => {
        const status: WizardStepStatus =
          i < currentIndex ? "complete" : i === currentIndex ? "active" : "pending";
        const isClickable = status === "complete" && !!onStepClick;
        return (
          <li key={step.id} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <button
              type="button"
              disabled={!isClickable}
              onClick={isClickable ? () => onStepClick!(step.id, i) : undefined}
              aria-current={status === "active" ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${step.label} — ${status}`}
              className={cn(
                "shrink-0 w-5 h-5 rounded-full border-2 transition-token flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 focus-visible:ring-offset-ag-cream",
                status === "active" && "bg-ag-gold border-ag-gold text-ag-navy",
                status === "complete" && "bg-ag-gold border-ag-gold text-ag-navy",
                status === "pending" && "bg-transparent border-ag-border",
                isClickable && "cursor-pointer hover:scale-110",
                !isClickable && "cursor-default",
              )}
            >
              {status === "complete" && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6.5l2.5 2.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span
              className={cn(
                "text-xs leading-snug text-center truncate w-full",
                status === "active" && "text-ag-navy font-semibold",
                status === "complete" && "text-ag-muted",
                status === "pending" && "text-ag-muted",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
