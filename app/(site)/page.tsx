import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { HomeScrollStack } from "@/components/sections/HomeScrollStack";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";

// Absolute: the home title already names the business, so skip the
// layout's "%s | Birch Labs" template.
export const metadata: Metadata = {
  ...seoMetadata(home.seo),
  title: { absolute: home.seo.title },
};

export default function HomePage() {
  return (
    <HomeScrollStack
      hero={
        <Hero
          eyebrow={home.heroEyebrow}
          subtitle={home.heroSubtitle}
          logo={home.heroLogo}
          logoDark={home.heroLogoDark}
          primaryButtonText={home.heroPrimaryButtonText}
          secondaryButtonText={home.heroSecondaryButtonText}
        />
      }
      cta={
        <CTA
          eyebrow={home.ctaEyebrow}
          heading={home.ctaHeading}
          body={home.ctaBody}
          buttonText={home.ctaButtonText}
          email={site.email}
        />
      }
    />
  );
}
