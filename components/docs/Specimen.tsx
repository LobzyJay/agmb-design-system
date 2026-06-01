import * as React from "react";
import { cn } from "@/lib/cn";

// Doc specimen frame — a labelled card that presents a component/example with an
// optional surface (the example renders on its correct brand surface). Doc chrome
// is the dark brand skin; the example sits on its own surface inside.

export interface SpecimenProps {
  name: React.ReactNode;
  description?: React.ReactNode;
  /** Background the example renders on. */
  surface?: "navy" | "navy-2" | "cream" | "black" | "none";
  children: React.ReactNode;
  className?: string;
}

const SURFACE: Record<NonNullable<SpecimenProps["surface"]>, string> = {
  navy: "bg-navy-deep",
  "navy-2": "bg-navy",
  cream: "bg-cream-warm",
  black: "bg-black",
  none: "",
};

export const Specimen: React.FC<SpecimenProps> = ({ name, description, surface = "navy-2", children, className }) => (
  <section className={cn("flex flex-col gap-4", className)}>
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-cream-warm" style={{ fontFamily: "var(--font-sans)" }}>{name}</h3>
      {description && <p className="max-w-2xl text-sm leading-relaxed text-text-muted-on-navy">{description}</p>}
    </div>
    <div className={cn("flex flex-wrap items-center gap-6 rounded-xl border border-cream-warm/10 p-8", SURFACE[surface])}>
      {children}
    </div>
  </section>
);

// A titled group of specimens with a hairline header.
export const SpecimenGroup: React.FC<{ id?: string; eyebrow: React.ReactNode; title: React.ReactNode; children: React.ReactNode }> = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-24 flex flex-col gap-10">
    <header className="flex flex-col gap-3">
      <span className="eyebrow text-gold-vivid">{eyebrow}</span>
      <span aria-hidden className="block h-px w-full bg-cream-warm/10" />
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-cream-warm" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
    </header>
    {children}
  </section>
);
