"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { TileViz } from "@/components/viz/TileViz";

// AGMB product-page components — thin wrappers on the site's verbatim CSS.
// Accent is themed per product via the --accent CSS var (set on a .prod wrapper).

const accentStyle = (accent?: string) => (accent ? ({ ["--accent" as string]: accent } as React.CSSProperties) : undefined);

/* ── Product hero (centred + stat bar + viz) ──────────────────────────────── */
export interface ProductHeroProps {
  status: React.ReactNode[];
  heading: { text: string; accent?: boolean }[];
  lede: React.ReactNode;
  stats: { num: React.ReactNode; lbl: React.ReactNode }[];
  viz?: string;
  accent?: string;
  className?: string;
}
export const ProductHero: React.FC<ProductHeroProps> = ({ status, heading, lede, stats, viz, accent, className }) => (
  <section className={cn("prod hero-doc", className)} style={accentStyle(accent)}>
    <span className="status-row">
      <span className="pulse" aria-hidden />
      {status.map((s, i) => (<React.Fragment key={i}>{i > 0 && <span className="dot">/</span>}<span>{s}</span></React.Fragment>))}
    </span>
    <h1 className="h1">{heading.map((p, i) => (<React.Fragment key={i}>{p.accent ? <span className="serif-accent">{p.text}</span> : p.text}</React.Fragment>))}</h1>
    <p className="hero__lede" style={{ maxWidth: 720 }}>{lede}</p>
    <div className="hero__stat-bar">
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="hero__stat-sep" aria-hidden />}
          <div className="hero__stat-cell"><span className="stat-num">{s.num}</span><span className="stat-lbl">{s.lbl}</span></div>
        </React.Fragment>
      ))}
    </div>
    {viz && <div style={{ position: "relative", width: "100%", maxWidth: 760, aspectRatio: "16 / 6", marginTop: 8 }}><TileViz viz={viz} accent={accent ?? "#22C55E"} ar={2.6} /></div>}
  </section>
);

/* ── Eligibility ──────────────────────────────────────────────────────────── */
export const Eligibility: React.FC<{ items: { strong?: React.ReactNode; text: React.ReactNode }[]; accent?: string }> = ({ items, accent }) => (
  <div className="prod elig-list" style={accentStyle(accent)}>
    {items.map((it, i) => (
      <div key={i} className="elig-row">
        <span className="elig-check">✓</span>
        <span className="elig-text">{it.strong && <strong>{it.strong} </strong>}{it.text}</span>
      </div>
    ))}
  </div>
);

/* ── Documents ────────────────────────────────────────────────────────────── */
export const Documents: React.FC<{ docs: { num: string; name: React.ReactNode; copy: React.ReactNode }[]; accent?: string }> = ({ docs, accent }) => (
  <div className="prod doc-grid" style={accentStyle(accent)}>
    {docs.map((d, i) => (
      <div key={i} className="doc-card"><span className="doc-card__num">{d.num}</span><span className="doc-card__name">{d.name}</span><span className="doc-card__copy">{d.copy}</span></div>
    ))}
  </div>
);

/* ── Rate panel ───────────────────────────────────────────────────────────── */
export const RatePanel: React.FC<{ cells: { eyebrow: React.ReactNode; accent?: React.ReactNode; big: React.ReactNode; sub: React.ReactNode }[]; accent?: string }> = ({ cells, accent }) => (
  <div className="prod rate-grid" style={accentStyle(accent)}>
    {cells.map((c, i) => (
      <div key={i} className="rate-cell"><span className="rate-cell__eyebrow">{c.eyebrow}</span><span className="rate-cell__big">{c.accent && <em>{c.accent}</em>}{c.big}</span><span className="rate-cell__sub">{c.sub}</span></div>
    ))}
  </div>
);

/* ── Use cases ────────────────────────────────────────────────────────────── */
export const UseCases: React.FC<{ cases: { persona: React.ReactNode; name: React.ReactNode; copy: React.ReactNode; detail?: React.ReactNode }[]; accent?: string }> = ({ cases, accent }) => (
  <div className="prod case-grid" style={accentStyle(accent)}>
    {cases.map((c, i) => (
      <div key={i} className="case-card"><span className="case-card__persona">{c.persona}</span><span className="case-card__name">{c.name}</span><p className="case-card__copy">{c.copy}</p>{c.detail && <span className="case-card__detail">{c.detail}</span>}</div>
    ))}
  </div>
);

/* ── How it works ─────────────────────────────────────────────────────────── */
export const HowItWorks: React.FC<{ steps: { num: string; name: React.ReactNode; copy: React.ReactNode }[]; onNavy?: boolean; accent?: string }> = ({ steps, onNavy, accent }) => (
  <div className="prod steps-row" style={accentStyle(accent)}>
    {steps.map((s, i) => (
      <div key={i} className={cn("step", onNavy && "step--on-navy")}><span className="step__num">{s.num}</span><span className="step__name">{s.name}</span><span className="step__copy">{s.copy}</span></div>
    ))}
  </div>
);

/* ── FAQ accordion ────────────────────────────────────────────────────────── */
export const Faq: React.FC<{ items: { q: React.ReactNode; a: React.ReactNode }[] }> = ({ items }) => {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((it, i) => (
        <div key={i} className="faq-row" data-open={open === i}>
          <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="faq-trigger__q">{it.q}</span>
            <span className="faq-chevron" aria-hidden>▾</span>
          </button>
          <div className="faq-body"><div className="faq-body__inner">{it.a}</div></div>
        </div>
      ))}
    </div>
  );
};

/* ── CTA card ─────────────────────────────────────────────────────────────── */
export const ProductCtaCard: React.FC<{ title: React.ReactNode; lede: React.ReactNode; children?: React.ReactNode }> = ({ title, lede, children }) => (
  <div className="faq__cta-card">
    <h3 className="faq__cta-title">{title}</h3>
    <p className="faq__cta-lede">{lede}</p>
    {children}
  </div>
);
