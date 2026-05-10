import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SuccessScreen } from "../components/SuccessScreen";
import { Button } from "../components/Button";

const meta: Meta<typeof SuccessScreen> = {
  title: "Primitives/SuccessScreen",
  component: SuccessScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof SuccessScreen>;

export const ApplicationReceived: Story = {
  args: {
    title: "Application received.",
    reference: "AGMB-2026-0048213",
    steps: [
      "A mortgage advisor will call within 2 working days.",
      "We'll email your offer letter once credit assessment clears.",
      "Sign the offer to lock the indicative rate.",
    ],
    actions: (
      <>
        <Button variant="primary" size="sm">Download PDF copy</Button>
        <Button variant="secondary" size="sm">Calculate another scenario</Button>
        <Button variant="ghost" size="sm">Return home</Button>
      </>
    ),
  },
};

export const EnquirySubmitted: Story = {
  args: {
    title: "Enquiry received.",
    reference: "AGMB-Q-2026-002847",
    steps: [
      "An advisor will message you on WhatsApp within 4 working hours.",
      "Reply with your preferred call time.",
    ],
    actions: <Button variant="ghost">Return home</Button>,
    compact: true,
  },
};

export const ScenarioShared: Story = {
  args: {
    title: "Scenario sent.",
    steps: [
      "We sent a copy of your scenario to the email address provided.",
      "Click the link in the email to restore the figures here.",
    ],
    actions: <Button variant="primary" size="sm">Done</Button>,
    compact: true,
  },
};
