import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { WizardProgressBar, WizardStepDots, type WizardStep } from "../components/WizardProgress";

const STEPS: WizardStep[] = [
  { id: "personal",  label: "About you" },
  { id: "employment", label: "Employment" },
  { id: "property",   label: "Property" },
  { id: "finance",    label: "Finance" },
  { id: "review",     label: "Review" },
];

// ── ProgressBar ────────────────────────────────────────────────
const barMeta: Meta<typeof WizardProgressBar> = {
  title: "Primitives/WizardProgress/Bar",
  component: WizardProgressBar,
  parameters: { layout: "padded" },
  args: { value: 0.4, label: "40%" },
};
export default barMeta;

type BarStory = StoryObj<typeof WizardProgressBar>;

export const BarEmpty: BarStory = { args: { value: 0, label: "0%" } };
export const BarMid: BarStory = { args: { value: 0.6, label: "60%" } };
export const BarFull: BarStory = { args: { value: 1, label: "100%" } };

// ── StepDots paired with Bar — the canonical wizard header ──────
export const PairedHeader: StoryObj<typeof WizardProgressBar> = {
  render: () => {
    const Wizard = () => {
      const [currentIndex, setCurrentIndex] = useState(2);
      const percent = currentIndex / (STEPS.length - 1);
      return (
        <div className="flex flex-col gap-4 max-w-2xl bg-ag-white border border-ag-border rounded-lg p-6">
          <WizardStepDots
            steps={STEPS}
            currentIndex={currentIndex}
            onStepClick={(_, i) => setCurrentIndex(i)}
          />
          <WizardProgressBar value={percent} label={`Step ${currentIndex + 1} of ${STEPS.length}`} />
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="text-sm text-ag-navy underline disabled:opacity-50"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            >
              ← Back
            </button>
            <button
              type="button"
              className="text-sm text-ag-navy ml-auto underline"
              onClick={() => setCurrentIndex(Math.min(STEPS.length - 1, currentIndex + 1))}
            >
              Next →
            </button>
          </div>
        </div>
      );
    };
    return <Wizard />;
  },
};

// ── 7-state matrix ─────────────────────────────────────────────
// For wizard progress, the meaningful states are the step statuses (pending/active/complete)
// plus disabled (whole wizard inert e.g. while submitting).
export const StateMatrix: StoryObj<typeof WizardProgressBar> = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <p className="eyebrow mb-3">Just-started · 0%</p>
        <WizardStepDots steps={STEPS} currentIndex={0} />
        <WizardProgressBar value={0} label="0%" className="mt-3" />
      </div>
      <div>
        <p className="eyebrow mb-3">Mid · 50%</p>
        <WizardStepDots steps={STEPS} currentIndex={2} />
        <WizardProgressBar value={0.5} label="50%" className="mt-3" />
      </div>
      <div>
        <p className="eyebrow mb-3">Last step · review</p>
        <WizardStepDots steps={STEPS} currentIndex={4} />
        <WizardProgressBar value={1} label="100%" className="mt-3" />
      </div>
      <div>
        <p className="eyebrow mb-3">All complete (post-submit)</p>
        <WizardStepDots steps={STEPS} currentIndex={STEPS.length} />
        <WizardProgressBar value={1} label="Submitted" className="mt-3" />
      </div>
    </div>
  ),
};
