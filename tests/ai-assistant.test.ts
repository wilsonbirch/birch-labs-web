import { describe, expect, it } from "vitest";

import { aiAssistant } from "@/content/ai-assistant";
import { isContactTopic } from "@/lib/contact-schema";
import { FIT_FACTORS, FIT_MAX, fitBand, fitTotal, rankTasks, type FitScores } from "@/lib/fit-score";
import { pages } from "@/lib/pages";
import { aiAssistantGraph } from "@/lib/structured-data";

const all = (n: number) => Object.fromEntries(FIT_FACTORS.map((f) => [f, n])) as FitScores;

describe("/ai-assistant", () => {
  it("is registered and in the nav", () => {
    expect(pages.find((p) => p.path === "/ai-assistant")?.navLabel).toBe("AI assistant");
  });

  it("sends its calls to action to a contact topic that exists", () => {
    expect(isContactTopic("ai-assistant")).toBe(true);
  });

  it("describes the service in one JSON-LD node, with no offer list", () => {
    const service = aiAssistantGraph();
    expect(service["@type"]).toBe("Service");
    expect(service.url).toBe("https://birchlabs.ca/ai-assistant");
    expect(service.provider).toEqual({ "@id": "https://birchlabs.ca/#business" });
    expect(service).not.toHaveProperty("hasOfferCatalog");
  });

  it("labels every fit factor exactly once", () => {
    expect(aiAssistant.fitFactors.map((f) => f.id)).toEqual([...FIT_FACTORS]);
  });
});

describe("fit score", () => {
  it("totals six 1-5 scores out of 30", () => {
    expect(FIT_MAX).toBe(30);
    expect(fitTotal(all(1))).toBe(6);
    expect(fitTotal(all(5))).toBe(30);
    expect(fitTotal({ ...all(4), mistakes: 2 })).toBe(22);
  });

  it("rejects scores outside 1-5 or not whole", () => {
    for (const bad of [0, 6, 2.5, Number.NaN]) {
      expect(() => fitTotal({ ...all(3), clarity: bad })).toThrow(RangeError);
    }
  });

  it("bands at 24 and 18", () => {
    expect(fitBand(30)).toBe("start");
    expect(fitBand(24)).toBe("start");
    expect(fitBand(23)).toBe("next");
    expect(fitBand(18)).toBe("next");
    expect(fitBand(17)).toBe("later");
    expect(fitBand(6)).toBe("later");
  });

  it("ranks the best fit first and keeps ties in the order added", () => {
    const ranked = rankTasks([
      { name: "a", scores: all(2) },
      { name: "b", scores: all(4) },
      { name: "c", scores: all(2) },
      { name: "d", scores: all(5) },
    ]);
    expect(ranked.map((t) => [t.name, t.total, t.band])).toEqual([
      ["d", 30, "start"],
      ["b", 24, "start"],
      ["a", 12, "later"],
      ["c", 12, "later"],
    ]);
  });

  it("does not reorder the list it was given", () => {
    const tasks = [{ scores: all(1) }, { scores: all(5) }];
    rankTasks(tasks);
    expect(tasks[0].scores).toEqual(all(1));
  });
});
