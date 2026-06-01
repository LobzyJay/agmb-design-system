import * as React from "react";
import { cn } from "@/lib/cn";
import { Fact, type FactProps } from "@/components/Fact";
import { Hairline } from "@/components/Hairline";

// AGMB FactStrip — the cream pill of facts that overlays the bottom of the hero
// ("leaking" up over the viz). Hairline dividers between facts.

export interface FactStripProps {
  facts: Omit<FactProps, "surface">[];
  leaking?: boolean;
  className?: string;
}

export const FactStrip: React.FC<FactStripProps> = ({ facts, leaking, className }) => (
  <div
    className={cn(
      "mx-auto flex max-w-[1100px] items-stretch gap-8 rounded-xl bg-cream-warm px-8 py-7 md:px-12 md:py-8",
      leaking && "relative z-[1] -mt-16 md:-mt-24",
      className,
    )}
  >
    {facts.map((f, i) => (
      <React.Fragment key={i}>
        {i > 0 && <Hairline surface="cream" orientation="vertical" />}
        <Fact {...f} surface="cream" className="flex-1" />
      </React.Fragment>
    ))}
  </div>
);
