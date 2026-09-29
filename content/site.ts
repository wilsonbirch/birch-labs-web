import type { Seo, SocialLinks } from "@/lib/types";

export const site = {
  businessName: "Birch Labs",
  tagline: "Full-stack development for ambitious builds.",
  availability: "Currently booking — reply within 48 hours",
  email: "wilson@birchlabs.ca",
  address: "Ottawa, ON",
  owner: { name: "Wilson Birch", jobTitle: "Full-stack developer" },
  location: { city: "Ottawa", region: "ON", country: "CA", timeZone: "Eastern Time" },
  /** Stated for agents and search (llms.txt, JSON-LD); not shown on the page. */
  workingModel:
    "Based in Ottawa, Canada (Eastern Time), working remotely with clients across Canada and the US.",
  engagements: [
    "Contract and fixed-scope projects",
    "Fractional technical lead or CTO",
    "Team augmentation",
  ],
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
