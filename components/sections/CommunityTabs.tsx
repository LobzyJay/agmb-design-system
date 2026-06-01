"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB CommunityTabs — a hairline-ruled numbered tab bar over a two-column panel:
// a navy stat-art card (serif accent stat) beside prose. Active tab = gold underline.

export interface CommunityTab {
  num: string;
  label: string;
  art: { eyebrow?: React.ReactNode; statAccent?: React.ReactNode; stat: React.ReactNode; caption?: React.ReactNode };
  body: React.ReactNode;
}

export interface CommunityTabsProps {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  tabs: CommunityTab[];
  className?: string;
}

export const CommunityTabs: React.FC<CommunityTabsProps> = ({ eyebrow, heading, tabs, className }) => {
  const [active, setActive] = React.useState(0);
  const cur = tabs[active];
  return (
    <section className={cn("bg-cream-warm px-6 py-24 md:px-10", className)}>
      <div className="mx-auto max-w-[1400px]">
        {(eyebrow || heading) && (
          <header className="mb-10 flex flex-col gap-3">
            {eyebrow && <span className="eyebrow text-text-muted-on-cream">{eyebrow}</span>}
            {heading && <h2 className="h2 text-navy-deep">{heading}</h2>}
          </header>
        )}
        <div role="tablist" className="flex border-y border-navy-deep/12">
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.num}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={cn("relative flex-1 border-r border-navy-deep/12 px-6 py-7 text-left transition last:border-r-0", on ? "bg-navy-deep/[0.03] text-navy-deep" : "text-navy-deep/55 hover:text-navy-deep")}
              >
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep/40">{t.num}</span>
                <span className="block text-sm font-medium leading-snug" style={{ fontFamily: "var(--font-sans)" }}>{t.label}</span>
                {on && <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-rich" />}
              </button>
            );
          })}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="relative overflow-hidden rounded-xs bg-navy-deep p-12 text-cream-warm">
            <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(800px 400px at 90% -10%, rgba(224,176,64,0.14), transparent 60%)" }} />
            <div className="relative z-[1] flex min-h-[260px] flex-col justify-between gap-10">
              {cur.art.eyebrow && <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint-on-navy">{cur.art.eyebrow}</span>}
              <div>
                <p className="text-[56px] font-medium leading-none tracking-[-0.05em]">
                  {cur.art.statAccent && <span className="mr-1.5 align-baseline text-[64px] tracking-[-0.04em] text-green-vivid" style={{ fontFamily: "var(--font-serif)" }}>{cur.art.statAccent}</span>}
                  {cur.art.stat}
                </p>
                {cur.art.caption && <p className="mt-3 max-w-xs text-[13px] leading-snug text-text-muted-on-navy">{cur.art.caption}</p>}
              </div>
            </div>
          </div>
          <div className="text-[16px] leading-[1.62] text-text-on-cream [&>p]:mb-4">{cur.body}</div>
        </div>
      </div>
    </section>
  );
};
