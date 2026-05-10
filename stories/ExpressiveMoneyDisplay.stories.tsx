import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { ExpressiveMoneyDisplay } from "../components/ExpressiveMoneyDisplay";

const meta: Meta<typeof ExpressiveMoneyDisplay> = {
  title: "Primitives/ExpressiveMoneyDisplay",
  component: ExpressiveMoneyDisplay,
  parameters: { layout: "padded" },
  args: { value: 485_720, size: "xl", label: "Your estimated repayment", trailing: "per month" },
  argTypes: {
    size: { control: "select", options: ["xl", "m", "sm"] },
    compact: { control: "boolean" },
    inverse: { control: "boolean" },
    animate: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ExpressiveMoneyDisplay>;

export const HeroXL: Story = {
  args: { value: 485_720, size: "xl", label: "Your estimated repayment", trailing: "per month" },
};

export const SummaryM: Story = {
  args: { value: 39_200_000, size: "m", label: "Total interest", compact: true },
};

export const Inverse: Story = {
  args: { value: 485_720, size: "xl", label: "Your estimated repayment", trailing: "per month", inverse: true },
  parameters: { backgrounds: { default: "ag-navy" } },
};

export const EmptyState: Story = {
  args: { value: null, size: "xl", label: "Your estimated repayment", trailing: "Try a property value to see your numbers." },
};

// Live counter — demonstrates the 300ms animated lerp.
export const AnimatedCounter: Story = {
  render: () => {
    const Counter = () => {
      const [value, setValue] = useState(485_720);
      useEffect(() => {
        const id = setInterval(() => {
          setValue((v) => v + Math.floor(Math.random() * 100_000) - 50_000);
        }, 1500);
        return () => clearInterval(id);
      }, []);
      return (
        <ExpressiveMoneyDisplay
          value={value}
          size="xl"
          label="Live monthly repayment"
          trailing="(updates every 1.5s — counter interpolates over 300ms)"
        />
      );
    };
    return <Counter />;
  },
};

// ── State matrix — empty, populated, summary stack, calculator preview ──
export const CalculatorOutputPanel: Story = {
  render: () => (
    <div className="bg-ag-cream p-8 rounded-lg max-w-md flex flex-col gap-8 border border-ag-border">
      <ExpressiveMoneyDisplay
        value={485_720}
        size="xl"
        label="Your estimated repayment"
        trailing="per month · indicative"
        ariaLive
      />
      <div className="h-px bg-ag-border" />
      <div className="flex flex-col gap-4">
        <ExpressiveMoneyDisplay value={39_200_000} size="m" label="Total interest payable" compact />
        <ExpressiveMoneyDisplay value={89_200_000} size="m" label="Total repayment" compact />
      </div>
    </div>
  ),
};

export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <p className="eyebrow mb-2">Empty</p>
        <ExpressiveMoneyDisplay value={null} size="xl" label="Your estimated repayment" trailing="Try a property value to see your numbers." />
      </div>
      <div>
        <p className="eyebrow mb-2">Populated · XL</p>
        <ExpressiveMoneyDisplay value={485_720} size="xl" label="Your estimated repayment" trailing="per month" />
      </div>
      <div>
        <p className="eyebrow mb-2">Populated · M (compact)</p>
        <ExpressiveMoneyDisplay value={39_200_000} size="m" label="Total interest" compact />
      </div>
      <div>
        <p className="eyebrow mb-2">Populated · SM</p>
        <ExpressiveMoneyDisplay value={2_800_000_000} size="sm" label="Disbursed past year" compact />
      </div>
      <div className="bg-ag-navy p-6 rounded-lg">
        <p className="eyebrow mb-2 text-ag-gold">Inverse · XL on navy</p>
        <ExpressiveMoneyDisplay value={485_720} size="xl" label="Your estimated repayment" trailing="per month" inverse />
      </div>
    </div>
  ),
};
