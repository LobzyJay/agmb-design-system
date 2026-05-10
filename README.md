<h1 align="center">AGMB Design System</h1>

<p align="center">
  <img src="public/brand/logo/agmb-wordmark-coloured.svg" alt="AG Mortgage Bank Plc" width="380" />
</p>

<p align="center">
  Token-driven, modern-institutional design system for <strong>AG Mortgage Bank Plc</strong> &mdash;
  a CBN-licensed Nigerian Primary Mortgage Institution.
  <br/>
  <em>28 primitives &middot; 24 canonical hexes &middot; 11 motion tokens &middot; bi-script typography</em>
</p>

<p align="center">
  <a href="#-quick-start">Quick start</a> &middot;
  <a href="#-architecture">Architecture</a> &middot;
  <a href="#-routes">Routes</a> &middot;
  <a href="#-locked-decisions">Locked decisions</a> &middot;
  <a href="#%EF%B8%8F-anti-pattern-register">Anti-patterns</a>
</p>

---

## What this is

A self-contained Next.js 16 app that documents and surfaces the AGMB design language. The deliverable is the design system &mdash; `/design` + `/tokens` + primitives &mdash; **not** the marketing website composition. Calculator and Wizard live as composition skeletons inside `/design § 04 Patterns`.

**Reference set:** ACI Worldwide, Stripe, Mercury (modern-institutional). Libre Baskerville italic preserves heritage gravitas at accent moments. Not Habito. Not Better.com. Not Wise.

---

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000> &mdash; the root redirects to `/design`.

### Heads-up before first run

If `npm run dev` ever balloons memory or fails with a Tailwind CSS parse error, see the [Known traps](#%EF%B8%8F-known-dev-server-traps) section below. All known causes are fixed in `main`, but if you clone fresh into a directory with stray parent `package-lock.json` files, the workspace-root inference can still bite.

---

## 🏗 Architecture

### Token tier model

Three canonical tiers, layered additively on top of the legacy `--ag-*` and `--pair-*` names. Components consume the tier appropriate to their coupling level &mdash; never raw hex.

```
ref    Brand-owned primitives. 24 locked hexes + raw values.        --ref-color-navy-500
 ↓     Never consumed by UI components directly.
sys    Aliases pointing at ref. THIS LAYER FLIPS in dark mode.      --sys-color-text-primary
 ↓
comp   Component-scoped composition tokens.                         --comp-cta-primary-bg
       (Renamed from --pair-* in the Lane A migration.)
```

The dark-surface scope `[data-surface="dark"]` remaps `--comp-cta-primary-bg` &rarr; cream-warm so primary CTAs flip automatically on navy / photography surfaces.

### Primitive count

**28 primitives** as of 2026-05-10. Each defines anatomy, variants, the seven-state matrix (`default / hover / focus-visible / active / disabled / loading / error`), tokens consumed, accessibility criteria, and anti-patterns. Storybook entries per primitive.

### Project layout

```
app/
  design/        — design system docs (chapters 01–06)
  tokens/        — token catalogue (7 routes)
  layout.tsx     — type stack + JSON-LD + favicon
  globals.css    — token tier model (1,277 lines)
  page.tsx       — redirects / → /design
components/
  Logo.tsx, Button.tsx, MoneyInput.tsx, ...
  design/        — chapter wrappers, specimen scaffolding
  patterns/      — Calculator + Wizard composition skeletons
public/
  brand/logo/    — 6 logo variants × 2 formats (SVG + @2x PNG)
  decorative/    — feather backgrounds (8 variants from 3 sources)
stories/         — Storybook entries per primitive
lib/             — utilities (mortgage calc, cn classname helper)
constants/       — mortgage type registry, NHF eligibility rules
```

---

## 🗺 Routes

| Route | What's there |
|---|---|
| `/` | Redirects to `/design` |
| `/design` | Six chapters &mdash; Foundations, Brand, Primitives, Patterns, Motion, Compositions |
| `/tokens` | Token catalogue landing with tier diagram |
| `/tokens/color` | All 24 canonical hexes + ref/sys/comp aliases |
| `/tokens/typography` | Type stack + bi-script registers + scale |
| `/tokens/spacing` | Spacing scale + grid system |
| `/tokens/motion` | 11 motion tokens with live demos |
| `/tokens/elevation` | Shadow scale on light + dark surfaces |
| `/tokens/radius` | Radius scale + component bindings |

---

## 🔒 Locked decisions

### Brand axis
Modern-institutional, sans-led with serif accents, generous spacing, soft surface depth, regulatory-safe register. Heritage gravitas is delivered through Libre Baskerville italic accent moments &mdash; not through ornate framing.

### Palette &mdash; 4 hue families
| Family | Default | Variants |
|---|---|---|
| Navy | `#0A2540` (h=219° saturated Stripe-blue) | navy.deep · navy.soft · navy.vivid |
| Cream | `#F8F5EF` | cream.warm · cream.deep · cream.vivid |
| Gold | `#C8972A` &mdash; **decorative-only post 2026-05-09** | gold.rich · gold.soft · gold.vivid |
| Green | `#1A7A4A` | green.sage · green.deep · green.vivid |

**No fifth hue. No purple. Ever.**

### Type stack
| Role | Family | Use |
|---|---|---|
| Display serif | Libre Baskerville | Heading-only · serif side of bi-script · italic accents |
| Display sans | Elms Sans (Inter placeholder until licence) | Heading-only · sans side of bi-script |
| Body | Inter | Default body · long copy · 14–18px |
| UI + Numerics | Inter Tight (`tabular-nums`) | UI labels · buttons · medium-density · 14–32px · numerics |

**Bi-script registers**: word-level swaps only, case must match. Three weight registers via globals.css:
- `.bi-display` (700/700) &mdash; hero H1, marketing display
- `.bi-section` (600/500) &mdash; major section titles
- `.bi-label` (500/400) &mdash; eyebrow labels (also the default)

### Logo
Six variants surfaced through the `<Logo />` primitive:
- Wordmark × `coloured` / `mono-white` / `mono-black`
- Brand mark (icon-only) × `coloured` / `mono-white` / `mono-black`

Coloured SVGs use the locked `--ag-navy` (`#0A2540`) and `--ag-gold` (`#C8972A`) tokens. Documented at `/design § 02 Brand`.

---

## ⛔️ Anti-pattern register

Block delivery if any of these appear in proposed work:

- Centred hero, 3-equal-card row, Inter substituted for display
- Geist / Satoshi / Cabinet Grotesk anywhere
- Purple / magenta / cyan glow (AI accent = navy.vivid at h=219°, never h≥250°)
- Pure black `#000`
- Emoji, fictional names ("Sarah Chan"), round-number fake stats (`99%`), filler verbs ("elevate", "seamless")
- Unsplash imagery, autoplay video, custom mouse cursor, gradient-fill H1, infinite-loop animation
- GSAP + Framer Motion mixed in the same component tree
- 3D scene autorotating, calculator confetti animation
- Cream-as-default page surface (cream is accent only; default is white)
- UPPERCASE bi-sans + lowercase bi-serif on the same line (must case-match)
- Mid-word bi-script splits (word-level only)
- Gold buttons / CTAs (gold is decorative-only post 2026-05-09 v3)
- Tokens in `@theme inline` when they need runtime cascade (data-surface flip)

---

## 🛠 Tech stack

- **Next.js** `16.2.6` with Turbopack
- **React** `19.2.4`
- **Tailwind CSS** `v4` (via `@tailwindcss/postcss`)
- **TypeScript** `5.x`
- **Framer Motion** `12.x` &mdash; component-level animation
- **GSAP** `3.x` &mdash; page-level scroll choreography (never mixed with Framer in same tree)
- **Storybook** `10.x` &mdash; primitive isolation + visual regression
- **Vitest** `4.x` + Playwright &mdash; component + accessibility tests
- **Lighthouse** &mdash; perf budgets (LCP &lt; 2.5s on 3G, JS &lt; 80 KB gzipped initial paint)

---

## 📚 Reference docs

Living docs in the parent directory (not version-controlled here):

- **`AGMB_DESIGN_SYSTEM.md`** &mdash; the canonical spec (31 KB)
- **`AGMB_FEATHERS_PLAN.md`** &mdash; decorative register plan (v1.2, 838 lines)
- **`AGMB_Platform_PRD_v3_FINAL.md`** &mdash; the full PRD (59 KB)
- **`AGMB_COPY_LIBRARY.md`** &mdash; 11 sections, every CTA / disclosure / error / fallback

---

## ⚠️ Known dev-server traps

Three stacked issues nearly bricked a fresh clone on 2026-05-10 &mdash; all fixed in this codebase, but worth knowing:

1. **Stray parent `package-lock.json`** at `/Users/<you>/` or `/Users/<you>/Documents/` causes Turbopack to walk up and adopt the entire home folder as workspace root &mdash; previously ballooned dev-server memory to ~90 GB. Fixed via `turbopack.root: path.resolve(__dirname)` in `next.config.ts`.
2. **Tailwind v4 scans `.md` files in the project root** for class names. Agent memory inside `.claude/agent-memory-local/` once quoted an arbitrary-value shadow utility with a literal ellipsis as documentation prose &mdash; Tailwind tried to compile that string as a real class, generated broken CSS, returned HTTP 500. Fixed two ways: `/.claude/` in `.gitignore` (Tailwind v4 honours .gitignore) **and** an explicit `@source` allow-list in `globals.css` so only `app/`, `components/`, `stories/`, `lib/`, `constants/` are scanned.
3. **`--color-pair-cta-primary` gets baked at `:root` by Tailwind v4's `@theme` block** even with the `inline` modifier removed. Re-declared inside `[data-surface="dark"]` so the cascade reaches the Tailwind utility.

If your dev server ever spikes memory, returns 500 with a CSS parse error, or renders a primary CTA invisible on a navy surface &mdash; those three causes are the usual suspects.

---

## 📜 License

Proprietary &mdash; © 2026 AG Mortgage Bank Plc. Internal use within the AGMB org and contracted vendors. Not open-source.
