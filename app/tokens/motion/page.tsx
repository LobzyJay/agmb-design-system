"use client";
// /tokens/motion — motion token catalogue with live demos.
// Client Component because live demos need state and event handlers.
// prefers-reduced-motion honoured on all animation samples.
import * as React from "react";
import Link from "next/link";
import { SpecimenGroup } from "@/components/design/SpecimenGroup";
import { CodeBlock } from "@/components/design/CodeBlock";

const DURATION_TOKENS = [
  { name: "--motion-duration-instant", token: "--sys-motion-instant", value: "100ms", note: "Imperceptible — toggles, micro feedback, active states" },
  { name: "--motion-duration-fast",    token: "--sys-motion-fast",    value: "200ms", note: "Default hover / focus · input transitions" },
  { name: "--motion-duration-base",    token: "--sys-motion-base",    value: "300ms", note: "Counter · progress bar · surface fades" },
  { name: "--motion-duration-slow",    token: "--sys-motion-slow",    value: "500ms", note: "Cross-section reveals · scroll-triggered" },
  { name: "--motion-duration-curtain", token: "--sys-motion-curtain", value: "1200ms", note: "Curtain reveal · once per page · grand entrance" },
];

const EASING_TOKENS = [
  { name: "--motion-ease-default", token: "--sys-motion-ease-default", value: "cubic-bezier(0.16, 1, 0.3, 1)", note: "Out-expo · primary curve · all default transitions" },
  { name: "--motion-ease-out",     token: "--sys-motion-ease-out",     value: "cubic-bezier(0.33, 1, 0.68, 1)", note: "Counter · progress · elements entering" },
  { name: "--motion-ease-in",      token: "--sys-motion-ease-in",      value: "cubic-bezier(0.32, 0, 0.67, 0)", note: "Section exit · elements leaving" },
];

// Live motion demo — a single animated block the user can trigger.
// Respects prefers-reduced-motion.
const MotionDemo: React.FC = () => {
  const [active, setActive] = React.useState<string | null>(null);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const demos = [
    { key: "fast",   label: "Fast · 200ms",     duration: "200ms",  color: "var(--ag-navy)" },
    { key: "base",   label: "Base · 300ms",     duration: "300ms",  color: "var(--ag-navy-vivid)" },
    { key: "slow",   label: "Slow · 500ms",     duration: "500ms",  color: "var(--ag-green)" },
  ];

  return (
    <div className="bg-ag-white border border-ag-border rounded-card p-6">
      {prefersReduced && (
        <p className="numeric text-xs text-ag-amber mb-4">
          prefers-reduced-motion: reduce — animations disabled
        </p>
      )}
      <p className="text-sm text-ag-muted mb-4">
        Click a button to trigger the transition. The bar eases with{" "}
        <code className="numeric text-xs">cubic-bezier(0.16, 1, 0.3, 1)</code> (ease-default).
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        {demos.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(active === d.key ? null : d.key)}
            className="px-4 py-2 rounded-button border border-ag-border text-sm text-ag-text hover:border-ag-text hover:bg-ag-light transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy"
            aria-pressed={active === d.key}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="relative h-12 bg-ag-light rounded-input overflow-hidden">
        {demos.map((d) => (
          <div
            key={d.key}
            className="absolute inset-y-0 left-0 rounded-input"
            style={{
              background: d.color,
              width: active === d.key ? "100%" : "8%",
              transition: prefersReduced
                ? "none"
                : `width ${d.duration} cubic-bezier(0.16, 1, 0.3, 1)`,
              opacity: active === null || active === d.key ? 1 : 0.12,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

// Easing curve visual — CSS-drawn curves, no SVG dep.
const EasingCurve: React.FC<{ easing: string; label: string }> = ({ easing, label }) => {
  const id = React.useId();
  return (
    <div className="bg-ag-white border border-ag-border rounded-card p-5 flex flex-col gap-3">
      <p className="eyebrow">{label}</p>
      {/* Animated ball that shows the easing curve in action */}
      <div className="relative h-8 bg-ag-light rounded-input overflow-hidden group">
        <div
          className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-ag-navy-vivid"
          style={{
            transition: `transform 600ms ${easing}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) translateX(calc(100% * 5 - 8px))";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-50%)";
          }}
          aria-hidden="true"
        />
      </div>
      <p className="numeric text-[10.5px] text-ag-muted break-all">{easing}</p>
    </div>
  );
};

export default function TokensMotionPage() {
  return (
    <>
      <header className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-16 md:pb-20 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <p className="eyebrow">Motion tokens</p>
          <Link href="/tokens" className="numeric text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline">
            &larr; Token catalogue
          </Link>
        </div>
        <h1 className="bi-display text-ag-navy text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] max-w-4xl">
          <span className="bi-sans block">Motion</span>
          <span className="bi-serif italic block">tokens.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-ag-muted leading-relaxed max-w-3xl">
          5 durations, 3 easings, spring constants. All consumed via{" "}
          <code className="numeric text-sm">.transition-token</code> or the{" "}
          <code className="numeric text-sm">--sys-motion-*</code> tier aliases.
          Never inline <code className="numeric text-sm">200ms</code> strings in components.
          All demos respect{" "}
          <code className="numeric text-sm">prefers-reduced-motion: reduce</code>.
        </p>
      </header>

      <div className="px-6 md:px-10 lg:px-14 pb-24 max-w-5xl flex flex-col gap-20 md:gap-32">

        <section aria-labelledby="durations-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Durations · ref + sys tiers</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="durations-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Duration</span>{" "}
              <span className="bi-serif">scale</span>
            </h2>
          </header>
          <SpecimenGroup label="5 durations">
            <div className="bg-ag-white border border-ag-border rounded-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-ag-cream/50 border-b border-ag-border">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Legacy (--motion-*)</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-ag-text">sys alias</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Value</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ag-border">
                  {DURATION_TOKENS.map((t) => (
                    <tr key={t.name}>
                      <td className="px-4 py-2.5 numeric text-xs text-ag-text">{t.name}</td>
                      <td className="px-4 py-2.5 numeric text-xs text-ag-navy-vivid">{t.token}</td>
                      <td className="px-4 py-2.5 numeric text-ag-muted">{t.value}</td>
                      <td className="px-4 py-2.5 text-ag-muted">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SpecimenGroup>
        </section>

        <section aria-labelledby="easings-heading">
          <header className="flex flex-col gap-3 mb-8">
            <p className="eyebrow">Easing curves</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="easings-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Easing</span>{" "}
              <span className="bi-serif">curves</span>
            </h2>
            <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
              Hover each bar below to feel the curve. All three are asymmetric
              out-curves — they enter briskly and decelerate into the resting state.
              No linear easing anywhere in the system.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EASING_TOKENS.map((t) => (
              <EasingCurve key={t.name} easing={t.value} label={t.name.replace("--motion-ease-", "ease-")} />
            ))}
          </div>
          <div className="mt-8 bg-ag-white border border-ag-border rounded-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ag-cream/50 border-b border-ag-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Legacy</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">sys alias</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Curve</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ag-border">
                {EASING_TOKENS.map((t) => (
                  <tr key={t.name}>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-text">{t.name}</td>
                    <td className="px-4 py-2.5 numeric text-xs text-ag-navy-vivid">{t.token}</td>
                    <td className="px-4 py-2.5 numeric text-[10.5px] text-ag-muted">{t.value}</td>
                    <td className="px-4 py-2.5 text-ag-muted">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="live-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">Live demo · ease-default · 200ms/300ms/500ms</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="live-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Feel the</span>{" "}
              <span className="bi-serif">curve</span>
            </h2>
          </header>
          <MotionDemo />
        </section>

        <section aria-labelledby="utility-heading">
          <header className="flex flex-col gap-3 mb-6">
            <p className="eyebrow">Utility classes · globals.css</p>
            <span aria-hidden="true" className="block w-full border-t border-ag-border" />
            <h2 id="utility-heading" className="bi-section text-ag-navy text-2xl md:text-3xl tracking-tight">
              <span className="bi-sans">Consume via</span>{" "}
              <span className="bi-serif">utilities</span>
            </h2>
          </header>
          <CodeBlock label="globals.css — transition utility classes" code={`.transition-token {
  transition-property: background-color, color, border-color,
                        transform, box-shadow, opacity;
  transition-duration: var(--sys-motion-fast);          /* 200ms */
  transition-timing-function: var(--sys-motion-ease-default);
}
.transition-token-base {
  transition-duration: var(--sys-motion-base);           /* 300ms */
  transition-timing-function: var(--sys-motion-ease-default);
}
/* Apply to interactive elements: */
/* className="transition-token" — hover/focus/active */
/* className="transition-token-base" — surface + progress */`} />
        </section>

      </div>

      <footer className="border-t border-ag-border bg-ag-white">
        <div className="px-6 md:px-10 lg:px-14 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-ag-muted">Motion tokens — PRD §4.3 · 5 durations · 3 easings</p>
          <div className="flex gap-4 text-xs text-ag-muted numeric">
            <Link href="/tokens/elevation" className="hover:text-ag-navy transition-token">Elevation &rarr;</Link>
            <Link href="/tokens/spacing" className="hover:text-ag-navy transition-token">&larr; Spacing</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
