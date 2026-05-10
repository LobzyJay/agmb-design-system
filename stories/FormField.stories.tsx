import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "../components/FormField";

const meta: Meta<typeof FormField> = {
  title: "Primitives/FormField",
  component: FormField,
  parameters: { layout: "padded" },
  args: {
    label: "Full name",
    placeholder: "Adaeze Okafor",
  },
  argTypes: {
    forceState: { control: "select", options: [undefined, "hover", "focus-visible", "active"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    label: "BVN",
    placeholder: "12345678901",
    helper: "Your 11-digit Bank Verification Number — used for credit assessment, never shared.",
    inputMode: "numeric",
    maxLength: 11,
  },
};

export const Required: Story = { args: { required: true, label: "Email", placeholder: "you@example.com", type: "email" } };

export const WithPrefix: Story = {
  args: {
    label: "Property value",
    prefix: "₦",
    placeholder: "75,000,000",
    helper: "Use commas for readability — we'll handle the rest.",
    inputMode: "numeric",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Tenure",
    suffix: <span className="text-ag-muted text-sm">years</span>,
    placeholder: "20",
    inputMode: "numeric",
  },
};

// ── 7-state matrix (PRD §4.4) ──────────────────────────────────
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <p className="eyebrow mb-2">Default</p>
        <FormField label="Full name" placeholder="Adaeze Okafor" />
      </div>
      <div>
        <p className="eyebrow mb-2">Hover</p>
        <FormField label="Full name" placeholder="Adaeze Okafor" forceState="hover" />
      </div>
      <div>
        <p className="eyebrow mb-2">Focus-visible</p>
        <FormField label="Full name" placeholder="Adaeze Okafor" forceState="focus-visible" />
      </div>
      <div>
        <p className="eyebrow mb-2">Active (typing)</p>
        <FormField label="Full name" defaultValue="Adaeze O" forceState="active" />
      </div>
      <div>
        <p className="eyebrow mb-2">Disabled</p>
        <FormField label="Full name" placeholder="Adaeze Okafor" disabled />
      </div>
      <div>
        <p className="eyebrow mb-2">Loading (async validation)</p>
        <FormField label="BVN" defaultValue="12345678901" loading helper="Verifying with NIBSS…" />
      </div>
      <div>
        <p className="eyebrow mb-2">Error</p>
        <FormField
          label="BVN"
          defaultValue="123456"
          error="BVN must be 11 digits."
          inputMode="numeric"
          maxLength={11}
        />
      </div>
    </div>
  ),
};
