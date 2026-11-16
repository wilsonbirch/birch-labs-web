import { site } from "@/content/site";
import type { Img, Seo } from "@/lib/types";

import wordmarkWhite from "./images/hero-wordmark-white.svg";
import wordmark from "./images/hero-wordmark.svg";

export const home = {
  seo: {
    title: "Birch Labs | Own your software",
    description:
      "Anyone can start building software with AI. I get yours across the line, from sign-in and payments to security and hosting, and keep it running. Ottawa-based.",
  } satisfies Seo,
  heroEyebrow: "> Own your software",
  heroSubtitle: site.pitch,
  heroLogo: {
    src: wordmark,
    alt: "Birch Labs",
  } satisfies Img,
  heroLogoDark: {
    src: wordmarkWhite,
    alt: "Birch Labs",
  } satisfies Img,
  heroPrimaryButtonText: "How it works",
  heroPrimaryHref: "/own-your-software",
  heroSecondaryButtonText: "See the work",
  heroSecondaryHref: "/work",
};
