import { site } from "@/content/site";
import type { Seo, ServiceItem } from "@/lib/types";

export const services = {
  seo: {
    title: "Custom Software You Own: Built, Finished and Maintained",
    description:
      "Custom software you own, including projects you started with AI: built or finished, then kept running. From a freelance developer in Ottawa.",
  } satisfies Seo,
  heroEyebrow: "// services",
  heroTitle: "What I do.",
  heroSubtitle: site.pitch,
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
  /** Same names as the steps on /own-your-software, so each card links there. Build or buy? is the optional start. */
  services: [
    {
      title: "Build it",
      description:
        "Replace a subscription, or build the tool you wish existed. Web, mobile, payments, AI, whatever it needs. Some of what I've built:",
      icon: "hammer",
      bullets: [
        "Native iOS and Android apps",
        "Web apps and SaaS",
        "Shopify apps",
        "AI and LLM features",
        "Data pipelines and scrapers",
        "Memberships and payments on Stripe",
      ],
      href: "/own-your-software",
    },
    {
      title: "Finish it",
      description:
        "You or your team started it, yourself or with AI. I make it ready for real users.",
      icon: "shield-check",
      bullets: [
        "Security and sign-in",
        "Payments",
        "Tests and checks on every change",
        "Hosting in accounts you own",
        "Guardrails for building safely with AI",
      ],
      href: "/own-your-software",
    },
    {
      title: "Run it",
      description:
        "A monthly plan that keeps your software running after launch, so there's someone to call when it breaks.",
      icon: "activity",
      bullets: [
        "Updates and security patches",
        "Monitoring and alerts",
        "Small changes as you need them",
      ],
      href: "/own-your-software",
    },
    {
      title: "Build or buy?",
      description:
        "Not sure what to replace? Start with a free call. If you want more, I audit what you pay for and tell you what's worth owning. When buying wins, I'll tell you to keep it.",
      icon: "scale",
      bullets: [
        "A free call to start",
        "An optional audit of your subscriptions",
        "Replace, trim, renegotiate or keep, tool by tool",
      ],
      href: "/own-your-software",
    },
  ] satisfies ServiceItem[],
};
