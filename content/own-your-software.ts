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
      "Paying for a platform you use 10% of? I audit what you pay for, build the part you or your team use, and keep it running. You own the code and the data.",
  } satisfies Seo,
  heroEyebrow: "// own your software",
  heroTitle: "Own the software you actually use.",
  heroSubtitle:
    "I find the subscriptions worth replacing, build the part you use, and keep it running. You own all of it.",
  heroPrimaryButtonText: "Talk it through →",
  heroSecondaryButtonText: "How it works",

  problemEyebrow: "// the problem",
  problemHeading: "Paying for 100%. Using 10%.",
  /** One string per paragraph. */
  problemBody: [
    "Most people and teams pay for whole platforms and use a sliver of them. Swapping in a cheaper vendor that covers the same sliver still leaves you renting software you don't control.",
    "AI has made it possible to build the part you use and own it. Where people stall is the last stretch: sign-in, payments, security, hosting, moving the data over, and what happens when it breaks months later. I get it across the line and keep it running.",
  ],

  stepsEyebrow: "// how it works",
  stepsHeading: "Four steps. Start at any of them.",
  stepsIntro: "Each step ends with something you keep. Take one on its own, or run all four.",
  /** Same names as the services cards on /services. */
  steps: [
    {
      number: "01",
      title: "Build or buy?",
      outcome: "What's worth owning",
      description:
        "A free call about what you pay for, what you really use, and who would own a tool you build. Then an audit that ranks each tool: replace, trim seats, renegotiate, or keep. If buying wins, I'll tell you to keep it.",
      bullets: [
        "Seats, cost and renewal dates",
        "What people actually use, from admin exports and short interviews",
        "Whether your data comes out cleanly",
        "The security and compliance work the vendor covers today",
      ],
    },
    {
      number: "02",
      title: "Build it",
      outcome: "One tool, built and owned",
      description:
        "One tool, built around the way you or your team work. It runs alongside the old one until you sign off, and you own the code and data outright.",
      bullets: [
        "Only the workflows you use",
        "Sign-in through your existing Google or Microsoft accounts",
        "Your data moved over and checked against the original",
        "Hosted in a cloud account in your name",
      ],
    },
    {
      number: "03",
      title: "Finish it",
      outcome: "Ready for real users",
      description:
        "Already started it, yourself or with AI? I make it production-ready, and set up guardrails so you or your team can keep building with AI safely. This step works on its own.",
      bullets: [
        "Security, sign-in and payments checked and fixed",
        "Tests and checks on every change, and no merge without review",
        "AI agents set up with your conventions and clear limits",
        "Secrets kept out of reach, and access kept to the minimum",
        "A plain-language playbook and two hands-on workshops",
      ],
    },
    {
      number: "04",
      title: "Run it",
      outcome: "Kept running",
      description:
        "A monthly plan. I keep it updated, patched and watched, and make the small changes you need. When something breaks months later, you have someone to call.",
      bullets: [
        "Updates and security patches",
        "Monitoring and alerts",
        "Small changes and fixes",
        "Code reviews if your team is building too",
      ],
    },
  ] satisfies EngagementStep[],

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
        "Often, yes. The audit is there to find the cases where it isn't: a tool you pay full price for, barely use, and are about to renew. When buying wins, I'll tell you to keep it.",
    },
    {
      question: "Who maintains the tool once it's built?",
      answer:
        "You own the code, the data and the accounts it runs in, so you can leave any time. Most people keep me on to run it. If your team wants to build on it too, the guardrails from Finish it let them do that safely with AI.",
    },
    {
      question: "Is AI-written code safe to run in production?",
      answer:
        "It can be, with the same discipline as any other code: tests, human review, limited access, and secrets kept out of reach. Setting that up is part of Finish it.",
    },
    {
      question: "Do you copy the vendor's product?",
      answer:
        "No. Every build starts from your own workflows and data, so it fits how you or your team work.",
    },
    {
      question: "Do you work with people outside Ottawa?",
      answer: "Yes. I'm based in Ottawa and work remotely with people and teams across Canada and the US.",
    },
  ] satisfies Faq[],

  ctaEyebrow: "// let's talk",
  ctaHeading: "Paying for more than you use?",
  ctaBody:
    "Tell me which subscription bothers you most, or what you've started building. I'll reply within 48 hours with honest thoughts on what to do next.",
  ctaButtonText: "Talk it through →",
};
