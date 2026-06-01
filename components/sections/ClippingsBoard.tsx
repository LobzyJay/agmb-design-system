import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Insights ClippingsBoard — torn-newspaper clippings (the site's .clipping
// CSS: paper bg, grain, clip-path torn edge, slight rotation) in a responsive grid.

export interface ClippingItem {
  source: React.ReactNode;
  headline: React.ReactNode;
  dek?: React.ReactNode;
  /** Paper/edge variant a–f (cycles if omitted). */
  variant?: "a" | "b" | "c" | "d" | "e" | "f";
}

const VARIANTS = ["a", "b", "c", "d", "e", "f"] as const;

export interface ClippingsBoardProps {
  clippings: ClippingItem[];
  className?: string;
}

export const ClippingsBoard: React.FC<ClippingsBoardProps> = ({ clippings, className }) => (
  <div className={cn("clippings-doc", className)}>
    {clippings.map((c, i) => (
      <article key={i} className={cn("clipping", `clipping--${c.variant ?? VARIANTS[i % VARIANTS.length]}`)}>
        <p className="clipping__source">{c.source}</p>
        <h3 className="clipping__headline">{c.headline}</h3>
        {c.dek && <p className="clipping__dek">{c.dek}</p>}
      </article>
    ))}
  </div>
);
