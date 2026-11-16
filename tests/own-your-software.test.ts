import { afterEach, describe, expect, it, vi } from "vitest";

import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { home } from "@/content/home";
import { ownYourSoftware } from "@/content/own-your-software";
import { site } from "@/content/site";
import { work } from "@/content/work";
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

  it("points its case study at a real project", async () => {
    // Drafts only load in development; a typo here would hide the case study forever.
    vi.stubEnv("NODE_ENV", "development");
    vi.resetModules();
    const { projects } = await import("@/content/projects");
    expect(projects.map((p) => p.slug)).toContain(ownYourSoftware.caseStudySlug);
  });

  it("is registered and in the nav", () => {
    expect(pages.find((p) => p.path === "/own-your-software")?.navLabel).toBe("Own your software");
  });

  it("sends its calls to action to a contact topic that exists", () => {
    expect(isContactTopic("own-your-software")).toBe(true);
  });

  it("describes the service in one JSON-LD node, with no offer list", () => {
    const service = ownYourSoftwareGraph();
    expect(service["@type"]).toBe("Service");
    expect(service.url).toBe("https://birchlabs.ca/own-your-software");
    expect(service.provider).toEqual({ "@id": "https://birchlabs.ca/#business" });
    expect(service).not.toHaveProperty("hasOfferCatalog");
  });
});

describe("site copy", () => {
  const copy = [home, site, ownYourSoftware, about, work, contact];

  it("publishes no prices or full stack in the page copy or any JSON-LD", () => {
    for (const amount of ["$4,500", "from $25k", "25k", "4500 CAD", "1,500 USD"]) expect(amount).toMatch(PRICE);
    for (const content of [...copy, siteGraph(), ownYourSoftwareGraph()]) {
      const text = JSON.stringify(content);
      expect(text).not.toMatch(PRICE);
      expect(text).not.toMatch(/full[- ]?stack/i);
    }
  });

  it("says nothing about prices or full stack in llms.txt or llms-full.txt", () => {
    const text = llmsTxt() + llmsFullTxt();
    expect(text).not.toMatch(PRICE);
    expect(text).not.toMatch(/full[- ]?stack/i);
  });

  it("leads llms.txt with the narrative and the pitch", () => {
    expect(llmsTxt()).toContain(`> ${site.tagline} ${site.pitch}`);
  });

  it("sends the home hero buttons to registered pages", () => {
    const paths = pages.map((p) => p.path);
    expect(paths).toContain(home.heroPrimaryHref);
    expect(paths).toContain(home.heroSecondaryHref);
  });
});
