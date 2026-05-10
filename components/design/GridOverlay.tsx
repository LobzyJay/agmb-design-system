"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// GridOverlay — Swiss tradition: the grid is part of the documentation.
//
// Renders a 12-column scaffold overlay aligned to the AGMB --grid-12 token
// (max-width 1400, 24/32 column gap, responsive inline padding). Hidden by
// default, surfaced via a small "Grid" button in the page header that
// persists the user's preference in localStorage.
//
// Implementation notes:
// - Pointer-events-none so the overlay never intercepts clicks.
// - Fixed positioning + inset-0 so it covers the full viewport even as the
//   page scrolls — the columns stay aligned to whatever grid the content
//   below is rendered against.
// - 30%-opacity ag-border on the inner column-divider lines; matches the
//   structural-rule register used elsewhere on the page.
// - Aria-hidden by default; visibility communicated only via the toggle's
//   aria-pressed state.

const STORAGE_KEY = "agmb-design-grid";

export const useGridOverlay = (): [boolean, () => void] => {
  const [visible, setVisible] = React.useState(false);

  // Hydrate from localStorage on mount. Defer until after first paint to
  // avoid SSR/client mismatch.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setVisible(true);
    } catch {
      // Storage unavailable — sane default (false) stands.
    }
  }, []);

  const toggle = React.useCallback(() => {
    setVisible((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // Ignore — visibility still applies for the session.
      }
      return next;
    });
  }, []);

  return [visible, toggle];
};

export interface GridOverlayProps {
  visible: boolean;
  className?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ visible, className }) => {
  if (!visible) return null;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 pointer-events-none z-40",
        className,
      )}
    >
      <div className="grid-12 h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full",
              // Skip the leading edge — the .grid-12 wrapper provides its
              // own outer padding, so the first column boundary lines up
              // with the content's left edge.
              i > 0 && "border-l border-ag-border/30",
            )}
          />
        ))}
      </div>
    </div>
  );
};
GridOverlay.displayName = "GridOverlay";

export interface GridOverlayToggleProps {
  visible: boolean;
  onToggle: () => void;
  className?: string;
}

export const GridOverlayToggle: React.FC<GridOverlayToggleProps> = ({
  visible,
  onToggle,
  className,
}) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={visible}
    aria-label={visible ? "Hide 12-column grid overlay" : "Show 12-column grid overlay"}
    className={cn(
      "numeric text-[10.5px] uppercase tracking-[0.08em] transition-token",
      "px-3 py-1.5 border border-ag-border rounded-button",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-navy focus-visible:ring-offset-2",
      visible
        ? "bg-ag-navy text-ag-cream border-ag-navy"
        : "bg-ag-white text-ag-muted hover:text-ag-navy hover:border-ag-text",
      className,
    )}
  >
    Grid
    <span aria-hidden="true" className="ml-2 text-ag-muted/60">
      {visible ? "ON" : "OFF"}
    </span>
  </button>
);
GridOverlayToggle.displayName = "GridOverlayToggle";
