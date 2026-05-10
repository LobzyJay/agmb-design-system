"use client";

// AGMB ProductBentoTile — direction comparison route.
//
// Internal exploration page (not linked from /design or /tokens — navigate
// directly via /design/bento-explore). Mounts all four candidate directions
// against identical content so the visual decision is about register, not copy.
//
// Directions:
//   1 · Canonical — current ProductBentoTile (mid is white-surface, navy register,
//                   no gold; hero is cream + image overlay; wide is navy + cream).
//   2 · Editorial — magazine-grade · serif italic · feather.atmospheric hero ·
//                   gold seal strip on the wide as registered decorative use.
//   3 · Flat      — Bloomberg/Mercury data card · sharp edges · structured rows
//                   with tabular figures · 4-col grid.
//   4 · Swiss     — Müller-Brockmann hairline grid · gap-px dividers · sans-only ·
//                   3-col grid. BentoGridSwiss wrapper supplies the divider rule.
//
// All four share: 1 hero + 4 mids + 1 wide = the canonical AGMB bento set.

import * as React from "react";
import Link from "next/link";
import { ProductBentoTile } from "@/components/ProductBentoTile";
import { ProductBentoTileEditorial } from "@/components/ProductBentoTileEditorial";
import { ProductBentoTileFlat } from "@/components/ProductBentoTileFlat";
import {
  ProductBentoTileSwiss,
  BentoGridSwiss,
} from "@/components/ProductBentoTileSwiss";

// ── Shared content set ──────────────────────────────────────────────────────
// Identical across all four directions so the comparison is purely visual.
type TileContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  dataRows?: Array<{ label: string; value: string }>;
};

const HERO: TileContent = {
  eyebrow: "Our flagship product",
  title: "NHF Mortgage",
  description:
    "First-time buyer rates from 6% under the National Housing Fund. Up to 30 years, ₦15M ceiling.",
  ctaLabel: "Learn more →",
  href: "#nhf",
  dataRows: [
    { label: "Rate", value: "6.0% p.a." },
    { label: "Term", value: "Up to 30 yrs" },
    { label: "Max. loan", value: "₦15,000,000" },
  ],
};

const MIDS: TileContent[] = [
  {
    eyebrow: "Access",
    title: "M-REIF",
    description: "Real Estate Investment Fund — diversified property exposure.",
    ctaLabel: "Learn more →",
    href: "#mreif",
    dataRows: [
      { label: "Yield", value: "12.4% YTD" },
      { label: "Min. ticket", value: "₦250,000" },
    ],
  },
  {
    eyebrow: "Build",
    title: "Construction Loan",
    description: "Phased-disbursement finance for ground-up home construction.",
    ctaLabel: "Learn more →",
    href: "#construction",
    dataRows: [
      { label: "Rate", value: "10.5% p.a." },
      { label: "Term", value: "5 yrs max" },
    ],
  },
  {
    eyebrow: "Return",
    title: "REI Investment",
    description: "Direct property income stream for institutional investors.",
    ctaLabel: "Learn more →",
    href: "#rei",
    dataRows: [
      { label: "Min. ticket", value: "₦25M" },
      { label: "Hold period", value: "7 yrs" },
    ],
  },
  {
    eyebrow: "Save",
    title: "NHF Savings",
    description: "Tax-efficient mortgage-linked savings, contributory.",
    ctaLabel: "Learn more →",
    href: "#savings",
    dataRows: [
      { label: "Rate", value: "9.5% p.a." },
      { label: "Withdrawal", value: "After 60 mo." },
    ],
  },
];

const WIDE: TileContent = {
  eyebrow: "30-minute advisory",
  title: "Talk to a mortgage advisor",
  description:
    "Free consultation, in-person or by phone. Walk through your eligibility, rate scenarios and paperwork.",
  ctaLabel: "Book now →",
  href: "#advisory",
  dataRows: [
    { label: "Duration", value: "30 min" },
    { label: "Channel", value: "In-person · Phone" },
    { label: "Fee", value: "₦0" },
  ],
};

// ── Section header ──────────────────────────────────────────────────────────
const DirectionHeader: React.FC<{
  index: number;
  name: string;
  recipe: string;
  posture: string;
}> = ({ index, name, recipe, posture }) => (
  <header className="mb-8 max-w-3xl">
    <p className="eyebrow text-ag-muted mb-2">
      Direction {String(index).padStart(2, "0")}
    </p>
    <h2 className="bi-section bi-serif text-ag-navy text-3xl md:text-4xl tracking-tight leading-tight mb-3">
      {name}
    </h2>
    <p className="text-ag-text text-sm md:text-base leading-relaxed mb-1">
      {recipe}
    </p>
    <p className="text-ag-muted text-xs italic">{posture}</p>
  </header>
);

// ── Direction 1 · Canonical ─────────────────────────────────────────────────
// Native grid: 3-col, hero col-span-2, mids col-span-1 each, wide col-span-3.
const Direction1Canonical: React.FC = () => (
  <section className="px-6 md:px-10 lg:px-14 py-16 md:py-20">
    <DirectionHeader
      index={1}
      name="Canonical · post-gold-demotion"
      recipe="Cream-bg hero with editorial overlay · white-surface mids with navy.vivid icons · navy.deep wide for advisory. Soft tile-rest shadow at rest, hover-lift escalates to soft-1."
      posture="Current shipped state. Navy register throughout. Gold-free."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductBentoTile
        variant="hero"
        tier="flagship"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={HERO.description}
        href={HERO.href}
        ctaLabel={HERO.ctaLabel}
        className="md:col-span-2 md:row-span-2"
      />
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[0].eyebrow}
        title={MIDS[0].title}
        description={MIDS[0].description}
        href={MIDS[0].href}
        ctaLabel={MIDS[0].ctaLabel}
        icon={<span aria-hidden="true">◆</span>}
      />
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[1].eyebrow}
        title={MIDS[1].title}
        description={MIDS[1].description}
        href={MIDS[1].href}
        ctaLabel={MIDS[1].ctaLabel}
        icon={<span aria-hidden="true">◇</span>}
      />
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[2].eyebrow}
        title={MIDS[2].title}
        description={MIDS[2].description}
        href={MIDS[2].href}
        ctaLabel={MIDS[2].ctaLabel}
        icon={<span aria-hidden="true">◈</span>}
      />
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[3].eyebrow}
        title={MIDS[3].title}
        description={MIDS[3].description}
        href={MIDS[3].href}
        ctaLabel={MIDS[3].ctaLabel}
        icon={<span aria-hidden="true">◊</span>}
      />
      <ProductBentoTile
        variant="wide"
        tier="flagship"
        eyebrow={WIDE.eyebrow}
        title={WIDE.title}
        description={WIDE.description}
        href={WIDE.href}
        ctaLabel={WIDE.ctaLabel}
        className="md:col-span-3"
      />
    </div>
  </section>
);

// ── Direction 2 · Editorial ─────────────────────────────────────────────────
// Native grid: 7-col, hero col-span-4, mid pair col-span-3 (stacked), wide row.
const Direction2Editorial: React.FC = () => (
  <section className="px-6 md:px-10 lg:px-14 py-16 md:py-20 bg-surface-light-2">
    <DirectionHeader
      index={2}
      name="Editorial · magazine register"
      recipe="Navy.deep hero with feather.atmospheric gradient + serif italic eyebrow · cream-warm mids with no border (whitespace separates) · cream wide with gold seal strip as registered decorative use."
      posture="Premium · slow · considered. Heritage tilt without ornament."
    />
    <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
      <ProductBentoTileEditorial
        variant="hero"
        tier="flagship"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={HERO.description}
        href={HERO.href}
        ctaLabel={HERO.ctaLabel}
        className="md:col-span-4 md:row-span-2"
      />
      <ProductBentoTileEditorial
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[0].eyebrow}
        title={MIDS[0].title}
        description={MIDS[0].description}
        href={MIDS[0].href}
        ctaLabel={MIDS[0].ctaLabel}
        className="md:col-span-3"
      />
      <ProductBentoTileEditorial
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[1].eyebrow}
        title={MIDS[1].title}
        description={MIDS[1].description}
        href={MIDS[1].href}
        ctaLabel={MIDS[1].ctaLabel}
        className="md:col-span-3"
      />
      <ProductBentoTileEditorial
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[2].eyebrow}
        title={MIDS[2].title}
        description={MIDS[2].description}
        href={MIDS[2].href}
        ctaLabel={MIDS[2].ctaLabel}
        className="md:col-span-3 md:col-start-1"
      />
      <ProductBentoTileEditorial
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[3].eyebrow}
        title={MIDS[3].title}
        description={MIDS[3].description}
        href={MIDS[3].href}
        ctaLabel={MIDS[3].ctaLabel}
        className="md:col-span-4"
      />
      <ProductBentoTileEditorial
        variant="wide"
        tier="flagship"
        eyebrow={WIDE.eyebrow}
        title={WIDE.title}
        description={WIDE.description}
        href={WIDE.href}
        ctaLabel={WIDE.ctaLabel}
        className="md:col-span-7"
      />
    </div>
  </section>
);

// ── Direction 3 · Flat ──────────────────────────────────────────────────────
// Native grid: 4-col uniform, hero col-span-2, mid col-span-1 each, wide col-span-4.
const Direction3Flat: React.FC = () => (
  <section className="px-6 md:px-10 lg:px-14 py-16 md:py-20">
    <DirectionHeader
      index={3}
      name="Flat · institutional data card"
      recipe="Cream hero, white mids, navy.deep wide · sharp edges (rounded-sm 2px) · 1px navy.vivid hairline borders · structured data rows in tabular numerics replace prose · gold-free."
      posture="Bloomberg × Mercury. Institutional clarity. Density signals seriousness."
    />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <ProductBentoTileFlat
        variant="hero"
        tier="flagship"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        href={HERO.href}
        ctaLabel="View product →"
        dataRows={HERO.dataRows}
        icon={<span aria-hidden="true">◆</span>}
        className="md:col-span-2 md:row-span-2"
      />
      <ProductBentoTileFlat
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[0].eyebrow}
        title={MIDS[0].title}
        href={MIDS[0].href}
        ctaLabel="View →"
        dataRows={MIDS[0].dataRows}
      />
      <ProductBentoTileFlat
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[1].eyebrow}
        title={MIDS[1].title}
        href={MIDS[1].href}
        ctaLabel="View →"
        dataRows={MIDS[1].dataRows}
      />
      <ProductBentoTileFlat
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[2].eyebrow}
        title={MIDS[2].title}
        href={MIDS[2].href}
        ctaLabel="View →"
        dataRows={MIDS[2].dataRows}
      />
      <ProductBentoTileFlat
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[3].eyebrow}
        title={MIDS[3].title}
        href={MIDS[3].href}
        ctaLabel="View →"
        dataRows={MIDS[3].dataRows}
      />
      <ProductBentoTileFlat
        variant="wide"
        tier="flagship"
        eyebrow={WIDE.eyebrow}
        title={WIDE.title}
        description={WIDE.description}
        href={WIDE.href}
        ctaLabel="Book →"
        dataRows={WIDE.dataRows}
        className="md:col-span-4"
      />
    </div>
  </section>
);

// ── Direction 4 · Swiss ─────────────────────────────────────────────────────
// Native grid: BentoGridSwiss wrapper · 3-col · gap-px dividers · bg-ag-border
// shows through as hairline rule between tiles. Hero col-span-2.
const Direction4Swiss: React.FC = () => (
  <section className="px-6 md:px-10 lg:px-14 py-16 md:py-20 bg-surface-light-2">
    <DirectionHeader
      index={4}
      name="Swiss · Müller-Brockmann hairline grid"
      recipe="White surface throughout · gap-px between tiles where ag-border colour shows through as the divider rule · sans-only typography · uppercase eyebrow + tabular metric strips · arrow signal replaces icons."
      posture="Total restraint. The grid IS the decoration. Gold-free by design."
    />
    <BentoGridSwiss>
      <ProductBentoTileSwiss
        variant="hero"
        tier="flagship"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        description={HERO.description}
        href={HERO.href}
        ctaLabel="Details"
        dataRows={HERO.dataRows}
        className="md:col-span-2 md:row-span-2"
      />
      <ProductBentoTileSwiss
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[0].eyebrow}
        title={MIDS[0].title}
        href={MIDS[0].href}
        ctaLabel="Details"
        dataRows={MIDS[0].dataRows}
      />
      <ProductBentoTileSwiss
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[1].eyebrow}
        title={MIDS[1].title}
        href={MIDS[1].href}
        ctaLabel="Details"
        dataRows={MIDS[1].dataRows}
      />
      <ProductBentoTileSwiss
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[2].eyebrow}
        title={MIDS[2].title}
        href={MIDS[2].href}
        ctaLabel="Details"
        dataRows={MIDS[2].dataRows}
      />
      <ProductBentoTileSwiss
        variant="mid"
        tier="flagship"
        eyebrow={MIDS[3].eyebrow}
        title={MIDS[3].title}
        href={MIDS[3].href}
        ctaLabel="Details"
        dataRows={MIDS[3].dataRows}
      />
      <ProductBentoTileSwiss
        variant="wide"
        tier="flagship"
        eyebrow={WIDE.eyebrow}
        title={WIDE.title}
        description={WIDE.description}
        href={WIDE.href}
        ctaLabel="Book"
        dataRows={WIDE.dataRows}
        className="md:col-span-3"
      />
    </BentoGridSwiss>
  </section>
);

// ── Sticky direction switcher ───────────────────────────────────────────────
// Anchor links between sections. Stays visible while scrolling so you can
// jump back and forth between directions for direct comparison.
const Switcher: React.FC = () => (
  <nav
    aria-label="Directions"
    className="sticky top-0 z-40 bg-ag-white/85 backdrop-blur-sm border-b border-ag-border"
  >
    <div className="px-6 md:px-10 lg:px-14 py-3 flex items-center gap-1 overflow-x-auto">
      <p className="eyebrow text-ag-muted mr-3 shrink-0">Bento exploration</p>
      <a
        href="#dir-1"
        className="text-ag-navy text-xs font-semibold px-3 py-1.5 rounded-pill hover:bg-ag-navy-vivid/8 transition-token-base"
      >
        01 Canonical
      </a>
      <a
        href="#dir-2"
        className="text-ag-navy text-xs font-semibold px-3 py-1.5 rounded-pill hover:bg-ag-navy-vivid/8 transition-token-base"
      >
        02 Editorial
      </a>
      <a
        href="#dir-3"
        className="text-ag-navy text-xs font-semibold px-3 py-1.5 rounded-pill hover:bg-ag-navy-vivid/8 transition-token-base"
      >
        03 Flat
      </a>
      <a
        href="#dir-4"
        className="text-ag-navy text-xs font-semibold px-3 py-1.5 rounded-pill hover:bg-ag-navy-vivid/8 transition-token-base"
      >
        04 Swiss
      </a>
      <Link
        href="/design"
        className="ml-auto text-ag-muted hover:text-ag-navy text-xs px-3 py-1.5 transition-token-base shrink-0"
      >
        ← Back to /design
      </Link>
    </div>
  </nav>
);

// ── Page ────────────────────────────────────────────────────────────────────
export default function BentoExplorePage() {
  return (
    <main className="min-h-screen bg-ag-white text-ag-text">
      <Switcher />

      {/* Page header */}
      <header className="px-6 md:px-10 lg:px-14 pt-16 md:pt-24 pb-8 max-w-3xl">
        <p className="eyebrow text-ag-muted mb-3">
          Internal · ProductBentoTile direction comparison
        </p>
        <h1 className="bi-section bi-serif text-ag-navy text-4xl md:text-5xl tracking-tight leading-[1.05] mb-4">
          Four directions, one product set.
        </h1>
        <p className="text-ag-text text-sm md:text-base leading-relaxed">
          Identical content across all four — hero (NHF Mortgage) + four mids
          + advisory wide — so the visual decision is about register, not copy.
          Each direction renders in its native grid model and uses its native
          surface, hover, and typography rules. Gold-demotion rule honoured
          throughout: gold appears only on Editorial Direction 02 wide as a
          registered decorative seal strip.
        </p>
      </header>

      <div id="dir-1">
        <Direction1Canonical />
      </div>
      <div id="dir-2">
        <Direction2Editorial />
      </div>
      <div id="dir-3">
        <Direction3Flat />
      </div>
      <div id="dir-4">
        <Direction4Swiss />
      </div>

      {/* Footer note */}
      <footer className="px-6 md:px-10 lg:px-14 py-12 border-t border-ag-border">
        <p className="text-ag-muted text-xs leading-relaxed max-w-3xl">
          Pick one direction; we delete the other three component files and
          fold the chosen variant back into <code className="text-ag-navy">ProductBentoTile.tsx</code> as
          the canonical primitive, then update <code className="text-ag-navy">AGMB_DESIGN_SYSTEM.md</code> §04
          patterns. The three rejected variants are untracked, so deletion is
          a single <code className="text-ag-navy">rm</code>.
        </p>
      </footer>
    </main>
  );
}
