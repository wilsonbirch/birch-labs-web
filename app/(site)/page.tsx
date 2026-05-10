import type { Metadata } from "next";

import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { HomeScrollStack } from "@/components/sections/HomeScrollStack";
import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageUrl, type SanityImage } from "@/lib/sanity-image";
import { getSiteSettings } from "@/lib/site";

export const revalidate = 60;

type HomePageData = {
  heroEyebrow: string;
  heroSubtitle: string;
  heroImage?: SanityImage | null;
  heroImageDark?: SanityImage | null;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  availability?: string | null;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButtonText: string;
  seo?: { title?: string | null; description?: string | null; ogImage?: SanityImage | null } | null;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
    if (!data?.seo) return {};
    const ogImage = sanityImageUrl(data.seo.ogImage, { width: 1200, height: 630 });
    return {
      title: data.seo.title ?? undefined,
      description: data.seo.description ?? undefined,
      openGraph: {
        title: data.seo.title ?? undefined,
        description: data.seo.description ?? undefined,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title: data.seo.title ?? undefined,
        description: data.seo.description ?? undefined,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function HomePage() {
  let data: HomePageData | null = null;
  try {
    data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
  } catch (error) {
    console.warn("[home] Failed to fetch homePage:", error);
  }

  if (!data) {
    console.warn("[home] homePage singleton is missing — render skipped");
    return null;
  }

  const settings = await getSiteSettings();

  return (
    <HomeScrollStack
      hero={
        <Hero
          eyebrow={data.heroEyebrow}
          title={settings.businessName}
          subtitle={data.heroSubtitle}
          availability={data.availability ?? settings.availability}
          logo={data.heroImage ?? settings.logo}
          logoDark={data.heroImageDark ?? null}
          primaryButtonText={data.heroPrimaryButtonText}
          secondaryButtonText={data.heroSecondaryButtonText}
        />
      }
      cta={
        <CTA
          eyebrow={data.ctaEyebrow}
          heading={data.ctaHeading}
          body={data.ctaBody}
          buttonText={data.ctaButtonText}
          email={settings.email}
        />
      }
    />
  );
}
