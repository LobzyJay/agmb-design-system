// AGMB mortgage eligibility — DTI / LTV / NHF ratio calculations.
// Spec: PRD §5.3 wizard step 5 — these run on submit, not on every keystroke.
// Pure functions; no side effects. Used by Utility 3 wizard.
//
// References:
//   DTI = Debt-to-Income — total monthly debt / monthly gross income.
//   LTV = Loan-to-Value — loan amount / property value.
//   NHF — Nigerians who contribute ≥6 months to the National Housing Fund are
//   eligible for the federal NHF mortgage scheme (subsidised 6% rate).
//
// AGMB rules (per PRD §5.3 + indicative guidance):
//   - DTI ≤ 35% — safe; advisor will likely approve.
//   - DTI 35–45% — caution; advisor may request additional collateral.
//   - DTI > 45% — fail; reduce debt or increase income before applying.
//   - LTV ≤ 80% — safe (most products).
//   - LTV 80–90% — caution.
//   - LTV > 90% — fail (most products reject).

import { LTV_SAFE_MAX, LTV_CAUTION_MAX } from "@/constants/mortgage";

export interface EligibilityInputs {
  monthlyGrossIncome: number;
  monthlyDebtObligations: number;
  propertyValue: number;
  loanAmount: number;
  /** Months of NHF contribution. <6 = ineligible for NHF product. */
  nhfMonths: number;
}

export interface EligibilityResult {
  dti: number;        // 0–100+ percentage
  ltv: number;        // 0–100+ percentage
  dtiBand: "safe" | "caution" | "fail";
  ltvBand: "safe" | "caution" | "fail";
  nhfEligible: boolean;
  /** Aggregate verdict — `pass` if both DTI and LTV are safe. */
  verdict: "pass" | "review" | "fail";
  /** Human-facing summary lines for the SuccessScreen / Summary primitive. */
  summary: string[];
}

const DTI_SAFE_MAX = 35;
const DTI_CAUTION_MAX = 45;

function band(value: number, safe: number, caution: number): "safe" | "caution" | "fail" {
  if (value <= safe) return "safe";
  if (value <= caution) return "caution";
  return "fail";
}

export function assessEligibility(inputs: EligibilityInputs): EligibilityResult {
  const { monthlyGrossIncome, monthlyDebtObligations, propertyValue, loanAmount, nhfMonths } = inputs;

  const dti = monthlyGrossIncome > 0
    ? (monthlyDebtObligations / monthlyGrossIncome) * 100
    : 0;
  const ltv = propertyValue > 0
    ? (loanAmount / propertyValue) * 100
    : 0;

  const dtiBand = band(dti, DTI_SAFE_MAX, DTI_CAUTION_MAX);
  const ltvBand = band(ltv, LTV_SAFE_MAX, LTV_CAUTION_MAX);
  const nhfEligible = nhfMonths >= 6;

  let verdict: EligibilityResult["verdict"];
  if (dtiBand === "fail" || ltvBand === "fail") verdict = "fail";
  else if (dtiBand === "caution" || ltvBand === "caution") verdict = "review";
  else verdict = "pass";

  const summary: string[] = [];
  summary.push(`Debt-to-income: ${dti.toFixed(1)}% (${dtiBand}).`);
  summary.push(`Loan-to-value: ${ltv.toFixed(1)}% (${ltvBand}).`);
  summary.push(nhfEligible
    ? `NHF eligibility: confirmed (${nhfMonths} months contributed).`
    : `NHF eligibility: requires 6+ months of contribution (you have ${nhfMonths}).`);

  return { dti, ltv, dtiBand, ltvBand, nhfEligible, verdict, summary };
}

// Format-only validators (PRD §5.3 — no NIBSS API in Phase 1).
export const BVN_FORMAT = /^\d{11}$/;
export const NIN_FORMAT = /^\d{11}$/;

export function isValidBvnFormat(s: string): boolean {
  return BVN_FORMAT.test(s.replace(/\s/g, ""));
}

export function isValidNinFormat(s: string): boolean {
  return NIN_FORMAT.test(s.replace(/\s/g, ""));
}
