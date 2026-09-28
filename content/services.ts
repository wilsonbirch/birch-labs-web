import type { Seo, ServiceTier } from "@/lib/types";

export const services = {
  seo: {
    title: "Full-Stack Development Services",
    description:
      "Custom web apps, Shopify builds, AI integrations, and design-led marketing sites — built and shipped by a freelance developer in Ottawa.",
  } satisfies Seo,
  heroEyebrow: "// services",
  heroTitle: "What I build.",
  heroSubtitle:
    "Two tiers, one developer. Pick the work that fits, or combine both when your project needs engineering muscle and design polish.",
  stackEyebrow: "// stack",
  stack: [
    "NEXT.js",
    "remix",
    "react-router",
    "node.js",
    "python",
    "fastapi",
    "postgresql",
    "redis",
    "RQ",
    "resque",
    "docker",
    "prisma",
    "SQL",
    "graphql",
    "shopify",
    "polaris",
    "tailwind",
    "fly.io",
    "aws",
    "sanity",
    "framer motion",
    "gemini",
    "claude",
    "firecrawl",
    "ci/cd",
    "typescript",
    "react",
  ],
  tiers: [
    {
      label: "Applied Engineering",
      tagline:
        "Custom software, Shopify apps, AI pipelines, and everything in between.",
      services: [
        {
          title: "Shopify apps & storefronts",
          description:
            "Polaris-grade embedded apps and custom storefronts, built on Remix.",
          icon: "shopping-bag",
          bullets: [
            "Billing API & webhooks",
            "Multi-tenant architecture",
            "App Store ready",
          ],
        },
        {
          title: "AI & LLM integrations",
          description:
            "RAG, summarization, and agent workflows using Gemini, Claude, or OpenAI.",
          icon: "sparkles",
          bullets: [
            "Prompt design & eval",
            "Async pipelines (Redis queues)",
            "Firecrawl / Puppeteer scraping",
          ],
        },
        {
          title: "Custom SaaS & internal tools",
          description: "Full-stack builds from schema to shipping.",
          icon: "layout",
          bullets: [
            "Next.js / Remix / FastAPI",
            "PostgreSQL & Prisma",
            "Auth, billing, admin",
          ],
        },
        {
          title: "DevOps & cloud infrastructure",
          description:
            "From CI/CD to autoscaling — the infra and ops glue that keeps teams shipping at any size.",
          icon: "server",
          bullets: [
            "GitHub Actions / Azure DevOps",
            "Fly.io / Vercel deploys",
            "Autoscaling, caching, queues",
            "Observability & release automation",
          ],
        },
        {
          title: "Vibe-code hardening",
          description:
            "Your AI-built MVP works. I make it survive real users, real load, and a real team.",
          icon: "shield-check",
          bullets: [
            "Test coverage & CI/CD",
            "Refactor the load-bearing bits",
            "Code health audits & cleanup",
            "Maintainable patterns your team can extend",
          ],
        },
      ],
    },
    {
      label: "Marketing Sites",
      tagline:
        "Design-forward, animated, CMS-backed sites for small businesses.",
      services: [
        {
          title: "Bespoke landing pages",
          description:
            "Hand-built sites that don't look like a template — because they aren't.",
          icon: "palette",
          bullets: [
            "Figma-to-production",
            "Motion & micro-interactions",
            "Accessibility-first",
          ],
        },
        {
          title: "CMS-backed sites",
          description:
            "Sanity, Shopify, or the right CMS for the job — so your client can edit, not email you.",
          icon: "file-text",
          bullets: [
            "Structured content modelling",
            "Editor-friendly studio",
            "Live previews",
          ],
        },
        {
          title: "Motion & interaction",
          description:
            "Scroll-driven moments, hover states, and animations that actually serve the story.",
          icon: "wand-2",
          bullets: [
            "Framer Motion / GSAP",
            "Scroll choreography",
            "Reduced-motion aware",
          ],
        },
        {
          title: "Performance & SEO",
          description:
            "Fast by default. Lighthouse 95+ and sensible on-page SEO come in the box.",
          icon: "zap",
          bullets: [
            "Core Web Vitals",
            "Schema.org & OG",
            "Edge / ISR where it helps",
          ],
        },
      ],
    },
  ] satisfies ServiceTier[],
};
