"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

// AGMB design-system docs sidebar.
// Sticky left rail at lg+ ; collapses to a top dropdown below lg.
// Active chapter highlighting via IntersectionObserver.
// Smooth scroll on click. Tab-trapped within the nav landmark.

export interface SidebarSubsection {
  id: string;
  label: string;
}

export interface SidebarChapter {
  /** Two-digit numeric prefix (e.g. "01"). */
  number: string;
  /** Chapter id — must match a chapter section's HTML id. */
  id: string;
  /** Bi-script title; left half rendered in sans, right half in serif. */
  titleSans: string;
  titleSerif: string;
  subsections?: SidebarSubsection[];
}

export interface SidebarProps {
  chapters: SidebarChapter[];
  /** ID of the currently-visible chapter (e.g. "foundations"). */
  activeId: string;
  onActivate?: (id: string) => void;
}

// Smooth-scroll anchor click — accounts for a small top-offset so the chapter
// title isn't pinned right against the viewport edge.
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, top);
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
  // Update the URL hash without re-triggering native jump.
  history.replaceState(null, "", `#${id}`);
}

export const Sidebar: React.FC<SidebarProps> = ({ chapters, activeId, onActivate }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const activeChapter = chapters.find((c) => c.id === activeId) ?? chapters[0];

  return (
    <>
      {/* Mobile dropdown trigger — collapses below lg */}
      <div className="lg:hidden sticky top-0 z-30 bg-ag-white border-b border-ag-border">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="design-sidebar-mobile"
          className="w-full flex items-center justify-between px-5 py-3 text-left transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2"
        >
          <span className="flex items-baseline gap-3 min-w-0">
            <span className="numeric text-xs text-ag-gold shrink-0">{activeChapter.number}</span>
            <span className="bi-section text-base text-ag-navy truncate">
              <span className="bi-sans">{activeChapter.titleSans}</span>{" "}
              <span className="bi-serif">{activeChapter.titleSerif}</span>
            </span>
          </span>
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
            className={cn("text-ag-muted transition-token shrink-0", mobileOpen && "rotate-180")}
          >
            <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {mobileOpen && (
          <nav
            id="design-sidebar-mobile"
            aria-label="Design system chapters (mobile)"
            className="border-t border-ag-border bg-ag-white max-h-[60vh] overflow-y-auto"
          >
            <ol className="flex flex-col py-2 divide-y divide-ag-border">
              {chapters.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onActivate?.(c.id);
                      scrollToId(c.id);
                    }}
                    className={cn(
                      "w-full text-left flex items-baseline gap-3 px-5 py-2.5 transition-token",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-inset",
                      c.id === activeId
                        ? "bg-ag-cream border-l-2 border-ag-gold text-ag-navy"
                        : "text-ag-muted hover:text-ag-navy hover:bg-ag-cream/40",
                    )}
                  >
                    <span className="numeric text-xs text-ag-gold shrink-0 w-6">{c.number}</span>
                    <span className="bi-section text-sm">
                      <span className="bi-sans">{c.titleSans}</span>{" "}
                      <span className="bi-serif">{c.titleSerif}</span>
                    </span>
                  </button>
                  {c.subsections && c.id === activeId && (
                    <ul className="pl-14 pb-2">
                      {c.subsections.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setMobileOpen(false);
                              scrollToId(s.id);
                            }}
                            className="block w-full text-left text-xs text-ag-muted py-1.5 hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline"
                          >
                            {s.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop sticky rail */}
      <nav
        aria-label="Design system chapters"
        className="hidden lg:block lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto bg-ag-white border-r border-ag-border"
      >
        {/* Header — wordmark register pass (2026-05-10).
            Vector logo arrived 2026-05-10; the typographic placeholder
            (single-letter monogram + Libre Baskerville "AGMB") is retired.
            The Logo primitive renders the canonical full-coloured wordmark
            here — keeps the Stripe / ACI pattern of leading the top-left
            corner with proportional brand presence, with the documentation
            label as a small secondary line. */}
        <div className="px-7 pt-10 pb-9">
          <a
            href="/"
            aria-label="AG Mortgage Bank — back to home"
            className="inline-flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ag-white rounded-sm"
          >
            <Logo
              variant="wordmark-coloured"
              height={40}
              decorative
              className="transition-token group-hover:opacity-90"
            />
          </a>
          <span aria-hidden="true" className="block w-8 border-t border-ag-border mt-4" />
          <p className="bi-label text-ag-muted text-[11px] uppercase tracking-[0.08em] mt-3">
            <span className="bi-sans">Design</span>{" "}
            <span className="bi-serif italic">system</span>
          </p>
          <p className="text-xs text-ag-muted mt-3 leading-snug">
            Foundations, primitives, and patterns. The vocabulary the site composes from.
          </p>
          <a
            href="/tokens"
            className="inline-flex items-center gap-1.5 text-[11px] text-ag-navy-vivid hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline mt-3 font-medium"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Token catalogue
          </a>
        </div>
        {/* Swiss refinement (2026-05-09): 1px ag-border rule between every
            chapter row — Müller-Brockmann numbered-list discipline. The rule
            is structural (separates the blocks of the table-of-contents),
            not decorative. */}
        <ol className="flex flex-col pb-10 border-y border-ag-border">
          {chapters.map((c, idx) => {
            const isActive = c.id === activeId;
            return (
              <li
                key={c.id}
                className={cn(
                  "border-l-2 border-transparent",
                  idx > 0 && "border-t border-ag-border",
                )}
                data-active={isActive || undefined}
              >
                <a
                  href={`#${c.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onActivate?.(c.id);
                    scrollToId(c.id);
                  }}
                  className={cn(
                    "block px-7 py-3 transition-token border-l-2 -ml-[2px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-inset",
                    isActive
                      ? "border-ag-gold bg-ag-cream/50 text-ag-navy"
                      : "border-transparent text-ag-muted hover:text-ag-navy hover:border-ag-border",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="flex items-baseline gap-3">
                    <span className={cn("numeric text-xs shrink-0 w-6", isActive ? "text-ag-gold" : "text-ag-muted/70")}>
                      {c.number}
                    </span>
                    <span className="bi-section text-sm leading-tight">
                      <span className="bi-sans">{c.titleSans}</span>{" "}
                      <span className="bi-serif">{c.titleSerif}</span>
                    </span>
                  </span>
                </a>
                {c.subsections && isActive && (
                  <ul className="pl-[3.5rem] pr-7 pb-3 flex flex-col gap-1.5">
                    {c.subsections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId(s.id);
                          }}
                          className="block text-xs text-ag-muted hover:text-ag-navy transition-token py-1 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
        <div className="px-7 pb-10 mt-2 pt-6 flex flex-col gap-3">
          {/* Cross-link to /tokens catalogue — Lane A addition */}
          <a
            href="/tokens"
            className="inline-flex items-center gap-1.5 text-xs text-ag-navy-vivid hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Token catalogue
          </a>
          <p className="text-xs text-ag-muted leading-snug">
            Storybook · <code className="numeric text-[11px]">npm run storybook</code>
          </p>
          <p className="text-xs text-ag-muted/70 leading-snug">
            Tokens locked at architecture time. PRD §4.
          </p>
        </div>
      </nav>
    </>
  );
};
Sidebar.displayName = "DesignSidebar";
