// /tokens/radius — radius scale catalogue
// Server Component.
import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/design/CodeBlock";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";

export const metadata: Metadata = {
  title: "Radius tokens — AGMB Design System",
  description: "8 / 6 / 4 px. Stripe-restraint pass. Cards, buttons, inputs.",
};

const RADIUS_SCALE = [
  {
    name: "--radius-card",
    sys:  "--sys-radius-card",
    cls:  ".rounded-card",
    value: "8px",
    use:  "Cards · panels · modal containers · section surfaces",
    label: "card · 8px",
    tailwindEquiv: "rounded-lg ≈ 8px",
  },
  {
    name: "--radius-button",
    sys:  "--sys-radius-button",
    cls:  ".rounded-button",
    value: "6px",
    use:  "Buttons · pill tags · select controls",
    label: "button · 6px",
    tailwindEquiv: "rounded-md ≈ 6px",
  },
  {
    name: "--radius-input",
    sys:  "--sys-radius-input",
    cls:  ".rounded-input",
    value: "4px",
    use:  "Text inputs · textareas · checkboxes · toggle tracks",
    label: "input · 4px",
    tailwindEquiv: "rounded ≈ 4px",
  },
];

export default function TokensRadiusPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Radius tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Radius</span>
          <span className="bi-serif italic block">scale.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          8 / 6 / 4 px — Stripe-restraint pass (2026-05-09). Hard 0px reads cold
          for a regulated institution serving Nigerian families on 30-year mortgages.
          Soft 8 / 6 / 4 keeps warmth while reading engineered. Never{" "}
          <code className="numeric text-sm">rounded-2xl</code> — always via utility classes.
        </p>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        <section aria-labelledby="scale-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Three steps · ref + sys tiers</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="scale-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Radius</span>{" "}
              <span className="bi-serif">tokens</span>
            </h2>
          </header>

          <SpecimenGroup label="3 steps">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RADIUS_SCALE.map((r) => (
                <div key={r.name} className="bg-ag-white border border-ag-border p-6 rounded-md flex flex-col gap-4">
                  <div
                    className="bg-ag-navy w-full h-24"
                    style={{ borderRadius: r.value }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-ag-text">{r.label}</p>
                    <p className="numeric text-xs text-ag-muted">{r.name}</p>
                    <p className="numeric text-[10px] text-ag-navy-vivid">{r.sys}</p>
                    <p className="numeric text-[10px] text-ag-gold mt-0.5">{r.cls}</p>
                    <p className="text-xs text-ag-muted mt-2 leading-snug">{r.use}</p>
                    <p className="numeric text-[10px] text-ag-muted/60 mt-1">{r.tailwindEquiv}</p>
                  </div>
                </div>
              ))}
            </div>
          </SpecimenGroup>

          <div className="mt-8 bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Token</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">sys alias</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Utility</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Where</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                {RADIUS_SCALE.map((r) => (
                  <tr key={r.name}>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{r.name} = {r.value}</td>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-navy-vivid">{r.sys}</td>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-gold">{r.cls}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="nesting-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">Anti-pattern · Doppelrand guard</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="nesting-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Nested corner</span>{" "}
              <span className="bi-serif">discipline</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              When a rounded container holds a rounded child, the inner radius must be smaller
              than the outer. Rule: inner = outer &minus; padding. At AGMB scales:
              a <code className="numeric text-xs">.rounded-card</code> (8px) parent
              holds <code className="numeric text-xs">.rounded-button</code> (6px) children —
              4px gap. Correct by default. Audit flag: if you see a card holding another
              card-radius element with identical corner values, that&rsquo;s a Doppelrand bug.
            </p>
          </header>
          <CodeBlock label="radius nesting rule" code={`/* Correct nesting */
.card { border-radius: var(--sys-radius-card); /* 8px */ }
.card .button { border-radius: var(--sys-radius-button); /* 6px */ }

/* Correct: card → input */
.card .input { border-radius: var(--sys-radius-input); /* 4px */ }

/* WRONG — Doppelrand: identical radius creates visual mush */
.card .inner-card { border-radius: var(--sys-radius-card); /* 8px, same */ }`} />
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Radius tokens — 8 / 6 / 4 px · Stripe-restraint pass</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens" className="hover:text-ag-navy transition-token">Overview &rarr;</Link>
            <Link href="/tokens/elevation" className="hover:text-ag-navy transition-token">&larr; Elevation</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
