import * as React from "react";
import { cn } from "@/lib/cn";
import { StatusLine } from "@/components/StatusLine";
import { Button } from "@/components/Button";
import { FactStrip } from "@/components/sections/FactStrip";
import type { FactProps } from "@/components/Fact";

// AGMB Hero — the centred opening: status line, an Inter H1 with a green serif-italic
// accent word, lede, dual CTAs, a viz panel, and the leaking fact strip.
// The viz is a static fallback panel here; the canvas building lands in Phase 5.

export interface HeroProps {
  status: React.ReactNode[];
  /** Heading parts; a part with `accent: true` renders as the serif-italic word. */
  heading: { text: string; accent?: boolean }[];
  lede: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  facts: Omit<FactProps, "surface">[];
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ status, heading, lede, primary, secondary, facts, className }) => (
  <section className={cn("relative bg-navy-deep", className)}>
    <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-6 pb-8 pt-20 text-center md:pt-28">
      <StatusLine items={status} />
      <h1 className="h1 max-w-3xl text-cream-warm">
        {heading.map((p, i) => (
          <React.Fragment key={i}>
            {p.accent ? <span className="serif-accent">{p.text}</span> : p.text}
          </React.Fragment>
        ))}
      </h1>
      <p className="lede max-w-xl text-text-muted-on-navy">{lede}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {primary && <Button variant="primary" href={primary.href}>{primary.label}</Button>}
        {secondary && <Button variant="secondary" href={secondary.href}>{secondary.label}</Button>}
      </div>

      {/* Viz — static fallback (canvas building in Phase 5) */}
      <div
        className="mt-10 h-[280px] w-full max-w-3xl rounded-2xl border border-cream-warm/10 md:h-[360px]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(31,79,168,0.25), transparent 60%), repeating-linear-gradient(90deg, rgba(250,243,232,0.06) 0 1px, transparent 1px 28px), repeating-linear-gradient(0deg, rgba(250,243,232,0.06) 0 1px, transparent 1px 28px)",
        }}
        aria-hidden
      />
    </div>

    <div className="px-6 pb-10 md:px-10">
      <FactStrip facts={facts} leaking />
    </div>
  </section>
);
