import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ListItem } from "../components/ListItem";
import { MORTGAGE_TYPES, MORTGAGE_TYPE_LABEL, MORTGAGE_TYPE_RATE } from "../constants/mortgage";

const meta: Meta<typeof ListItem> = {
  title: "Primitives/ListItem",
  component: ListItem,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["button", "checkbox", "icon-button", "navigation", "no-action", "radio", "switch"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    forceState: { control: "select", options: [undefined, "hover", "focus-visible", "active"] },
  },
};
export default meta;
type Story = StoryObj<typeof ListItem>;

export const Radio: Story = {
  args: {
    variant: "radio",
    title: "NHF Mortgage Loan",
    description: "Federal scheme. 6% indicative rate. NHF-eligible applicants only.",
    helper: "9.5%",
    selected: true,
  },
};

export const Checkbox: Story = {
  args: {
    variant: "checkbox",
    title: "I am NDPR-consenting",
    description: "We process your data in line with the Nigerian Data Protection Regulation.",
    selected: true,
  },
};

export const Switch: Story = {
  args: {
    variant: "switch",
    title: "Receive scenario updates",
    description: "Get an email when your saved scenario's indicative rate changes.",
    selected: false,
  },
};

export const Navigation: Story = {
  args: {
    variant: "navigation",
    title: "M-REIF Mortgage",
    description: "First-mover product. Indicative 9.5% over 20 years.",
    helper: "9.5%",
  },
};

export const Button: Story = {
  args: {
    variant: "button",
    title: "Save scenario",
    description: "Stores your inputs locally — pick up where you left off.",
  },
};

// ── Mortgage-type radio group (the §05 calculator selector) ─────
export const MortgageTypeRadioGroup: Story = {
  render: () => {
    const Group = () => {
      const [selected, setSelected] = useState<string>("nhf");
      return (
        <div className="flex flex-col gap-2 max-w-md" role="radiogroup" aria-label="Mortgage type">
          {MORTGAGE_TYPES.map((type) => (
            <ListItem
              key={type}
              variant="radio"
              name="mortgage-type"
              value={type}
              title={MORTGAGE_TYPE_LABEL[type]}
              helper={`${MORTGAGE_TYPE_RATE[type].toFixed(1)}% indicative`}
              selected={selected === type}
              onSelect={() => setSelected(type)}
            />
          ))}
        </div>
      );
    };
    return <Group />;
  },
};

// ── 7-state matrix (PRD §4.4) ──────────────────────────────────
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <p className="eyebrow">Default</p>
      <ListItem variant="radio" title="NHF Mortgage Loan" helper="6.0%" />
      <p className="eyebrow mt-3">Hover</p>
      <ListItem variant="radio" title="NHF Mortgage Loan" helper="6.0%" forceState="hover" />
      <p className="eyebrow mt-3">Focus-visible</p>
      <ListItem variant="radio" title="NHF Mortgage Loan" helper="6.0%" forceState="focus-visible" />
      <p className="eyebrow mt-3">Active (selected)</p>
      <ListItem variant="radio" title="NHF Mortgage Loan" helper="6.0%" selected />
      <p className="eyebrow mt-3">Disabled</p>
      <ListItem variant="radio" title="Construction Finance" helper="24.0%" disabled />
      <p className="eyebrow mt-3">Loading</p>
      <ListItem variant="radio" title="M-REIF Mortgage" helper="9.5%" loading />
      <p className="eyebrow mt-3">Error (paired with InlinePrompt — see §05)</p>
      <ListItem
        variant="radio"
        title="M-REIF Mortgage"
        description="Eligibility check failed — try a different mortgage type."
        helper="9.5%"
      />
    </div>
  ),
};
