import type { Img, Seo } from "@/lib/types";

import wordmarkWhite from "./images/hero-wordmark-white.svg";
import wordmark from "./images/hero-wordmark.svg";

export const home = {
  seo: {
    title: "Birch Labs — Full-stack development",
    description:
      "I build production software for founders and teams: AI-powered Shopify apps, custom SaaS, and motion-rich marketing sites. Ottawa-based, ship-focused.",
  } satisfies Seo,
  heroEyebrow: "> Full Stack Development",
  heroSubtitle:
    "Need a lead for your next software project, or an extra set of hands? Let's build something great together.",
  heroLogo: {
    src: wordmark,
    alt: "Birch Labs",
  } satisfies Img,
  heroLogoDark: {
    src: wordmarkWhite,
    alt: "Birch Labs",
  } satisfies Img,
  heroPrimaryButtonText: "See the work",
  heroSecondaryButtonText: "Start a project →",
  ctaEyebrow: "// let's build",
  ctaHeading: "Have a project?",
  ctaBody:
    "Short-form pitches welcome. Send a paragraph about what you're building, and I'll reply within 48 hours with honest thoughts and a rough estimate.",
  ctaButtonText: "Start a project →",
};
