# Claude handoff prompt — AGMB Design System

Paste everything below into a fresh Claude session (Claude.ai, Claude Code, or any agent context). It bootstraps full project context.

---

You are pairing with **Adewale Aloba** (Senior Digital Designer, Layout Studio) on the **AG Mortgage Bank Plc (AGMB) design system** — a token-driven, modern-institutional system for a CBN-licensed Nigerian Primary Mortgage Institution. Speak at senior-designer level. Don't over-explain. Push back on PRD violations and quote the section.

## Where the work lives

- **Repo:** https://github.com/LobzyJay/agmb-design-system (public)
- **Local path:** `/Users/lobzy/Documents/GitHub/AG mortgage bank/agmb-web`
- **Branch with all work:** `feat/design-system-foundation`
- **Main:** just the Create Next App initial commit
- **PR ready:** https://github.com/LobzyJay/agmb-design-system/pull/new/feat/design-system-foundation
- **First read on every session:** `agmb-web/README.md` — full architecture + locked decisions
- **Living docs (parent dir, not in repo):** `AGMB_DESIGN_SYSTEM.md`, `AGMB_FEATHERS_PLAN.md`, `AGMB_Platform_PRD_v3_FINAL.md`, `AGMB_COPY_LIBRARY.md`

## Scope — the one rule

**Deliverable is the design system, NOT the marketing website.** `/design` + `/tokens` + primitives only. The Calculator and Wizard live as composition skeletons inside `/design § 04 Patterns`. The 11 marketing homepage sections from earlier planning docs are deleted. `/` redirects to `/design`. Do not rebuild the homepage.

## Locked decisions (immutable)

### Brand axis
Modern-institutional, sans-led with serif accents. Reference set: ACI Worldwide, Stripe, Mercury. **Not** Habito, **not** Better.com, **not** Wise. Heritage gravitas via Libre Baskerville italic accents only — never ornate framing.

### Palette — 4 hue families, 24 canonical hexes
| Family | Default | Decorative-only? |
|---|---|---|
| Navy | `#0A2540` (h=219° Stripe-blue) | No |
| Cream | `#F8F5EF` | No (but never default page surface — default is white) |
| Gold | `#C8972A` | **Yes — post 2026-05-09 v3, no buttons / CTAs** |
| Green | `#1A7A4A` | No |

**No fifth hue family. No purple. Ever.** AI accent if needed = `navy.vivid` at h=219° (never h≥250°).

### Type stack (locked 2026-05-09)
| Role | Family |
|---|---|
| Display serif | Libre Baskerville (400 / 400i / 700) |
| Display sans | Elms Sans (paid; Inter is placeholder until licence) |
| Body | Inter |
| UI + Numerics | Inter Tight with `tabular-nums` |

**Geist Mono retired.** No Geist / Satoshi / Cabinet Grotesk anywhere. Numerics use Inter Tight `tnum`.

### Bi-script registers
Word-level swaps only. Case must match. Three weight registers in `globals.css`:
- `.bi-display` — 700/700 (hero, marketing display)
- `.bi-section` — 600/500 (section titles)
- `.bi-label` — 500/400 (eyebrows · also the default)

### Token tier model (ref / sys / comp)
Layered additively on the legacy `--ag-*` and `--pair-*` names. Components consume the tier appropriate to their coupling — never raw hex.

```
ref    Brand-owned primitives. 24 locked hexes.    --ref-color-navy-500
 ↓     Never consumed directly by UI.
sys    Aliases pointing at ref.                    --sys-color-text-primary
 ↓     This layer flips in dark / high-contrast.
comp   Component compositions.                     --comp-cta-primary-bg
       (Was --pair-* before Lane A.)
```

The `[data-surface="dark"]` scope remaps `--comp-cta-primary-bg` → cream-warm so primary CTAs flip on navy / photography surfaces automatically.

### Logo
Six variants in the `<Logo />` primitive (#28):
- Wordmark × `coloured` / `mono-white` / `mono-black`
- Brand mark (icon-only) × `coloured` / `mono-white` / `mono-black`

Coloured SVGs use the locked `--ag-navy` (`#0A2540`) and `--ag-gold` (`#C8972A`) tokens. Documented at `/design § 02 Brand`.

## Anti-pattern register (block delivery)

- Centred hero · 3-equal-card row · Inter substituted for display
- Geist / Satoshi / Cabinet Grotesk anywhere
- Purple / magenta / cyan glow (h≥250°)
- Pure black `#000`
- Emoji · fictional names ("Sarah Chan") · round-number fake stats (`99%`)
- Filler verbs ("elevate", "seamless")
- Unsplash · autoplay video · custom cursor · gradient-fill H1 · infinite-loop animation
- GSAP + Framer Motion mixed in same component tree
- 3D scene autorotating · calculator confetti
- Cream-as-default page surface
- UPPERCASE bi-sans + lowercase bi-serif on same line (must case-match)
- Mid-word bi-script splits
- **Gold buttons / CTAs** (decorative-only post 2026-05-09 v3)
- Tokens in `@theme inline` when they need runtime cascade

## Current state — 2026-05-10

- **28 primitives** (Logo is #28, landed today)
- `/design` chapters 01–06 · `/tokens` 7 routes — all return 200
- `globals.css` 1,277 lines · ref/sys/comp + legacy ag-/pair- tiers wired
- All 6 logo variants in `public/brand/logo/` · favicon + apple-touch wired in `layout.tsx`
- Sidebar and footer use real `<Logo />` · typographic placeholders retired
- Dual-blue CTA bug fixed (Tailwind v4 unbake + Button text-colour migration to token)
- Memory @ ~850 MB on dev server · all routes 200

## Three dev-server traps — already fixed but worth knowing

1. **Stray parent `package-lock.json`** at `~` or `~/Documents` causes Turbopack to walk up and adopt your home folder as workspace root → ~90 GB VM blowup. Fixed in `next.config.ts` via `turbopack.root: path.resolve(__dirname)`.
2. **Tailwind v4 scans `.md` files** for class names and tries to compile prose-quoted arbitrary-value classes → HTTP 500 CSS parse error. Fixed in `globals.css` via explicit `@source` allow-list (`app/`, `components/`, `stories/`, `lib/`, `constants/`) AND `/.claude/` in `.gitignore`.
3. **`--color-pair-cta-primary` baked at `:root`** despite non-inline `@theme`. Fixed by re-declaring inside `[data-surface="dark"]` so primary CTAs flip cream-warm on dark scopes. Without this, primary button renders navy-on-navy (invisible).

## Open queue (in priority order)

1. **Accordion / Disclosure primitive (#29)** for long text sections — Vocabulary (§01.8) · Grammar (§01.9) · Voice (§01.7). Adewale requested this. Match modern-institutional aesthetic (Stripe / Mercury), not flashy. Inline SVG chevron, no chrome-heavy expansion.
2. **Decorative image warnings** — `Image with src golden-feather-*.webp has fill but parent position is static`. ~6 instances. Wrap in `position: relative` parent or migrate from `fill` to fixed dimensions.
3. **Storybook story for `<Logo />`** — every other primitive has a `*.stories.tsx`. Logo needs one (visual regression coverage of all 6 variants).
4. **Coloured `@2x.png` logo fallbacks** still have `#061F39 / #DDA73A` baked in (only the SVGs got recoloured to design tokens). Regenerate with `rsvg-convert` or similar when convenient — they're fallback only, but OG image surfaces will show the old colours.
5. **`components/design/chapters.tsx` is 5,800+ lines** — single client file. HMR is slow on big edits. Split per-chapter (`Chapter01.tsx`, `Chapter02.tsx`, …) when a quiet moment arrives.
6. **Hover state on primary CTA inside `[data-surface="dark"]`** still uses hardcoded `hover:bg-ag-navy-vivid/90` — on a cream-warm bg this flips to navy on hover, which is jarring. Should darken cream-warm slightly instead. Not blocking but architecturally inconsistent.

## Working style

- Speak at senior-designer level. Reference code as `file_path:line_number`.
- Match comment density and idiom of surrounding code.
- Lead with the recommendation, then rationale — not a menu of options.
- Use `git stash` carefully — earlier in this project an entire 1,277-line design system foundation went missing because work was stashed and forgotten. **Commit often**.
- When in doubt about a token or pattern, check `AGMB_DESIGN_SYSTEM.md` first.
- Do not "fix" things back to PRD-original values when they've been explicitly overridden by Adewale (e.g. type stack, gold demotion, character-level bi-script ban).

## Stack

- Next.js `16.2.6` with Turbopack
- React `19.2.4`
- Tailwind v4 (`@tailwindcss/postcss`)
- TypeScript 5
- Framer Motion 12 (component-level) · GSAP 3 (page-level scroll) — **never** mixed in same tree
- Storybook 10 · Vitest 4 + Playwright · Lighthouse

## First action

1. `cd "/Users/lobzy/Documents/GitHub/AG mortgage bank/agmb-web"`
2. `git checkout feat/design-system-foundation`
3. `npm install` (likely already installed)
4. `npm run dev` — confirms localhost:3000 lands cleanly on `/design`
5. Skim `README.md` for the architecture summary
6. Pick from the open queue or wait for Adewale's direction
