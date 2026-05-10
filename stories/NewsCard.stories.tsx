import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewsCard } from "../components/NewsCard";

const meta: Meta<typeof NewsCard> = {
  title: "Primitives/NewsCard",
  component: NewsCard,
  parameters: { layout: "padded" },
  args: {
    variant: "standard",
    date: "12 MAR 2026",
    source: "BusinessDay",
    headline: "AG Mortgage Bank disburses ₦2.8B to 97 Nigerian families.",
    description: "The PMI's biggest year on record, with NHF disbursements making up 62% of the total.",
  },
  argTypes: { variant: { control: "select", options: ["featured", "standard"] } },
};
export default meta;
type Story = StoryObj<typeof NewsCard>;

export const Standard: Story = {};
export const Featured: Story = { args: { variant: "featured" } };

export const StaggeredGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <NewsCard
        variant="featured"
        date="12 MAR 2026"
        source="BusinessDay"
        headline="AG Mortgage Bank disburses ₦2.8B to 97 Nigerian families."
        description="The PMI's biggest year on record, with NHF making up 62% of disbursement."
        href="#"
        className="md:row-span-2"
      />
      <NewsCard
        variant="standard"
        date="04 MAR 2026"
        source="ThisDay"
        headline="M-REIF window expands eligibility."
        description="Civil service workers now qualify."
        href="#"
      />
      <NewsCard
        variant="standard"
        date="28 FEB 2026"
        source="Premium Times"
        headline="ISO 9001:2015 recertified."
        description="Three years running."
        href="#"
      />
      <NewsCard
        variant="standard"
        date="14 FEB 2026"
        source="Punch"
        headline="Construction Finance launches in Ibadan."
        description="Mid-build draw-down available."
        href="#"
      />
      <NewsCard
        variant="standard"
        date="01 FEB 2026"
        source="Vanguard"
        headline="AG Mortgage joins Invest Africa."
        description="Cross-border PMI partnership."
        href="#"
      />
    </div>
  ),
};
