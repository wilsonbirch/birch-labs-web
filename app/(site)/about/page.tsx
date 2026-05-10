import type { Metadata } from "next";

import { About, type QuickFact } from "@/components/sections/About";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageUrl, type SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

type AboutPageData = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  portrait?: SanityImage | null;
  body?: unknown;
  quickFacts?: QuickFact[] | null;
  seo?: { title?: string | null; description?: string | null; ogImage?: SanityImage | null } | null;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<AboutPageData | null>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
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
}

export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData | null>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
  });

  const body = Array.isArray(data?.body) && data!.body!.length > 0 ? data!.body : null;

  return (
    <>
      <Section spacing="md" className="pb-12 sm:pb-16">
        <Container width="wide">
          {data?.heroEyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {data.heroEyebrow}
            </p>
          )}
          {data?.heroTitle && (
            <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
              {data.heroTitle}
            </h1>
          )}
          {data?.heroSubtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
              {data.heroSubtitle}
            </p>
          )}
        </Container>
      </Section>
      <About
        heading={null}
        body={body}
        portrait={data?.portrait ?? null}
        quickFacts={data?.quickFacts ?? null}
      />
    </>
  );
}
