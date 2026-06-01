"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { calculate, naira, SEGMENTS } from "@/lib/mortgage-calc";

// AGMB CalculatorPanel — uses the site's verbatim .twin / .seg / .field /
// .output-panel CSS, with the real reducing-balance math from lib/mortgage-calc.

const ROUTES = ["nhf", "mreif", "classic", "diaspora"];

export interface CalculatorPanelProps {
  className?: string;
}

export const CalculatorPanel: React.FC<CalculatorPanelProps> = ({ className }) => {
  const [segment, setSegment] = React.useState("nhf");
  const [property, setProperty] = React.useState(116_500_000);
  const [downPct, setDownPct] = React.useState(20);
  const [tenor, setTenor] = React.useState(20);

  const segRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = React.useState({ left: 4, width: 0 });
  const measure = React.useCallback(() => {
    const el = itemRefs.current[segment];
    if (!el) return;
    setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [segment]);
  React.useLayoutEffect(() => measure(), [measure]);
  React.useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const c = calculate({ segment, property, downPct, tenor });

  return (
    <div className={cn("twin", className)}>
      {/* Input panel — cream */}
      <div className="input-panel">
        <div className="seg" ref={segRef}>
          <span className="seg__indicator" style={{ width: ind.width, transform: `translateX(${ind.left - 4}px)` }} />
          {ROUTES.map((r) => (
            <button
              key={r}
              ref={(n) => { itemRefs.current[r] = n; }}
              className={cn("seg__item", r === segment && "seg__item--active")}
              onClick={() => setSegment(r)}
            >
              {SEGMENTS[r].short}
            </button>
          ))}
        </div>

        <div className="field">
          <div className="field__row"><span className="field__label">Property value</span></div>
          <span className="field__value">{naira(property)}</span>
          <input className="calc-slider" type="range" min={15_000_000} max={300_000_000} step={500_000} value={property} onChange={(e) => setProperty(+e.target.value)} aria-label="Property value" />
        </div>
        <div className="field">
          <div className="field__row"><span className="field__label">Down payment</span><span className="field__label">{naira(c.downAmount)}</span></div>
          <span className="field__value">{downPct}%</span>
          <input className="calc-slider" type="range" min={5} max={50} step={1} value={downPct} onChange={(e) => setDownPct(+e.target.value)} aria-label="Down payment percent" />
        </div>
        <div className="field">
          <div className="field__row"><span className="field__label">Tenor</span></div>
          <span className="field__value">{tenor} years</span>
          <input className="calc-slider" type="range" min={5} max={30} step={1} value={tenor} onChange={(e) => setTenor(+e.target.value)} aria-label="Tenor years" />
        </div>

        {c.capped && (
          <p className="cap-notice">{c.seg.short} caps principal at {naira(c.seg.cap as number)} — {naira(c.shortfall)} top-up arranged separately.</p>
        )}
      </div>

      {/* Output panel — navy */}
      <div className="output-panel">
        <div className="output-top">
          <span className="output-top__l">Route · {c.seg.label}</span>
          <span className="output-top__r">At {c.seg.rateLabel}</span>
        </div>
        <span className="output-big">{naira(c.monthly)}/mo</span>
        <div className="ratio-bar">
          <div style={{ width: `${c.principalPct}%` }} />
          <div style={{ width: `${c.interestPct}%` }} />
        </div>
        <div>
          <div className="detail-row"><span className="detail-row__l">Principal</span><span className="detail-row__r">{naira(c.principal)}</span></div>
          <div className="detail-row"><span className="detail-row__l">Interest ({c.interestPct.toFixed(0)}%)</span><span className="detail-row__r">{naira(c.interest)}</span></div>
          <div className="detail-row"><span className="detail-row__l">Total repayable</span><span className="detail-row__r">{naira(c.total)}</span></div>
          <div className="detail-row"><span className="detail-row__l">LTV</span><span className="detail-row__r">{c.ltv.toFixed(0)}%</span></div>
        </div>
        <div className="output-ctas">
          <button className="output-cta output-cta--primary">Apply now</button>
          <button className="output-cta output-cta--secondary">Save scenario</button>
        </div>
      </div>
    </div>
  );
};
