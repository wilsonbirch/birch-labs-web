import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-url";

/**
 * AI search and assistant crawlers, welcomed by name. `*` already allows them,
 * but some only act on an explicit group — and a named group replaces `*` for
 * that bot, so it repeats the /api/ disallow.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
