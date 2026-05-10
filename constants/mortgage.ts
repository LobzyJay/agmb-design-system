// AGMB — single source of truth for mortgage taxonomies.
// LESSONS §3: never duplicate enums. A rename here surfaces compile errors
// in every consumer (calculator, enquiry, wizard, product cards) until fixed.

export const MORTGAGE_TYPES = ["nhf", "mreif", "commercial", "construction", "rei"] as const;
export type MortgageType = (typeof MORTGAGE_TYPES)[number];

export const MORTGAGE_TYPE_LABEL: Record<MortgageType, string> = {
  nhf: "NHF Mortgage Loan",
  mreif: "M-REIF Mortgage",
  commercial: "Commercial Mortgage",
  construction: "Construction Finance",
  rei: "Real Estate Investment Finance",
};

// Indicative rates only — every surface using these must pair with <TextDisclaimer>
// per PRD §3.5.3 / §5.1: "Subject to credit assessment and CBN guidelines."
export const MORTGAGE_TYPE_RATE: Record<MortgageType, number> = {
  nhf: 6.0,
  mreif: 9.5,
  commercial: 22.0,
  construction: 24.0,
  rei: 22.0,
};

// Tenure bounds (years) per PRD §5.1 calculator slider spec.
export const LOAN_TENURE_MIN = 5;
export const LOAN_TENURE_MAX = 30;
export const LOAN_TENURE_DEFAULT = 20;

// Property value bounds (₦) per PRD §5.1.
export const PROPERTY_VALUE_MIN = 1_000_000;
export const PROPERTY_VALUE_MAX = 500_000_000;

// LTV thresholds (PRD §5.1) — pairs with <LTVIndicator> pill colour.
export const LTV_SAFE_MAX = 80;       // green ≤80
export const LTV_CAUTION_MAX = 90;    // amber 80–90
//                                       red >90 (rejected by most products)
