import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepCard } from "../components/StepCard";

const meta: Meta<typeof StepCard> = {
  title: "Primitives/StepCard",
  component: StepCard,
  parameters: { layout: "padded" },
  args: {
    number: 1,
    title: "Apply in 5 minutes.",
    description: "Complete the short eligibility check — name, employment, property details.",
  },
};
export default meta;
type Story = StoryObj<typeof StepCard>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const Inverse: Story = {
  args: { active: true, inverse: true },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const HowItWorksRow: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl">
      <StepCard number={1} title="Apply in 5 minutes." description="Short eligibility check — name, employment, property details." active />
      <StepCard number={2} title="Credit assessment." description="We assess against CBN guidelines. Most decisions land within 5 working days." />
      <StepCard number={3} title="Offer letter." description="Sign to lock the indicative rate. Disbursement begins on counter-signature." />
      <StepCard number={4} title="Move in." description="Funds settle direct to your seller or developer. We handle the registry." />
    </div>
  ),
};
