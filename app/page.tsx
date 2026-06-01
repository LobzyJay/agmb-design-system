import { Logo } from "@/components/Logo";
import { Specimen, SpecimenGroup } from "@/components/docs/Specimen";
import { Swatch } from "@/components/docs/Swatch";

// Primitives
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { StatusLine } from "@/components/StatusLine";
import { Fact } from "@/components/Fact";
import { Slider } from "@/components/Slider";
import { SegmentedControl } from "@/components/SegmentedControl";
import { MoneyInput } from "@/components/MoneyInput";
import { PercentInput } from "@/components/PercentInput";
import { FormField } from "@/components/FormField";
import { RatioBar } from "@/components/RatioBar";
import { Pill } from "@/components/Pill";

// Patterns (sections)
import { FactStrip } from "@/components/sections/FactStrip";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { CalculatorPanel } from "@/components/sections/CalculatorPanel";
import { CommunityTabs } from "@/components/sections/CommunityTabs";
import { Newsroom } from "@/components/sections/Newsroom";
import { StatsRow } from "@/components/sections/StatsRow";
import { RegulatoryFooter } from "@/components/sections/RegulatoryFooter";
import { AdvisoryBand } from "@/components/sections/AdvisoryBand";
import { BentoGrid, BentoTile } from "@/components/sections/BentoGrid";
import { TileViz } from "@/components/viz/TileViz";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { ContactForm } from "@/components/sections/ContactForm";

const NAV = [
  { id: "foundations", label: "Foundations" },
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "radii", label: "Radii & motion" },
  { id: "primitives", label: "Primitives" },
  { id: "viz", label: "Viz" },
  { id: "forms", label: "Forms" },
  { id: "patterns", label: "Patterns" },
];

const VIZ = [
  { kind: "nhf", label: "NHF · house", accent: "#1A7A4A", ar: 1.5 },
  { kind: "mreif", label: "M-REIF · refinance", accent: "#1F4FA8", ar: 1.8 },
  { kind: "construction", label: "Construction · phases", accent: "#E0B040", ar: 2.4 },
  { kind: "reif", label: "REIF · skyline", accent: "#1A7A4A", ar: 2.8 },
  { kind: "commercial", label: "Commercial · storefront", accent: "#1F4FA8", ar: 1.7 },
];

const BRAND = [
  { name: "navy.deep", token: "--color-navy-deep", hex: "#061A2E" },
  { name: "navy", token: "--color-navy", hex: "#0A2540" },
  { name: "navy.vivid", token: "--color-navy-vivid", hex: "#1F4FA8" },
  { name: "navy.soft", token: "--color-navy-soft", hex: "#0F2F50" },
  { name: "cream", token: "--color-cream", hex: "#F8F5EF", light: true },
  { name: "cream.warm", token: "--color-cream-warm", hex: "#FAF3E8", light: true },
  { name: "cream.vivid", token: "--color-cream-vivid", hex: "#FFEFC2", light: true },
  { name: "cream.deep", token: "--color-cream-deep", hex: "#EDE5D5", light: true },
  { name: "gold.rich", token: "--color-gold-rich", hex: "#E0B040", light: true },
  { name: "gold.vivid", token: "--color-gold-vivid", hex: "#F0C441", light: true },
  { name: "green.deep", token: "--color-green-deep", hex: "#14613A" },
  { name: "green.vivid", token: "--color-green-vivid", hex: "#22C55E" },
];

const RADII = [
  ["xs", "4px"], ["sm", "12px"], ["md", "14px"], ["lg", "18px"],
  ["xl", "24px"], ["2xl", "28px"], ["3xl", "32px"], ["4xl", "36px"], ["pill", "999px"],
];

const EASES = [
  ["expo", "cubic-bezier(0.16, 1, 0.3, 1)", "primary reveal / transition"],
  ["standard", "cubic-bezier(0.4, 0, 0.2, 1)", "segmented indicator, generic"],
  ["drawer", "cubic-bezier(0.22, 1, 0.36, 1)", "mobile drawer / hamburger"],
  ["overshoot", "cubic-bezier(0.34, 1.56, 0.64, 1)", "tile lift, number pulse"],
];

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-surface-page text-cream-warm lg:grid lg:grid-cols-[18rem_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r border-cream-warm/10 lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:p-8">
        <Logo variant="wordmark-white" height={30} />
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted-on-navy">Design System</p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted-on-navy">Tokens, primitives and patterns — derived from the AG Mortgage Bank website.</p>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-md px-3 py-2 text-sm text-text-muted-on-navy transition hover:bg-cream-warm/5 hover:text-cream-warm">
              {n.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex min-w-0 flex-col gap-24 overflow-x-clip px-6 py-20 md:px-12 lg:px-16">
        <header id="foundations" className="scroll-mt-24 flex max-w-3xl flex-col gap-5">
          <Eyebrow dot="gold" className="text-gold-vivid">AGMB · Design System</Eyebrow>
          <h1 className="h1 text-cream-warm">
            The system the site is <span className="serif-accent">built</span> from.
          </h1>
          <p className="lede text-text-muted-on-navy">
            Every token and component here is taken directly from the live AG Mortgage Bank website —
            twelve brand colours, three type faces, and the sections the homepage composes from.
          </p>
        </header>

        {/* COLOUR */}
        <SpecimenGroup id="colour" eyebrow="Foundations · 01" title="Colour">
          <Specimen name="Brand palette" description="The twelve canonical hexes from the site's :root, exposed as raw tokens." surface="none">
            <div className="flex flex-wrap gap-4">
              {BRAND.map((c) => <Swatch key={c.token} {...c} />)}
            </div>
          </Specimen>
        </SpecimenGroup>

        {/* TYPE */}
        <SpecimenGroup id="type" eyebrow="Foundations · 02" title="Typography">
          <Specimen name="Type scale" description="Inter for display + body, Inter Tight for numerics, Libre Baskerville for the serif accent word." surface="navy">
            <div className="flex w-full flex-col gap-5">
              <p className="h1 text-cream-warm">Homes for working <span className="serif-accent">Nigerians</span>.</p>
              <p className="h2 text-cream-warm">Section heading · H2</p>
              <p className="lede text-text-muted-on-navy">Lede — a calm intro line that sits under the heading and sets context for the section below.</p>
              <p className="numeric text-cream-warm">₦485,720 / mo</p>
              <p className="eyebrow text-gold-vivid">Eyebrow · 0.18em</p>
              <p className="caption text-text-muted-on-navy">Caption · helper · meta</p>
            </div>
          </Specimen>
        </SpecimenGroup>

        {/* RADII + MOTION */}
        <SpecimenGroup id="radii" eyebrow="Foundations · 03" title="Radii & motion">
          <Specimen name="Radius ladder" description="The distinct corner radii used across the site." surface="navy">
            <div className="flex flex-wrap items-end gap-5">
              {RADII.map(([n, v]) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <div className="h-16 w-16 border border-cream-warm/15 bg-navy-vivid" style={{ borderRadius: v }} />
                  <span className="text-[10.5px] text-text-muted-on-navy" style={{ fontFamily: "var(--font-numeric)" }}>{n} · {v}</span>
                </div>
              ))}
            </div>
          </Specimen>
          <Specimen name="Easing curves" description="The four cubic-beziers measured from the site's transitions." surface="navy">
            <div className="flex w-full flex-col gap-2">
              {EASES.map(([n, v, use]) => (
                <div key={n} className="flex flex-col gap-0.5 border-b border-cream-warm/10 pb-2 last:border-b-0">
                  <span className="text-sm text-cream-warm">{n} — <span className="text-text-muted-on-navy">{use}</span></span>
                  <span className="text-[10.5px] text-text-faint-on-navy" style={{ fontFamily: "var(--font-numeric)" }}>{v}</span>
                </div>
              ))}
            </div>
          </Specimen>
        </SpecimenGroup>

        {/* PRIMITIVES */}
        <SpecimenGroup id="primitives" eyebrow="Catalogue · 04" title="Primitives">
          <Specimen name="Button" description="The .cta system — primary (cream), secondary (navy-vivid), nav pill, ghost." surface="navy">
            <Button variant="primary">Start your application</Button>
            <Button variant="secondary">See mortgage types</Button>
            <Button variant="nav">Apply now</Button>
            <Button variant="ghost" className="text-cream-warm">Learn more →</Button>
          </Specimen>
          <Specimen name="Eyebrow · StatusLine · Pill" surface="navy">
            <div className="flex w-full flex-col gap-5">
              <Eyebrow dot="gold" className="text-gold-vivid">By the numbers</Eyebrow>
              <StatusLine items={["CBN-licensed since 2004", "NDIC-insured"]} />
              <div className="flex gap-3"><Pill tone="cream">Apply now</Pill><Pill tone="gold-outline">Disclosure</Pill><Pill tone="glass">Featured</Pill></div>
            </div>
          </Specimen>
          <Specimen name="Fact" description="A dotted eyebrow, Inter Tight numeric, and caption." surface="cream">
            <Fact label="Disbursed" value="₦2.8B" caption="in the last 12 months" dot="green" surface="cream" />
            <Fact label="Families" value="97" caption="homes financed" dot="navy" surface="cream" />
          </Specimen>
          <Specimen name="SegmentedControl" surface="cream">
            <SegmentedControl aria-label="Scenario" options={[{ value: "nhf", label: "NHF" }, { value: "mreif", label: "M-REIF" }, { value: "commercial", label: "Commercial" }]} />
          </Specimen>
          <Specimen name="Slider · MoneyInput · PercentInput" surface="cream">
            <div className="flex w-full max-w-md flex-col gap-6">
              <Slider label="Property value" display="₦116,500,000" value={116500000} min={15000000} max={300000000} step={500000} />
              <FormField label="Loan amount" surface="cream"><MoneyInput value={92800000} /></FormField>
              <FormField label="Down payment" surface="cream"><PercentInput value={20} /></FormField>
            </div>
          </Specimen>
          <Specimen name="RatioBar" description="Principal vs interest split." surface="navy">
            <div className="w-full max-w-md"><RatioBar value={0.62} /></div>
          </Specimen>
        </SpecimenGroup>

        {/* VIZ */}
        <SpecimenGroup id="viz" eyebrow="Catalogue · 05" title="Viz">
          <Specimen name="Dithered tile viz" description="The site's product-tile viz — a per-product silhouette Bayer-dithered into a dot field in the accent colour. Move your cursor over a tile to displace the dots (iron-filings repulsion). Pauses off-screen; static under reduced-motion." surface="none">
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {VIZ.map((v) => (
                <div key={v.kind} className="flex flex-col gap-2">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-cream-warm/10 bg-navy">
                    <TileViz viz={v.kind} accent={v.accent} ar={v.ar} />
                  </div>
                  <span className="text-[10.5px] text-text-muted-on-navy" style={{ fontFamily: "var(--font-numeric)" }}>{v.label}</span>
                </div>
              ))}
            </div>
          </Specimen>
        </SpecimenGroup>

        {/* FORMS */}
        <SpecimenGroup id="forms" eyebrow="Catalogue · 06" title="Forms">
          <Specimen name="ApplyForm" description="The multi-step mortgage application — step indicator, the active step's fields, back/next nav. Click Continue to walk the steps." surface="none">
            <div className="w-full"><ApplyForm /></div>
          </Specimen>
          <Specimen name="ContactForm" description="The contact twin — a navy info panel beside a cream form panel." surface="none">
            <div className="w-full"><ContactForm eyebrow="Contact" heading="Talk to a mortgage desk." copy="We reply within one working day." rows={[{ label: "Phone", value: "+234 807 609 4107" }, { label: "Email", value: "info@agmortgagebankplc.com" }, { label: "Head office", value: "Lagos, Nigeria", sub: "Mon–Sat, 8am–5pm" }]} /></div>
          </Specimen>
        </SpecimenGroup>

        {/* PATTERNS */}
        <SpecimenGroup id="patterns" eyebrow="Catalogue · 07" title="Patterns">
          <Specimen name="FactStrip" description="The cream pill of facts that leaks over the hero viz." surface="navy">
            <div className="w-full"><FactStrip facts={[{ label: "Years", value: "20+", caption: "CBN-regulated", dot: "gold" }, { label: "Disbursed", value: "₦2.8B", caption: "last 12 months", dot: "green" }, { label: "Families", value: "97", caption: "homes financed", dot: "navy" }]} /></div>
          </Specimen>
          <Specimen name="StatsRow" description="Cream stats band — 80px Inter Tight numerics." surface="cream">
            <div className="w-full"><StatsRow eyebrow="By the numbers" heading="Two decades of careful lending." stats={[{ eyebrow: "Years regulated", value: "20+", caption: "CBN since 2004" }, { eyebrow: "Disbursed", value: "₦2.8B", caption: "last 12 months" }, { eyebrow: "Families", value: "97", caption: "homes financed" }, { eyebrow: "Certified", value: "ISO 9001", caption: "quality management" }]} /></div>
          </Specimen>
          <Specimen name="RegulatoryFooter" description="The site footer — navy panel, brand + columns, regulatory disclosures." surface="none">
            <div className="w-full"><RegulatoryFooter tagline="AG Mortgage Bank Plc — a CBN-licensed Primary Mortgage Bank, established 2004." columns={[{ title: "Products", links: [{ label: "NHF Mortgage", href: "#" }, { label: "M-REIF", href: "#" }, { label: "Commercial", href: "#" }] }, { title: "Company", links: [{ label: "About", href: "#" }, { label: "Insights", href: "#" }, { label: "Contact", href: "#" }] }, { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Disclosures", href: "#" }] }]} disclosures={[{ label: "CBN-licensed PMI", href: "#" }, { label: "NDIC-insured", href: "#" }, { label: "ISO 9001:2015", href: "#" }, { label: "RC 123456", href: "#" }]} /></div>
          </Specimen>
          <Specimen name="PartnersMarquee" description="Edge-masked logo marquee — the nine real partner logos, whitewashed, looping." surface="navy">
            <div className="w-full"><PartnersMarquee /></div>
          </Specimen>
          <Specimen name="Product bento" description="The site's product grid — cream tiles with the dithered viz on the right. Flagship + 2-stack on top, two tiles below. Hover a tile to lift it and displace the viz dots." surface="none">
            <div className="w-full">
              <BentoGrid
                flagship={<BentoTile flagship viz="nhf" ar={1.5} accent="#1A7A4A" category="Mortgage" name="NHF Mortgage" rate="6.0% p.a." copy="The National Housing Fund route for working Nigerians on a payslip — up to 30 years." link="Check NHF eligibility" />}
                stack={[
                  <BentoTile key="m" viz="mreif" ar={1.8} accent="#1F4FA8" category="Refinance" name="M-REIF" rate="9.5%" copy="Refinance for the self-employed, on cash flow." />,
                  <BentoTile key="c" viz="construction" ar={2.4} accent="#E0B040" category="Build" name="Construction Finance" rate="16%" copy="Stage-by-stage drawdowns." />,
                ]}
                bottom={[
                  <BentoTile key="x" viz="commercial" ar={1.7} accent="#1F4FA8" category="Commercial" name="Commercial" rate="18%" copy="Offices, retail and mixed-use developments." />,
                  <BentoTile key="r" viz="reif" ar={2.8} accent="#1A7A4A" category="Invest" name="Real Estate Investment" rate="14%" copy="Income-property finance for investors." />,
                ]}
              />
            </div>
          </Specimen>
          <Specimen name="CalculatorPanel" description="Twin-panel calculator (site CSS) — segmented route + sliders → navy output, real reducing-balance math + cap notice." surface="none">
            <div className="w-full"><CalculatorPanel /></div>
          </Specimen>
          <Specimen name="CommunityTabs" description="Cream community section — hairline tabs + navy stat-art panel beside prose." surface="cream">
            <div className="w-full"><CommunityTabs tabs={[{ num: "01", label: "First-time buyers", art: { eyebrow: "NHF Mortgage", statAccent: "97", stat: "families", caption: "financed into first homes in the last year" }, body: <><p>The National Housing Fund route is built for working Nigerians on a payslip — we handle the FMBN paperwork end to end.</p><p>Contributions you have already made count toward your deposit.</p></> }, { num: "02", label: "Self-employed", art: { eyebrow: "M-REIF", statAccent: "₦2.8B", stat: "disbursed", caption: "across mortgage refinance in 12 months" }, body: <p>No payslip, no problem — M-REIF underwrites on business cash flow and rental income.</p> }, { num: "03", label: "Diaspora", art: { eyebrow: "Commercial", statAccent: "20", stat: "+ years", caption: "CBN-regulated origination, audited every step" }, body: <p>Buy or build from abroad with a naira mortgage and a local advisor at every milestone.</p> }]} /></div>
          </Specimen>
          <Specimen name="Newsroom" surface="none">
            <div className="w-full"><Newsroom className="!bg-transparent !px-0 !py-0" featured={{ chip: "Disclosure", meta: "12 May 2026", title: "AGMB posts ₦2.8B in mortgage origination", href: "#" }} stories={[{ meta: "Press · 02 May", title: "M-REIF window reopens for Q2", href: "#" }, { meta: "Insight · 24 Apr", title: "What the new NHF cap means", href: "#" }]} /></div>
          </Specimen>
          <Specimen name="AdvisoryBand" surface="none">
            <div className="w-full"><AdvisoryBand eyebrow="Advisory" title="Talk to a mortgage advisor" copy="Free, no obligation. Real people who close Nigerian mortgages every week." cta={{ label: "Book a call", href: "#" }} stat={{ accent: "3", value: "advisors", sub: "on call right now, Mon–Sat" }} /></div>
          </Specimen>
        </SpecimenGroup>

        <footer className="border-t border-cream-warm/10 pt-8 text-sm text-text-muted-on-navy">
          AGMB Design System — derived from the live agmb-website. Tokens, primitives, patterns.
        </footer>
      </main>
    </div>
  );
}
