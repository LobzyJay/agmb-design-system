import * as React from "react";
import { cn } from "@/lib/cn";
import { TileViz } from "@/components/viz/TileViz";

// AGMB BentoTile / BentoGrid — the product grid. Each tile carries a live dithered
// silhouette viz (the site's tile-viz) in its accent colour, with the content
// pinned above it: category eyebrow, rate, name, copy, link.

export interface BentoTileProps {
  category: React.ReactNode;
  name: React.ReactNode;
  copy: React.ReactNode;
  rate?: React.ReactNode;
  href?: string;
  flagship?: boolean;
  /** Silhouette kind for the viz: nhf | mreif | construction | reif | commercial. */
  viz?: string;
  /** Accent colour (hex) for the viz dot field. */
  accent?: string;
  className?: string;
}

export const BentoTile: React.FC<BentoTileProps> = ({ category, name, copy, rate, href, flagship, viz, accent = "#1F4FA8", className }) => {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className={cn(
        "group relative flex min-h-[300px] flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-cream-warm/10 bg-navy p-7 transition",
        href && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-tile-hover)]",
        flagship ? "md:row-span-2" : "",
        className,
      )}
    >
      {viz && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-90">
          <TileViz viz={viz} accent={accent} />
        </div>
      )}
      <div className="relative z-[1] flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-on-navy">{category}</span>
        {rate && <span className="numeric text-cream-warm" style={{ fontSize: 20 }}>{rate}</span>}
      </div>
      <div className="relative z-[1] flex flex-col gap-2">
        <h3 className={cn("font-medium tracking-[-0.03em] text-cream-warm", flagship ? "text-3xl" : "text-2xl")}>{name}</h3>
        <p className="max-w-[26ch] text-sm leading-relaxed text-text-muted-on-navy">{copy}</p>
        {href && <span className="mt-2 text-sm text-gold-vivid transition">Explore →</span>}
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
