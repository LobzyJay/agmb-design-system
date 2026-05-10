import type { NextConfig } from "next";
import path from "node:path";

// GitHub Pages serves the repo at `https://<user>.github.io/<repo>/`, so every
// asset and route must carry the `/agmb-design-system` prefix in prod. In dev
// the env var is unset → empty string, so localhost:3000 keeps serving from
// the root. Set in `.github/workflows/deploy.yml` for prod builds.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // ── Static export for GitHub Pages ─────────────────────────────────────
  // `next build` writes a fully static site to `/out`. No Node.js server is
  // required at runtime — GH Pages serves the HTML, CSS, and JS directly.
  // Server-only features (next/navigation `redirect()`, `cookies()`, etc.)
  // are unavailable; `app/page.tsx` uses a client-side router replace.
  output: "export",

  // ── Subpath under github.io ────────────────────────────────────────────
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,

  // ── Image optimisation off ─────────────────────────────────────────────
  // Required for `output: "export"` (the optimiser is a Node service that
  // isn't present on GH Pages). Also lets us serve SVG without the
  // `dangerouslyAllowSVG` config flag.
  images: {
    unoptimized: true,
  },

  // ── Trailing slash for static directory hosting ────────────────────────
  // GH Pages serves `/design` as the file `design/index.html`. With trailing
  // slashes enabled, internal links generate `/design/` which matches the
  // directory layout and avoids 404s on hard-reload of nested routes.
  trailingSlash: true,

  // Pin Turbopack workspace root to this app — there are stray lockfiles
  // further up the tree (~/Documents/, ~/) that would otherwise be inferred
  // as the root. Caused a ~90 GB VM blowup before the fix.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
