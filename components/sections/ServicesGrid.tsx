import * as Icons from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import type { ServiceItem } from "@/lib/types";

function ServiceIcon({ name }: { name?: string | null }) {
  if (!name) return null;
  const normalized = name
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("");
  const Icon = (
    Icons as unknown as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[normalized];
  if (!Icon) return null;
  return <Icon className="h-4 w-4 text-[color:var(--color-accent)]" />;
}

/** Every service as an equal card — no tiers, so nothing reads as a pricing package. */
export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <Section id="services" spacing="md" tone="surface">
      <Container width="wide">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title} className="flex">
              <MotionFadeIn
                delay={(i % 3) * 0.08}
                className="flex flex-1 flex-col rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-[color:var(--color-rule)]">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">
                  {s.title}
                </h3>
                {s.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    {s.description}
                  </p>
                )}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span
                          aria-hidden
                          className="text-[color:var(--color-accent)]"
                        >
                          ·
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </MotionFadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
