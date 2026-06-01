import * as React from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

// AGMB RegulatoryFooter — the site footer: a navy panel with brand + columns,
// a rule, regulatory disclosures and a stamp row.

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface RegulatoryFooterProps {
  tagline?: React.ReactNode;
  columns: FooterColumn[];
  disclosures?: React.ReactNode[];
  stamp?: React.ReactNode;
  className?: string;
}

export const RegulatoryFooter: React.FC<RegulatoryFooterProps> = ({ tagline, columns, disclosures, stamp, className }) => (
  <footer className={cn("bg-black px-6 pb-10 pt-4 md:px-10", className)}>
    <div className="mx-auto max-w-[1400px] rounded-[36px] bg-navy p-10 md:p-14">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo variant="wordmark-coloured" height={32} />
          {tagline && <p className="text-sm leading-relaxed text-text-muted-on-navy">{tagline}</p>}
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-warm/50">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-text-muted-on-navy transition hover:text-cream-warm">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <span aria-hidden className="my-8 block h-px w-full bg-cream-warm/10" />
      {disclosures && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-faint-on-navy">
          {disclosures.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      )}
      {stamp && <p className="mt-6 text-xs text-text-faint-on-navy">{stamp}</p>}
    </div>
  </footer>
);
