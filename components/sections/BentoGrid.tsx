import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB BentoTile / BentoGrid — the product grid. A flagship tile beside a stack,
// with a viz panel per tile (static fallback here; canvas in Phase 5).
// Each tile: icon + category eyebrow, pinned rate, name, copy, link.

export interface BentoTileProps {
  category: React.ReactNode;
  name: React.ReactNode;
  copy: React.ReactNode;
  rate?: React.ReactNode;
  href?: string;
  flagship?: boolean;
  /** Accent colour for the viz wash (per-product). */
  accent?: string;
  className?: string;
}

export const BentoTile: React.FC<BentoTileProps> = ({ category, name, copy, rate, href, flagship, accent = "var(--color-navy-vivid)", className }) => {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className={cn(
        "group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-cream-warm/10 bg-navy p-7 transition",
        href && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-tile-hover)]",
        flagship ? "md:row-span-2" : "",
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 80% at 80% 0%, color-mix(in srgb, ${accent} 22%, transparent), transparent 60%)` }} />
      <div className="relative z-[1] flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-on-navy">{category}</span>
        {rate && <span className="numeric text-cream-warm" style={{ fontSize: 20 }}>{rate}</span>}
      </div>
      <div className="relative z-[1] flex flex-col gap-2">
        <h3 className={cn("font-medium tracking-[-0.03em] text-cream-warm", flagship ? "text-3xl" : "text-2xl")}>{name}</h3>
        <p className="text-sm leading-relaxed text-text-muted-on-navy">{copy}</p>
        {href && <span className="mt-2 text-sm text-gold-vivid transition group-hover:gap-2">Explore →</span>}
      </div>
    </Tag>
  );
};

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => (
  <section className={cn("bg-black px-6 py-24 md:px-10", className)}>
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
  </section>
);
