import type { ProjectCard } from "@/lib/types";

import dfDepthChart from "./images/projects/3dfantasy-depth-chart.png";
import dfHero from "./images/projects/3dfantasy-hero.png";
import dfSidebar from "./images/projects/3dfantasy-sidebar.png";
import constructionContact from "./images/projects/construction-contact.png";
import constructionHero from "./images/projects/construction-hero.png";
import constructionTestimonials from "./images/projects/construction-testimonials.png";
import onereviewHero from "./images/projects/onereview-hero.png";
import onereviewPlans from "./images/projects/onereview-plans.png";
import onereviewSummaries from "./images/projects/onereview-summaries.png";
import saltyHero from "./images/projects/salty-hero.png";
import saltyHome from "./images/projects/salty-home.png";

/** Shown on /work in this order. */
export const projects: ProjectCard[] = [
  {
    slug: "onereview",
    title: "OneReview",
    client: "OneReview Inc.",
    year: 2024,
    tier: "applied-engineering",
    role: "CTO & Lead Developer",
    summary:
      "Shopify app and backend serving 220+ stores. AI pipeline that scrapes, validates, and summarizes product reviews across the web using Gemini and Firecrawl, backed by Redis queues for async workloads.",
    stack: [
      "Remix",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Gemini",
      "Shopify Polaris",
    ],
    heroImage: {
      src: onereviewHero,
      alt: "OneReview add summaries page - Screenshot",
    },
    gallery: [
      { src: onereviewPlans, alt: "OneReview plans page - Screenshot" },
      {
        src: onereviewSummaries,
        alt: "OneReview manage summaries page - Screenshot",
      },
    ],
    links: { live: "https://onereview.app" },
    body: [
      "Architected and maintain the backend infrastructure powering OneReview, a Shopify app that generates AI product-review summaries from reviews across the web. Seven internal services back the merchant-facing app: ingestion, scraping, generation, billing, admin, and two frontends.",
      "Asynchronous workloads run through Redis-backed queues, making long-running generations resilient and retryable. PostgreSQL schemas were tuned for multi-tenant scale. All services run in Docker with CI/CD on GitHub Actions and deploys to Fly.io.",
    ],
  },
  {
    slug: "3dfantasy",
    title: "CFL Fantasy Tools",
    client: "Personal",
    year: 2025,
    tier: "applied-engineering",
    role: "Solo developer",
    summary:
      "Fantasy football companion for the CFL. Scrapes weekly depth charts as they publish and emails updates to subscribers so they never miss a roster shake-up before game time.",
    stack: [
      "Remix",
      "Remix-Auth",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Node-Resque",
      "Puppeteer",
    ],
    heroImage: { src: dfHero, alt: "3DF home page" },
    gallery: [
      { src: dfDepthChart, alt: "3DF depth chart nav" },
      { src: dfSidebar, alt: "3DF sidebar nav" },
    ],
    links: {
      live: "https://3dfantasy.ca/",
      github: "https://github.com/3DFantasy/main",
    },
    body: [
      "A personal side project built to solve a specific pain: waking up on Sunday and realizing a Saturday depth-chart change had already ruined your lineup. 3DFantasy watches for new depth charts, diffs them, and sends targeted notifications only to users whose rostered players changed.",
    ],
  },
  {
    slug: "salty-website",
    title: "SALTY Retreats",
    client: "SALTY Retreats",
    year: 2026,
    tier: "applied-engineering",
    role: "Technical Consultant",
    summary:
      "Led production-launch DevOps end-to-end, deployment procedures, security best practices, structured error handling and logging, and a cleaner folder architecture. Ran an accessibility audit to align the UI with WCAG, and consulted on the analytics and monitoring stack used to track the rollout.",
    stack: [
      "Next.js",
      "Vercel",
      "Squarespace",
      "JSX-ally",
      "Sanity",
      "Posthog",
      "Sentry",
      "Github",
    ],
    heroImage: { src: saltyHero, alt: "SALTY Retreats - home page" },
    gallery: [{ src: saltyHome, alt: "SALTY Retreats - homepage 2" }],
    links: { live: "https://www.getsaltyretreats.com/" },
    body: [],
  },
  {
    slug: "construction-co",
    title: "Marketing Website - Construction",
    client: "Private client",
    year: 2026,
    tier: "marketing-site",
    role: "Designer & Developer",
    summary:
      "Design-forward marketing site for a residential construction company. Scroll-driven animations, a CMS-backed project gallery, and a lead form wired to notify the office in real time. A playground for pushing motion and interaction further than a typical small-business site.",
    stack: ["Next.js", "Framer Motion", "Sanity", "Tailwind"],
    heroImage: {
      src: constructionHero,
      alt: "Solem oath homepage - Your home, our passion",
    },
    gallery: [
      {
        src: constructionContact,
        alt: "Solen Oath web - booking/contact page",
      },
      {
        src: constructionTestimonials,
        alt: "Solen Oath web - testimonials page",
      },
    ],
    links: {
      live: "https://solemn-oath.fly.dev",
      github: "https://github.com/wilsonbirch/solemn_oath_web",
    },
    body: [
      "An in-progress build for a local residential construction company. Beyond the typical marketing-site brief, this one doubles as a sandbox for more ambitious interaction and motion work — scroll-driven layouts, custom cursors, and animated transitions that still feel at home on a small-business site.",
    ],
  },
];
