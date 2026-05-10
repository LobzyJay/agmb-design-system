// /tokens/elevation — shadow stack catalogue
// Server Component.
import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/design/CodeBlock";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";

export const metadata: Metadata = {
  title: "Elevation tokens — AGMB Design System",
  description: "Navy-tinted shadow stacks. Three levels. Cards default flat.",
};

const SHADOW_LEVELS = [
  {
    name: "--shadow-soft-1",
    sys:  "--ref-shadow-soft-1",
    cls:  ".shadow-soft-1",
    value: "0 1px 2px rgba(10,37,64,0.06), 0 2px 4px rgba(10,37,64,0.04)",
    use:  "Subtle tactile · hover state for flat cards",
    label: "Soft 1 · hover",
  },
  {
    name: "--shadow-soft-2",
    sys:  "--ref-shadow-soft-2",
    cls:  ".shadow-soft-2",
    value: "0 2px 4px rgba(10,37,64,0.08), 0 8px 24px -4px rgba(10,37,64,0.10)",
    use:  "Opt-in lift · sticky nudges · popovers",
    label: "Soft 2 · opt-in",
  },
  {
    name: "--shadow-soft-3",
    sys:  "--ref-shadow-soft-3",
    cls:  ".shadow-soft-3",
    value: "0 4px 8px rgba(10,37,64,0.10), 0 16px 48px -8px rgba(10,37,64,0.16)",
    use:  "Modals · floating panels · maximum depth",
    label: "Soft 3 · modal",
  },
];

export default function TokensElevationPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Elevation tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Elevation</span>
          <span className="bi-serif italic block">& shadow.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          Navy-tinted, contemporary depth. Cards default flat — white surface + 1px border,
          no shadow at rest. Elevation is reserved for hover states, modals, and opt-in
          moments. Never decorate for decoration&rsquo;s sake.
        </p>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        <section aria-labelledby="shadows-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Shadow stack · ref + sys tiers</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="shadows-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Shadow</span>{" "}
              <span className="bi-serif">levels</span>
            </h2>
          </header>

          {/* Flat default */}
          <SpecimenGroup label="Flat default · no shadow" description="White surface + 1px ag-border. Cards default here. Elevation is earned on hover, not the resting state.">
            <div className="bg-ag-white border border-ag-border rounded-card p-8 max-w-md">
              <p className="numeric text-xs text-ag-muted">flat · bg-ag-white + border-ag-border</p>
              <p className="bi-serif text-ag-navy text-2xl mt-2">Sample card.</p>
              <p className="text-sm text-ag-muted mt-3">Border carries the edge. Clean. No shadow at rest.</p>
            </div>
          </SpecimenGroup>

          {/* Three levels */}
          <SpecimenGroup label="Elevation levels" count="3 steps" className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SHADOW_LEVELS.map((s) => (
                <div key={s.name} className="flex flex-col gap-4">
                  <div
                    className="bg-ag-white rounded-card border border-ag-border p-8"
                    style={{ boxShadow: s.value }}
                  >
                    <p className="numeric text-xs text-ag-muted">{s.cls}</p>
                    <p className="bi-serif text-ag-navy text-xl mt-2">Sample.</p>
                    <p className="text-sm text-ag-muted mt-3">{s.use}</p>
                  </div>
                  <p className="numeric text-[10px] text-ag-muted break-all">{s.value}</p>
                </div>
              ))}
            </div>
          </SpecimenGroup>

          <div className="mt-8 bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Token</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Class</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">When to use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                <tr>
                  <td className="px-4 py-2.5 numeric text-xs text-ag-muted italic">none</td>
                  <td className="px-4 py-2.5 numeric text-xs text-ag-text">border border-ag-border</td>
                  <td className="px-4 py-2.5 text-ag-muted">Default card rest state</td>
                </tr>
                {SHADOW_LEVELS.map((s) => (
                  <tr key={s.name}>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{s.name}</td>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{s.cls}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="hover-lift-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">Hover lift pattern</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="hover-lift-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">hover-lift</span>{" "}
              <span className="bi-serif">utility</span>
            </h2>
          </header>
          <CodeBlock label="globals.css — hover-lift" code={`.hover-lift {
  transition-property: transform, box-shadow;
  transition-duration: var(--sys-motion-base);      /* 300ms */
  transition-timing-function: var(--sys-motion-ease-default);
}
.hover-lift:hover { transform: translateY(-2px); }

@media (prefers-reduced-motion: reduce) {
  .hover-lift:hover { transform: none; }
}

/* Usage: pair with shadow-soft-2 on hover for the AmEx-card register */
/* className="hover-lift shadow-soft-1 hover:shadow-soft-2" */`} />
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Elevation tokens — navy-tinted · 3 levels · flat-default discipline</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens/radius" className="hover:text-ag-navy transition-token">Radius &rarr;</Link>
            <Link href="/tokens/motion" className="hover:text-ag-navy transition-token">&larr; Motion</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
