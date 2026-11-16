import { pages } from "@/lib/pages";

export type CtaStyle = "primary" | "secondary" | "link";

export type NavLink = { label: string; href: string };

export type Cta = { label: string; href: string; style?: CtaStyle };

export const navLinks: ReadonlyArray<NavLink> = pages.flatMap((page) =>
  page.navLabel ? [{ label: page.navLabel, href: page.path }] : [],
);

export const headerCta: Cta | null = {
  label: "Start a project",
  href: "/contact",
  style: "primary",
};
