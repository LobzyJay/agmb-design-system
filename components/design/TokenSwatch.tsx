"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// Colour-token specimen tile.
// Anatomy: swatch + hex (numeric) + CSS-var name + role description.
// Click-to-copy on the var name. Borders applied for swatches lighter than ag-cream
// so they don't visually disappear against the cream surface of the docs page.

export interface TokenSwatchProps {
  /** CSS var name without the `--` prefix is fine — we render with `--`. */
  varName: string;
  /** Hex string (e.g. "#0A2540"). */
  hex: string;
  /** 1-line role description. */
  role: React.ReactNode;
  /** Optional Tailwind utility hint (e.g. "bg-ag-navy"). */
  utility?: string;
  /** Force a thin border around light swatches. */
  light?: boolean;
  /** When true, render a smaller compact variant (used inside semantic-token grid). */
  compact?: boolean;
  className?: string;
}

export const TokenSwatch: React.FC<TokenSwatchProps> = ({
  varName,
  hex,
  role,
  utility,
  light,
  compact,
  className,
}) => {
  const [copied, setCopied] = React.useState<"var" | "hex" | null>(null);
  const fullVar = varName.startsWith("--") ? varName : `--${varName}`;

  const copy = async (kind: "var" | "hex") => {
    try {
      await navigator.clipboard.writeText(kind === "var" ? `var(${fullVar})` : hex);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={cn(
        // v2 surface-flatness pass: swatches default flat — bg + 1px border, no shadow.
        // Hover only deepens the border to ag-text, demonstrating the same restraint.
        "flex flex-col rounded-md overflow-hidden bg-ag-white border border-ag-border",
        "transition-token hover:border-ag-text",
        className,
      )}
    >
      <div
        className={cn("relative", compact ? "h-16" : "h-24", light && "ring-1 ring-inset ring-ag-border")}
        style={{ background: hex }}
        aria-hidden="true"
      />
      <div className={cn("p-3 flex flex-col gap-1", compact && "p-2.5 gap-0.5")}>
        <button
          type="button"
          onClick={() => copy("hex")}
          className="numeric text-[11px] text-ag-text text-left hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline underline-offset-2 self-start"
          aria-label={`Copy ${hex}`}
        >
          {copied === "hex" ? "Copied" : hex}
        </button>
        <button
          type="button"
          onClick={() => copy("var")}
          className="numeric text-[11px] text-ag-muted text-left hover:text-ag-navy transition-token focus-visible:outline-none focus-visible:underline underline-offset-2 self-start truncate max-w-full"
          aria-label={`Copy var(${fullVar})`}
        >
          {copied === "var" ? "Copied" : fullVar}
        </button>
        {utility && (
          <p className="numeric text-[10px] text-ag-gold/90 mt-0.5">{utility}</p>
        )}
        <p className={cn("text-ag-muted leading-snug mt-1", compact ? "text-[11px]" : "text-xs")}>
          {role}
        </p>
      </div>
    </div>
  );
};
TokenSwatch.displayName = "TokenSwatch";
