import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack workspace root to this app — there are stray lockfiles further
  // up the tree (~/Documents/, ~/) that would otherwise be inferred as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
