import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RepaymentSplitBar } from "../components/RepaymentSplitBar";

// AGMB RepaymentSplitBar stories — PRD §5.1 calculator output enhancement.
// Five canonical scenarios cover the band of input shapes the calculator
// hits across NHF (single-digit) → Commercial (mid-20s) rates.
//
// 2026-05-09 v3 dual-blue swap: principal=navy.vivid (emphasis stop) +
// interest=navy.deep (quieter dark navy). Gold demoted from this chart.

const meta: Meta<typeof RepaymentSplitBar> = {
  title: "Primitives/RepaymentSplitBar",
  component: RepaymentSplitBar,
  parameters: { layout: "padded" },
  args: {
    principal: 60_000_000,
    totalInterest: 39_200_000,
  },
  argTypes: {
    principal: { control: { type: "number", min: 0, step: 1_000_000 } },
    totalInterest: { control: { type: "number", min: 0, step: 1_000_000 } },
    inverse: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof RepaymentSplitBar>;

// Default — ~60/40 principal-to-interest. The shape a healthy NHF / M-REIF
// 20-year scenario tends to land at.
export const Default: Story = {
  args: { principal: 60_000_000, totalInterest: 39_200_000 },
};

// Heavy interest — ~33/67. Commercial rate at long tenure; the bar telegraphs
// the cost of a market-rate product without an explanation.
export const HeavyInterest: Story = {
  args: { principal: 40_000_000, totalInterest: 80_000_000 },
};

// Mostly paid off — ~83/17. A short-tenure single-digit scenario; here the
// interest segment falls below the 25% label threshold, demonstrating the
// auto-hide of the "interest" inline label.
export const MostlyPaidOff: Story = {
  args: { principal: 5_000_000, totalInterest: 1_000_000 },
};

// Inverse on navy — for use on the calculator's input panel if the bar
// ever needs to render there. (Currently it lives in the cream output panel,
// but the inverse variant is part of the primitive surface and should be
// exercised in the specimen.)
export const InverseOnNavy: Story = {
  render: (args) => (
    <div className="bg-ag-navy p-8 rounded-lg">
      <RepaymentSplitBar {...args} inverse />
    </div>
  ),
  args: { principal: 60_000_000, totalInterest: 39_200_000 },
};

// Empty / loading — both values zero. Renders a neutral hairline track so
// the layout doesn't collapse around it; consumers don't need to gate render.
export const Empty: Story = {
  args: { principal: 0, totalInterest: 0 },
};

// Side-by-side reference grid — useful for design review.
export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <p className="eyebrow mb-3">Default · ~60 / 40</p>
        <RepaymentSplitBar principal={60_000_000} totalInterest={39_200_000} />
      </div>
      <div>
        <p className="eyebrow mb-3">Heavy interest · ~33 / 67</p>
        <RepaymentSplitBar principal={40_000_000} totalInterest={80_000_000} />
      </div>
      <div>
        <p className="eyebrow mb-3">Mostly paid off · ~83 / 17</p>
        <RepaymentSplitBar principal={5_000_000} totalInterest={1_000_000} />
      </div>
      <div className="bg-ag-navy p-6 rounded-lg">
        <p className="eyebrow text-ag-cream mb-3">Inverse · navy surface</p>
        <RepaymentSplitBar principal={60_000_000} totalInterest={39_200_000} inverse />
      </div>
      <div>
        <p className="eyebrow mb-3">Empty · loading</p>
        <RepaymentSplitBar principal={0} totalInterest={0} />
      </div>
    </div>
  ),
};
