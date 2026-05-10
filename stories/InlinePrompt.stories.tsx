import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InlinePrompt } from "../components/InlinePrompt";

const meta: Meta<typeof InlinePrompt> = {
  title: "Primitives/InlinePrompt",
  component: InlinePrompt,
  parameters: { layout: "padded" },
  args: { children: "Most mortgage products require at least 10% deposit." },
  argTypes: { intent: { control: "select", options: ["info", "warning", "error", "success"] } },
};
export default meta;
type Story = StoryObj<typeof InlinePrompt>;

export const Info: Story = { args: { intent: "info" } };
export const Warning: Story = { args: { intent: "warning", children: "Above 80% LTV — most products charge a higher indicative rate." } };
export const Error: Story = { args: { intent: "error", children: "BVN must be 11 digits." } };
export const Success: Story = { args: { intent: "success", children: "Eligibility check passed — you can proceed." } };

export const WithTitle: Story = {
  args: {
    intent: "warning",
    title: "High loan-to-value",
    children: "Above 90% LTV — most products reject. Consider increasing your deposit.",
  },
};

export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <InlinePrompt intent="info">Most mortgage products require at least 10% deposit.</InlinePrompt>
      <InlinePrompt intent="warning">Above 80% LTV — your indicative rate may be higher.</InlinePrompt>
      <InlinePrompt intent="error">Above 90% LTV — most products reject.</InlinePrompt>
      <InlinePrompt intent="success">Eligibility check passed.</InlinePrompt>
    </div>
  ),
};
