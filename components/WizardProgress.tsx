import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB WizardProgress — the apply form's .progress step indicator: numbered steps
// with done / active / pending states, joined by a hairline.

export interface WizardProgressProps {
  steps: string[];
  current: number;
  surface?: "cream" | "navy";
  className?: string;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ steps, current, surface = "cream", className }) => {
  const onCream = surface === "cream";
  return (
    <ol className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                active ? "bg-navy-vivid text-cream-warm" : done ? "bg-green-vivid text-navy-deep" : onCream ? "bg-navy-deep/10 text-navy-deep/50" : "bg-cream-warm/10 text-cream-warm/50",
              )}
              style={{ fontFamily: "var(--font-numeric)" }}
            >
              {done ? "✓" : i + 1}
            </span>
            <span className={cn("text-[13px]", active ? (onCream ? "text-navy-deep" : "text-cream-warm") : onCream ? "text-navy-deep/50" : "text-cream-warm/50")} style={{ fontFamily: "var(--font-sans)" }}>
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
