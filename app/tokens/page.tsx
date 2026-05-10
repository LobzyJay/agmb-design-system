// /tokens landing page — tier diagram + what-is-a-token intro.
// Server Component. No interactivity here — static editorial.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokens — AGMB Design System",
  description:
    "Three-tier token architecture: ref / sys / comp. The foundation that makes dark mode, multi-theme, and component isolation possible.",
};

// ── Tier flow diagram — SVG-rendered, accessible, AGMB palette ───────────────
// Drawn as inline SVG so it renders server-side, no dependency.
// Three boxes connected by downward arrows. Measurements are proportional.
function TierDiagram() {
  return (
    <div
      className="bg-ag-white border border-ag-border rounded-card overflow-hidden"
      role="img"
      aria-label="Token tier flow: ref (raw values) points to sys (semantic/themeable) points to comp (component compositions)"
    >
      {/* Mobile text table — shown below md */}
      <div className="md:hidden p-6 flex flex-col gap-0">
        <TierRow
          tier="ref"
          tagline="raw values · brand-owned"
          example="--ref-color-navy-500 = #0A2540"
          color="var(--ag-navy)"
          textColor="var(--ag-cream)"
        />
        <div className="flex items-center gap-3 pl-6 py-2" aria-hidden="true">
          <ArrowDown />
          <span className="numeric text-[10px] text-ag-muted uppercase tracking-wider">aliases via var()</span>
        </div>
        <TierRow
          tier="sys"
          tagline="semantic · flips in dark mode"
          example="--sys-color-surface-bg → ref-color-white"
          color="var(--ag-navy-vivid)"
          textColor="var(--ag-cream)"
        />
        <div className="flex items-center gap-3 pl-6 py-2" aria-hidden="true">
          <ArrowDown />
          <span className="numeric text-[10px] text-ag-muted uppercase tracking-wider">aliases via var()</span>
        </div>
        <TierRow
          tier="comp"
          tagline="component compositions"
          example="--comp-cta-primary-bg → sys-accent"
          color="var(--ag-green-deep)"
          textColor="var(--ag-cream)"
        />
      </div>

      {/* Desktop SVG diagram — hidden on mobile */}
      <svg
        viewBox="0 0 700 360"
        className="hidden md:block w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="700" height="360" fill="white" />

        {/* ── ref box ── */}
        <rect x="220" y="24" width="260" height="80" rx="6" fill="#0A2540" />
        <text x="350" y="56" textAnchor="middle" fill="#F8F5EF" fontFamily="var(--font-body-tight), system-ui, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.06em">
          ref
        </text>
        <text x="350" y="74" textAnchor="middle" fill="#F8F5EFaa" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="11">
          raw values · brand-owned
        </text>
        <text x="350" y="92" textAnchor="middle" fill="#C8972A" fontFamily="var(--font-numeric, monospace)" fontSize="10" letterSpacing="0.01em">
          --ref-color-navy-500 = #0A2540
        </text>

        {/* Arrow ref → sys */}
        <line x1="350" y1="104" x2="350" y2="128" stroke="#D0D5DD" strokeWidth="1.5" />
        <polygon points="344,128 356,128 350,138" fill="#D0D5DD" />
        <text x="362" y="122" fill="#475467" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10">
          var()
        </text>

        {/* ── sys box ── */}
        <rect x="220" y="140" width="260" height="90" rx="6" fill="#1F4FA8" />
        <text x="350" y="172" textAnchor="middle" fill="#FAF3E8" fontFamily="var(--font-body-tight), system-ui, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.06em">
          sys
        </text>
        <text x="350" y="190" textAnchor="middle" fill="#FAF3E8aa" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="11">
          semantic · flips in dark mode
        </text>
        <text x="350" y="208" textAnchor="middle" fill="#FFEFC2" fontFamily="var(--font-numeric, monospace)" fontSize="10">
          --sys-color-surface-bg → ref
        </text>
        <text x="350" y="222" textAnchor="middle" fill="#FAF3E870" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10">
          text-primary / surface / feedback
        </text>

        {/* Arrow sys → comp */}
        <line x1="350" y1="230" x2="350" y2="254" stroke="#D0D5DD" strokeWidth="1.5" />
        <polygon points="344,254 356,254 350,264" fill="#D0D5DD" />
        <text x="362" y="248" fill="#475467" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10">
          var()
        </text>

        {/* ── comp box ── */}
        <rect x="220" y="266" width="260" height="72" rx="6" fill="#14613A" />
        <text x="350" y="295" textAnchor="middle" fill="#F8F5EF" fontFamily="var(--font-body-tight), system-ui, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.06em">
          comp
        </text>
        <text x="350" y="313" textAnchor="middle" fill="#F8F5EFaa" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="11">
          component compositions
        </text>
        <text x="350" y="328" textAnchor="middle" fill="#22C55E" fontFamily="var(--font-numeric, monospace)" fontSize="10">
          --comp-cta-primary-bg → sys-accent
        </text>

        {/* Left annotation: "never used by components directly" for ref */}
        <text x="24" y="68" fill="#475467" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10" textAnchor="start">never used by</text>
        <text x="24" y="80" fill="#475467" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10">components directly</text>
        <line x1="100" y1="73" x2="218" y2="73" stroke="#D0D5DD" strokeWidth="1" strokeDasharray="3 3" />

        {/* Left annotation: "dark mode flips here" for sys */}
        <text x="8" y="180" fill="#1F4FA8" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10" fontWeight="600">dark mode</text>
        <text x="8" y="192" fill="#1F4FA8" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10" fontWeight="600">flips here</text>
        <line x1="80" y1="185" x2="218" y2="185" stroke="#1F4FA8" strokeWidth="1" strokeDasharray="3 3" />

        {/* Right annotation: "consume this in components" for comp */}
        <text x="492" y="296" fill="#14613A" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10" fontWeight="600">consume this</text>
        <text x="492" y="308" fill="#14613A" fontFamily="var(--font-body), system-ui, sans-serif" fontSize="10" fontWeight="600">in components</text>
        <line x1="482" y1="302" x2="480" y2="302" stroke="#14613A" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

// Mobile-only tier row
const TierRow: React.FC<{
  tier: string;
  tagline: string;
  example: string;
  color: string;
  textColor: string;
}> = ({ tier, tagline, example, color, textColor }) => (
  <div
    className="rounded-md p-4"
    style={{ background: color, color: textColor }}
  >
    <p
      className="text-sm font-semibold uppercase tracking-[0.08em] mb-1"
      style={{ fontFamily: "var(--font-body-tight, system-ui)" }}
    >
      {tier}
    </p>
    <p className="text-xs opacity-70 mb-2">{tagline}</p>
    <p
      className="numeric text-[10px] opacity-80"
      style={{ fontFamily: "var(--font-numeric, monospace)" }}
    >
      {example}
    </p>
  </div>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <line x1="8" y1="2" x2="8" y2="12" stroke="var(--ag-border)" strokeWidth="1.5" />
    <polyline points="4,10 8,14 12,10" stroke="var(--ag-border)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);

// ── Token catalogue entries ────────────────────────────────────────────────
const CATALOGUE = [
  {
    path: "/tokens/color",
    title: "Colour",
    meta: "ref + sys + comp",
    count: "24 canonical · 7 sub-routes",
    description:
      "All colour tokens across three tiers. Surface scales, semantic aliases, named pair compositions. The tier model applied to colour first.",
    accent: "var(--ag-navy)",
  },
  {
    path: "/tokens/typography",
    title: "Typography",
    meta: "families · scale",
    count: "4 families · 8 scale steps",
    description:
      "Libre Baskerville, Elms Sans, Inter, Inter Tight. The type stack locked 2026-05-09 — heading/display, body, UI, and numeric registers.",
    accent: "var(--ag-navy-vivid)",
  },
  {
    path: "/tokens/spacing",
    title: "Spacing",
    meta: "base-8 · grid",
    count: "8 steps · 12-col grid",
    description:
      "Base-8 scale (4 → 96px), 12-column .grid-12 utility, section padding rhythm, responsive gutter behaviour.",
    accent: "var(--ag-green)",
  },
  {
    path: "/tokens/motion",
    title: "Motion",
    meta: "durations · easings",
    count: "5 durations · 3 curves",
    description:
      "Five duration steps, three cubic-bezier curves, spring constants. Live demos. prefers-reduced-motion honoured on all samples.",
    accent: "var(--ag-gold-rich)",
  },
  {
    path: "/tokens/elevation",
    title: "Elevation",
    meta: "shadow stacks",
    count: "3 soft levels",
    description:
      "Navy-tinted soft shadow stacks. Cards default flat (border only). Elevation reserved for hover and modal states.",
    accent: "var(--ag-navy-soft)",
  },
  {
    path: "/tokens/radius",
    title: "Radius",
    meta: "scale · samples",
    count: "3 steps",
    description:
      "8 / 6 / 4 px — Stripe-restraint pass. Cards, buttons, inputs. Never raw rounded-2xl — always via .rounded-card / button / input utilities.",
    accent: "var(--ag-green-deep)",
  },
] as const;

export default function TokensPage() {
  return (
    <>
      {/* Page hero */}
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">AGMB · Token catalogue</p>
          <Link
            href="/design"
            className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline"
          >
            Design system &rarr;
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">The values the</span>
          <span className="bi-serif italic block">system composes from.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          Three tiers — <code className="numeric text-sm">ref</code>,{" "}
          <code className="numeric text-sm">sys</code>,{" "}
          <code className="numeric text-sm">comp</code>. Raw values at the bottom,
          semantic aliases in the middle, component compositions at the top.
          Dark mode and multi-theme flip the <code className="numeric text-sm">sys</code>{" "}
          layer only. Components never touch{" "}
          <code className="numeric text-sm">ref</code> directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-xs text-ag-muted numeric">
          <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">24 canonical hexes</span>
          <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">ref / sys / comp tiers</span>
          <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">additive aliasing</span>
          <span className="px-3 py-1.5 bg-ag-white border border-ag-border rounded-full">dark-mode ready</span>
        </div>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-16 max-w-5xl">

        {/* Tier diagram */}
        <section aria-labelledby="tier-diagram-heading">
          <header className="flex flex-col gap-3 mb-8">
            <div className="flex flex-col gap-2.5">
              <p className="eyebrow">Tier model</p>
              <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            </div>
            <h2
              id="tier-diagram-heading"
              className="bi-section text-ag-navy text-2xl md:text-4xl leading-tight tracking-tight"
            >
              <span className="bi-sans">ref / sys /</span>{" "}
              <span className="bi-serif">comp</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Additive aliasing: all three tiers co-exist in{" "}
              <code className="numeric text-xs">globals.css</code>. The legacy{" "}
              <code className="numeric text-xs">--ag-*</code> tokens remain valid — they
              become <code className="numeric text-xs">ref</code> aliases. Components
              migrate to <code className="numeric text-xs">sys-*</code> and{" "}
              <code className="numeric text-xs">comp-*</code> at their own pace.
            </p>
          </header>
          <TierDiagram />

          {/* Tier reference table */}
          <div className="mt-8 bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Tier</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Purpose</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Flips in dark mode</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                <tr>
                  <td className="px-4 py-3 numeric font-semibold text-ag-navy text-sm">ref</td>
                  <td className="px-4 py-3 text-ag-text">Primitive brand values. Never consumed by UI components directly.</td>
                  <td className="px-4 py-3 text-ag-muted">No</td>
                  <td className="px-4 py-3 numeric text-xs text-ag-muted">--ref-color-navy-500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 numeric font-semibold text-ag-navy-vivid text-sm">sys</td>
                  <td className="px-4 py-3 text-ag-text">Semantic aliases. Points at ref. Remap per theme.</td>
                  <td className="px-4 py-3 text-ag-green font-medium">Yes</td>
                  <td className="px-4 py-3 numeric text-xs text-ag-muted">--sys-color-surface-bg</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 numeric font-semibold text-ag-green-deep text-sm">comp</td>
                  <td className="px-4 py-3 text-ag-text">Component-scoped compositions. Renames the --pair-* tokens.</td>
                  <td className="px-4 py-3 text-ag-muted">Per component</td>
                  <td className="px-4 py-3 numeric text-xs text-ag-muted">--comp-cta-primary-bg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Migration rule */}
        <section aria-labelledby="migration-heading" className="mt-16">
          <header className="flex flex-col gap-3 mb-6">
            <div className="flex flex-col gap-2.5">
              <p className="eyebrow">QA gate · migration rule</p>
              <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            </div>
            <h2 id="migration-heading" className="bi-section text-ag-navy text-2xl leading-tight tracking-tight">
              <span className="bi-sans">What new</span>{" "}
              <span className="bi-serif">components must do</span>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-ag-green-sage border border-ag-border rounded-card p-6">
              <p className="eyebrow !text-ag-green mb-3">Do</p>
              <ul className="text-sm text-ag-text leading-relaxed space-y-2 list-disc list-inside">
                <li>Consume colours via <code className="numeric text-xs">--sys-*</code> or <code className="numeric text-xs">--comp-*</code></li>
                <li>Use Tailwind utilities <code className="numeric text-xs">bg-ag-navy</code> for brand colours (legacy-permitted)</li>
                <li>Reference motion via <code className="numeric text-xs">.transition-token</code> or <code className="numeric text-xs">--sys-motion-*</code></li>
                <li>Reference radius via <code className="numeric text-xs">.rounded-card / .rounded-button / .rounded-input</code></li>
              </ul>
            </div>
            <div className="bg-ag-white border border-ag-border rounded-card p-6">
              <p className="eyebrow !text-ag-red mb-3">Never</p>
              <ul className="text-sm text-ag-text leading-relaxed space-y-2 list-disc list-inside">
                <li>Consume <code className="numeric text-xs">--ref-*</code> tokens directly in component styles</li>
                <li>Use raw hex literals inside component files</li>
                <li>Use raw <code className="numeric text-xs">200ms</code> duration strings</li>
                <li>Use <code className="numeric text-xs">rounded-2xl</code> or other Tailwind radius utilities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Catalogue grid */}
        <section aria-labelledby="catalogue-heading" className="mt-16">
          <header className="flex flex-col gap-3 mb-8">
            <div className="flex flex-col gap-2.5">
              <p className="eyebrow">Categories</p>
              <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            </div>
            <h2 id="catalogue-heading" className="bi-section text-ag-navy text-2xl leading-tight tracking-tight">
              <span className="bi-sans">Token</span>{" "}
              <span className="bi-serif">categories</span>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATALOGUE.map((cat) => (
              <Link
                key={cat.path}
                href={cat.path}
                className="group flex flex-col gap-3 bg-ag-white border border-ag-border rounded-card p-6 hover:border-ag-text transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-ag-text group-hover:text-ag-navy transition-token">
                      {cat.title}
                    </p>
                    <p className="numeric text-[10px] text-ag-muted uppercase tracking-[0.08em]">
                      {cat.count}
                    </p>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ background: cat.accent }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-xs text-ag-muted leading-relaxed">{cat.description}</p>
                <p className="numeric text-[10px] text-ag-gold group-hover:text-ag-navy transition-token">
                  {cat.meta} &rarr;
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">
            AGMB token catalogue &mdash; Lane A · 2026-05-09. ref / sys / comp.
          </p>
          <p className="text-xs text-ag-muted numeric">
            PRD §4 · LESSONS §4 · globals.css
          </p>
        </div>
      </footer>
    </>
  );
}
