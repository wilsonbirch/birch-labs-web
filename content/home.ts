import { site } from "@/content/site";
import type { Seo } from "@/lib/types";

export const home = {
  seo: {
    title: "Birch Labs | Own your software",
    description: `${site.tagline} ${site.pitch} Based in Ottawa.`,
  } satisfies Seo,
  heroEyebrow: "> Own your software",
  heroSubtitle: site.pitch,
  heroLogoAlt: "Birch Labs",
  heroPrimaryButtonText: "Own your software →",
  heroPrimaryHref: "/own-your-software",
  heroSecondaryButtonText: "See the work",
  heroSecondaryHref: "/work",
};
