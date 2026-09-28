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
import vnmJournal from "./images/projects/vnm-journal.png";
import vnmNowPlaying from "./images/projects/vnm-now-playing.png";
import vnmVillageMap from "./images/projects/vnm-village-map.png";
import vnmVillageSquare from "./images/projects/vnm-village-square.png";

/** Shown on /work in this order. */
const allProjects: ProjectCard[] = [
  {
    slug: "village-of-nothing-much",
    // Remove once the app launches.
    draft: true,
    title: "Village of Nothing Much",
    client: "Nothing Much Happens",
    year: 2026,
    tier: "applied-engineering",
    role: "Lead Developer",
    summary:
      "Member app for the Nothing Much Happens sleep podcast: iOS, Android, and web on one GraphQL backend. Streaming audio with synced progress, a village map of community rooms, private journals, moderation tools, and Stripe memberships migrated from Fourthwall.",
    stack: [
      "Expo",
      "React Native",
      "Next.js",
      "GraphQL",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Stripe",
    ],
    heroImage: { src: vnmNowPlaying, alt: "Village of Nothing Much - Now Playing screen" },
    gallery: [
      { src: vnmVillageMap, alt: "Village of Nothing Much - village map" },
      { src: vnmJournal, alt: "Village of Nothing Much - private journal" },
      { src: vnmVillageSquare, alt: "Village of Nothing Much - Village Square home" },
    ],
    links: {},
    body: [
      "Architected and built the platform end to end for the Nothing Much Happens community: an Expo app for iOS and Android and a Next.js web app with a full admin portal, both on a GraphQL API (Pothos, Yoga, Prisma on Postgres).",
      "A transactional event outbox drives badges, push notifications, and email sync from one stream. Moderation ships with reports, audit logs, and server-enforced quiet hours for late-night posting. Memberships run on Stripe with an import path for existing Fourthwall members.",
    ],
  },
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
    slug: "cfl-fantasy-tools",
    title: "CFL Fantasy Tools",
    client: "Personal",
    year: 2026,
    tier: "applied-engineering",
    role: "Solo developer",
    summary:
      "Analytics platform for CFL fantasy players. Scrapes all nine clubs' depth charts every 30 minutes, diffs every change, and emails a team's subscribers the moment its chart moves, with EPA and fantasy projections built from play-by-play data.",
    stack: ["React Router", "GraphQL", "Prisma", "PostgreSQL", "Puppeteer", "Expo", "Resend", "Fly.io"],
    heroImage: { src: dfHero, alt: "3DF home page" },
    gallery: [
      { src: dfDepthChart, alt: "3DF depth chart nav" },
      { src: dfSidebar, alt: "3DF sidebar nav" },
    ],
    links: { github: "https://github.com/wilsonbirch/cflfantasytools-api" },
    body: [
      "A ground-up 2026 rewrite of 3DFantasy, my CFL fantasy side project. A scheduled worker scrapes every club's depth chart every 30 minutes, archives the PDFs, diffs each snapshot, and emails a team's subscribers the moment its chart changes.",
      "On top of the scraped data sit play-by-play parsing, an EPA model, Game Zone salary sync, and fantasy projections that beat a season-average baseline. A GraphQL API on Fly.io serves a React Router web app and an Expo app for iOS and Android.",
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
      "Took the site to production: CI/CD and Vercel deploys, security headers and rate limiting, structured logging and error handling, a phased Vitest suite, and a cleaner folder architecture. Added accessibility linting and fixed WCAG issues, and consulted on Meta ad tracking, analytics and monitoring, and the technical feasibility of new features.",
    stack: [
      "Next.js",
      "Vercel",
      "GitHub Actions",
      "Vitest",
      "Sanity",
      "Sentry",
      "PostHog",
      "Upstash Redis",
      "eslint-plugin-jsx-a11y",
      "Meta Pixel & CAPI",
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

/** Drafts render in `next dev` only, so they can be previewed but never ship. */
export const projects = allProjects.filter(
  (p) => !p.draft || process.env.NODE_ENV === "development",
);
