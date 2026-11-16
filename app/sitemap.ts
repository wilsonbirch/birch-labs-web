import type { MetadataRoute } from "next";

import { pages } from "@/lib/pages";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
