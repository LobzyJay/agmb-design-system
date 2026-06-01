"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB CommunityTabs — uses the site's verbatim .community__* CSS: a hairline tab
// bar (gold active underline) over a two-column panel (navy stat-art + prose).

export interface CommunityTab {
  num: string;
  label: string;
  art: { eyebrow?: React.ReactNode; statAccent?: React.ReactNode; stat: React.ReactNode; caption?: React.ReactNode };
  body: React.ReactNode;
}

export interface CommunityTabsProps {
  tabs: CommunityTab[];
  className?: string;
}

export const CommunityTabs: React.FC<CommunityTabsProps> = ({ tabs, className }) => {
  const [active, setActive] = React.useState(0);
  const cur = tabs[active];
  return (
    <div className={cn(className)}>
      <div className="community__tabs" role="tablist">
        {tabs.map((t, i) => (
          <button key={t.num} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={cn("community__tab", i === active && "is-active")}>
            <span className="community__tab-num">{t.num}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="community__panel" role="tabpanel">
        <div className="community__panel-art">
          {cur.art.eyebrow && <span className="community__panel-art-eyebrow">{cur.art.eyebrow}</span>}
          <div>
            <p className="community__panel-art-stat">
              {cur.art.statAccent && <em>{cur.art.statAccent}</em>}
              {cur.art.stat}
            </p>
            {cur.art.caption && <p className="community__panel-art-cap">{cur.art.caption}</p>}
          </div>
        </div>
        <div className="community__panel-body">{cur.body}</div>
      </div>
    </div>
  );
};
