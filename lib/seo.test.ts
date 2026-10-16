import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { services } from "@/content/services";
import { llmsFullTxt, llmsTxt } from "@/lib/llms";
import { navLinks } from "@/lib/nav";
import { siteGraph } from "@/lib/structured-data";

const PUBLIC_PATHS = ["/", "/work", "/services", "/about", "/contact"];

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every public page once, as an absolute URL", () => {
    expect(urls).toEqual(expect.arrayContaining(PUBLIC_PATHS.map((p) => `https://birchlabs.ca${p}`)));
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("lists every nav link", () => {
    for (const link of navLinks) expect(urls).toContain(`https://birchlabs.ca${link.href}`);
  });
});

describe("llms.txt", () => {
  it("links every public page", () => {
    const txt = llmsTxt();
    for (const path of PUBLIC_PATHS) expect(txt).toContain(`](https://birchlabs.ca${path})`);
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
