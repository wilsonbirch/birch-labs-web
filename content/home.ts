import { site } from "@/content/site";
import type { Img, Seo } from "@/lib/types";

import wordmarkWhite from "./images/hero-wordmark-white.svg";
import wordmark from "./images/hero-wordmark.svg";

export const home = {
  seo: {
    title: "Birch Labs | Own your software",
    description:
      "Own your software. AI has made it possible to build any tool you need. I get yours across the line and keep it running. Based in Ottawa.",
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
  heroPrimaryButtonText: "Own your software →",
  heroPrimaryHref: "/own-your-software",
  heroSecondaryButtonText: "See the work",
  heroSecondaryHref: "/work",
};
