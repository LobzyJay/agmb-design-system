"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

// AGMB SiteNav — uses the site's verbatim .nav / .nav__links / .nav__cta CSS.
// `scrolled` toggles the floating glass-pill state (on the site this is driven
// by window scroll; here it's a prop so both states are documentable).

export interface NavLink { label: string; href: string }

export interface SiteNavProps {
  links: NavLink[];
  cta?: { label: string; href: string };
  scrolled?: boolean;
  className?: string;
}

export const SiteNav: React.FC<SiteNavProps> = ({ links, cta, scrolled, className }) => (
  <nav className={cn("nav", scrolled && "nav--scrolled", className)}>
    <Logo variant="wordmark-white" height={30} className="logo__icon" />
    <div className="nav__links">
      {links.map((l, i) => (
        <a key={i} href={l.href}>{l.label}</a>
      ))}
      {cta && <a href={cta.href} className="nav__cta">{cta.label}</a>}
    </div>
  </nav>
);
