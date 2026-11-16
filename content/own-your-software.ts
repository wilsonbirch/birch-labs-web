import type { Seo } from "@/lib/types";

export const ownYourSoftware = {
  seo: {
    title: "Replace SaaS You Barely Use with Software You Own",
    description:
      "Paying for a platform you use 10% of? Bring me the tool you'd rather own. I build it, get it to production, and keep it running.",
  } satisfies Seo,
  heroEyebrow: "// own your software",
  heroTitle: "Own the software you actually use.",
  heroSubtitle:
    "You know which tools you'd rather own than rent. I build them, get them across the line, and keep them running.",
  heroPrimaryButtonText: "Talk it through →",

  problemEyebrow: "// the problem",
  problemHeading: "Paying for 100%. Using 10%.",
  /** One string per paragraph. */
  problemBody: [
    "Most people and teams pay for whole platforms and use a sliver of them. Swapping in a cheaper vendor that covers the same sliver still leaves you renting software you don't control.",
    "AI has made it possible to build the part you use and own it. Where people stall is the last stretch: sign-in, payments, security, hosting, moving the data over, and what happens when it breaks months later. I get it across the line and keep it running.",
  ],

  ctaEyebrow: "// let's talk",
  ctaHeading: "Paying for more than you use?",
  ctaBody:
    "Tell me which subscription bothers you most, or what you've started building. I'll reply within 48 hours with honest thoughts on what to do next.",
  ctaButtonText: "Talk it through →",
};
