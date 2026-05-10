"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { TrustBadge } from "./TrustBadge";
import { TextFact } from "./TextFact";

// AGMB HighlightTrust — Wise pattern (PRD §4.5 + §07).
// Composite primitive: logo strip + 2-column compliance copy + TextFact stats.
// Canonical primitive for §07 Trust & Regulatory.
//
// "Trust earned by presence, not size" — uses real verifiable facts only.
// Per PRD §7 + AGMB_SITE_AUDIT.md §10, NDIC + FMBN + the PRD-asserted facts
// (Adewale stands by them) all render here.

export interface HighlightTrustBadge {
  label: React.ReactNode;
  logo?: React.ReactNode;
}

export interface HighlightTrustFact {
  eyebrow: React.ReactNode;
  value: React.ReactNode;
  context?: React.ReactNode;
  valueStyle?: "numeric" | "serif";
}

export interface HighlightTrustProps {
  /** Section eyebrow (e.g. "TRUST"). */
  eyebrow?: React.ReactNode;
  /** Bi-script title (e.g. "TRUSTED by 97 Nigerian families"). */
  title: React.ReactNode;
  /** Trust badges — CBN / ISO / NDIC / FMBN / etc. */
  badges: HighlightTrustBadge[];
  /** Type-led editorial facts — M-REIF / ₦2.8B / 97 families. */
  facts: HighlightTrustFact[];
  /** Regulatory copy block — typically references CBN PMI status, NDPR, NDIC. */
  copy?: React.ReactNode;
  /** Inverse — render against navy backdrop. */
  inverse?: boolean;
  className?: string;
}

export const HighlightTrust: React.FC<HighlightTrustProps> = ({
  eyebrow,
  title,
  badges,
  facts,
  copy,
  inverse = false,
  className,
}) => (
  /* pair.trust.regulatory (Adewale 2026-05-09 v3 gold demotion):
     When inverse, the section composes the canonical regulatory plate — navy
     surface, cream text, navy.vivid accent (gold demoted, no hairline gold).
     The pair name encodes the institutional gravitas ask (CBN-licensed PMI ·
     NDIC · ISO). Light variant sits on the page surface and inherits
     text-primary. bg-pair-trust-regulatory resolves to ag-navy.

     Dual-blue option: consumers needing the v3 signature composition wrap this
     in a `bg-ag-navy-deep` section so the regulatory plate (navy) sits on the
     deeper navy bg — pair.surface.dual-blue applied at the section level. */
  <section
    data-pair={inverse ? "trust-regulatory" : "surface-default"}
    className={cn(
      "flex flex-col gap-12",
      inverse
        ? "bg-pair-trust-regulatory text-ag-cream"
        : "text-ag-text",
      className,
    )}
    aria-labelledby="trust-section-title"
  >
    <header className="flex flex-col gap-3">
      {eyebrow && (
        <p className={cn("eyebrow", inverse && "!text-ag-gold")}>{eyebrow}</p>
      )}
      <h2
        id="trust-section-title"
        className="bi-section text-3xl md:text-5xl leading-tight tracking-tight"
      >
        {title}
      </h2>
    </header>

    {/* Logo strip */}
    <div className="flex flex-wrap gap-3">
      {badges.map((b, i) => (
        <TrustBadge key={i} label={b.label} logo={b.logo} inverse={inverse} />
      ))}
    </div>

    {/* 2-column copy + facts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {copy && (
        <div className={cn("text-base leading-relaxed", inverse ? "text-ag-cream/85" : "text-ag-text")}>
          {copy}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {facts.map((f, i) => (
          <TextFact
            key={i}
            eyebrow={f.eyebrow}
            value={f.value}
            context={f.context}
            valueStyle={f.valueStyle ?? "numeric"}
            size="m"
            inverse={inverse}
            rule
          />
        ))}
      </div>
    </div>
  </section>
);
HighlightTrust.displayName = "HighlightTrust";
