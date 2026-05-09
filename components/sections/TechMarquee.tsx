import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function TechMarquee({
  items,
  eyebrow,
}: {
  items: string[];
  eyebrow?: string | null;
}) {
  if (!items || items.length === 0) return null;
  // Duplicate items so the infinite loop has content for the second half.
  const loop = [...items, ...items];

  return (
    <Section id="stack" spacing="sm" tone="default" className="border-y border-[color:var(--color-rule)]">
      <Container width="full">
        {eyebrow && (
          <p className="mb-6 px-6 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] sm:px-8 lg:px-12">
            {eyebrow}
          </p>
        )}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          }}
        >
          <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap py-3">
            {loop.map((label, i) => (
              <li
                key={`${label}-${i}`}
                className="font-mono text-sm uppercase tracking-[0.15em] text-[color:var(--color-ink-muted)]"
              >
                <span className="mr-10">{label}</span>
                <span aria-hidden className="text-[color:var(--color-accent)]">
                  ●
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
