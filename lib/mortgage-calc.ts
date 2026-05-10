// AGMB mortgage calculator — pure formula utilities.
// Spec: PRD §5.1 — vanilla JS, client-side, no library, <16ms re-render budget.
//
// Formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]
//   M = monthly repayment
//   P = principal (loan amount, not property value)
//   r = monthly interest rate (annual rate / 12 / 100)
//   n = total months (tenure years × 12)
//
// Edge cases: 0 interest reduces to M = P/n. 0 principal → 0 repayment.

import { LTV_SAFE_MAX, LTV_CAUTION_MAX } from "@/constants/mortgage";

export interface MortgageInputs {
  /** Property value in NGN (₦). */
  propertyValue: number;
  /** Deposit in NGN — what the borrower pays upfront. */
  deposit: number;
  /** Tenure in years. PRD §5.1: 5–30. */
  tenureYears: number;
  /** Annual interest rate as a percentage (e.g. 9.5 for 9.5%). */
  annualRate: number;
}

export interface MortgageOutputs {
  /** Loan principal — propertyValue minus deposit (clamped ≥ 0). */
  loanAmount: number;
  /** Loan-to-value as a percentage (0–100+). */
  ltv: number;
  /** Indicative monthly repayment in NGN. */
  monthlyRepayment: number;
  /** Total interest paid across the full tenure. */
  totalInterest: number;
  /** Total repayment = loanAmount + totalInterest. */
  totalRepayment: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageOutputs {
  const { propertyValue, deposit, tenureYears, annualRate } = inputs;

  const loanAmount = Math.max(0, propertyValue - deposit);
  const ltv = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;

  const totalMonths = Math.max(1, Math.round(tenureYears * 12));
  const monthlyRate = annualRate / 100 / 12;

  let monthlyRepayment = 0;
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      // Edge case: zero-interest reduces to straight-line repayment.
      monthlyRepayment = loanAmount / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyRepayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    }
  }

  const totalRepayment = monthlyRepayment * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - loanAmount);

  return {
    loanAmount,
    ltv,
    monthlyRepayment,
    totalInterest,
    totalRepayment,
  };
}

// LTV band — green / amber / red — drives <LTVIndicator>.
export function ltvBand(ltv: number): "safe" | "caution" | "warning" {
  if (ltv <= LTV_SAFE_MAX) return "safe";
  if (ltv <= LTV_CAUTION_MAX) return "caution";
  return "warning";
}

// LTV warning copy per band — surfaces in <InlinePrompt>.
export function ltvMessage(ltv: number): string | null {
  if (ltv <= LTV_SAFE_MAX) return null;
  if (ltv <= LTV_CAUTION_MAX) {
    return "Above 80% LTV — most products charge a higher indicative rate.";
  }
  return "Above 90% LTV — most products reject. Consider increasing your deposit.";
}
