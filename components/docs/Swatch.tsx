import * as React from "react";

// Doc colour swatch — shows a brand colour with its token name + hex.

export interface SwatchProps {
  name: string;
  token: string;
  hex: string;
  light?: boolean;
}

export const Swatch: React.FC<SwatchProps> = ({ name, token, hex, light }) => (
  <div className="flex w-40 flex-col overflow-hidden rounded-lg border border-cream-warm/10">
    <div className="h-20 w-full" style={{ background: hex, boxShadow: light ? "inset 0 0 0 1px rgba(6,26,46,0.08)" : undefined }} />
    <div className="flex flex-col gap-0.5 bg-navy p-3">
      <span className="text-xs font-medium text-cream-warm">{name}</span>
      <span className="text-[10.5px] text-text-muted-on-navy" style={{ fontFamily: "var(--font-numeric)" }}>{token}</span>
      <span className="text-[10.5px] uppercase text-text-faint-on-navy" style={{ fontFamily: "var(--font-numeric)" }}>{hex}</span>
    </div>
  </div>
);
