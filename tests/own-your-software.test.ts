import { afterEach, describe, expect, it, vi } from "vitest";

import { home } from "@/content/home";
import { ownYourSoftware } from "@/content/own-your-software";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { isContactTopic } from "@/lib/contact-schema";
import { llmsFullTxt, llmsTxt } from "@/lib/llms";
import { pages } from "@/lib/pages";
import { ownYourSoftwareGraph, siteGraph } from "@/lib/structured-data";

// Pricing is quoted per client, never published. Matches amounts, not the word "price".
const PRICE = /[$€£]\s?\d|\b\d[\d,.]*\s?(k|CAD|USD)\b/i;

describe("/own-your-software", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("publishes no prices, in the copy or the JSON-LD", () => {
    for (const amount of ["$4,500", "from $25k", "25k", "4500 CAD", "1,500 USD"]) expect(amount).toMatch(PRICE);
    expect(JSON.stringify(ownYourSoftware)).not.toMatch(PRICE);
    expect(JSON.stringify(ownYourSoftwareGraph())).not.toMatch(PRICE);
  });

  it("names every service as a step (Build or buy? is the first step's outcome)", () => {
    const names = ownYourSoftware.steps.flatMap((s) => [s.title, s.outcome]);
    for (const s of services.services) expect(names).toContain(s.title);
  });

  it("points its case study at a real project", async () => {
    // Drafts only load in development; a typo here would hide the case study forever.
    vi.stubEnv("NODE_ENV", "development");
    vi.resetModules();
    const { projects } = await import("@/content/projects");
    expect(projects.map((p) => p.slug)).toContain(ownYourSoftware.caseStudySlug);
  });

  it("is registered, in the nav, and linked from a services card", () => {
    const page = pages.find((p) => p.path === "/own-your-software");
    expect(page?.navLabel).toBeTruthy();
    expect(services.services.some((s) => s.href?.startsWith("/own-your-software#"))).toBe(true);
  });

  it("sends its calls to action to a contact topic that exists", () => {
    expect(isContactTopic("own-your-software")).toBe(true);
  });

  it("describes every step and FAQ in the JSON-LD", () => {
    const [service, faq] = ownYourSoftwareGraph()["@graph"];
    expect(service.url).toBe("https://birchlabs.ca/own-your-software");
    expect(service.provider).toEqual({ "@id": "https://birchlabs.ca/#business" });
    expect(service.hasOfferCatalog?.itemListElement).toHaveLength(ownYourSoftware.steps.length);
    expect(faq.mainEntity?.map((q) => q.name)).toEqual(ownYourSoftware.faqs.map((f) => f.question));
  });
});

describe("site copy", () => {
  it("publishes no prices in the home, services or site copy, or the site JSON-LD", () => {
    for (const content of [home, services, site, siteGraph()]) expect(JSON.stringify(content)).not.toMatch(PRICE);
  });

  it("says nothing about prices or full stack in llms.txt, llms-full.txt or the site JSON-LD", () => {
    const text = llmsTxt() + llmsFullTxt() + JSON.stringify(siteGraph());
    expect(text).not.toMatch(PRICE);
    expect(text).not.toMatch(/full[- ]?stack/i);
  });

  it("sends the home hero buttons to registered pages", () => {
    const paths = pages.map((p) => p.path);
    expect(paths).toContain(home.heroPrimaryHref);
    expect(paths).toContain(home.heroSecondaryHref);
  });
});

describe("services cards", () => {
  it("only link to registered pages", () => {
    const paths = pages.map((p) => p.path);
    for (const s of services.services) if (s.href) expect(paths).toContain(s.href.split("#")[0]);
  });

  it("link each card to its own step on /own-your-software", () => {
    const anchors = services.services.map((s) => s.href?.split("#")[1]);
    expect(new Set(anchors).size).toBe(services.services.length);
    for (const a of anchors) expect(ownYourSoftware.steps.map((s) => s.id)).toContain(a);
  });
});
