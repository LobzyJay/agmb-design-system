"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB NewsCard — PRD §4.5 + §3.4 / §10 staggered news grid.
// Variant: featured (large, spans 2 rows) | standard (smaller).
// Thumbnail (4:3, duotone-treated), date (Inter 12px gold), source (small-caps),
// headline (Libre Baskerville 18-24px), 1-line sub-copy (Inter, muted).

export type NewsCardVariant = "featured" | "standard";

export interface NewsCardProps {
  variant?: NewsCardVariant;
  /** 4:3 thumbnail — duotone-treated per PRD §3.4. */
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  date: React.ReactNode;
  source: React.ReactNode;
  headline: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  variant = "standard",
  thumbnailSrc,
  thumbnailAlt,
  date,
  source,
  headline,
  description,
  href,
  className,
}) => {
  const Tag: React.ElementType = href ? "a" : "article";
  const isFeatured = variant === "featured";
  return (
    <Tag
      href={href}
      className={cn(
        "group flex flex-col gap-4 bg-ag-white border border-ag-border rounded-card overflow-hidden",
        // v2 surface-flatness pass (Adewale 2026-05-09): default flat, elevation on hover only.
        "hover-lift hover:shadow-soft-1",
        href && "hover:border-ag-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2",
        className,
      )}
      data-variant={variant}
    >
      <div
        className={cn(
          "relative bg-ag-light overflow-hidden",
          isFeatured ? "aspect-[4/3]" : "aspect-[4/3]",
        )}
      >
        {thumbnailSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt ?? ""}
            className="w-full h-full object-cover transition-token-base group-hover:scale-[1.02]"
          />
        ) : (
          <span className="absolute inset-0 bg-gradient-to-br from-ag-navy/10 to-ag-cream" aria-hidden="true" />
        )}
      </div>
      <div className={cn("flex flex-col gap-2", isFeatured ? "px-6 pb-6" : "px-5 pb-5")}>
        <p className="text-xs flex items-center gap-2">
          <span className="numeric text-ag-navy-vivid font-semibold">{date}</span>
          <span className="text-ag-muted">·</span>
          <span className="uppercase tracking-[0.08em] text-ag-muted font-semibold">{source}</span>
        </p>
        <h3
          className={cn(
            "bi-section bi-serif text-ag-navy leading-tight tracking-tight",
            isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
          )}
        >
          {headline}
        </h3>
        {description && (
          <p className={cn("text-ag-muted leading-snug", isFeatured ? "text-sm md:text-base" : "text-sm")}>
            {description}
          </p>
        )}
      </div>
    </Tag>
  );
};
NewsCard.displayName = "NewsCard";
