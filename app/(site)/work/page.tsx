import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { projects } from "@/content/projects";
import { work } from "@/content/work";
import { seoMetadata } from "@/lib/metadata";
import { projectsGraph } from "@/lib/structured-data";

export const metadata = seoMetadata(work.seo, "/work");

export default function WorkPage() {
  return (
    <>
      <JsonLd data={projectsGraph(projects)} />
      <Section spacing="md" className="pb-0 sm:pb-0">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {work.heroEyebrow}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {work.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            {work.heroSubtitle}
          </p>
        </Container>
      </Section>
      <FeaturedProjects projects={projects} />
    </>
  );
}
