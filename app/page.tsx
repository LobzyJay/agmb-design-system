// app/page.tsx — / always redirects to /design.
// Was a server-side redirect via next/navigation; converted to a client-side
// redirect on 2026-05-10 to support `output: "export"` (GitHub Pages build).
// Server `redirect()` is not available in static export mode.
"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/design");
  }, [router]);

  // Visible fallback for the brief moment before the client router pushes,
  // and for users without JavaScript. Inline styles only — globals.css tokens
  // are already loaded by the layout, but we avoid pulling Tailwind classes
  // for a single transient page.
  return (
    <div
      style={{
        padding: "6rem 1.5rem",
        textAlign: "center",
        color: "var(--ag-muted, #4b5563)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <p style={{ marginBottom: "1rem", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
        Redirecting to the design system…
      </p>
      <Link
        href="/design"
        style={{
          color: "var(--ag-navy, #0A2540)",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          fontSize: "0.9rem",
        }}
      >
        Go to /design
      </Link>
    </div>
  );
}
