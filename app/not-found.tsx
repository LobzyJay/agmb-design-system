import Link from "next/link";
import { Button } from "@/components/Button";

// AGMB — global 404 / not-found page.
//
// Phase 1 ships as a single-page composition (app/page.tsx). Footer + Products
// reference future detail routes (`/careers`, `/privacy`, `/cookies`, etc.)
// that don't exist yet — until Phase 1.5 splits those out, the orphan links
// land here. Most footer hrefs are already remapped to homepage anchors in
// `components/sections/Footer.tsx`; this page handles the residual orphans
// (Careers + the five Legal links) plus any miscellaneous typos a visitor
// might hit.
//
// The page mirrors the heritage-institutional register of the rest of the
// site — cream surface, navy heading, gold hairline accent, Inter Tight
// numerics for the 404 marker. No emoji, no "oops", no playful illustration.

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ag-cream text-ag-text flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full flex flex-col items-start gap-6">
        {/* 404 marker — small numeric eyebrow, gold hairline above. */}
        <div className="flex flex-col gap-2">
          <span aria-hidden="true" className="block w-12 border-t border-ag-gold" />
          <p className="numeric text-[11px] uppercase tracking-[0.08em] text-ag-muted">
            Error 404 · Page not found
          </p>
        </div>

        <h1 className="font-sans font-bold text-ag-navy text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.95]">
          This page is part of an upcoming AGMB build.
        </h1>

        <p className="text-base md:text-lg text-ag-text/80 leading-relaxed max-w-lg">
          Phase 1 ships as a single homepage. Detail routes — product pages,
          legal notices, careers, and the rest — arrive in Phase 1.5. In the
          meantime, every section of the experience lives on the live homepage.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/" aria-label="Return to AG Mortgage Bank homepage" className="focus-visible:outline-none rounded-lg">
            <Button variant="primary" size="md">
              Return to the homepage
            </Button>
          </Link>
          <Link href="/#enquiry" aria-label="Speak to an advisor" className="focus-visible:outline-none rounded-lg">
            <Button variant="secondary" size="md">
              Speak to an advisor
            </Button>
          </Link>
        </div>

        <p className="text-sm text-ag-muted leading-relaxed mt-4">
          Need something specific? Email{" "}
          <a
            href="mailto:info@agmortgagebankplc.com"
            className="text-ag-navy-vivid hover:text-ag-navy underline underline-offset-2 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 rounded-sm"
          >
            info@agmortgagebankplc.com
          </a>
          {" "}or message us on{" "}
          <a
            href="https://wa.me/2348076094107"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ag-navy-vivid hover:text-ag-navy underline underline-offset-2 transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2 rounded-sm numeric"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </main>
  );
}
