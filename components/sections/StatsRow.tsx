import * as React from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/Eyebrow";
import { Fact, type FactProps } from "@/components/Fact";

// AGMB StatsRow — the cream stats band: an eyebrow + H2 head over a row of facts.

export interface StatsRowProps {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  stats: Omit<FactProps, "surface">[];
  className?: string;
}

export const StatsRow: React.FC<StatsRowProps> = ({ eyebrow, heading, stats, className }) => (
  <section className={cn("bg-cream-warm px-6 py-24 md:px-10", className)}>
    <div className="mx-auto max-w-[1400px]">
      <header className="mb-12 flex flex-col gap-3">
        {eyebrow && <Eyebrow dot="green" className="text-text-muted-on-cream">{eyebrow}</Eyebrow>}
        <h2 className="h2 text-navy-deep">{heading}</h2>
      </header>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Fact key={i} {...s} surface="cream" />
        ))}
      </div>
    </div>
  </section>
);
