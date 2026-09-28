import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import type { Img } from "@/lib/types";

export type QuickFact = { label: string; value: string };

export function About({
  heading,
  body,
  portrait,
  quickFacts,
}: {
  heading?: string | null;
  /** One string per paragraph. */
  body?: string[] | null;
  portrait?: Img | null;
  quickFacts?: QuickFact[] | null;
}) {
  const paragraphs = body ?? [];
  const hasBody = paragraphs.length > 0;
  const facts = (quickFacts ?? []).filter((f) => f && f.label && f.value);
  if (!heading && !hasBody && !portrait && facts.length === 0) return null;

  return (
    <Section
      id="about"
      spacing="md"
      className="border-t border-[color:var(--color-rule)] pt-12 sm:pt-16"
    >
      <Container width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {portrait && (
            <MotionFadeIn className="lg:col-span-5">
              <div className="relative aspect-[4/6] w-full max-w-md overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] lg:max-w-none">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </MotionFadeIn>
          )}
          <MotionFadeIn
            delay={0.1}
            className={portrait ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}
          >
            {heading && (
              <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl">
                {heading}
              </h2>
            )}
            {hasBody && (
              <div
                className={`prose prose-lg max-w-2xl text-[color:var(--color-ink)] [&_p]:text-[color:var(--color-ink-muted)] [&_p]:leading-relaxed [&_p]:mt-4 [&_p:first-child]:mt-0 ${
                  heading ? "mt-6" : ""
                }`}
              >
                <div className="space-y-5">
                  {paragraphs.map((p) => (
                    <p key={p} className="text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {facts.length > 0 && (
              <dl
                className={`max-w-xl border-t border-[color:var(--color-rule)] pt-6 font-mono text-sm ${
                  hasBody || heading ? "mt-10" : ""
                }`}
              >
                {facts.map((fact, i) => (
                  <div
                    key={`${fact.label}-${i}`}
                    className="flex flex-col gap-1 border-b border-[color:var(--color-rule)] py-3 last:border-b-0 sm:flex-row sm:gap-6"
                  >
                    <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] sm:w-36 sm:flex-shrink-0">
                      {fact.label}
                    </dt>
                    <dd className="text-[color:var(--color-ink)]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </MotionFadeIn>
        </div>
      </Container>
    </Section>
  );
}
