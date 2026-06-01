import * as React from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";

// AGMB AdvisoryBand — the pre-footer CTA band: navy-vivid surface, gold radial
// wash, cream pill CTA, and a right-aligned stat whose lead figure is a serif accent.

export interface AdvisoryBandProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  copy?: React.ReactNode;
  cta?: { label: string; href: string };
  stat?: { accent?: React.ReactNode; value?: React.ReactNode; sub?: React.ReactNode };
  className?: string;
}

export const AdvisoryBand: React.FC<AdvisoryBandProps> = ({ eyebrow, title, copy, cta, stat, className }) => (
  <section className={cn("bg-black px-6 py-20 md:px-20", className)}>
    <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8 overflow-hidden rounded-2xl bg-navy-vivid p-8 md:flex-row md:items-center md:justify-between md:p-12">
      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(600px 300px at 90% -20%, rgba(224,176,64,0.14), transparent 60%)" }} />
      <div className="relative z-[2] flex max-w-2xl flex-col gap-3">
        {eyebrow && <Eyebrow dot="gold" className="text-text-faint-on-navy">{eyebrow}</Eyebrow>}
        <p className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-cream-warm">{title}</p>
        {copy && <p className="text-[15px] leading-relaxed text-text-muted-on-navy">{copy}</p>}
      </div>
      <div className="relative z-[2] flex shrink-0 items-center gap-8">
        {cta && <Button variant="primary" href={cta.href} className="rounded-pill">{cta.label}</Button>}
        {stat && (
          <div className="text-right">
            <p className="text-[56px] font-medium leading-none tracking-[-0.05em] text-cream-warm">
              {stat.accent && <span className="mr-1.5 align-baseline text-[64px] tracking-[-0.04em] text-green-vivid" style={{ fontFamily: "var(--font-serif)" }}>{stat.accent}</span>}
              {stat.value}
            </p>
            {stat.sub && <p className="ml-auto mt-2.5 max-w-[240px] text-[13px] leading-snug text-text-muted-on-navy">{stat.sub}</p>}
          </div>
        )}
      </div>
    </div>
  </section>
);
