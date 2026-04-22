"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { Chip } from "@/components/ui/Chip";

export function Hero({
  eyebrow,
  title,
  subtitle,
  availability,
}: {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  availability?: string | null;
}) {
  const reduce = useReducedMotion();

  return (
    <Section spacing="none" className="relative overflow-hidden py-12 sm:py-16">
      <span className="noise-overlay" aria-hidden />
      <Container width="wide" className="relative">
        {availability && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip tone="outline" className="mb-8">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
              />
              {availability}
            </Chip>
          </motion.div>
        )}

        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] sm:text-sm"
          >
            {eyebrow}
            <BlinkingCursor className="ml-2 h-3 sm:h-4" />
          </motion.p>
        )}

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-display mt-6 text-[14vw] leading-[0.9] sm:text-[11vw] lg:text-[10rem] xl:text-[12rem]"
        >
          <span className="inline-block bg-gradient-to-br from-[color:var(--color-ink)] to-[color:var(--color-ink-muted)] bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 h-px w-full origin-left bg-[color:var(--color-accent)]"
          aria-hidden
        />

        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)] sm:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/work" variant="primary" size="lg">
            See the work
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Start a project →
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
