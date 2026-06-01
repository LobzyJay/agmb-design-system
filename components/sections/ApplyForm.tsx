"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { WizardProgress } from "@/components/WizardProgress";
import { FormField } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Button } from "@/components/Button";

// AGMB ApplyForm — the multi-step application, from agmb-apply.html. A cream form
// shell with a step indicator, the active step's fields, and back/next nav.
// Steps: Start your application · Select your status · Documents · Confirm.

const STEPS = ["Start your application", "Select your status", "Documents", "Confirm"];

const inputCls = "w-full rounded-sm border border-navy-deep/12 bg-white px-4 py-3 text-base text-navy-deep outline-none focus:border-navy-vivid";

export interface ApplyFormProps {
  className?: string;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ className }) => {
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState("salaried");

  return (
    <div className={cn("mx-auto w-full max-w-2xl rounded-3xl bg-cream-warm p-8 md:p-12", className)}>
      <WizardProgress steps={STEPS} current={step} surface="cream" className="mb-10" />

      <div className="flex flex-col gap-6">
        <div className="flex items-baseline gap-4">
          <span className="numeric text-navy-deep" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.06em" }}>{step + 1}</span>
          <div>
            <h3 className="text-[22px] font-medium tracking-[-0.03em] text-navy-deep">{STEPS[step]}</h3>
            <p className="text-sm leading-relaxed text-text-muted-on-cream">A few details so we can route your application to the right mortgage desk.</p>
          </div>
        </div>

        {step === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Full name" surface="cream"><input className={inputCls} placeholder="Adaeze Okafor" /></FormField>
            <FormField label="Email" surface="cream"><input type="email" className={inputCls} placeholder="you@email.com" /></FormField>
            <FormField label="Phone" surface="cream"><input className={inputCls} placeholder="+234 ..." /></FormField>
            <FormField label="Target property value" surface="cream"><MoneyInput value={116500000} /></FormField>
          </div>
        )}
        {step === 1 && (
          <FormField label="Employment status" surface="cream" helper="Routes your application to NHF, M-REIF or Classic.">
            <SegmentedControl
              aria-label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "salaried", label: "Salaried" },
                { value: "self-employed", label: "Self-employed" },
                { value: "diaspora", label: "Diaspora" },
              ]}
            />
          </FormField>
        )}
        {step === 2 && (
          <ul className="flex flex-col gap-3">
            {["Valid ID (NIN / passport)", "6 months bank statements", "Proof of income", "Property documents"].map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-sm border border-navy-deep/10 bg-white px-4 py-3 text-sm text-navy-deep">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-vivid/15 text-green-deep ring-1 ring-green-deep/20">✓</span>
                {d}
              </li>
            ))}
          </ul>
        )}
        {step === 3 && (
          <div className="rounded-sm border border-navy-deep/10 bg-white p-5 text-sm leading-relaxed text-navy-deep">
            Review your details, then submit. A mortgage advisor will call within 2 working days to confirm your route and indicative rate.
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <Button variant="ghost" className="text-navy-deep" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            ← Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="secondary" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>Continue</Button>
          ) : (
            <Button variant="primary" className="bg-navy-vivid text-cream-warm">Submit application</Button>
          )}
        </div>
      </div>
    </div>
  );
};
