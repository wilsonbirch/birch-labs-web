import { About } from "@/components/sections/About";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { about } from "@/content/about";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(about.seo);

export default function AboutPage() {
  return (
    <>
      <Section spacing="md" className="pb-12 sm:pb-16">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {about.heroEyebrow}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {about.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            {about.heroSubtitle}
          </p>
        </Container>
      </Section>
      <About
        heading={null}
        body={about.body}
        portrait={about.portrait}
        quickFacts={about.quickFacts}
      />
    </>
  );
}
