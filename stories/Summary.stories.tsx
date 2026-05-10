import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Summary, type SummaryGroup } from "../components/Summary";

const GROUPS: SummaryGroup[] = [
  {
    id: "personal",
    title: "About you",
    rows: [
      { label: "Full name", value: "Adaeze Okafor" },
      { label: "Date of birth", value: "14 May 1992" },
      { label: "BVN", value: "12345678901", display: "••• 4321" },
      { label: "Email", value: "adaeze@example.com" },
    ],
  },
  {
    id: "employment",
    title: "Employment",
    rows: [
      { label: "Status", value: "Full-time employee" },
      { label: "Employer", value: "Lagos Tech Co." },
      { label: "Monthly income", value: "₦2,200,000" },
      { label: "Length of employment", value: "4 years 3 months" },
    ],
  },
  {
    id: "property",
    title: "Property details",
    rows: [
      { label: "Property type", value: "Existing build" },
      { label: "Location", value: "Lekki Phase 1, Lagos" },
      { label: "Property value", value: "₦75,000,000" },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    rows: [
      { label: "Mortgage type", value: "NHF Mortgage Loan" },
      { label: "Deposit", value: "₦15,000,000 (20%)" },
      { label: "Tenure", value: "20 years" },
      { label: "Indicative rate", value: "6.0% (subject to assessment)" },
    ],
  },
];

const meta: Meta<typeof Summary> = {
  title: "Primitives/Summary",
  component: Summary,
  parameters: { layout: "padded" },
  args: { groups: GROUPS },
};
export default meta;
type Story = StoryObj<typeof Summary>;

export const Default: Story = {};

export const WithEdit: Story = {
  args: {
    onEdit: (id) => console.info(`Edit clicked for group: ${id}`),
  },
};

export const SingleGroup: Story = {
  args: {
    groups: [GROUPS[0]],
  },
};
