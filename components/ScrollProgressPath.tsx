"use client";
import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// AGMB ScrollProgressPath — rewired 2026-05-09 from homepage sections to
// design-system chapters. Fixed navy SVG vertical line on the right edge of
// the /design page that draws as the reader descends, with dots at chapter
// anchors that fill when each chapter enters the viewport.
//
// Locked tooling per PRD §4.3:
//   - GSAP + ScrollTrigger only (page-level scroll choreography).
//   - NO Framer Motion in this component tree (PRD §4.3 isolation rule).
//   - Hidden below `md:` breakpoint.
//   - Honours `prefers-reduced-motion: reduce` (snaps to fully drawn, no scrub).
//
// Section IDs must match the `id` props on <ChapterSection> in
// components/design/chapters.tsx — verified 2026-05-09.

const SECTIONS = [
  { id: "foundations",  label: "01 Foundations" },
  { id: "brand",        label: "02 Brand" },
  { id: "primitives",   label: "03 Primitives" },
  { id: "patterns",     label: "04 Patterns" },
  { id: "motion",       label: "05 Motion" },
  { id: "compositions", label: "06 Compositions" },
];

export const ScrollProgressPath: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lineRef = React.useRef<SVGLineElement>(null);
  const dotsRef = React.useRef<(SVGCircleElement | null)[]>([]);
  const labelsRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line) return;

    // Draw-line ScrollTrigger — page-level progress drives stroke-dashoffset.
    // Chapter heights are much taller than the old homepage sections (each
    // chapter can be 8000-20000px); trigger against document.body so the
    // scrub covers the full scrollable range regardless of chapter height.
    const totalLen = line.getTotalLength();
    line.style.strokeDasharray = String(totalLen);
    line.style.strokeDashoffset = reduce ? "0" : String(totalLen);

    let drawTrigger: ScrollTrigger | undefined;
    if (!reduce) {
      drawTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          line.style.strokeDashoffset = String(totalLen * (1 - self.progress));
        },
      });
    }

    // Per-chapter ScrollTriggers — mark the dot when the chapter top passes
    // 40% of the viewport. Use start: "top 40%" so large chapters stay
    // active for the majority of the reader's scroll through them.
    const sectionTriggers: ScrollTrigger[] = [];
    SECTIONS.forEach((section, idx) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      // ChapterSection renders a <section> element with the id directly.
      const target = el.tagName === "SECTION" ? el : (el.closest("section") ?? el);
      const trig = ScrollTrigger.create({
        trigger: target,
        start: "top 40%",
        end: "bottom 40%",
        onEnter:     () => setActiveIndex(idx),
        onEnterBack: () => setActiveIndex(idx),
      });
      sectionTriggers.push(trig);
    });

    return () => {
      drawTrigger?.kill();
      sectionTriggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const target = el.closest("section") ?? el;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 right-6 lg:right-10 h-screen z-30 pointer-events-none"
    >
      <div className="relative h-full">
        {/* Navy vertical line — drawn via stroke-dashoffset scrub.
            Navy (not gold) in documentation context — gold is decorative-only
            post 2026-05-09 v3 register. */}
        <svg
          width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none"
          className="absolute inset-y-0 right-0"
        >
          <line
            ref={lineRef}
            x1="1" y1="0" x2="1" y2="100"
            stroke="var(--ag-navy)" strokeWidth="1.5" strokeLinecap="round"
            opacity="0.25"
          />
        </svg>

        {/* Dots — 6 positions distributed along the rail.
            Active chapter dot fills navy; pending dots stay outlined.
            Tooltip appears on hover showing the chapter label. */}
        <ul className="absolute inset-y-12 right-[-3px] flex flex-col justify-between pointer-events-auto">
          {SECTIONS.map((section, idx) => {
            const filled = activeIndex >= idx;
            return (
              <li key={section.id} className="relative group">
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-label={`Jump to ${section.label}`}
                  className="block w-2 h-2 rounded-full border border-ag-navy/40 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-1"
                  style={{
                    background: filled ? "var(--ag-navy)" : "transparent",
                  }}
                  ref={(el) => { dotsRef.current[idx] = el as unknown as SVGCircleElement | null; }}
                />
                {/* Hover tooltip — label anchored to the left of the dot */}
                <span
                  ref={(el) => { labelsRef.current[idx] = el; }}
                  className={[
                    "absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap",
                    "numeric text-[10px] uppercase tracking-[0.08em] font-semibold text-ag-navy",
                    "bg-ag-cream/95 px-2 py-1 rounded border border-ag-border",
                    "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
                    "group-focus-within:opacity-100 group-focus-within:translate-x-0",
                    "transition-token",
                  ].join(" ")}
                >
                  {section.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
ScrollProgressPath.displayName = "ScrollProgressPath";
