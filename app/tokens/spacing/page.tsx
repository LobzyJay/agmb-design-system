// /tokens/spacing — spacing, grid, and layout token catalogue
// Server Component.
import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/design/CodeBlock";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";

export const metadata: Metadata = {
  title: "Spacing tokens — AGMB Design System",
  description: "Base-8 spacing scale, 12-column grid utility, section padding rhythm.",
};

const SPACING_STEPS = [
  { px: 4,   t: "space-1",  desc: "Micro · icon gap · inline tight"       },
  { px: 8,   t: "space-2",  desc: "Compact · button padding vertical"     },
  { px: 16,  t: "space-4",  desc: "Default gap · card inner rhythm"       },
  { px: 24,  t: "space-6",  desc: "Standard section padding · grid gap"   },
  { px: 32,  t: "space-8",  desc: "Large gap · subsection spacing"        },
  { px: 48,  t: "space-12", desc: "Section separation · mobile padding"   },
  { px: 64,  t: "space-16", desc: "Large section gap · desktop"           },
  { px: 96,  t: "space-24", desc: "Chapter separation · hero vertical"    },
];

export default function TokensSpacingPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Spacing tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Spacing</span>
          <span className="bi-serif italic block">& grid.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          Base-8 scale (4 → 96px). 12-column{" "}
          <code className="numeric text-sm">.grid-12</code> utility, max-width 1400px.
          Section padding: <code className="numeric text-sm">px-6 md:px-10 lg:px-14</code>.
          All layout rhythm traces to this scale — no ad hoc values.
        </p>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        <section aria-labelledby="scale-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Base-8 scale · ref tier</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="scale-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Spacing</span>{" "}
              <span className="bi-serif">scale</span>
            </h2>
          </header>

          <SpecimenGroup label="8 steps" count="4 → 96 px">
            <div className="flex flex-col gap-4">
              {SPACING_STEPS.map((s) => (
                <div key={s.px} className="flex items-center gap-6">
                  <span className="w-[72px] numeric text-xs text-ag-muted text-right shrink-0">{s.px}px</span>
                  <span
                    className="block bg-ag-navy-vivid rounded-sm shrink-0"
                    style={{ width: s.px, height: 10 }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-ag-muted">{s.desc}</span>
                </div>
              ))}
            </div>
          </SpecimenGroup>
        </section>

        <section aria-labelledby="grid-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">12-column grid</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="grid-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Grid</span>{" "}
              <span className="bi-serif">utility</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Drop-in <code className="numeric text-xs">.grid-12</code> on any section wrapper.
              Children use Tailwind <code className="numeric text-xs">col-span-N</code>.
              Max-width 1400px, gutter 24/32px responsive.
            </p>
          </header>

          <div className="bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Pattern</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Use case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                {[
                  { code: "col-span-12",                         use: "Full width — headlines, heroes, banners" },
                  { code: "lg:col-start-3 lg:col-span-8",        use: "8/12 centred — forms, calculator, wizard" },
                  { code: "col-span-12 md:col-span-6",           use: "50/50 split — two-column content" },
                  { code: "col-span-12 md:col-span-4",           use: "1/3 cards — 3-up layouts" },
                  { code: "col-span-12 md:col-span-8 lg:col-span-5", use: "Asymmetric hero — text left, asset right" },
                ].map((row) => (
                  <tr key={row.code}>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{row.code}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock className="mt-6" label=".grid-12 — globals.css" code={`.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  max-width: 1400px;
  margin-inline: auto;
  width: 100%;
  padding-inline: 1.5rem;  /* 24px mobile */
}
@media (min-width: 768px)  { .grid-12 { padding-inline: 2.5rem; column-gap: 2rem; } }
@media (min-width: 1024px) { .grid-12 { padding-inline: 3.5rem; column-gap: 2rem; } }`} />
        </section>

        <section aria-labelledby="padding-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">Section padding rhythm</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="padding-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Padding</span>{" "}
              <span className="bi-serif">convention</span>
            </h2>
          </header>
          <div className="bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Class</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Value</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                {[
                  { cls: "px-6",               val: "24px",          ctx: "Default horizontal padding · mobile" },
                  { cls: "md:px-10",           val: "40px",          ctx: "Horizontal padding · tablet" },
                  { cls: "lg:px-14",           val: "56px",          ctx: "Horizontal padding · desktop" },
                  { cls: "py-16 md:py-32",     val: "64 / 128px",    ctx: "Chapter vertical padding" },
                  { cls: "pt-20 md:pt-32",     val: "80 / 128px",    ctx: "Hero top padding" },
                ].map((row) => (
                  <tr key={row.cls}>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{row.cls}</td>
                    <td className="px-4 py-2.5 numeric text-ag-muted">{row.val}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{row.ctx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Spacing tokens — base-8 · .grid-12 · 1400px max</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens/motion" className="hover:text-ag-navy transition-token">Motion &rarr;</Link>
            <Link href="/tokens/typography" className="hover:text-ag-navy transition-token">&larr; Typography</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
