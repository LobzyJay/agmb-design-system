"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Slider } from "@/components/Slider";
import { RatioBar } from "@/components/RatioBar";
import { Button } from "@/components/Button";
import { calculate, naira as ngn } from "@/lib/mortgage-calc";

// AGMB CalculatorPanel — the twin-panel calculator: a cream input panel (segmented
// route + sliders) beside a navy output panel (big monthly figure, ratio bar,
// detail rows). Math is the real reducing-balance amortize from lib/mortgage-calc.

export interface CalculatorPanelProps {
  className?: string;
}

export const CalculatorPanel: React.FC<CalculatorPanelProps> = ({ className }) => {
  const [scenario, setScenario] = React.useState("nhf");
  const [property, setProperty] = React.useState(116_500_000);
  const [downPct, setDownPct] = React.useState(20);
  const [years, setYears] = React.useState(20);

  const c = calculate({ segment: scenario, property, downPct, tenor: years });
  const rate = c.seg.rate;
  const loan = c.principal;
  const m = c.monthly;
  const totalPaid = c.total;
  const interest = c.interest;
  const principalShare = c.principalPct / 100;

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
              { value: "classic", label: "Classic" },
              { value: "diaspora", label: "Diaspora" },
            ]}
          />
          {c.capped && (
            <p className="rounded-sm bg-navy-deep/[0.04] px-3 py-2 text-xs leading-snug text-text-muted-on-cream">
              {c.seg.short} caps principal at {ngn(c.seg.cap as number)} — {ngn(c.shortfall)} top-up arranged separately.
            </p>
          )}
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
