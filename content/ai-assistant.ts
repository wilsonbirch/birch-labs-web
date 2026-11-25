import type { FitBand, FitFactor } from "@/lib/fit-score";
import type { Seo } from "@/lib/types";

export const aiAssistant = {
  seo: {
    title: "AI Assistant for Small Business, on a Computer You Own",
    description:
      "An always-on AI assistant that drafts replies, chases invoices and sends you a morning brief. It runs on a small computer you own. Nothing goes out without your OK.",
  } satisfies Seo,
  heroEyebrow: "// ai assistant",
  heroTitle: "An assistant that does the busywork. You stay in charge.",
  heroSubtitle:
    "It reads the inbox, drafts the replies, chases the invoices and hands you a one-page brief each morning. It runs on a small computer you own, in your building. I set it up and look after it.",
  heroPrimaryButtonText: "Book a free 30-minute look →",
  heroSecondaryButtonText: "Score your jobs",

  problemEyebrow: "// the problem",
  problemHeading: "You know AI matters. You don't have the hours.",
  /** One string per paragraph. */
  problemBody: [
    "Most owners I talk to know AI could save them time. What they don't have is the time to wire it into the phones, the books and the follow-ups. The day is already full of running the business.",
    "So the busywork stays. Quotes go unanswered, invoices sit overdue, and the evening goes to email. I do the wiring for you, keep it working, and you get your hours back.",
  ],

  jobsEyebrow: "// what it does",
  jobsHeading: "Six jobs it can take off your plate.",
  jobsNote: "Before and after are typical aims, not measured results. We pick the jobs that fit your business.",
  jobs: [
    {
      name: "Morning brief",
      before: "You start the day digging through email, texts and the calendar.",
      after: "One page is waiting at 7: who's booked, what's overdue, what needs a reply.",
    },
    {
      name: "Invoice chaser",
      before: "Overdue invoices sit until you find time for an awkward email.",
      after: "A polite reminder is drafted on schedule. You tap OK and it goes.",
    },
    {
      name: "Quote follow-up",
      before: "Quotes go out and you never hear back.",
      after: "A few days later, a short check-in is drafted for every open quote.",
    },
    {
      name: "Review replies",
      before: "New reviews sit unanswered for weeks.",
      after: "Each review gets a draft reply in your voice, ready for you to approve.",
    },
    {
      name: "Missed-call text-back",
      before: "A missed call is often a lost job.",
      after: "The caller gets a text you approved up front, and you get a note to call back.",
    },
    {
      name: "Supplier price watch",
      before: "You find out about a price jump when the invoice lands.",
      after: "You get a heads-up when a regular item goes up, and where it's cheaper.",
    },
  ],

  safetyEyebrow: "// how it stays safe",
  safetyHeading: "It drafts. You decide.",
  safetyIntro: "Every assistant gets a short map of what it may do. In plain words:",
  safetyTiers: [
    {
      label: "Does on its own",
      body: "Reads your email, calendar and books. Sorts, sums up and writes drafts.",
    },
    {
      label: "Waits for your OK",
      body: "Anything sent to a customer, anything that touches money, anything posted in public. You approve each one, or a fixed message once up front.",
    },
    {
      label: "Blocked",
      body: "Deleting records, giving refunds, changing bank details. It can't do these at all.",
    },
  ],
  safetyPoints: [
    "Sensitive files, like health, legal or financial records, are handled by an AI model that runs on your own machine. They stay there.",
    "It signs in with your own accounts, the normal way. You never hand me your passwords.",
    "One switch turns it off.",
  ],

  stepsEyebrow: "// how we work",
  stepsHeading: "Start small. Prove it. Then grow.",
  steps: [
    {
      name: "Free 30-minute look",
      body: "We talk through your week. I tell you honestly whether an assistant would help.",
    },
    {
      name: "Process review",
      body: "A paid review of how the work really flows. You get a scored list of the jobs worth handing over, and which to do first.",
    },
    {
      name: "Build and pilot",
      body: "A fixed-scope build of the first few assistants, each with a name and a job. For two weeks they only draft, so you can check their work before anything goes out.",
    },
    {
      name: "Monthly care",
      body: "I stay on. I watch it, fix what breaks, keep it up to date, and add jobs when you're ready.",
    },
  ],

  proofEyebrow: "// proof",
  proofHeading: "I run one myself.",
  proofBody:
    "An always-on assistant runs on a mini PC at my house. Each morning it sends me a brief, it watches prices and listings for me, and overnight it drafts code reviews that I approve from my phone.",

  fitEyebrow: "// fit score",
  fitHeading: "Which jobs should go first?",
  fitIntro:
    "Add a few jobs you do every week and score each one from 1 to 5. The highest totals are the best place to start. Nothing you type here is saved or sent anywhere.",
  fitFactors: [
    { id: "frequency", label: "How often does it come up?", low: "Once a month or less", high: "Several times a day" },
    { id: "time", label: "How long does it take?", low: "A minute or two", high: "An hour or more" },
    { id: "clarity", label: "How clear are the steps?", low: "Different every time", high: "Same steps every time" },
    { id: "digital", label: "How digital is it?", low: "Paper and phone calls", high: "All email, files or apps" },
    { id: "mistakes", label: "If it goes wrong, how bad is it?", low: "Costly or hard to undo", high: "Easy to spot and fix" },
    { id: "handover", label: "How safe is it to hand over?", low: "Needs my judgement each time", high: "Anyone could draft it" },
  ] satisfies ReadonlyArray<{ id: FitFactor; label: string; low: string; high: string }>,
  fitBands: {
    start: "Start here",
    next: "Next",
    later: "Leave it for now",
  } satisfies Record<FitBand, string>,
  fitNameLabel: "A job you do each week",
  fitNamePlaceholder: "e.g. Chasing unpaid invoices",
  fitNameError: "Give the job a name.",
  fitAddButtonText: "Add job",
  fitListHeading: "Your jobs, best fit first",
  fitEmpty: "Your jobs will show up here, best fit first.",
  fitKey: "24 or more: start here. 18 to 23: next. Under 18: leave it for now.",
  fitCtaText: "Talk through your list →",

  ctaEyebrow: "// let's talk",
  ctaHeading: "Want your hours back?",
  ctaBody:
    "Book a free 30-minute look. Bring your list, or just your busiest week, and I'll tell you honestly what an assistant could take on.",
  ctaButtonText: "Book a free 30-minute look →",
};
