import type { MetadataRoute } from "next";

import { navLinks } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

/** Every public page: home, the nav pages, and contact. */
const PAGES = ["/", ...navLinks.map((link) => link.href), "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
