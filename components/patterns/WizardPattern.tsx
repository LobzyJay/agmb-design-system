"use client";
// WizardPattern — composition skeleton for /design § 04.2
//
// PURPOSE: documentation, not production. Shows every primitive the Wizard
// pattern consumes and how they compose into a multi-step form. The full
// 5-step NHF eligibility machine in sections/Wizard.tsx is replaced here by
// a lean 3-step scaffold (About you · Finance · Review) that still exercises
// every primitive in the list.
//
// Primitives consumed (9):
//   WizardProgressBar   step progress bar
//   WizardStepDots      step pagination dots
//   StepCard            step container card
//   FormField           per-step text inputs
//   MoneyInput          financial value inputs
//   ListItem (radio)    mortgage type selector
//   Button              next / back navigation
//   InlinePrompt        validation feedback
//   ProgressScreen      submission terminal
//   SuccessScreen       acceptance terminal (uses GoldShader internally)
//
// Reduction notes vs production Wizard:
//   - Steps reduced from 5 to 3 — enough to show WizardProgressBar + step
//     transitions without shipping the full NHF eligibility checks, employment
//     sub-tree, and document-upload step (which required its own state machine).
//   - sessionStorage persistence removed — skeleton is reset on every mount.
//   - AnimatePresence step transition retained (demonstrates primitive).
//   - handleSubmit is a stub: 800ms delay then SuccessScreen. No server call.
//   - ReviewStep shows Summary pattern inline (skeleton label row approach).
import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FormField } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import { ListItem } from "@/components/ListItem";
import { Button } from "@/components/Button";
import { TextDisclaimer } from "@/components/TextDisclaimer";
import { InlinePrompt } from "@/components/InlinePrompt";
import { SuccessScreen } from "@/components/SuccessScreen";
import { ProgressScreen } from "@/components/ProgressScreen";
import { StepCard } from "@/components/StepCard";
import { WizardProgressBar, WizardStepDots, type WizardStep } from "@/components/WizardProgress";
import {
  MORTGAGE_TYPES,
  MORTGAGE_TYPE_LABEL,
  MORTGAGE_TYPE_RATE,
  type MortgageType,
} from "@/constants/mortgage";
import { formatNgn } from "@/lib/money";

// ── Step definitions (skeleton — 3 steps) ────────────────────────
const STEPS: WizardStep[] = [
  { id: "personal",  label: "About you" },
  { id: "finance",   label: "Finance" },
  { id: "review",    label: "Review" },
];

interface SkeletonState {
  fullName:      string;
  email:         string;
  mortgageType:  MortgageType;
  propertyValue: number | null;
  deposit:       number | null;
}

const INITIAL: SkeletonState = {
  fullName:      "",
  email:         "",
  mortgageType:  "nhf",
  propertyValue: null,
  deposit:       null,
};

type FieldErrors = Partial<Record<keyof SkeletonState, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step: number, s: SkeletonState): FieldErrors {
  const errs: FieldErrors = {};
  if (step === 0) {
    if (s.fullName.trim().length < 2) errs.fullName = "Full name required.";
    if (!EMAIL_RE.test(s.email))       errs.email    = "Valid email required.";
  } else if (step === 1) {
    if (!s.propertyValue || s.propertyValue <= 0) errs.propertyValue = "Property value required.";
    if (s.deposit === null) errs.deposit = "Enter 0 if no deposit.";
  }
  return errs;
}

// Framer step variants — honours prefers-reduced-motion
const stepVariants = {
  enter:  { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0  },
  exit:   { opacity: 0, x: -40 },
};

function generateReference(): string {
  const year   = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10_000_000).toString().padStart(7, "0");
  return `AGMB-${year}-${random}`;
}

export const WizardPattern: React.FC = () => {
  const reduce = useReducedMotion();

  const [state, setState]     = React.useState<SkeletonState>(INITIAL);
  const [stepIdx, setStepIdx] = React.useState(0);
  const [errors, setErrors]   = React.useState<FieldErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [status, setStatus]   = React.useState<"editing" | "submitting" | "success">("editing");
  const [reference, setReference] = React.useState<string | null>(null);

  const update = <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  const onBlur = (key: keyof SkeletonState) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateStep(stepIdx, state));
  };

  const next = () => {
    const errs = validateStep(stepIdx, state);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setTouched((t) => ({
        ...t,
        ...Object.fromEntries(Object.keys(errs).map((k) => [k, true])),
      }));
      return;
    }
    setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
    setErrors({});
    setTouched({});
  };

  const back = () => {
    setStepIdx((i) => Math.max(i - 1, 0));
    setErrors({});
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    // Skeleton stub — 800ms delay, then SuccessScreen
    await new Promise((r) => setTimeout(r, 800));
    setReference(generateReference());
    setStatus("success");
  };

  const percent = stepIdx / (STEPS.length - 1);

  // ── Terminal states ───────────────────────────────────────────
  if (status === "submitting") {
    return (
      <div className="rounded-lg overflow-hidden border border-ag-border bg-ag-cream">
        <ProgressScreen
          step={`Step ${stepIdx + 1} of ${STEPS.length}`}
          title="Sending your application."
          description="Calculating indicative DTI and LTV ratios. Don't refresh."
        />
      </div>
    );
  }

  if (status === "success" && reference) {
    return (
      <div className="rounded-lg overflow-hidden border border-ag-border bg-ag-cream py-8">
        <SuccessScreen
          title="Application received."
          reference={reference}
          steps={[
            "A mortgage advisor will call within 2 working days.",
            "We will email your offer letter once credit assessment clears.",
            "Sign the offer to lock the indicative rate.",
          ]}
          actions={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setState(INITIAL);
                setStepIdx(0);
                setStatus("editing");
                setReference(null);
              }}
            >
              Reset skeleton
            </Button>
          }
        />
      </div>
    );
  }

  // ── Editing path ─────────────────────────────────────────────
  return (
    <div
      className="rounded-lg overflow-hidden border border-ag-border bg-ag-cream p-6 md:p-8 flex flex-col gap-6"
      aria-label="Wizard pattern skeleton"
    >
      <header className="flex flex-col gap-1">
        <p className="eyebrow !text-ag-navy">Wizard pattern</p>
        <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted">
          04.2 &middot; {STEPS.length}-step skeleton &middot; WizardProgressBar + WizardStepDots + StepCard
        </p>
      </header>

      {/* WizardProgressBar + WizardStepDots */}
      <div className="bg-ag-white border border-ag-border rounded-lg p-5">
        <WizardStepDots
          steps={STEPS}
          currentIndex={stepIdx}
          onStepClick={(_, i) => i < stepIdx && setStepIdx(i)}
        />
        <WizardProgressBar
          value={percent}
          label={`Step ${stepIdx + 1} of ${STEPS.length}`}
          className="mt-4"
        />
      </div>

      {/* StepCard + AnimatePresence step transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stepIdx}
          variants={reduce ? undefined : stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.35 }}
        >
          {/* StepCard · step indicator (skeleton of primitive usage) */}
          <StepCard
            number={stepIdx + 1}
            title={STEPS[stepIdx].label}
            active
          />

          {/* Step form container — plain card; StepCard above documents the primitive */}
          <div className="bg-ag-white border border-ag-border rounded-lg p-6 md:p-8 mt-3 min-h-[320px]">
            {/* Step 0 · About you — FormField */}
            {stepIdx === 0 && (
              <div className="flex flex-col gap-5">
                <FormField
                  label="Full name"
                  required
                  value={state.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  onBlur={() => onBlur("fullName")}
                  error={touched.fullName ? errors.fullName : undefined}
                  autoComplete="name"
                />
                <FormField
                  label="Email"
                  required
                  type="email"
                  value={state.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => onBlur("email")}
                  error={touched.email ? errors.email : undefined}
                  autoComplete="email"
                />
                {/* InlinePrompt · step-level validation */}
                {Object.keys(errors).length > 0 && Object.values(touched).some(Boolean) && (
                  <InlinePrompt intent="error">
                    Fix the errors above to continue.
                  </InlinePrompt>
                )}
              </div>
            )}

            {/* Step 1 · Finance — MoneyInput + ListItem radio */}
            {stepIdx === 1 && (
              <div className="flex flex-col gap-5">
                {/* ListItem radio · mortgage type */}
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-sm font-medium text-ag-text mb-1">Mortgage type</legend>
                  <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MORTGAGE_TYPES.map((t) => (
                      <ListItem
                        key={t}
                        variant="radio"
                        name="wizard-mortgage-type"
                        title={MORTGAGE_TYPE_LABEL[t]}
                        helper={`${MORTGAGE_TYPE_RATE[t].toFixed(1)}%`}
                        selected={state.mortgageType === t}
                        onSelect={() => update("mortgageType", t)}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* MoneyInput · property + deposit */}
                <MoneyInput
                  label="Property value"
                  required
                  value={state.propertyValue}
                  onValueChange={(v) => update("propertyValue", v)}
                  onBlur={() => onBlur("propertyValue")}
                  error={touched.propertyValue ? errors.propertyValue : undefined}
                  min={1_000_000}
                  max={500_000_000}
                />
                <MoneyInput
                  label="Deposit"
                  value={state.deposit}
                  onValueChange={(v) => update("deposit", v)}
                  onBlur={() => onBlur("deposit")}
                  error={touched.deposit ? errors.deposit : undefined}
                  min={0}
                  max={state.propertyValue ?? undefined}
                  helper="Enter 0 if no deposit."
                />

                <TextDisclaimer rule>
                  All figures indicative. Subject to credit assessment per CBN guidelines.
                </TextDisclaimer>
              </div>
            )}

            {/* Step 2 · Review — inline summary table */}
            {stepIdx === 2 && (
              <div className="flex flex-col gap-5">
                <p className="text-sm text-ag-muted">
                  Check everything reads right. Use Back to correct a step.
                </p>
                {/* Summary rows — inline skeleton (production Wizard uses <Summary groups={...} />) */}
                <div className="border border-ag-border rounded-lg overflow-hidden">
                  {[
                    { label: "Full name",      value: state.fullName || "—" },
                    { label: "Email",          value: state.email    || "—" },
                    { label: "Mortgage type",  value: MORTGAGE_TYPE_LABEL[state.mortgageType] },
                    { label: "Property value", value: state.propertyValue ? formatNgn(state.propertyValue, { prefix: true }) : "—" },
                    { label: "Deposit",        value: state.deposit !== null ? formatNgn(state.deposit, { prefix: true }) : "—" },
                    { label: "Rate",           value: `${MORTGAGE_TYPE_RATE[state.mortgageType].toFixed(1)}% (indicative)` },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-baseline justify-between gap-4 px-5 py-3",
                        i > 0 && "border-t border-ag-border",
                      )}
                    >
                      <span className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted shrink-0">
                        {row.label}
                      </span>
                      <span className="numeric text-sm text-ag-navy text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
                <TextDisclaimer rule>
                  On submit we calculate indicative DTI and LTV. Final terms subject to credit assessment.
                </TextDisclaimer>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step navigation — Button (back ghost · next primary) */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={back} disabled={stepIdx === 0}>
          &#8592; Back
        </Button>
        {stepIdx < STEPS.length - 1 ? (
          <Button variant="primary" onClick={next}>Continue &#8594;</Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>Submit application</Button>
        )}
      </div>
    </div>
  );
};
WizardPattern.displayName = "WizardPattern";

// ── Inline cn utility import ──────────────────────────────────────
// StepCard renders children in a styled card container. We need cn for
// the review table row separators above.
import { cn } from "@/lib/cn";
