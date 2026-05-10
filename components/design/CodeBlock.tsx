"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// Plain code block — no syntax highlighter, no new dependency.
// Renders in Inter Tight tabular figures (.numeric utility) on ag-navy bg
// with ag-cream text and a copy-to-clipboard button.
// Geist Mono dropped 2026-05-09 — Inter Tight tnum handles code samples.

export interface CodeBlockProps {
  /** Source — typically a paste-ready 5–8 line snippet. */
  code: string;
  /** Display label (e.g. "Button.tsx"). Hidden when empty. */
  label?: string;
  /** Strip leading newline + trim — convenient for backtick-literal authoring. */
  trim?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, label, trim = true, className }) => {
  const [copied, setCopied] = React.useState(false);
  const display = trim ? code.replace(/^\n+/, "").replace(/\s+$/, "") : code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(display);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // No-op — clipboard may be unavailable in non-secure contexts.
    }
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-ag-navy bg-ag-navy", className)}>
      {(label || true) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-ag-cream/15">
          <p className="numeric text-[11px] uppercase tracking-[0.08em] text-ag-cream/60">
            {label ?? "Snippet"}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="text-[11px] numeric uppercase tracking-[0.08em] text-ag-gold hover:text-ag-cream transition-token focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ag-gold focus-visible:ring-offset-1 focus-visible:ring-offset-ag-navy rounded px-1.5 py-0.5"
            aria-label="Copy code to clipboard"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed text-ag-cream numeric tracking-[0.01em]">
        <code>{display}</code>
      </pre>
    </div>
  );
};
CodeBlock.displayName = "DesignCodeBlock";
