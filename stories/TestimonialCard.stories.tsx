import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialCard } from "../components/TestimonialCard";

const meta: Meta<typeof TestimonialCard> = {
  title: "Primitives/TestimonialCard",
  component: TestimonialCard,
  parameters: { layout: "padded" },
  args: {
    attribution: "Tunde A.",
    location: "Abuja",
    product: "M-REIF Mortgage",
    outcome: "Settled into my Maitama duplex eight months after applying. The advisor walked me through every step.",
  },
};
export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {};

export const CarouselRow: Story = {
  render: () => (
    <div className="flex gap-4 overflow-x-auto pb-4 max-w-5xl">
      <TestimonialCard
        attribution="Adaeze O."
        location="Lagos"
        product="NHF Mortgage"
        outcome="Moved into our 3-bedroom in Lekki six months after applying."
      />
      <TestimonialCard
        attribution="Tunde A."
        location="Abuja"
        product="M-REIF Mortgage"
        outcome="Settled into my Maitama duplex eight months after applying."
      />
      <TestimonialCard
        attribution="Chiamaka N."
        location="Port Harcourt"
        product="Construction Finance"
        outcome="Built our forever home in Trans Amadi — draw-down was clean every month."
      />
      <TestimonialCard
        attribution="Olumide R."
        location="Lagos"
        product="REI Finance"
        outcome="Bought a duplex in Ikoyi as a long-let. The repayment fits inside the rental income."
      />
    </div>
  ),
};
