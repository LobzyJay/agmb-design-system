import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB StatusLine — the site's hero .status-line: a gold pulse dot followed by
// short uppercase items separated by faint dividers. Sits above the H1.

export interface StatusLineProps {
  items: React.ReactNode[];
  className?: string;
}

export const StatusLine: React.FC<StatusLineProps> = ({ items, className }) => (
  <span
    className={cn(
      "inline-flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-on-navy",
      className,
    )}
  >
    <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-gold-vivid" />
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span aria-hidden className="text-cream-warm/30">/</span>}
        <span>{item}</span>
      </React.Fragment>
    ))}
  </span>
);
