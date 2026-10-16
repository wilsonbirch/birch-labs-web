import path from "node:path";

import { defineConfig } from "vitest/config";

// Content files import images the way next/image expects: an object with
// `src`, `width` and `height`. Vite would hand back a bare URL string, so stand
// in a minimal object for tests.
const staticImages = {
  name: "static-images",
  enforce: "pre" as const,
  load(id: string) {
    if (!/\.(png|jpe?g|webp|gif|svg)$/.test(id)) return null;
    const src = `/${path.basename(id)}`;
    return `export default { src: ${JSON.stringify(src)}, width: 1, height: 1 };`;
  },
};

export default defineConfig({
  plugins: [staticImages],
  resolve: { alias: { "@": path.resolve(import.meta.dirname) } },
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
    env: { NEXT_PUBLIC_SITE_URL: "https://birchlabs.ca" },
  },
});
