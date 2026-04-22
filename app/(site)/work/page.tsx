import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { allProjectsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import type { ProjectCard } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects from Birch Labs — apps, AI pipelines, and marketing sites.",
};

export default async function WorkPage() {
  let projects: ProjectCard[] = [];
  try {
    projects = await sanityFetch<ProjectCard[]>({
      query: allProjectsQuery,
      tags: ["project"],
    });
  } catch (error) {
    console.warn("[work] Failed to fetch projects:", error);
  }

  return (
    <>
      <Section spacing="md" className="pb-0 sm:pb-0">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {"// work"}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            Things I&apos;ve shipped.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            A mix of production work, client projects, and things I built because no one else had.
          </p>
        </Container>
      </Section>
      {projects.length > 0 ? (
        <FeaturedProjects projects={projects} />
      ) : (
        <Section spacing="md">
          <Container width="wide">
            <p className="text-[color:var(--color-ink-muted)]">
              More projects coming soon.
            </p>
          </Container>
        </Section>
      )}
      <TechMarquee />
    </>
  );
}
