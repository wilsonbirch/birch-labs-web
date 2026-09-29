import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(services.seo, "/services");

export default function ServicesPage() {
  return (
    <>
      <Section spacing="md">
        <Container width="wide">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {services.heroEyebrow}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {services.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            {services.heroSubtitle}
          </p>
        </Container>
      </Section>
      <ServicesGrid services={services.services} />
      <TechMarquee items={services.stack} eyebrow={services.stackEyebrow} />
    </>
  );
}
