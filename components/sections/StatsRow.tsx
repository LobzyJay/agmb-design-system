import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB StatsRow — uses the site's verbatim .stat-row / .stat CSS (80px numerics).

export interface StatItem {
  eyebrow: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
}

export interface StatsRowProps {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  stats: StatItem[];
  className?: string;
}

export const StatsRow: React.FC<StatsRowProps> = ({ eyebrow, heading, stats, className }) => (
  <div className={cn("flex flex-col gap-16", className)}>
    {(eyebrow || heading) && (
      <header className="flex flex-col gap-4">
        {eyebrow && (
          <span className="flex items-center gap-2.5">
            <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-vivid)" }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(6,26,46,0.7)", fontFamily: "var(--font-sans)" }}>{eyebrow}</span>
          </span>
        )}
        {heading && <h2 className="h2" style={{ color: "var(--navy-deep)" }}>{heading}</h2>}
      </header>
    )}
    <div className="stat-row">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <span className="stat__eyebrow">{s.eyebrow}</span>
          <span className="stat__numeric">{s.value}</span>
          {s.caption && <span className="stat__cap">{s.caption}</span>}
        </div>
      ))}
    </div>
  </div>
);
