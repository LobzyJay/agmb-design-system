"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB Button — the site's .cta system.
//   primary   = cream-warm fill, navy-deep text (the main CTA)
//   secondary = navy-vivid fill, cream-warm text
//   nav       = cream-warm pill (compact, rounded-full) — the nav CTA
//   ghost     = transparent, current text
// Rest/hover/active mirror the shared .cta block: inset+drop shadow at rest,
// lift + deeper shadow on hover, slight scale on press, green/gold focus ring.

export type ButtonVariant = "primary" | "secondary" | "nav" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Render as an <a> when href is set. */
  href?: string;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-cream-warm text-navy-deep shadow-[var(--shadow-button-rest)] hover:shadow-[var(--shadow-button-hover)] hover:-translate-y-0.5",
  secondary: "bg-navy-vivid text-cream-warm shadow-[var(--shadow-button-rest)] hover:shadow-[var(--shadow-button-hover)] hover:-translate-y-0.5",
  nav: "bg-cream-warm text-navy-deep px-5 py-2.5 rounded-pill text-sm",
  ghost: "bg-transparent text-current hover:opacity-80",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", href, className, children, ...rest },
  ref,
) {
  const base =
    "inline-flex items-center justify-center gap-3 px-7 py-[18px] rounded-md " +
    "font-[500] text-base tracking-[-0.005em] cursor-pointer select-none " +
    "transition-[transform,box-shadow,background-color,color] duration-[180ms] ease-[var(--ease-standard)] " +
    "active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-vivid focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
    "disabled:opacity-50 disabled:pointer-events-none";
  const cls = cn(base, VARIANT[variant], className);

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {children}
    </button>
  );
});
