import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HighlightTrust } from "../components/HighlightTrust";

const meta: Meta<typeof HighlightTrust> = {
  title: "Primitives/HighlightTrust",
  component: HighlightTrust,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof HighlightTrust>;

export const TrustSection: Story = {
  render: () => (
    <section className="bg-ag-cream py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <HighlightTrust
          eyebrow="Trust"
          title={<><span className="bi-sans">Trusted</span> <span className="bi-serif italic">by 97 Nigerian families.</span></>}
          badges={[
            { label: "CBN Licensed" },
            { label: "ISO 9001:2015" },
            { label: "NDIC-insured" },
            { label: "FMBN partner" },
          ]}
          copy={
            <>
              <p className="mb-3">
                AG Mortgage Bank Plc. is licensed by the Central Bank of Nigeria as a Primary Mortgage Institution and has operated continuously since 2004. Deposits are NDIC-insured. We participate in the Mortgage Refinance Investment Fund (M-REIF) and partner with the Federal Mortgage Bank of Nigeria.
              </p>
              <p className="text-ag-muted">
                We process personal data under the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act 2023.
              </p>
            </>
          }
          facts={[
            { eyebrow: "EST. 2004", value: "20+", context: "years CBN-regulated.", valueStyle: "numeric" },
            { eyebrow: "DISBURSED · 12 MONTHS", value: "₦2.8B", context: "to 97 Nigerian families.", valueStyle: "numeric" },
            { eyebrow: "M-REIF", value: "First mover.", context: "Among Nigeria's earliest M-REIF participants.", valueStyle: "serif" },
            { eyebrow: "QUALITY", value: "ISO 9001:2015", context: "Recertified annually.", valueStyle: "serif" },
          ]}
        />
      </div>
    </section>
  ),
};

export const InverseTrustSection: Story = {
  render: () => (
    <section className="bg-ag-navy py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <HighlightTrust
          inverse
          eyebrow="Trust"
          title={<><span className="bi-sans">Trusted</span> <span className="bi-serif italic">by 97 Nigerian families.</span></>}
          badges={[
            { label: "CBN Licensed" },
            { label: "ISO 9001:2015" },
            { label: "NDIC-insured" },
            { label: "FMBN partner" },
          ]}
          copy="20 years regulated. NDIC-insured. M-REIF first-mover."
          facts={[
            { eyebrow: "EST. 2004", value: "20+", context: "years CBN-regulated." },
            { eyebrow: "DISBURSED", value: "₦2.8B", context: "12 months." },
          ]}
        />
      </div>
    </section>
  ),
};
