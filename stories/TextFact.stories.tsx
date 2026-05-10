import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextFact } from "../components/TextFact";

const meta: Meta<typeof TextFact> = {
  title: "Primitives/TextFact",
  component: TextFact,
  parameters: { layout: "padded" },
  args: {
    eyebrow: "DISBURSED · 12 MONTHS",
    value: "₦2.8B",
    context: "to 97 Nigerian families.",
    valueStyle: "numeric",
    size: "xl",
  },
  argTypes: {
    valueStyle: { control: "select", options: ["numeric", "serif"] },
    size: { control: "select", options: ["xl", "m"] },
    rule: { control: "boolean" },
    inverse: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TextFact>;

export const NumericFact: Story = {};

export const SerifFact: Story = {
  args: {
    eyebrow: "M-REIF FIRST MOVER",
    value: "Nigeria's first.",
    context: "Mortgage Refinance Investment Fund.",
    valueStyle: "serif",
    rule: true,
  },
};

export const Inverse: Story = {
  args: { inverse: true, rule: true },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const HighlightTrustComposition: Story = {
  render: () => (
    <div className="bg-ag-navy p-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
      <TextFact eyebrow="EST. 2004" value="20+" context="years CBN-regulated." inverse rule />
      <TextFact eyebrow="DISBURSED · 12 MONTHS" value="₦2.8B" context="to 97 Nigerian families." inverse rule />
      <TextFact eyebrow="CERTIFIED" value="ISO 9001:2015" context="Quality management." inverse valueStyle="serif" size="m" rule />
    </div>
  ),
};
