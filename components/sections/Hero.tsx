import * as React from "react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site-config";

// AGMB Hero — the centred opening, documented statically with the site's parts:
// a status row (green pulse + uppercase items), an Inter H1 with a serif-italic
// accent word, lede, dual CTAs, over the particle-building viz (masked).

export interface HeroProps {
  status: React.ReactNode[];
  /** Heading parts; a part with `accent: true` renders as the serif-italic word. */
  heading: { text: string; accent?: boolean }[];
  lede: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Background viz image (defaults to the particle building). */
  vizImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ status, heading, lede, primary, secondary, vizImage = "/images/agmb-particle-building.png", className }) => (
  <section className={cn("hero-doc", className)}>
    <span className="hero-doc__viz" aria-hidden style={{ backgroundImage: `url(${asset(vizImage)})` }} />
    <span className="status-row">
      <span className="pulse" aria-hidden />
      {status.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="dot">/</span>}
          <span>{s}</span>
        </React.Fragment>
      ))}
    </span>
    <h1 className="h1">
      {heading.map((p, i) => (
        <React.Fragment key={i}>{p.accent ? <span className="serif-accent">{p.text}</span> : p.text}</React.Fragment>
      ))}
    </h1>
    <p className="hero__lede">{lede}</p>
    <div className="ctas">
      {primary && <a className="cta cta--primary" href={primary.href}>{primary.label}</a>}
      {secondary && <a className="cta cta--secondary" href={secondary.href}>{secondary.label}</a>}
    </div>
  </section>
);
