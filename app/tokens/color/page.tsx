"use client";
// /tokens/color — colour token catalogue across all three tiers.
// Migrated and promoted from /design ch.01 foundations-colour.
// Adds tier labelling (ref / sys / comp) to every token group.

import * as React from "react";
import Link from "next/link";
import { TokenSwatch } from "@/components/design/TokenSwatch";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";
import { CodeBlock } from "@/components/design/CodeBlock";

// ── Token data (mirrors chapters.tsx, adds tier labels) ──────────────────
const BRAND_TOKENS = [
  { varName: "ag-navy",   hex: "#0A2540", role: "Primary surface · headings · CTAs",          utility: "bg-ag-navy",         tier: "ref" },
  { varName: "ag-gold",   hex: "#C8972A", role: "Accent · hairlines · active states",          utility: "bg-ag-gold",         tier: "ref" },
  { varName: "ag-cream",  hex: "#F8F5EF", role: "Warm off-white · alt sections",               utility: "bg-ag-cream",        tier: "ref", light: true },
  { varName: "ag-green",  hex: "#1A7A4A", role: "Trust · success · LTV-safe",                  utility: "bg-ag-green",        tier: "ref" },
  { varName: "ag-light",  hex: "#F4F5F7", role: "Subtle surface · disabled",                    utility: "bg-ag-light",        tier: "ref", light: true },
  { varName: "ag-text",   hex: "#101828", role: "Body — never #000",                            utility: "text-ag-text",       tier: "ref" },
  { varName: "ag-muted",  hex: "#475467", role: "Secondary text · helpers",                     utility: "text-ag-muted",      tier: "ref" },
  { varName: "ag-border", hex: "#D0D5DD", role: "Dividers · input borders",                     utility: "border-ag-border",   tier: "ref", light: true },
  { varName: "ag-amber",  hex: "#B45309", role: "LTV-caution 80–90%",                           utility: "text-ag-amber",      tier: "ref" },
  { varName: "ag-red",    hex: "#B42318", role: "LTV-warning >90% · errors",                    utility: "text-ag-red",        tier: "ref" },
  { varName: "ag-white",  hex: "#FFFFFF", role: "Card surface on cream",                         utility: "bg-ag-white",        tier: "ref", light: true },
];

const VITALITY_TOKENS = [
  { varName: "ag-navy-deep",   hex: "#061A2E", role: "Deeper navy · mesh-navy bloom",         utility: "bg-ag-navy-deep",   tier: "ref" },
  { varName: "ag-navy-soft",   hex: "#0F2F50", role: "Lifted navy · hover states",            utility: "bg-ag-navy-soft",   tier: "ref" },
  { varName: "ag-gold-rich",   hex: "#E0B040", role: "Saturated gold · top-stop · accents",   utility: "bg-ag-gold-rich",   tier: "ref" },
  { varName: "ag-gold-soft",   hex: "#DDA935", role: "Warm gold · decorative",                utility: "bg-ag-gold-soft",   tier: "ref" },
  { varName: "ag-cream-warm",  hex: "#FAF3E8", role: "Toasted cream · alt rhythm",            utility: "bg-ag-cream-warm",  tier: "ref", light: true },
  { varName: "ag-cream-deep",  hex: "#EDE5D5", role: "Deep cream · Trust + Wizard",           utility: "bg-ag-cream-deep",  tier: "ref", light: true },
  { varName: "ag-green-sage",  hex: "#E6EFE8", role: "Sage tint · Savings + Enquiry bg",      utility: "bg-ag-green-sage",  tier: "ref", light: true },
  { varName: "ag-green-deep",  hex: "#14613A", role: "Deeper success · trust accents",        utility: "bg-ag-green-deep",  tier: "ref" },
];

const BRIGHT_TOKENS = [
  { varName: "ag-navy-vivid",   hex: "#1F4FA8", role: "Electric navy · AI-style accent · active CTA",      utility: "bg-ag-navy-vivid",  tier: "ref" },
  { varName: "ag-gold-vivid",   hex: "#F0C441", role: "Saturated gold · celebration · accepted state",     utility: "bg-ag-gold-vivid",  tier: "ref", light: true },
  { varName: "ag-green-vivid",  hex: "#22C55E", role: "Spring green · LTV-safe emphasis · success lift",   utility: "bg-ag-green-vivid", tier: "ref" },
  { varName: "ag-cream-vivid",  hex: "#FFEFC2", role: "Luminous cream · hero wash · pairs with gold-vivid", utility: "bg-ag-cream-vivid", tier: "ref", light: true },
];

const SURFACE_LIGHT = [
  { varName: "surface-light-1", hex: "#FFFFFF", role: "Page bg · primary card",          utility: "bg-surface-light-1", tier: "ref", light: true },
  { varName: "surface-light-2", hex: "#F9FAFB", role: "Subtle alt · zebra rows",          utility: "bg-surface-light-2", tier: "ref", light: true },
  { varName: "surface-light-3", hex: "#F4F5F7", role: "Deeper alt · pressed · inputs",    utility: "bg-surface-light-3", tier: "ref", light: true },
];

const SURFACE_DARK = [
  { varName: "surface-dark-1",  hex: "#0A2540", role: "Primary inverse · same as ag-navy",   utility: "bg-surface-dark-1", tier: "ref" },
  { varName: "surface-dark-2",  hex: "#0F2F50", role: "Lifted dark · hover · alt",            utility: "bg-surface-dark-2", tier: "ref" },
  { varName: "surface-dark-3",  hex: "#061A2E", role: "Deepest · emphasis · cards on dark",   utility: "bg-surface-dark-3", tier: "ref" },
];

const SEMANTIC_TOKENS = [
  { varName: "sys-color-text-primary",    hex: "#101828", role: "Body text · global selector",                   refs: "ref-color-text",     tier: "sys" },
  { varName: "sys-color-text-secondary",  hex: "#475467", role: "Secondary / helper text",                        refs: "ref-color-muted",    tier: "sys" },
  { varName: "sys-color-text-inverse",    hex: "#F8F5EF", role: "Text on dark surfaces",                          refs: "ref-color-cream-500", tier: "sys", light: true },
  { varName: "sys-color-surface-bg",      hex: "#FFFFFF", role: "Default page / card background",                 refs: "ref-color-white",    tier: "sys", light: true },
  { varName: "sys-color-surface-subtle",  hex: "#F9FAFB", role: "Subtle alt · zebra",                             refs: "ref-color-surface-alt", tier: "sys", light: true },
  { varName: "sys-color-border-default",  hex: "#D0D5DD", role: "Default borders · dividers",                     refs: "ref-color-border",   tier: "sys", light: true },
  { varName: "sys-color-accent",          hex: "#1F4FA8", role: "Feature highlight · active state",               refs: "ref-color-navy-vivid", tier: "sys" },
  { varName: "sys-color-feedback-success",hex: "#1A7A4A", role: "Success · LTV-safe · InlinePrompt",              refs: "ref-color-green-500", tier: "sys" },
  { varName: "sys-color-feedback-warning",hex: "#B45309", role: "Warning · LTV-caution",                          refs: "ref-color-amber",    tier: "sys" },
  { varName: "sys-color-feedback-danger", hex: "#B42318", role: "Error · LTV-warning · form errors",              refs: "ref-color-red",      tier: "sys" },
];

const COMP_TOKENS = [
  { varName: "comp-cta-primary-bg",      hex: "#1F4FA8", role: "Primary CTA · button fill",              refs: "sys-color-accent",        tier: "comp" },
  { varName: "comp-cta-primary-text",    hex: "#FAF3E8", role: "Primary CTA · button label",             refs: "ref-color-cream-warm",    tier: "comp", light: true },
  { varName: "comp-trust-regulatory-bg", hex: "#0A2540", role: "CBN badge · regulatory strip bg",        refs: "ref-color-navy-500",      tier: "comp" },
  { varName: "comp-feedback-safe-bg",    hex: "#E6EFE8", role: "LTV-safe band · success surface",         refs: "ref-color-green-sage",    tier: "comp", light: true },
  { varName: "comp-feedback-danger-bg",  hex: "#FCF0EE", role: "Validation error surface (ag-red @ 5%)", refs: "ag-red rgba(5%)",          tier: "comp", light: true },
  { varName: "comp-numeric-emphasis-text", hex: "#1F4FA8", role: "Hero numeric on light surfaces",       refs: "ref-color-navy-vivid",    tier: "comp" },
];

// Tier badge
const TierBadge: React.FC<{ tier: "ref" | "sys" | "comp" }> = ({ tier }) => {
  const styles: Record<string, string> = {
    ref:  "bg-ag-navy text-ag-cream",
    sys:  "bg-ag-navy-vivid text-ag-cream",
    comp: "bg-ag-green-deep text-ag-cream",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] numeric font-semibold uppercase tracking-[0.06em] ${styles[tier]}`}>
      {tier}
    </span>
  );
};

export default function TokensColorPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Colour tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Colour</span>
          <span className="bi-serif italic block">tokens.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          Three tiers. 24 locked canonical hexes in the{" "}
          <TierBadge tier="ref" /> layer. Semantic aliases in the{" "}
          <TierBadge tier="sys" /> layer — this is what dark mode remaps.
          Component-scoped compositions in the{" "}
          <TierBadge tier="comp" /> layer. No component ever touches a{" "}
          <code className="numeric text-sm">ref</code> token directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <TierBadge tier="ref" />
          <span className="text-xs text-ag-muted self-center">24 canonical hexes + surfaces</span>
          <span className="text-ag-border self-center">·</span>
          <TierBadge tier="sys" />
          <span className="text-xs text-ag-muted self-center">10 semantic aliases</span>
          <span className="text-ag-border self-center">·</span>
          <TierBadge tier="comp" />
          <span className="text-xs text-ag-muted self-center">10 named pair compositions</span>
        </div>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        {/* ── REF tier ── */}
        <section aria-labelledby="ref-heading">
          <header className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <TierBadge tier="ref" />
              <span aria-hidden="true" className="flex-1 border-t border-ag-border" />
            </div>
            <h2 id="ref-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Reference</span>{" "}
              <span className="bi-serif">layer</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Primitive brand values. The 24 locked hexes. Never consumed directly
              by UI components — always aliased via <code className="numeric text-xs">sys</code> or{" "}
              <code className="numeric text-xs">comp</code>. Edit a canonical hex and
              every alias across both tiers follows.
            </p>
          </header>

          <SpecimenGroup label="Base brand layer" count={`${BRAND_TOKENS.length} tokens`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {BRAND_TOKENS.map((t) => (
                <TokenSwatch key={t.varName} varName={t.varName} hex={t.hex} role={t.role} utility={t.utility} light={t.light} />
              ))}
            </div>
          </SpecimenGroup>

          <SpecimenGroup label="Vitality tonal variants" count={`${VITALITY_TOKENS.length} variants`} description="LCH-lightness shifts within the four locked hue families. Same hue — different luminosity step." className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {VITALITY_TOKENS.map((t) => (
                <TokenSwatch key={t.varName} varName={t.varName} hex={t.hex} role={t.role} utility={t.utility} light={t.light} />
              ))}
            </div>
          </SpecimenGroup>

          <SpecimenGroup label="Vivid accents" count={`${BRIGHT_TOKENS.length} accents`} description="Chroma lift. h=219° navy, h=45° gold, h=142° green, h=44° cream — none crosses into purple/lila territory (PRD §7 cleared)." className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {BRIGHT_TOKENS.map((t) => (
                <TokenSwatch key={t.varName} varName={t.varName} hex={t.hex} role={t.role} utility={t.utility} light={t.light} />
              ))}
            </div>
          </SpecimenGroup>

          <SpecimenGroup label="Surface scales" count="3 light + 3 dark" className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {SURFACE_LIGHT.map((t) => (
                <TokenSwatch key={t.varName} varName={t.varName} hex={t.hex} role={t.role} utility={t.utility} light={t.light} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SURFACE_DARK.map((t) => (
                <TokenSwatch key={t.varName} varName={t.varName} hex={t.hex} role={t.role} utility={t.utility} />
              ))}
            </div>
          </SpecimenGroup>
        </section>

        {/* ── SYS tier ── */}
        <section aria-labelledby="sys-heading">
          <header className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <TierBadge tier="sys" />
              <span aria-hidden="true" className="flex-1 border-t border-ag-border" />
            </div>
            <h2 id="sys-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">System</span>{" "}
              <span className="bi-serif">semantic layer</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Semantic aliases pointing at <code className="numeric text-xs">ref</code>.
              This is the layer dark mode flips. In a{" "}
              <code className="numeric text-xs">[data-theme="dark"]</code> override,
              only these tokens need remapping — no component code changes.
            </p>
          </header>

          <SpecimenGroup label="Semantic aliases" count={`${SEMANTIC_TOKENS.length} tokens`} description="Each sys token points at a ref token via var(). The → ref column shows the source.">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SEMANTIC_TOKENS.map((t) => (
                <div key={t.varName} className="flex flex-col rounded-md overflow-hidden bg-ag-white border border-ag-border">
                  <div
                    className="h-16"
                    style={{ background: t.hex }}
                    aria-hidden="true"
                  />
                  <div className="p-2.5 flex flex-col gap-0.5">
                    <p className="numeric text-[10.5px] text-ag-text truncate">--{t.varName}</p>
                    <p className="numeric text-[10px] text-ag-muted truncate">→ --{t.refs}</p>
                    <p className="text-[11px] text-ag-muted leading-snug mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </SpecimenGroup>

          <CodeBlock
            className="mt-8"
            label="Dark mode — remap sys tokens only"
            code={`/* In a future dark-mode override, only sys tokens need to change.
   No component code changes, no ref tokens touched. */

[data-theme="dark"] {
  --sys-color-surface-bg:      var(--ref-color-navy-500);
  --sys-color-surface-subtle:  var(--ref-color-navy-400);
  --sys-color-text-primary:    var(--ref-color-cream-500);
  --sys-color-text-secondary:  var(--ref-color-cream-warm);
  --sys-color-border-default:  var(--ref-color-navy-soft);
}`}
          />
        </section>

        {/* ── COMP tier ── */}
        <section aria-labelledby="comp-heading">
          <header className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <TierBadge tier="comp" />
              <span aria-hidden="true" className="flex-1 border-t border-ag-border" />
            </div>
            <h2 id="comp-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Component</span>{" "}
              <span className="bi-serif">compositions</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Component-scoped compositions. The{" "}
              <code className="numeric text-xs">--pair-*</code> tokens are exactly this
              layer — renamed to <code className="numeric text-xs">--comp-*</code>. Both
              names work during migration. New components consume{" "}
              <code className="numeric text-xs">--comp-*</code> only.
            </p>
          </header>

          <SpecimenGroup label="comp · key compositions" count={`${COMP_TOKENS.length} shown`} description="A representative sample. See globals.css for the full set of --comp-* tokens covering all 10 named pairs.">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {COMP_TOKENS.map((t) => (
                <div key={t.varName} className="flex flex-col rounded-md overflow-hidden bg-ag-white border border-ag-border">
                  <div
                    className={`h-16 ${t.light ? "ring-1 ring-inset ring-ag-border" : ""}`}
                    style={{ background: t.hex }}
                    aria-hidden="true"
                  />
                  <div className="p-2.5 flex flex-col gap-0.5">
                    <p className="numeric text-[10.5px] text-ag-text truncate">--{t.varName}</p>
                    <p className="numeric text-[10px] text-ag-muted truncate">→ --{t.refs}</p>
                    <p className="text-[11px] text-ag-muted leading-snug mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </SpecimenGroup>

          <CodeBlock
            className="mt-8"
            label="comp token usage — button component"
            code={`/* New Button.tsx using comp tier */
.button-primary {
  background: var(--comp-cta-primary-bg);
  color:      var(--comp-cta-primary-text);
}
/* vs legacy (still valid during migration) */
.button-primary {
  background: var(--pair-cta-primary-surface); /* same value */
}`}
          />
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Colour tokens — AGMB · 24 canonical hexes · ref / sys / comp</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens/typography" className="hover:text-ag-navy transition-token">Typography &rarr;</Link>
            <Link href="/tokens" className="hover:text-ag-navy transition-token">Overview &rarr;</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
