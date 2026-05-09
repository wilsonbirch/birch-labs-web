"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Chip } from "@/components/ui/Chip";
import { GitHubIcon } from "@/components/layout/SocialIcons";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import type { ProjectCard as ProjectCardType } from "@/lib/types";

const TIER_LABEL: Record<ProjectCardType["tier"], string> = {
  "applied-engineering": "Applied Engineering",
  "marketing-site": "Marketing Site",
};

export function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectCardType;
  priority?: boolean;
}) {
  const slides: SanityImage[] = [project.heroImage, ...(project.gallery ?? [])].filter(
    (img): img is SanityImage => Boolean(img),
  );
  const [index, setIndex] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);
  const [inFocus, setInFocus] = useState(true);

  useEffect(() => {
    const el = articleRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInFocus(entry.intersectionRatio >= 0.6),
      { threshold: [0, 0.3, 0.6, 0.9, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasMultiple = slides.length > 1;
  const current = slides[index];
  const image = current ? sanityImageProps(current, { width: 1200 }) : null;
  const primaryHref = project.links?.live || project.links?.github || undefined;

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <article
      ref={articleRef}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] transition duration-300 ease-out hover:border-[color:var(--color-accent)] ${
        inFocus ? "blur-0 opacity-100" : "opacity-60 blur-[2px]"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-bg)]">
        {image ? (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={priority && index === 0}
            placeholder={image.blurDataURL ? "blur" : undefined}
            blurDataURL={image.blurDataURL}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {project.client ?? project.title}
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute left-4 top-4 z-10 flex gap-2">
          <Chip tone="accent">{TIER_LABEL[project.tier]}</Chip>
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {project.client ?? "personal"}
              {project.year ? ` · ${project.year}` : null}
            </p>
            <h3 className="mt-1 text-xl font-semibold">{project.title}</h3>
          </div>
          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${project.title}`}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[color:var(--color-rule)] transition group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent-ink)]"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          {project.summary}
        </p>

        {project.stack && project.stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 6).map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
        )}

        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-xs text-[color:var(--color-ink-muted)] transition hover:text-[color:var(--color-ink)]"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            source
          </a>
        )}
      </div>
    </article>
  );
}
