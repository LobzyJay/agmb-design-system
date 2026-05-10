import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatBlock } from "../components/StatBlock";

const meta: Meta<typeof StatBlock> = {
  title: "Primitives/StatBlock",
  component: StatBlock,
  parameters: { layout: "padded" },
  args: { value: "₦2.8B", label: "DISBURSED · 12 MONTHS", context: "to 97 Nigerian families" },
};
export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {};
export const NoContext: Story = { args: { context: undefined } };

export const StatsRow: Story = {
  render: () => (
    <div className="bg-ag-navy p-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <StatBlock value="20+" label="YEARS" context="CBN-regulated since 2004" inverse />
      <StatBlock value="₦2.8B" label="DISBURSED · 12 MONTHS" context="to 97 Nigerian families" inverse />
      <StatBlock value="ISO 9001:2015" label="CERTIFIED" context="Quality management" inverse />
      <StatBlock value="M-REIF" label="FIRST MOVER" context="Mortgage Refinance Investment Fund" inverse />
    </div>
  ),
};
