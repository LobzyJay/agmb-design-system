import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AGMB Button — PRD §4.6 + 2026-05-09 v3 gold-demotion. " +
          "5 variants × 3 sizes × 7 states (shadcn-aligned: " +
          "primary | secondary | outline | ghost | destructive). " +
          "All buttons are min 48px tall (size=md). Hover transitions use " +
          "var(--motion-duration-fast) + var(--motion-ease-default) tokens.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    forceState: { control: "select", options: [undefined, "hover", "focus-visible", "active"] },
  },
  args: { children: "Calculate my mortgage" },
};
export default meta;
type Story = StoryObj<typeof Button>;

// ── Variants ────────────────────────────────────────────────────
export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Speak to an advisor" } };
export const Outline: Story = {
  args: { variant: "outline", children: "Speak to an advisor" },
  parameters: { docs: { description: { story: "shadcn-aligned alias of `secondary`. Same visual; surfaces the shadcn convention without breaking AGMB API stability." } } },
};
export const Ghost: Story = { args: { variant: "ghost", children: "Learn more →" } };
export const Destructive: Story = {
  args: { variant: "destructive", children: "Cancel application" },
  parameters: { docs: { description: { story: "pair.cta.destructive (feedback.danger + cream). Reserved for cancel application / delete saved scenario / submission rollback. Never the default action." } } },
};

// ── 7-state matrix per variant (PRD §4.4 mandate) ───────────────
const STATES = ["default", "hover", "focus-visible", "active", "disabled", "loading", "error"] as const;

export const StateMatrixPrimary: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="eyebrow">Primary · 7 states</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {STATES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Button
              variant="primary"
              forceState={s === "hover" || s === "focus-visible" || s === "active" ? s : undefined}
              disabled={s === "disabled"}
              loading={s === "loading"}
              error={s === "error"}
            >
              Calculate
            </Button>
            <span className="numeric text-xs text-ag-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StateMatrixSecondary: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="eyebrow">Secondary · 7 states</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {STATES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Button
              variant="secondary"
              forceState={s === "hover" || s === "focus-visible" || s === "active" ? s : undefined}
              disabled={s === "disabled"}
              loading={s === "loading"}
              error={s === "error"}
            >
              Advisor
            </Button>
            <span className="numeric text-xs text-ag-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StateMatrixGhost: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="eyebrow">Ghost · 7 states</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {STATES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              forceState={s === "hover" || s === "focus-visible" || s === "active" ? s : undefined}
              disabled={s === "disabled"}
              loading={s === "loading"}
              error={s === "error"}
            >
              Learn more →
            </Button>
            <span className="numeric text-xs text-ag-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const StateMatrixDestructive: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <p className="eyebrow">Destructive · 7 states</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {STATES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Button
              variant="destructive"
              forceState={s === "hover" || s === "focus-visible" || s === "active" ? s : undefined}
              disabled={s === "disabled"}
              loading={s === "loading"}
              error={s === "error"}
            >
              Cancel
            </Button>
            <span className="numeric text-xs text-ag-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ── Sizes ────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium (PRD baseline · 48px)</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ── In a form context — fullWidth on mobile ─────────────────────
export const FormContext: Story = {
  render: () => (
    <div className="w-72 flex flex-col gap-2">
      <Button variant="primary" fullWidth>Calculate my mortgage</Button>
      <Button variant="secondary" fullWidth>Speak to an advisor</Button>
    </div>
  ),
};
