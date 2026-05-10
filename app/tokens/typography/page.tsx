// /tokens/typography — typography token catalogue
// Server Component. Promoted from /design ch.01.3 and extended with tier labels.
import Link from "next/link";
import type { Metadata } from "next";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";
import { CodeBlock } from "@/components/design/CodeBlock";

export const metadata: Metadata = {
  title: "Typography tokens — AGMB Design System",
  description: "Type stack locked 2026-05-09. Libre Baskerville + Elms Sans + Inter + Inter Tight.",
};

const TYPE_FAMILIES = [
  {
    name: "Libre Baskerville",
    token: "--font-serif",
    utility: "font-serif",
    register: "Display 1 · Heading-only · bi-script serif side",
    sample: "Your home. Your terms.",
    italic: "Starting today.",
    weights: "400 · 400i · 700",
    source: "Pablo Impallari · SIL OFL · Google Fonts",
    tier: "ref",
    dark: false,
  },
  {
    name: "Elms Sans",
    token: "--font-sans",
    utility: "font-sans",
    register: "Display 2 · Heading-only · bi-script sans side",
    sample: "Section titles. Bi-script sans. Three registers.",
    italic: null,
    weights: "Variable axis · 500 / 600 / 700",
    source: "Google Fonts · SIL OFL",
    tier: "ref",
    dark: false,
  },
  {
    name: "Inter Tight",
    token: "--font-numeric / --font-body-tight",
    utility: "numeric / font-body-tight",
    register: "UI labels · buttons · tabular numerics",
    sample: "₦485,720 / mo",
    italic: null,
    weights: "Variable axis · 400–700",
    source: "Google Fonts · SIL OFL",
    tier: "ref",
    dark: true,
  },
  {
    name: "Inter",
    token: "--font-body",
    utility: "font-body (default body)",
    register: "Default body · prose · 14–18px",
    sample: "A CBN-licensed Primary Mortgage Bank, established 2004. We disbursed ₦2.8B to 97 Nigerian families.",
    italic: null,
    weights: "Variable axis · 400–600",
    source: "Google Fonts · SIL OFL",
    tier: "ref",
    dark: false,
  },
];

const TYPE_SCALE = [
  { token: "Display · 56/56",  family: "Libre Baskerville",                weight: "700",        note: "Heading-only · serif side of bi-script · italic accents" },
  { token: "Display · 56/56",  family: "Elms Sans",                        weight: "700",        note: "Heading-only · sans side of bi-script · 3 weight registers" },
  { token: "Section · 36/40",  family: "Libre Baskerville / Elms Sans",    weight: "500 / 600",  note: "Section titles · bi-script" },
  { token: "Body · 17/26",     family: "Inter",                            weight: "400",        note: "Default body · prose-optimised · long copy" },
  { token: "UI · 14–20",       family: "Inter Tight",                      weight: "400–600",    note: "UI labels · buttons · medium-density" },
  { token: "Small · 14/20",    family: "Inter",                            weight: "400",        note: "Helper · footnote · table content" },
  { token: "Eyebrow · 11/14",  family: "Elms Sans",                        weight: "600",        note: "Uppercase · navy default · 0.08em tracking" },
  { token: "Numeric · 24/28",  family: "Inter Tight",                      weight: "500",        note: "Tabular figures via OpenType tnum · replaces Geist Mono" },
];

export default function TokensTypographyPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Typography tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Typography</span>
          <span className="bi-serif italic block">stack.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          Locked 2026-05-09. Four families, three registers, one bi-script system.
          Elms Sans + Libre Baskerville are heading-only. Inter handles body.
          Inter Tight handles UI, labels, and numerics via OpenType{" "}
          <code className="numeric text-sm">tnum</code>.
        </p>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        {/* Family cards */}
        <section aria-labelledby="families-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Four families · ref tier</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="families-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Type</span>{" "}
              <span className="bi-serif">families</span>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TYPE_FAMILIES.map((f) => (
              <article
                key={f.name}
                className={`rounded-card border border-ag-border p-7 ${f.dark ? "bg-ag-navy" : "bg-ag-white"}`}
              >
                <p className={`eyebrow mb-3 ${f.dark ? "!text-ag-gold" : ""}`}>{f.register}</p>
                {f.name === "Libre Baskerville" && (
                  <p className="bi-serif text-ag-navy text-3xl leading-tight">
                    {f.sample}<br />
                    {f.italic && <span className="italic">{f.italic}</span>}
                  </p>
                )}
                {f.name === "Elms Sans" && (
                  <p className="bi-sans text-ag-navy text-3xl leading-tight" style={{ fontWeight: 700 }}>
                    {f.sample}
                  </p>
                )}
                {f.name === "Inter Tight" && (
                  <p className="numeric text-ag-cream text-4xl leading-none">{f.sample}</p>
                )}
                {f.name === "Inter" && (
                  <p className="text-ag-text text-[17px] leading-[1.6]" style={{ fontFamily: "var(--font-body)" }}>
                    {f.sample}
                  </p>
                )}
                <div className="mt-5 pt-4 border-t border-ag-border flex flex-col gap-1">
                  <p className={`numeric text-[10.5px] ${f.dark ? "text-ag-cream/60" : "text-ag-muted"}`}>
                    {f.token}
                  </p>
                  <p className={`text-xs ${f.dark ? "text-ag-cream/50" : "text-ag-muted"}`}>
                    {f.weights} · {f.source}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Type scale table */}
        <section aria-labelledby="scale-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Type scale · PRD §4.1</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="scale-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Scale</span>{" "}
              <span className="bi-serif">tokens</span>
            </h2>
          </header>
          <div className="bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Step</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Family</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Weight</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Where</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                {TYPE_SCALE.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 numeric text-ag-text">{row.token}</td>
                    <td className="px-4 py-2.5 text-ag-text">{row.family}</td>
                    <td className="px-4 py-2.5 numeric text-ag-muted">{row.weight}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CSS vars reference */}
        <section aria-labelledby="vars-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">CSS custom properties</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="vars-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Token</span>{" "}
              <span className="bi-serif">reference</span>
            </h2>
          </header>
          <CodeBlock
            label="globals.css — @theme inline font tokens"
            code={`--font-sans:        var(--font-elms-sans), system-ui, sans-serif;
--font-serif:       var(--font-libre-baskerville), Georgia, serif;
--font-body:        var(--font-inter), system-ui, sans-serif;
--font-body-tight:  var(--font-inter-tight), system-ui, sans-serif;
--font-numeric:     var(--font-inter-tight), system-ui, sans-serif;

/* Tabular figures for numeric utility */
.numeric {
  font-family: var(--font-numeric);
  font-feature-settings: 'tnum' 1;
  font-weight: 500;
}`}
          />
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Typography tokens — Adewale lock 2026-05-09</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens/spacing" className="hover:text-ag-navy transition-token">Spacing &rarr;</Link>
            <Link href="/tokens/color" className="hover:text-ag-navy transition-token">&larr; Colour</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
