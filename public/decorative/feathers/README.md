# AGMB Golden Feathers — Decorative Asset Register

**Source pack:** `golden-feathers-backgrounds-pack-2026-03-27-01-32-29-utc/`  
**Original:** 11 x 8K (7680 x 4320 px) CGI macro renders, JPG, 15–26 MB each  
**License:** Verify with Adewale — pack provenance unknown at time of processing  

## Assets in this directory

| File | Source | Crop region | Output size | Use in docs |
|------|--------|-------------|-------------|-------------|
| `golden-feather-07.avif` | Golden Feather 07.jpg | Left 55% (x:0–4224, y:0–4320) → 640×480 | 77 KB | S2a hero panel specimen |
| `golden-feather-07.webp` | same | same | 70 KB | WebP fallback |
| `golden-feather-04.avif` | Golden Feather 04.jpg | Centre strip (x:2800–5600, y:0–4320) → 960×240 | 17 KB | S2b hairline strip specimen |
| `golden-feather-04.webp` | same | same | 20 KB | WebP fallback |
| `golden-feather-02.avif` | Golden Feather 02.jpg | Lower-left quadrant (x:0–3840, y:2160–4320) → 480×480 | 19 KB | S2c feature tile specimen |
| `golden-feather-02.webp` | same | same | 24 KB | WebP fallback |

**Total AVIF payload:** 113 KB (budget: 240 KB) — 3 assets × avg 38 KB

## Processing pipeline

Processed 2026-05-09 via `sharp` (Node.js) from the working directory  
`/Users/lobzy/Documents/github/AG mortgage bank/`.

Steps per asset:
1. `sharp().extract()` — crop to the relevant focal region at source 8K resolution
2. `.resize()` — down to doc-page specimen dimensions (cover fit, centre anchor)
3. `.avif({ quality: 52–60, effort: 7 })` — primary format; quality tuned per-asset  
   to stay ≤ 80 KB
4. `.webp({ quality: 72 })` — fallback for browsers without AVIF support

## Gold tone — recolour decision

Native feather gold tone: `~rgb(175,145,75)` · HSL `(41.5°, 37–42%, 48%)`  
AGMB locked gold (`#C8972A`): HSL `(41.4°, 65%, 47%)`

**Hue delta: 0.1° — negligible.**  
Saturation delta: ~28% (native is undersaturated vs the AGMB target).

**Recolour strategy: CSS `filter: saturate()` at render time.**  
No asset preprocessing needed — hue matches exactly; only saturation lifts are
required. The filter class `.agmb-feather-tone` in `globals.css` applies
`saturate(165%)` which lands the photographic gold within perceptual tolerance
of `#C8972A`. See `globals.css` for the documented filter values.

## Usage rules (summary — full doc at /design § 01.11)

- Maximum 1 photographic feather per page
- `mix-blend-mode: multiply` over `bg-ag-navy-deep` surface
- Always `next/image` with `sizes` + `loading="lazy"` (never raw `<img>`)
- AVIF primary + WebP fallback via `<picture>` or Next.js `<Image>`
- `aria-hidden="true"` + empty `alt` — decorative only
- `prefers-reduced-motion: reduce` — feathers are static; no animation applies
- Mobile minimum width: 280px rendered
