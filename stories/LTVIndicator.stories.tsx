import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LTVIndicator } from "../components/LTVIndicator";

const meta: Meta<typeof LTVIndicator> = {
  title: "Primitives/LTVIndicator",
  component: LTVIndicator,
  parameters: { layout: "padded" },
  args: { value: 75 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    band: { control: "select", options: [undefined, "safe", "caution", "warning"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof LTVIndicator>;

export const Safe: Story = { args: { value: 65 } };
export const Caution: Story = { args: { value: 85, message: "Most mortgage products require at least 10% deposit." } };
export const Warning: Story = { args: { value: 95, message: "Above 90% LTV — most products reject. Consider increasing your deposit." } };

// ── 7-state matrix (PRD §4.4) ──────────────────────────────────
// LTVIndicator is presentational; hover/focus/active are not interactive states for it.
// The matrix below covers the meaningful states: 3 bands + loading + disabled + error/empty.
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <p className="eyebrow mb-2">Default · safe band</p>
        <LTVIndicator value={65} />
      </div>
      <div>
        <p className="eyebrow mb-2">Default · caution band</p>
        <LTVIndicator value={85} message="Most products require at least 10% deposit." />
      </div>
      <div>
        <p className="eyebrow mb-2">Default · warning band</p>
        <LTVIndicator value={95} message="Above 90% LTV — most products reject. Consider increasing your deposit." />
      </div>
      <div>
        <p className="eyebrow mb-2">Loading (skeleton)</p>
        <LTVIndicator value={0} loading />
      </div>
      <div>
        <p className="eyebrow mb-2">Disabled</p>
        <LTVIndicator value={75} disabled />
      </div>
      <div>
        <p className="eyebrow mb-2">Edge: 0%</p>
        <LTVIndicator value={0} />
      </div>
      <div>
        <p className="eyebrow mb-2">Edge: 100%</p>
        <LTVIndicator value={100} />
      </div>
    </div>
  ),
};
