import Link from "next/link";

import { CTA } from "@/components/sections/CTA";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={CONTACT_HREF} size="lg">
              {page.heroPrimaryButtonText}
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              {page.heroSecondaryButtonText}
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

      <Section id="how-it-works" className="scroll-mt-20 lg:scroll-mt-24">
        <Container width="wide">
          <p className={EYEBROW}>{page.stepsEyebrow}</p>
          <h2 className={H2}>{page.stepsHeading}</h2>
          <p className={`mt-6 max-w-2xl ${MUTED}`}>{page.stepsIntro}</p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {page.steps.map((step, i) => (
              <li key={step.title} className="flex">
                <MotionFadeIn
                  delay={(i % 2) * 0.08}
                  className="flex flex-1 flex-col rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-6 sm:p-8"
                >
                  <p className="font-mono text-sm text-[color:var(--color-accent)]">{step.number}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[color:var(--color-ink)]">{step.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                    {step.outcome}
                  </p>
                  <p className="mt-4 leading-relaxed text-[color:var(--color-ink-muted)]">{step.description}</p>
                  {step.bullets && step.bullets.length > 0 && (
                    <ul className="mt-4 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span aria-hidden className="text-[color:var(--color-accent)]">
                            ·
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </MotionFadeIn>
              </li>
            ))}
          </ol>
          <p className={`mt-10 max-w-3xl ${MUTED}`}>{page.ongoing}</p>
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
                className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-brand)] underline-offset-4 hover:underline"
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

      <Section>
        <Container width="narrow">
          <p className={EYEBROW}>{page.faqEyebrow}</p>
          <h2 className={H2}>{page.faqHeading}</h2>
          <div className="mt-10 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-[color:var(--color-ink)] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden
                    className="font-mono text-[color:var(--color-accent)] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[color:var(--color-ink-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

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
