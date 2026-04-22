#!/usr/bin/env node
/**
 * Seed the Sanity dataset for Birch Labs.
 *
 * Idempotent — uses createOrReplace for singletons and known project IDs,
 * so re-running is safe and will overwrite the seeded content (but won't
 * touch projects you created yourself in the Studio with different IDs).
 *
 * Requires a write-scoped Sanity token:
 *   https://www.sanity.io/manage -> your project -> API -> Tokens
 *
 * Run:
 *   SANITY_API_WRITE_TOKEN=sk_xxx npm run seed
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local loader (no dotenv dep).
for (const file of [".env.local", ".env"]) {
  try {
    const raw = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
      }
    }
  } catch {
    // file not present — ignore.
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("x  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check .env.local.");
  process.exit(1);
}
if (!token) {
  console.error(
    "x  SANITY_API_WRITE_TOKEN is not set.\n\n" +
      "   Get a write token at https://www.sanity.io/manage\n" +
      "   -> your project -> API -> Tokens -> Add API token\n" +
      "   Permissions: Editor\n\n" +
      "   Then run again:\n" +
      "     SANITY_API_WRITE_TOKEN=sk_xxx npm run seed",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01",
  useCdn: false,
});

const block = (text) => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2, 10),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  businessName: "Birch Labs",
  tagline: "Full-stack development for ambitious builds.",
  availability: "Currently booking — reply within 48 hours",
  email: "wilsonbirch@gmail.com",
  phone: "613-229-4163",
  address: "Ottawa, ON",
  social: {
    linkedin: "https://www.linkedin.com/in/wilson-birch/",
    github: "https://github.com/wilsonbirch",
  },
  footerText:
    "Birch Labs is the freelance practice of Wilson Birch — full-stack developer and CTO. Based in Ottawa, Canada.",
  defaultSeo: {
    title: "Birch Labs — Full-stack development",
    description:
      "Freelance full-stack development. Custom web apps, AI integrations, Shopify builds, and motion-rich marketing sites.",
  },
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "> freelance full-stack dev · ottawa",
  heroTitle: "Birch Labs",
  heroSubtitle:
    "I build production software — from AI-powered Shopify apps and custom SaaS to motion-rich marketing sites. One developer, the full stack, and a bias toward shipping.",
  availability: "Currently booking — reply within 48 hours",
  intro: [
    block(
      "Two things I do well: engineering the unglamorous parts of real products (backends, data, integrations, AI) and building marketing sites that make small businesses look like they've got a team. Pick a tier — or combine both.",
    ),
  ],
  tiers: [
    {
      _type: "serviceTier",
      _key: "tier-applied-engineering",
      label: "Applied Engineering",
      tagline: "Custom software, Shopify apps, AI pipelines, and everything in between.",
      services: [
        {
          _type: "service",
          _key: "svc-shopify",
          title: "Shopify apps & storefronts",
          description: "Polaris-grade embedded apps and custom storefronts, built on Remix.",
          bullets: ["Billing API & webhooks", "Multi-tenant architecture", "App Store ready"],
          icon: "shopping-bag",
        },
        {
          _type: "service",
          _key: "svc-ai",
          title: "AI & LLM integrations",
          description: "RAG, summarization, and agent workflows using Gemini, Claude, or OpenAI.",
          bullets: ["Prompt design & eval", "Async pipelines (Redis queues)", "Firecrawl / Puppeteer scraping"],
          icon: "sparkles",
        },
        {
          _type: "service",
          _key: "svc-saas",
          title: "Custom SaaS & internal tools",
          description: "Full-stack builds from schema to shipping.",
          bullets: ["Next.js / Remix / FastAPI", "PostgreSQL & Prisma", "Auth, billing, admin"],
          icon: "layout",
        },
        {
          _type: "service",
          _key: "svc-devops",
          title: "DevOps & platform work",
          description: "Docker, CI/CD, and the ops glue that keeps teams shipping.",
          bullets: ["GitHub Actions / Azure DevOps", "Fly.io / Vercel deploys", "Observability & release automation"],
          icon: "server",
        },
      ],
    },
    {
      _type: "serviceTier",
      _key: "tier-marketing",
      label: "Marketing Sites",
      tagline: "Design-forward, animated, CMS-backed sites for small businesses.",
      services: [
        {
          _type: "service",
          _key: "svc-landing",
          title: "Bespoke landing pages",
          description: "Hand-built sites that don't look like a template — because they aren't.",
          bullets: ["Figma-to-production", "Motion & micro-interactions", "Accessibility-first"],
          icon: "palette",
        },
        {
          _type: "service",
          _key: "svc-cms",
          title: "CMS-backed sites",
          description: "Sanity, Shopify, or the right CMS for the job — so your client can edit, not email you.",
          bullets: ["Structured content modelling", "Editor-friendly studio", "Live previews"],
          icon: "file-text",
        },
        {
          _type: "service",
          _key: "svc-motion",
          title: "Motion & interaction",
          description: "Scroll-driven moments, hover states, and animations that actually serve the story.",
          bullets: ["Framer Motion / GSAP", "Scroll choreography", "Reduced-motion aware"],
          icon: "wand-2",
        },
        {
          _type: "service",
          _key: "svc-perf",
          title: "Performance & SEO",
          description: "Fast by default. Lighthouse 95+ and sensible on-page SEO come in the box.",
          bullets: ["Core Web Vitals", "Schema.org & OG", "Edge / ISR where it helps"],
          icon: "zap",
        },
      ],
    },
  ],
  featuredProjects: [
    { _type: "reference", _key: "ref-onereview", _ref: "project-onereview" },
    { _type: "reference", _key: "ref-3dfantasy", _ref: "project-3dfantasy" },
    { _type: "reference", _key: "ref-construction", _ref: "project-construction" },
  ],
  aboutHeading: "Engineer first. Designer second. Shipped, always.",
  aboutBody: [
    block(
      "I'm Wilson Birch — a mechanical engineer who took a hard left into software and never looked back. By day I work in full-stack development and DevOps: building internal tools, maintaining server infrastructure for 10,000+ enterprise users, and keeping CI/CD pipelines humming across hundreds of environments.",
    ),
    block(
      "By early mornings and late nights, I'm CTO at OneReview, where I've built the backend infrastructure powering 220+ Shopify stores and an AI pipeline that summarizes product reviews at scale — using Python, FastAPI, Redis queues, PostgreSQL, and Gemini.",
    ),
    block(
      "Birch Labs is where I take what I've learned across those roles — architecting, building, and shipping under real constraints — and bring it to small teams and solo founders who need one senior developer instead of a four-person agency. If it touches the web, I can build it.",
    ),
  ],
  ctaHeading: "Have a project?",
  ctaBody:
    "Short-form pitches welcome. Send a paragraph about what you're building, and I'll reply within 48 hours with honest thoughts and a rough estimate.",
};

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  heading: "Start a project",
  intro:
    "Tell me about what you're building. I'll reply within 48 hours — even if the answer is 'not a fit right now.'",
  successMessage: "Got it. I'll be in touch within 48 hours.",
};

const projects = [
  {
    _id: "project-onereview",
    _type: "project",
    title: "OneReview",
    slug: { _type: "slug", current: "onereview" },
    client: "OneReview Inc.",
    year: 2024,
    tier: "applied-engineering",
    summary:
      "Shopify app and backend serving 220+ stores. AI pipeline that scrapes, validates, and summarizes product reviews across the web using Gemini and Firecrawl, backed by Redis queues for async workloads.",
    role: "CTO & Lead Developer",
    stack: ["Remix", "Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Gemini", "Shopify Polaris"],
    links: {
      live: "https://onereview.app",
      github: null,
    },
    featured: true,
    order: 1,
    body: [
      block(
        "Architected and maintain the backend infrastructure powering OneReview, a Shopify app that generates AI product-review summaries from reviews across the web. Seven internal services back the merchant-facing app: ingestion, scraping, generation, billing, admin, and two frontends.",
      ),
      block(
        "Asynchronous workloads run through Redis-backed queues, making long-running generations resilient and retryable. PostgreSQL schemas were tuned for multi-tenant scale. All services run in Docker with CI/CD on GitHub Actions and deploys to Fly.io.",
      ),
    ],
  },
  {
    _id: "project-3dfantasy",
    _type: "project",
    title: "3DFantasy",
    slug: { _type: "slug", current: "3dfantasy" },
    client: "Personal",
    year: 2024,
    tier: "applied-engineering",
    summary:
      "Fantasy football companion for the CFL. Scrapes weekly depth charts as they publish and emails updates to subscribers so they never miss a roster shake-up before game time.",
    role: "Solo developer",
    stack: ["Remix", "Remix-Auth", "Prisma", "PostgreSQL", "Redis", "Node-Resque", "Puppeteer"],
    links: {
      live: null,
      github: null,
    },
    featured: true,
    order: 2,
    body: [
      block(
        "A personal side project built to solve a specific pain: waking up on Sunday and realizing a Saturday depth-chart change had already ruined your lineup. 3DFantasy watches for new depth charts, diffs them, and sends targeted notifications only to users whose rostered players changed.",
      ),
    ],
  },
  {
    _id: "project-construction",
    _type: "project",
    title: "Marketing site for a local construction company",
    slug: { _type: "slug", current: "construction-co" },
    client: "Private client",
    year: 2026,
    tier: "marketing-site",
    summary:
      "Design-forward marketing site for a residential construction company. Scroll-driven animations, a CMS-backed project gallery, and a lead form wired to notify the office in real time. A playground for pushing motion and interaction further than a typical small-business site.",
    role: "Designer & Developer",
    stack: ["Next.js", "Framer Motion", "Sanity", "Tailwind"],
    links: {
      live: null,
      github: null,
    },
    featured: true,
    order: 3,
    body: [
      block(
        "An in-progress build for a local residential construction company. Beyond the typical marketing-site brief, this one doubles as a sandbox for more ambitious interaction and motion work — scroll-driven layouts, custom cursors, and animated transitions that still feel at home on a small-business site.",
      ),
    ],
  },
];

async function run() {
  console.log(`->  Seeding ${projectId}/${dataset}`);

  // Seed projects FIRST so the homePage can reference them.
  for (const p of projects) {
    await client.createOrReplace(p);
    console.log(`   ok project (${p._id})`);
  }

  for (const doc of [siteSettings, homePage, contactPage]) {
    await client.createOrReplace(doc);
    console.log(`   ok ${doc._type} (${doc._id})`);
  }

  console.log("ok  Done. Visit /studio to edit.");
}

run().catch((err) => {
  console.error("x  Seed failed:", err.message ?? err);
  process.exit(1);
});
