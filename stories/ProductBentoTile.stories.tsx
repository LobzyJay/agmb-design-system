import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductBentoTile } from "../components/ProductBentoTile";

const meta: Meta<typeof ProductBentoTile> = {
  title: "Primitives/ProductBentoTile",
  component: ProductBentoTile,
  parameters: { layout: "padded" },
  args: {
    variant: "mid",
    tier: "flagship",
    title: "NHF Mortgage Loan",
    description: "Federal Government-backed scheme. 6% indicative rate for public servants and qualifying Nigerians.",
  },
  argTypes: {
    variant: { control: "select", options: ["hero", "mid", "wide"] },
    tier:    { control: "select", options: ["flagship", "secondary"] },
  },
};
export default meta;
type Story = StoryObj<typeof ProductBentoTile>;

export const Mid: Story = {};

export const Wide: Story = {
  args: {
    variant: "wide",
    title: "Mortgage Advisory",
    eyebrow: "Flagship service",
    description: "One-to-one guidance from our CBN-licensed advisors. From eligibility check to offer letter.",
    href: "#",
    ctaLabel: "Book a consultation →",
  },
};

export const Hero: Story = {
  args: {
    variant: "hero",
    title: "Own your home.",
    eyebrow: "NHF Mortgage",
    description: "Nigeria’s most accessible home-ownership scheme. Rates from 6%.",
    href: "#",
    ctaLabel: "Check your eligibility →",
  },
};

export const BentoGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
      <div className="md:col-span-2">
        <ProductBentoTile
          variant="hero"
          tier="flagship"
          title="Own your home."
          eyebrow="NHF Mortgage"
          description="Nigeria’s most accessible home-ownership scheme. Rates from 6%."
          href="#"
          ctaLabel="Check eligibility →"
        />
      </div>
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        title="M-REIF Mortgage"
        description="Expanded eligibility. 9.5% indicative rate."
        href="#"
      />
      <ProductBentoTile
        variant="mid"
        tier="flagship"
        title="Commercial Mortgage"
        description="22% indicative. Up to 30-year tenure."
        href="#"
      />
      <div className="md:col-span-2">
        <ProductBentoTile
          variant="wide"
          tier="flagship"
          title="Mortgage Advisory"
          eyebrow="End-to-end guidance"
          description="CBN-licensed advisors. From eligibility to offer letter."
          href="#"
          ctaLabel="Book a consultation →"
        />
      </div>
    </div>
  ),
};
