import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RegulatoryFooter } from "../components/RegulatoryFooter";

const meta: Meta<typeof RegulatoryFooter> = {
  title: "Primitives/RegulatoryFooter",
  component: RegulatoryFooter,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof RegulatoryFooter>;

export const Default: Story = {
  render: () => (
    <RegulatoryFooter
      logo={<p className="bi-serif text-3xl text-ag-cream">AGMB</p>}
      contact={
        <>
          info@agmortgagebankplc.com<br />
          dpo@agmortgagebankplc.com<br />
          WhatsApp · +234 807 609 4107
        </>
      }
      social={
        <>
          <a href="#" aria-label="LinkedIn" className="text-ag-cream/60 hover:text-ag-cream">in</a>
          <a href="#" aria-label="Instagram" className="text-ag-cream/60 hover:text-ag-cream">ig</a>
          <a href="#" aria-label="X" className="text-ag-cream/60 hover:text-ag-cream">x</a>
          <a href="#" aria-label="Facebook" className="text-ag-cream/60 hover:text-ag-cream">fb</a>
        </>
      }
      groups={[
        {
          title: "Mortgages",
          links: [
            { label: "NHF Mortgage", href: "#" },
            { label: "M-REIF Mortgage", href: "#" },
            { label: "Construction Finance", href: "#" },
            { label: "REI Finance", href: "#" },
            { label: "Mortgage Advisory", href: "#" },
          ],
        },
        {
          title: "Savings",
          links: [
            { label: "Regular Savings", href: "#" },
            { label: "Save-4-It", href: "#" },
            { label: "AssetBin", href: "#" },
            { label: "FAMSA Group", href: "#" },
            { label: "Kiddies", href: "#" },
            { label: "Acada", href: "#" },
          ],
        },
        {
          title: "About",
          links: [
            { label: "Who we are", href: "#" },
            { label: "Leadership", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy (NDPR)", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "Complaints", href: "#" },
          ],
        },
      ]}
      disclosures={[
        "AG Mortgage Bank Plc. is licensed and regulated by the Central Bank of Nigeria (CBN) as a Primary Mortgage Institution. RC No. 471634. NDIC-insured deposits.",
        "We process personal data under the Nigeria Data Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act 2023. For data-protection enquiries, contact dpo@agmortgagebankplc.com.",
        "Indicative rates are subject to credit assessment and prevailing CBN guidelines. Final repayment terms are agreed in your offer letter.",
      ]}
    />
  ),
};
