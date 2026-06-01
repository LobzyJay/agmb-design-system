"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

// AGMB SiteNav — the site header: transparent over the hero, condensing into a
// floating glass pill on scroll (navy-deep @ ~78% + backdrop blur). Wordmark left,
// links + cream CTA pill right. Drives `scrolled` from window scroll itself.

export interface NavLink {
  label: string;
  href: string;
  current?: boolean;
}

export interface SiteNavProps {
  links: NavLink[];
  cta?: { label: string; href: string };
  className?: string;
}

export const SiteNav: React.FC<SiteNavProps> = ({ links, cta, className }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 px-4 pt-4 md:px-10", className)} style={{ zIndex: "var(--z-nav)" }}>
      <nav
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between gap-8 transition-all duration-300 ease-[var(--ease-standard)]",
          scrolled
            ? "rounded-pill border border-cream-warm/10 px-6 py-3 shadow-[var(--shadow-nav-glass)]"
            : "px-2 py-3",
        )}
        style={scrolled ? { backgroundColor: "color-mix(in srgb, var(--color-navy-deep) 80%, transparent)", backdropFilter: "var(--blur-nav-glass)", WebkitBackdropFilter: "var(--blur-nav-glass)" } : undefined}
      >
        <Logo variant="wordmark-white" height={26} />
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.current ? "page" : undefined}
              className={cn("text-sm tracking-[-0.005em] transition-colors", l.current ? "text-cream-warm" : "text-cream-warm/75 hover:text-cream-warm")}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {l.label}
            </a>
          ))}
          {cta && (
            <a
              href={cta.href}
              className="inline-flex items-center rounded-pill bg-cream-warm px-5 py-2.5 text-sm tracking-[-0.005em] text-navy-deep transition hover:brightness-95"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {cta.label}
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};
