import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB FactStrip — uses the site's verbatim .fact-strip / .fact CSS.

export interface FactItem {
  label: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
  dot?: "gold" | "green" | "navy";
}

const DOT: Record<string, string> = { gold: "#F0C441", green: "#22C55E", navy: "#1F4FA8" };

export interface FactStripProps {
  facts: FactItem[];
  className?: string;
}

export const FactStrip: React.FC<FactStripProps> = ({ facts, className }) => (
  <div className={cn("fact-strip", className)}>
    {facts.map((f, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="divider" />}
        <div className="fact">
          <span className="fact__eyebrow">
            <span style={{ background: DOT[f.dot ?? "gold"] }} />
            <span>{f.label}</span>
          </span>
          <span className="fact__numeric">{f.value}</span>
          {f.caption && <span className="fact__caption">{f.caption}</span>}
        </div>
      </React.Fragment>
    ))}
  </div>
);
