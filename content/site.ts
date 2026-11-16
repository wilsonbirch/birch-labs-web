import type { Seo, SocialLinks } from "@/lib/types";

export const site = {
  businessName: "Birch Labs",
  tagline: "Own your software.",
  /** The one-line pitch: the home hero subtitle, reused wherever one line fits. */
  pitch: "AI has made it possible to build any tool you need. I get yours across the line and keep it running.",
  availability: "Currently booking — reply within 48 hours",
  email: "wilson@birchlabs.ca",
  address: "Ottawa, ON",
  owner: { name: "Wilson Birch", jobTitle: "Software developer" },
  location: { city: "Ottawa", region: "ON", country: "CA", timeZone: "Eastern Time" },
  /** Stated for agents and search (llms.txt, JSON-LD); not shown on the page. */
  workingModel:
    "Based in Ottawa, Canada (Eastern Time), working remotely with clients across Canada and the US.",
  engagements: [
    "Contract and fixed-scope projects",
    "Fractional technical lead or CTO",
    "Team augmentation",
    "Build vs buy: SaaS audits, owned rebuilds, and guardrails for building with AI",
    "Monthly plans to run and maintain your software",
  ],
  social: {
    github: "https://github.com/wilsonbirch",
    linkedin: "https://www.linkedin.com/in/wilson-birch/",
  } satisfies SocialLinks as SocialLinks,
  footerText:
    "Birch Labs is the freelance practice of Wilson Birch, software developer and CTO. Based in Ottawa, Canada.",
  seo: {
    title: "Birch Labs | Own your software",
    description:
      "Custom software you own. A straight answer on build vs buy, new builds, AI-built projects made production-ready, and monthly maintenance.",
  } satisfies Seo,
};
