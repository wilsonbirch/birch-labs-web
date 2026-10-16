import type { Seo } from "@/lib/types";

export const contact = {
  seo: {
    title: "Start a project",
    description:
      "Pitch a project, ask a question, or just say hi. Short-form messages welcome — I reply within 48 hours with honest thoughts and a rough estimate",
  } satisfies Seo,
  heading: "Start a project",
  intro:
    "Tell me about what you're building, big or small, and I'll follow up with honest thoughts and next steps.",
  successMessage: "Got it, thanks! I'll be in touch soon.",
  topicLabel: "What are you after?",
  /** The first topic is the default. `?topic=<value>` on /contact preselects one. */
  topics: [
    { value: "project", label: "A software project" },
    { value: "own-your-software", label: "Own your software (build vs buy)" },
    { value: "other", label: "Something else" },
  ],
} as const;
