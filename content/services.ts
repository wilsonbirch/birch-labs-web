import type { Seo, ServiceItem } from "@/lib/types";

export const services = {
  seo: {
    title: "Full-Stack Development Services",
    description:
      "Native mobile apps, custom web apps, Shopify builds, AI integrations, and design-led marketing sites — built and shipped by a freelance developer in Ottawa.",
  } satisfies Seo,
  heroEyebrow: "// services",
  heroTitle: "What I build.",
  heroSubtitle: "From native apps to marketing sites, one developer across the full stack.",
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
    "expo",
    "react native",
    "supabase",
    "stripe",
    "mux",
    "posthog",
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
  services: [
    {
      title: "Native mobile apps",
      description: "iOS and Android from one codebase, shipped to the App Store and Google Play.",
      icon: "smartphone",
      bullets: ["Expo & React Native", "App Store & Play delivery", "Over-the-air updates"],
    },
    {
      title: "Custom web apps & SaaS",
      description: "Full-stack builds from schema to shipping.",
      icon: "layout",
      bullets: ["Next.js / Remix / FastAPI", "PostgreSQL, Prisma & GraphQL", "Auth, billing, admin portals"],
    },
    {
      title: "Shopify apps & storefronts",
      description: "Polaris-grade embedded apps and custom storefronts, built on Remix.",
      icon: "shopping-bag",
      bullets: ["Billing API & webhooks", "Multi-tenant architecture", "App Store ready"],
    },
    {
      title: "AI & LLM integrations",
      description: "RAG, summarization, and agent workflows using Gemini, Claude, or OpenAI.",
      icon: "sparkles",
      bullets: [
        "Prompt design & eval",
        "Async pipelines (Redis queues)",
        "Firecrawl / Puppeteer scraping",
      ],
    },
    {
      title: "Memberships & payments",
      description:
        "Subscriptions, tiers, and paywalls on Stripe, including moving members off another platform.",
      icon: "credit-card",
      bullets: ["Stripe Billing & webhooks", "Tiers & feature entitlements", "Member migrations"],
    },
    {
      title: "Community & moderation",
      description: "Comments, reporting, and moderator tools that keep an online community healthy.",
      icon: "users",
      bullets: ["Reports & audit logs", "Moderator roles & permissions", "Push & email notifications"],
    },
    {
      title: "Audio & video streaming",
      description:
        "Podcast and video playback that picks up where listeners left off, on every device.",
      icon: "headphones",
      bullets: ["Background audio playback", "Mux video & live streams", "Podcast RSS feeds"],
    },
    {
      title: "Marketing sites",
      description:
        "Hand-built sites that don't look like a template, with a CMS your team can edit themselves.",
      icon: "palette",
      bullets: [
        "Figma-to-production",
        "Sanity, Shopify, or the right CMS",
        "Motion & scroll choreography",
      ],
    },
    {
      title: "Performance & SEO",
      description: "Fast by default. Lighthouse 95+ and sensible on-page SEO come in the box.",
      icon: "zap",
      bullets: ["Core Web Vitals", "Schema.org & OG", "Edge / ISR where it helps"],
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
  ] satisfies ServiceItem[],
};
