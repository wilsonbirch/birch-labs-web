import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { workPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageUrl, type SanityImage } from "@/lib/sanity-image";
import type { ProjectCard } from "@/lib/types";

export const revalidate = 60;

type WorkPageData = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  projects?: ProjectCard[] | null;
  seo?: { title?: string | null; description?: string | null; ogImage?: SanityImage | null } | null;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<WorkPageData | null>({
    query: workPageQuery,
    tags: ["workPage"],
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

export default async function WorkPage() {
  const data = await sanityFetch<WorkPageData | null>({
    query: workPageQuery,
    tags: ["workPage"],
  });

  const projects: ProjectCard[] = data?.projects ?? [];

  return (
    <>
      <Section spacing="md" className="pb-0 sm:pb-0">
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
      {projects.length > 0 && <FeaturedProjects projects={projects} />}
    </>
  );
}
