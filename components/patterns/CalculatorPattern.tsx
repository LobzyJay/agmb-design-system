"use client";
// CalculatorPattern — composition skeleton for /design § 04.1
//
// PURPOSE: documentation, not production. A senior contributor reads this and
// immediately sees every primitive the Calculator pattern consumes, how they
// compose, and what the live behaviour looks like at doc-grade fidelity.
//
// Primitives consumed (9):
//   MoneyInput              property + deposit
//   PercentInput            interest rate (read-only display)
//   Button                  mortgage-type toggle · Apply CTA (data-surface="dark")
//   ExpressiveMoneyDisplay  indicative monthly figure
//   RepaymentSplitBar       principal vs interest split
//   LTVIndicator            LTV gauge
//   InlinePrompt            edge-case warnings (deposit > property, LTV band)
//   TextDisclaimer          regulatory subject-to-credit-assessment
//   Footnote                CBN compliance (via design/Footnote)
//
// Business logic is preserved via mortgage-calc.ts — the skeleton is honest
// about its calculations. The diff from production Calculator:
//   - No hero section padding / full-viewport height
//   - No localStorage save/share/restore
//   - No mobile sticky header (doc context, not page composition)
//   - No scroll-to cross-section hand-offs
//   - Deposit % toggle removed — kept amount-only for skeleton clarity
//   - Shortened labels; inner column layout fits a Specimen container
import * as React from "react";
import {
  MORTGAGE_TYPES,
  MORTGAGE_TYPE_LABEL,
  MORTGAGE_TYPE_RATE,
  type MortgageType,
  LOAN_TENURE_MIN,
  LOAN_TENURE_MAX,
  LOAN_TENURE_DEFAULT,
  PROPERTY_VALUE_MIN,
  PROPERTY_VALUE_MAX,
} from "@/constants/mortgage";
import { calculateMortgage, ltvBand, ltvMessage } from "@/lib/mortgage-calc";
import { formatNgn, NGN } from "@/lib/money";
import { MoneyInput } from "@/components/MoneyInput";
import { ExpressiveMoneyDisplay } from "@/components/ExpressiveMoneyDisplay";
import { LTVIndicator } from "@/components/LTVIndicator";
import { ListItem } from "@/components/ListItem";
import { Button } from "@/components/Button";
import { TextDisclaimer } from "@/components/TextDisclaimer";
import { InlinePrompt } from "@/components/InlinePrompt";
import { RepaymentSplitBar } from "@/components/RepaymentSplitBar";
import { cn } from "@/lib/cn";

const DEFAULT_PROPERTY = 80_000_000;
const DEFAULT_DEPOSIT  = 20_000_000;

export const CalculatorPattern: React.FC = () => {
  // ── State (doc-grade — no persistence, no share) ─────────────
  const [propertyValue, setPropertyValue] = React.useState<number | null>(DEFAULT_PROPERTY);
  const [deposit, setDeposit]             = React.useState<number | null>(DEFAULT_DEPOSIT);
  const [tenureYears, setTenureYears]     = React.useState<number>(LOAN_TENURE_DEFAULT);
  const [type, setType]                   = React.useState<MortgageType>("nhf");
  const [numberKey, setNumberKey]         = React.useState(0);

  const annualRate = MORTGAGE_TYPE_RATE[type];

  const depositExceedsProperty =
    propertyValue !== null &&
    deposit !== null &&
    deposit > propertyValue &&
    propertyValue > 0;

  const computed = React.useMemo(() => {
    if (propertyValue === null) return null;
    return calculateMortgage({
      propertyValue,
      deposit: deposit ?? 0,
      tenureYears,
      annualRate,
    });
  }, [propertyValue, deposit, tenureYears, annualRate]);

  // Bump numberKey on monthly change to trigger agmb-number-enter animation.
  const prevMonthlyRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (!computed) return;
    const next = Math.round(computed.monthlyRepayment);
    if (prevMonthlyRef.current !== null && prevMonthlyRef.current !== next) {
      setNumberKey((k) => k + 1);
    }
    prevMonthlyRef.current = next;
  }, [computed]);

  const ltvB    = computed ? ltvBand(computed.ltv) : null;
  const ltvMsg  = computed ? ltvMessage(computed.ltv) : null;
  const ltvIntent = ltvB === "warning" ? "error" : ltvB === "caution" ? "warning" : "info";

  // ── Render ───────────────────────────────────────────────────
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden border border-ag-border"
      aria-label="Calculator pattern skeleton"
    >
      {/* ── INPUT COLUMN ───────────────────────────────────────────
          Primitive register: MoneyInput · Slider · ListItem (radio) · Button
          Surface: ag-mesh-navy (dark) — sliders use .agmb-slider chrome */}
      <div className="bg-ag-mesh-navy text-ag-cream px-6 py-8 flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <p className="eyebrow !text-ag-gold">Calculator pattern</p>
          <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-cream/50">
            04.1 &middot; Inputs column
          </p>
        </header>

        {/* MoneyInput · property value */}
        <div className="flex flex-col gap-2">
          <MoneyInput
            label="Property value"
            value={propertyValue}
            onValueChange={setPropertyValue}
            min={PROPERTY_VALUE_MIN}
            max={PROPERTY_VALUE_MAX}
            placeholder="75,000,000"
            helper="Full purchase price before deposit."
            className="[&>label]:bi-label [&>label]:bi-sans [&>label]:text-ag-cream/70 [&>label]:text-[11px] [&>label]:uppercase [&>label]:tracking-[0.08em] [&_p:last-child]:text-ag-cream/50"
          />
          <input
            type="range"
            min={PROPERTY_VALUE_MIN}
            max={PROPERTY_VALUE_MAX}
            step={500_000}
            value={propertyValue ?? PROPERTY_VALUE_MIN}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            aria-label="Property value slider"
            className="agmb-slider"
          />
        </div>

        {/* MoneyInput · deposit */}
        <div className="flex flex-col gap-2">
          <MoneyInput
            label="Deposit"
            value={deposit}
            onValueChange={setDeposit}
            min={0}
            max={propertyValue ?? PROPERTY_VALUE_MAX}
            placeholder="15,000,000"
            helper="Amount paid upfront."
            className="[&>label]:bi-label [&>label]:bi-sans [&>label]:text-ag-cream/70 [&>label]:text-[11px] [&>label]:uppercase [&>label]:tracking-[0.08em] [&_p:last-child]:text-ag-cream/50"
          />
          <input
            type="range"
            min={0}
            max={propertyValue ?? PROPERTY_VALUE_MAX}
            step={100_000}
            value={deposit ?? 0}
            onChange={(e) => setDeposit(Number(e.target.value))}
            aria-label="Deposit slider"
            className="agmb-slider"
          />
        </div>

        {/* Slider · tenure */}
        <div className="flex flex-col gap-2">
          <label className="bi-label bi-sans text-ag-cream/70 text-[11px] uppercase tracking-[0.08em] flex items-baseline justify-between">
            Tenure
            <span className="numeric text-ag-cream text-base normal-case tracking-normal">
              {tenureYears} <span className="text-ag-cream/50 text-sm">yrs</span>
            </span>
          </label>
          <input
            type="range"
            min={LOAN_TENURE_MIN}
            max={LOAN_TENURE_MAX}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            aria-label="Tenure slider"
            className="agmb-slider"
          />
          <div className="flex justify-between text-[11px] text-ag-cream/40 numeric">
            <span>{LOAN_TENURE_MIN}</span>
            <span>{LOAN_TENURE_MAX}</span>
          </div>
        </div>

        {/* Button group · mortgage type toggle (ListItem radio) */}
        <fieldset className="flex flex-col gap-2">
          <legend className="bi-label bi-sans text-ag-cream/70 text-[11px] uppercase tracking-[0.08em] mb-2">
            Mortgage type
          </legend>
          <div role="radiogroup" aria-label="Mortgage type" className="flex flex-col gap-2">
            {MORTGAGE_TYPES.filter((t) => t !== "construction" && t !== "rei").map((t) => (
              <ListItem
                key={t}
                variant="radio"
                name="calc-mortgage-type"
                value={t}
                title={MORTGAGE_TYPE_LABEL[t]}
                helper={`${MORTGAGE_TYPE_RATE[t].toFixed(1)}%`}
                selected={type === t}
                onSelect={() => setType(t)}
                className="data-[selected]:!bg-ag-cream data-[selected]:!border-ag-navy-vivid"
              />
            ))}
          </div>
        </fieldset>

        {/* Indicative rate · read-only */}
        <div className="flex items-baseline justify-between border-t border-ag-cream/10 pt-4">
          <span className="bi-label bi-sans text-ag-cream/60 text-[11px] uppercase tracking-[0.08em]">
            Indicative rate
          </span>
          <span className="numeric text-ag-cream text-lg">{annualRate.toFixed(1)}%</span>
        </div>

        {/* TextDisclaimer · regulatory */}
        <TextDisclaimer rule inverse>
          Indicative. Subject to credit assessment and prevailing CBN guidelines.
        </TextDisclaimer>
      </div>

      {/* ── OUTPUT COLUMN ──────────────────────────────────────────
          Primitive register:
            data-surface="dark" strip · ExpressiveMoneyDisplay
            RepaymentSplitBar · LTVIndicator · InlinePrompt
            Button (Apply CTA, dark-surface) */}
      <div
        className="bg-ag-cream px-6 py-8 flex flex-col gap-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <header className="flex flex-col gap-1">
          <p className="eyebrow">Your scenario</p>
          <p className="bi-label bi-sans text-[13px] tracking-[-0.01em] text-ag-navy font-semibold">
            {MORTGAGE_TYPE_LABEL[type]}&nbsp;&middot;&nbsp;{tenureYears}&nbsp;years
          </p>
          <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted">
            04.1 &middot; Outputs column
          </p>
        </header>

        {/* InlinePrompt · edge-case warning */}
        {computed && depositExceedsProperty && (
          <InlinePrompt intent="error">
            Deposit exceeds property value. Reduce your deposit or increase the property value.
          </InlinePrompt>
        )}

        {computed !== null && (() => {
          return (
            <>
              {/* data-surface="dark" strip · ExpressiveMoneyDisplay (indicative monthly) */}
              <div
                data-surface="dark"
                className="rounded-card bg-ag-navy-soft border-t border-ag-navy/[0.12] px-6 py-6 flex flex-col gap-4 shadow-[0_8px_32px_rgb(6_26_46_/_0.18)]"
                style={{
                  "--comp-cta-primary-bg": "var(--ag-cream-warm)",
                  "--comp-cta-primary-fg": "var(--ag-navy)",
                  "--comp-text-muted-on-surface": "var(--ag-cream-warm)",
                  "--comp-text-primary-on-surface": "var(--ag-cream)",
                } as React.CSSProperties}
              >
                <p
                  className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] leading-none"
                  style={{ color: "var(--comp-text-muted-on-surface, var(--ag-cream-warm))" }}
                >
                  Indicative monthly
                </p>

                {/* ExpressiveMoneyDisplay · hero number */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p
                    key={numberKey}
                    className="agmb-number-enter numeric tabular-nums tracking-[-0.02em] text-5xl leading-none text-ag-cream font-semibold"
                  >
                    <span className="text-ag-cream/60 text-3xl font-normal mr-0.5">{NGN}</span>
                    {formatNgn(Math.round(computed.monthlyRepayment))}
                  </p>
                  <span className="text-ag-cream/50 text-sm leading-none">/&thinsp;month</span>
                </div>

                {/* Button · Apply CTA inside data-surface="dark" */}
                <div className="flex items-center justify-between pt-1 gap-3 flex-wrap">
                  <span className="text-ag-cream/40 text-[11px] leading-snug">
                    Subject to credit assessment&#xB9;
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    aria-label="Start your application — opens the application wizard"
                  >
                    Start your application&nbsp;&#8594;
                  </Button>
                </div>
              </div>

              {/* RepaymentSplitBar · principal vs interest */}
              <div className="flex flex-col gap-2">
                <p className="bi-label bi-sans text-[11px] uppercase tracking-[0.08em] text-ag-muted">
                  Principal vs interest breakdown
                </p>
                <RepaymentSplitBar
                  principal={computed.loanAmount}
                  totalInterest={computed.totalInterest}
                />
              </div>

              {/* Summary grid · ExpressiveMoneyDisplay (totals) + LTVIndicator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <ExpressiveMoneyDisplay
                  value={Math.round(computed.totalInterest)}
                  size="m"
                  label="Total interest"
                  compact
                />
                <ExpressiveMoneyDisplay
                  value={Math.round(computed.totalRepayment)}
                  size="m"
                  label="Total repayment"
                  compact
                />
                <ExpressiveMoneyDisplay
                  value={Math.round(computed.loanAmount)}
                  size="m"
                  label="Loan amount"
                  compact
                />
                {/* LTVIndicator */}
                <div className="flex flex-col gap-1.5">
                  <p className="eyebrow !text-ag-navy">Loan-to-value</p>
                  <LTVIndicator value={Math.round(computed.ltv)} />
                </div>
              </div>

              {/* InlinePrompt · LTV band warning */}
              {ltvMsg && (
                <InlinePrompt intent={ltvIntent as "warning" | "error" | "info"}>
                  {ltvMsg}
                </InlinePrompt>
              )}

              <div className="h-px bg-ag-border" />

              {/* TextDisclaimer · Footnote (CBN compliance) */}
              <div className="flex flex-col gap-3">
                <TextDisclaimer rule>
                  Indicative only. Final repayment set in offer letter after credit assessment.
                </TextDisclaimer>
                <p className="text-[11px] text-ag-muted leading-snug pl-3 border-l-2 border-ag-gold/40">
                  &#xB9;&nbsp;Indicative means this figure is for illustration only. Subject to full credit
                  assessment per CBN guidelines. Not a mortgage offer.
                </p>
              </div>
            </>
          );
        })()}

        {computed === null && (
          <InlinePrompt intent="warning">
            Enter a property value to see the output.
          </InlinePrompt>
        )}
      </div>
    </div>
  );
};
CalculatorPattern.displayName = "CalculatorPattern";
