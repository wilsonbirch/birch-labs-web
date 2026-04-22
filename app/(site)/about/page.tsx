import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { getSiteSettings } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: "Wilson Birch — the developer behind Birch Labs.",
};

type HomePageData = {
  aboutHeading?: string | null;
  aboutBody?: unknown;
  ctaHeading?: string | null;
  ctaBody?: string | null;
};

export default async function AboutPage() {
  let data: HomePageData | null = null;
  try {
    data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
  } catch (error) {
    console.warn("[about] Failed to fetch homePage:", error);
  }

  const settings = await getSiteSettings();

  return (
    <>
      <Section spacing="md">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {"// about"}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {data?.aboutHeading ?? "Who's building this."}
          </h1>
        </Container>
      </Section>
      <About heading={null} body={data?.aboutBody} />
      <CTA heading={data?.ctaHeading} body={data?.ctaBody} email={settings.email} />
    </>
  );
}
