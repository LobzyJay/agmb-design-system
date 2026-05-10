import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { PercentInput } from "../components/PercentInput";

const meta: Meta<typeof PercentInput> = {
  title: "Primitives/PercentInput",
  component: PercentInput,
  parameters: { layout: "padded" },
  args: {
    label: "Interest rate",
    placeholder: "6.00",
    step: 0.05,
    min: 0,
    max: 50,
    decimals: 2,
  },
};
export default meta;
type Story = StoryObj<typeof PercentInput>;

// ── Default ────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    helper: "Typical NHF rate is 6%",
  },
};

// ── State matrix (6 states — loading excluded: no async path for percent) ──
// Empty · Filled · Focus · Hover · Error · Disabled
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div>
        <p className="eyebrow mb-2">Empty</p>
        <PercentInput label="Interest rate" placeholder="6.00" />
      </div>
      <div>
        <p className="eyebrow mb-2">Filled</p>
        <PercentInput label="Interest rate" defaultValue={6} helper="Typical NHF rate is 6%" />
      </div>
      <div>
        <p className="eyebrow mb-2">Focus-visible</p>
        <PercentInput
          label="Interest rate"
          defaultValue={6}
          helper="Typical NHF rate is 6%"
          forceState="focus-visible"
        />
      </div>
      <div>
        <p className="eyebrow mb-2">Hover</p>
        <PercentInput label="Interest rate" defaultValue={6} forceState="hover" />
      </div>
      <div>
        <p className="eyebrow mb-2">Error</p>
        <PercentInput
          label="Interest rate"
          defaultValue={75}
          error="Rate must be between 0% and 50%."
          min={0}
          max={50}
        />
      </div>
      <div>
        <p className="eyebrow mb-2">Disabled</p>
        <PercentInput
          label="Interest rate"
          defaultValue={6}
          helper="Set by selected mortgage type."
          disabled
        />
      </div>
    </div>
  ),
};

// ── With stepper ────────────────────────────────────────────────────────────
export const WithStepper: Story = {
  render: () => {
    const WithStepperExample = () => {
      const [value, setValue] = useState<number | null>(6.0);
      return (
        <div className="flex flex-col gap-2 max-w-sm">
          <PercentInput
            label="Interest rate"
            value={value}
            onValueChange={setValue}
            step={0.05}
            min={0}
            max={50}
            decimals={2}
            showStepper
            helper="Use ± or type a value. Steps of 0.05%."
          />
          <p className="text-xs text-ag-muted numeric">
            Raw numeric value: {value === null ? "null" : value}
          </p>
        </div>
      );
    };
    return <WithStepperExample />;
  },
};

// ── With error ──────────────────────────────────────────────────────────────
export const WithError: Story = {
  args: {
    label: "Interest rate",
    defaultValue: 52,
    error: "Rate must be between 0% and 50%. Contact your advisor for non-standard rates.",
    min: 0,
    max: 50,
  },
};

// ── Scale variants (sm · md · lg) ───────────────────────────────────────────
export const ScaleVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div>
        <p className="eyebrow mb-2">sm</p>
        <PercentInput label="Interest rate" defaultValue={6} size="sm" />
      </div>
      <div>
        <p className="eyebrow mb-2">md (default)</p>
        <PercentInput label="Interest rate" defaultValue={6} size="md" helper="Typical NHF rate is 6%" />
      </div>
      <div>
        <p className="eyebrow mb-2">lg</p>
        <PercentInput label="Interest rate" defaultValue={6} size="lg" helper="Typical NHF rate is 6%" />
      </div>
    </div>
  ),
};

// ── Controlled mode ─────────────────────────────────────────────────────────
// Shows how the §05 calculator and §06 wizard would consume the primitive.
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState<number | null>(6.0);
      return (
        <div className="flex flex-col gap-2 max-w-sm">
          <PercentInput
            label="Interest rate"
            value={value}
            onValueChange={setValue}
            step={0.05}
            min={0}
            max={50}
            decimals={2}
            showStepper
            helper="Typical NHF rate is 6% per annum."
          />
          <p className="text-xs text-ag-muted numeric">
            Parent state: {value === null ? "null" : `${value}%`}
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};
