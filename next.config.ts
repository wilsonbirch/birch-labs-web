import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's project root to this repo (a stray parent lockfile
  // otherwise causes a noisy "inferred workspace root" warning).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
