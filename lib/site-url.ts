/** Absolute origin for canonical URLs, the sitemap, llms.txt, and JSON-LD. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
