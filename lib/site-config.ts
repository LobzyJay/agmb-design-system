// Single source of truth for the deployed-site base path.
//
// In dev (`npm run dev`), `NEXT_PUBLIC_BASE_PATH` is unset → empty string, so
// asset URLs resolve at the root (e.g. /brand/logo/agmb-icon-coloured.svg).
//
// In production builds for GitHub Pages, the deploy workflow sets
// `NEXT_PUBLIC_BASE_PATH=/agmb-design-system` (the repo name), so assets resolve
// at /agmb-design-system/brand/logo/... matching where GH Pages serves them.
//
// `next.config.ts` reads the same env var into `basePath` + `assetPrefix`, so
// every Next-managed URL (Link, Image, font, metadata.icons) is auto-prefixed.
// This file covers the edge case where we hand-author an asset URL — see
// `components/Logo.tsx` where `<img src>` is plain HTML and Next can't help.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a leading-slash asset path with the deployed base path.
 *
 *   asset("/brand/logo/agmb-icon-coloured.svg")
 *     → "/brand/logo/agmb-icon-coloured.svg"                     (dev)
 *     → "/agmb-design-system/brand/logo/agmb-icon-coloured.svg"  (GH Pages)
 */
export const asset = (path: string): string => {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalised}`;
};
