"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

// Dedicated sidebar for the /tokens catalogue.
// Kept separate from the /design sidebar — both routes link to each other
// in their respective headers. Separation keeps /design focused on
// primitives, patterns, and compositions; /tokens is the token catalogue.

const TOKEN_ROUTES = [
  {
    path: "/tokens",
    exact: true as const,
    label: "Overview",
    meta: "tier model · intro",
  },
  {
    path: "/tokens/color",
    exact: false as const,
    label: "Colour",
    meta: "ref + sys + comp",
  },
  {
    path: "/tokens/typography",
    exact: false as const,
    label: "Typography",
    meta: "families · scale",
  },
  {
    path: "/tokens/spacing",
    exact: false as const,
    label: "Spacing",
    meta: "base-8 · grid",
  },
  {
    path: "/tokens/motion",
    exact: false as const,
    label: "Motion",
    meta: "durations · easings",
  },
  {
    path: "/tokens/elevation",
    exact: false as const,
    label: "Elevation",
    meta: "shadow stacks",
  },
  {
    path: "/tokens/radius",
    exact: false as const,
    label: "Radius",
    meta: "scale · samples",
  },
];

export const TokensSidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const activeRoute =
    TOKEN_ROUTES.find((r) =>
      r.exact ? pathname === r.path : pathname === r.path || pathname.startsWith(r.path + "/"),
    ) ?? TOKEN_ROUTES[0];

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden sticky top-0 z-30 bg-ag-white border-b border-ag-border">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="tokens-sidebar-mobile"
          className="w-full flex items-center justify-between px-5 py-3 text-left transition-token focus-visible:outline-none"
        >
          <span className="flex items-baseline gap-3 min-w-0">
            <span className="numeric text-xs text-ag-gold shrink-0">T</span>
            <span className="text-sm font-medium text-ag-navy truncate">{activeRoute.label}</span>
          </span>
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
            className={cn("text-ag-muted transition-token shrink-0", mobileOpen && "rotate-180")}
          >
            <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {mobileOpen && (
          <nav
            id="tokens-sidebar-mobile"
            aria-label="Token catalogue (mobile)"
            className="border-t border-ag-border bg-ag-white max-h-[60vh] overflow-y-auto"
          >
            <ol className="flex flex-col py-2 divide-y divide-ag-border">
              {TOKEN_ROUTES.map((r) => {
                const isActive = r.exact ? pathname === r.path : pathname === r.path || pathname.startsWith(r.path + "/");
                return (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block w-full text-left flex items-baseline gap-3 px-5 py-2.5 transition-token",
                        isActive
                          ? "bg-ag-cream border-l-2 border-ag-gold text-ag-navy"
                          : "text-ag-muted hover:text-ag-navy hover:bg-ag-cream/40",
                      )}
                    >
                      <span className="text-sm font-medium">{r.label}</span>
                      <span className="numeric text-[10px] text-ag-muted/60">{r.meta}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop sticky rail */}
      <nav
        aria-label="Token catalogue"
        className="hidden lg:block lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto bg-ag-white border-r border-ag-border"
      >
        {/* Wordmark header — same register as /design sidebar */}
        <div className="px-7 pt-10 pb-9">
          <a
            href="/"
            aria-label="AG Mortgage Bank — back to home"
            className="inline-flex items-baseline gap-2 group focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="numeric text-[10.5px] uppercase tracking-[0.08em] text-ag-gold/80 group-hover:text-ag-gold transition-token"
            >
              A
            </span>
            <span className="font-serif font-bold text-ag-navy text-2xl leading-none tracking-[-0.02em] group-hover:text-ag-text transition-token">
              AGMB
            </span>
          </a>
          <span aria-hidden="true" className="block w-8 border-t border-ag-border mt-4" />
          <p className="bi-label text-ag-muted text-[11px] uppercase tracking-[0.08em] mt-3">
            <span className="bi-sans">Token</span>{" "}
            <span className="bi-serif italic">catalogue</span>
          </p>
          <p className="text-xs text-ag-muted mt-3 leading-snug">
            ref / sys / comp — three tiers, single source of truth.
          </p>
        </div>

        <ol className="flex flex-col pb-4 border-y border-ag-border">
          {TOKEN_ROUTES.map((r, idx) => {
            const isActive = r.exact ? pathname === r.path : pathname === r.path || pathname.startsWith(r.path + "/");
            return (
              <li
                key={r.path}
                className={cn(
                  "border-l-2 border-transparent",
                  idx > 0 && "border-t border-ag-border",
                )}
              >
                <Link
                  href={r.path}
                  className={cn(
                    "block px-7 py-3 transition-token border-l-2 -ml-[2px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-inset",
                    isActive
                      ? "border-ag-gold bg-ag-cream/50 text-ag-navy"
                      : "border-transparent text-ag-muted hover:text-ag-navy hover:border-ag-border",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium leading-tight">{r.label}</span>
                    <span className="numeric text-[10px] text-ag-muted/60 shrink-0">{r.meta}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="px-7 pb-8 pt-5">
          <Link
            href="/design"
            className="text-xs text-ag-muted hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline"
          >
            Design system docs &rarr;
          </Link>
          <p className="text-xs text-ag-muted/60 mt-3 leading-snug">
            Tokens locked at architecture time. PRD §4.
          </p>
        </div>
      </nav>
    </>
  );
};
TokensSidebar.displayName = "TokensSidebar";
