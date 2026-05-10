import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CriticalBanner } from "../components/CriticalBanner";
import { Button } from "../components/Button";

const meta: Meta<typeof CriticalBanner> = {
  title: "Primitives/CriticalBanner",
  component: CriticalBanner,
  parameters: { layout: "padded" },
  args: {
    intent: "error",
    title: "Submission failed",
    children: "We couldn't reach our servers. Try again, or message us on WhatsApp.",
  },
  argTypes: { intent: { control: "select", options: ["error", "warning"] } },
};
export default meta;
type Story = StoryObj<typeof CriticalBanner>;

export const Error: Story = {};

export const Warning: Story = {
  args: { intent: "warning", title: "Session expiring soon", children: "Your saved scenario expires in 5 minutes. Save or copy your inputs." },
};

export const WithAction: Story = {
  args: {
    action: (
      <div className="flex gap-2">
        <Button size="sm" variant="primary">Try again</Button>
        <Button size="sm" variant="ghost">Open WhatsApp</Button>
      </div>
    ),
  },
};

export const Dismissible: Story = {
  render: () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(true);
      if (!open) {
        return (
          <button onClick={() => setOpen(true)} className="text-sm underline text-ag-navy">
            Re-show banner
          </button>
        );
      }
      return (
        <CriticalBanner
          intent="warning"
          title="NDPR consent required"
          onDismiss={() => setOpen(false)}
          action={<Button size="sm">Review consent</Button>}
        >
          You haven&rsquo;t accepted the NDPR consent terms. We can&rsquo;t process your application without it.
        </CriticalBanner>
      );
    };
    return <Wrapper />;
  },
};
