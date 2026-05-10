"use client";
// AGMB design-system documentation page.
//
// Single long page with a sticky left sidebar nav, mirroring the composition
// pattern of https://lobzyjay.github.io/Systemspec-website-redesign/design/.
//
// Deliberately under one route at /design. Does not edit app/page.tsx.
// All 27 primitives + 6 chapters live here — see components/design/chapters.tsx
// for chapter content, this file owns layout + sidebar wiring only.

import * as React from "react";
import { Sidebar } from "@/components/design/Sidebar";
import { useActiveChapter } from "@/components/design/useActiveChapter";
import {
  GridOverlay,
  GridOverlayToggle,
  useGridOverlay,
} from "@/components/design/GridOverlay";
import {
  SIDEBAR_CHAPTERS,
  Chapter01,
  Chapter02,
  Chapter03,
  Chapter04,
  Chapter05,
  Chapter06,
} from "@/components/design/chapters";

// ScrollProgressPath removed from /design 2026-05-10 — the right-rail dot
// indicator competed visually with the sidebar nav and added noise without
// adding navigation value the sidebar didn't already provide. The primitive
// component is still in components/ScrollProgressPath.tsx and documented as
// a reference; it's just not active on this page.

export default function DesignSystemDocs() {
  const ids = React.useMemo(() => SIDEBAR_CHAPTERS.map((c) => c.id), []);
  const [activeId, setActive] = useActiveChapter(ids);
  const [gridVisible, toggleGrid] = useGridOverlay();

  return (
    <main className="min-h-screen bg-surface-light-1 text-ag-text flex flex-col lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar
        chapters={SIDEBAR_CHAPTERS as unknown as Parameters<typeof Sidebar>[0]["chapters"]}
        activeId={activeId}
        onActivate={setActive}
      />

      {/* Swiss-tradition 12-column grid overlay (2026-05-09).
          Hidden by default; toggled via the header button. The grid is part
          of the documentation per Müller-Brockmann lineage. */}
      <GridOverlay visible={gridVisible} />

      <div className="min-w-0">
        {/* Hero — page title + framing */}
        <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
          {/* Swiss refinement (2026-05-09): grid-overlay toggle in the header,
              top-right. localStorage-persisted via useGridOverlay. */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <p className="eyebrow">AGMB · Design system</p>
            <GridOverlayToggle visible={gridVisible} onToggle={toggleGrid} />
          </div>
          {/* Brand-engineer pass (2026-05-09): tracking aligned to the
              -0.03em display spec (AGMB_DESIGN_SYSTEM.md
              `font.tracking.display`). Tailwind `tracking-tight` resolves
              to -0.025em; the explicit value lands closer to the spec's
              -0.035em ceiling and matches the chapter H2 register. */}
          <h1 className="bi-display text-ag-navy text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-[-0.03em] max-w-4xl">
            <span className="bi-sans block">The vocabulary the</span>
            <span className="bi-serif italic block">site composes from.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
            Twenty-seven primitives, six chapters. Tokens locked at architecture time.
            Components reference the semantic layer, never raw hex; every transition runs
            through <code className="numeric text-sm">.transition-token</code>; every state
            in the seven-state matrix is enumerable. PRD §4.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-ag-muted numeric">
            <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">27 primitives</span>
            <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">11 brand tokens</span>
            <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">5 semantic tokens</span>
            <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">11 motion tokens</span>
            <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">3 type families</span>
          </div>
        </header>

        <Chapter01 />
        <Chapter02 />
        <Chapter03 />
        <Chapter04 />
        <Chapter05 />
        <Chapter06 />

        <footer className="border-t border-ag-border bg-ag-white">
          <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-sm text-ag-muted">
              AGMB design system &mdash; {new Date().getFullYear()}. Locked tokens &middot; 27 primitives &middot; 6 chapters.
            </p>
            <p className="text-xs text-ag-muted numeric">
              PRD §4 · LESSONS §4 · WISE & CASHAPP §4.1
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
