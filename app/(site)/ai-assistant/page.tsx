import { CTA } from "@/components/sections/CTA";
import { FitScore } from "@/components/sections/FitScore";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { aiAssistant as page } from "@/content/ai-assistant";
import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";
import { aiAssistantGraph } from "@/lib/structured-data";

export const metadata = seoMetadata(page.seo, "/ai-assistant");

const CONTACT_HREF = "/contact?topic=ai-assistant";

const EYEBROW = "font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]";
const H2 = "font-display mt-4 text-4xl leading-[1.05] sm:text-5xl";
const MUTED = "text-lg leading-relaxed text-[color:var(--color-ink-muted)]";
const CARD = "rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] p-6";

export default function AiAssistantPage() {
  return (
    <>
      <JsonLd data={aiAssistantGraph()} />

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
            <Button href="#fit-score" variant="secondary" size="lg">
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

      <Section>
        <Container width="wide">
          <p className={EYEBROW}>{page.jobsEyebrow}</p>
          <h2 className={H2}>{page.jobsHeading}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.jobs.map((job) => (
              <li key={job.name} className={CARD}>
                <h3 className="font-display text-2xl">{job.name}</h3>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className={EYEBROW}>Before</dt>
                    <dd className="mt-1">{job.before}</dd>
                  </div>
                  <div>
                    <dt className={EYEBROW}>After</dt>
                    <dd className="mt-1">{job.after}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[color:var(--color-ink-muted)]">{page.jobsNote}</p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={EYEBROW}>{page.safetyEyebrow}</p>
            <h2 className={H2}>{page.safetyHeading}</h2>
            <p className={`mt-6 ${MUTED}`}>{page.safetyIntro}</p>
          </div>
          <div className="space-y-8 lg:col-span-7">
            <ul className="space-y-4">
              {page.safetyTiers.map((tier) => (
                <li key={tier.label} className={CARD}>
                  <p className="font-display text-xl">{tier.label}</p>
                  <p className="mt-2">{tier.body}</p>
                </li>
              ))}
            </ul>
            <ul className="list-disc space-y-3 pl-5">
              {page.safetyPoints.map((point) => (
                <li key={point} className={MUTED}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <p className={EYEBROW}>{page.stepsEyebrow}</p>
          <h2 className={H2}>{page.stepsHeading}</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step, i) => (
              <li key={step.name} className={CARD}>
                <p className="font-mono text-sm text-[color:var(--color-ink-muted)]">0{i + 1}</p>
                <h3 className="font-display mt-2 text-2xl">{step.name}</h3>
                <p className="mt-3">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="surface">
        <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={EYEBROW}>{page.proofEyebrow}</p>
            <h2 className={H2}>{page.proofHeading}</h2>
          </div>
          <p className={`lg:col-span-7 ${MUTED}`}>{page.proofBody}</p>
        </Container>
      </Section>

      <Section id="fit-score">
        <Container width="wide">
          <p className={EYEBROW}>{page.fitEyebrow}</p>
          <h2 className={H2}>{page.fitHeading}</h2>
          <p className={`mt-6 max-w-2xl ${MUTED}`}>{page.fitIntro}</p>
          <div className="mt-10">
            <FitScore contactHref={CONTACT_HREF} />
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
