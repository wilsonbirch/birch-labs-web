import * as Icons from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/ui/PortableText";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import type { ServiceTier } from "@/lib/types";

function ServiceIcon({ name }: { name?: string | null }) {
  if (!name) return null;
  const normalized = name
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join("");
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    normalized
  ];
  if (!Icon) return null;
  return <Icon className="h-4 w-4 text-[color:var(--color-accent)]" />;
}

export function TwoTierServices({
  intro,
  tiers,
}: {
  intro?: unknown;
  tiers: ServiceTier[];
}) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <Section id="services" spacing="md" tone="surface">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <MotionFadeIn className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {"// services"}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              What I build.
            </h2>
            {Array.isArray(intro) && intro.length > 0 && (
              <div className="mt-6 max-w-md text-[color:var(--color-ink-muted)]">
                <PortableText value={intro} />
              </div>
            )}
          </MotionFadeIn>

          <div className="grid gap-8 lg:col-span-8 lg:grid-cols-2">
            {tiers.map((tier, i) => (
              <MotionFadeIn
                key={tier.label}
                delay={i * 0.1}
                className="relative flex flex-col rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] p-6 sm:p-8"
              >
                <span
                  aria-hidden
                  className="absolute left-6 top-0 h-px w-12 -translate-y-px bg-[color:var(--color-accent)]"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                  0{i + 1} / tier
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{tier.label}</h3>
                {tier.tagline && (
                  <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
                    {tier.tagline}
                  </p>
                )}

                <ul className="mt-6 space-y-4">
                  {tier.services.map((s) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded border border-[color:var(--color-rule)]">
                        <ServiceIcon name={s.icon} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                          {s.title}
                        </p>
                        {s.description && (
                          <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                            {s.description}
                          </p>
                        )}
                        {s.bullets && s.bullets.length > 0 && (
                          <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span aria-hidden className="text-[color:var(--color-accent)]">·</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </MotionFadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
