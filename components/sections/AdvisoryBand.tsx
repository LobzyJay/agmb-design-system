import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB AdvisoryBand — uses the site's verbatim .advisory CSS.

export interface AdvisoryBandProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  copy?: React.ReactNode;
  cta?: { label: string; href: string };
  stat?: { accent?: React.ReactNode; value?: React.ReactNode; sub?: React.ReactNode };
  className?: string;
}

export const AdvisoryBand: React.FC<AdvisoryBandProps> = ({ eyebrow, title, copy, cta, stat, className }) => (
  <div className={cn("advisory", className)}>
    <span className="advisory__glow" aria-hidden />
    <div className="advisory__inner">
      {eyebrow && <span className="advisory__cat">{eyebrow}</span>}
      <p className="advisory__title">{title}</p>
      {copy && <p className="advisory__copy">{copy}</p>}
    </div>
    <div className="advisory__aside">
      {stat && (
        <div className="advisory__stat">
          <p className="advisory__stat-num">
            {stat.accent && <em>{stat.accent}</em>}
            {stat.value}
          </p>
          {stat.sub && <p className="advisory__stat-sub">{stat.sub}</p>}
        </div>
      )}
      {cta && <a href={cta.href} className="advisory__cta">{cta.label}</a>}
    </div>
  </div>
);
