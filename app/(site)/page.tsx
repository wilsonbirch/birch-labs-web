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
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: SanityImage | null;
  availability?: string | null;
  ctaHeading?: string | null;
  ctaBody?: string | null;
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

  const settings = await getSiteSettings();

  const heroTitle = data?.heroTitle ?? settings.businessName;
  const heroSubtitle =
    data?.heroSubtitle ??
    "I build production software — from AI-powered Shopify apps to motion-rich marketing sites.";
  const heroEyebrow = data?.heroEyebrow ?? "> freelance full-stack dev · ottawa";
  const availability = data?.availability ?? settings.availability;

  return (
    <HomeScrollStack
      hero={
        <Hero
          eyebrow={heroEyebrow}
          title={heroTitle}
          subtitle={heroSubtitle}
          availability={availability}
        />
      }
      cta={<CTA heading={data?.ctaHeading} body={data?.ctaBody} email={settings.email} />}
    />
  );
}
