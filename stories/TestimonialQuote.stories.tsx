import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialQuote } from "../components/TestimonialQuote";

const meta: Meta<typeof TestimonialQuote> = {
  title: "Primitives/TestimonialQuote",
  component: TestimonialQuote,
  parameters: { layout: "padded" },
  args: {
    quote: "We moved into our 3-bedroom in Lekki six months after applying.",
    attribution: "Adaeze O.",
    location: "Lagos",
    product: "NHF Mortgage",
  },
};
export default meta;
type Story = StoryObj<typeof TestimonialQuote>;

export const Default: Story = {};

export const Inverse: Story = {
  args: { inverse: true },
  parameters: { backgrounds: { default: "ag-navy" } },
};

// PRD §3.3 — placeholder when no consented testimonials exist yet.
export const PlaceholderState: Story = {
  args: {
    quote: "Names will land here once consented.",
    attribution: "—",
    location: "NDPR-cleared at launch",
  },
};
