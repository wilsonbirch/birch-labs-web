import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { GitHubIcon } from "@/components/layout/SocialIcons";
import { sanityImageProps } from "@/lib/sanity-image";
import type { ProjectCard } from "@/lib/types";

const TIER_LABEL: Record<ProjectCard["tier"], string> = {
  "applied-engineering": "Applied Engineering",
  "marketing-site": "Marketing Site",
};

export function FeaturedProjects({ projects }: { projects: ProjectCard[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section id="work" spacing="md">
      <Container width="wide">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {"// selected work"}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">
              Things I&apos;ve shipped.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <MotionFadeIn key={p._id} delay={i * 0.08}>
              <ProjectItem project={p} />
            </MotionFadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProjectItem({ project }: { project: ProjectCard }) {
  const image = project.heroImage ? sanityImageProps(project.heroImage, { width: 1200 }) : null;
  const primaryHref = project.links?.live || project.links?.github || undefined;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] transition hover:border-[color:var(--color-accent)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-bg)]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {project.client ?? project.title}
            </span>
          </div>
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          <Chip tone="accent">{TIER_LABEL[project.tier]}</Chip>
        </div>
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
