"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import type { Img } from "@/lib/types";

export function Hero({
  eyebrow,
  subtitle,
  logo,
  logoDark,
  primaryButtonText,
  secondaryButtonText,
}: {
  eyebrow: string;
  subtitle: string;
  logo: Img;
  logoDark: Img;
  primaryButtonText: string;
  secondaryButtonText: string;
}) {
  const reduce = useReducedMotion();

  return (
    <Section spacing="none" className="relative overflow-hidden py-12 sm:py-16 [@media(max-height:800px)]:py-6">
      <span className="noise-overlay" aria-hidden />
      <Container width="wide" className="relative">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)] sm:text-sm"
        >
          {eyebrow}
          <BlinkingCursor className="ml-2 h-3 sm:h-4" />
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6"
        >
          {/* max-h caps the wordmark by window height (the rem budget ≈ header + the
              rest of the hero + padding; larger on phones, where the subtitle wraps
              more) so the pinned hero fits on short screens. */}
          <Image
            src={logo.src}
            alt={logo.alt}
            priority
            className="block h-40 w-auto dark:hidden sm:h-56 lg:h-64 xl:h-72 max-h-[calc(100svh-38rem)] sm:max-h-[calc(100svh-31rem)] min-h-16 max-w-full object-contain object-left"
          />
          <Image
            src={logoDark.src}
            alt={logoDark.alt}
            priority
            className="hidden h-40 w-auto dark:block sm:h-56 lg:h-64 xl:h-72 max-h-[calc(100svh-38rem)] sm:max-h-[calc(100svh-31rem)] min-h-16 max-w-full object-contain object-left"
          />
        </motion.h1>

        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 h-px w-full origin-left bg-[color:var(--color-accent)]"
          aria-hidden
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-muted)] sm:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/work" variant="primary" size="lg">
            {primaryButtonText}
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            {secondaryButtonText}
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
