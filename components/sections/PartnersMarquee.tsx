import * as React from "react";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site-config";

// AGMB PartnersMarquee — uses the site's verbatim .partners__marquee / __track /
// __logo CSS with the real partner logos (whitewashed via filter). Track is
// duplicated so translateX(-50%) loops seamlessly.

export interface Partner {
  src: string;
  alt: string;
}

// The site's nine partners (public/partners).
export const AGMB_PARTNERS: Partner[] = [
  { src: "/partners/dbn.svg", alt: "Development Bank of Nigeria" },
  { src: "/partners/deloitte.svg", alt: "Deloitte" },
  { src: "/partners/ey.svg", alt: "Ernst & Young" },
  { src: "/partners/family-homes-funds.png", alt: "Family Homes Funds" },
  { src: "/partners/first-metro-infrastructure.png", alt: "First Metro Infrastructure" },
  { src: "/partners/fmbn.png", alt: "Federal Mortgage Bank of Nigeria" },
  { src: "/partners/mban.png", alt: "Mortgage Bankers Association of Nigeria" },
  { src: "/partners/redan.png", alt: "Real Estate Developers Association of Nigeria" },
  { src: "/partners/siao-partners.png", alt: "SIAO Partners" },
];

export interface PartnersMarqueeProps {
  partners?: Partner[];
  className?: string;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ partners = AGMB_PARTNERS, className }) => {
  const loop = [...partners, ...partners];
  return (
    <div className={cn("partners__marquee", className)} aria-hidden>
      <div className="partners__track">
        {loop.map((p, i) => (
          <span key={i} className="partners__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(p.src)} alt={p.alt} />
          </span>
        ))}
      </div>
    </div>
  );
};
