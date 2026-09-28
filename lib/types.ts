import type { StaticImageData } from "next/image";

/** A statically imported image — next/image reads width, height, and blur data from `src`. */
export type Img = { src: StaticImageData; alt: string };

/** Per-page SEO. `ogImage` is a path under /public; defaults to the brand card. */
export type Seo = { title: string; description: string; ogImage?: string };

export type SocialLinks = Partial<
  Record<"github" | "linkedin" | "twitter" | "instagram" | "facebook", string>
>;

export type ProjectTier = "applied-engineering" | "marketing-site";

export type ProjectCard = {
  slug: string;
  title: string;
  client: string;
  year: number;
  tier: ProjectTier;
  summary: string;
  role: string;
  stack: string[];
  heroImage: Img;
  gallery: Img[];
  links: { live?: string; github?: string };
  /** Long-form write-up, one string per paragraph. Not rendered yet. */
  body: string[];
};

export type ServiceItem = {
  title: string;
  description?: string | null;
  bullets?: string[] | null;
  icon?: string | null;
};

export type ServiceTier = {
  label: string;
  tagline?: string | null;
  services: ServiceItem[];
};
