import type { Metadata } from "next";

import type { Seo } from "@/lib/types";

/** Bundled 1200x630 brand card, used when a page sets no `ogImage`. */
const DEFAULT_OG_IMAGE = "/og-image.png";

/**
 * Title, description, and share image mirrored into Open Graph + Twitter tags.
 * Next replaces a parent's `openGraph` wholesale, so every page sets the full set.
 * Pass the page's `path` to set its canonical URL (resolved against
 * metadataBase); the root layout omits it so the 404 page gets no canonical.
 */
export function seoMetadata(
  { title, description, ogImage = DEFAULT_OG_IMAGE }: Seo,
  path?: string,
): Metadata {
  const images = [ogImage];
  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: { title, description, images, ...(path && { url: path }) },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
