import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// AGMB — Foundations / Typography
// Documents: type stack, type scale (PRD §4.1), and the three bi-script
// weight registers (typeguide.png). Word-level only (PRD §4.0) — never split
// a word across two faces.

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Three weight registers (mirrors typeguide.png) ─────────────
export const BiScriptRegisters: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl">
      <header className="flex flex-col gap-1.5">
        <p className="eyebrow">Bi-script · weight registers</p>
        <h2 className="bi-section text-ag-navy text-3xl tracking-tight">
          <span className="bi-sans">Three</span>{" "}
          <span className="bi-serif">registers, one pattern.</span>
        </h2>
        <p className="text-ag-muted text-sm">
          Same character-level bi-script, three weight pairs across the type scale.
          Wrapper class sets <code className="numeric">--bi-sans-weight</code> +{" "}
          <code className="numeric">--bi-serif-weight</code>; spans inherit.
        </p>
      </header>

      <article className="bg-ag-white border border-ag-border rounded-lg p-6">
        <div className="flex items-baseline justify-between mb-3">
          <p className="eyebrow">Display · 700 / 700</p>
          <code className="numeric text-xs text-ag-muted">.bi-display</code>
        </div>
        <p className="bi-display text-ag-navy text-6xl leading-none tracking-tight">
          <span className="bi-sans">Starting</span>{" "}<span className="bi-serif">today.</span>
        </p>
        <p className="mt-3 text-xs text-ag-muted">Hero H1, marketing display.</p>
      </article>

      <article className="bg-ag-white border border-ag-border rounded-lg p-6">
        <div className="flex items-baseline justify-between mb-3">
          <p className="eyebrow">Section · 600 / 500</p>
          <code className="numeric text-xs text-ag-muted">.bi-section</code>
        </div>
        <p className="bi-section text-ag-navy text-5xl leading-tight tracking-tight">
          <span className="bi-sans">Starting</span>{" "}<span className="bi-serif">today.</span>
        </p>
        <p className="mt-3 text-xs text-ag-muted">
          Major section titles — §03 stats, §04 products, §05 calculator, §06 how it works.
        </p>
      </article>

      <article className="bg-ag-white border border-ag-border rounded-lg p-6">
        <div className="flex items-baseline justify-between mb-3">
          <p className="eyebrow">Label · 500 / 400</p>
          <code className="numeric text-xs text-ag-muted">.bi-label (default)</code>
        </div>
        <p className="bi-label text-ag-navy text-3xl leading-tight tracking-tight">
          <span className="bi-sans">Starting</span>{" "}<span className="bi-serif">today.</span>
        </p>
        <p className="mt-3 text-xs text-ag-muted">
          Section eyebrow labels. Default register — `.bi-sans` / `.bi-serif` resolve
          here when no wrapper is set.
        </p>
      </article>
    </div>
  ),
};

// ── Word-level usage (PRD §4.0) ────────────────────────────────
export const WordLevelPattern: Story = {
  render: () => (
    <div className="flex flex-col gap-5 max-w-2xl">
      <p className="eyebrow">Word-level bi-script · PRD §4.0</p>
      <p className="bi-section text-ag-navy text-4xl leading-tight tracking-tight">
        <span className="bi-sans">Why</span> <span className="bi-serif italic">AG Mortgage Bank</span>
      </p>
      <p className="bi-section text-ag-navy text-4xl leading-tight tracking-tight">
        <span className="bi-sans">Our</span> <span className="bi-serif">Mortgages</span>
      </p>
      <p className="bi-section text-ag-navy text-4xl leading-tight tracking-tight">
        <span className="bi-sans">Calculate</span> <span className="bi-serif">your repayment</span>
      </p>
      <p className="bi-section text-ag-navy text-4xl leading-tight tracking-tight">
        <span className="bi-sans">Trusted</span> <span className="bi-serif">by Nigerian families</span>
      </p>
    </div>
  ),
};

// ── Character-level usage (Adewale 2026-05-08) ─────────────────
export const CharacterLevelPattern: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl">
      <p className="eyebrow">Character-level bi-script · hero H1 only</p>
      <p className="bi-display text-ag-navy text-7xl leading-none tracking-tight">
        <span className="bi-sans">Starting</span>{" "}<span className="bi-serif">today.</span>
      </p>
      <p className="text-sm text-ag-muted">
        The most of-the-word reads sans, the trailing serif glyph + period anchors the heritage register.
        Reserved for the hero — applying it everywhere dilutes the impact.
      </p>
    </div>
  ),
};

// ── Type scale (PRD §4.1 desktop sizes) ────────────────────────
export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-5 max-w-3xl">
      <p className="eyebrow">Type scale · PRD §4.1 desktop</p>
      <div className="space-y-4">
        <p className="bi-display text-6xl leading-none text-ag-navy">Display · 64</p>
        <p className="bi-section text-5xl leading-tight text-ag-navy">H1 · 48</p>
        <p className="bi-section text-4xl leading-tight text-ag-navy">H2 · 36</p>
        <p className="bi-section text-2xl text-ag-navy font-bold">H3 · 24</p>
        <p className="text-xl text-ag-text font-semibold">H4 / Lead · 20</p>
        <p className="text-base text-ag-text">Body · 17 — Inter (Elms Sans pending)</p>
        <p className="text-sm text-ag-muted">Small · 14 — secondary text + helpers</p>
        <p className="eyebrow">Eyebrow · 11 / 0.08em / gold</p>
        <p className="numeric text-5xl text-ag-navy">₦485,720 — Numeric XL · 56</p>
      </div>
    </div>
  ),
};

// ── Type stack legend (mirrors bottom of typeguide.png) ────────
export const TypeStack: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <div className="border border-ag-border rounded-lg p-6 bg-ag-white">
        <p className="eyebrow mb-2">Display 1</p>
        <p className="bi-serif text-ag-navy text-3xl leading-tight mb-3">Libre Baskerville</p>
        <p className="text-xs text-ag-muted">400 / 400 italic / 700 · Pablo Impallari (SIL OFL)</p>
      </div>
      <div className="border border-ag-border rounded-lg p-6 bg-ag-white">
        <p className="eyebrow mb-2">Display 2</p>
        <p className="text-ag-navy text-3xl leading-tight mb-3 font-semibold">Elms Sans</p>
        <p className="text-xs text-ag-muted">Variable axis · Google Fonts (SIL OFL)</p>
      </div>
      <div className="border border-ag-border rounded-lg p-6 bg-ag-navy">
        <p className="eyebrow mb-2 text-ag-gold">Display 3</p>
        <p className="numeric text-ag-cream text-2xl leading-none mb-3">₦485,720</p>
        <p className="text-xs text-ag-cream/70">Geist Mono · variable · Vercel via Google Fonts</p>
      </div>
    </div>
  ),
};
