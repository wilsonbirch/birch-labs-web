export type CtaStyle = "primary" | "secondary" | "link";

export type NavLink = { label: string; href: string };

export type Cta = { label: string; href: string; style?: CtaStyle };

export const navLinks: ReadonlyArray<NavLink> = [
  { label: "About", href: "/about" },
];

export const headerCta: Cta | null = {
  label: "Contact",
  href: "/contact",
  style: "primary",
};
