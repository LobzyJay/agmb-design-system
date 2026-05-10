import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { MoneyInput } from "../components/MoneyInput";

const meta: Meta<typeof MoneyInput> = {
  title: "Primitives/MoneyInput",
  component: MoneyInput,
  parameters: { layout: "padded" },
  args: { label: "Property value", placeholder: "75,000,000" },
};
export default meta;
type Story = StoryObj<typeof MoneyInput>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: 75_000_000 },
};

export const WithBounds: Story = {
  args: {
    label: "Property value",
    defaultValue: 75_000_000,
    min: 1_000_000,
    max: 500_000_000,
    helper: "Range: ₦1M – ₦500M. Out-of-range values clamp on blur.",
  },
};

export const PasteBehaviour: Story = {
  args: {
    label: "Property value",
    helper: "Try pasting `₦5,000,000` — the field strips the prefix and commas automatically.",
  },
};

// Controlled-mode example showing onValueChange wiring (this is how the §05 calculator consumes it)
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState<number | null>(75_000_000);
      return (
        <div className="flex flex-col gap-2 max-w-md">
          <MoneyInput
            label="Property value"
            value={value}
            onValueChange={setValue}
            min={1_000_000}
            max={500_000_000}
          />
          <p className="text-xs text-ag-muted numeric">
            Parent state (raw number): {value === null ? "null" : value.toLocaleString()}
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

// ── 7-state matrix (PRD §4.4) ──────────────────────────────────
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <p className="eyebrow mb-2">Default</p>
        <MoneyInput label="Property value" placeholder="75,000,000" />
      </div>
      <div>
        <p className="eyebrow mb-2">Hover</p>
        <MoneyInput label="Property value" placeholder="75,000,000" forceState="hover" />
      </div>
      <div>
        <p className="eyebrow mb-2">Focus-visible</p>
        <MoneyInput label="Property value" placeholder="75,000,000" forceState="focus-visible" />
      </div>
      <div>
        <p className="eyebrow mb-2">Active (typing)</p>
        <MoneyInput label="Property value" defaultValue={75_000_000} forceState="active" />
      </div>
      <div>
        <p className="eyebrow mb-2">Disabled</p>
        <MoneyInput label="Property value" defaultValue={75_000_000} disabled />
      </div>
      <div>
        <p className="eyebrow mb-2">Loading (async validation)</p>
        <MoneyInput label="Property value" defaultValue={75_000_000} loading helper="Verifying valuation…" />
      </div>
      <div>
        <p className="eyebrow mb-2">Error (out of range)</p>
        <MoneyInput
          label="Property value"
          defaultValue={750_000_000}
          error="Property value must be between ₦1M and ₦500M."
          min={1_000_000}
          max={500_000_000}
        />
      </div>
    </div>
  ),
};
