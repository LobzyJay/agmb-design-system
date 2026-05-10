import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
  args: {
    title: "Try a property value to see your numbers.",
  },
  argTypes: {
    inverse: { control: "boolean" },
    compact: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const CalculatorIdle: Story = {
  args: {
    title: "Try a property value to see your numbers.",
    description: "Slide the property value or type one in. We update your indicative monthly repayment as you go.",
  },
};

export const CalculatorIdleInverseCompact: Story = {
  args: {
    title: "Try a property value to see your numbers.",
    description: "We update as you type.",
    inverse: true,
    compact: true,
  },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const NewsEmpty: Story = {
  args: {
    title: "More news, soon.",
    description: "Press releases and partnership announcements land here. Subscribe to be notified.",
    action: <Button size="sm" variant="secondary">Subscribe</Button>,
  },
};

export const TestimonialsPending: Story = {
  args: {
    title: "Names with consent will land here.",
    description: "We never invent customer stories. Until consented testimonials are signed off, this section reads silent.",
  },
};

export const WizardIdle: Story = {
  args: {
    title: "Ready when you are.",
    description: "About 5 minutes. Your inputs save automatically.",
    action: <Button variant="primary">Start application</Button>,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 16h20M22 10l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};
