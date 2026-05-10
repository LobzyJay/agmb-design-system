import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GoldShader } from "../components/GoldShader";

// AGMB GoldShader stories — the procedural metallic-gold celebration glyph.
// Sanctioned ONLY for SuccessScreen. The gold demotion (Adewale 2026-05-09 v3)
// stays in effect everywhere else; this primitive is the single warmth
// exception.

const meta: Meta<typeof GoldShader> = {
  title: "Primitives/GoldShader",
  component: GoldShader,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#F8F5EF" },
        { name: "white", value: "#FFFFFF" },
        { name: "navy", value: "#0A2540" },
      ],
    },
  },
  argTypes: {
    shape: {
      control: { type: "inline-radio" },
      options: ["tick", "ring", "underline"],
    },
    size: {
      control: { type: "range", min: 24, max: 128, step: 4 },
    },
    forceMotion: { control: "boolean" },
    forceReduce: { control: "boolean" },
  },
  args: {
    shape: "tick",
    size: 56,
    forceMotion: false,
    forceReduce: false,
  },
};
export default meta;
type Story = StoryObj<typeof GoldShader>;

// Default — the canonical celebration tick at 56px.
export const DefaultTick: Story = {
  args: { shape: "tick", size: 56 },
};

// Size matrix — tick at 32 / 56 / 96px.
export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="tick" size={32} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          32px
        </figcaption>
      </figure>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="tick" size={56} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          56px · canonical
        </figcaption>
      </figure>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="tick" size={96} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          96px
        </figcaption>
      </figure>
    </div>
  ),
};

// All shapes side-by-side at the canonical 56px.
export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="tick" size={56} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          tick
        </figcaption>
      </figure>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="ring" size={56} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ring
        </figcaption>
      </figure>
      <figure style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <GoldShader shape="underline" size={56} />
        <figcaption style={{ fontSize: 11, color: "#5C6470", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          underline
        </figcaption>
      </figure>
    </div>
  ),
};

// Reduced-motion variant — animation collapses to a single static paint.
// Use `forceReduce` in stories so the fallback is visible regardless of the
// designer's actual media-query state.
export const ReducedMotion: Story = {
  name: "Reduced motion (static fallback)",
  args: { shape: "tick", size: 56, forceReduce: true },
  parameters: {
    docs: {
      description: {
        story:
          "Honours `prefers-reduced-motion: reduce` by default. With `forceReduce`, the orbit collapses to a single paint at angle π/4, the catch freezes mid-arc, and no `requestAnimationFrame` loop runs.",
      },
    },
  },
};

// Ring variant on navy — the SuccessScreen scenario where a wider gesture is wanted.
export const RingOnNavy: Story = {
  args: { shape: "ring", size: 96 },
  parameters: { backgrounds: { default: "navy" } },
};
