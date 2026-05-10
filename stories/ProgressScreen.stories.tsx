import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressScreen } from "../components/ProgressScreen";

const meta: Meta<typeof ProgressScreen> = {
  title: "Primitives/ProgressScreen",
  component: ProgressScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ProgressScreen>;

export const VerifyingProperty: Story = {
  args: {
    step: "Step 3 of 5",
    title: "Verifying property value.",
    description: "We're checking against indicative valuation data. This usually takes a moment.",
  },
};

export const CheckingEligibility: Story = {
  args: {
    step: "Step 4 of 5",
    title: "Checking your eligibility.",
    description: "DTI, LTV, and NHF ratios are calculating server-side.",
  },
};

export const Submitting: Story = {
  args: {
    step: "Submitting",
    title: "Sending your application.",
    description: "Don't refresh — we'll redirect once it's logged.",
  },
};

export const Compact: Story = {
  args: {
    title: "Saving your scenario.",
    compact: true,
  },
};
