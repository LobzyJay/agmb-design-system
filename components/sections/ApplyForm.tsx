"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

// AGMB ApplyForm — uses the site's verbatim .form-shell / .progress / .field-input
// CSS. A cream shell with a pill step indicator, the active step's fields, and
// back/next nav. Steps: Start · Status · Documents · Confirm.

const STEPS = ["Start your application", "Select your status", "Documents", "Confirm"];

export interface ApplyFormProps {
  className?: string;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ className }) => {
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState("salaried");

  return (
    <div className={cn("form-shell", className)}>
      <div className="progress">
        {STEPS.map((s, i) => (
          <span key={s} className={cn("progress__item", i === step && "progress--active", i < step && "progress--done")}>
            {i < step && <span aria-hidden>✓</span>}
            {i + 1}. {s}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex items-baseline gap-4">
          <span style={{ font: "500 64px/1 var(--font-numeric)", letterSpacing: "-0.06em", color: "var(--navy-deep)", fontVariantNumeric: "tabular-nums" }}>{step + 1}</span>
          <div>
            <h3 style={{ font: "500 22px/120% 'Inter', sans-serif", letterSpacing: "-0.03em", color: "var(--navy-deep)" }}>{STEPS[step]}</h3>
            <p style={{ font: "400 14px/155% 'Inter', sans-serif", color: "rgba(6,26,46,0.6)", maxWidth: 360 }}>A few details so we can route your application to the right mortgage desk.</p>
          </div>
        </div>

        {step === 0 && (
          <div className="field-row-2">
            <div className="field-group"><label className="field-label" htmlFor="af-name">Full name</label><input className="field-input" id="af-name" placeholder="Adaeze Okafor" /></div>
            <div className="field-group"><label className="field-label" htmlFor="af-email">Email</label><input className="field-input" id="af-email" type="email" placeholder="you@email.com" /></div>
            <div className="field-group"><label className="field-label" htmlFor="af-phone">Phone</label><input className="field-input" id="af-phone" placeholder="+234 …" /></div>
            <div className="field-group"><label className="field-label" htmlFor="af-prop">Target property value</label><input className="field-input" id="af-prop" placeholder="₦116,500,000" /></div>
          </div>
        )}
        {step === 1 && (
          <div className="field-group">
            <label className="field-label">Employment status</label>
            <div className="seg" style={{ alignSelf: "flex-start" }}>
              {["salaried", "self-employed", "diaspora"].map((s) => (
                <button key={s} className={cn("seg__item", s === status && "seg__item--active")} onClick={() => setStatus(s)} style={s === status ? { background: "var(--navy-deep)" } : undefined}>
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            {["Valid ID (NIN / passport)", "6 months bank statements", "Proof of income", "Property documents"].map((d) => (
              <div key={d} className="field-input" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--green-deep)" }}>✓</span> {d}
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <p className="field-input" style={{ lineHeight: 1.55 }}>
            Review your details, then submit. A mortgage advisor will call within 2 working days to confirm your route and indicative rate.
          </p>
        )}

        <div className="form-nav">
          <button className="cta cta--ghost" style={{ color: "var(--navy-deep)", opacity: step === 0 ? 0.4 : 1, padding: "18px 8px" }} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>← Back</button>
          {step < STEPS.length - 1
            ? <button className="cta cta--secondary" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>Continue</button>
            : <button className="cta cta--secondary">Submit application</button>}
        </div>
      </div>
    </div>
  );
};
