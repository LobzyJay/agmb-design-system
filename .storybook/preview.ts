import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

// next/font CSS variables are not auto-injected into Storybook unless wrapped via a
// decorator. For Day 1.2, primitives are validated for colour / spacing / motion / state
// matrix — type fidelity in Storybook is best-effort. The Next dev server (port 3000)
// remains the canonical render. Day 3.5 a11y pass tightens this if needed.

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "ag-cream",
      values: [
        { name: "ag-cream",  value: "#F8F5EF" },
        { name: "ag-white",  value: "#FFFFFF" },
        { name: "ag-navy",   value: "#0A2540" },
        { name: "ag-light",  value: "#F4F5F7" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "todo" },
  },
};

export default preview;
