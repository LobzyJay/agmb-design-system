"use client";
import * as React from "react";
import Image from "next/image";
import { ChapterSection, Subsection } from "./ChapterSection";
import { Specimen, StateCell } from "./Specimen";
import { TokenSwatch } from "./TokenSwatch";
import { CodeBlock } from "./CodeBlock";
import { Footnote, FootnoteList } from "./Footnote";
import { SpecimenGroup } from "./SpecimenGroup";
import { NumericPrefix } from "./NumericPrefix";

// Primitives — locked at architecture time.
import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import { PercentInput } from "@/components/PercentInput";
import { ExpressiveMoneyDisplay } from "@/components/ExpressiveMoneyDisplay";
import { LTVIndicator } from "@/components/LTVIndicator";
import { RepaymentSplitBar } from "@/components/RepaymentSplitBar";
import { ListItem } from "@/components/ListItem";
import { WizardProgressBar, WizardStepDots } from "@/components/WizardProgress";
import { StatBlock } from "@/components/StatBlock";
import { TrustBadge } from "@/components/TrustBadge";
import { TextDisclaimer } from "@/components/TextDisclaimer";
import { TextFact } from "@/components/TextFact";
import { InlinePrompt } from "@/components/InlinePrompt";
import { CriticalBanner } from "@/components/CriticalBanner";
import { Nudge } from "@/components/Nudge";
import { EmptyState } from "@/components/EmptyState";
import { GoldShader } from "@/components/GoldShader";
import { Summary } from "@/components/Summary";
import { SuccessScreen } from "@/components/SuccessScreen";
import { ProgressScreen } from "@/components/ProgressScreen";
import { StepCard } from "@/components/StepCard";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { TestimonialCard } from "@/components/TestimonialCard";
import { NewsCard } from "@/components/NewsCard";
import { ProductBentoTile } from "@/components/ProductBentoTile";
import { ProductBentoTileEditorial } from "@/components/ProductBentoTileEditorial";
import { ProductBentoTileFlat } from "@/components/ProductBentoTileFlat";
import { ProductBentoTileSwiss, BentoGridSwiss } from "@/components/ProductBentoTileSwiss";
import { HighlightTrust } from "@/components/HighlightTrust";
import { RegulatoryFooter } from "@/components/RegulatoryFooter";
import { CalculatorPattern } from "@/components/patterns/CalculatorPattern";
import { WizardPattern } from "@/components/patterns/WizardPattern";
import { Logo } from "@/components/Logo";

import { MORTGAGE_TYPES, MORTGAGE_TYPE_LABEL, MORTGAGE_TYPE_RATE } from "@/constants/mortgage";

// ── Interactive bi-script register swap (used in the Typography chapter) ──
// Adewale 2026-05-08: design system hero needs a button to toggle between
// the three weight registers showing the same headline. Active button uses
// the dual-blue primary CTA (post 2026-05-09 v3 gold demotion) — gives users
// a visible touchpoint for the new pair.cta.primary register.
type Register = "display" | "section" | "label";
const REGISTER_META: Record<Register, { label: string; weights: string; wrapperClass: string; sizeClass: string }> = {
  display: { label: "Display", weights: "700 / 700",   wrapperClass: "bi-display", sizeClass: "text-5xl md:text-7xl leading-[1.0]" },
  section: { label: "Section", weights: "600 / 500",   wrapperClass: "bi-section", sizeClass: "text-4xl md:text-6xl leading-[1.05]" },
  label:   { label: "Label",   weights: "500 / 400",   wrapperClass: "bi-label",   sizeClass: "text-3xl md:text-5xl leading-[1.1]"  },
};
const RegisterSwap: React.FC = () => {
  const [active, setActive] = React.useState<Register>("display");
  const meta = REGISTER_META[active];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(REGISTER_META) as Register[]).map((r) => {
          const isActive = active === r;
          return (
            <Button
              key={r}
              size="sm"
              variant={isActive ? "primary" : "ghost"}
              onClick={() => setActive(r)}
              aria-pressed={isActive}
            >
              {REGISTER_META[r].label} · {REGISTER_META[r].weights}
            </Button>
          );
        })}
        <code className="numeric text-xs text-ag-muted ml-auto">.{meta.wrapperClass}</code>
      </div>
      <div className="bg-ag-white border border-ag-border rounded-lg p-6 md:p-10">
        <p className={`${meta.wrapperClass} text-ag-navy ${meta.sizeClass} tracking-tight`}>
          <span className="bi-sans">Starting</span>{" "}
          <span className="bi-serif">today.</span>
        </p>
      </div>
    </div>
  );
};

// ── Sidebar table-of-contents (mirrors page structure) ─────────────
export const SIDEBAR_CHAPTERS = [
  {
    number: "01",
    id: "foundations",
    titleSans: "Foundations",
    titleSerif: "",
    subsections: [
      { id: "foundations-brand-axis",  label: "01.1  Brand axis" },
      { id: "foundations-colour",      label: "01.2  Colour tokens" },
      { id: "foundations-typography",  label: "01.3  Typography" },
      { id: "foundations-bi-script",   label: "01.4  Bi-script registers" },
      { id: "foundations-motion",      label: "01.5  Motion tokens" },
      { id: "foundations-spacing",     label: "01.6  Spacing & grid" },
      { id: "foundations-voice",       label: "01.7  Voice" },
      { id: "foundations-vocabulary",  label: "01.8  Vocabulary" },
      { id: "foundations-grammar",     label: "01.9  Grammar & style" },
      { id: "foundations-mission",                label: "01.10 Mission" },
      { id: "foundations-decorative-registers",  label: "01.11 Decorative registers" },
    ],
  },
  {
    number: "02",
    id: "brand",
    titleSans: "Brand",
    titleSerif: "",
    subsections: [
      { id: "brand-wordmark",     label: "02.1  Wordmark" },
      { id: "brand-mark",         label: "02.2  Brand mark" },
      { id: "brand-iconography",  label: "02.3  Iconography" },
    ],
  },
  {
    number: "03",
    id: "primitives",
    titleSans: "Primitives",
    titleSerif: "",
    subsections: [
      { id: "primitive-button",                  label: "Button" },
      { id: "primitive-formfield",               label: "FormField" },
      { id: "primitive-moneyinput",              label: "MoneyInput" },
      { id: "primitive-percentinput",            label: "PercentInput" },
      { id: "primitive-expressivemoneydisplay",  label: "ExpressiveMoneyDisplay" },
      { id: "primitive-ltvindicator",            label: "LTVIndicator" },
      { id: "primitive-repaymentsplitbar",       label: "RepaymentSplitBar" },
      { id: "primitive-listitem",                label: "ListItem" },
      { id: "primitive-wizardprogress",          label: "WizardProgress" },
      { id: "primitive-statblock",               label: "StatBlock" },
      { id: "primitive-trustbadge",              label: "TrustBadge" },
      { id: "primitive-textdisclaimer",          label: "TextDisclaimer" },
      { id: "primitive-textfact",                label: "TextFact" },
      { id: "primitive-inlineprompt",            label: "InlinePrompt" },
      { id: "primitive-criticalbanner",          label: "CriticalBanner" },
      { id: "primitive-nudge",                   label: "Nudge" },
      { id: "primitive-emptystate",              label: "EmptyState" },
      { id: "primitive-goldshader",              label: "GoldShader" },
      { id: "primitive-summary",                 label: "Summary" },
      { id: "primitive-successscreen",           label: "SuccessScreen" },
      { id: "primitive-progressscreen",          label: "ProgressScreen" },
      { id: "primitive-stepcard",                label: "StepCard" },
      { id: "primitive-testimonialquote",        label: "TestimonialQuote" },
      { id: "primitive-testimonialcard",         label: "TestimonialCard" },
      { id: "primitive-newscard",                label: "NewsCard" },
      { id: "primitive-productbentotile",            label: "ProductBentoTile" },
      { id: "primitive-productbentotile-candidates",   label: "&#x21B3; candidates" },
      { id: "primitive-productbentotile-alternatives", label: "&#x21B3; alternatives" },
      { id: "primitive-highlighttrust",                label: "HighlightTrust" },
      { id: "primitive-regulatoryfooter",        label: "RegulatoryFooter" },
      { id: "primitive-scrollprogresspath",      label: "ScrollProgressPath ↗" },
    ],
  },
  {
    number: "04",
    id: "patterns",
    titleSans: "Patterns",
    titleSerif: "",
    subsections: [
      { id: "patterns-calculator", label: "04.1  Calculator pattern" },
      { id: "patterns-wizard",     label: "04.2  Wizard pattern" },
    ],
  },
  {
    number: "05",
    id: "motion",
    titleSans: "Motion",
    titleSerif: "",
    subsections: [
      { id: "motion-duration",      label: "05.1  Duration scale" },
      { id: "motion-easing",        label: "05.2  Easing curves" },
      { id: "motion-spring",        label: "05.3  Spring + tactile" },
      { id: "motion-reduced",       label: "05.4  Reduced-motion register" },
      { id: "motion-anti-patterns", label: "05.5  Anti-patterns" },
    ],
  },
  {
    number: "06",
    id: "compositions",
    titleSans: "Compositions",
    titleSerif: "",
    subsections: [
      { id: "composition-calculator", label: "06.1  Calculator composition" },
      { id: "composition-wizard",     label: "06.2  Wizard composition" },
      { id: "composition-rules",      label: "06.3  Composition rules" },
    ],
  },
] as const;

// ── Token data ─────────────────────────────────────────────────────
const BRAND_TOKENS = [
  { varName: "ag-navy",   hex: "#0A2540", role: "Primary surface · headings · CTAs",         utility: "bg-ag-navy" },
  { varName: "ag-gold",   hex: "#C8972A", role: "Accent · hairlines · active states",        utility: "bg-ag-gold" },
  { varName: "ag-cream",  hex: "#F8F5EF", role: "Warm off-white · alt sections",             utility: "bg-ag-cream", light: true },
  { varName: "ag-green",  hex: "#1A7A4A", role: "Trust · success · LTV-safe",                utility: "bg-ag-green" },
  { varName: "ag-light",  hex: "#F4F5F7", role: "Subtle surface · disabled",                  utility: "bg-ag-light", light: true },
  { varName: "ag-text",   hex: "#101828", role: "Body — never #000",                          utility: "text-ag-text" },
  { varName: "ag-muted",  hex: "#475467", role: "Secondary text · helpers",                   utility: "text-ag-muted" },
  { varName: "ag-border", hex: "#D0D5DD", role: "Dividers · input borders",                   utility: "border-ag-border", light: true },
  { varName: "ag-amber",  hex: "#B45309", role: "LTV-caution 80–90%",                          utility: "text-ag-amber" },
  { varName: "ag-red",    hex: "#B42318", role: "LTV-warning >90% · errors",                  utility: "text-ag-red" },
  { varName: "ag-white",  hex: "#FFFFFF", role: "Card surface on cream",                       utility: "bg-ag-white", light: true },
];

// Surface scales — light + dark (Adewale 2026-05-09 refresh).
// Cream is no longer the default surface. Pages, cards, and inputs sit on
// the neutral light scale. Inverse / dark sections sit on the dark scale.
// Cream remains in the swatch as a brand accent, used sparingly.
const SURFACE_LIGHT = [
  { varName: "surface-light-1", hex: "#FFFFFF", role: "Page bg · primary card",          utility: "bg-surface-light-1", light: true },
  { varName: "surface-light-2", hex: "#F9FAFB", role: "Subtle alt · zebra rows",          utility: "bg-surface-light-2", light: true },
  { varName: "surface-light-3", hex: "#F2F4F7", role: "Deeper alt · pressed · inputs",    utility: "bg-surface-light-3", light: true },
];
const SURFACE_DARK = [
  { varName: "surface-dark-1", hex: "#0A2540", role: "Primary inverse · same as ag-navy",  utility: "bg-surface-dark-1" },
  { varName: "surface-dark-2", hex: "#0F2F50", role: "Lifted dark · hover · alt",           utility: "bg-surface-dark-2" },
  { varName: "surface-dark-3", hex: "#061A2E", role: "Deepest · emphasis · cards on dark",  utility: "bg-surface-dark-3" },
];

// Vivid accents — saturation pass 2026-05-09. The previous 9 vitality
// variants only shifted lightness; this set bumps chroma in the locked
// families. PRD §7 cleared (hues verified: navy 219°, gold 45°, green 142°,
// cream 44° — none crosses into purple/lila territory).
const BRIGHT_TOKENS = [
  { varName: "ag-navy-vivid",   hex: "#1F4FA8", role: "Electric navy · AI-style accent · active CTA",      utility: "bg-ag-navy-vivid" },
  { varName: "ag-gold-vivid",   hex: "#F0C441", role: "Saturated gold · celebration · accepted state",     utility: "bg-ag-gold-vivid" },
  { varName: "ag-green-vivid",  hex: "#22C55E", role: "Spring green · LTV-safe emphasis · success lift",   utility: "bg-ag-green-vivid" },
  { varName: "ag-cream-vivid",  hex: "#FFEFC2", role: "Luminous cream · hero wash · pairs with gold-vivid", utility: "bg-ag-cream-vivid", light: true },
];

// Named colour pairings (Adewale 2026-05-09 v3 gold-demotion restyle).
// Canonical pairs every primitive composes against. surface · text · accent.
// Components pick a NAMED PAIR, never raw tokens. Ratio: ~75% base / 15% vitality
// / 8% vivid / 2% gold (decorative-only) across any viewport. Gold demoted from
// CTA + button-fill — pair.cta.heritage and pair.cta.celebration retired.
// pair.surface.dual-blue is the new signature composition (navy.deep BG + navy.vivid surface).
type PairSwatch = { name: string; hex: string; tokenRef: string; light?: boolean };
type Pair = {
  name: string;
  role: string;
  surface: PairSwatch;
  text: PairSwatch;
  accent: PairSwatch;
  /** Optional live preview rendered on the right of the pair card. */
  previewKind?: "cta-primary" | "cta-destructive" | "trust-regulatory" | "surface-warm" | "surface-deep" | "surface-dual-blue" | "surface-default" | "feedback-safe" | "feedback-caution" | "feedback-danger";
};
const PAIRS: Pair[] = [
  {
    name: "pair.cta.primary",
    role: "Electric institutional · the modern primary CTA · shadcn opacity-modifier hover",
    surface: { name: "navy.vivid",  hex: "#1F4FA8", tokenRef: "ag-navy-vivid" },
    text:    { name: "cream.warm",  hex: "#FAF3E8", tokenRef: "ag-cream-warm", light: true },
    accent:  { name: "navy.vivid/90", hex: "#1F4FA8e6", tokenRef: "ag-navy-vivid/90" },
    previewKind: "cta-primary",
  },
  {
    name: "pair.cta.destructive",
    role: "Cancel application · delete saved scenario · destructive moments only",
    surface: { name: "feedback.danger", hex: "#B42318", tokenRef: "ag-red" },
    text:    { name: "cream",           hex: "#F8F5EF", tokenRef: "ag-cream", light: true },
    accent:  { name: "danger/90",       hex: "#B42318e6", tokenRef: "ag-red/90" },
    previewKind: "cta-destructive",
  },
  {
    name: "pair.surface.dual-blue",
    role: "Signature composition · dark navy bg · electric blue surface on top",
    surface: { name: "navy.vivid",  hex: "#1F4FA8", tokenRef: "ag-navy-vivid" },
    text:    { name: "cream.warm",  hex: "#FAF3E8", tokenRef: "ag-cream-warm", light: true },
    accent:  { name: "navy.deep (bg)", hex: "#061A2E", tokenRef: "ag-navy-deep" },
    previewKind: "surface-dual-blue",
  },
  {
    name: "pair.surface.default",
    role: "Page bg · card default · neutral",
    surface: { name: "surface.light.1", hex: "#FFFFFF", tokenRef: "surface-light-1", light: true },
    text:    { name: "text.primary",    hex: "#101828", tokenRef: "ag-text" },
    accent:  { name: "border.default",  hex: "#D0D5DD", tokenRef: "ag-border", light: true },
    previewKind: "surface-default",
  },
  {
    name: "pair.surface.warm",
    role: "Hero photograph wash · alternating section · warmth moment",
    surface: { name: "cream.warm",  hex: "#FAF3E8", tokenRef: "ag-cream-warm", light: true },
    text:    { name: "navy",        hex: "#0A2540", tokenRef: "ag-navy" },
    accent:  { name: "gold",        hex: "#C8972A", tokenRef: "ag-gold" },
    previewKind: "surface-warm",
  },
  {
    name: "pair.surface.deep",
    role: "Cinematic depth · footer · regulatory plate",
    surface: { name: "navy.deep",   hex: "#061A2E", tokenRef: "ag-navy-deep" },
    text:    { name: "cream",       hex: "#F8F5EF", tokenRef: "ag-cream", light: true },
    accent:  { name: "gold.rich",   hex: "#E0B040", tokenRef: "ag-gold-rich", light: true },
    previewKind: "surface-deep",
  },
  {
    name: "pair.trust.regulatory",
    role: "CBN badge · ISO callout · NDIC strip · institutional gravitas (dual-blue, no gold)",
    surface: { name: "navy",         hex: "#0A2540", tokenRef: "ag-navy" },
    text:    { name: "cream",        hex: "#F8F5EF", tokenRef: "ag-cream", light: true },
    accent:  { name: "navy.vivid",   hex: "#1F4FA8", tokenRef: "ag-navy-vivid" },
    previewKind: "trust-regulatory",
  },
  {
    name: "pair.feedback.safe",
    role: "LTV-safe band · success toast · confirmation lift",
    surface: { name: "green.sage",  hex: "#E6EFE8", tokenRef: "ag-green-sage", light: true },
    text:    { name: "green.deep",  hex: "#14613A", tokenRef: "ag-green-deep" },
    accent:  { name: "green.vivid", hex: "#22C55E", tokenRef: "ag-green-vivid" },
    previewKind: "feedback-safe",
  },
  {
    name: "pair.feedback.caution",
    role: "LTV-caution · soft warning · 'consider' register",
    surface: { name: "cream.warm",  hex: "#FAF3E8", tokenRef: "ag-cream-warm", light: true },
    text:    { name: "navy",        hex: "#0A2540", tokenRef: "ag-navy" },
    accent:  { name: "amber",       hex: "#B45309", tokenRef: "ag-amber" },
    previewKind: "feedback-caution",
  },
  {
    name: "pair.feedback.danger",
    role: "Validation error · submission failure · stop-and-fix",
    surface: { name: "danger / 5%", hex: "#FCEFEC", tokenRef: "ag-red @ 5%", light: true },
    text:    { name: "danger",      hex: "#B42318", tokenRef: "ag-red" },
    accent:  { name: "danger",      hex: "#B42318", tokenRef: "ag-red" },
    previewKind: "feedback-danger",
  },
];

// PairCard — single horizontal block: label + role on the left, three swatches
// in the middle, optional live preview on the right. Müller-Brockmann modular:
// 1px hairline rules, no card surface, just the white page bracketed by rules.
const PairSwatchCell: React.FC<{ swatch: PairSwatch; label: string }> = ({ swatch, label }) => (
  <div className="flex flex-col gap-1.5 min-w-0">
    <span
      className="block w-full h-12 rounded-sm border border-ag-border"
      style={{ background: swatch.hex }}
      aria-hidden="true"
    />
    <p className="text-[10px] uppercase tracking-[0.08em] text-ag-muted/70 font-semibold">{label}</p>
    <p className="text-xs text-ag-text leading-tight truncate">{swatch.name}</p>
    <p className="numeric text-[10.5px] text-ag-muted leading-tight">{swatch.hex}</p>
  </div>
);

const PairPreview: React.FC<{ kind?: Pair["previewKind"] }> = ({ kind }) => {
  switch (kind) {
    case "cta-primary":
      return <Button variant="primary">Apply for a mortgage</Button>;
    case "cta-destructive":
      return <Button variant="destructive">Cancel application</Button>;
    case "trust-regulatory":
      return (
        <div className="bg-pair-trust-regulatory text-ag-cream rounded-md px-4 py-3 flex items-center gap-3 border-y border-ag-navy-vivid/40">
          <span className="numeric text-[11px] uppercase tracking-[0.08em] text-ag-navy-vivid font-semibold">CBN-licensed PMI</span>
          <span className="numeric text-xs text-ag-cream/70">RC No. 471634</span>
        </div>
      );
    case "surface-dual-blue":
      return (
        <div className="bg-ag-navy-deep rounded-md p-3">
          <div className="bg-ag-navy-vivid text-ag-cream-warm rounded-md px-4 py-3">
            <p className="numeric text-[11px] uppercase tracking-[0.08em] mb-1 text-ag-cream-warm/70">Indicative monthly</p>
            <p className="numeric text-xl font-semibold">₦485,720</p>
          </div>
        </div>
      );
    case "surface-warm":
      return (
        <div className="bg-pair-surface-warm text-ag-navy rounded-md px-4 py-3">
          <p className="bi-section text-base"><span className="bi-sans">Your home.</span> <span className="bi-serif italic">Your terms.</span></p>
        </div>
      );
    case "surface-deep":
      return (
        <div className="bg-pair-surface-deep text-ag-cream rounded-md px-4 py-3 numeric text-xs">
          <span className="text-ag-gold-rich">© 2026</span> AG Mortgage Bank Plc · Lagos
        </div>
      );
    case "surface-default":
      return (
        <div className="bg-pair-surface-default text-ag-text border border-ag-border rounded-md px-4 py-3 text-sm">
          Default page surface — body text reads here.
        </div>
      );
    case "feedback-safe":
      return (
        <div className="bg-pair-feedback-safe rounded-md px-4 py-3 flex items-center gap-2 numeric text-sm" style={{ color: "var(--pair-feedback-safe-text)" }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "var(--pair-feedback-safe-accent)" }} aria-hidden="true" />
          LTV 62% — safe band
        </div>
      );
    case "feedback-caution":
      return (
        <div className="bg-pair-feedback-caution rounded-md px-4 py-3 numeric text-sm" style={{ color: "var(--pair-feedback-caution-text)" }}>
          LTV 84% — consider a larger deposit
        </div>
      );
    case "feedback-danger":
      return (
        <div className="bg-pair-feedback-danger rounded-md px-4 py-3 numeric text-sm" style={{ color: "var(--pair-feedback-danger-text)" }}>
          LTV 92% — exceeds the 90% policy ceiling
        </div>
      );
    default:
      return null;
  }
};

const PairCard: React.FC<{ pair: Pair }> = ({ pair }) => (
  <article className="border-t border-ag-border first:border-t-0 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,2fr)] gap-6 items-start">
    <header className="flex flex-col gap-2">
      <p className="numeric text-sm font-semibold text-ag-text tracking-tight">{pair.name}</p>
      <p className="text-xs text-ag-muted leading-relaxed">{pair.role}</p>
    </header>
    <div className="grid grid-cols-3 gap-3">
      <PairSwatchCell swatch={pair.surface} label="Surface" />
      <PairSwatchCell swatch={pair.text}    label="Text" />
      <PairSwatchCell swatch={pair.accent}  label="Accent" />
    </div>
    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
      <PairPreview kind={pair.previewKind} />
    </div>
  </article>
);

// Vitality tonal tokens — added 2026-05-08 in the modernization pivot.
// LCH-lightness shifts within the four locked hue families. No new accents.
const VITALITY_TOKENS = [
  { varName: "ag-navy-deep",   hex: "#061A2E", role: "Deeper navy · mesh-navy bloom",         utility: "bg-ag-navy-deep" },
  { varName: "ag-navy-soft",   hex: "#0F2F50", role: "Lifted navy · hover states",            utility: "bg-ag-navy-soft" },
  { varName: "ag-gold-rich",   hex: "#E0B040", role: "Saturated gold · top-stop · accents",   utility: "bg-ag-gold-rich" },
  { varName: "ag-gold-soft",   hex: "#DDA935", role: "Warm gold · decorative",                utility: "bg-ag-gold-soft" },
  { varName: "ag-cream-warm",  hex: "#FAF3E8", role: "Toasted cream · alt rhythm",            utility: "bg-ag-cream-warm", light: true },
  { varName: "ag-cream-deep",  hex: "#EDE5D5", role: "Deep cream · Trust + Wizard",           utility: "bg-ag-cream-deep", light: true },
  { varName: "ag-green-sage",  hex: "#E6EFE8", role: "Sage tint · Savings + Enquiry bg",      utility: "bg-ag-green-sage", light: true },
  { varName: "ag-green-deep",  hex: "#14613A", role: "Deeper success · trust accents",        utility: "bg-ag-green-deep" },
];

// Trimmed 2026-05-09 v4 — was 14 tokens, now 5. Primitives reach brand utilities
// (text-ag-navy etc.) directly; semantic tokens only kept where global selectors
// or feedback states actually consume them. The 9 ceremonial ones (text-inverse /
// muted / accent / surface-base / muted / inverse / subtle / border-default /
// strong / accent) were removed from globals.css :root.
const SEMANTIC_TOKENS = [
  { varName: "color-text-primary",     hex: "#101828", role: "Body text · global selector", refs: "ag-text" },
  { varName: "color-feedback-success", hex: "#1A7A4A", role: "Success · LTV-safe · InlinePrompt", refs: "ag-green" },
  { varName: "color-feedback-warning", hex: "#B45309", role: "Warning · LTV-caution · InlinePrompt", refs: "ag-amber" },
  { varName: "color-feedback-danger",  hex: "#B42318", role: "Error · LTV-warning · form errors", refs: "ag-red" },
  { varName: "color-feature-highlight", hex: "#1F4FA8", role: "Active emphasis · AI accent · numeric-emphasis hook", refs: "ag-navy-vivid" },
];

const MOTION_TOKENS = [
  { name: "duration-instant", value: "100ms",   note: "Imperceptible — toggles, micro feedback" },
  { name: "duration-fast",    value: "200ms",   note: "Default for hover / focus on inputs" },
  { name: "duration-base",    value: "300ms",   note: "Counter, progress, surface fades" },
  { name: "duration-slow",    value: "500ms",   note: "Cross-section reveals" },
  { name: "duration-curtain", value: "1200ms",  note: "Curtain reveal · once per page" },
  { name: "ease-default",     value: "cubic-bezier(0.16, 1, 0.3, 1)", note: "Out-expo · primary curve" },
  { name: "ease-out",         value: "cubic-bezier(0.33, 1, 0.68, 1)", note: "Counter, progress" },
  { name: "ease-in",          value: "cubic-bezier(0.32, 0, 0.67, 0)", note: "Section exit" },
];

const TYPE_SCALE = [
  { token: "Display 1 · 56/56", family: "Libre Baskerville",  weight: "700",       note: "Heading-only · serif side of bi-script · italic accents" },
  { token: "Display 2 · 56/56", family: "Elms Sans",          weight: "700",       note: "Heading-only · sans side of bi-script · 3 weight registers" },
  { token: "Section · 36/40",   family: "Libre Baskerville / Elms Sans",  weight: "500 / 600", note: "§-titles · bi-script" },
  { token: "Body · 17/26",      family: "Inter",              weight: "400",       note: "Default body · prose-optimised · long copy" },
  { token: "UI · 14–20",        family: "Inter Tight",        weight: "400–600",   note: "UI labels · buttons · medium-density" },
  { token: "Small · 14/20",     family: "Inter",              weight: "400",       note: "Helper, footnote, table content" },
  { token: "Eyebrow · 11/14",   family: "Elms Sans",          weight: "600",       note: "Uppercase, gold, 0.08em" },
  { token: "Numeric · 24/28",   family: "Inter Tight",        weight: "500",       note: "Tabular figures via OpenType tnum" },
];

// Mortgage radio options for ListItem demo
function MortgageRadioGroup() {
  const [selected, setSelected] = React.useState<string>("nhf");
  return (
    <div className="flex flex-col gap-2 max-w-md" role="radiogroup" aria-label="Mortgage type">
      {MORTGAGE_TYPES.map((type) => (
        <ListItem
          key={type}
          variant="radio"
          name="mortgage-type-doc"
          value={type}
          title={MORTGAGE_TYPE_LABEL[type]}
          helper={`${MORTGAGE_TYPE_RATE[type].toFixed(1)}%`}
          selected={selected === type}
          onSelect={() => setSelected(type)}
        />
      ))}
    </div>
  );
}

// Phosphor-flavoured stroke icon — placeholder until commissioned set arrives.
const PhosphorHouse = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const PhosphorCoin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PhosphorShield = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhosphorBuildings = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 21V9l6-4v16M9 21V13h6v8M15 21V8l4-2v15M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const PhosphorChat = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4H5.5A2.5 2.5 0 0 1 3 14.5v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const PhosphorCalculator = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="8" y="6" width="8" height="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="13" r="0.75" fill="currentColor" />
    <circle cx="12" cy="13" r="0.75" fill="currentColor" />
    <circle cx="15" cy="13" r="0.75" fill="currentColor" />
    <circle cx="9" cy="17" r="0.75" fill="currentColor" />
    <circle cx="12" cy="17" r="0.75" fill="currentColor" />
    <circle cx="15" cy="17" r="0.75" fill="currentColor" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 01 · Foundations
// ─────────────────────────────────────────────────────────────────────
export const Chapter01 = () => (
  <ChapterSection
    id="foundations"
    number="01"
    titleSans="Foundations"
    titleSerif=""
    intro={
      <>
        Tokens, type, motion, and voice — the seven foundations every primitive
        consumes. Locked at architecture time per PRD §4. Components reference
        the semantic layer; never raw hex, never raw <code className="numeric">200ms</code>.
      </>
    }
    noRule
  >
    {/* 01.1 Brand axis */}
    <Subsection
      id="foundations-brand-axis"
      number="01.1"
      titleSans="Brand"
      titleSerif="axis"
      description="Where AG Mortgage Bank sits on the heritage-institutional spectrum."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <p className="text-base text-ag-text leading-relaxed">
          The reference set is heritage-institutional: HSBC, Lloyds, Halifax,
          Chase, J.P. Morgan via Buck.co, and Noble Bank&rsquo;s Awwwards Site
          of the Day. AGMB is a 20-year-old Nigerian Primary Mortgage
          Institution, CBN-regulated, ISO 9001:2015 certified — the design
          register has to match.
        </p>
        <p className="text-base text-ag-text leading-relaxed">
          What AGMB is <em>not</em>: Habito&rsquo;s playful illustration, Better.com&rsquo;s
          tech-startup minimalism, Wise&rsquo;s consumer fintech. We borrow Wise&rsquo;s
          primitive discipline (8 components, 7 states, tokens-as-SSOT) and
          ship it inside a serif-led editorial register. Heritage in voice,
          modern in mechanics.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {["HSBC", "Lloyds", "Halifax", "Noble Bank"].map((name) => (
          <div key={name} className="bg-ag-cream/50 border border-ag-border rounded-md px-4 py-3">
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-gold">Reference</p>
            <p className="bi-serif text-ag-navy text-lg mt-1">{name}</p>
          </div>
        ))}
      </div>
    </Subsection>

    {/* 01.2 Colour tokens — Lane A: full catalogue promoted to /tokens/color.
         This subsection is now a summary with a cross-link. Key swatches stay
         for inline reference; the complete ref/sys/comp tier breakdown lives at
         /tokens/color. */}
    <Subsection
      id="foundations-colour"
      number="01.2"
      titleSans="Colour"
      titleSerif="tokens"
      description={
        <>
          Surface scales (light + dark) · 4 vivid accents · 11 base brand tokens · 9 vitality tonal variants · 3-tier ref/sys/comp model. Full catalogue at{" "}
          <a href="/tokens/color" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">
            /tokens/color
          </a>
          .
        </>
      }
    >
      {/* Swiss specimen blocks (2026-05-09): each token group sits inside a
          hairline-bordered rectangle with eyebrow + count above and structural
          rules below. Müller-Brockmann lineage — modular block layout. */}
      <SpecimenGroup
        label="Surfaces · light scale"
        count={`${SURFACE_LIGHT.length} steps`}
        description="Three neutral steps. Default for pages, cards, panels, inputs. No cream tint."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SURFACE_LIGHT.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={t.role}
              utility={t.utility}
              light={t.light}
            />
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Surfaces · dark scale"
        count={`${SURFACE_DARK.length} steps`}
        description="Three navy-family steps. Inverse sections, dark cards, the navy panel of the calculator."
        className="mt-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SURFACE_DARK.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={t.role}
              utility={t.utility}
            />
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Vivid accents"
        count={`${BRIGHT_TOKENS.length} accents`}
        description={
          <>Saturation pass 2026-05-09. The 9 vitality variants only shift lightness; these 4 lift chroma. <strong>Navy-vivid is live</strong> — it is the primary CTA, AI accent, and Stripe register (h=219°; purple starts at h≈250°+). <strong>Gold-vivid, green-vivid, and cream-vivid are reserved</strong> — declared for architectural completeness; not yet consumed by any primitive. Future composition moments: gold-vivid for celebration states, green-vivid for LTV-safe emphasis lifts, cream-vivid for luminous hero washes. Do not pull them into production components without a paired <code className="numeric text-[11px]">--comp-*</code> token.</>
        }
        className="mt-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BRIGHT_TOKENS.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={t.role}
              utility={t.utility}
              light={t.light}
            />
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Base brand layer"
        count={`${BRAND_TOKENS.length} tokens`}
        className="mt-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BRAND_TOKENS.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={t.role}
              utility={t.utility}
              light={t.light}
            />
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Vitality tonal variants"
        count={`${VITALITY_TOKENS.length} variants`}
        description="Same four locked hue families (navy · gold · cream · green) at different LCH lightness stops. The mesh-gradient utilities (see 01.6) compose these with the base tokens for soft surface depth without adding new accent colours."
        className="mt-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {VITALITY_TOKENS.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={t.role}
              utility={t.utility}
              light={t.light}
            />
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Semantic layer"
        count={`${SEMANTIC_TOKENS.length} tokens`}
        className="mt-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {SEMANTIC_TOKENS.map((t) => (
            <TokenSwatch
              key={t.varName}
              varName={t.varName}
              hex={t.hex}
              role={
                <>
                  {t.role}
                  <br />
                  <span className="text-ag-muted/70">→ {t.refs}</span>
                </>
              }
              compact
            />
          ))}
        </div>
      </SpecimenGroup>

      {/* Named colour pairings (Adewale 2026-05-09 restyle).
          Ten canonical pairs every primitive composes against. Surface · text
          · accent. Components pick a NAMED PAIR, never raw tokens. The
          institutional surface stays anchored in the base layer; vivid is
          rationed to ~5% of any viewport (active CTA, feature highlight,
          celebration moment). One-line role + three swatches + a live preview
          per pair. */}
      <SpecimenGroup
        label="Colour pairings"
        count={`${PAIRS.length} pairs`}
        description="Surface · text · accent triples that every primitive composes against. Pick a NAMED PAIR at the call site, never raw tokens. Base ~80% / vitality ~15% / vivid ~5% across any viewport — the institutional ratio that keeps gravitas while the modern CTA and feature highlight carry energy."
        className="mt-10"
      >
        <div className="flex flex-col">
          {PAIRS.map((p) => (
            <PairCard key={p.name} pair={p} />
          ))}
        </div>
      </SpecimenGroup>

      {/* ── dark-surface override · Lane FOUNDATION · 2026-05-09 ─────────────
          Proof-of-system specimen. Shows the same Button primary in two
          compositions: default (navy.vivid bg + cream text) and the automatic
          dark-surface flip (cream bg + navy text) activated by data-surface="dark"
          on the parent. No new prop. No new variant. The token cascade does it.
          Full override table in AGMB_DESIGN_SYSTEM.md → Token tier model. */}
      <SpecimenGroup
        label="dark-surface override"
        count="4 tokens"
        description={
          <>
            <code className="numeric text-xs bg-ag-light px-1.5 py-0.5 rounded">data-surface=&quot;dark&quot;</code>{" "}
            on a parent remaps{" "}
            <code className="numeric text-xs bg-ag-light px-1.5 py-0.5 rounded">--comp-cta-primary-bg</code> to cream and{" "}
            <code className="numeric text-xs bg-ag-light px-1.5 py-0.5 rounded">--comp-cta-primary-fg</code> to navy so
            the primary CTA remains visible on any saturated dark surface. No consumer prop. The scope cascades.
          </>
        }
        className="mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left — default light context: navy.vivid button on white surface */}
          <div className="bg-ag-white border border-ag-border rounded-md p-6 flex flex-col gap-4">
            <p className="eyebrow !text-ag-navy">Default · light surface</p>
            <p className="text-xs text-ag-muted leading-relaxed">
              No <code className="numeric bg-ag-light px-1 rounded">data-surface</code> attribute. Primary button renders navy.vivid fill + cream text per <code className="numeric bg-ag-light px-1 rounded">--comp-cta-primary-bg</code>.
            </p>
            <div className="pt-1">
              <Button variant="primary" size="md">Apply for a mortgage</Button>
            </div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">
              --comp-cta-primary-bg = navy.vivid #1F4FA8
            </p>
          </div>

          {/* Right — dark surface context: cream button on navy.vivid surface */}
          <div
            className="rounded-md p-6 flex flex-col gap-4"
            style={{ backgroundColor: "var(--ag-navy-vivid)" }}
            data-surface="dark"
          >
            <p className="eyebrow !text-ag-cream-warm">Dark surface · data-surface=&quot;dark&quot;</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--comp-text-muted-on-surface)" }}>
              Parent carries <code className="numeric bg-white/10 px-1 rounded">data-surface=&quot;dark&quot;</code>. Token cascade flips the button to cream fill + navy text automatically.
            </p>
            <div className="pt-1">
              <Button variant="primary" size="md">Apply for a mortgage</Button>
            </div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em]" style={{ color: "var(--comp-text-muted-on-surface)", opacity: 0.7 }}>
              --comp-cta-primary-bg overridden to cream.warm #FAF3E8
            </p>
          </div>
        </div>
      </SpecimenGroup>

      {/* The emphasis numeral is not a pair — it's a single-property rule that
          governs how `.numeric` renders on light surfaces. Documented inline so
          designers reading the colour chapter see the move that makes
          `₦2.8B+ disbursed` and the calculator's hero monthly repayment land. */}
      <SpecimenGroup
        label="Emphasis numeral · pair.numeric.emphasis"
        count="1 rule"
        description="The single most-distinctive colour move in the AGMB system: hero numerics on light surfaces render in navy.vivid (#1F4FA8). One use, never overplayed. On dark / inverse surfaces the numeric stays in cream and the .numeric weight bumps from 500 to 600 to keep optical density."
        className="mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light surface — navy.vivid emphasis */}
          <div className="bg-ag-white border border-ag-border rounded-md p-6 flex flex-col gap-2">
            <p className="eyebrow !text-ag-navy">On light surface · navy.vivid</p>
            <p className="numeric font-semibold tracking-[-0.04em] text-5xl leading-none" style={{ color: "var(--ag-navy-vivid)" }}>
              ₦2.8B<span className="text-3xl">+</span>
            </p>
            <p className="text-xs text-ag-muted">Disbursed in 12 months · 97 Nigerian families</p>
          </div>
          {/* Dark surface — cream + 600 weight bump */}
          <div className="bg-ag-navy text-ag-cream rounded-md p-6 flex flex-col gap-2">
            <p className="eyebrow !text-ag-gold">On dark surface · cream + 600</p>
            <p className="numeric tracking-[-0.04em] text-5xl leading-none text-ag-cream">
              ₦485,720
            </p>
            <p className="text-xs text-ag-cream/70">Indicative monthly repayment</p>
          </div>
        </div>
      </SpecimenGroup>
    </Subsection>

    {/* 01.3 Typography — Lane A: full catalogue at /tokens/typography */}
    <Subsection
      id="foundations-typography"
      number="01.3"
      titleSans="Typography"
      titleSerif=""
      description={
        <>
          Four families — Adewale lock 2026-05-09. Libre Baskerville + Elms Sans are heading + bi-script ONLY. Inter handles default body + long prose. Inter Tight handles UI labels, buttons, and tabular numerics (replaces Geist Mono via OpenType <code className="numeric">tnum</code>). Full type scale at{" "}
          <a href="/tokens/typography" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">
            /tokens/typography
          </a>
          .
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article className="bg-ag-white border border-ag-border rounded-lg p-7">
          <p className="eyebrow mb-3">Display 1 · Libre Baskerville</p>
          <p className="bi-serif text-ag-navy text-3xl leading-tight">
            Your home.<br />Your terms.<br /><span className="italic">Starting today.</span>
          </p>
          <p className="mt-5 text-sm text-ag-muted">400 / 400 italic / 700 · Pablo Impallari (SIL OFL) · heading-only</p>
        </article>
        <article className="bg-ag-white border border-ag-border rounded-lg p-7">
          <p className="eyebrow mb-3">Display 2 · Elms Sans</p>
          <p className="bi-sans text-ag-navy text-3xl leading-tight" style={{ fontWeight: 700 }}>
            Section titles.<br />Bi-script sans.<br />Three registers.
          </p>
          <p className="mt-5 text-sm text-ag-muted">Variable axis · Google Fonts (SIL OFL) · heading-only</p>
        </article>
        <article className="bg-ag-navy border border-ag-navy rounded-lg p-7">
          <p className="eyebrow mb-3 !text-ag-gold">Display 3 · Inter Tight</p>
          <p className="numeric text-ag-cream text-4xl leading-none">
            ₦485,720<span className="text-ag-cream/60 text-2xl">/mo</span>
          </p>
          <p className="numeric mt-3 text-ag-cream text-base">
            ₦2.8B disbursed · 97 families · 20+ yrs
          </p>
          <p className="mt-5 text-sm text-ag-cream/55">Variable axis · Google Fonts · OpenType tnum (replaces Geist Mono)</p>
        </article>
        <article className="bg-ag-white border border-ag-border rounded-lg p-7">
          <p className="eyebrow mb-3">Display 4 · Inter</p>
          <p className="text-ag-text text-[17px] leading-[1.6]" style={{ fontFamily: "var(--font-body)" }}>
            A CBN-licensed Primary Mortgage Bank, established 2004. We disbursed ₦2.8B to 97 Nigerian families in the past year. <span className="font-semibold">M-REIF first-mover.</span>{" "}
            <span className="text-ag-muted">CBN-regulated. NDPR-compliant.</span>
          </p>
          <p className="mt-5 text-sm text-ag-muted">Variable axis · Google Fonts · default body · prose-optimised · 14–18px</p>
        </article>
      </div>

      <p className="eyebrow mt-10 mb-3">Type scale · PRD §4.1</p>
      <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ag-cream/50 border-b border-ag-border">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Token</th>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Family</th>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Weight</th>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Where</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ag-border">
            {TYPE_SCALE.map((row) => (
              <tr key={row.token}>
                <td className="px-4 py-2.5 numeric text-ag-text">{row.token}</td>
                <td className="px-4 py-2.5 text-ag-text">{row.family}</td>
                <td className="px-4 py-2.5 numeric text-ag-muted">{row.weight}</td>
                <td className="px-4 py-2.5 text-ag-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Subsection>

    {/* 01.4 Bi-script registers */}
    <Subsection
      id="foundations-bi-script"
      number="01.4"
      titleSans="Bi-script"
      titleSerif="registers"
      description={
        <>Three weight pairs — wrapper class sets the var pair, <code className="numeric">.bi-sans</code> /{" "}
          <code className="numeric">.bi-serif</code> inherit. Word-level only (PRD §4.0): swap whole words, never split mid-word.
        </>
      }
    >
      <RegisterSwap />
      <CodeBlock
        className="mt-8"
        label="bi-script · word-level"
        code={`<h2 className="bi-section text-3xl">
  <span className="bi-sans">Design</span>{" "}
  <span className="bi-serif italic">system</span>
</h2>`}
      />
    </Subsection>

    {/* 01.5 Motion — Lane A: full catalogue at /tokens/motion. */}
    <Subsection
      id="foundations-motion"
      number="01.5"
      titleSans="Motion"
      titleSerif="tokens"
      description={
        <>
          Durations and curves locked in :root. Components reference{" "}
          <code className="numeric">.transition-token</code> /{" "}
          <code className="numeric">.transition-token-base</code> — never raw{" "}
          <code className="numeric">200ms</code> strings. Live demos at{" "}
          <a href="/tokens/motion" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">
            /tokens/motion
          </a>
          .
        </>
      }
    >
      <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ag-cream/50 border-b border-ag-border">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Var</th>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Value</th>
              <th className="text-left px-4 py-2.5 font-semibold text-ag-text">Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ag-border">
            {MOTION_TOKENS.map((t) => (
              <tr key={t.name}>
                <td className="px-4 py-2.5 numeric text-ag-text">--motion-{t.name}</td>
                <td className="px-4 py-2.5 numeric text-ag-muted">{t.value}</td>
                <td className="px-4 py-2.5 text-ag-muted">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="eyebrow mt-8 mb-3">Live · ease-default · transition-token</p>
      <div className="bg-ag-white border border-ag-border rounded-lg p-6">
        <p className="text-sm text-ag-muted mb-4">Hover the buttons to feel the curve. 200ms · cubic-bezier(0.16, 1, 0.3, 1).</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Hover me</Button>
          <Button variant="secondary">Hover me</Button>
          <Button variant="ghost">Hover me</Button>
        </div>
      </div>
    </Subsection>

    {/* 01.6 Spacing & surfaces — Lane A: full catalogues at /tokens/spacing,
         /tokens/elevation, /tokens/radius. Demos kept inline; exhaustive tables
         live in the token catalogue. */}
    <Subsection
      id="foundations-spacing"
      number="01.6"
      titleSans="Spacing"
      titleSerif="& surfaces"
      description={
        <>
          Base-8 scale · 12-column grid (<code className="numeric">.grid-12</code>, max 1400) · 3-step radius · 3-step elevation · 5 mesh-gradient utilities.
          Full catalogues at{" "}
          <a href="/tokens/spacing" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">/tokens/spacing</a>
          {", "}
          <a href="/tokens/elevation" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">/tokens/elevation</a>
          {", "}
          <a href="/tokens/radius" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">/tokens/radius</a>
          .
        </>
      }
    >
      {/* Swiss specimen blocks (2026-05-09): each demo is a discrete rectangle
          on the page grid — 1px hairline rules above + below, eyebrow + count
          markers, no nested cards. */}
      <SpecimenGroup label="Spacing scale · base 8" count="8 steps">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 16, 24, 32, 48, 64, 96].map((px) => (
            <div key={px} className="flex flex-col items-center gap-1.5">
              <span className="block bg-ag-gold" style={{ width: px, height: 12 }} aria-hidden="true" />
              <span className="numeric text-[10.5px] text-ag-muted">{px}</span>
            </div>
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="12-column grid · .grid-12"
        count="max-w 1400"
        description="All sections sit inside a 12-column grid with max-width 1400px and 24/32-gutter. Replaces the older max-w-7xl mx-auto pattern."
        className="mt-10"
      >
        <div className="space-y-2 text-sm text-ag-text">
          <p><code className="numeric">.grid-12</code> · 12-col grid + 1400 max + 24/32 gutter</p>
          <p><code className="numeric">col-span-12</code> · full width · headlines + heroes</p>
          <p><code className="numeric">lg:col-start-3 lg:col-span-8</code> · 8/12 centred · forms</p>
          <p><code className="numeric">px-6 md:px-10 lg:px-14</code> · responsive gutter</p>
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Radius scale"
        count="3 steps"
        description={
          <>v2 Stripe-restraint pass (Adewale 2026-05-09): tightened to 8 / 6 / 4 px. Hard 0px reads cold for a regulated bank serving Nigerian families on 30-year mortgages — the soft 8 / 6 / 4 keeps warmth while reading engineered. Components consume the tokens via <code className="numeric">.rounded-card / .rounded-button / .rounded-input</code> — never raw <code className="numeric">rounded-2xl</code>.</>
        }
        className="mt-10"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "--radius-input",  label: "input · 4px",  cls: "rounded-input",  utility: ".rounded-input" },
            { name: "--radius-button", label: "button · 6px", cls: "rounded-button", utility: ".rounded-button" },
            { name: "--radius-card",   label: "card · 8px",   cls: "rounded-card",   utility: ".rounded-card" },
          ].map((r) => (
            <div key={r.name} className="bg-ag-white border border-ag-border p-4 rounded-md">
              <div className={`bg-ag-navy h-20 w-full ${r.cls} mb-3`} aria-hidden="true" />
              <p className="text-sm font-semibold text-ag-text">{r.label}</p>
              <p className="numeric text-xs text-ag-muted mt-1">{r.name}</p>
              <p className="numeric text-[10.5px] text-ag-gold mt-0.5">{r.utility}</p>
            </div>
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Elevation · diet stack"
        count="3 steps"
        description={
          <>v2 (Adewale 2026-05-09 Stripe-restraint pass): cards default flat — white surface + 1px border, no shadow. Elevation is reserved for the hover state. <code className="numeric">.shadow-soft-1</code> remains for subtle tactile feedback; <code className="numeric">.shadow-soft-2/3</code> stay defined for opt-in moments (modals, nudges in motion) but are not the default card register.</>
        }
        className="mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-ag-white rounded-lg border border-ag-border p-7">
            <p className="numeric text-xs text-ag-muted">flat · default</p>
            <p className="bi-section bi-serif text-ag-navy text-2xl mt-1">Sample.</p>
            <p className="text-sm text-ag-muted mt-3">Border carries the edge. No shadow at rest.</p>
          </div>
          <div className="bg-ag-white rounded-lg border border-ag-border p-7 shadow-soft-1">
            <p className="numeric text-xs text-ag-muted">.shadow-soft-1 · hover</p>
            <p className="bi-section bi-serif text-ag-navy text-2xl mt-1">Sample.</p>
            <p className="text-sm text-ag-muted mt-3">The single tactile signal cards lift to.</p>
          </div>
          <div className="bg-ag-white rounded-lg border border-ag-border p-7 shadow-soft-2">
            <p className="numeric text-xs text-ag-muted">.shadow-soft-2 · opt-in</p>
            <p className="bi-section bi-serif text-ag-navy text-2xl mt-1">Sample.</p>
            <p className="text-sm text-ag-muted mt-3">Modals, sticky nudges. Not the default register.</p>
          </div>
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Dual-blue composition"
        count="signature"
        description="The new signature surface (Adewale 2026-05-09 v3): navy.deep BG + navy.vivid surface ON TOP. Stripe / Mercury 'dark hero with electric cards' register, executed inside the locked navy hue family. Replaces the retired gold-button register."
        className="mt-10"
      >
        <div className="bg-ag-navy-deep rounded-card p-8">
          <div data-surface="dark" className="bg-ag-navy-vivid rounded-card p-6 text-ag-cream-warm flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <p className="numeric text-[11px] uppercase tracking-[0.08em] text-ag-cream-warm/70">Indicative monthly</p>
              <p className="numeric text-3xl font-semibold">&#8358;485,720</p>
            </div>
            <Button variant="primary">Apply for this mortgage</Button>
          </div>
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Section surfaces · flat register"
        count="6 surfaces"
        description={
          <>v2 (Adewale 2026-05-09 Stripe-restraint pass): sections separate via scale and negative space, not gradient. Five flat surfaces from the locked palette — white default, navy inverse, cream and sage as accent rhythm. The mesh-gradient utilities (<code className="numeric">.bg-ag-mesh-*</code>) remain defined in <code className="numeric">globals.css</code> for opt-in atmospheric moments, but flat is now the default section register.</>
        }
        className="mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { bg: "bg-surface-light-1", name: "surface-light-1", use: "Default page · primary card" },
            { bg: "bg-surface-light-2", name: "surface-light-2", use: "Subtle alt · zebra rows" },
            { bg: "bg-surface-light-3", name: "surface-light-3", use: "Pressed · inputs" },
            { bg: "bg-ag-cream",        name: "ag-cream",        use: "Brand accent · sparingly" },
            { bg: "bg-ag-green-sage",   name: "ag-green-sage",   use: "Trust · Enquiry tint" },
            { bg: "bg-ag-navy",         name: "ag-navy",         use: "Inverse · Stats · Calculator", inverse: true },
          ].map((m) => (
            <div key={m.name} className={`${m.bg} rounded-lg p-8 border border-ag-border min-h-32`}>
              <p className={`numeric text-xs ${m.inverse ? "text-ag-cream/70" : "text-ag-muted"}`}>.{m.name}</p>
              <p className={`bi-section bi-serif text-2xl mt-2 ${m.inverse ? "text-ag-cream" : "text-ag-navy"}`}>
                Sample.
              </p>
              <p className={`text-xs mt-2 ${m.inverse ? "text-ag-cream/60" : "text-ag-muted"}`}>{m.use}</p>
            </div>
          ))}
        </div>
      </SpecimenGroup>

      <SpecimenGroup
        label="Word-break safety · .word-keep"
        description={
          <>Applied to every H1 / H2 + the bi-script utilities themselves. Guarantees no headline ever wraps mid-character on tight viewports. <code className="numeric">.bi-sans</code> / <code className="numeric">.bi-serif</code> declare <code className="numeric">white-space: nowrap</code> so a word inside either utility can never split across two faces.</>
        }
        className="mt-10"
      >
        <CodeBlock
          label="word-keep utility"
          code={`/* in globals.css */
.word-keep {
  word-break: keep-all;
  hyphens: none;
  overflow-wrap: normal;
}
.bi-sans, .bi-serif { white-space: nowrap; }`}
        />
      </SpecimenGroup>
    </Subsection>

    {/* 01.7 Voice — high-level register only.
        Vocabulary moves to 01.8, sentence-level grammar to 01.9, brand
        promise to 01.10. This subsection now carries the three tonal
        principles only — the lower-level Use/Avoid lists migrated to
        their own foundations (Adewale 2026-05-09 v4 wise.design pass). */}
    <Subsection
      id="foundations-voice"
      number="01.7"
      titleSans="Voice"
      titleSerif="register"
      description="Heritage-institutional register. Three tonal principles. Vocabulary, grammar, and brand promise live in the foundations below."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-ag-white border border-ag-border rounded-lg p-6">
          <p className="eyebrow mb-3">01 · Warmth</p>
          <p className="text-sm text-ag-text leading-relaxed">
            Warmth lives in the noun, not the adjective. <em>Home, family, Nigerian</em> warm the copy. <em>Amazing, incredible, best-in-class</em> do not &mdash; they undermine institutional authority.
          </p>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-6">
          <p className="eyebrow mb-3">02 · Authority</p>
          <p className="text-sm text-ag-text leading-relaxed">
            The bank is older than the reader&rsquo;s last laptop. Heritage register, never startup register. Never apologise for being institutional. Confident, declarative, regulator-aware.
          </p>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-6">
          <p className="eyebrow mb-3">03 · Specificity</p>
          <p className="text-sm text-ag-text leading-relaxed">
            Specific over generic, every time. <em>97 Nigerian families</em> beats <em>many families</em>. <em>Lekki six months after applying</em> beats <em>shortly after applying</em>. Numbers, places, products, dates &mdash; never abstractions.
          </p>
        </div>
      </div>
      {/* Hero copy register — migrated from Hero.tsx comment block 2026-05-09.
          Five H1 alternatives documented here as the source of truth.
          Each option rendered at bi-display scale so the register is legible
          in the design system context; caption carries the rationale verbatim. */}
      <SpecimenGroup
        label="Hero copy register"
        count="5 options"
        description="Five H1 alternatives evaluated for the opening fold. Preserved verbatim from the engineering comment block in Hero.tsx. Each rendered at bi-display scale. Implement one; retire the rest from code."
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Option A */}
          <div className="border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-6 bg-ag-light min-h-[160px] flex flex-col justify-end">
              <p className="bi-display text-[32px] leading-[1.02] tracking-[-0.025em] text-ag-navy">
                <span className="font-sans font-extrabold block">Financing Nigerian</span>
                <span className="font-sans font-extrabold block">homeownership</span>
                <span className="font-serif font-bold italic block">since 2004.</span>
              </p>
            </div>
            <div className="px-5 py-4 border-t border-ag-border bg-ag-white">
              <p className="eyebrow mb-1.5">Option A</p>
              <p className="text-xs text-ag-muted leading-snug">Institutional lead &middot; grounds in time and geography &middot; heritage register. Harder to dismiss than abstract possessives.</p>
            </div>
          </div>

          {/* Option B */}
          <div className="border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-6 bg-ag-light min-h-[160px] flex flex-col justify-end">
              <p className="bi-display text-[32px] leading-[1.02] tracking-[-0.025em] text-ag-navy">
                <span className="font-sans font-extrabold block">We close.</span>
                <span className="font-serif font-bold italic block">You own.</span>
              </p>
            </div>
            <div className="px-5 py-4 border-t border-ag-border bg-ag-white">
              <p className="eyebrow mb-1.5">Option B</p>
              <p className="text-xs text-ag-muted leading-snug">Verb-led, directional &middot; two blunt declarations, action + outcome &middot; no filler. The serif italic on &ldquo;own.&rdquo; carries the warmth the design needs.</p>
            </div>
          </div>

          {/* Option C */}
          <div className="border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-6 bg-ag-light min-h-[160px] flex flex-col justify-end">
              <p className="bi-display text-[32px] leading-[1.02] tracking-[-0.025em] text-ag-navy">
                <span className="font-sans font-extrabold block">The mortgage bank</span>
                <span className="font-sans font-extrabold block">built for how</span>
                <span className="font-serif font-bold italic block">Nigeria buys.</span>
              </p>
            </div>
            <div className="px-5 py-4 border-t border-ag-border bg-ag-white">
              <p className="eyebrow mb-1.5">Option C</p>
              <p className="text-xs text-ag-muted leading-snug">Documentary register &middot; Noble Bank lineage &middot; &ldquo;built for&rdquo; signals craft, not just availability. Avoids &ldquo;Your&rdquo; which can read as a consumer-app pattern.</p>
            </div>
          </div>

          {/* Option D */}
          <div className="border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-6 bg-ag-light min-h-[160px] flex flex-col justify-end">
              <p className="bi-display text-[32px] leading-[1.02] tracking-[-0.025em] text-ag-navy">
                <span className="font-sans font-extrabold block">Twenty years.</span>
                <span className="font-sans font-extrabold block">Forty-four states.</span>
                <span className="font-serif font-bold italic block">One bank.</span>
              </p>
            </div>
            <div className="px-5 py-4 border-t border-ag-border bg-ag-white">
              <p className="eyebrow mb-1.5">Option D</p>
              <p className="text-xs text-ag-muted leading-snug">Quiet authority &middot; JP Morgan / Lloyds register &middot; statistics-as-poetry. Three-beat structure maps to the three-line Cascade. Requires stat verification (replace 44 with actual figure).</p>
            </div>
          </div>

          {/* Option E */}
          <div className="border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-6 bg-ag-light min-h-[160px] flex flex-col justify-end">
              <p className="bi-display text-[32px] leading-[1.02] tracking-[-0.025em] text-ag-navy">
                <span className="font-sans font-extrabold block">Homeownership</span>
                <span className="font-sans font-extrabold block">without the</span>
                <span className="font-serif font-bold italic block">decades of waiting.</span>
              </p>
            </div>
            <div className="px-5 py-4 border-t border-ag-border bg-ag-white">
              <p className="eyebrow mb-1.5">Option E</p>
              <p className="text-xs text-ag-muted leading-snug">Problem-solution compressed &middot; names the pain and resolution in one breath &middot; more human than institutional &mdash; leans Wise register, not Chase. Adewale to decide register pole.</p>
            </div>
          </div>

        </div>
        <p className="text-xs text-ag-muted mt-5 leading-relaxed">
          The three-line Cascade structure is preserved regardless of copy choice. Line 1 = sans bold, Line 2 = bi-script (serif italic on key noun), Line 3 = subhead at 60% opacity. Migrated from <code className="numeric">Hero.tsx</code> comment block 2026-05-09.
        </p>
      </SpecimenGroup>

      <p className="text-sm text-ag-muted mt-6">
        Full library at <code className="numeric text-xs">AGMB_COPY_LIBRARY.md</code> &mdash; 11 sections, every CTA / disclosure / error / fallback. See <a href="#foundations-vocabulary" className="text-ag-navy underline underline-offset-2 hover:text-ag-gold transition-token">01.8 Vocabulary</a> for the term-level rules and <a href="#foundations-grammar" className="text-ag-navy underline underline-offset-2 hover:text-ag-gold transition-token">01.9 Grammar &amp; style</a> for sentence-level construction.
      </p>
    </Subsection>

    {/* 01.8 Vocabulary — promoted from AGMB_COPY_LIBRARY §2.1 + §2.2.
        Two-column Use/Avoid comparison, with Footnote markers on the
        regulatory-mandated entries (CBN Consumer Protection Reg. 2019).
        Domain glossary block at the foot. */}
    <Subsection
      id="foundations-vocabulary"
      number="01.8"
      titleSans="Vocabulary"
      titleSerif="terms"
      description="Term-level rules. Regulatory-mandated entries marked with footnotes — these are not stylistic preferences. Source: AGMB_COPY_LIBRARY.md §2.1 + §2.2."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Use column */}
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-ag-border bg-ag-light">
            <p className="eyebrow !text-ag-green">Use</p>
            <p className="text-xs text-ag-muted mt-1">Approved terms — institutional register, regulator-safe.</p>
          </div>
          <ul className="divide-y divide-ag-border">
            {[
              { term: "mortgage",               why: "Disambiguates from personal / auto loan." },
              { term: "home",                   why: "Warmer, emotional register. Never 'property' in headlines." },
              { term: "Nigerian families",      why: "Specific over 'customers'. Heritage register." },
              { term: "NHF",                    why: "Always uppercase. Brand consistency, legal name." },
              { term: "M-REIF",                 why: "Hyphenated, capitalised. AGMB hyphenates for legibility." },
              { term: "CBN-regulated",          why: "Specific regulator. Universal in Nigerian-bank footers." },
              { term: "indicative rate",        why: "Regulatory-safe alternative to 'your rate'.", reg: 1 },
              { term: "indicative repayment",   why: "Same. Extends the indicative framing.", reg: 1 },
              { term: "deposit",                why: "UK register. Never 'down payment' (Americanism)." },
              { term: "eligibility",            why: "Less judgemental than 'qualification'." },
              { term: "advisor",                why: "UK spelling. Institutional, never 'loan officer'." },
              { term: "application / enquiry",  why: "Application is committed; enquiry is exploratory." },
              { term: "credit assessment",      why: "Regulatory-safe alternative to 'approval check'.", reg: 2 },
              { term: "offer letter",           why: "Regulatory-safe alternative to 'approval letter'.", reg: 2 },
              { term: "tenure",                 why: "Standard Nigerian banking term for loan term." },
              { term: "disbursed",              why: "Specific banking verb. '₦2.8B disbursed'." },
            ].map((row) => (
              <li key={row.term} className="px-6 py-3 grid grid-cols-[10rem_1fr] gap-4 items-baseline">
                <span className="text-sm font-medium text-ag-text">
                  {row.term}
                  {row.reg && <Footnote n={row.reg} id="vocab" />}
                </span>
                <span className="text-xs text-ag-muted leading-snug">{row.why}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Avoid column */}
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-ag-border bg-ag-light">
            <p className="eyebrow !text-ag-red">Avoid</p>
            <p className="text-xs text-ag-muted mt-1">Banned terms &mdash; replacement supplied. Regulatory items are not negotiable.</p>
          </div>
          <ul className="divide-y divide-ag-border">
            {[
              { term: "guaranteed",       why: "Illegal in regulated lending advertising.",     replace: "indicative", reg: 3 },
              { term: "best rate",        why: "Comparison claim — requires substantiation.",   replace: "competitive (with data)", reg: 3 },
              { term: "approved",         why: "Implies credit decision before assessment.",    replace: "credit-assessed", reg: 3 },
              { term: "pre-approved",     why: "Implies approval already granted.",             replace: "eligibility check", reg: 3 },
              { term: "fast / easy",      why: "Over-claimed in fintech; undermines heritage.", replace: "clear / transparent" },
              { term: "seamless / unleash", why: "AI-cliché filler verbs.",                     replace: "the actual verb (open, complete)" },
              { term: "no hidden fees",   why: "Comparative claim — implies others have them.", replace: "All fees on the offer letter." },
              { term: "affordable",       why: "Subjective without numbers.",                    replace: "Use the number." },
              { term: "dream home",       why: "Stanbic et al. overuse it. Reads tired.",       replace: "your home / new home" },
              { term: "customer (in headlines)", why: "Off-register for AGMB voice.",            replace: "applicant / homeowner / Nigerian" },
              { term: "loan officer",     why: "Americanism.",                                   replace: "mortgage advisor" },
              { term: "down payment",     why: "Americanism.",                                   replace: "deposit" },
              { term: "Submit / Click here / Learn more", why: "Non-verb-led, generic.",         replace: "verb-led three-word CTA" },
              { term: "Trusted by millions", why: "Round-number fake (PRD §7).",                 replace: "Trusted by 97 Nigerian families" },
              { term: "powered by AI",    why: "Off-brand for heritage PMI.",                    replace: "Drop entirely" },
              { term: "esteemed / valued", why: "Empty institutional padding.",                  replace: "Drop the adjective" },
            ].map((row) => (
              <li key={row.term} className="px-6 py-3 grid grid-cols-[10rem_1fr] gap-4 items-baseline">
                <span className="text-sm font-medium text-ag-red/90">
                  {row.term}
                  {row.reg && <Footnote n={row.reg} id="vocab" />}
                </span>
                <span className="text-xs text-ag-muted leading-snug">
                  {row.why}{" "}
                  <span className="text-ag-text/80">→ <span className="font-medium text-ag-green">{row.replace}</span></span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Domain glossary — short clear definitions of regulator + product
          terminology. Pulled verbatim from AGMB_COPY_LIBRARY §2.3. */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Domain glossary</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Regulator</span>{" "}
            <span className="bi-serif">vocabulary</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Copy these verbatim into helper text or tooltips. Definitions written in AGMB voice.
          </p>
        </header>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-ag-white border border-ag-border rounded-lg p-6">
          {[
            { term: "NHF",       def: "National Housing Fund. Federal scheme administered by FMBN. Nigerians in employment contribute 2.5% of monthly salary; eligible after six months." },
            { term: "M-REIF",    def: "Ministry of Finance Incorporated Real Estate Investment Fund. Long-term, low-interest mortgages (currently 9.75% p.a.) via participating banks." },
            { term: "CBN",       def: "Central Bank of Nigeria. The apex regulator. AGMB is licensed by CBN as a Primary Mortgage Bank." },
            { term: "NDIC",      def: "Nigeria Deposit Insurance Corporation. Protects deposits at CBN-licensed institutions including PMIs, up to a statutory maximum." },
            { term: "NDPR",      def: "Nigeria Data Protection Regulation 2019. Governs how AGMB collects, processes, and stores personal data. Regulator: NDPC." },
            { term: "BVN",       def: "Bank Verification Number. 11-digit number issued by NIBSS that identifies you across every bank in Nigeria." },
            { term: "NIN",       def: "National Identification Number. 11-digit identifier issued by the National Identity Management Commission (NIMC)." },
            { term: "LTV",       def: "Loan-to-Value ratio. Loan amount as a percentage of property value. Lower LTV = larger deposit = lower risk. AGMB caps at 90%." },
            { term: "DTI",       def: "Debt-to-Income ratio. Monthly debt obligations as a percentage of monthly income. Set per product, case-by-case." },
            { term: "PMI / PMB", def: "Primary Mortgage Institution / Primary Mortgage Bank. CBN classification for specialist mortgage banks. AGMB is a licensed PMB." },
            { term: "draw-down", def: "A scheduled payment released to a developer / builder during a Construction Finance facility, tied to verified build milestones." },
            { term: "equity",    def: "Your deposit. The portion of property value you contribute upfront." },
            { term: "tenure",    def: "Length of the mortgage facility, in years. AGMB range: 5–30 years." },
            { term: "principal", def: "The loan amount, before interest." },
          ].map((row) => (
            <div key={row.term} className="grid grid-cols-[5rem_1fr] gap-3 items-baseline">
              <dt className="numeric text-xs font-semibold text-ag-navy uppercase tracking-wider">{row.term}</dt>
              <dd className="text-xs text-ag-muted leading-snug">{row.def}</dd>
            </div>
          ))}
        </dl>
      </div>

      <FootnoteList
        id="vocab"
        label="Regulatory citations"
        items={[
          { n: 1, source: <>"Indicative" framing is mortgage-disclaimer convention; rates are subject to assessment until the offer letter is issued. PRD §3.5.2.</> },
          { n: 2, source: <>"Credit assessment" and "offer letter" replace "approval" / "approval letter" to avoid implying a credit decision before assessment. PRD §3.5.2.</> },
          { n: 3, source: <>Regulatory-mandated, not stylistic. CBN Consumer Protection Regulations 2019 prohibit guarantees and unsubstantiated comparison claims in regulated-lending advertising. PRD §3.5.3, AGMB_COPY_LIBRARY.md §2.2.</> },
        ]}
      />

      {/* ── 01.8 Vocabulary specimens ────────────────────────────────────────
          Rule: every rule above is paired with a demonstration so a writer
          can copy-pattern directly. Pattern borrowed from Polaris + wise.design.
      ────────────────────────────────────────────────────────────────────── */}

      {/* 01.8-S1  Approved-vs-banned word pairs */}
      <div className="mt-12">
        <SpecimenGroup label="Approved vs. banned — paired word pairs" count="8 pairs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="hidden md:flex items-center gap-2 pb-3 border-b border-ag-border">
              <span className="eyebrow !text-ag-green">Use this</span>
            </div>
            <div className="hidden md:flex items-center gap-2 pb-3 border-b border-ag-border">
              <span className="eyebrow !text-ag-red">Not this</span>
            </div>
            {([
              { use: "monthly repayment",         avoid: "monthly bill",          note: "Bill reads consumer-debt; repayment reads commitment." },
              { use: "your home",                  avoid: "the property",          note: "Possessive warms the copy; \"the property\" is a legal instrument." },
              { use: "we'll review",          avoid: "we'll process",    note: "Review implies judgment; process implies a factory." },
              { use: "indicative rate",            avoid: "your rate",             note: "Regulatory-safe until offer letter is issued." },
              { use: "credit assessment",          avoid: "approval check",        note: "No implied credit decision before the assessment." },
              { use: "deposit",                    avoid: "down payment",          note: "UK register — down payment is an Americanism." },
              { use: "mortgage advisor",           avoid: "loan officer",          note: "Loan officer is Americanism; advisor is institutional UK register." },
              { use: "97 Nigerian families",       avoid: "trusted by millions",   note: "Specific number over round-number fake (PRD §7)." },
            ] as const).map((row) => (
              <React.Fragment key={row.use}>
                <div className="py-4 pr-6 border-b border-ag-border/60 flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ag-text">{row.use}</span>
                  <span className="text-xs text-ag-muted leading-snug hidden md:block">{row.note}</span>
                </div>
                <div className="py-4 border-b border-ag-border/60 flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ag-red/90 line-through decoration-ag-red/40">{row.avoid}</span>
                  <span className="text-xs text-ag-muted leading-snug md:hidden">{row.note}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </SpecimenGroup>
      </div>

      {/* 01.8-S2  Term substitution callouts */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Term substitutions</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Six replacements</span>{" "}
            <span className="bi-serif">with rationale</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Each entry shows the old term, the replacement, and the specific reason. The reason is the enforcing rule &mdash; when the reason changes, the term may change.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {([
            {
              from: "loan",
              to: "mortgage",
              why: "\"Loan\" covers personal, auto, and business credit — the word signals the wrong category before the reader sees a rate. Always resolve to \"mortgage\" in product copy.",
            },
            {
              from: "interest",
              to: "interest rate (first mention) — then rate",
              why: "Interest alone is ambiguous. First mention pairs the full term; subsequent references may abbreviate to \"rate\".",
            },
            {
              from: "principal",
              to: "principal (what you've paid down)",
              why: "First-time mortgage readers conflate principal with \"main\". The parenthetical gloss clears it on first mention in any calculator or wizard step.",
            },
            {
              from: "approved",
              to: "credit-assessed",
              why: "Regulatory-mandated (CBN Consumer Protection Regulations 2019). \"Approved\" implies a credit decision before assessment — forbidden in regulated-lending advertising.",
            },
            {
              from: "fast / easy",
              to: "the actual time (5 working days)",
              why: "Overused in fintech and undermines the heritage register. If the process is genuinely fast, give the number. If it is not, drop the claim.",
            },
            {
              from: "property (in headlines)",
              to: "home",
              why: "Property is a legal instrument. Home is what the reader is buying. Use \"home\" in all customer-facing copy; \"property\" stays in legal, regulatory, and form-label contexts.",
            },
          ] as const).map((entry) => (
            <div
              key={entry.from}
              className="bg-ag-white border border-ag-border rounded-lg px-6 py-5 grid grid-cols-1 md:grid-cols-[12rem_12rem_1fr] gap-4 items-baseline"
            >
              <div>
                <p className="eyebrow !text-ag-red mb-1">Before</p>
                <p className="text-sm font-medium text-ag-red/90 line-through decoration-ag-red/40">{entry.from}</p>
              </div>
              <div>
                <p className="eyebrow !text-ag-green mb-1">After</p>
                <p className="text-sm font-medium text-ag-text">{entry.to}</p>
              </div>
              <div>
                <p className="eyebrow mb-1">Why</p>
                <p className="text-xs text-ag-muted leading-relaxed">{entry.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 01.8-S3  Nigerian-English register specimens */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Nigerian-English register</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Three sentences</span>{" "}
            <span className="bi-serif">at full register</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Read these aloud. The rhythm should feel unhurried &mdash; institutional, warm, specific. If it reads like a startup landing page or a government circular, it is wrong.
          </p>
        </header>
        <div className="flex flex-col gap-8">
          {/* Calculator output register — do / don't */}
          <div className="flex flex-col gap-3">
            <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-border bg-ag-light flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow">Calculator output</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-green/10 border border-ag-green/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-green">&#x2713; Do</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">UI copy &middot; product</span>
              </div>
              <div className="px-6 py-6 bg-ag-cream/30">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  Based on a property value of &#x20A6;24,500,000, a 20% deposit, and a 15-year tenure, your indicative monthly repayment is &#x20A6;186,400.
                </p>
                <div className="mt-4 border-t border-ag-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Second person, possessive</span>
                    &ldquo;your indicative monthly repayment&rdquo; &mdash; not &ldquo;the estimated payment&rdquo;
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Indicative framing</span>
                    &ldquo;indicative&rdquo; before the number &mdash; regulatory-safe
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Specific numbers</span>
                    &#x20A6;24,500,000 and &#x20A6;186,400 &mdash; no rounding to neat figures
                  </div>
                </div>
              </div>
            </div>
            {/* Wrong version — violates indicative framing + second-person possessive */}
            <div className="bg-ag-white border border-ag-red/20 rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-red/20 bg-ag-red/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow !text-ag-red">Calculator output</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-red/10 border border-ag-red/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-red">&#x2717; Don&rsquo;t</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">violates indicative framing + corporate stiffness</span>
              </div>
              <div className="px-6 py-6 bg-ag-red/5">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  The estimated monthly repayment for the selected property is &#x20A6;186,000 per month.
                </p>
                <div className="mt-4 border-t border-ag-red/20 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Third person, impersonal</span>
                    &ldquo;the selected property&rdquo; creates distance from the reader&rsquo;s goal
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Missing indicative framing</span>
                    &ldquo;estimated&rdquo; without &ldquo;indicative&rdquo; fails CBN regulatory-safe convention
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Rounded number</span>
                    &#x20A6;186,000 (round) signals a fake figure &mdash; specificity is the integrity signal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wizard step register — do / don't */}
          <div className="flex flex-col gap-3">
            <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-border bg-ag-light flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow">Wizard step</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-green/10 border border-ag-green/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-green">&#x2713; Do</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">UI copy &middot; wizard</span>
              </div>
              <div className="px-6 py-6 bg-ag-cream/30">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  We need your BVN to run a credit assessment. This does not affect your credit score and takes less than 30 seconds.
                </p>
                <div className="mt-4 border-t border-ag-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Active voice</span>
                    &ldquo;We need&rdquo; &mdash; the bank acts; the reader benefits
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Term discipline</span>
                    &ldquo;credit assessment&rdquo; not &ldquo;approval check&rdquo; &mdash; regulatory-safe
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Reassurance last</span>
                    Objection (&ldquo;affects credit&rdquo;) answered before the reader raises it
                  </div>
                </div>
              </div>
            </div>
            {/* Wrong version — passive voice + vague hedging + jargon */}
            <div className="bg-ag-white border border-ag-red/20 rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-red/20 bg-ag-red/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow !text-ag-red">Wizard step</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-red/10 border border-ag-red/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-red">&#x2717; Don&rsquo;t</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">violates active voice + vague hedging + jargon-stack</span>
              </div>
              <div className="px-6 py-6 bg-ag-red/5">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  Your BVN details are required to be submitted for the purposes of enabling our loan processing and credit approval verification procedures.
                </p>
                <div className="mt-4 border-t border-ag-red/20 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Passive, impersonal</span>
                    &ldquo;are required to be submitted&rdquo; buries who acts and who benefits
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Banned jargon</span>
                    &ldquo;approval verification&rdquo; implies a credit decision before assessment &mdash; regulatory violation
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">No reassurance</span>
                    Objection around credit impact never addressed &mdash; reader friction unresolved
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory disclosure register — do / don't */}
          <div className="flex flex-col gap-3">
            <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-border bg-ag-light flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow">Regulatory disclosure</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-green/10 border border-ag-green/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-green">&#x2713; Do</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">Footer / legal</span>
              </div>
              <div className="px-6 py-6 bg-ag-cream/30">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  AG Mortgage Bank Plc is licensed by the Central Bank of Nigeria as a Primary Mortgage Bank. Rates are indicative. Final terms are subject to credit assessment and prevailing CBN guidelines.
                </p>
                <div className="mt-4 border-t border-ag-border pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Complete sentences</span>
                    Not &ldquo;T&amp;Cs apply&rdquo; &mdash; active, full disclosure
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Specific regulator</span>
                    CBN named, not &ldquo;relevant regulatory authority&rdquo;
                  </div>
                  <div>
                    <span className="font-medium text-ag-text block mb-1">Indicative framing</span>
                    Rates disclaimed before &ldquo;final terms&rdquo; &mdash; word order is load-bearing
                  </div>
                </div>
              </div>
            </div>
            {/* Wrong version — corporate-bank stiffness + vague catch-all hedge */}
            <div className="bg-ag-white border border-ag-red/20 rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-red/20 bg-ag-red/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <p className="eyebrow !text-ag-red">Regulatory disclosure</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ag-red/10 border border-ag-red/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-red">&#x2717; Don&rsquo;t</span>
                </div>
                <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">violates complete-sentence rule + vague regulator + catch-all hedge</span>
              </div>
              <div className="px-6 py-6 bg-ag-red/5">
                <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
                  Regulated by the relevant regulatory authority. Rates subject to change. T&amp;Cs apply.
                </p>
                <div className="mt-4 border-t border-ag-red/20 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ag-muted">
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Vague regulator</span>
                    &ldquo;relevant regulatory authority&rdquo; could mean anything &mdash; CBN must be named
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Fragment hedge</span>
                    &ldquo;Rates subject to change&rdquo; is a fragment, not a sentence; reads evasive
                  </div>
                  <div>
                    <span className="font-medium text-ag-red block mb-1">Catch-all</span>
                    &ldquo;T&amp;Cs apply&rdquo; fails the active-disclosure obligation &mdash; specify what terms apply
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 01.8-S4  Numerals + currency conventions */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Numerals + currency</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">&#x20A6; glyph,</span>{" "}
            <span className="bi-serif">separators, precision</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            One fully-annotated specimen showing every convention applied together. Copy-pattern this into any calculator output, stat block, or regulatory figure.
          </p>
        </header>
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          {/* Live specimen */}
          <div className="px-6 py-8 bg-surface-light-2 border-b border-dashed border-ag-border flex flex-col gap-3">
            <p className="numeric text-3xl md:text-4xl font-semibold text-ag-navy leading-none tracking-tight">
              &#x20A6;24,500,000
            </p>
            <p className="text-sm text-ag-muted">property value</p>
            <div className="mt-2 flex flex-wrap gap-6 text-sm text-ag-text">
              <span><span className="font-medium">6.5%</span> &mdash; interest rate, numeric form</span>
              <span><span className="font-medium">6.5 per cent</span> &mdash; interest rate, spelled-out form</span>
            </div>
          </div>
          {/* Rule annotation rows */}
          <div className="divide-y divide-ag-border">
            {([
              {
                rule: "&#x20A6; glyph — no space",
                example: "₦24,500,000",
                wrong: "N24,500,000 · NGN 24,500,000 · ₦ 24,500,000",
                note: "The Naira sign (₦) is a single Unicode character (U+20A6). Never substitute N or NGN in customer-facing copy. No space between glyph and digits.",
              },
              {
                rule: "Thousand separators — always",
                example: "₦24,500,000",
                wrong: "₦24500000",
                note: "Comma-separated groups of three from the right. No exceptions in display copy. MoneyInput and ExpressiveMoneyDisplay format automatically.",
              },
              {
                rule: "Kobo — suppress except on statements",
                example: "₦186,400",
                wrong: "₦186,400.00",
                note: "Kobo decimal places read as precision theatre in mortgage copy. Suppress in calculator output, stat blocks, and all hero-register numbers. Statements and offer-letter line items may display kobo.",
              },
              {
                rule: "Percentage — no space before %",
                example: "6.5%",
                wrong: "6.5 %",
                note: "The percent sign attaches directly to the digit in numeric form.",
              },
              {
                rule: "Per cent — spaced, two words, when spelled out",
                example: "6.5 per cent",
                wrong: "6.5 percent · 6.5%",
                note: "When writing rates in prose (not calculator output), spell out \"per cent\" as two words. This is the UK/Nigerian-banking register. \"Percent\" (one word) is the American form.",
              },
            ] as const).map((rule) => (
              <div key={rule.rule} className="px-6 py-4 grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-4 items-baseline">
                <p className="eyebrow text-ag-navy/80">{rule.rule}</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap gap-4 items-baseline">
                    <span className="text-sm font-medium text-ag-green">{rule.example}</span>
                    <span className="text-xs text-ag-red/80 line-through decoration-ag-red/40">{rule.wrong}</span>
                  </div>
                  <p className="text-xs text-ag-muted leading-relaxed">{rule.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Subsection>

    {/* 01.9 Grammar & style — sentence-level construction rules from
        AGMB_COPY_LIBRARY §1 (Voice principles 3–5) + §5 (Microcopy). */}
    <Subsection
      id="foundations-grammar"
      number="01.9"
      titleSans="Grammar"
      titleSerif="& style"
      description="Sentence-level construction. Active voice, second person, short. Source: AGMB_COPY_LIBRARY.md §1 voice principles + §5 microcopy patterns."
    >
      <ol className="flex flex-col gap-5">
        {[
          {
            n: "01",
            rule: "Active voice. Always.",
            why: "The bank acts; the reader benefits. Passive constructions read as bureaucratic and CYA.",
            use: "We disbursed ₦2.8B in the past year.",
            avoid: "₦2.8B was disbursed in the past year.",
          },
          {
            n: "02",
            rule: "Second person, possessive, present tense.",
            why: "Lead with the noun the reader cares about. Never refer to the reader as \"the customer\".",
            use: "Your home. Your terms. Starting today.",
            avoid: "The customer's home, on the customer's terms.",
          },
          {
            n: "03",
            rule: "One idea per sentence. Three short beats one long.",
            why: "The reader is on a phone, in Lagos traffic, half-distracted. Reading age target: SS2.",
            use: "Open an account. Confirm your BVN. We'll call within two days.",
            avoid: "Once you have completed the initial onboarding form, which includes BVN verification and supporting documentation, an advisor will be in touch within a maximum of two working days.",
          },
          {
            n: "04",
            rule: "Verb-led CTAs. Three words max.",
            why: "Generic CTAs (\"Submit\", \"Click here\", \"Learn more\" alone) are banned. The verb makes the next action concrete.",
            use: "Calculate my mortgage. · Speak to an advisor. · Check eligibility.",
            avoid: "Submit · Learn more · Get started · Sign up",
          },
          {
            n: "05",
            rule: "Specific over generic. Numbers, places, dates.",
            why: "Specificity builds trust. Generic abstractions undermine the heritage register.",
            use: "97 Nigerian families. ₦2.8B disbursed. Lekki, six months after applying.",
            avoid: "Many families. Significant amount disbursed. Shortly after applying.",
          },
          {
            n: "06",
            rule: "Form errors name the field and the rule.",
            why: "Vague error copy (\"Invalid input\") fails accessibility and frustrates users on mobile.",
            use: "BVN must be 11 digits.",
            avoid: "Invalid input.",
          },
          {
            n: "07",
            rule: "Success states lead with the reference, then the next step.",
            why: "The reference number is the receipt. The next step is the reassurance.",
            use: "Application AGMB-2026-0048213 received. A mortgage advisor will call within 2 working days.",
            avoid: "Thank you for your submission.",
          },
          {
            n: "08",
            rule: "Disclaimers are active, complete sentences.",
            why: "Regulatory-safe disclosure must read as commitment, not as a hedge.",
            use: "Rates are indicative. Final terms are subject to credit assessment and prevailing CBN guidelines.",
            avoid: "Rates subject to change. T&Cs apply.",
          },
          {
            n: "09",
            rule: "Empty states are verb prompts plus reassurance.",
            why: "\"No results\" is a dead end. A verb prompt restarts the user.",
            use: "Try a property value to see your numbers.",
            avoid: "No results.",
          },
        ].map((row) => (
          <li key={row.n} className="bg-ag-white border border-ag-border rounded-lg p-6">
            <header className="flex items-baseline gap-3 mb-3">
              <span className="numeric text-xs text-ag-gold shrink-0 w-8">{row.n}</span>
              <h4 className="bi-label text-ag-navy text-base md:text-lg flex-1">
                <span className="bi-sans">{row.rule}</span>
              </h4>
            </header>
            <p className="text-xs text-ag-muted leading-snug ml-11 mb-4 max-w-2xl">{row.why}</p>
            <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-2 border-ag-green pl-4">
                <p className="eyebrow !text-ag-green mb-1.5">Use</p>
                <p className="text-sm text-ag-text leading-relaxed">{row.use}</p>
              </div>
              <div className="border-l-2 border-ag-red pl-4">
                <p className="eyebrow !text-ag-red mb-1.5">Avoid</p>
                <p className="text-sm text-ag-muted leading-relaxed">{row.avoid}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── 01.9 Grammar specimens ───────────────────────────────────────────
          Typographic punctuation conventions paired with demonstrations.
          Pattern: Polaris + wise.design — rule then renderable example.
      ────────────────────────────────────────────────────────────────────── */}

      {/* 01.9-S1  Em-dash usage */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Em-dash usage</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Em-dash vs. comma</span>{" "}
            <span className="bi-serif">vs. colon</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            AGMB house style: em-dash with hair spaces around it ( &mdash; ) for a parenthetical thought. Comma for list breaks. Colon for a definition lead. These are not interchangeable.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {([
            {
              mark: "Em-dash — parenthetical",
              use: "Nigeria's most trusted mortgage bank — over 20 years of helping Nigerians own their homes.",
              avoid: "Nigeria's most trusted mortgage bank, over 20 years of helping Nigerians own their homes.",
              note: "The em-dash with hair spaces ( — ) sets off a parenthetical that would break the sentence rhythm as a comma. Hair space is U+200A, not a regular space.",
            },
            {
              mark: "Comma — list break",
              use: "Open an account. Confirm your BVN. We'll call within two days.",
              avoid: "Open an account — confirm your BVN — we'll call within two days.",
              note: "Multiple short beats belong as separate sentences, not comma-joined or em-dash-chained. Each sentence has one action.",
            },
            {
              mark: "Colon — definition lead",
              use: "Your next step: confirm your NIN.",
              avoid: "Your next step — confirm your NIN.",
              note: "Colon introduces what follows as a definition or instruction. Em-dash here would read as an aside; colon reads as a directive.",
            },
          ] as const).map((row) => (
            <div key={row.mark} className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
              <div className="px-6 py-3 border-b border-ag-border bg-ag-light">
                <p className="eyebrow">{row.mark}</p>
              </div>
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="eyebrow !text-ag-green mb-2">Use</p>
                  <p className="text-sm text-ag-navy leading-relaxed">{row.use}</p>
                </div>
                <div>
                  <p className="eyebrow !text-ag-red mb-2">Avoid</p>
                  <p className="text-sm text-ag-muted leading-relaxed line-through decoration-ag-red/30">{row.avoid}</p>
                </div>
              </div>
              <div className="px-6 pb-4">
                <p className="text-xs text-ag-muted leading-relaxed max-w-2xl">{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 01.9-S2  Smart quotes */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Smart quotes</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Curly quotes</span>{" "}
            <span className="bi-serif">in display copy</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Straight quotes are forbidden in all rendered marketing and product copy. Data inputs accept straight quotes typed by the user; the layout layer converts at render time.
          </p>
        </header>
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          {/* Column header row */}
          <div className="px-6 py-3 border-b border-ag-border bg-ag-light hidden md:grid md:grid-cols-[14rem_1fr_1fr] gap-6">
            <p className="eyebrow text-ag-navy/60">Pair</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-ag-green/10 border border-ag-green/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-green">&#x2713; Correct</span>
              <span className="numeric text-[10.5px] text-ag-muted/60">curly / typographic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-ag-red/10 border border-ag-red/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ag-red">&#x2717; Wrong</span>
              <span className="numeric text-[10.5px] text-ag-muted/60">straight / typewriter</span>
            </div>
          </div>
          <div className="divide-y divide-ag-border">
            {/* Row 1 — U+2018 LEFT SINGLE QUOTATION MARK vs. U+0027 APOSTROPHE */}
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[14rem_1fr_1fr] gap-6 items-center">
              <div>
                <p className="eyebrow text-ag-navy/80">Left single quote</p>
                <p className="numeric text-[10.5px] text-ag-muted/60 mt-0.5">U+2018</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl leading-none text-ag-navy select-all">&#x2018;</span>
                <div>
                  <p className="eyebrow !text-ag-green mb-0.5">Left single quote</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+2018 &#x2014; opens a single-quoted phrase</p>
                  <p className="text-xs text-ag-muted mt-1">e.g. She said &#x2018;indicative rate&#x2019;.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-ag-red/5 border border-ag-red/20 rounded px-4 py-3">
                <span className="font-serif text-5xl leading-none text-ag-red/70 select-all">&#x27;</span>
                <div>
                  <p className="eyebrow !text-ag-red mb-0.5">Straight apostrophe</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+0027 &#x2014; typewriter key, not a quote</p>
                  <p className="text-xs text-ag-muted mt-1">Renders asymmetrically; reserved for HTML attributes only.</p>
                </div>
              </div>
            </div>

            {/* Row 2 — U+201C / U+201D curly double quotes vs. U+0022 dumb quotes */}
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[14rem_1fr_1fr] gap-6 items-center">
              <div>
                <p className="eyebrow text-ag-navy/80">Double curly quotes</p>
                <p className="numeric text-[10.5px] text-ag-muted/60 mt-0.5">U+201C &middot; U+201D</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl leading-none text-ag-navy select-all">&#x201C;&#x201D;</span>
                <div>
                  <p className="eyebrow !text-ag-green mb-0.5">Curly double quotes</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+201C open &middot; U+201D close</p>
                  <p className="text-xs text-ag-muted mt-1">e.g. Rates described as &#x201C;indicative.&#x201D;</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-ag-red/5 border border-ag-red/20 rounded px-4 py-3">
                <span className="font-serif text-5xl leading-none text-ag-red/70 select-all">&#x22;&#x22;</span>
                <div>
                  <p className="eyebrow !text-ag-red mb-0.5">Straight double quotes</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+0022 &#x2014; dumb quotes, ASCII only</p>
                  <p className="text-xs text-ag-muted mt-1">Identical open and close glyph &#x2014; no typographic direction cue.</p>
                </div>
              </div>
            </div>

            {/* Row 3 — U+2019 RIGHT SINGLE QUOTATION MARK (correct apostrophe) vs. U+0027 */}
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[14rem_1fr_1fr] gap-6 items-center">
              <div>
                <p className="eyebrow text-ag-navy/80">Apostrophe</p>
                <p className="numeric text-[10.5px] text-ag-muted/60 mt-0.5">U+2019</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl leading-none text-ag-navy select-all">&#x2019;</span>
                <div>
                  <p className="eyebrow !text-ag-green mb-0.5">Curly apostrophe</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+2019 &#x2014; same glyph as right single quote</p>
                  <p className="text-xs text-ag-muted mt-1">Contractions and possessives. e.g. it&#x2019;s, doesn&#x2019;t, AGMB&#x2019;s.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-ag-red/5 border border-ag-red/20 rounded px-4 py-3">
                <span className="font-serif text-5xl leading-none text-ag-red/70 select-all">&#x27;</span>
                <div>
                  <p className="eyebrow !text-ag-red mb-0.5">Straight apostrophe</p>
                  <p className="numeric text-[10.5px] text-ag-muted/70">U+0027 &#x2014; wrong in display copy</p>
                  <p className="text-xs text-ag-muted mt-1">Reserved for HTML attributes and code strings only.</p>
                </div>
              </div>
            </div>

            {/* Row 4 — in-word possessive comparison at display size */}
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[14rem_1fr_1fr] gap-6 items-center">
              <div>
                <p className="eyebrow text-ag-navy/80">In-word possessive</p>
                <p className="numeric text-[10.5px] text-ag-muted/60 mt-0.5">real-word comparison</p>
              </div>
              <div>
                <p className="eyebrow !text-ag-green mb-2">Correct</p>
                {/* U+2019 in a real word at display size */}
                <p className="font-serif text-2xl text-ag-navy leading-snug">Adewale&#x2019;s application</p>
                <p className="numeric text-[10.5px] text-ag-muted/70 mt-1">U+2019 curly apostrophe &#x2014; follows the glyph of the serif letterforms</p>
              </div>
              <div className="bg-ag-red/5 border border-ag-red/20 rounded px-4 py-3">
                <p className="eyebrow !text-ag-red mb-2">Wrong</p>
                {/* &#x27; straight apostrophe — deliberate "wrong" example */}
                <p className="font-serif text-2xl text-ag-red/80 line-through decoration-ag-red/40 leading-snug">Adewale&#x27;s application</p>
                <p className="numeric text-[10.5px] text-ag-muted/70 mt-1">U+0027 straight apostrophe &#x2014; breaks typographic texture at display size</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 01.9-S3  Ellipsis */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Ellipsis</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">True ellipsis</span>{" "}
            <span className="bi-serif">character only</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Three periods (...) are forbidden. The true ellipsis glyph (&#8230; U+2026) is used exclusively in loading states. Finalised copy avoids it because it reads tentative.
          </p>
        </header>
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          <div className="divide-y divide-ag-border">
            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr] gap-4 items-baseline">
              <p className="eyebrow text-ag-navy/80">Loading state only</p>
              <div>
                <p className="eyebrow !text-ag-green mb-1">Use (loading state)</p>
                <p className="text-sm font-medium text-ag-text">Reviewing your details&#8230;</p>
                <p className="numeric text-[10.5px] text-ag-muted/70 mt-1">U+2026 &mdash; one character, not three periods</p>
              </div>
              <div>
                <p className="eyebrow !text-ag-red mb-1">Avoid</p>
                <p className="text-sm text-ag-red/80 line-through decoration-ag-red/40">Reviewing your details...</p>
                <p className="text-xs text-ag-muted leading-snug mt-1">Three periods render at inconsistent spacing across fonts. The true ellipsis character is a single glyph.</p>
              </div>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr] gap-4 items-baseline">
              <p className="eyebrow text-ag-navy/80">Finalised copy</p>
              <div>
                <p className="eyebrow !text-ag-green mb-1">Use</p>
                <p className="text-sm font-medium text-ag-text">Your application is being reviewed. We will call within 2 working days.</p>
              </div>
              <div>
                <p className="eyebrow !text-ag-red mb-1">Avoid</p>
                <p className="text-sm text-ag-red/80 line-through decoration-ag-red/40">Your application is being reviewed&#8230;</p>
                <p className="text-xs text-ag-muted leading-snug mt-1">Ellipsis in finalised copy reads as unresolved or tentative. A complete sentence with a next step is always stronger.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 01.9-S4  ₦ + % spacing */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">&#x20A6; + % spacing</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Three forms,</span>{" "}
            <span className="bi-serif">no ambiguity</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            All three forms are correct in different contexts. The rules are simple: no space in numeric form; two words in spelled-out form.
          </p>
        </header>
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          <div className="divide-y divide-ag-border">
            {([
              {
                form: "Naira — numeric",
                specimen: "₦24,500,000",
                rule: "No space. ₦ glyph (U+20A6) immediately precedes the digits. Comma thousand separators always present.",
                context: "Calculator output, stat blocks, hero numerics, offer letter.",
              },
              {
                form: "Percentage — numeric",
                specimen: "6.5%",
                rule: "No space. Percent sign attaches directly to the final digit.",
                context: "Interest rate labels, LTV indicators, progress bars.",
              },
              {
                form: "Percentage — spelled out",
                specimen: "6.5 per cent",
                rule: "Spaced, two words. UK/Nigerian-banking register. \"Percent\" (one word, no space) is the American form.",
                context: "Prose descriptions, regulatory disclosures, body copy.",
              },
            ] as const).map((row) => (
              <div key={row.form} className="px-6 py-5 grid grid-cols-1 md:grid-cols-[10rem_8rem_1fr] gap-4 items-baseline">
                <p className="eyebrow text-ag-navy/80">{row.form}</p>
                <p className="numeric text-xl font-semibold text-ag-navy">{row.specimen}</p>
                <div>
                  <p className="text-xs text-ag-muted leading-relaxed">{row.rule}</p>
                  <p className="text-xs text-ag-muted/70 mt-1"><span className="font-medium text-ag-text">Where:</span> {row.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 01.9-S5  Sentence case vs. Title Case decision tree */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Case convention</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Sentence case</span>{" "}
            <span className="bi-serif">vs. Title Case</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            The rule is structural, not aesthetic. Chapter headings and section titles take Title Case because they act as navigation markers. Everything else is sentence case.
          </p>
        </header>
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          {/* Column header row */}
          <div className="px-6 py-3 border-b border-ag-border bg-ag-light hidden md:grid md:grid-cols-[10rem_1fr_1fr_1fr] gap-4">
            <p className="eyebrow text-ag-navy/60">Position</p>
            <p className="eyebrow text-ag-navy/60">Rule</p>
            <p className="eyebrow !text-ag-green">Correct</p>
            <p className="eyebrow !text-ag-red">Wrong</p>
          </div>
          <div className="divide-y divide-ag-border">
            {([
              {
                context: "Chapter heading",
                caseRule: "Title Case",
                specimen: "01.8  Vocabulary Terms",
                wrong: "01.8  VOCABULARY TERMS",
                wrongNote: "ALL CAPS destroys bi-script legibility — Yoruba and English characters run together without case-differentiation cues.",
                why: "Chapter and section headings act as navigation anchors &mdash; Title Case signals that this is a structural marker, not a sentence.",
              },
              {
                context: "Section title",
                caseRule: "Title Case",
                specimen: "Domain Glossary",
                wrong: "domain glossary",
                wrongNote: "All-lowercase flattens the navigation hierarchy — the reader cannot scan section anchors by eye.",
                why: "Same rule as chapter headings. Consistent with the bi-script rule: bi-sans word in Title Case, bi-serif word in Title Case.",
              },
              {
                context: "Body copy",
                caseRule: "Sentence case",
                specimen: "Based on a property value of ₦24,500,000, your indicative monthly repayment is ₦186,400.",
                wrong: "Based On A Property Value Of ₦24,500,000, Your Indicative Monthly Repayment Is ₦186,400.",
                wrongNote: "Title Case on body copy reads robotic — removes the second-person conversational warmth entirely.",
                why: "Sentences read as sentences. Sentence case reinforces the conversational, second-person register.",
              },
              {
                context: "Button label",
                caseRule: "Sentence case",
                specimen: "Calculate my mortgage",
                wrong: "Calculate My Mortgage",
                wrongNote: "Title Case on a button reads as a header, not an instruction. The CTA loses its verb-led imperative quality.",
                why: "CTAs are short sentences. Sentence case makes them read as a natural instruction, not a header.",
              },
              {
                context: "Form label",
                caseRule: "Sentence case",
                specimen: "Property value",
                wrong: "Property Value",
                wrongNote: "Title Case on a form label implies it is a section heading — creates ambiguity between structural and data labels.",
                why: "Form labels are noun phrases, not titles. Sentence case keeps them scannable and visually quiet.",
              },
            ] as const).map((row) => (
              <div key={row.context} className="px-6 py-5 grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr_1fr] gap-4 items-baseline">
                <p className="eyebrow text-ag-navy/80">{row.context}</p>
                <div>
                  <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted mb-1 md:hidden">Rule</p>
                  <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted">{row.caseRule}</p>
                  <p className="text-xs text-ag-muted leading-relaxed mt-1 hidden md:block" dangerouslySetInnerHTML={{ __html: row.why }} />
                </div>
                <div>
                  <p className="eyebrow !text-ag-green mb-1.5 md:hidden">Correct</p>
                  <p className="text-sm font-medium text-ag-navy">{row.specimen}</p>
                  <p className="text-xs text-ag-muted leading-relaxed mt-1 md:hidden" dangerouslySetInnerHTML={{ __html: row.why }} />
                </div>
                <div className="bg-ag-red/5 border border-ag-red/20 rounded px-3 py-2.5">
                  <p className="eyebrow !text-ag-red mb-1.5">Wrong</p>
                  <p className="text-sm font-medium text-ag-red/80 line-through decoration-ag-red/40">{row.wrong}</p>
                  <p className="text-xs text-ag-muted leading-relaxed mt-1.5">{row.wrongNote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 01.9-S6  Footnote convention */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Footnote convention</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Superscript numerics,</span>{" "}
            <span className="bi-serif">regulatory citations</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            Footnotes are for regulatory references, unverified claims, and numbers that require substantiation. Use the{" "}
            <code className="numeric text-xs bg-ag-light border border-ag-border rounded px-1 py-0.5">Footnote</code> and{" "}
            <code className="numeric text-xs bg-ag-light border border-ag-border rounded px-1 py-0.5">FootnoteList</code>{" "}
            primitives. Never roll bespoke superscripts.
          </p>
        </header>
        {/* Live demo: one paragraph with a footnote + the resolving FootnoteList */}
        <div className="bg-ag-white border border-ag-border rounded-lg overflow-hidden">
          <div className="px-6 py-3 border-b border-ag-border bg-ag-light flex items-center justify-between gap-4">
            <p className="eyebrow">Live example</p>
            <span className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/70">Footnote + FootnoteList primitives</span>
          </div>
          <div className="px-6 py-8">
            {/* The body paragraph with inline Footnote */}
            <p className="text-base text-ag-navy leading-relaxed max-w-2xl">
              AG Mortgage Bank Plc is licensed by the Central Bank of Nigeria as a Primary Mortgage Bank
              <Footnote n={1} id="grammar-footnote-demo" /> under the Mortgage Institutions Act, Cap M20, LFN 2004. All rates are indicative
              <Footnote n={2} id="grammar-footnote-demo" /> and subject to credit assessment.
            </p>
            {/* The resolving list */}
            <FootnoteList
              id="grammar-footnote-demo"
              label="Regulatory citations"
              items={[
                {
                  n: 1,
                  source: <>CBN Supervision register — Primary Mortgage Institutions. <a href="https://www.cbn.gov.ng/Supervision/Inst-PMI.html" target="_blank" rel="noreferrer" className="text-ag-navy underline underline-offset-2 hover:text-ag-gold transition-token">cbn.gov.ng/Supervision/Inst-PMI.html</a></>,
                },
                {
                  n: 2,
                  source: <>"Indicative" framing is mortgage-disclaimer convention per PRD §3.5.2. Rates are subject to assessment until the offer letter is issued.</>,
                },
              ]}
            />
          </div>
        </div>

        {/* Code snippet showing how to implement it */}
        <div className="mt-6">
          <CodeBlock
            label="Footnote usage — copy-pattern"
            code={`<p>
  AG Mortgage Bank Plc is licensed by the CBN
  <Footnote n={1} id="section-id" /> as a Primary Mortgage Bank.
</p>

<FootnoteList
  id="section-id"
  label="Regulatory citations"
  items={[
    {
      n: 1,
      source: "CBN Supervision register — Primary Mortgage Institutions.",
    },
  ]}
/>`}
          />
        </div>
      </div>

      <FootnoteList
        id="grammar"
        label="Typographic sources"
        items={[
          { n: 1, source: <>Em-dash with hair spaces ( &mdash; ) is AGMB house style per AGMB_COPY_LIBRARY.md §1. Hair space: U+200A. The COPY_LIBRARY build note on hero.h1 confirms: &ldquo;the em-dash is intentional (not a hyphen)&rdquo;.</> },
          { n: 2, source: <>Smart quotes: U+2018 / U+2019 (single) and U+201C / U+201D (double). Straight quotes U+0022 and U+0027 are reserved for HTML attribute values and code only.</> },
          { n: 3, source: <>True ellipsis U+2026. Used in loading states only. Finalised copy uses a complete sentence with a next step instead.</> },
        ]}
      />
    </Subsection>

    <Subsection
      id="foundations-mission"
      number="01.10"
      titleSans="Mission"
      titleSerif="& promise"
      description="The brand promise, the strategic pivot, and the four facts that substantiate them. Source: PRD §1.1 + §1.2."
    >
      {/* The brand promise — display register, navy on cream */}
      <figure className="bg-ag-cream border border-ag-border rounded-lg p-8 md:p-12">
        <p className="eyebrow mb-4">The brand promise</p>
        <blockquote className="bi-section text-ag-navy text-2xl md:text-4xl leading-tight tracking-tight max-w-3xl">
          <span className="bi-sans">The mortgage built around how </span>
          <span className="bi-serif">Nigerians</span>
          <span className="bi-sans"> actually buy </span>
          <span className="bi-serif">homes.</span>
        </blockquote>
        <figcaption className="text-xs text-ag-muted mt-4">PRD §1.2 — verbal brand promise.</figcaption>
      </figure>

      {/* Strategic position — the heritage / modern pivot */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-ag-white border border-ag-border rounded-lg p-6">
          <p className="eyebrow mb-3">Heritage-institutional</p>
          <p className="text-sm text-ag-text leading-relaxed">
            Reference set: HSBC, Chase, Lloyds Banking Group, Halifax, JPMorgan, Noble Bank, Bergos.
          </p>
          <p className="text-xs text-ag-muted leading-snug mt-3">
            Twenty years of regulated-PMI story. Older than the reader's last laptop.
          </p>
        </div>
        <div className="bg-ag-navy text-ag-cream border border-ag-navy rounded-lg p-6">
          <p className="eyebrow !text-ag-gold mb-3">The pivot</p>
          <p className="text-sm leading-relaxed">
            Heritage register, executed at the level of cinematic 3D + scroll-orchestrated motion + editorial typography.
          </p>
          <p className="text-xs text-ag-cream/70 leading-snug mt-3">
            Cooled into AGMB's navy + gold + cream palette. Awwwards-grade execution, regulator-grade voice.
          </p>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-6">
          <p className="eyebrow mb-3">Modern-institutional</p>
          <p className="text-sm text-ag-text leading-relaxed">
            Ceiling: Mercury × Noble Bank × Igloo Inc × the most ambitious Active Theory work.
          </p>
          <p className="text-xs text-ag-muted leading-snug mt-3">
            Not Habito, not Better.com, not Wise — those positions undermine the 20-year story.
          </p>
        </div>
      </div>

      {/* The four substantiating facts — each footnoted */}
      <div className="mt-12">
        <header className="mb-6">
          <p className="eyebrow mb-2">Substantiation</p>
          <h4 className="bi-label text-ag-navy text-lg md:text-xl">
            <span className="bi-sans">Four facts the </span>
            <span className="bi-serif">redesign</span>
            <span className="bi-sans"> makes impossible to miss</span>
          </h4>
          <p className="text-xs text-ag-muted mt-2 max-w-2xl leading-relaxed">
            From PRD §1.2 — the redesign must surface these in the first six seconds on any device.
          </p>
        </header>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "01", fact: "CBN-licensed since 2004",      sub: "20+ years as a regulated Primary Mortgage Bank.", ref: 1 },
            { n: "02", fact: "ISO 9001:2015 certified",      sub: "Quality management system audited and certified.", ref: 2 },
            { n: "03", fact: "M-REIF first-mover",           sub: "Among the earliest PMBs participating in M-REIF disbursement.", ref: 3 },
            { n: "04", fact: "₦2.8B disbursed · 97 families", sub: "FY past year, to Nigerian families across Lagos, Abuja, and beyond.", ref: 4 },
          ].map((row) => (
            <li key={row.n} className="bg-ag-white border border-ag-border rounded-lg p-5">
              <span className="numeric text-xs text-ag-gold">{row.n}</span>
              <p className="bi-label text-ag-navy text-base md:text-lg leading-tight mt-2">
                <span className="bi-sans">{row.fact}</span>
                <Footnote n={row.ref} id="mission" />
              </p>
              <p className="text-xs text-ag-muted leading-snug mt-2">{row.sub}</p>
            </li>
          ))}
        </ol>
      </div>

      <FootnoteList
        id="mission"
        label="Substantiation sources"
        items={[
          { n: 1, source: <>CBN Primary Mortgage Bank licence — original issue 2004. <em>TO VERIFY: licence number + issue date via Adewale (AGMB_SITE_AUDIT.md §11).</em></> },
          { n: 2, source: <>ISO 9001:2015 certification. <em>TO VERIFY: certificate number + issuing body + valid-through date via Adewale.</em></> },
          { n: 3, source: <>M-REIF participation. <em>TO VERIFY: cohort / wave + first disbursement date via Adewale; Stanbic IBTC publishes its M-REIF participation publicly as a benchmark.</em></> },
          { n: 4, source: <>AGMB internal disbursement ledger, FY past year. <em>TO VERIFY: exact disbursement total + family count + reporting period via Adewale; figures currently quoted as ₦2.8B / 97 families per PRD §1.2.</em></> },
        ]}
      />
    </Subsection>

    {/* ── 01.11 Decorative registers ─────────────────────────────── */}
    <Subsection
      id="foundations-decorative-registers"
      number="01.11"
      titleSans="Decorative"
      titleSerif="registers"
      description="Post v3 (2026-05-09): gold is decorative-only. No buttons, no CTAs, no primary interactive surfaces. Eight brand-aligned feather variants now exist across four surface families — including feather.atmospheric (embedded full-mode, canonical hero treatment). This subsection is the contributor reference — full implementation plan in AGMB_FEATHERS_PLAN.md."
    >

      {/* ── Gold demotion rule — lead paragraph ─────────────── */}
      <div className="bg-ag-navy-deep rounded-lg px-7 py-6 mb-10">
        <p className="eyebrow !text-ag-gold mb-3">Gold demotion rule &#xB7; v3 2026-05-09</p>
        <p className="text-sm text-ag-cream leading-relaxed max-w-2xl">
          Gold is now a <em>decorative signal only</em>. It may appear on hairlines,
          the sidebar active indicator, eyebrow labels, and the sanctioned
          registers below. It must not appear on any button, CTA, form surface,
          interactive control, or primary action indicator.
        </p>
      </div>

      {/* ── S1: Register comparison ───────────────────────────── */}
      <SpecimenGroup
        label="S1 &#xB7; Two registers &#x2014; side by side"
        count="2 registers"
        description="Contributors must be able to distinguish these in five seconds. Procedural is celebration-only. Photographic is surface-decoration-only. Never both in the same scroll viewport."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Procedural — GoldShader */}
          <div className="bg-ag-navy-deep rounded-lg overflow-hidden">
            <div className="flex flex-col items-center justify-center py-10 px-6">
              <GoldShader shape="tick" size={60} />
            </div>
            <div className="border-t border-ag-gold/20 px-6 py-4">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-gold mb-1">
                Procedural &#xB7; celebration register
              </p>
              <p className="text-xs text-ag-cream/70 leading-snug">
                Canvas 2D. 4-layer metallic bevel + gradient + catch + grain.
                Animated (gated by <code className="numeric text-[10px]">prefers-reduced-motion</code>).
                Sanctioned surface: SuccessScreen tick only.
              </p>
            </div>
          </div>

          {/* Photographic — GF07 */}
          <div className="bg-ag-navy-deep rounded-lg overflow-hidden">
            <div className="relative overflow-hidden" style={{ height: 160 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-07.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] mix-blend-multiply agmb-feather-tone"
                />
              </picture>
            </div>
            <div className="border-t border-ag-gold/20 px-6 py-4">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-gold mb-1">
                Photographic &#xB7; surface register
              </p>
              <p className="text-xs text-ag-cream/70 leading-snug">
                8K CGI macro, cropped and AVIF-optimised. Gold filaments on near-black
                ground. Multiply-blended into navy.deep. Static.
                Sanctioned: architectural moments only.
              </p>
            </div>
          </div>

        </div>
      </SpecimenGroup>

      {/* ── S2: Brand-aligned variant grid ───────────────────── */}
      {/*
        Source rotation rule (2026-05-09):
        No two consecutive tiles may share the same source asset.
        Rotate across GF 02, GF 04, GF 07.
        Order: T1=GF07 T2=GF04 T3=GF02 T4=GF07 T5=GF04 T6=GF02 T7=GF07 T8=GF04
        Anti-pattern: repeating the same source consecutively breaks
        visual rhythm — tiles read as duplicates, not variants.
      */}
      <SpecimenGroup
        label="S2 &#xB7; Brand-aligned variants &#x2014; full register"
        count="8 variants"
        description="All eight feather variants from the 2026-05-09 brand iteration. Each maps to a specific surface family via dot-notation token. Contributors pick by surface, not by aesthetics."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* feather.gold.muted — style 05 */}
          <article className="bg-ag-cream-warm rounded-lg overflow-hidden border border-ag-cream-deep">
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-07.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] mix-blend-multiply agmb-feather-tone--gold-muted"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-black/20 to-transparent">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-navy/80">CSS filter</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-navy tabular-nums mb-1">feather.gold.muted</p>
              <p className="text-xs text-ag-muted leading-snug mb-2">&#x2192; cream surfaces &#xB7; subtle accent</p>
              <code className="numeric text-[10px] bg-ag-cream-deep px-2 py-0.5 rounded text-ag-navy">.agmb-feather-tone--gold-muted</code>
            </div>
          </article>

          {/* feather.gold.standard — style 03 · source: GF 04 (rotation rule: tile 1=GF07, tile 2=GF04) */}
          <article className="bg-ag-cream-warm rounded-lg overflow-hidden border border-ag-cream-deep">
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-04.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-04.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] mix-blend-multiply agmb-feather-tone--gold-standard"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-black/20 to-transparent">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-navy/80">CSS filter &#xB7; default</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-navy tabular-nums mb-1">feather.gold.standard</p>
              <p className="text-xs text-ag-muted leading-snug mb-2">&#x2192; cream surfaces &#xB7; default decoration</p>
              <code className="numeric text-[10px] bg-ag-cream-deep px-2 py-0.5 rounded text-ag-navy">.agmb-feather-tone--gold-standard</code>
            </div>
          </article>

          {/* feather.gold.intense — style 04 · source: GF 02 (rotation rule: tile 3=GF02) */}
          <article className="bg-ag-cream-warm rounded-lg overflow-hidden border border-ag-cream-deep">
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-02.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-02.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] mix-blend-multiply agmb-feather-tone--gold-intense"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-black/20 to-transparent">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-navy/80">CSS filter</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-navy tabular-nums mb-1">feather.gold.intense</p>
              <p className="text-xs text-ag-muted leading-snug mb-2">&#x2192; cream surfaces &#xB7; celebration accent</p>
              <code className="numeric text-[10px] bg-ag-cream-deep px-2 py-0.5 rounded text-ag-navy">.agmb-feather-tone--gold-intense</code>
            </div>
          </article>

          {/* feather.dualblue.vivid — style 06 */}
          <article className="rounded-lg overflow-hidden border border-ag-navy-vivid/30" style={{ background: "var(--ag-navy-vivid)" }}>
            <div className="feather-wrap feather-wrap--dualblue-vivid relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-07.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] agmb-feather-tone--dualblue-vivid"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-ag-navy-deep/60 to-transparent z-10">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-cream/80">Filter + gradient &#xB7; NEW</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-cream-warm tabular-nums mb-1">feather.dualblue.vivid</p>
              <p className="text-xs text-ag-cream/60 leading-snug mb-2">&#x2192; navy.vivid surfaces &#xB7; primary action register</p>
              <code className="numeric text-[10px] bg-ag-navy/60 px-2 py-0.5 rounded text-ag-cream/80">.agmb-feather-tone--dualblue-vivid</code>
            </div>
          </article>

          {/* feather.dualblue.deep — style 07 · source: GF 04 (rotation rule: tile 5=GF04) */}
          <article className="rounded-lg overflow-hidden border border-ag-navy/40" style={{ background: "var(--ag-navy-deep)" }}>
            <div className="feather-wrap feather-wrap--dualblue-deep relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-04.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-04.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] agmb-feather-tone--dualblue-deep"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-ag-navy-deep/80 to-transparent z-10">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-cream/70">Filter + gradient &#xB7; NEW</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-cream-warm tabular-nums mb-1">feather.dualblue.deep</p>
              <p className="text-xs text-ag-cream/60 leading-snug mb-2">&#x2192; navy.deep surfaces &#xB7; cinematic surface register</p>
              <code className="numeric text-[10px] bg-ag-navy/60 px-2 py-0.5 rounded text-ag-cream/80">.agmb-feather-tone--dualblue-deep</code>
            </div>
          </article>

          {/* feather.inverse — style 02 */}
          <article className="rounded-lg overflow-hidden border border-ag-navy-vivid/30" style={{ background: "var(--ag-navy-vivid)" }}>
            <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-02.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-02.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[30%_50%] agmb-feather-tone--inverse"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-ag-navy-deep/60 to-transparent z-10">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-cream/80">Screen blend &#xB7; pattern</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-cream-warm tabular-nums mb-1">feather.inverse</p>
              <p className="text-xs text-ag-cream/60 leading-snug mb-2">&#x2192; navy.vivid + navy.deep &#xB7; pattern register</p>
              <code className="numeric text-[10px] bg-ag-navy/60 px-2 py-0.5 rounded text-ag-cream/80">.agmb-feather-tone--inverse</code>
            </div>
          </article>

          {/* feather.feedback.success — style 01 */}
          <article className="rounded-lg overflow-hidden border border-ag-green/30" style={{ background: "var(--ag-green)" }}>
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-07.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[55%_50%] agmb-feather-tone--feedback-success"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-ag-green-deep/60 to-transparent z-10">
                <p className="numeric text-[9px] uppercase tracking-[0.1em] text-ag-cream/80">Screen blend &#xB7; context-gated</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-cream-warm tabular-nums mb-1">feather.feedback.success</p>
              <p className="text-xs text-ag-cream/60 leading-snug mb-2">&#x2192; green feedback surfaces &#xB7; success register</p>
              <code className="numeric text-[10px] bg-ag-green-deep/60 px-2 py-0.5 rounded text-ag-cream/80">.agmb-feather-tone--feedback-success</code>
            </div>
          </article>

          {/* feather.atmospheric — embedded "full mode" · source: GF 04 (rotation rule: tile 8=GF04) */}
          <article className="rounded-lg overflow-hidden border border-ag-navy/40" style={{ background: "var(--ag-navy-deep)" }}>
            <div
              className="feather-wrap feather-wrap--atmospheric relative overflow-hidden"
              style={{
                height: 140,
                /* Pin bottom fade to navy.deep — override per placement */
                ["--feather-atmospheric-surface" as string]: "var(--ag-navy-deep)",
              }}
            >
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-04.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-04.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[50%_30%] agmb-feather-tone--atmospheric"
                />
              </picture>
            </div>
            <div className="px-4 py-3">
              <p className="numeric text-[10px] text-ag-cream-warm tabular-nums mb-1">feather.atmospheric</p>
              <p className="text-xs text-ag-cream/60 leading-snug mb-2">&#x2192; any dark surface &#xB7; embedded register &#xB7; canonical hero</p>
              <code className="numeric text-[10px] bg-ag-navy/60 px-2 py-0.5 rounded text-ag-cream/80">.agmb-feather-tone--atmospheric</code>
            </div>
          </article>

        </div>

        {/* Variant taxonomy legend */}
        <div className="mt-6 border border-ag-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ag-border bg-ag-light/30">
                <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Token</th>
                <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">CSS class</th>
                <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Technique</th>
                <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Surface map</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ag-border">
              {[
                { token: "feather.gold.muted",        cls: "--gold-muted",          technique: "CSS filter",                        surface: "cream &#xB7; subtle accent" },
                { token: "feather.gold.standard",     cls: "--gold-standard",       technique: "CSS filter (default)",              surface: "cream &#xB7; default decoration" },
                { token: "feather.gold.intense",      cls: "--gold-intense",        technique: "CSS filter",                        surface: "cream &#xB7; celebration accent" },
                { token: "feather.dualblue.vivid",    cls: "--dualblue-vivid",      technique: "Filter + gradient overlay",         surface: "navy.vivid &#xB7; primary action" },
                { token: "feather.dualblue.deep",     cls: "--dualblue-deep",       technique: "Filter + gradient overlay",         surface: "navy.deep &#xB7; cinematic" },
                { token: "feather.inverse",           cls: "--inverse",             technique: "Screen blend",                      surface: "navy.vivid + navy.deep &#xB7; pattern" },
                { token: "feather.feedback.success",  cls: "--feedback-success",    technique: "Screen blend",                      surface: "green &#xB7; success register" },
                { token: "feather.atmospheric",       cls: "--atmospheric",         technique: "backdrop-filter blur + gradient fade (bottom-up)", surface: "any dark &#xB7; embedded &#xB7; canonical hero" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-ag-light/30"}>
                  <td className="py-2.5 px-4 align-top">
                    <code className="numeric text-[10.5px] text-ag-navy">{row.token}</code>
                  </td>
                  <td className="py-2.5 px-4 align-top">
                    <code className="numeric text-[10.5px] text-ag-muted">.agmb-feather-tone{row.cls}</code>
                  </td>
                  <td className="py-2.5 px-4 text-xs text-ag-muted align-top" dangerouslySetInnerHTML={{ __html: row.technique }} />
                  <td className="py-2.5 px-4 text-xs text-ag-muted align-top" dangerouslySetInnerHTML={{ __html: row.surface }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpecimenGroup>

      {/* ── S3: Use-case mockups ──────────────────────────────── */}
      <SpecimenGroup
        label="S3 &#xB7; Use-case mockups &#x2014; where each register lives"
        count="3 contexts"
        description="These specimens show how variants deploy in context. They are NOT live production placements — implementation is in the website dev phase. Each specimen is a cropped image + blend treatment + caption."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* S3a — Hero right-panel · feather.atmospheric · source: GF 07
               --feather-atmospheric-fade-stop overridden to 15% because this
               tile demos hero-panel scale (~240px). Default 25% would produce
               a 60px solid band at this height — too heavy. 15% = 36px. */}
          <article className="rounded-lg overflow-hidden border border-ag-navy/40" style={{ background: "var(--ag-navy-deep)" }}>
            <div className="relative overflow-hidden" style={{ height: 240 }}>
              <div
                className="feather-wrap feather-wrap--atmospheric absolute inset-0"
                style={{
                  ["--feather-atmospheric-surface" as string]: "var(--ag-navy-deep)",
                  ["--feather-atmospheric-fade-stop" as string]: "15%",
                }}
              >
                <picture>
                  <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
                  <Image
                    src="/decorative/feathers/golden-feather-07.webp"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover object-[40%_50%] agmb-feather-tone--atmospheric"
                  />
                </picture>
              </div>
              <div className="absolute top-0 left-0 right-0 px-4 py-3 z-10">
                <p className="numeric text-[9.5px] uppercase tracking-[0.1em] text-ag-gold/80">
                  feather.atmospheric &#xB7; hero right-panel
                </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-gold mb-2">
                S3a &#xB7; Hero right-panel &#xB7; canonical
              </p>
              <p className="text-xs text-ag-cream/70 leading-snug">
                Use as: hero right-panel &#xB7; embedded into navy.deep &#xB7;
                top dissolves into infinity, bottom anchors to surface.
                Consumer override: <code className="numeric text-[10px]">--feather-atmospheric-surface: var(--ag-navy-deep)</code>.
              </p>
            </div>
          </article>

          {/* S3b — Section accent strip · gold.standard */}
          <article className="bg-ag-cream-warm rounded-lg overflow-hidden border border-ag-cream-deep">
            <div className="relative overflow-hidden" style={{ height: 120 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-04.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-04.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[50%_35%] mix-blend-multiply agmb-feather-tone--gold-standard"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-gradient-to-b from-ag-cream-warm/80 to-transparent">
                <p className="numeric text-[9.5px] uppercase tracking-[0.1em] text-ag-navy/70">
                  feather.gold.standard &#xB7; section strip
                </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-navy mb-2">
                S3b &#xB7; Section accent strip
              </p>
              <p className="text-xs text-ag-muted leading-snug">
                Supporting decorative register on cream ground. Gold.standard saturation reads
                warm but restrained &#x2014; right for regulatory section dividers and trust-pattern
                footer accents. Blend: multiply on cream surface.
              </p>
            </div>
          </article>

          {/* S3c — Inverse pattern panel · feather.inverse */}
          <article className="rounded-lg overflow-hidden border border-ag-navy-vivid/30" style={{ background: "var(--ag-navy-vivid)" }}>
            <div className="relative overflow-hidden" style={{ height: 240 }}>
              <picture>
                <source srcSet="/decorative/feathers/golden-feather-02.avif" type="image/avif" />
                <Image
                  src="/decorative/feathers/golden-feather-02.webp"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover object-[20%_80%] agmb-feather-tone--inverse"
                />
              </picture>
              <div className="absolute top-0 left-0 right-0 px-4 py-3 bg-gradient-to-b from-ag-navy-deep/60 to-transparent">
                <p className="numeric text-[9.5px] uppercase tracking-[0.1em] text-ag-cream/80">
                  feather.inverse &#xB7; non-gold pattern
                </p>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-cream-warm mb-2">
                S3c &#xB7; Inverse pattern panel
              </p>
              <p className="text-xs text-ag-cream/60 leading-snug">
                Non-gold register on navy.vivid. Feather works as a surface pattern without
                invoking the gold token &#x2014; opens feather usage to vivid surfaces that gold
                would conflict with. Corner placement at 240&#xD7;240 min.
              </p>
            </div>
          </article>

        </div>
      </SpecimenGroup>

      {/* ── S4: Anti-patterns ────────────────────────────────── */}
      <SpecimenGroup
        label="S4 &#xB7; Anti-patterns"
        count="9 rules"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              rule: "Tiling feathers",
              why: "Compositions are directional. They repeat badly and read as wallpaper, not institutional signal.",
            },
            {
              rule: "Feather + GoldShader within the same scroll viewport",
              why: "Overloads the gold register. One register per viewport — celebration OR surface, never both.",
            },
            {
              rule: "Body text on gold-on-gold without a scrim",
              why: "Gold-filament-on-black fails WCAG AA for small text. Always add a scrim or place text outside the image zone.",
            },
            {
              rule: "Feather as a CTA or button backdrop",
              why: "Violates the gold demotion rule. Gold is decorative-only post v3. Interactive surfaces must not carry the feather register.",
            },
            {
              rule: "Feather rendered below 280px wide on mobile",
              why: "At this scale the filament detail reads as a JPEG compression artifact. Remove below 280px or increase the container.",
            },
            {
              rule: "Saturating further with additional filter stacking",
              why: "Each variant class is already calibrated. Stacking additional saturate() will overrun the AGMB gold target and read gauche.",
            },
            {
              rule: "Mixing variants on the same surface",
              why: "Pick one feather register per composition. Two variants in the same panel creates register collision — the variants are mutually exclusive per surface.",
            },
            {
              rule: "Using feather.feedback.success outside a feedback context",
              why: "Register collision. The green feather is context-gated to success/confirmation states. Decorating general surfaces with it breaks the feedback semantic.",
            },
            {
              rule: "Repeating the same source feather image consecutively in a grid",
              why: "Variants should rotate sources (GF 02, GF 04, GF 07) for visual rhythm. Consecutive tiles with the same source read as duplicates, not as distinct variants.",
            },
          ].map((item) => (
            <div
              key={item.rule}
              className="border-l-2 border-ag-red bg-ag-red/5 px-4 py-4 rounded-r"
            >
              <p className="text-sm font-medium text-ag-text leading-snug mb-1">
                &#x2717; {item.rule}
              </p>
              <p className="text-xs text-ag-muted leading-snug">{item.why}</p>
            </div>
          ))}
        </div>
      </SpecimenGroup>

      {/* ── S5: QA gates ─────────────────────────────────────── */}
      <SpecimenGroup
        label="S5 &#xB7; QA gates &#x2014; contributor rules"
        count="10 rules"
      >
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ag-border">
                <th className="text-left py-2.5 pr-6 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium w-1/2">Rule</th>
                <th className="text-left py-2.5 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ag-border">
              {[
                { rule: "Maximum 1 photographic feather per page", detail: "Stripe-grade restraint. The register earns its weight through rarity." },
                { rule: "Maximum 1 GoldShader per page", detail: "Sanctioned surface: SuccessScreen tick. No other placement." },
                { rule: "Never both registers in same viewport", detail: "Stacking celebration + surface reads as visual noise, not institutional warmth." },
                { rule: "next/image required", detail: "Performance. Never raw <img>. Always sizes prop + loading=lazy (no priority except above-fold hero)." },
                { rule: "AVIF primary + WebP fallback", detail: "Use <picture> with source type=image/avif + Image src fallback. Assets in /public/decorative/feathers/." },
                { rule: "Reduced-motion: no animation", detail: "Feathers are static by nature. GoldShader animation gated by prefers-reduced-motion." },
                { rule: "Mobile minimum 280px width", detail: "Below 280px rendered width the filament detail reads as compression artifact. Remove or upsize the container." },
                { rule: "Use variant class, not .agmb-feather-tone directly", detail: "The legacy alias is preserved for compat but new placements must use the named variant (--gold-standard is the default equivalent)." },
                { rule: "Pick variant by surface family", detail: "gold-* for cream surfaces · dualblue-* for navy surfaces · inverse for non-gold navy · feedback for status states." },
                { rule: "Recolour pipeline locked", detail: "Contributors do not invent new variants. New surface families require design system review before a new variant class is added." },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-ag-light/40"}>
                  <td className="py-3 pr-6 text-ag-text leading-snug font-medium align-top">
                    {row.rule}
                  </td>
                  <td className="py-3 text-ag-muted leading-snug align-top">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpecimenGroup>

      {/* ── S6: Cross-link ───────────────────────────────────── */}
      <div className="border border-ag-border rounded-lg px-6 py-5 bg-surface-light-2">
        <p className="eyebrow mb-2">Implementation handoff</p>
        <p className="text-sm text-ag-muted leading-relaxed max-w-2xl">
          This subsection is the design-system register &#x2014; the canonical contributor reference
          for all eight sanctioned feather variants (eight added: feather.atmospheric, 2026-05-09). Full asset taxonomy (11 assets graded), all
          placement decisions (hero panel, bento tile, footer accent, testimonials, calculator strip),
          performance budgets, crop strategies, and blend-mode specifications live in{" "}
          <code className="numeric text-xs">AGMB_FEATHERS_PLAN.md</code> (838+ lines). That document
          is the implementation handoff for the website dev phase. Do not implement feathers on
          production pages without reading it first. Variant taxonomy added Phase 0 (2026-05-09).
        </p>
        <p className="text-xs text-ag-muted mt-4">
          Assets: <code className="numeric text-[11px]">/public/decorative/feathers/</code>
          &#xA0;&#x2014;&#xA0;3 assets, 113 KB total AVIF payload.
          Processing: sharp, 2026-05-09. Source: golden-feathers-backgrounds-pack-2026-03-27-01-32-29-utc/.
          Variant expansion: 2026-05-09.
        </p>
      </div>

    </Subsection>
  </ChapterSection>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 02 · Brand
// Logo system landed 2026-05-10 — vector files arrived, recoloured to
// match locked design tokens (--ag-navy #0A2540, --ag-gold #C8972A),
// wired through the <Logo /> primitive (28 in the system).
// ─────────────────────────────────────────────────────────────────────
export const Chapter02 = () => (
  <ChapterSection
    id="brand"
    number="02"
    titleSans="Brand"
    titleSerif=""
    intro="Wordmark, brand mark, and UI iconography. Six logo variants surfaced through the Logo primitive — three colourways each across the wordmark and brand mark."
  >
    {/* ── 02.1 Wordmark ────────────────────────────────────────────────
        Three colourways. Coloured wordmark is the default surface. Mono
        variants are for surfaces where the colour rendition can't be
        guaranteed (print, single-colour partner placements) or where the
        background already carries colour weight (dark hero, photography). */}
    <Subsection
      id="brand-wordmark"
      number="02.1"
      titleSans="Wordmark"
      titleSerif=""
      description="The full lockup — icon mark + AG MORTGAGE BANK PLC. Default to the coloured variant on light surfaces. Reach for mono variants only when the surface forces it."
    >
      {/* Colourway grid · 3 surface contexts × 3 wordmark variants */}
      <div className="grid grid-cols-1 gap-6">
        {/* Coloured · light surface (cream is the AGMB hero context) */}
        <div className="rounded-xl border border-ag-border bg-ag-cream p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <Logo variant="wordmark-coloured" height={64} />
          <p className="text-xs text-ag-muted numeric">wordmark-coloured · ag-cream surface · 64px</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mono-white · dark surface */}
          <div className="rounded-xl bg-ag-navy p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <Logo variant="wordmark-mono-white" height={56} />
            <p className="text-xs text-ag-cream/70 numeric">wordmark-mono-white · ag-navy · 56px</p>
          </div>
          {/* Mono-black · white surface (print + formal) */}
          <div className="rounded-xl border border-ag-border bg-ag-white p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <Logo variant="wordmark-mono-black" height={56} />
            <p className="text-xs text-ag-muted numeric">wordmark-mono-black · ag-white · 56px</p>
          </div>
        </div>
      </div>

      {/* Anatomy + clearspace + minimum-size · 3-column reference card */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-ag-border bg-ag-white p-6 flex flex-col gap-3">
          <p className="eyebrow">Aspect ratio</p>
          <p className="numeric text-2xl text-ag-navy">1850 × 523</p>
          <p className="text-xs text-ag-muted leading-relaxed">≈ 3.54:1 · always preserve. Width derives from height in the primitive — no override.</p>
        </div>
        <div className="rounded-xl border border-ag-border bg-ag-white p-6 flex flex-col gap-3">
          <p className="eyebrow">Clearspace</p>
          <p className="numeric text-2xl text-ag-navy">1× icon</p>
          <p className="text-xs text-ag-muted leading-relaxed">Maintain padding equal to the height of the icon mark on every side. No co-locked logos, no bordering text within clearspace.</p>
        </div>
        <div className="rounded-xl border border-ag-border bg-ag-white p-6 flex flex-col gap-3">
          <p className="eyebrow">Minimum height</p>
          <p className="numeric text-2xl text-ag-navy">32 px</p>
          <p className="text-xs text-ag-muted leading-relaxed">Below 32px the wordmark falls into sub-pixel territory and the secondary text legibility breaks. For tighter spaces, switch to the brand mark (02.2).</p>
        </div>
      </div>

      {/* Do / Don't pairs — anti-pattern register */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-ag-border bg-ag-cream-warm p-6 flex flex-col gap-3">
          <p className="eyebrow text-ag-green">Do</p>
          <ul className="text-sm text-ag-text leading-relaxed list-disc pl-4 space-y-1.5">
            <li>Use <code className="numeric text-xs">wordmark-coloured</code> on cream and white surfaces.</li>
            <li>Switch to <code className="numeric text-xs">wordmark-mono-white</code> on navy / photography / dark hero.</li>
            <li>Keep clearspace = 1× icon height on every side.</li>
            <li>Render at the wordmark's native aspect ratio — pass only the <code className="numeric text-xs">height</code> prop.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-ag-border bg-ag-cream p-6 flex flex-col gap-3">
          <p className="eyebrow text-ag-feedback-danger">Don't</p>
          <ul className="text-sm text-ag-text leading-relaxed list-disc pl-4 space-y-1.5">
            <li>Recolour the wordmark outside the 3 sanctioned variants — including using <code className="numeric text-xs">--ag-gold</code> as a fill substitute.</li>
            <li>Rotate, mirror, skew, or apply perspective transforms.</li>
            <li>Add drop-shadows, glows, outlines, or blend modes.</li>
            <li>Render below 32px height — switch to brand mark instead.</li>
            <li>Place over busy imagery without a scrim or solid layer.</li>
          </ul>
        </div>
      </div>

      {/* Paste-ready import */}
      <div className="mt-10">
        <CodeBlock
          label="Logo.tsx · wordmark"
          code={`import { Logo } from "@/components/Logo";

<Logo variant="wordmark-coloured" height={48} />
<Logo variant="wordmark-mono-white" height={48} />
<Logo variant="wordmark-mono-black" height={48} />`}
        />
      </div>
    </Subsection>

    {/* ── 02.2 Brand mark ──────────────────────────────────────────────
        Icon-only variant for compact contexts: favicon, social avatar, app
        icon, page tabs, navigation rail collapse states. Carries the brand
        without the AG MORTGAGE BANK PLC wordmark. */}
    <Subsection
      id="brand-mark"
      number="02.2"
      titleSans="Brand"
      titleSerif="mark"
      description="Icon-only variant. Use in compact contexts where the wordmark won't fit at minimum legibility — favicons, social avatars, navigation collapse states, mobile chrome."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coloured icon · cream surface */}
        <div className="rounded-xl border border-ag-border bg-ag-cream p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <Logo variant="icon-coloured" height={72} />
          <p className="text-xs text-ag-muted numeric">icon-coloured · 72px</p>
        </div>
        {/* Mono-white · navy surface */}
        <div className="rounded-xl bg-ag-navy p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <Logo variant="icon-mono-white" height={72} />
          <p className="text-xs text-ag-cream/70 numeric">icon-mono-white · 72px</p>
        </div>
        {/* Mono-black · white surface */}
        <div className="rounded-xl border border-ag-border bg-ag-white p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <Logo variant="icon-mono-black" height={72} />
          <p className="text-xs text-ag-muted numeric">icon-mono-black · 72px</p>
        </div>
      </div>

      {/* Use-case grid */}
      <div className="mt-10 rounded-xl border border-ag-border bg-ag-white p-6">
        <p className="eyebrow mb-4">Use cases</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo variant="icon-mono-black" height={32} />
            <p className="text-xs text-ag-muted text-center">Favicon · 32px</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-ag-navy w-16 h-16 flex items-center justify-center">
              <Logo variant="icon-mono-white" height={36} />
            </div>
            <p className="text-xs text-ag-muted text-center">Social avatar · 64px circle</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-lg bg-ag-cream border border-ag-border w-16 h-16 flex items-center justify-center">
              <Logo variant="icon-coloured" height={40} />
            </div>
            <p className="text-xs text-ag-muted text-center">App icon · 64px tile</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Logo variant="icon-coloured" height={24} />
            <p className="text-xs text-ag-muted text-center">Nav collapse · 24px</p>
          </div>
        </div>
      </div>

      {/* Minimum size note */}
      <div className="mt-6 rounded-xl border border-ag-border bg-ag-cream-warm p-5">
        <p className="text-sm text-ag-text leading-relaxed">
          <strong className="text-ag-navy">Minimum height: 24 px.</strong> Below this the inner counter-form of the icon collapses. For favicon use, 32px source is recommended even though the OS may render down to 16px.
        </p>
      </div>

      {/* Paste-ready import */}
      <div className="mt-8">
        <CodeBlock
          label="Logo.tsx · brand mark"
          code={`<Logo variant="icon-coloured" height={32} />
<Logo variant="icon-mono-white" height={32} />
<Logo variant="icon-mono-black" height={32} />`}
        />
      </div>
    </Subsection>

    {/* ── 02.3 Iconography ─────────────────────────────────────────────
        UI icon set — distinct from the brand mark above. Phosphor Regular
        is the working set; commissioned engraved icons planned for hero /
        product moments (PRD §4.7). Anchor id kept as `brand-iconography`
        so existing deep links continue to resolve. */}
    <Subsection
      id="brand-iconography"
      number="02.3"
      titleSans="Iconography"
      titleSerif=""
      description="UI icon set — Phosphor Regular at 1.5 stroke. Distinct from the brand mark above. Commissioned engraved icons planned for hero / product moments (PRD §4.7)."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { Icon: PhosphorHouse, label: "House" },
          { Icon: PhosphorCoin, label: "Coin" },
          { Icon: PhosphorShield, label: "Shield" },
          { Icon: PhosphorBuildings, label: "Buildings" },
          { Icon: PhosphorChat, label: "Chat" },
          { Icon: PhosphorCalculator, label: "Calculator" },
        ].map(({ Icon, label }) => (
          <div key={label} className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col items-center gap-3">
            <span className="text-ag-navy"><Icon size={32} /></span>
            <p className="text-xs text-ag-muted">{label}</p>
          </div>
        ))}
      </div>
    </Subsection>
  </ChapterSection>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 03 · Primitives — 27 components
// ─────────────────────────────────────────────────────────────────────

const STATES = ["default", "hover", "focus-visible", "active", "disabled", "loading", "error"] as const;

export const Chapter03 = () => (
  <ChapterSection
    id="primitives"
    number="03"
    titleSans="Primitives"
    titleSerif=""
    intro="Twenty-six primitives. Each defines anatomy, variants, the seven-state matrix where applicable, anti-patterns, and a paste-ready usage example."
  >
    {/* ── Button ─────────────────────────────────────────────────── */}
    <Specimen
      id="primitive-button"
      name="Button"
      summary="5 variants × 3 sizes × 7 states (shadcn-aligned post 2026-05-09 v3 gold demotion). 48px min-height. Primary consumes pair.cta.primary (navy.vivid + cream.warm) with shadcn opacity-modifier hover; tactile press via --tactile-active-y."
      storybookId="primitives-button--primary"
      anatomy={`┌──────────────────────────────────┐
│  [icon]  Calculate my mortgage   │   ← 48px h · 16px text · 6px radius
└──────────────────────────────────┘`}
      variants={
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary · navy.vivid</Button>
          <Button variant="secondary">Secondary outline</Button>
          <Button variant="ghost">Ghost link →</Button>
          <Button variant="destructive">Cancel application</Button>
        </div>
      }
      stateMatrix={
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STATES.map((s) => (
            <StateCell key={s} label={s}>
              <Button
                variant="primary"
                forceState={s === "hover" || s === "focus-visible" || s === "active" ? s : undefined}
                disabled={s === "disabled"}
                loading={s === "loading"}
                error={s === "error"}
              >
                Calculate
              </Button>
            </StateCell>
          ))}
        </div>
      }
      code={
        <CodeBlock
          label="Button · primary"
          code={`import { Button } from "@/components/Button";

<Button variant="primary" size="md" fullWidth>
  Apply for this mortgage
</Button>`}
        />
      }
      antiPattern={
        <p>
          No neon glow on hover. No <code className="numeric">scale-105</code> overshoot. Pure
          <code className="numeric"> #000 </code> never substitutes for <code className="numeric">--ag-text</code>.
        </p>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Calculate my mortgage</Button>
        <Button variant="secondary">Speak to an advisor</Button>
        <Button variant="ghost">Learn more →</Button>
        <Button variant="destructive">Cancel application</Button>
      </div>
    </Specimen>

    {/* ── FormField ──────────────────────────────────────────────── */}
    <Specimen
      id="primitive-formfield"
      name="FormField"
      summary="Generic label-above + input + helper + error slot. 48px height. Composable prefix/suffix slots used by MoneyInput."
      storybookId="primitives-formfield--default"
      anatomy={`Label *
┌──────────────────────────────┐
│ [prefix]  Adaeze Okafor      │ ← 48px · 1px border · 8px radius
└──────────────────────────────┘
Helper text in ag-muted.`}
      stateMatrix={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StateCell label="default"><FormField label="Full name" placeholder="Adaeze Okafor" className="w-56" /></StateCell>
          <StateCell label="hover"><FormField label="Full name" placeholder="Adaeze Okafor" forceState="hover" className="w-56" /></StateCell>
          <StateCell label="focus-visible"><FormField label="Full name" placeholder="Adaeze Okafor" forceState="focus-visible" className="w-56" /></StateCell>
          <StateCell label="active"><FormField label="Full name" defaultValue="Adaeze O" forceState="active" className="w-56" /></StateCell>
          <StateCell label="disabled"><FormField label="Full name" placeholder="Adaeze Okafor" disabled className="w-56" /></StateCell>
          <StateCell label="loading"><FormField label="BVN" defaultValue="12345678901" loading helper="Verifying with NIBSS…" className="w-56" /></StateCell>
          <StateCell label="error"><FormField label="BVN" defaultValue="123456" error="BVN must be 11 digits." inputMode="numeric" className="w-56" /></StateCell>
        </div>
      }
      code={
        <CodeBlock
          label="FormField · BVN"
          code={`<FormField
  label="BVN"
  placeholder="12345678901"
  inputMode="numeric"
  maxLength={11}
  helper="11-digit Bank Verification Number — credit assessment only."
  required
/>`}
        />
      }
      antiPattern={<p>Never placeholder-only labels (a11y). Don&rsquo;t hide the helper to recover space &mdash; trim the helper copy first.</p>}
    >
      <FormField
        label="Full name"
        placeholder="Adaeze Okafor"
        helper="As it appears on your government-issued ID."
        className="max-w-md"
      />
    </Specimen>

    {/* ── MoneyInput ─────────────────────────────────────────────── */}
    <Specimen
      id="primitive-moneyinput"
      name="MoneyInput"
      summary="Wise-derived. Currency-prefixed (₦), live-comma-formatted, paste-aware. Strips ₦, commas, whitespace on paste. Optional min/max clamp on blur."
      storybookId="primitives-moneyinput--default"
      anatomy={`Property value
┌──────────────────────────────┐
│ ₦  75,000,000                │ ← currency prefix · numeric tabular
└──────────────────────────────┘
Use commas for readability — we'll handle the rest.`}
      code={
        <CodeBlock
          label="MoneyInput · property value"
          code={`<MoneyInput
  label="Property value"
  defaultValue={75_000_000}
  min={PROPERTY_VALUE_MIN}
  max={PROPERTY_VALUE_MAX}
  helper="Use commas for readability — we'll handle the rest."
/>`}
        />
      }
    >
      <div className="flex flex-col gap-4 max-w-md">
        <MoneyInput
          label="Property value"
          defaultValue={75_000_000}
          helper="Use commas for readability — we'll handle the rest."
        />
        <MoneyInput
          label="Deposit"
          defaultValue={15_000_000}
          helper="Most mortgage products require ≥ 10%."
        />
      </div>
    </Specimen>

    {/* ── PercentInput ────────────────────────────────────────────── */}
    <Specimen
      id="primitive-percentinput"
      name="PercentInput"
      summary="Suffix-% sibling of MoneyInput. Tabular numerics, toFixed display coercion, optional ± stepper. Default step 0.05 for mortgage-rate granularity. Clamps to [min, max] on blur."
      storybookId="primitives-percent-input--default"
      anatomy={`Interest rate
┌──────────────────────────────┐
│  6.00                  %  −  +│ ← suffix % · tabular numeric · optional stepper
└──────────────────────────────┘
Typical NHF rate is 6%`}
      stateMatrixLabel="6-state matrix · PRD §4.4 · loading n/a"
      stateMatrix={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StateCell label="empty">
            <PercentInput label="Interest rate" placeholder="6.00" className="w-56" />
          </StateCell>
          <StateCell label="filled">
            <PercentInput label="Interest rate" defaultValue={6} helper="Typical NHF rate is 6%" className="w-56" />
          </StateCell>
          <StateCell label="focus-visible">
            <PercentInput label="Interest rate" defaultValue={6} forceState="focus-visible" className="w-56" />
          </StateCell>
          <StateCell label="hover">
            <PercentInput label="Interest rate" defaultValue={6} forceState="hover" className="w-56" />
          </StateCell>
          <StateCell label="error">
            <PercentInput
              label="Interest rate"
              defaultValue={75}
              error="Rate must be between 0% and 50%."
              className="w-56"
            />
          </StateCell>
          <StateCell label="disabled">
            <PercentInput
              label="Interest rate"
              defaultValue={6}
              helper="Set by mortgage type."
              disabled
              className="w-56"
            />
          </StateCell>
        </div>
      }
      variants={
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-1">
            <p className="numeric text-[10px] uppercase tracking-[0.08em] text-ag-muted/80">Without stepper</p>
            <PercentInput
              label="Interest rate"
              defaultValue={6}
              helper="Type or paste a value."
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="numeric text-[10px] uppercase tracking-[0.08em] text-ag-muted/80">With stepper (showStepper)</p>
            <PercentInput
              label="Interest rate"
              defaultValue={6}
              step={0.05}
              showStepper
              helper="Steps of 0.05% — standard mortgage-rate granularity."
            />
          </div>
        </div>
      }
      code={
        <CodeBlock
          label="PercentInput · interest rate"
          code={`<PercentInput
  label="Interest rate"
  value={rate}
  onValueChange={setRate}
  step={0.05}
  min={0}
  max={50}
  decimals={2}
  showStepper
  helper="Typical NHF rate is 6%"
/>`}
        />
      }
      antiPattern={
        <p>
          Never use <code className="numeric">FormField type="number"</code> for percent inputs — the
          native spinner is inaccessible and the glyph affordance is absent. Don&rsquo;t render a raw
          hex or inline style for the <code className="numeric">%</code> suffix; use
          <code className="numeric"> text-ag-muted</code> so focus-state colour-shift works via the{" "}
          <code className="numeric">group-focus-within</code> cascade.
        </p>
      }
    >
      <div className="flex flex-col gap-4 max-w-md">
        <PercentInput
          label="Interest rate"
          defaultValue={6}
          step={0.05}
          min={0}
          max={50}
          decimals={2}
          showStepper
          helper="Typical NHF rate is 6% per annum."
        />
        <PercentInput
          label="Commercial rate"
          defaultValue={18.5}
          step={0.25}
          min={0}
          max={50}
          decimals={2}
          helper="Prevailing market rate — subject to CBN guidelines."
        />
      </div>
    </Specimen>

    {/* ── ExpressiveMoneyDisplay ─────────────────────────────────── */}
    <Specimen
      id="primitive-expressivemoneydisplay"
      name="ExpressiveMoneyDisplay"
      summary="Hero-scale money output. Distinct visual register from MoneyInput. Animated counter (300ms · ease-out). Compact mode collapses ₦39,200,000 → ₦39.2M."
      storybookId="primitives-expressivemoneydisplay--default"
      variants={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ExpressiveMoneyDisplay value={485720} label="Monthly · M" trailing="/month" size="m" />
          <ExpressiveMoneyDisplay value={485720} label="Monthly · XL" trailing="/month" size="xl" />
          <div className="bg-ag-navy rounded p-5">
            <ExpressiveMoneyDisplay value={485720} label="Monthly · inverse" trailing="/month" inverse size="m" />
          </div>
        </div>
      }
      code={
        <CodeBlock
          label="Hero monthly repayment"
          code={`<ExpressiveMoneyDisplay
  value={485720}
  label="Estimated monthly repayment"
  trailing="/month · indicative"
  size="xl"
  ariaLive
/>`}
        />
      }
    >
      <ExpressiveMoneyDisplay
        value={485720}
        label="Estimated monthly repayment"
        trailing="/month · indicative · subject to assessment"
      />
    </Specimen>

    {/* ── LTVIndicator ───────────────────────────────────────────── */}
    <Specimen
      id="primitive-ltvindicator"
      name="LTVIndicator"
      summary="Loan-to-value pill. Bands: ≤80% safe (green), 80–90% caution (amber), >90% warning (red). Pairs with InlinePrompt or TextDisclaimer for the warning copy."
      storybookId="primitives-ltvindicator--default"
      variants={
        <div className="flex flex-col gap-4 max-w-md">
          <LTVIndicator value={72} message="Safe — most mortgage products accept this LTV." />
          <LTVIndicator value={85} message="Caution — additional deposit may strengthen your application." />
          <LTVIndicator value={94} message="Most mortgage products require LTV ≤ 90%." />
        </div>
      }
      code={
        <CodeBlock
          label="LTV pill · auto band"
          code={`<LTVIndicator
  value={ltvPercent}
  message="Most mortgage products require LTV ≤ 90%."
/>`}
        />
      }
    >
      <LTVIndicator value={72} message="Safe — most mortgage products accept this LTV." />
    </Specimen>

    {/* ── RepaymentSplitBar ──────────────────────────────────────── */}
    <Specimen
      id="primitive-repaymentsplitbar"
      name="RepaymentSplitBar"
      summary="Principal vs interest, one bar, two segments. Dual-blue composition (post 2026-05-09 v3): principal lifts to navy.vivid as the emphasis stop; interest sits on navy.deep. Mercury-grade restraint — no chart legend; totals render above. Tweens flex-basis on input change at motion.duration.base."
      storybookId="primitives-repaymentsplitbar--default"
      anatomy={`┌──────────────────────────────────────────────────────┐
│ [PRINCIPAL →]           [INTEREST →]                  │ ← above-bar annotations (segment < 35%)
│ ████████████████████████ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓             │ ← 12px height · radius.full
│          principal               interest             │ ← inline labels (both segments ≥ 35% only)
│                                                       │
│ narrow bar (< 240px): inline labels hide, legend below│
│ ■ Principal · ₦60.0M    ■ Interest · ₦39.2M           │
│                                                       │
│ empty / loading: shimmer skeleton (bg-ag-light base + │
│   ag-border gradient sweep · reduced-motion: static)  │
└──────────────────────────────────────────────────────┘`}
      variants={
        <div className="flex flex-col gap-4 max-w-xl">

          {/* ── Quick-reference swatch legend ─────────────────────── */}
          <div className="flex items-center gap-6 px-5 py-3 border-b border-ag-border">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-8 rounded-full bg-ag-navy-vivid flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-ag-muted text-xs tracking-wide uppercase">
                Principal &#8212; navy.vivid
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-8 rounded-full bg-ag-navy-deep flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-ag-muted text-xs tracking-wide uppercase">
                Interest &#8212; navy.deep
              </span>
            </div>
          </div>

          {/* DEFAULT ~60/40 — both labels inline */}
          <div className="px-5 py-3">
            <p className="eyebrow text-ag-muted mb-3">Default · ~60 / 40</p>
            <RepaymentSplitBar principal={60_000_000} totalInterest={39_200_000} />
          </div>

          {/* HEAVY INTEREST ~33/67 — principal label shifts above bar */}
          <div className="px-5 py-3">
            <p className="eyebrow text-ag-muted mb-3">Heavy interest · ~33 / 67</p>
            <RepaymentSplitBar principal={40_000_000} totalInterest={80_000_000} />
          </div>

          {/* MOSTLY PAID OFF ~83/17 — interest label shifts above bar */}
          <div className="px-5 py-3">
            <p className="eyebrow text-ag-muted mb-3">Mostly paid off · ~83 / 17</p>
            <RepaymentSplitBar principal={5_000_000} totalInterest={1_000_000} />
          </div>

          {/* INVERSE · NAV — canonical dark-surface composition.
              data-surface="dark" demonstrates FOUNDATION lane token
              --comp-text-muted-on-surface scoping. Fallback to
              ag-cream-warm for before the FOUNDATION lane lands. */}
          <div
            className="bg-ag-navy-deep px-5 py-4 rounded-card mx-5"
            data-surface="dark"
          >
            <p
              className="eyebrow mb-3"
              style={{
                color: "var(--comp-text-muted-on-surface, var(--ag-cream-warm))",
              }}
            >
              Inverse · nav
            </p>
            <RepaymentSplitBar principal={60_000_000} totalInterest={39_200_000} inverse />
          </div>

          {/* EMPTY · LOADING — shimmer skeleton */}
          <div className="px-5 py-3">
            <p className="eyebrow text-ag-muted mb-3">Empty · loading</p>
            <RepaymentSplitBar principal={0} totalInterest={0} />
          </div>
        </div>
      }
      code={
        <CodeBlock
          label="RepaymentSplitBar · §05 calculator"
          code={`<RepaymentSplitBar
  principal={computed.loanAmount}
  totalInterest={computed.totalInterest}
/>`}
        />
      }
      antiPattern={
        <p>
          No chart legend, no axis labels, no hover tooltip in v1. The bar is decorative; the
          absolute totals already render in the stat grid above it.
        </p>
      }
    >
      <RepaymentSplitBar principal={60_000_000} totalInterest={39_200_000} />
    </Specimen>

    {/* ── ListItem ───────────────────────────────────────────────── */}
    <Specimen
      id="primitive-listitem"
      name="ListItem"
      summary="One anatomy, seven interaction modes: button · checkbox · icon-button · navigation · no-action · radio · switch."
      storybookId="primitives-listitem--radio"
      variants={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ListItem variant="radio" title="NHF Mortgage Loan" helper="6.0%" selected />
          <ListItem variant="checkbox" title="I am NDPR-consenting" description="Process my data per the NDPR." selected />
          <ListItem variant="switch" title="Receive scenario updates" selected={false} />
          <ListItem variant="navigation" title="M-REIF Mortgage" description="First-mover product · 9.5%." helper="9.5%" />
          <ListItem variant="button" title="Save scenario" description="Store inputs locally." />
          <ListItem variant="no-action" title="Reference number" description="AGMB-2026-0048213" />
        </div>
      }
      stateMatrix={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
          <StateCell label="default"><ListItem variant="radio" title="NHF Mortgage" helper="6.0%" /></StateCell>
          <StateCell label="hover"><ListItem variant="radio" title="NHF Mortgage" helper="6.0%" forceState="hover" /></StateCell>
          <StateCell label="focus-visible"><ListItem variant="radio" title="NHF Mortgage" helper="6.0%" forceState="focus-visible" /></StateCell>
          <StateCell label="active (selected)"><ListItem variant="radio" title="NHF Mortgage" helper="6.0%" selected /></StateCell>
          <StateCell label="disabled"><ListItem variant="radio" title="Construction" helper="24%" disabled /></StateCell>
          <StateCell label="loading"><ListItem variant="radio" title="M-REIF" helper="9.5%" loading /></StateCell>
          <StateCell label="error"><ListItem variant="radio" title="M-REIF" description="Eligibility check failed." helper="9.5%" /></StateCell>
        </div>
      }
      code={
        <CodeBlock
          label="ListItem radio group · §05 calculator"
          code={`<div role="radiogroup" aria-label="Mortgage type">
  {MORTGAGE_TYPES.map((type) => (
    <ListItem
      key={type}
      variant="radio"
      name="mortgage-type"
      value={type}
      title={MORTGAGE_TYPE_LABEL[type]}
      helper={\`\${MORTGAGE_TYPE_RATE[type].toFixed(1)}%\`}
      selected={selected === type}
      onSelect={() => setSelected(type)}
    />
  ))}
</div>`}
        />
      }
    >
      <MortgageRadioGroup />
    </Specimen>

    {/* ── WizardProgress (bar + dots paired) ─────────────────────── */}
    <Specimen
      id="primitive-wizardprogress"
      name="WizardProgress"
      summary="Two paired primitives: WizardProgressBar (quantitative %) and WizardStepDots (qualitative anchored steps). Wise discipline — never used alone."
      storybookId="primitives-wizardprogress--default"
      code={
        <CodeBlock
          label="Bar + dots paired"
          code={`<WizardProgressBar value={0.6} label="60%" />
<WizardStepDots
  steps={[
    { id: "you",    label: "About you" },
    { id: "work",   label: "Employment" },
    { id: "prop",   label: "Property" },
    { id: "doc",    label: "Documents" },
    { id: "review", label: "Review" },
  ]}
  currentIndex={2}
/>`}
        />
      }
    >
      <div className="flex flex-col gap-8 max-w-xl">
        <WizardProgressBar value={0.6} label="60%" />
        <WizardStepDots
          steps={[
            { id: "you", label: "About you" },
            { id: "work", label: "Employment" },
            { id: "prop", label: "Property" },
            { id: "doc", label: "Documents" },
            { id: "review", label: "Review" },
          ]}
          currentIndex={2}
        />
      </div>
    </Specimen>

    {/* ── StatBlock ──────────────────────────────────────────────── */}
    <Specimen
      id="primitive-statblock"
      name="StatBlock"
      summary="Numeric XL + eyebrow + 2px gold top rule. The §03 stats counter (4-column grid on navy)."
      storybookId="primitives-statblock--default"
      variants={
        <div className="bg-ag-navy rounded-lg p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock value="₦2.8B" label="Disbursed · 12 mo" context="to 97 Nigerian families" inverse />
          <StatBlock value="20+" label="Years CBN-regulated" context="Since 2004" inverse />
          <StatBlock value="ISO" label="9001:2015 certified" context="Quality management" inverse />
          <StatBlock value="97" label="Families this year" context="Real outcomes" inverse />
        </div>
      }
      code={
        <CodeBlock
          label="StatBlock"
          code={`<StatBlock
  value="₦2.8B"
  label="DISBURSED · 12 MONTHS"
  context="to 97 Nigerian families"
  inverse
/>`}
        />
      }
    >
      <StatBlock value="₦2.8B" label="Disbursed · 12 months" context="to 97 Nigerian families" />
    </Specimen>

    {/* ── TrustBadge ─────────────────────────────────────────────── */}
    <Specimen
      id="primitive-trustbadge"
      name="TrustBadge"
      summary="White bg, 1px ag-border, logo + label inline, 120px min-width. Hero trust strip (4 in a row) and §07 logo strip."
      storybookId="primitives-trustbadge--default"
      variants={
        <div className="flex flex-wrap gap-3">
          <TrustBadge label="CBN Licensed" logo={<PhosphorShield size={20} />} />
          <TrustBadge label="ISO 9001:2015" logo={<PhosphorShield size={20} />} />
          <TrustBadge label="20+ Years" logo={<PhosphorBuildings size={20} />} />
          <div className="bg-ag-navy rounded p-3 inline-flex">
            <TrustBadge label="NDIC-insured" inverse logo={<PhosphorShield size={20} />} />
          </div>
        </div>
      }
      code={
        <CodeBlock
          label="TrustBadge · hero strip"
          code={`<div className="flex gap-3">
  <TrustBadge label="CBN Licensed" logo={<ShieldIcon />} />
  <TrustBadge label="ISO 9001:2015" />
  <TrustBadge label="20+ Years" />
  <TrustBadge label="NDIC-insured" />
</div>`}
        />
      }
    >
      <TrustBadge label="CBN Licensed PMI" logo={<PhosphorShield size={20} />} />
    </Specimen>

    {/* ── TextDisclaimer ─────────────────────────────────────────── */}
    <Specimen
      id="primitive-textdisclaimer"
      name="TextDisclaimer"
      summary="Regulatory-tone copy block. 12–13px, muted colour, optional gold left rule. Used in calculator indicative-rate notice + §11 footer."
      storybookId="primitives-textdisclaimer--default"
      variants={
        <div className="flex flex-col gap-4 max-w-2xl">
          <TextDisclaimer>Indicative rates only. Subject to credit assessment and CBN guidelines.</TextDisclaimer>
          <TextDisclaimer rule>Indicative rates only. Subject to credit assessment and CBN guidelines.</TextDisclaimer>
          <div className="bg-ag-navy rounded p-4">
            <TextDisclaimer inverse>AGMB is a CBN-licensed Primary Mortgage Institution. NDIC-insured deposits.</TextDisclaimer>
          </div>
        </div>
      }
    >
      <TextDisclaimer rule>
        Indicative rates only. Subject to credit assessment and CBN guidelines. Final rate confirmed in your offer letter.
      </TextDisclaimer>
    </Specimen>

    {/* ── TextFact ───────────────────────────────────────────────── */}
    <Specimen
      id="primitive-textfact"
      name="TextFact"
      summary="Eyebrow + headline-scale value (numeric Geist Mono OR italic Libre Baskerville) + context. Used in §07 HighlightTrust + §03 stats."
      storybookId="primitives-textfact--default"
      variants={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TextFact eyebrow="ESTABLISHED · CBN-REGULATED" value="₦2.8B" context="Disbursed in the past year." valueStyle="numeric" rule />
          <TextFact eyebrow="M-REIF FIRST-MOVER" value="97 Nigerian" context="families this year." valueStyle="serif" rule />
        </div>
      }
    >
      <TextFact eyebrow="DISBURSED · 12 MONTHS" value="₦2.8B" context="to 97 Nigerian families." rule />
    </Specimen>

    {/* ── InlinePrompt ───────────────────────────────────────────── */}
    <Specimen
      id="primitive-inlineprompt"
      name="InlinePrompt"
      summary="Within-form contextual help. info / warning / error / success. Sits in the form field's helper slot — dismissed by correcting the input."
      storybookId="primitives-inlineprompt--default"
      variants={
        <div className="flex flex-col gap-3 max-w-xl">
          <InlinePrompt intent="info">Most mortgage products require at least 10% deposit.</InlinePrompt>
          <InlinePrompt intent="warning">LTV above 80% — additional deposit may strengthen your application.</InlinePrompt>
          <InlinePrompt intent="error">BVN must be 11 digits.</InlinePrompt>
          <InlinePrompt intent="success">NHF eligibility verified.</InlinePrompt>
        </div>
      }
    >
      <InlinePrompt intent="info">Most mortgage products require at least 10% deposit.</InlinePrompt>
    </Specimen>

    {/* ── CriticalBanner ─────────────────────────────────────────── */}
    <Specimen
      id="primitive-criticalbanner"
      name="CriticalBanner"
      summary="Page-level critical state. Red left rule, dismissible. Used for enquiry submission failure, NDPR consent missing, network error, session-expired wizard."
      storybookId="primitives-criticalbanner--default"
      variants={
        <div className="flex flex-col gap-3 max-w-2xl">
          <CriticalBanner intent="error" title="Submission failed" action={<Button variant="secondary" size="sm">Retry</Button>}>
            We couldn&rsquo;t reach our servers. Try again or use the WhatsApp fallback.
          </CriticalBanner>
          <CriticalBanner intent="warning" title="Session expiring" onDismiss={() => {}}>
            Your wizard session expires in 2 minutes. Save now to keep your progress.
          </CriticalBanner>
        </div>
      }
    >
      <CriticalBanner intent="error" title="Submission failed">
        We couldn&rsquo;t reach our servers. Try again or use the WhatsApp fallback.
      </CriticalBanner>
    </Specimen>

    {/* ── Nudge ──────────────────────────────────────────────────── */}
    <Specimen
      id="primitive-nudge"
      name="Nudge"
      summary="Soft re-engagement prompt. Distinct from CriticalBanner — not an alert, you choose between actions. Wizard resume + calculator restore."
      storybookId="primitives-nudge--default"
    >
      <div className="max-w-xl">
        <Nudge
          title="Continue where you left off?"
          description="Step 3 of 5 — Property details."
          primaryAction={<Button variant="primary" size="sm">Resume</Button>}
          secondaryAction={<Button variant="ghost" size="sm">Start over</Button>}
        />
      </div>
    </Specimen>

    {/* ── EmptyState ─────────────────────────────────────────────── */}
    <Specimen
      id="primitive-emptystate"
      name="EmptyState"
      summary={<>Pre-interaction state. Verb-led prompt — never &ldquo;No results.&rdquo; Per PRD §3.5.4: &ldquo;Try a property value to see your numbers.&rdquo;</>}
      storybookId="primitives-emptystate--default"
    >
      <EmptyState
        title="Try a property value to see your numbers."
        description="Enter the asking price and we'll show your indicative monthly repayment, total interest, and LTV."
        action={<Button variant="primary" size="sm">Start with ₦75M</Button>}
      />
    </Specimen>

    {/* ── GoldShader ─────────────────────────────────────────────── */}
    <Specimen
      id="primitive-goldshader"
      name="GoldShader"
      summary="Procedural metallic-gold celebration glyph. Canvas 2D — multi-layer (bevel + 5-stop gradient + radial catch + grain), eased orbit. Sanctioned ONLY for SuccessScreen."
      storybookId="primitives-goldshader--default-tick"
      variants={
        <div className="flex flex-col gap-10">
          {/* Shape row — three variants at the canonical 56px size */}
          <div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/80 mb-4">Shapes · 56px</p>
            <div className="grid grid-cols-3 gap-4">
              <StateCell label="tick">
                <GoldShader shape="tick" size={56} />
              </StateCell>
              <StateCell label="ring">
                <GoldShader shape="ring" size={56} />
              </StateCell>
              <StateCell label="underline">
                <GoldShader shape="underline" size={56} />
              </StateCell>
            </div>
          </div>

          {/* Size matrix — tick at 32 / 56 / 96px */}
          <div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/80 mb-4">Tick · sizes</p>
            <div className="grid grid-cols-3 gap-4 items-end">
              <StateCell label="32px">
                <GoldShader shape="tick" size={32} />
              </StateCell>
              <StateCell label="56px (canonical)">
                <GoldShader shape="tick" size={56} />
              </StateCell>
              <StateCell label="96px">
                <GoldShader shape="tick" size={96} />
              </StateCell>
            </div>
          </div>

          {/* Ring + underline at full size matrix */}
          <div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/80 mb-4">Ring &amp; underline · sizes</p>
            <div className="grid grid-cols-3 gap-4 items-end">
              <StateCell label="ring · 32px">
                <GoldShader shape="ring" size={32} />
              </StateCell>
              <StateCell label="ring · 56px">
                <GoldShader shape="ring" size={56} />
              </StateCell>
              <StateCell label="ring · 96px">
                <GoldShader shape="ring" size={96} />
              </StateCell>
            </div>
            <div className="grid grid-cols-3 gap-4 items-end mt-6">
              <StateCell label="underline · 32px">
                <GoldShader shape="underline" size={32} />
              </StateCell>
              <StateCell label="underline · 56px">
                <GoldShader shape="underline" size={56} />
              </StateCell>
              <StateCell label="underline · 96px">
                <GoldShader shape="underline" size={96} />
              </StateCell>
            </div>
          </div>

          {/* Reduced-motion callout — animated default vs. forced static fallback. */}
          <div>
            <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted/80 mb-4">prefers-reduced-motion · honoured by default</p>
            <div className="grid grid-cols-2 gap-4">
              <StateCell label="motion · default">
                <GoldShader shape="tick" size={56} forceMotion />
              </StateCell>
              <StateCell label="reduce · static">
                <GoldShader shape="tick" size={56} forceReduce />
              </StateCell>
            </div>
            <p className="text-xs text-ag-muted leading-snug mt-3 max-w-[52ch]">
              When <code className="numeric">prefers-reduced-motion: reduce</code> is set,
              the orbit collapses to a single static paint at angle <code className="numeric">π/4</code> with the catch frozen mid-arc. No <code className="numeric">requestAnimationFrame</code> loop runs. WCAG 2.2 AA — animation is decorative; the heading carries the semantic meaning.
            </p>
          </div>
        </div>
      }
      code={
        <CodeBlock
          label="SuccessScreen.tsx"
          code={`import { GoldShader } from "@/components/GoldShader";

// Default celebration tick — 56px, animated, honours prefers-reduced-motion.
<GoldShader shape="tick" size={56} />

// Other shapes — sanctioned for SuccessScreen variants only.
<GoldShader shape="ring" size={96} />
<GoldShader shape="underline" size={56} />`}
        />
      }
      antiPattern={
        <>
          GoldShader is sanctioned <strong>only</strong> for the SuccessScreen celebration glyph.
          Do <strong>not</strong> use it as a button fill, hover state, divider, accent rule, or general decoration.
          The gold demotion (Adewale 2026-05-09 v3) stays in effect everywhere else — emphasis is dual-blue + navy.vivid, not gold.
        </>
      }
    >
      {/* Live default — canonical celebration tick at 56px */}
      <div className="flex flex-col items-center gap-3">
        <GoldShader shape="tick" size={56} />
        <p className="text-xs text-ag-muted">Animated · 4s orbit · eased apex catch</p>
      </div>
    </Specimen>

    {/* ── Summary ────────────────────────────────────────────────── */}
    <Specimen
      id="primitive-summary"
      name="Summary"
      summary="Read-only data summary grouped by previous wizard steps, with an Edit link per row that returns the user to that step."
      storybookId="primitives-summary--default"
    >
      <Summary
        groups={[
          {
            id: "you",
            title: "About you",
            rows: [
              { label: "Full name", value: "Adaeze Okafor" },
              { label: "Date of birth", value: "14 May 1992" },
              { label: "BVN", value: "12345678901", display: "••• 4321" },
            ],
          },
          {
            id: "work",
            title: "Employment",
            rows: [
              { label: "Status", value: "Salaried" },
              { label: "Employer", value: "Federal Civil Service Commission" },
              { label: "Net monthly", value: "₦950,000" },
            ],
          },
        ]}
        onEdit={() => {}}
      />
    </Specimen>

    {/* ── SuccessScreen ──────────────────────────────────────────── */}
    <Specimen
      id="primitive-successscreen"
      name="SuccessScreen"
      summary="Reference number + next steps + secondary actions. Replaces the wizard view on submit success."
      storybookId="primitives-successscreen--default"
    >
      <SuccessScreen
        compact
        title="Application received."
        reference="AGMB-2026-0048213"
        steps={[
          "A mortgage advisor will call within 2 working days.",
          "We'll email an offer letter once your application clears credit assessment.",
          "Sign the offer to lock the indicative rate.",
        ]}
        actions={
          <>
            <Button variant="primary" size="sm">Download PDF copy</Button>
            <Button variant="secondary" size="sm">Calculate another scenario</Button>
            <Button variant="ghost" size="sm">Return home</Button>
          </>
        }
      />
    </Specimen>

    {/* ── ProgressScreen ─────────────────────────────────────────── */}
    <Specimen
      id="primitive-progressscreen"
      name="ProgressScreen"
      summary="Loading state during server-side validation between wizard steps. Shown only for network-bound transitions."
      storybookId="primitives-progressscreen--default"
    >
      <ProgressScreen
        compact
        step="Step 3 of 5"
        title="Verifying property value."
        description="This usually takes a moment — we're checking your inputs against current market data."
      />
    </Specimen>

    {/* ── StepCard ───────────────────────────────────────────────── */}
    <Specimen
      id="primitive-stepcard"
      name="StepCard"
      summary="Numbered (gold), bi-serif step title, sub-copy, hairline divider beneath. Used in §06 How It Works (4-step horizontal flow with sticky scroll-pan)."
      storybookId="primitives-stepcard--default"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StepCard number={1} active title="Apply in 5 minutes" description="Complete the short eligibility check. No documents required at this stage." />
        <StepCard number={2} title="Submit documents" description="Upload payslips, ID, and bank statements via the secure portal." />
        <StepCard number={3} title="Sign the offer" description="An advisor walks you through the offer letter and locks the indicative rate." />
      </div>
    </Specimen>

    {/* ── TestimonialQuote ───────────────────────────────────────── */}
    <Specimen
      id="primitive-testimonialquote"
      name="TestimonialQuote"
      summary="Libre Baskerville 36–48px on cream, no quotation-mark glyph. Gold vertical hairline as separator. First-name + last-initial only (NDPR-safe)."
      storybookId="primitives-testimonialquote--default"
    >
      <TestimonialQuote
        quote="They funded our home in eight weeks. Every disclosure was on the page — no surprises in the offer letter."
        attribution="Adaeze O."
        location="Lagos"
        product="NHF Mortgage"
      />
    </Specimen>

    {/* ── TestimonialCard ────────────────────────────────────────── */}
    <Specimen
      id="primitive-testimonialcard"
      name="TestimonialCard"
      summary="First-name + last-initial only, location, product, 1-sentence outcome, 64px circular crop. Used in §08 horizontal carousel."
      storybookId="primitives-testimonialcard--default"
    >
      <div className="flex flex-wrap gap-4">
        <TestimonialCard
          attribution="Tunde A."
          location="Abuja"
          product="M-REIF Mortgage"
          outcome="Closed at 9.5% over 20 years. Monthly repayment came in 4% under the calculator estimate."
        />
        <TestimonialCard
          attribution="Ngozi M."
          location="Port Harcourt"
          product="NHF Mortgage"
          outcome="First-time buyer. The wizard walked me through the eligibility check in one sitting."
        />
      </div>
    </Specimen>

    {/* ── NewsCard ───────────────────────────────────────────────── */}
    <Specimen
      id="primitive-newscard"
      name="NewsCard"
      summary="Featured (large, spans 2 rows) | standard (smaller). Thumbnail (4:3, duotone), date (gold), source (small-caps), bi-serif headline."
      storybookId="primitives-newscard--default"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsCard
          variant="featured"
          date="14 Apr 2026"
          source="BusinessDay"
          headline="AGMB joins the M-REIF first cohort."
          description="The Mortgage-backed Real Estate Investment Fund opens to retail buyers from Q3."
        />
        <NewsCard
          variant="standard"
          date="02 Mar 2026"
          source="Premium Times"
          headline="ISO 9001:2015 recertified."
          description="Annual audit closed without findings."
        />
      </div>
    </Specimen>

    {/* ── ProductBentoTile ───────────────────────────────────────── */}
    <Specimen
      id="primitive-productbentotile"
      name="ProductBentoTile"
      summary="hero (2/3 width image-bg) | mid (white, icon, link) | wide (full-width navy). Tier: flagship (5 mortgages) | secondary (6 savings)."
      storybookId="primitives-productbentotile--default"
      variants={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProductBentoTile
            variant="hero"
            tier="flagship"
            eyebrow="OUR FLAGSHIP PRODUCT"
            title="NHF Mortgage Loan"
            description="Federal scheme. 6% indicative rate over 30 years."
            ctaLabel="Learn more →"
            href="#"
            className="md:col-span-2"
          />
          <ProductBentoTile
            variant="mid"
            tier="flagship"
            icon={<PhosphorBuildings />}
            title="M-REIF Mortgage"
            description="First-mover. 9.5% over 20 years."
            href="#"
          />
          <ProductBentoTile
            variant="wide"
            tier="flagship"
            eyebrow="ADVISORY"
            title="Speak to a mortgage advisor."
            description="Free 30-min consultation."
            ctaLabel="Book a slot →"
            href="#"
            className="md:col-span-3"
          />
        </div>
      }
      antiPattern={<p>No scale-up beyond 1.005 on hover. No neon glow. Description copy stays at 1–2 lines max.</p>}
    >
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        icon={<PhosphorCoin />}
        eyebrow="Mortgage"
        title="M-REIF Mortgage"
        description="First-mover product. Indicative 9.5% over 20 years."
        href="#"
      />
    </Specimen>

    {/* ── ProductBentoTile · candidates ──────────────────────────── */}
    {/*
        Three side-by-side comparison panels for Adewale to choose from.
        Baseline (current) vs Direction A (Editorial) vs Direction B (Flat).
        Once a direction is selected the unchosen primitive file is deleted.
        Until then all three coexist as documentation candidates.
    */}
    <Specimen
      id="primitive-productbentotile-candidates"
      name="ProductBentoTile · candidates"
      summary="Three candidate directions for selection. Baseline = current. A = Editorial (magazine, serif italic). B = Swiss data tiles (flat, structured, financial-instrument)."
    >
      {/* Vertical stack of 3 panels. Each panel has: grid render + caption + pros/cons */}
      <div className="flex flex-col gap-10">

        {/* ── Panel 1 · Baseline ─────────────────────────────────── */}
        <div>
          <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted mb-1">Panel 1</p>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-4">
            Baseline &middot; just-restyled &middot; white mid + navy wide + cream hero &middot; gold-demotion clean
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ProductBentoTile
              variant="hero"
              tier="flagship"
              eyebrow="OUR FLAGSHIP PRODUCT"
              title="NHF Mortgage Loan"
              description="Federal scheme. 6% indicative rate over 30 years."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-2"
            />
            <ProductBentoTile
              variant="mid"
              tier="flagship"
              icon={<PhosphorBuildings />}
              eyebrow="Mortgage"
              title="M-REIF Mortgage"
              description="First-mover. 9.5% over 20 years."
              href="#"
            />
            <ProductBentoTile
              variant="wide"
              tier="flagship"
              eyebrow="ADVISORY"
              title="Speak to a mortgage advisor."
              description="Free 30-min consultation."
              ctaLabel="Book a slot &#x2192;"
              href="#"
              className="md:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Pros</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Balanced register &#x2014; neither cold nor sentimental; works for every product tier</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Icon slot earns its keep at 32px &#x2014; scannable mid-variant differentiation</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Wide-navy + cream-hero creates dual-blue contrast without drama</p>
            </div>
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Cons</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Mid variant reads closer to a SaaS dashboard card than a mortgage bank product</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;No visual differentiation between product tiers &#x2014; all mid tiles look equivalent</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Description copy under 30 chars before truncation risk on mobile narrow grids</p>
            </div>
          </div>
        </div>

        <div className="border-t border-ag-border" aria-hidden="true" />

        {/* ── Panel 2 · Editorial (Direction A) ──────────────────── */}
        <div>
          <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted mb-1">Panel 2 &middot; Direction A</p>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-4">
            Editorial &middot; photo-led &middot; magazine-grade &middot; slow read
          </p>
          {/* 7-col asymmetric grid: hero=col-span-4, mid pair stacked=col-span-3, wide=full */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
            <ProductBentoTileEditorial
              variant="hero"
              tier="flagship"
              eyebrow="Our flagship product"
              title="NHF Mortgage Loan"
              description="Federal scheme. 6% indicative rate over 30 years. Open to all Nigerian employees contributing to the National Housing Fund."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-4 md:row-span-2"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="First-mover product"
              title="M-REIF Mortgage"
              description="9.5% indicative over 20 years."
              href="#"
              className="md:col-span-3"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="Build from the ground up"
              title="Construction Finance"
              description="Staged disbursement. Competitive indicative rate."
              href="#"
              className="md:col-span-3"
            />
            <ProductBentoTileEditorial
              variant="wide"
              tier="flagship"
              eyebrow="Advisory service"
              title="Speak to a mortgage advisor &#x2014; free 30-minute consultation."
              description="We help you choose the right product before you apply."
              ctaLabel="Book a slot &#x2192;"
              href="#"
              className="md:col-span-7"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Pros</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Warmth scales with the brand &#x2014; cream-on-navy-deep is the most premium surface AGMB owns</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Serif italic earns the eyebrow &#x2014; the typographic micro-decision that signals editorial intent</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Whitespace breathes &#x2014; asymmetric 7-col grid lets the hero tile dominate without crowding</p>
            </div>
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Cons</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Less dense &#x2014; 4&#x2013;6 products fit comfortably; secondary savings tier needs a second grid block</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Photo-asset dependent &#x2014; no photography yet means the hero runs dark-gradient only until assets land</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Slow-read register may not serve a Calculator-led journey where the user wants data fast</p>
            </div>
          </div>
        </div>

        <div className="border-t border-ag-border" aria-hidden="true" />

        {/* ── Panel 3 · Swiss Flat (Direction B) ─────────────────── */}
        <div>
          <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted mb-1">Panel 3 &middot; Direction B</p>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-4">
            Swiss data &middot; flat &middot; structured &middot; financial-instrument register
          </p>
          {/* 4-col uniform grid: hero=col-span-2, mid x2=col-span-1 each, wide=full */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <ProductBentoTileFlat
              variant="hero"
              tier="flagship"
              icon={<PhosphorHouse size={20} />}
              eyebrow="NHF Mortgage"
              title="National Housing Fund Loan"
              href="#"
              ctaLabel="Details &#x2192;"
              className="col-span-2"
            />
            <ProductBentoTileFlat
              variant="mid"
              tier="flagship"
              eyebrow="M-REIF"
              title="M-REIF Mortgage"
              href="#"
              ctaLabel="Details &#x2192;"
            />
            <ProductBentoTileFlat
              variant="mid"
              tier="flagship"
              eyebrow="Construction"
              title="Construction Finance"
              href="#"
              ctaLabel="Details &#x2192;"
              dataRows={[
                { label: "Rate",      value: "Market rate" },
                { label: "Term",      value: "Up to 15 yrs" },
                { label: "Disbursem.", value: "Staged" },
              ]}
            />
            <ProductBentoTileFlat
              variant="wide"
              tier="flagship"
              eyebrow="Advisory"
              title="Mortgage Advisory"
              href="#"
              ctaLabel="Book &#x2192;"
              className="col-span-2 md:col-span-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Pros</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Dense &#x2014; 8+ products fit in a single grid block; secondary savings tier folds in without a layout shift</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;No decoration to maintain &#x2014; no photo assets, no feather assets, no serif italic — system is text-complete</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2713; &nbsp;Institutional / financial-instrument register is exactly where a CBN-licensed PMI should sit</p>
            </div>
            <div className="space-y-1">
              <p className="text-ag-muted text-xs font-semibold uppercase tracking-[0.07em] mb-2">Cons</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Cold without warmth controls &#x2014; cream-warm and navy.deep are the only warmth signals; loses brand softness</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;Numerics-heavy can overwhelm secondary buyers who need persuasion before data</p>
              <p className="text-ag-muted text-xs leading-snug">&#x2717; &nbsp;No editorial moment &#x2014; the brand story disappears; visually reads closer to Interswitch than AGMB</p>
            </div>
          </div>
        </div>

        <div className="border-t border-ag-border" aria-hidden="true" />

        {/* ── Selection guidance ─────────────────────────────────── */}
        <div className="space-y-4">
          <p className="bi-sans text-ag-navy font-semibold text-sm uppercase tracking-[0.07em]">Selection guidance</p>
          <p className="text-ag-text text-sm leading-relaxed max-w-2xl">
            Pick Direction A (Editorial) if AGMB is leaning brand-led &#x2014; the feather.atmospheric hero is already
            in the system and this direction extends it naturally into the product grid. Pick Direction B (Swiss flat)
            if AGMB is leaning financial-utility and density &#x2014; it pairs best with the Calculator pattern where
            the user is already in data mode. Pick the Baseline if you want the middle ground, which is where the
            system currently sits: structured enough for a PMI, warm enough not to feel like a terminal.
          </p>
          <div className="bg-ag-light rounded p-4 border border-ag-border">
            <p className="numeric text-[10px] uppercase tracking-[0.08em] text-ag-muted mb-2">Footer note</p>
            <p className="text-ag-muted text-xs leading-relaxed">
              Once selected, the unchosen direction&rsquo;s primitive file is deleted. The selected direction either
              replaces or amends <code className="numeric text-[11px] bg-ag-white border border-ag-border rounded px-1 py-px">ProductBentoTile</code>.
              Until selection, all three coexist as documentation candidates.
            </p>
          </div>
        </div>

      </div>
    </Specimen>

    {/* ── ProductBentoTile · alternatives (Bento pick-a-direction) ── */}
    {/*
        Full 5-product comparison. All three directions render the complete
        MORTGAGE_TYPES set (nhf / mreif / commercial / construction / rei + advisory)
        so Adewale can compare apples-to-apples at the real product count.
        Stacked vertically — each candidate takes full width for legibility.
        Once a direction is picked the losing files are deleted.
    */}
    <Specimen
      id="primitive-productbentotile-alternatives"
      name="Bento alternatives &middot; pick a direction"
      summary="Three complete 5-product bento grids for final selection. Current (baseline) · Editorial (A) · Swiss data (B). Each direction fully committed — neither A nor B is a compromise."
    >
      <div className="flex flex-col gap-12">

        {/* ── Pick-a-direction callout ────────────────────────────── */}
        <div className="bg-ag-light rounded-card border border-ag-border px-6 py-5">
          <p className="bi-sans text-ag-navy font-semibold text-sm uppercase tracking-[0.07em] mb-2">
            Pick a direction
          </p>
          <p className="text-ag-text text-sm leading-relaxed max-w-2xl">
            Review all three grids at full width. Choose the register that fits AGMB&rsquo;s voice at
            launch. The unchosen component files are removed on selection. Until then all three
            coexist as documentation candidates.
          </p>
        </div>

        {/* ── Current · Baseline ─────────────────────────────────── */}
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted">Current</p>
          </div>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-5">
            Baseline &middot; white mid + cream hero + navy wide &middot; gold-demotion clean
          </p>

          {/* 5 products: NHF (hero col-span-2) · M-REIF · Commercial · Construction · REI ·
              Advisory (wide col-span-3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ProductBentoTile
              variant="hero"
              tier="flagship"
              eyebrow="OUR FLAGSHIP PRODUCT"
              title="NHF Mortgage Loan"
              description="Federal scheme. 6% indicative rate over 30 years. Open to all Nigerian employees contributing to the National Housing Fund."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-2"
            />
            <ProductBentoTile
              variant="mid"
              tier="flagship"
              icon={<PhosphorBuildings />}
              eyebrow="MREIF"
              title="M-REIF Mortgage"
              description="First-mover product. 9.5% over 20 years."
              ctaLabel="Learn more &#x2192;"
              href="#"
            />
            <ProductBentoTile
              variant="mid"
              tier="flagship"
              icon={<PhosphorBuildings />}
              eyebrow="COMMERCIAL"
              title="Commercial Mortgage"
              description="Owner-occupied and investment properties."
              ctaLabel="Learn more &#x2192;"
              href="#"
            />
            <ProductBentoTile
              variant="mid"
              tier="flagship"
              icon={<PhosphorHouse />}
              eyebrow="CONSTRUCTION"
              title="Construction Finance"
              description="Staged disbursement. Competitive indicative rate."
              ctaLabel="Learn more &#x2192;"
              href="#"
            />
            <ProductBentoTile
              variant="mid"
              tier="flagship"
              icon={<PhosphorBuildings />}
              eyebrow="INVESTMENT"
              title="Real Estate Investment Finance"
              description="Acquisition and portfolio growth."
              ctaLabel="Learn more &#x2192;"
              href="#"
            />
            <ProductBentoTile
              variant="wide"
              tier="flagship"
              eyebrow="ADVISORY"
              title="Speak to a mortgage advisor."
              description="Free 30-minute consultation &mdash; we help you choose before you apply."
              ctaLabel="Book a slot &#x2192;"
              href="#"
              className="md:col-span-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-1 pt-1">
            <p className="md:col-span-5 text-ag-muted text-[10px] uppercase tracking-[0.08em] font-semibold mb-2">Register summary</p>
            <p className="text-ag-muted text-xs leading-snug">Navy + cream palette — balanced institutional warmth</p>
            <p className="text-ag-muted text-xs leading-snug">Icon slot at 32px — fast mid-tile differentiation</p>
            <p className="text-ag-muted text-xs leading-snug">Bi-serif in hero, sans in mid — two-voice hierarchy</p>
            <p className="text-ag-muted text-xs leading-snug">Navy wide row grounds the grid with authority</p>
            <p className="text-ag-muted text-xs leading-snug">Middle ground register — not data-terminal, not magazine</p>
          </div>
        </div>

        <div className="border-t border-ag-border" aria-hidden="true" />

        {/* ── Direction A · Editorial ─────────────────────────────── */}
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted">Direction A</p>
          </div>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-5">
            Editorial &middot; magazine-grade &middot; serif italic &middot; asymmetric Mondrian grid
          </p>

          {/* Asymmetric 7-col grid:
              hero = col-span-4 row-span-2  |  M-REIF = col-span-3
              Commercial = col-span-3       |  Construction = col-span-3  (pair stacks right of hero)
              REI = col-span-4              |  (smaller right panel)
              Advisory = col-span-7 wide */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-6">
            <ProductBentoTileEditorial
              variant="hero"
              tier="flagship"
              eyebrow="Our flagship product"
              title="NHF Mortgage Loan"
              description="Federal scheme. 6% indicative rate over 30 years. Open to all Nigerian employees contributing to the National Housing Fund."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-4 md:row-span-2"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="First-mover product"
              title="M-REIF Mortgage"
              description="9.5% indicative over 20 years."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-3"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="Owner-occupied &amp; investment"
              title="Commercial Mortgage"
              description="Indicative market rate. Up to 20 years."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-3"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="Build from the ground up"
              title="Construction Finance"
              description="Staged disbursement. Competitive indicative rate."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-3"
            />
            <ProductBentoTileEditorial
              variant="mid"
              tier="flagship"
              eyebrow="Portfolio growth"
              title="Real Estate Investment Finance"
              description="Acquisition and portfolio consolidation."
              ctaLabel="Learn more &#x2192;"
              href="#"
              className="md:col-span-4"
            />
            <ProductBentoTileEditorial
              variant="wide"
              tier="flagship"
              eyebrow="Advisory service"
              title="Speak to a mortgage advisor &mdash; free 30-minute consultation."
              description="We help you choose the right product before you apply."
              ctaLabel="Book a slot &#x2192;"
              href="#"
              className="md:col-span-7"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-1 pt-1">
            <p className="md:col-span-5 text-ag-muted text-[10px] uppercase tracking-[0.08em] font-semibold mb-2">Register summary</p>
            <p className="text-ag-muted text-xs leading-snug">Cream-warm surfaces &mdash; warmth is the context, not the accent</p>
            <p className="text-ag-muted text-xs leading-snug">Serif italic eyebrow &mdash; the single decision that signals editorial intent</p>
            <p className="text-ag-muted text-xs leading-snug">Asymmetric 7-col grid &mdash; Mondrian rhythm; hero tile dominates by proportion</p>
            <p className="text-ag-muted text-xs leading-snug">No icons &mdash; typography hierarchy does the differentiation work alone</p>
            <p className="text-ag-muted text-xs leading-snug">Gap-6 breathing room &mdash; generous whitespace reads as premium, not sparse</p>
          </div>
        </div>

        <div className="border-t border-ag-border" aria-hidden="true" />

        {/* ── Direction B · Swiss data ────────────────────────────── */}
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <p className="numeric text-[10px] uppercase tracking-[0.1em] text-ag-muted">Direction B</p>
          </div>
          <p className="bi-sans text-ag-navy font-semibold text-base mb-5">
            Swiss data &middot; flat &middot; hairline borders &middot; tabular metric callouts
          </p>

          {/* Hairline-divider grid: gap is 1px border via BentoGridSwiss wrapper.
              Hero col-span-2, mid × 4 col-span-1 each, wide col-span-3. */}
          <BentoGridSwiss className="mb-6">
            <ProductBentoTileSwiss
              variant="hero"
              tier="flagship"
              eyebrow="NHF MORTGAGE"
              title="National Housing Fund Loan"
              description="Federal scheme. CBN-regulated."
              dataRows={[
                { label: "Rate",      value: "6.0% p.a." },
                { label: "Term",      value: "Up to 30 yrs" },
                { label: "Max. loan", value: "&#x20A6;15,000,000" },
              ]}
              ctaLabel="Details &#x2192;"
              href="#"
              className="col-span-2"
            />
            <ProductBentoTileSwiss
              variant="mid"
              tier="flagship"
              eyebrow="M-REIF"
              title="M-REIF Mortgage"
              dataRows={[
                { label: "Rate",  value: "9.5% p.a." },
                { label: "Term",  value: "20 yrs max" },
              ]}
              ctaLabel="Details &#x2192;"
              href="#"
            />
            <ProductBentoTileSwiss
              variant="mid"
              tier="flagship"
              eyebrow="COMMERCIAL"
              title="Commercial Mortgage"
              dataRows={[
                { label: "Rate",  value: "22.0% p.a." },
                { label: "Term",  value: "20 yrs max" },
              ]}
              ctaLabel="Details &#x2192;"
              href="#"
            />
            <ProductBentoTileSwiss
              variant="mid"
              tier="flagship"
              eyebrow="CONSTRUCTION"
              title="Construction Finance"
              dataRows={[
                { label: "Rate",       value: "24.0% p.a." },
                { label: "Disbursem.", value: "Staged" },
              ]}
              ctaLabel="Details &#x2192;"
              href="#"
            />
            <ProductBentoTileSwiss
              variant="mid"
              tier="flagship"
              eyebrow="INVESTMENT"
              title="Real Estate Investment Finance"
              dataRows={[
                { label: "Rate", value: "22.0% p.a." },
                { label: "Use",  value: "Acquisition" },
              ]}
              ctaLabel="Details &#x2192;"
              href="#"
            />
            <ProductBentoTileSwiss
              variant="wide"
              tier="flagship"
              eyebrow="ADVISORY"
              title="Mortgage Advisory"
              description="Free 30-minute consultation."
              dataRows={[
                { label: "Duration",  value: "30 min" },
                { label: "Channel",   value: "In-person" },
                { label: "Booking",   value: "No fee" },
                { label: "Languages", value: "EN &middot; YO &middot; IG" },
              ]}
              ctaLabel="Book &#x2192;"
              href="#"
              className="col-span-3"
            />
          </BentoGridSwiss>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-1 pt-1">
            <p className="md:col-span-5 text-ag-muted text-[10px] uppercase tracking-[0.08em] font-semibold mb-2">Register summary</p>
            <p className="text-ag-muted text-xs leading-snug">White surfaces only &mdash; no warmth; clarity is the brand signal</p>
            <p className="text-ag-muted text-xs leading-snug">1px hairline gap-as-divider &mdash; grid structure without card chrome</p>
            <p className="text-ag-muted text-xs leading-snug">Tabular metric rows &mdash; rate / term / limit on every tile</p>
            <p className="text-ag-muted text-xs leading-snug">No images, no icons, no gold &mdash; text-complete system</p>
            <p className="text-ag-muted text-xs leading-snug">Hover shifts to ag-light &mdash; no lift; information density is the experience</p>
          </div>
        </div>

      </div>
    </Specimen>

    {/* ── HighlightTrust ─────────────────────────────────────────── */}
    <Specimen
      id="primitive-highlighttrust"
      name="HighlightTrust"
      summary="Composite primitive: logo strip + 2-column compliance copy + TextFact stats. Canonical primitive for §07 Trust & Regulatory."
      storybookId="primitives-highlighttrust--default"
    >
      <HighlightTrust
        eyebrow="TRUST"
        title={<><span className="bi-sans">Trusted </span><span className="bi-serif italic">by 97 Nigerian families this year.</span></>}
        badges={[
          { label: "CBN Licensed PMI", logo: <PhosphorShield size={18} /> },
          { label: "ISO 9001:2015" },
          { label: "NDIC-insured" },
          { label: "20+ Years" },
        ]}
        facts={[
          { eyebrow: "DISBURSED · 12 MONTHS", value: "₦2.8B", context: "to 97 Nigerian families." },
          { eyebrow: "M-REIF · FIRST-MOVER", value: "97 Nigerian", context: "families this year.", valueStyle: "serif" },
        ]}
        copy={
          <p>
            AGMB is a CBN-licensed Primary Mortgage Institution, ISO 9001:2015 certified for over a decade.
            Deposits are NDIC-insured. We do not share your BVN or NIN with third parties &mdash;
            credit assessment only.
          </p>
        }
      />
    </Specimen>

    {/* ── RegulatoryFooter ───────────────────────────────────────── */}
    <Specimen
      id="primitive-regulatoryfooter"
      name="RegulatoryFooter"
      summary="NDPR notice + CBN PMI disclosure + ISO + 4-column footer nav. Composes TextDisclaimer for the regulatory text rows."
      storybookId="primitives-regulatoryfooter--default"
    >
      <div className="-mx-6 -mb-6">
        <RegulatoryFooter
          logo={<p className="font-serif font-bold text-ag-cream text-2xl">AGMB</p>}
          contact={<p>9 Bankole Street, Victoria Island, Lagos<br />+234 1 234 5678 · hello@agmortgage.ng</p>}
          groups={[
            { title: "Products", links: [{ label: "NHF Mortgage", href: "#" }, { label: "M-REIF Mortgage", href: "#" }, { label: "Construction Finance", href: "#" }] },
            { title: "About", links: [{ label: "Our story", href: "#" }, { label: "Leadership", href: "#" }, { label: "Press", href: "#" }] },
            { title: "Resources", links: [{ label: "Calculator", href: "#" }, { label: "Eligibility", href: "#" }, { label: "FAQ", href: "#" }] },
            { title: "Legal", links: [{ label: "NDPR notice", href: "#" }, { label: "Disclosures", href: "#" }, { label: "Terms", href: "#" }] },
          ]}
          disclosures={[
            "AGMB is a CBN-licensed Primary Mortgage Institution. NDIC-insured deposits. ISO 9001:2015 certified.",
            "Indicative rates shown are subject to credit assessment and CBN guidelines. Final rate confirmed in your offer letter.",
            "We process your data per the Nigerian Data Protection Regulation (NDPR) 2019. Your BVN / NIN is used for credit assessment only and never shared with third parties.",
          ]}
        />
      </div>
    </Specimen>

    {/* ── ScrollProgressPath ────────────────────────────────────── */}
    <Specimen
      id="primitive-scrollprogresspath"
      name="ScrollProgressPath"
      summary="Fixed navy SVG vertical rail on the right edge of the /design page that draws as the reader descends, with 6 dots at chapter anchors that fill when each chapter enters the viewport. Rewired 2026-05-09 from deleted homepage IDs to design-system chapter IDs. GSAP + ScrollTrigger only — no Framer Motion. Honours prefers-reduced-motion: snaps to fully drawn, no scrub."
    >
      <div className="space-y-5">
        {/* Live note */}
        <div className="bg-ag-white border border-ag-border rounded-lg p-5 text-sm leading-relaxed">
          <p className="numeric text-[11px] uppercase tracking-[0.08em] font-semibold text-ag-navy mb-2">
            Live — mounted at page level
          </p>
          <p className="text-ag-muted">
            <code className="numeric text-[11px] text-ag-navy">ScrollProgressPath</code> is active on
            this page — look at the right edge of your viewport. Scroll through the six chapters to
            see the dots fill and the rail draw. On{" "}
            <code className="numeric text-[11px]">prefers-reduced-motion: reduce</code> the rail
            renders fully drawn at mount with no scrub animation.
          </p>
        </div>

        {/* Anatomy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-ag-light/50 border border-ag-border rounded-lg p-5 text-sm">
            <p className="numeric text-[10px] uppercase tracking-[0.08em] font-semibold text-ag-navy mb-3">Anatomy</p>
            <ul className="space-y-1.5 text-ag-text text-[13px] leading-snug">
              <li><code className="numeric text-[11px] text-ag-navy">div[aria-hidden]</code> — fixed container, right rail, hidden below <code className="numeric text-[11px]">md:</code></li>
              <li><code className="numeric text-[11px] text-ag-navy">svg line</code> — 1.5px navy stroke at 25% opacity, animated via <code className="numeric text-[11px]">strokeDashoffset</code></li>
              <li><code className="numeric text-[11px] text-ag-navy">ul &gt; li &gt; button</code> — 8px dot per chapter, keyboard navigable, <code className="numeric text-[11px]">aria-label</code> for screen readers</li>
              <li><code className="numeric text-[11px] text-ag-navy">span</code> — tooltip label, right-anchored, opacity transition on group-hover</li>
            </ul>
          </div>

          <div className="bg-ag-light/50 border border-ag-border rounded-lg p-5 text-sm">
            <p className="numeric text-[10px] uppercase tracking-[0.08em] font-semibold text-ag-navy mb-3">Chapter mapping</p>
            <ul className="space-y-1 text-ag-text text-[13px] leading-snug font-mono">
              <li><code className="numeric text-[11px]">#foundations</code> &rarr; 01 Foundations</li>
              <li><code className="numeric text-[11px]">#brand</code> &rarr; 02 Brand</li>
              <li><code className="numeric text-[11px]">#primitives</code> &rarr; 03 Primitives</li>
              <li><code className="numeric text-[11px]">#patterns</code> &rarr; 04 Patterns</li>
              <li><code className="numeric text-[11px]">#motion</code> &rarr; 05 Motion</li>
              <li><code className="numeric text-[11px]">#compositions</code> &rarr; 06 Compositions</li>
            </ul>
          </div>
        </div>

        {/* State matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] numeric border-collapse">
            <thead>
              <tr className="border-b border-ag-border">
                <th className="text-left py-2 pr-4 text-ag-muted font-semibold uppercase tracking-[0.06em] text-[10px]">State</th>
                <th className="text-left py-2 pr-4 text-ag-muted font-semibold uppercase tracking-[0.06em] text-[10px]">Dot fill</th>
                <th className="text-left py-2 pr-4 text-ag-muted font-semibold uppercase tracking-[0.06em] text-[10px]">Rail</th>
                <th className="text-left py-2 text-ag-muted font-semibold uppercase tracking-[0.06em] text-[10px]">Tooltip</th>
              </tr>
            </thead>
            <tbody className="text-ag-text divide-y divide-ag-border/50">
              <tr><td className="py-2 pr-4">Idle — chapter above viewport</td><td>Navy solid</td><td>Drawn to position</td><td>Hidden</td></tr>
              <tr><td className="py-2 pr-4">Idle — chapter below viewport</td><td>Transparent / outlined</td><td>Undrawn</td><td>Hidden</td></tr>
              <tr><td className="py-2 pr-4">Active chapter</td><td>Navy solid</td><td>Scrubs in real-time</td><td>Hidden</td></tr>
              <tr><td className="py-2 pr-4">Hover (pointer)</td><td>Unchanged</td><td>Unchanged</td><td>Visible, slides in</td></tr>
              <tr><td className="py-2 pr-4">Focus-visible (keyboard)</td><td>Navy ring</td><td>Unchanged</td><td>Visible</td></tr>
              <tr><td className="py-2 pr-4">prefers-reduced-motion</td><td>Navy solid (all)</td><td>Fully drawn at mount</td><td>Hidden</td></tr>
            </tbody>
          </table>
        </div>

        {/* Constraint notes */}
        <div className="bg-ag-light/40 border border-ag-border rounded-lg p-4 text-[12px] text-ag-muted leading-relaxed">
          <span className="numeric font-semibold text-ag-navy uppercase tracking-[0.06em] text-[10px] mr-2">Constraints</span>
          GSAP + ScrollTrigger only — never Framer Motion in this tree (PRD §4.3 isolation rule).
          Scrub triggers on <code className="numeric text-[10px]">document.documentElement</code> (not <code className="numeric text-[10px]">document.body</code>)
          to handle tall chapter heights correctly.
          Hidden below <code className="numeric text-[10px]">md:</code> breakpoint (<code className="numeric text-[10px]">768px</code>).
          Source: <code className="numeric text-[10px]">components/ScrollProgressPath.tsx</code>.
        </div>
      </div>
    </Specimen>
  </ChapterSection>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 04 · Patterns
// Composition skeletons — 2026-05-09 PM scope pivot.
// The 11 marketing sections are removed; Calculator + Wizard are now
// pattern documentation, not deployed page sections.
// ─────────────────────────────────────────────────────────────────────
export const Chapter04 = () => (
  <ChapterSection
    id="patterns"
    number="04"
    titleSans="Patterns"
    titleSerif=""
    intro={
      <>
        Compositions showing how primitives assemble into real product moments.
        Each skeleton is live and interactive — primitives demonstrate their
        behaviour at doc-grade fidelity. Business logic is preserved but
        persistence, sharing, and cross-section scroll hand-offs are stripped.
        Read the skeleton source to see exactly which primitives compose
        each pattern and why.
      </>
    }
  >
    {/* ── 04.1 Calculator pattern ──────────────────────────────── */}
    <Subsection
      id="patterns-calculator"
      number="04.1"
      titleSans="Calculator"
      titleSerif="pattern"
      description={
        <>
          Indicative mortgage calculator. Two-column composition: navy input
          panel (left) &rarr; cream output panel (right). Live calculation via{" "}
          <code className="numeric text-[11px]">mortgage-calc.ts</code>. No
          submit step &mdash; every input change recomputes within a single
          animation frame.
        </>
      }
    >
      {/* Live skeleton render */}
      <CalculatorPattern />

      {/* Primitives consumed table */}
      <div className="mt-8 flex flex-col gap-3">
        <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted">
          Primitives consumed &middot; 9
        </p>
        <div className="border border-ag-border rounded-lg overflow-hidden">
          {[
            { primitive: "MoneyInput",              role: "Property value · deposit inputs" },
            { primitive: "Slider (native range)",   role: "Property · deposit · tenure" },
            { primitive: "ListItem (radio)",        role: "Mortgage type toggle group" },
            { primitive: "Button",                  role: "Apply CTA (data-surface dark) · ghost actions" },
            { primitive: "ExpressiveMoneyDisplay",  role: "Indicative monthly figure · totals grid" },
            { primitive: "RepaymentSplitBar",       role: "Principal vs interest breakdown" },
            { primitive: "LTVIndicator",            role: "LTV gauge" },
            { primitive: "InlinePrompt",            role: "Deposit > property warning · LTV band message" },
            { primitive: "TextDisclaimer",          role: "Regulatory subject-to-credit-assessment line" },
          ].map((row, i) => (
            <div
              key={row.primitive}
              className={`flex items-baseline justify-between gap-4 px-5 py-3${i > 0 ? " border-t border-ag-border" : ""}`}
            >
              <code className="numeric text-[12px] text-ag-navy shrink-0">{row.primitive}</code>
              <span className="text-sm text-ag-muted text-right">{row.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-ag-white border border-ag-border rounded-lg p-5">
          <p className="eyebrow mb-3 !text-ag-green">Use</p>
          <ul className="space-y-2 text-sm text-ag-text leading-relaxed">
            <li>&middot; Pair always on the dual-blue surface: navy input + cream output.</li>
            <li>&middot; Keep <code className="numeric text-[11px]">data-surface="dark"</code> on the indicative strip.</li>
            <li>&middot; Feed derived values from <code className="numeric text-[11px]">mortgage-calc.ts</code> &mdash; don&rsquo;t inline the formula.</li>
            <li>&middot; Always show the TextDisclaimer below the output column.</li>
          </ul>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-5">
          <p className="eyebrow mb-3 !text-ag-red">Avoid</p>
          <ul className="space-y-2 text-sm text-ag-text leading-relaxed">
            <li>&middot; Don&rsquo;t deploy as a production form without full business-logic review.</li>
            <li>&middot; Don&rsquo;t detach the output panel from the dual-blue surface treatment.</li>
            <li>&middot; Don&rsquo;t use gold for the Apply CTA &mdash; gold is decorative-only post 2026-05-09.</li>
            <li>&middot; Don&rsquo;t remove the InlinePrompt deposit guard &mdash; it prevents negative loan amounts.</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        className="mt-8"
        label="CalculatorPattern · import"
        code={`import { CalculatorPattern } from "@/components/patterns/CalculatorPattern";

// Drop into any /design specimen container
<CalculatorPattern />`}
      />
    </Subsection>

    {/* ── 04.2 Wizard pattern ───────────────────────────────────── */}
    <Subsection
      id="patterns-wizard"
      number="04.2"
      titleSans="Wizard"
      titleSerif="pattern"
      description={
        <>
          Multi-step application form. Three-step skeleton (About&nbsp;you &rarr;
          Finance &rarr; Review) exercising progress primitives, form fields,
          step transitions, validation feedback, and both terminal states.
          Production Wizard adds NHF eligibility logic, document upload, and
          5 steps &mdash; the skeleton exposes the composition without the
          full state machine.
        </>
      }
    >
      {/* Live skeleton render */}
      <WizardPattern />

      {/* Primitives consumed table */}
      <div className="mt-8 flex flex-col gap-3">
        <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted">
          Primitives consumed &middot; 10
        </p>
        <div className="border border-ag-border rounded-lg overflow-hidden">
          {[
            { primitive: "WizardProgressBar", role: "Step progress bar (0 &rarr; 1 fill)" },
            { primitive: "WizardStepDots",    role: "Step pagination dots with click-back" },
            { primitive: "StepCard",          role: "Step container card" },
            { primitive: "FormField",         role: "Per-step text / email / date inputs" },
            { primitive: "MoneyInput",        role: "Property value · deposit" },
            { primitive: "ListItem (radio)",  role: "Mortgage type selector" },
            { primitive: "Button",            role: "Next (primary) · Back (ghost)" },
            { primitive: "InlinePrompt",      role: "Validation feedback per field" },
            { primitive: "ProgressScreen",    role: "Submission terminal state" },
            { primitive: "SuccessScreen",     role: "Acceptance terminal (uses GoldShader internally)" },
          ].map((row, i) => (
            <div
              key={row.primitive}
              className={`flex items-baseline justify-between gap-4 px-5 py-3${i > 0 ? " border-t border-ag-border" : ""}`}
            >
              <code className="numeric text-[12px] text-ag-navy shrink-0">{row.primitive}</code>
              <span
                className="text-sm text-ag-muted text-right"
                dangerouslySetInnerHTML={{ __html: row.role }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-ag-white border border-ag-border rounded-lg p-5">
          <p className="eyebrow mb-3 !text-ag-green">Use</p>
          <ul className="space-y-2 text-sm text-ag-text leading-relaxed">
            <li>&middot; Validate step-by-step &mdash; surface errors on Next press, not on Submit.</li>
            <li>&middot; Keep WizardProgressBar + WizardStepDots together in a framed card above StepCard.</li>
            <li>&middot; Honour <code className="numeric text-[11px]">useReducedMotion</code> on the AnimatePresence step transitions.</li>
            <li>&middot; Show ProgressScreen during the async submission window, not a spinner inside a button.</li>
          </ul>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-5">
          <p className="eyebrow mb-3 !text-ag-red">Avoid</p>
          <ul className="space-y-2 text-sm text-ag-text leading-relaxed">
            <li>&middot; Don&rsquo;t add NHF eligibility logic without the full <code className="numeric text-[11px]">mortgage-eligibility.ts</code> integration.</li>
            <li>&middot; Don&rsquo;t allow forward step-jumping &mdash; dots only navigate back to validated steps.</li>
            <li>&middot; Don&rsquo;t skip the Review step &mdash; applicants must confirm data before submission.</li>
            <li>&middot; Don&rsquo;t omit TextDisclaimer on the finance step &mdash; required for CBN compliance register.</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        className="mt-8"
        label="WizardPattern · import"
        code={`import { WizardPattern } from "@/components/patterns/WizardPattern";

// Drop into any /design specimen container
<WizardPattern />`}
      />
    </Subsection>
  </ChapterSection>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 05 · Motion &#x2014; interactive playgrounds
// Five subsections: Duration scale, Easing curves, Spring + tactile,
// Reduced-motion register, Anti-patterns.
// CSS-only or useState &#x2014; no GSAP / Framer at playground level.
// ─────────────────────────────────────────────────────────────────────

// DurationTile &#x2014; animates translateY + fade on Replay click
function DurationTile({
  token,
  durationMs,
  label,
  note,
}: {
  token: string;
  durationMs: number;
  label: string;
  note: string;
}) {
  const [tick, setTick] = React.useState(0);
  return (
    <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow mb-1" dangerouslySetInnerHTML={{ __html: label }} />
          <p className="text-xs text-ag-muted leading-snug max-w-[26ch]" dangerouslySetInnerHTML={{ __html: note }} />
        </div>
        <code className="numeric text-xs text-ag-navy-vivid shrink-0">{durationMs}ms</code>
      </div>
      <div className="h-14 flex items-end">
        <div
          key={tick}
          className="w-10 h-10 rounded bg-ag-navy-vivid ch05-dur-box"
          style={{ ["--ch05-dur" as string]: `${durationMs}ms` } as React.CSSProperties}
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center justify-between">
        <code className="numeric text-[10.5px] text-ag-muted">{token}</code>
        <button
          type="button"
          onClick={() => setTick((t) => t + 1)}
          className="text-xs text-ag-navy-vivid border border-ag-navy-vivid/30 rounded px-2.5 py-1 hover:bg-ag-navy-vivid/5 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy-vivid focus-visible:ring-offset-2"
          aria-label={`Replay ${durationMs}ms animation`}
        >
          Replay
        </button>
      </div>
    </div>
  );
}

// EasingTile &#x2014; slides a box 100px with the given cubic-bezier
function EasingTile({
  name,
  curve,
  description,
  svgPath,
}: {
  name: string;
  curve: string;
  description: string;
  svgPath: string;
}) {
  const [tick, setTick] = React.useState(0);
  return (
    <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
      <div className="border border-ag-border/60 rounded bg-ag-light/40 p-3">
        <svg viewBox="0 0 80 60" width="100%" height="60" aria-label={`${name} easing curve`} className="overflow-visible">
          <line x1="0" y1="60" x2="80" y2="60" stroke="var(--ag-border)" strokeWidth="0.5" />
          <line x1="0" y1="0"  x2="0"  y2="60" stroke="var(--ag-border)" strokeWidth="0.5" />
          <line x1="80" y1="0" x2="80" y2="60" stroke="var(--ag-border)" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d={svgPath} fill="none" stroke="var(--ag-navy-vivid)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="eyebrow mb-1">{name}</p>
        <p className="text-xs text-ag-muted leading-snug mb-2">{description}</p>
        <code className="numeric text-[10px] text-ag-muted break-all">{curve}</code>
      </div>
      <div className="relative h-8 bg-ag-light/50 rounded overflow-hidden">
        <div
          key={tick}
          className="absolute left-0 top-0 w-8 h-8 rounded bg-ag-navy ch05-ease-box"
          style={{ ["--ch05-curve" as string]: curve } as React.CSSProperties}
          aria-hidden="true"
        />
      </div>
      <button
        type="button"
        onClick={() => setTick((t) => t + 1)}
        className="self-end text-xs text-ag-navy-vivid border border-ag-navy-vivid/30 rounded px-2.5 py-1 hover:bg-ag-navy-vivid/5 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy-vivid focus-visible:ring-offset-2"
        aria-label={`Replay ${name} easing`}
      >
        Replay
      </button>
    </div>
  );
}

// ReducedMotionDemo &#x2014; side-by-side full vs reduced
function ReducedMotionDemo() {
  const [simulateReduced, setSimulateReduced] = React.useState(false);
  const [tick, setTick] = React.useState(0);
  const handleToggle = () => { setSimulateReduced((r) => !r); setTick((t) => t + 1); };
  const handleReplay = () => setTick((t) => t + 1);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={handleToggle}
          className={`text-xs border rounded px-3 py-1.5 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy-vivid focus-visible:ring-offset-2 ${
            simulateReduced
              ? "bg-ag-navy text-ag-cream border-ag-navy"
              : "bg-ag-white text-ag-navy border-ag-border hover:border-ag-navy/40"
          }`}
          aria-pressed={simulateReduced}
        >
          {simulateReduced ? "Reduced motion: ON (simulated)" : "Simulate reduced-motion: OFF"}
        </button>
        <button
          type="button"
          onClick={handleReplay}
          className="text-xs text-ag-navy-vivid border border-ag-navy-vivid/30 rounded px-2.5 py-1.5 hover:bg-ag-navy-vivid/5 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy-vivid focus-visible:ring-offset-2"
        >
          Replay both
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
          <p className="eyebrow mb-1">Default register</p>
          <p className="text-xs text-ag-muted leading-snug">Full animation &#x2014; 300ms ease-default, translateY 20px &#x2192; 0 + opacity 0 &#x2192; 1.</p>
          <div className="h-12 flex items-end">
            <div
              key={tick}
              className={`w-10 h-10 rounded bg-ag-navy-vivid ${simulateReduced ? "" : "ch05-full-enter"}`}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
          <p className="eyebrow mb-1">Reduced-motion register</p>
          <p className="text-xs text-ag-muted leading-snug">Transform removed &#x2014; opacity only, instant settle. No spatial movement.</p>
          <div className="h-12 flex items-end">
            <div
              key={tick}
              className="w-10 h-10 rounded bg-ag-green ch05-reduced-opacity"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-ag-muted border-l-2 border-ag-navy-vivid pl-3 leading-relaxed">
        Every motion in AGMB respects <code className="numeric">prefers-reduced-motion: reduce</code>. Always.
      </p>
    </div>
  );
}

// CounterDemo &#x2014; ExpressiveMoneyDisplay interpolation demo
function CounterDemo() {
  const [v, setV] = React.useState<number | null>(485720);
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <ExpressiveMoneyDisplay value={v} size="m" />
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={() => setV(485720)}>&#x20A6;485,720</Button>
        <Button size="sm" variant="secondary" onClick={() => setV(720340)}>&#x20A6;720,340</Button>
        <Button size="sm" variant="ghost" onClick={() => setV(null)}>Clear</Button>
      </div>
    </div>
  );
}

export const Chapter05 = () => (
  <ChapterSection
    id="motion"
    number="05"
    titleSans="Motion"
    titleSerif=""
    intro="Duration, easing, spring physics, and reduced-motion &#x2014; AGMB&#x2019;s complete motion vocabulary. Every token is a single source of truth; no raw ms strings or inline cubic-bezier literals anywhere in the codebase."
  >

    {/* ── 05.1 Duration scale ───────────────────────────────────────── */}
    <Subsection
      id="motion-duration"
      number="05.1"
      titleSans="Duration"
      titleSerif="scale"
      description="Five durations covering every interaction tier from instant press feedback to full-page choreography. Each tile is a live playground &#x2014; hit Replay to run the animation once. Reduced-motion collapses all durations to 0.01ms."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <DurationTile
          token="--motion-duration-instant"
          durationMs={100}
          label="instant &#xB7; 100ms"
          note="Button active state, checkbox, switch. Reads as zero latency &#x2014; the system heard you."
        />
        <DurationTile
          token="--motion-duration-fast"
          durationMs={200}
          label="fast &#xB7; 200ms"
          note="Hover lift, tooltip appearance, badge update. Fast enough to feel native."
        />
        <DurationTile
          token="--motion-duration-base"
          durationMs={300}
          label="base &#xB7; 300ms"
          note="Default for most transitions &#x2014; ExpressiveMoneyDisplay, slider, LTV gauge."
        />
        <DurationTile
          token="--motion-duration-slow"
          durationMs={500}
          label="slow &#xB7; 500ms"
          note="Slide-overs, modal entrance, drawer expansion. Communicates weight."
        />
        <DurationTile
          token="--motion-duration-curtain"
          durationMs={1200}
          label="curtain &#xB7; 1200ms"
          note="Hero reveal, page entry choreography. Reserved &#x2014; once per scroll viewport."
        />
      </div>

      <div className="mt-8 border border-ag-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ag-border bg-ag-light/30">
              <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Token</th>
              <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Value</th>
              <th className="text-left py-2 px-4 text-xs uppercase tracking-[0.08em] text-ag-muted font-medium">Use case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ag-border">
            {[
              { token: "--motion-duration-instant", val: "100ms",  use: "Active press &#xB7; checkbox &#xB7; switch" },
              { token: "--motion-duration-fast",    val: "200ms",  use: "Hover states &#xB7; tooltip &#xB7; badge" },
              { token: "--motion-duration-base",    val: "300ms",  use: "Most transitions (default)" },
              { token: "--motion-duration-slow",    val: "500ms",  use: "Modal &#xB7; slide-over &#xB7; drawer" },
              { token: "--motion-duration-curtain", val: "1200ms", use: "Hero entrance &#xB7; once per viewport" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 !== 0 ? "bg-ag-light/20" : ""}>
                <td className="py-2.5 px-4"><code className="numeric text-[10.5px] text-ag-navy">{row.token}</code></td>
                <td className="py-2.5 px-4"><code className="numeric text-[10.5px] text-ag-navy-vivid">{row.val}</code></td>
                <td className="py-2.5 px-4 text-xs text-ag-muted" dangerouslySetInnerHTML={{ __html: row.use }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Subsection>

    {/* ── 05.2 Easing curves ───────────────────────────────────────── */}
    <Subsection
      id="motion-easing"
      number="05.2"
      titleSans="Easing"
      titleSerif="curves"
      description="Three production easings with SVG curve previews. x-axis is time (0 &#x2192; 1), y-axis is progress (0 &#x2192; 1). Hit Replay to run the box using the exact curve."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EasingTile
          name="ease.default"
          curve="cubic-bezier(0.16, 1, 0.3, 1)"
          description="Wide swing-out. Starts fast, decelerates smoothly. The primary AGMB curve &#x2014; Stripe and modern-institutional register."
          svgPath="M 0 60 C 12.8 60, 24 0, 80 0"
        />
        <EasingTile
          name="ease.out-soft"
          curve="cubic-bezier(0.4, 0, 0.2, 1)"
          description="Cushioned end, no initial snap. Material-style deceleration. Use for panels and list reveals."
          svgPath="M 0 60 C 32 60, 16 0, 80 0"
        />
        <EasingTile
          name="ease.spring-stiff"
          curve="cubic-bezier(0.34, 1.56, 0.64, 1)"
          description="Slight overshoot then settle. Tactile register. Use for confirmations, nudge arrivals, radio selection."
          svgPath="M 0 60 C 27.2 60, 51.2 -33.6, 80 0"
        />
      </div>
      <p className="mt-6 text-xs text-ag-muted leading-relaxed max-w-2xl">
        <code className="numeric">ease.spring-stiff</code> is a CSS cubic-bezier approximation of spring physics. For true spring behaviour use <code className="numeric">--spring-stiffness</code> + <code className="numeric">--spring-damping</code> via Framer Motion (&#x2192; 05.3).
      </p>
    </Subsection>

    {/* ── 05.3 Spring + tactile ────────────────────────────────────── */}
    <Subsection
      id="motion-spring"
      number="05.3"
      titleSans="Spring"
      titleSerif="+ tactile"
      description="Spring physics tokens consumed by Framer Motion, and the tactile press offset applied to all interactive controls."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
          <p className="eyebrow mb-1">Spring config</p>
          <p className="text-sm text-ag-muted leading-snug">
            Consumed as <code className="numeric text-xs">{"transition: { type: \"spring\", stiffness, damping }"}</code> in Framer Motion. Not a CSS easing &#x2014; a physics simulation. Values read from CSS custom properties at component mount.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="bg-ag-light/50 rounded p-4 flex flex-col gap-1">
              <p className="text-xs text-ag-muted uppercase tracking-[0.08em]">stiffness</p>
              <p className="numeric text-2xl text-ag-navy font-semibold">100</p>
              <code className="numeric text-[10px] text-ag-muted">--spring-stiffness</code>
            </div>
            <div className="bg-ag-light/50 rounded p-4 flex flex-col gap-1">
              <p className="text-xs text-ag-muted uppercase tracking-[0.08em]">damping</p>
              <p className="numeric text-2xl text-ag-navy font-semibold">20</p>
              <code className="numeric text-[10px] text-ag-muted">--spring-damping</code>
            </div>
          </div>
          <div className="mt-1 bg-ag-light/40 rounded p-3">
            <pre className="numeric text-[10.5px] text-ag-muted leading-relaxed whitespace-pre-wrap">{`// Framer Motion usage
transition={{
  type: "spring",
  stiffness: 100,  // --spring-stiffness
  damping:    20,  // --spring-damping
}}`}</pre>
          </div>
        </div>

        <div className="bg-ag-white border border-ag-border rounded-lg p-5 flex flex-col gap-4">
          <p className="eyebrow mb-1">Tactile press offset</p>
          <p className="text-sm text-ag-muted leading-snug">
            <code className="numeric text-xs">--tactile-active-y: -1px</code> &#x2014; applied on <code className="numeric text-xs">:active</code> to all interactive controls. The downward push simulates physical button depression without JS.
          </p>
          <div className="mt-2 flex gap-6 items-end flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-ag-muted">With tactile</p>
              <button
                type="button"
                className="ch05-tactile-btn bg-ag-navy text-ag-cream text-sm font-medium px-5 py-2.5 rounded cursor-pointer select-none"
                aria-label="Press to feel tactile offset"
              >
                Press me
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-ag-muted">No tactile</p>
              <button
                type="button"
                className="bg-ag-light border border-ag-border text-ag-text text-sm font-medium px-5 py-2.5 rounded cursor-pointer select-none"
                aria-label="No tactile offset baseline"
              >
                Baseline
              </button>
            </div>
          </div>
          <p className="text-xs text-ag-muted mt-auto">
            CSS only &#x2014; <code className="numeric">active:translate-y-[var(--tactile-active-y)]</code>
          </p>
        </div>
      </div>
    </Subsection>

    {/* ── 05.4 Reduced-motion register ─────────────────────────────── */}
    <Subsection
      id="motion-reduced"
      number="05.4"
      titleSans="Reduced-motion"
      titleSerif="register"
      description="AGMB treats reduced-motion as a default-equal register, not a fallback. The toggle below simulates the preference so you can compare both registers side by side without leaving this page."
    >
      <ReducedMotionDemo />
    </Subsection>

    {/* ── 05.5 Anti-patterns ───────────────────────────────────────── */}
    <Subsection
      id="motion-anti-patterns"
      number="05.5"
      titleSans="Anti-patterns"
      titleSerif=""
      description="Motion that ships without clearing these gates is a production blocker, not a style preference."
    >
      <div className="rounded-lg border border-ag-red/20 bg-ag-red/[0.03] p-6 flex flex-col gap-4">
        {[
          {
            rule: "Animations longer than 1200ms outside the curtain tier",
            note: "Reads as ceremony, not feedback. 1200ms is reserved for hero entrance only.",
          },
          {
            rule: "Spring overshoot above 1.6 on any axis",
            note: "Feels gimmicky. The AGMB register is confident-restrained, not bouncy.",
          },
          {
            rule: "Mixing GSAP + Framer Motion in the same component tree",
            note: "Two schedulers fighting &#x2014; frame-drop guaranteed. GSAP owns page scroll; Framer owns component UI.",
          },
          {
            rule: "Motion without a prefers-reduced-motion fallback",
            note: "Hard accessibility violation. Every animation must have a static or opacity-only reduced path.",
          },
          {
            rule: "Easing on opacity-only transitions",
            note: "Use linear or ease-out only. Swing-out easing on a fade reads as a stutter.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-ag-red text-sm mt-0.5 shrink-0 select-none" aria-hidden="true">&#x2717;</span>
            <div>
              <p className="text-sm text-ag-text font-medium leading-snug">{item.rule}</p>
              <p className="text-xs text-ag-muted leading-snug mt-0.5" dangerouslySetInnerHTML={{ __html: item.note }} />
            </div>
          </div>
        ))}
      </div>
    </Subsection>

    {/* Ch05 playground keyframes &#x2014; scoped names, won't collide */}
    <style>{`
      @keyframes ch05-dur-enter {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0);   }
      }
      .ch05-dur-box {
        opacity: 0;
        animation: ch05-dur-enter var(--ch05-dur, 300ms)
          var(--motion-ease-default, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .ch05-dur-box { animation-duration: 0.01ms !important; }
      }

      @keyframes ch05-ease-slide {
        0%   { transform: translateX(0);       opacity: 1; }
        65%  { transform: translateX(200px);   opacity: 1; }
        100% { transform: translateX(200px);   opacity: 0; }
      }
      .ch05-ease-box {
        animation: ch05-ease-slide 700ms var(--ch05-curve, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .ch05-ease-box { animation-duration: 0.01ms !important; }
      }

      @keyframes ch05-full-enter-kf {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      .ch05-full-enter {
        animation: ch05-full-enter-kf 300ms var(--motion-ease-default, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
      }

      @keyframes ch05-reduced-opacity-kf {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .ch05-reduced-opacity {
        animation: ch05-reduced-opacity-kf 150ms linear forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .ch05-full-enter, .ch05-reduced-opacity {
          animation-duration: 0.01ms !important;
        }
      }

      .ch05-tactile-btn:active {
        transform: translateY(var(--tactile-active-y, -1px));
      }
    `}</style>
  </ChapterSection>
);

// ─────────────────────────────────────────────────────────────────────
// Chapter 06 · Compositions
// Calculator + Wizard at polish-grade canonical context.
// No landing page composition &#x2014; constraint enforced.
// ─────────────────────────────────────────────────────────────────────
export const Chapter06 = () => (
  <ChapterSection
    id="compositions"
    number="06"
    titleSans="Compositions"
    titleSerif=""
    intro="Polish-grade renders of the Calculator and Wizard patterns in their canonical surfaces. This chapter is the production preview &#x2014; chapter 04 shows the deconstructed skeleton view."
  >

    {/* ── 06.1 Calculator composition ───────────────────────────────── */}
    <Subsection
      id="composition-calculator"
      number="06.1"
      titleSans="Calculator"
      titleSerif="composition"
      description={
        <>
          Calculator &#xB7; canonical composition &#xB7; navy.deep + atmospheric feather.{" "}
          <a href="#patterns-calculator" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">
            &#x2192; ch.04.1 deconstructed skeleton
          </a>
        </>
      }
    >
      {/* Composition surface: navy.deep + atmospheric feather backdrop */}
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ background: "var(--ag-navy-deep)" }}
        data-surface="dark"
      >
        {/* Atmospheric feather backdrop */}
        <div
          className="feather-wrap feather-wrap--atmospheric absolute inset-0"
          style={{
            ["--feather-atmospheric-surface" as string]: "var(--ag-navy-deep)",
            ["--feather-atmospheric-fade-stop" as string]: "15%",
          } as React.CSSProperties}
          aria-hidden="true"
        >
          <picture>
            <source srcSet="/decorative/feathers/golden-feather-07.avif" type="image/avif" />
            <Image
              src="/decorative/feathers/golden-feather-07.webp"
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 1023px) 100vw, 80vw"
              loading="lazy"
              className="object-cover object-[40%_50%] agmb-feather-tone--atmospheric"
            />
          </picture>
        </div>

        {/* Content layer */}
        <div className="relative z-10 py-16 md:py-24 px-6 md:px-10 lg:px-16 flex flex-col items-center gap-10">
          {/* Caption above */}
          <div className="text-center max-w-lg">
            <p className="numeric text-[10.5px] uppercase tracking-[0.1em] text-ag-gold mb-2">
              06.1 &#xB7; Calculator &#xB7; canonical composition
            </p>
            <p className="text-ag-cream/70 text-sm leading-relaxed">
              navy.deep surface &#xB7; atmospheric feather backdrop &#xB7; <code className="numeric text-xs">data-surface=&quot;dark&quot;</code> cascade
            </p>
          </div>

          {/* Live Calculator pattern */}
          <div className="w-full max-w-2xl">
            <CalculatorPattern />
          </div>

          {/* Primitives consumed &#x2014; caption below */}
          <div className="w-full max-w-2xl border border-ag-cream/10 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-ag-cream/10">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-cream/50">
                Primitives consumed &#xB7; 9
              </p>
            </div>
            <div className="divide-y divide-ag-cream/10">
              {[
                "MoneyInput",
                "PercentInput",
                "Button",
                "ExpressiveMoneyDisplay",
                "RepaymentSplitBar",
                "LTVIndicator",
                "InlinePrompt",
                "TextDisclaimer",
                "Footnote",
              ].map((p) => (
                <div key={p} className="px-5 py-2.5 flex items-center justify-between gap-4">
                  <code className="numeric text-[11px] text-ag-cream/80">{p}</code>
                  <a href={`#primitive-${p.toLowerCase()}`} className="text-[10.5px] text-ag-cream/40 hover:text-ag-cream/70 transition-token">
                    &#x2197; ch.03
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Subsection>

    {/* ── 06.2 Wizard composition ───────────────────────────────────── */}
    <Subsection
      id="composition-wizard"
      number="06.2"
      titleSans="Wizard"
      titleSerif="composition"
      description={
        <>
          Wizard &#xB7; canonical composition &#xB7; cream surface &#xB7; focus-first, no atmospheric.{" "}
          <a href="#patterns-wizard" className="text-ag-navy-vivid underline underline-offset-2 hover:text-ag-navy transition-token">
            &#x2192; ch.04.2 deconstructed skeleton
          </a>
        </>
      }
    >
      {/* Composition surface: cream &#x2014; the wizard wants focus, not ornament */}
      <div
        className="relative overflow-hidden rounded-xl bg-ag-cream"
        style={{ border: "1px solid var(--ag-cream-deep)" }}
      >
        <div className="py-16 md:py-24 px-6 md:px-10 lg:px-16 flex flex-col items-center gap-10">
          {/* Caption above */}
          <div className="text-center max-w-lg">
            <p className="numeric text-[10.5px] uppercase tracking-[0.1em] text-ag-muted mb-2">
              06.2 &#xB7; Wizard &#xB7; canonical composition
            </p>
            <p className="text-ag-muted text-sm leading-relaxed">
              cream surface &#xB7; no atmospheric decoration &#xB7; focus-first register
            </p>
          </div>

          {/* Live Wizard pattern */}
          <div className="w-full max-w-2xl">
            <WizardPattern />
          </div>

          {/* Primitives consumed &#x2014; caption below */}
          <div className="w-full max-w-2xl border border-ag-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-ag-border bg-ag-white/60">
              <p className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-muted">
                Primitives consumed &#xB7; 10
              </p>
            </div>
            <div className="divide-y divide-ag-border bg-ag-white/40">
              {[
                "WizardProgressBar",
                "WizardStepDots",
                "FormField",
                "MoneyInput",
                "ListItem",
                "Button",
                "InlinePrompt",
                "ProgressScreen",
                "SuccessScreen",
                "TextDisclaimer",
              ].map((p) => (
                <div key={p} className="px-5 py-2.5 flex items-center justify-between gap-4">
                  <code className="numeric text-[11px] text-ag-navy">{p}</code>
                  <a href={`#primitive-${p.toLowerCase()}`} className="text-[10.5px] text-ag-muted hover:text-ag-navy transition-token">
                    &#x2197; ch.03
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Subsection>

    {/* ── 06.3 Composition rules ───────────────────────────────────── */}
    <Subsection
      id="composition-rules"
      number="06.3"
      titleSans="Composition"
      titleSerif="rules"
      description="Editorial rules that govern how AGMB assembles primitives and patterns into surfaces. These are constraints, not guidelines."
    >
      <div className="flex flex-col gap-3">
        {[
          {
            rule: "One atmospheric feather per scroll viewport, max.",
            detail: "Two feathers within a single scroll height compound into visual noise. The atmospheric register is potent precisely because it&#x2019;s scarce.",
          },
          {
            rule: "Calculator and Wizard never share a viewport &#x2014; they are sequential, not parallel.",
            detail: "Both are cognitive-load tasks. Side-by-side placement forces the user to context-switch. Sequential presentation follows the AGMB application journey.",
          },
          {
            rule: "Surface choice anchors the composition: navy.deep for emphasis (Calculator), cream for focus (Wizard).",
            detail: "The Calculator delivers a number &#x2014; the dark surface amplifies its authority. The Wizard collects data &#x2014; the cream surface signals neutrality and reduces form anxiety.",
          },
          {
            rule: "Decoration earns its place &#x2014; never decorate the form fields themselves.",
            detail: "The atmospheric feather sits behind the Calculator, not inside it. Form inputs must be bare: border, label, value, error. Ornament on a field reads as distrust.",
          },
          {
            rule: "Composition is the assembly of pre-built primitives + patterns into a surface that holds them.",
            detail: "Don&#x2019;t invent new primitives at composition time &#x2014; back them into ch.03 Primitives first. Compositions are the last mile, not the design laboratory.",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start border-b border-ag-border pb-4 last:border-0 last:pb-0">
            <span className="numeric text-xs text-ag-gold mt-1 shrink-0 select-none">0{i + 1}</span>
            <div>
              <p className="text-sm text-ag-text font-medium leading-snug mb-1" dangerouslySetInnerHTML={{ __html: item.rule }} />
              <p className="text-xs text-ag-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
            </div>
          </div>
        ))}
      </div>
    </Subsection>

  </ChapterSection>
);
