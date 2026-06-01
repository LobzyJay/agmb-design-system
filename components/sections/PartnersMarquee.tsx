import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB PartnersMarquee — a seamless, edge-faded scroll of partner logos/labels.
// Track is duplicated for the loop; a mask fades both edges.

export interface PartnersMarqueeProps {
  items: React.ReactNode[];
  durationSeconds?: number;
  className?: string;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ items, durationSeconds = 48, className }) => {
  const loop = [...items, ...items];
  const mask = "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)";
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ maskImage: mask, WebkitMaskImage: mask }}>
      <div className="agmb-marquee-track flex w-max items-center gap-16" style={{ animationDuration: `${durationSeconds}s` }}>
        {loop.map((item, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center text-cream-warm/70">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
