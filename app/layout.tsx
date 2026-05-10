import type { Metadata } from "next";
import { Libre_Baskerville, Elms_Sans, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// ─── Type stack ────────────────────────────────────────────────
// Adewale typography lock (2026-05-09):
//   Display 1 · Libre Baskerville  — heading-only · serif side of bi-script · italic accents
//   Display 2 · Elms Sans          — heading-only · sans side of bi-script · 3 weight registers
//   Body      · Inter              — long prose · table content · 14–18px reading sizes
//   UI        · Inter Tight        — UI labels · buttons · medium-density · 14–32px
//   Numerics  · Inter Tight        — tabular figures via OpenType `tnum` (replaces Geist Mono)
//
// Geist Mono dropped 2026-05-09. Inter Tight tabular figures handle every
// numeric surface (calculator outputs, stats, wizard counts, hex labels,
// code samples). PRD §4.1 + §7 superseded by this lock.
// Bi-script pattern is hybrid:
//   - Word-level for section labels (PRD §4.0)
//   - Character-level for the hero H1 (typeguide.png)
// Three weight registers wired in globals.css: .bi-display / .bi-section / .bi-label

// Display 1 — heritage serif. Heading + bi-script combination ONLY.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Display 2 — Elms Sans (Google Fonts, variable axis — covers all 9 weights).
// Heading + bi-script combination ONLY.
const elmsSans = Elms_Sans({
  variable: "--font-elms-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

// Body — Inter (variable axis). Default body, prose-optimised, long copy.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

// UI + Numerics — Inter Tight (variable axis). Medium-density labels,
// buttons, and tabular figures (replaces Geist Mono via OpenType `tnum`).
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

// Schema.org FinancialService JSON-LD per PRD §6 + §7 SEO checklist.
// Crawler-readable structured data for "AG Mortgage Bank Plc". Address +
// phone + opening hours are placeholders until Adewale supplies — every
// such field is flagged with the literal string "TBD" so a grep can find
// them before deploy.
const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://agmortgagebankplc.com/#org",
  name: "AG Mortgage Bank Plc",
  alternateName: "AGMB",
  url: "https://agmortgagebankplc.com",
  logo: "https://agmortgagebankplc.com/brand/logo.png",
  image: "https://agmortgagebankplc.com/og-image.jpg",
  description:
    "Nigerian Primary Mortgage Institution, CBN-licensed since 2004. M-REIF first-mover, ISO 9001:2015 certified, NDIC-insured.",
  foundingDate: "2004",
  email: "info@agmortgagebankplc.com",
  telephone: "+234-807-609-4107",
  areaServed: { "@type": "Country", name: "Nigeria" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressLocality: "TBD",
    streetAddress: "TBD",
  },
  sameAs: [
    "https://www.linkedin.com/company/ag-mortgage-bank-plc/",
    "https://www.instagram.com/agmbplc/",
    "https://x.com/agmb_plc",
  ],
  knowsAbout: ["Mortgage", "NHF", "M-REIF", "Construction Finance", "Real Estate Investment Finance"],
  serviceType: "Primary Mortgage Institution",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AG Mortgage Bank Plc — Nigeria's most trusted mortgage bank",
    template: "%s · AG Mortgage Bank Plc",
  },
  description:
    "20+ years CBN-regulated. ISO 9001:2015 certified. ₦2.8B disbursed in the last year alone.",
  keywords: [
    "AG Mortgage Bank",
    "Nigerian mortgage",
    "NHF Mortgage Loan",
    "M-REIF",
    "CBN-regulated PMI",
    "Lagos mortgage",
    "Abuja mortgage",
    "Construction Finance Nigeria",
    "Real Estate Investment Finance",
  ],
  authors: [{ name: "AG Mortgage Bank Plc" }],
  applicationName: "AG Mortgage Bank",
  category: "Finance",
  openGraph: {
    type: "website",
    siteName: "AG Mortgage Bank Plc",
    title: "AG Mortgage Bank Plc — Nigeria's most trusted mortgage bank",
    description:
      "20+ years CBN-regulated. ISO 9001:2015. M-REIF first-mover. ₦2.8B disbursed last year alone.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    locale: "en_NG",
    images: [
      {
        url: "/photography/hero-placeholder.webp",
        width: 2400,
        height: 3000,
        alt: "Nigerian family at home — AG Mortgage Bank.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AG Mortgage Bank Plc",
    description: "Your home. Your terms. Starting today.",
    site: "@agmb_plc",
    creator: "@agmb_plc",
    images: ["/photography/hero-placeholder.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Favicon + apple-touch-icon — landed 2026-05-10 from the brand mark drop.
  // SVG icon scales for any chrome density; PNG @2x is the high-DPI raster
  // fallback for Apple home-screen pinning. Mono-black is the canonical
  // single-colour mark; the OS picks the right one based on system theme.
  icons: {
    icon: [
      { url: "/brand/logo/agmb-icon-mono-black.svg", type: "image/svg+xml" },
      { url: "/brand/logo/agmb-icon-mono-black@2x.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/brand/logo/agmb-icon-coloured@2x.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/brand/logo/agmb-icon-mono-black.svg"],
  },
  // No theme-color: PRD §7 bans pure black, and we don't want browsers
  // tinting the URL bar with our heritage navy on every page load.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${elmsSans.variable} ${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ag-white text-ag-text">
        {children}
      </body>
    </html>
  );
}
