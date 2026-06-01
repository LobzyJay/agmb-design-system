"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Slider } from "@/components/Slider";
import { RatioBar } from "@/components/RatioBar";
import { Button } from "@/components/Button";

// AGMB CalculatorPanel — the twin-panel calculator: a cream input panel (segmented
// scenario + sliders) beside a navy output panel (big monthly figure, ratio bar,
// detail rows). Math is a simple inline annuity here; Phase 5 moves it to lib + tests.

const ngn = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

function monthly(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export interface CalculatorPanelProps {
  className?: string;
}

export const CalculatorPanel: React.FC<CalculatorPanelProps> = ({ className }) => {
  const [scenario, setScenario] = React.useState("nhf");
  const rateFor: Record<string, number> = { nhf: 6, mreif: 9.5, commercial: 18 };
  const [property, setProperty] = React.useState(116_500_000);
  const [downPct, setDownPct] = React.useState(20);
  const [years, setYears] = React.useState(20);

  const rate = rateFor[scenario];
  const loan = property * (1 - downPct / 100);
  const m = monthly(loan, rate, years);
  const totalPaid = m * years * 12;
  const interest = Math.max(0, totalPaid - loan);
  const principalShare = totalPaid > 0 ? loan / totalPaid : 0;

  return (
    <section className={cn("bg-black px-6 py-24 md:px-10", className)}>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2">
        {/* Input panel — cream */}
        <div className="flex flex-col gap-7 bg-cream-warm p-10 md:p-12">
          <SegmentedControl
            aria-label="Mortgage scenario"
            value={scenario}
            onChange={setScenario}
            options={[
              { value: "nhf", label: "NHF" },
              { value: "mreif", label: "M-REIF" },
              { value: "commercial", label: "Commercial" },
            ]}
          />
          <Slider label="Property value" display={ngn(property)} value={property} min={15_000_000} max={300_000_000} step={500_000} onChange={setProperty} />
          <Slider label="Down payment" display={`${downPct}%`} value={downPct} min={5} max={50} step={1} onChange={setDownPct} />
          <Slider label="Tenor" display={`${years} years`} value={years} min={5} max={30} step={1} onChange={setYears} />
        </div>

        {/* Output panel — navy */}
        <div className="flex flex-col gap-8 bg-navy-deep p-10 text-cream-warm md:p-14">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint-on-navy">Monthly repayment</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green-vivid">{rate}% / yr</span>
          </div>
          <p className="font-medium leading-none tracking-[-0.065em] text-cream-warm" style={{ fontFamily: "var(--font-numeric)", fontSize: 72, fontVariantNumeric: "tabular-nums" }}>{ngn(m)}</p>
          <div className="flex flex-col gap-2">
            <RatioBar value={principalShare} aria-label="Principal vs interest" />
            <div className="flex justify-between text-xs text-text-muted-on-navy">
              <span>Principal {ngn(loan)}</span>
              <span className="text-green-vivid">Interest {ngn(interest)}</span>
            </div>
          </div>
          <dl className="flex flex-col">
            {[
              ["Loan amount", ngn(loan)],
              ["Down payment", ngn(property - loan)],
              ["Total repayable", ngn(totalPaid)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-cream-warm/10 py-3.5 last:border-b-0">
                <dt className="text-sm text-text-muted-on-navy">{k}</dt>
                <dd className="numeric text-sm text-cream-warm" style={{ fontSize: 14 }}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1 rounded-sm py-4">Apply now</Button>
            <Button variant="ghost" className="flex-1 rounded-sm border border-cream-warm/20 py-4 text-cream-warm">Save scenario</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
