import type { Metadata } from "next";
import { Inter, Inter_Tight, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import "./agmb-site.css";

// Type stack — exactly the three faces the live agmb-website loads from Google Fonts.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});
const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AGMB Design System",
    template: "%s · AGMB Design System",
  },
  description:
    "The component and token system behind the AG Mortgage Bank website — a faithful React/Tailwind port of agmb-website.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${libre.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
