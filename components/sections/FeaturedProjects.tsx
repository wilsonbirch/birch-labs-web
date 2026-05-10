import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionFadeIn } from "@/components/ui/MotionFadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { ProjectCard as ProjectCardType } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: ProjectCardType[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section id="work" spacing="md" className="pt-8 sm:pt-10">
      <Container width="wide">
        <div
          className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          aria-label="Projects"
          role="region"
          tabIndex={0}
        >
          {projects.map((p, i) => (
            <MotionFadeIn
              key={p._id}
              delay={i * 0.08}
              className="w-[85%] flex-shrink-0 snap-start sm:w-[60%] md:w-[46%] lg:w-[32%]"
            >
              <ProjectCard project={p} priority={i === 0} />
            </MotionFadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
