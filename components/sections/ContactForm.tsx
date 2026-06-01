import * as React from "react";
import { cn } from "@/lib/cn";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";

// AGMB ContactForm — the contact .contact-twin: an info panel (eyebrow, heading
// with serif accent, contact rows) beside a form panel.

const inputCls = "w-full rounded-sm border border-navy-deep/12 bg-white px-4 py-3 text-base text-navy-deep outline-none focus:border-navy-vivid";

export interface ContactRow {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
}

export interface ContactFormProps {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  copy?: React.ReactNode;
  rows: ContactRow[];
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ eyebrow, heading, copy, rows, className }) => (
  <div className={cn("grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2", className)}>
    {/* Info panel — navy */}
    <div className="flex flex-col gap-6 bg-navy-deep p-10 text-cream-warm md:p-12">
      {eyebrow && <span className="eyebrow text-gold-vivid">{eyebrow}</span>}
      <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.04em]">{heading}</h3>
      {copy && <p className="text-sm leading-relaxed text-text-muted-on-navy">{copy}</p>}
      <dl className="mt-2 flex flex-col gap-5">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1 border-t border-cream-warm/10 pt-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint-on-navy">{r.label}</dt>
            <dd className="text-base text-cream-warm">{r.value}</dd>
            {r.sub && <dd className="text-xs text-text-muted-on-navy">{r.sub}</dd>}
          </div>
        ))}
      </dl>
    </div>

    {/* Form panel — cream */}
    <div className="flex flex-col gap-5 bg-cream-warm p-10 md:p-12">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="First name" surface="cream"><input className={inputCls} placeholder="Adaeze" /></FormField>
        <FormField label="Last name" surface="cream"><input className={inputCls} placeholder="Okafor" /></FormField>
      </div>
      <FormField label="Email" surface="cream"><input type="email" className={inputCls} placeholder="you@email.com" /></FormField>
      <FormField label="How can we help?" surface="cream">
        <textarea rows={4} className={cn(inputCls, "resize-none")} placeholder="Tell us about the property and your situation…" />
      </FormField>
      <Button variant="secondary" className="self-start">Send message</Button>
    </div>
  </div>
);
