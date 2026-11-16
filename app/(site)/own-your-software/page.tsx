import Link from "next/link";

import { CTA } from "@/components/sections/CTA";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { ownYourSoftware as page } from "@/content/own-your-software";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";
import { ownYourSoftwareGraph } from "@/lib/structured-data";

export const metadata = seoMetadata(page.seo, "/own-your-software");

const CONTACT_HREF = "/contact?topic=own-your-software";

const EYEBROW = "font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]";
const H2 = "font-display mt-4 text-4xl leading-[1.05] sm:text-5xl";
const MUTED = "text-lg leading-relaxed text-[color:var(--color-ink-muted)]";

export default function OwnYourSoftwarePage() {
  // Drafts are filtered out of `projects` in production, so the case study
  // appears on its own once the project launches.
  const caseStudy = projects.find((p) => p.slug === page.caseStudySlug);

  return (
    <>
      <JsonLd data={ownYourSoftwareGraph()} />

      <Section spacing="md">
        <Container width="wide">
          <p className={EYEBROW}>{page.heroEyebrow}</p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {page.heroTitle}
          </h1>
          <p className={`mt-6 max-w-2xl ${MUTED}`}>{page.heroSubtitle}</p>
          <div className="mt-10">
            <Button href={CONTACT_HREF} size="lg">
              {page.heroPrimaryButtonText}
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={EYEBROW}>{page.problemEyebrow}</p>
            <h2 className={H2}>{page.problemHeading}</h2>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {page.problemBody.map((paragraph) => (
              <p key={paragraph} className={MUTED}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {caseStudy && (
        <Section tone="surface">
          <Container width="wide" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className={EYEBROW}>{page.caseStudyEyebrow}</p>
              <h2 className={H2}>{page.caseStudyHeading}</h2>
              <p className={`mt-6 ${MUTED}`}>{page.caseStudyBody}</p>
              <Link
                href="/work"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 transition hover:text-[color:var(--color-ink)]"
              >
                More work →
              </Link>
            </div>
            <div className="lg:col-span-7">
              <ProjectCard project={caseStudy} />
            </div>
          </Container>
        </Section>
      )}

      <CTA
        eyebrow={page.ctaEyebrow}
        heading={page.ctaHeading}
        body={page.ctaBody}
        buttonText={page.ctaButtonText}
        href={CONTACT_HREF}
        email={site.email}
      />
    </>
  );
}
