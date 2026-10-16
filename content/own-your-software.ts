import type { Seo } from "@/lib/types";

export type EngagementStep = {
  number: string;
  title: string;
  /** What the step answers or produces, in a few words. */
  outcome: string;
  description: string;
  bullets?: string[];
};

export type Faq = { question: string; answer: string };

export const ownYourSoftware = {
  seo: {
    title: "Replace SaaS You Barely Use with Software You Own",
    description:
      "Paying for a platform you use 10% of? I audit your SaaS spend, build the part your team uses, and set your team up to keep building safely with AI.",
  } satisfies Seo,
  heroEyebrow: "// build vs buy",
  heroTitle: "Own the software you actually use.",
  heroSubtitle:
    "I find the subscriptions worth replacing, build the part your team uses, and set your team up to keep building safely with AI.",
  heroPrimaryButtonText: "Talk it through →",
  heroSecondaryButtonText: "How it works",

  problemEyebrow: "// the problem",
  problemHeading: "Paying for 100%. Using 10%.",
  /** One string per paragraph. */
  problemBody: [
    "Most teams pay for whole platforms and use a sliver of them. Swapping in a cheaper vendor that covers the same sliver still leaves you renting software you don't control.",
    "AI coding agents now make it realistic to build and own the part you use. What teams lack is hours, and someone to set the work up so it stays secure and maintainable after launch. That's the role I fill.",
  ],

  stepsEyebrow: "// how it works",
  stepsHeading: "Four steps. Start at any of them.",
  stepsIntro: "Each step ends with something you keep. Take one on its own, or run all four.",
  steps: [
    {
      number: "01",
      title: "Idea",
      outcome: "Is it worth building?",
      description:
        "A free 45-minute call about which subscriptions hurt, what your team really uses, and who would own a tool you build. If the answer is to keep paying the vendor, I'll say so.",
    },
    {
      number: "02",
      title: "Audit",
      outcome: "Which tools to replace",
      description:
        "A ranked scorecard for each tool: replace, trim seats, renegotiate, or keep. The top candidates come with rough build and running costs.",
      bullets: [
        "Seats, cost and renewal dates",
        "What people actually use, from admin exports and short interviews",
        "Whether your data comes out cleanly",
        "The security and compliance work the vendor covers today",
      ],
    },
    {
      number: "03",
      title: "Pilot",
      outcome: "One tool, built and owned",
      description:
        "One tool, rebuilt around the workflows your team uses. It runs alongside the old one until your team signs off, and you own the code and data outright.",
      bullets: [
        "Only the workflows your team uses",
        "Sign-in through your existing Google or Microsoft accounts",
        "Your data moved over and checked against the original",
        "Hosted in a cloud account in your name",
      ],
    },
    {
      number: "04",
      title: "Guardrails",
      outcome: "Your team builds safely with AI",
      description:
        "Your team keeps building with AI agents, and what they ship stays secure and maintainable. This step works on its own for teams already building with AI.",
      bullets: [
        "Tests and checks on every change, and no merge without review",
        "AI agents set up with your conventions and clear limits",
        "Secrets kept out of reach, and access kept to the minimum",
        "A plain-language playbook and two hands-on workshops",
      ],
    },
  ] satisfies EngagementStep[],
  ongoing:
    "After that, optional ongoing support: a monthly block of senior hours for code reviews, security updates, and planning the next tool to bring in-house.",

  caseStudyEyebrow: "// case study",
  caseStudyHeading: "From a platform to their own app.",
  caseStudyBody:
    "Nothing Much Happens took its paying community off Fourthwall and onto a member app it owns: iOS, Android and web on one backend, with memberships on Stripe and existing members brought across.",
  /** Shown only while this project is published on /work (drafts stay hidden in production). */
  caseStudySlug: "village-of-nothing-much",

  faqEyebrow: "// questions",
  faqHeading: "Fair questions.",
  faqs: [
    {
      question: "Isn't buying software always cheaper than building it?",
      answer:
        "Often, yes. The Audit is there to find the cases where it isn't: a tool you pay full price for, barely use, and are about to renew. When buying wins, the scorecard says keep it.",
    },
    {
      question: "Who maintains the tool once it's built?",
      answer:
        "Your team, with the Guardrails step setting them up for it. Everything runs in accounts you own and comes with a runbook, so you aren't locked into a vendor or into me. Ongoing support is there if you want a senior reviewer on call.",
    },
    {
      question: "Is AI-written code safe to run in production?",
      answer:
        "It can be, with the same discipline as any other code: tests, human review, limited access, and secrets kept out of reach. Setting that up is what the Guardrails step is for.",
    },
    {
      question: "Do you copy the vendor's product?",
      answer:
        "No. Every build starts from your own workflows and data, so you get software shaped around how your team works, not a clone of someone else's.",
    },
    {
      question: "Do you work with teams outside Ottawa?",
      answer: "Yes. I'm based in Ottawa and work remotely with teams across Canada and the US.",
    },
  ] satisfies Faq[],

  ctaEyebrow: "// let's talk",
  ctaHeading: "Paying for more than you use?",
  ctaBody:
    "Tell me which subscription bothers you most. I'll reply within 48 hours with honest thoughts on whether it's worth building.",
  ctaButtonText: "Talk it through →",
};
