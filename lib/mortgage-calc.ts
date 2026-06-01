// Mortgage math — ported verbatim from the live agmb-website calculator.
// Reducing-balance amortization per CBN guidelines, with per-route rate + cap.

export interface Segment {
  rate: number;
  cap: number | null;
  label: string;
  short: string;
  rateLabel: string;
}

export const SEGMENTS: Record<string, Segment> = {
  nhf: { rate: 6.0, cap: 15_000_000, label: "National Housing Fund", short: "NHF", rateLabel: "6.0% p.a. · fixed" },
  mreif: { rate: 9.5, cap: 50_000_000, label: "M-REIF · Underserved", short: "M-REIF", rateLabel: "9.5% p.a. · indicative" },
  classic: { rate: 22.0, cap: null, label: "Classic Mortgage", short: "Classic", rateLabel: "22.0% p.a. · indicative" },
  diaspora: { rate: 18.0, cap: 80_000_000, label: "Diaspora-NHF", short: "Diaspora", rateLabel: "18.0% p.a. · indicative" },
};

export interface Amortization {
  monthly: number;
  total: number;
  interest: number;
}

export function amortize(P: number, annualRatePct: number, years: number): Amortization {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (P <= 0 || n <= 0) return { monthly: 0, total: 0, interest: 0 };
  if (r === 0) return { monthly: P / n, total: P, interest: 0 };
  const factor = Math.pow(1 + r, n);
  const M = (P * r * factor) / (factor - 1);
  return { monthly: M, total: M * n, interest: M * n - P };
}

export function naira(n: number): string {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export interface CalcInput {
  segment: string;
  property: number;
  downPct: number;
  tenor: number;
}

export interface CalcResult extends Amortization {
  seg: Segment;
  principal: number;
  downAmount: number;
  ltv: number;
  interestPct: number;
  principalPct: number;
  capped: boolean;
  shortfall: number;
}

export function calculate({ segment, property, downPct, tenor }: CalcInput): CalcResult {
  const seg = SEGMENTS[segment] ?? SEGMENTS.nhf;
  const desired = property * (1 - downPct / 100);
  const principal = seg.cap ? Math.min(desired, seg.cap) : desired;
  const downAmount = (property * downPct) / 100;
  const out = amortize(principal, seg.rate, tenor);
  const ltv = (principal / property) * 100;
  const interestPct = out.total > 0 ? (out.interest / out.total) * 100 : 0;
  return {
    ...out,
    seg,
    principal,
    downAmount,
    ltv,
    interestPct,
    principalPct: 100 - interestPct,
    capped: !!(seg.cap && desired > seg.cap),
    shortfall: seg.cap ? Math.max(0, desired - seg.cap) : 0,
  };
}
