import type { Seo, SocialLinks } from "@/lib/types";

export const site = {
  businessName: "Birch Labs",
  tagline: "Full-stack development for ambitious builds.",
  availability: "Currently booking — reply within 48 hours",
  email: "wilson@birchlabs.ca",
  address: "Ottawa, ON",
  social: {
    github: "https://github.com/wilsonbirch",
    linkedin: "https://www.linkedin.com/in/wilson-birch/",
  } satisfies SocialLinks as SocialLinks,
  footerText:
    "Birch Labs is the freelance practice of Wilson Birch — full-stack developer and CTO. Based in Ottawa, Canada.",
  seo: {
    title: "Birch Labs | Full-stack development",
    description:
      "Freelance full-stack development. Custom web apps, AI integrations, Shopify builds, and motion-rich marketing sites.",
  } satisfies Seo,
};
