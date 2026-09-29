import type { QuickFact } from "@/components/sections/About";
import type { Img, Seo } from "@/lib/types";

import portrait from "./images/portrait.jpg";

export const about = {
  seo: {
    title: "About Wilson Birch",
    description:
      "Engineer turned developer. I build production apps, AI pipelines, and marketing sites at Birch Labs — short-form contracts, real outcomes.",
  } satisfies Seo,
  heroEyebrow: "// about",
  heroTitle: "Who's building this.",
  heroSubtitle:
    "Engineer turned developer building production software at Birch Labs. Short contracts, real outcomes",
  portrait: {
    src: portrait,
    alt: "Self portrait, Birch Labs owner/operator Wilson Birch",
  } satisfies Img,
  /** One string per paragraph. */
  body: [
    "Mechanical engineering grad from Carleton University, former U Sports football player, now building software full-time. The bridge between the two: a stubborn love of solving the actual problem, not the polished-up version of it. Easy problems are already solved. I'm searching for the hard ones. Lately that's meant shipping AI pipelines, marketing sites, and product surfaces for early-stage teams under the Birch Labs banner.",
  ],
  quickFacts: [
    { label: "EXPERIENCE", value: "5+ Years Software Engineering" },
    { label: "BACKGROUND", value: "Mechanical Engineering Graduate" },
    { label: "ATHLETICS", value: "USports Football, Carleton University" },
    { label: "NOW", value: "Founder & engineer at Birch Labs" },
    { label: "BASED IN", value: "Ottawa, On." },
  ] satisfies QuickFact[],
};
