import * as React from "react";
import { asset } from "@/lib/site-config";

// AGMB Logo — the brand marks the site ships in assets/images. Wordmark (white /
// coloured) + icon (white). Rendered as <img> so it works under static export.

export type LogoVariant = "wordmark-white" | "wordmark-coloured" | "icon-white";

const FILES: Record<LogoVariant, string> = {
  "wordmark-white": "/brand/agmb-wordmark-white.svg",
  "wordmark-coloured": "/brand/agmb-wordmark-coloured.svg",
  "icon-white": "/brand/agmb-icon-white.svg",
};

export interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  label?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = "wordmark-white", height = 28, className, label = "AG Mortgage Bank" }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={asset(FILES[variant])} alt={label} height={height} style={{ height }} className={className} />
);
