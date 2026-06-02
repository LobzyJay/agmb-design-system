import * as React from "react";
import { cn } from "@/lib/cn";
import { Eyebrow, type EyebrowDot } from "@/components/Eyebrow";

// AGMB Fact — a single stat unit from the site's .fact / .stat: a dotted eyebrow,
// a large Inter Tight tabular numeric, and a caption. Used in the fact-strip and
// stats row. `surface` controls the text contrast (navy text on cream, etc.).

export interface FactProps {
  label: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
  dot?: EyebrowDot;
  surface?: "cream" | "navy";
  className?: string;
}

export const Fact: React.FC<FactProps> = ({ label, value, caption, dot = "gold", surface = "cream", className }) => {
  const onCream = surface === "cream";
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Eyebrow dot={dot} className={onCream ? "text-text-muted-on-cream" : "text-text-muted-on-navy"}>
        {label}
      </Eyebrow>
      <span className={cn("numeric", onCream ? "text-navy-deep" : "text-cream-warm")}>{value}</span>
      {caption && (
        <span className={cn("caption", onCream ? "text-text-muted-on-cream" : "text-text-muted-on-navy")}>
          {caption}
        </span>
      )}
    </div>
  );
};
