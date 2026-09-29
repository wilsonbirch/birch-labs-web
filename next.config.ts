import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's project root to this repo (a stray parent lockfile
  // otherwise causes a noisy "inferred workspace root" warning).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // birchlabs.ca is canonical (NEXT_PUBLIC_SITE_URL); www points at the same
  // Fly app, so send it to the apex instead of serving a duplicate site.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.birchlabs.ca" }],
        destination: "https://birchlabs.ca/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
