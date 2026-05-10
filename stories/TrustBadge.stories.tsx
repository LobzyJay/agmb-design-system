import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TrustBadge } from "../components/TrustBadge";

const meta: Meta<typeof TrustBadge> = {
  title: "Primitives/TrustBadge",
  component: TrustBadge,
  parameters: { layout: "padded" },
  args: { label: "CBN Licensed" },
};
export default meta;
type Story = StoryObj<typeof TrustBadge>;

export const Default: Story = {};
export const Inverse: Story = {
  args: { inverse: true, label: "CBN Licensed" },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const HeroTrustStrip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TrustBadge label="CBN Licensed" />
      <TrustBadge label="ISO 9001:2015" />
      <TrustBadge label="20+ Years" />
      <TrustBadge label="₦2.8B+ Disbursed" />
    </div>
  ),
};

export const HeroTrustStripInverse: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TrustBadge label="CBN Licensed" inverse />
      <TrustBadge label="ISO 9001:2015" inverse />
      <TrustBadge label="20+ Years" inverse />
      <TrustBadge label="₦2.8B+ Disbursed" inverse />
    </div>
  ),
  parameters: { backgrounds: { default: "ag-navy" } },
};
