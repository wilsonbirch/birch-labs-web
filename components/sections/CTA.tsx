import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";

export function CTA({
  eyebrow,
  heading,
  body,
  buttonText,
  email,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
  buttonText?: string | null;
  email?: string | null;
}) {
  const eyebrowText = eyebrow ?? "// let's build";
  const title = heading ?? "Have a project?";
  const description = body ?? "Short-form pitches welcome. I reply within 48 hours.";
  const cta = buttonText ?? "Start a project →";

  return (
    <Section id="contact-cta" spacing="none" className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
      <span className="noise-overlay" aria-hidden />
      <Container width="wide" className="relative">
        <MotionFadeIn className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
            {eyebrowText}
          </p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            {title}
            <span className="text-[color:var(--color-accent)]">_</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              {cta}
            </Button>
            {email && (
              <a
                href={`mailto:${email}`}
                className="font-mono text-sm text-[color:var(--color-ink-muted)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 transition hover:text-[color:var(--color-ink)]"
              >
                {email}
              </a>
            )}
          </div>
        </MotionFadeIn>
      </Container>
    </Section>
  );
}
