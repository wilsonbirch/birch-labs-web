import type { Img, Seo } from "@/lib/types";

import wordmarkWhite from "./images/hero-wordmark-white.svg";
import wordmark from "./images/hero-wordmark.svg";

export const home = {
  seo: {
    title: "Birch Labs — Freelance full-stack developer · Ottawa",
    description:
      "I build production software for founders and teams: AI-powered Shopify apps, custom SaaS, and motion-rich marketing sites. Ottawa-based, ship-focused.",
  } satisfies Seo,
  heroEyebrow: "> freelance full-stack dev · ottawa",
  heroSubtitle:
    "I build production software, from AI-powered Shopify apps and custom SaaS to motion-rich marketing sites. I also take vibe-coded prototypes and get them production-ready, hardening the rough edges so they're ready to deploy. One developer, the full stack, and a bias toward shipping.",
  heroLogo: {
    src: wordmark,
    alt: "BIRCH LABS written logo (light mode)",
  } satisfies Img,
  heroLogoDark: {
    src: wordmarkWhite,
    alt: "BIRCH LABS written logo (dark mode)",
  } satisfies Img,
  heroPrimaryButtonText: "See the work",
  heroSecondaryButtonText: "Start a project →",
  ctaEyebrow: "// let's build",
  ctaHeading: "Have a project?",
  ctaBody:
    "Short-form pitches welcome. Send a paragraph about what you're building, and I'll reply within 48 hours with honest thoughts and a rough estimate.",
  ctaButtonText: "Start a project →",
};
