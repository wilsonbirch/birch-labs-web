import type { Metadata } from "next";

import { ContactPanel } from "@/components/sections/ContactPanel";
import { Hero } from "@/components/sections/Hero";
import { HomeScrollStack } from "@/components/sections/HomeScrollStack";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/home";
import { seoMetadata } from "@/lib/metadata";

// Absolute: the home title already names the business, so skip the
// layout's "%s | Birch Labs" template.
export const metadata: Metadata = {
  ...seoMetadata(home.seo, "/"),
  title: { absolute: home.seo.title },
};

export default function HomePage() {
  return (
    <HomeScrollStack
      front={
        <Section
          spacing="none"
          className="relative overflow-hidden py-8 sm:py-12 [@media(max-height:800px)]:py-4"
        >
          <span className="hero-art" aria-hidden />
          <span className="noise-overlay" aria-hidden />
          <Container width="narrow" className="relative">
            {/* h2: the hero's wordmark on the back face is the page's h1. */}
            <ContactPanel headingAs="h2" compact />
          </Container>
        </Section>
      }
      back={
        <Hero
          eyebrow={home.heroEyebrow}
          subtitle={home.heroSubtitle}
          logo={home.heroLogo}
          logoDark={home.heroLogoDark}
          primaryButtonText={home.heroPrimaryButtonText}
          primaryHref={home.heroPrimaryHref}
          secondaryButtonText={home.heroSecondaryButtonText}
          secondaryHref={home.heroSecondaryHref}
        />
      }
    />
  );
}
