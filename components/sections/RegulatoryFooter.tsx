import * as React from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

// AGMB RegulatoryFooter — uses the site's verbatim .footer__* CSS.

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface RegulatoryFooterProps {
  tagline?: React.ReactNode;
  columns: FooterColumn[];
  disclosures?: { label: string; href: string }[];
  className?: string;
}

export const RegulatoryFooter: React.FC<RegulatoryFooterProps> = ({ tagline, columns, disclosures, className }) => (
  <div className={cn("footer__panel", className)}>
    <div className="footer__top">
      <div className="footer__brand">
        <Logo variant="wordmark-white" height={40} />
        {tagline && <p className="footer__tag">{tagline}</p>}
      </div>
      <div className="footer__cols">
        {columns.map((col) => (
          <div key={col.title} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <span className="footer__rule" aria-hidden />
    {disclosures && (
      <div className="footer__disclosures">
        {disclosures.map((d, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">·</span>}
            <a href={d.href}>{d.label}</a>
          </React.Fragment>
        ))}
      </div>
    )}
  </div>
);
