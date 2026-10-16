import { afterEach, describe, expect, it, vi } from "vitest";

import { ownYourSoftware } from "@/content/own-your-software";
import { services } from "@/content/services";
import { isContactTopic } from "@/lib/contact-schema";
import { pages } from "@/lib/pages";
import { ownYourSoftwareGraph } from "@/lib/structured-data";

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
    expect(services.services.some((s) => s.href === "/own-your-software")).toBe(true);
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

describe("services cards", () => {
  it("only link to registered pages", () => {
    const paths = pages.map((p) => p.path);
    for (const s of services.services) if (s.href) expect(paths).toContain(s.href);
  });
});
