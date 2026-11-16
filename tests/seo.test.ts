import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { services } from "@/content/services";
import { llmsFullTxt, llmsTxt } from "@/lib/llms";
import { navLinks } from "@/lib/nav";
import { pages } from "@/lib/pages";
import { siteGraph } from "@/lib/structured-data";

// Pages that must never drop out of the registry by accident.
const CORE_PATHS = ["/", "/work", "/services", "/about", "/contact"];
const paths = pages.map((p) => p.path);

describe("page registry", () => {
  it("keeps the core pages", () => {
    expect(paths).toEqual(expect.arrayContaining(CORE_PATHS));
  });

  it("has unique, root-relative paths with a name and description", () => {
    expect(new Set(paths).size).toBe(paths.length);
    for (const page of pages) {
      expect(page.path).toMatch(/^\/[a-z0-9-]*$/);
      expect(page.name.trim()).not.toBe("");
      expect(page.description.trim()).not.toBe("");
    }
  });

  it("builds the nav from labelled pages, in registry order", () => {
    expect(navLinks).toEqual(
      pages.filter((p) => p.navLabel).map((p) => ({ label: p.navLabel, href: p.path })),
    );
  });
});

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every registered page once, as an absolute URL", () => {
    expect(urls).toEqual(paths.map((p) => `https://birchlabs.ca${p}`));
  });
});

describe("llms.txt", () => {
  it("links every registered page with its description", () => {
    const txt = llmsTxt();
    for (const page of pages) {
      expect(txt).toContain(`- [${page.name}](https://birchlabs.ca${page.path}): ${page.description}`);
    }
  });

  it("names every service in both files", () => {
    const short = llmsTxt();
    const full = llmsFullTxt();
    for (const s of services.services) {
      expect(short).toContain(`- ${s.title}`);
      expect(full).toContain(`### ${s.title}`);
    }
  });
});

describe("structured data", () => {
  const graph = siteGraph()["@graph"];
  const business = graph.find((node) => node["@type"] === "ProfessionalService");

  it("offers every service in the catalog", () => {
    const offered = business?.hasOfferCatalog?.itemListElement.map((o) => o.itemOffered.name);
    expect(offered).toEqual(services.services.map((s) => s.title));
  });

  it("serializes to JSON without losing nodes", () => {
    expect(JSON.parse(JSON.stringify(siteGraph()))["@graph"]).toHaveLength(graph.length);
  });
});
