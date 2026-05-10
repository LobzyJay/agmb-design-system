import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Nudge } from "../components/Nudge";
import { Button } from "../components/Button";

const meta: Meta<typeof Nudge> = {
  title: "Primitives/Nudge",
  component: Nudge,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Nudge>;

export const ResumeWizard: Story = {
  args: {
    title: "Continue where you left off?",
    description: "Step 3 of 5 — Property details. We saved your inputs from earlier today.",
    primaryAction: <Button variant="primary">Resume</Button>,
    secondaryAction: <Button variant="ghost">Start over</Button>,
  },
};

export const RestoreCalculator: Story = {
  args: {
    title: "Pick up from your saved scenario?",
    description: "₦75M property · 20-year tenure · NHF mortgage. Saved 2 days ago.",
    primaryAction: <Button variant="primary" size="sm">Restore</Button>,
    secondaryAction: <Button variant="ghost" size="sm">Dismiss</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "We saved your last calculation",
    description: "Returning visitor — restore your figures or start fresh.",
    primaryAction: <Button variant="primary" size="sm">Restore</Button>,
    secondaryAction: <Button variant="ghost" size="sm">New calculation</Button>,
  },
};
