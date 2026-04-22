import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/ui/PortableText";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";

export function About({ heading, body }: { heading?: string | null; body?: unknown }) {
  const hasBody = Array.isArray(body) && body.length > 0;
  if (!heading && !hasBody) return null;

  return (
    <Section id="about" spacing="md">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          {heading && (
            <MotionFadeIn className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                {"// about"}
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">
                {heading}
              </h2>
            </MotionFadeIn>
          )}
          <MotionFadeIn delay={0.1} className={heading ? "lg:col-span-8" : "lg:col-span-8 lg:col-start-5"}>
            {hasBody ? (
              <div className="prose prose-lg max-w-2xl text-[color:var(--color-ink)] [&_p]:text-[color:var(--color-ink-muted)] [&_p]:leading-relaxed [&_p]:mt-4 [&_p:first-child]:mt-0">
                <PortableText value={body} />
              </div>
            ) : null}
          </MotionFadeIn>
        </div>
      </Container>
    </Section>
  );
}
