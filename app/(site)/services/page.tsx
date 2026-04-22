import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { TwoTierServices } from "@/components/sections/TwoTierServices";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { getSiteSettings } from "@/lib/site";
import type { ServiceTier } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freelance services from Birch Labs — custom web apps, AI integrations, Shopify builds, and motion-rich marketing sites.",
};

type HomePageData = {
  intro?: unknown;
  tiers?: ServiceTier[] | null;
  ctaHeading?: string | null;
  ctaBody?: string | null;
};

export default async function ServicesPage() {
  let data: HomePageData | null = null;
  try {
    data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
  } catch (error) {
    console.warn("[services] Failed to fetch homePage:", error);
  }

  const settings = await getSiteSettings();
  const tiers = Array.isArray(data?.tiers) ? data!.tiers! : [];

  return (
    <>
      <Section spacing="md">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {"// services"}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            What I build.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            Two tiers, one developer. Pick the work that fits — or combine both when your project
            needs engineering muscle and design polish.
          </p>
        </Container>
      </Section>
      {tiers.length > 0 && <TwoTierServices intro={data?.intro} tiers={tiers} />}
      <CTA heading={data?.ctaHeading} body={data?.ctaBody} email={settings.email} />
    </>
  );
}
