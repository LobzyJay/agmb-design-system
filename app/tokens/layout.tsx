// /tokens layout — dedicated shell for the token catalogue.
// Mirrors the /design layout pattern (sticky left sidebar + content area).
// Server Component — client interactivity is isolated inside TokensSidebar.
import type { Metadata } from "next";
import { TokensSidebar } from "@/components/tokens/TokensSidebar";

export const metadata: Metadata = {
  title: "Token Catalogue — AGMB Design System",
  description:
    "ref / sys / comp — three-tier token architecture. Colour, typography, spacing, motion, elevation, and radius. The primitive vocabulary AGMB components consume.",
};

export default function TokensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface-light-1 text-ag-text flex flex-col lg:grid lg:grid-cols-[18rem_1fr]">
      <TokensSidebar />
      <div className="min-w-0">{children}</div>
    </main>
  );
}
