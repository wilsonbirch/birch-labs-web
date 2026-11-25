import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";
import { llmsTxt } from "@/lib/llms";
import { navLinks } from "@/lib/nav";
import { pages } from "@/lib/pages";
import { siteGraph } from "@/lib/structured-data";

// Pages that must never drop out of the registry by accident.
const CORE_PATHS = ["/", "/work", "/own-your-software", "/ai-assistant", "/about", "/contact"];
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

  it("no longer has /services, which redirects to /own-your-software", async () => {
    expect(paths).not.toContain("/services");
    expect(await nextConfig.redirects?.()).toContainEqual({
      source: "/services",
      destination: "/own-your-software",
      permanent: true,
    });
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
});

describe("structured data", () => {
  const graph = siteGraph()["@graph"];

  it("serializes to JSON without losing nodes", () => {
    expect(JSON.parse(JSON.stringify(siteGraph()))["@graph"]).toHaveLength(graph.length);
  });
});
