import type { SanityImage } from "@/lib/sanity-image";

export type ProjectTier = "applied-engineering" | "marketing-site";

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string | null;
  client: string | null;
  year: number | null;
  tier: ProjectTier;
  summary: string;
  role: string | null;
  stack: string[] | null;
  heroImage: SanityImage | null;
  gallery: SanityImage[] | null;
  links: { live?: string | null; github?: string | null } | null;
  featured: boolean | null;
  order: number | null;
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
