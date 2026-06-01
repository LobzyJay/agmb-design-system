import * as React from "react";
import { cn } from "@/lib/cn";
import { TileViz } from "@/components/viz/TileViz";

// AGMB BentoTile / BentoGrid — uses the site's verbatim .tile / .tile-viz CSS
// (app/agmb-site.css), so scale + structure match the live site exactly: a cream
// tile with content on the left and the dithered viz on the right (46% / flagship
// grid). The viz canvas is the site's tile-viz__canvas, in the per-product accent.

export interface BentoTileProps {
  category: React.ReactNode;
  name: React.ReactNode;
  copy: React.ReactNode;
  rate?: React.ReactNode;
  link?: React.ReactNode;
  href?: string;
  flagship?: boolean;
  icon?: React.ReactNode;
  /** Silhouette kind: nhf | mreif | construction | reif | commercial. */
  viz?: string;
  /** Accent colour (hex) for the viz dot field. */
  accent?: string;
  /** Viz aspect ratio (w:h) so the silhouette never stretches to the tile. */
  ar?: number;
  className?: string;
}

export const BentoTile: React.FC<BentoTileProps> = ({ category, name, copy, rate, link = "Learn more", href = "#", flagship, icon, viz, accent = "#1F4FA8", ar, className }) => (
  <a href={href} className={cn("tile", flagship && "tile--flagship", className)}>
    <div className="tile__content">
      <div className="tile__top">
        {icon && <span className="tile__icon">{icon}</span>}
        <span className="tile__cat">{category}</span>
      </div>
      {rate && <span className="tile__rate">{rate}</span>}
      <div>
        <h3 className="tile__name">{name}</h3>
        <p className="tile__copy">{copy}</p>
        <span className="tile__link">{link} →</span>
      </div>
    </div>
    {viz && (
      <div className="tile-viz">
        <TileViz viz={viz} accent={accent} ar={ar} />
      </div>
    )}
  </a>
);

export interface BentoGridProps {
  /** Flagship tile + a 2-tile stack on top; two tiles below. */
  flagship: React.ReactElement;
  stack: [React.ReactElement, React.ReactElement];
  bottom: [React.ReactElement, React.ReactElement];
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ flagship, stack, bottom, className }) => (
  <div className={cn("bento", className)}>
    <div className="bento__top">
      {flagship}
      <div className="tile__stack">{stack}</div>
    </div>
    <div className="bento__bot">{bottom}</div>
  </div>
);
