"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { Chip } from "@/components/ui/Chip";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

export function Hero({
  eyebrow,
  title,
  subtitle,
  availability,
  logo,
  logoDark,
  primaryButtonText,
  secondaryButtonText,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  availability?: string | null;
  logo?: SanityImage | null;
  logoDark?: SanityImage | null;
  primaryButtonText: string;
  secondaryButtonText: string;
}) {
  const lightLogo = logo ? sanityImageProps(logo, { height: 512 }) : null;
  const darkLogo = logoDark ? sanityImageProps(logoDark, { height: 512 }) : null;

  const lightSrc = lightLogo?.src ?? "/images/logo.svg";
  const lightAlt = lightLogo?.alt || title;
  const lightWidth = lightLogo?.width ?? 512;
  const lightHeight = lightLogo?.height ?? 512;

  // If no dark variant uploaded, fall back to the light one (so dark mode still shows something).
  const darkSrc = darkLogo?.src ?? lightSrc;
  const darkAlt = darkLogo?.alt || lightAlt;
  const darkWidth = darkLogo?.width ?? lightWidth;
  const darkHeight = darkLogo?.height ?? lightHeight;
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
          <Image
            src={lightSrc}
            alt={lightAlt}
            width={lightWidth}
            height={lightHeight}
            priority
            className="block h-40 w-auto dark:hidden sm:h-56 lg:h-64 xl:h-72"
          />
          <Image
            src={darkSrc}
            alt={darkAlt}
            width={darkWidth}
            height={darkHeight}
            priority
            className="hidden h-40 w-auto dark:block sm:h-56 lg:h-64 xl:h-72"
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
