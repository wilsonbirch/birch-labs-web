import type { Metadata } from "next";

import type { Seo } from "@/lib/types";

/**
 * Title, description, and share image mirrored into Open Graph + Twitter tags.
 * Next replaces a parent's `openGraph` wholesale, so every page sets the full set.
 */
export function seoMetadata({ title, description, ogImage }: Seo): Metadata {
  const images = ogImage ? [ogImage] : undefined;
  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}
