import type { Seo, SocialLinks } from "@/lib/types";

const tagline = "Own your software.";
/** The one-line pitch: the home hero subtitle, reused wherever one line fits. */
const pitch = "AI has made it possible to build any tool you need. I get yours across the line and keep it running.";

export const site = {
  businessName: "Birch Labs",
  tagline,
  pitch,
  availability: "Currently booking — reply within 48 hours",
  email: "wilson@birchlabs.ca",
  address: "Ottawa, ON",
  owner: { name: "Wilson Birch", jobTitle: "Software developer" },
  location: { city: "Ottawa", region: "ON", country: "CA", timeZone: "Eastern Time" },
  /** Stated for agents and search (llms.txt, JSON-LD); not shown on the page. */
  workingModel:
    "Based in Ottawa, Canada (Eastern Time), working remotely with clients across Canada and the US.",
  /** Topics for the JSON-LD `knowsAbout`; not shown on the page. */
  knowsAbout: [
    "Native iOS and Android apps",
    "Web apps and SaaS",
    "Shopify apps",
    "AI and LLM features",
    "Data pipelines and scrapers",
    "Memberships and payments on Stripe",
  ],
  social: {
    github: "https://github.com/wilsonbirch",
    linkedin: "https://www.linkedin.com/in/wilson-birch/",
  } satisfies SocialLinks as SocialLinks,
  footerText:
    "Birch Labs is the freelance practice of Wilson Birch, software developer and CTO. Based in Ottawa, Canada.",
  seo: {
    title: "Birch Labs | Own your software",
    description: `${tagline} ${pitch}`,
  } satisfies Seo,
};
