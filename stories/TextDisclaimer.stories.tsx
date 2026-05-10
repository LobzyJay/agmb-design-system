import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextDisclaimer } from "../components/TextDisclaimer";

const meta: Meta<typeof TextDisclaimer> = {
  title: "Primitives/TextDisclaimer",
  component: TextDisclaimer,
  parameters: { layout: "padded" },
  args: {
    children: "Rates are indicative. Final terms are subject to credit assessment and prevailing CBN guidelines.",
  },
};
export default meta;
type Story = StoryObj<typeof TextDisclaimer>;

export const Default: Story = {};

export const WithRule: Story = {
  args: { rule: true },
};

export const Inverse: Story = {
  args: { inverse: true, rule: true },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const Compact: Story = {
  args: { compact: true, children: "BVN data is processed under NDPR. We never share." },
};

export const RegulatoryFooter: Story = {
  render: () => (
    <div className="bg-ag-navy p-8 max-w-3xl flex flex-col gap-3">
      <TextDisclaimer inverse>
        AG Mortgage Bank Plc. is licensed and regulated by the Central Bank of Nigeria (CBN) as a Primary Mortgage Institution. RC No. 471634. NDIC-insured deposits.
      </TextDisclaimer>
      <TextDisclaimer inverse>
        We process personal data under the Nigeria Data Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act 2023. For data-protection enquiries: dpo@agmortgagebankplc.com.
      </TextDisclaimer>
      <TextDisclaimer inverse>
        Indicative rates may change without notice. Final repayment terms are agreed in your offer letter.
      </TextDisclaimer>
    </div>
  ),
};
