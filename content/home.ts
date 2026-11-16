import { site } from "@/content/site";
import type { Seo } from "@/lib/types";

export const home = {
  seo: {
    title: "Birch Labs | Own your software",
    description:
      "Own your software. AI has made it possible to build any tool you need. I get yours across the line and keep it running. Based in Ottawa.",
  } satisfies Seo,
  heroEyebrow: "> Own your software",
  heroSubtitle: site.pitch,
  heroLogoAlt: "Birch Labs",
  heroPrimaryButtonText: "Own your software →",
  heroPrimaryHref: "/own-your-software",
  heroSecondaryButtonText: "See the work",
  heroSecondaryHref: "/work",
};
