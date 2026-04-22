export type CtaStyle = "primary" | "secondary" | "link";

export type NavLink = { label: string; href: string };

export type Cta = { label: string; href: string; style?: CtaStyle };

export const navLinks: ReadonlyArray<NavLink> = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export const headerCta: Cta | null = {
  label: "Start a project",
  href: "/contact",
  style: "primary",
};
