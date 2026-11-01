import { describe, expect, it } from "vitest";

import {
  ALL_THEMES,
  DEFAULT_THEME_ID,
  EMPTY_ROTATION,
  STORAGE_KEY,
  THEME_BOOT_SCRIPT,
  THEME_IDS,
  VISIT_KEY,
  pickTheme,
  themeCss,
  type RotationState,
} from "@/lib/themes";

// ---------- WCAG contrast (independent of the generator's own maths) ----------
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

describe("theme catalogue", () => {
  it("has unique ids and starts with the default brand theme", () => {
    expect(new Set(THEME_IDS).size).toBe(THEME_IDS.length);
    expect(THEME_IDS[0]).toBe(DEFAULT_THEME_ID);
    expect(ALL_THEMES.length).toBeGreaterThanOrEqual(24); // 2 brand + 22 Omarchy
  });

  const generated = ALL_THEMES.filter((t) => Object.keys(t.vars).length > 0);

  it.each(generated.map((t) => [t.id, t] as const))("%s meets the site's contrast floor", (_id, t) => {
    const v = t.vars;
    const bg = v["--color-bg"];
    expect(contrast(v["--color-ink"], bg)).toBeGreaterThanOrEqual(7);
    expect(contrast(v["--color-ink-muted"], bg)).toBeGreaterThanOrEqual(4.5);
    // primary buttons: bg-coloured text on a brand fill; links: brand text on bg
    expect(contrast(v["--color-brand"], bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(v["--color-brand-soft"], bg)).toBeGreaterThanOrEqual(4.5);
    // accent is decorative or large text on bg; accent-ink is text on an accent fill
    expect(contrast(v["--color-accent"], bg)).toBeGreaterThanOrEqual(3);
    expect(contrast(v["--color-accent-ink"], v["--color-accent"])).toBeGreaterThanOrEqual(4.5);
    expect(contrast(v["--color-footer-fg"], v["--color-footer-bg"])).toBeGreaterThanOrEqual(7);
    expect(contrast(v["--color-footer-fg-muted"], v["--color-footer-bg"])).toBeGreaterThanOrEqual(4.5);
  });

  it("only uses plain #rrggbb colours (safe to inline in <style>)", () => {
    for (const t of generated) {
      for (const value of Object.values(t.vars)) expect(value).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("emits one CSS block per overriding theme, out-ranking .dark", () => {
    const css = themeCss();
    expect(css.split("\n")).toHaveLength(ALL_THEMES.filter((t) => Object.keys(t.vars).length || t.hero).length);
    expect(css).toContain('html[data-theme="tokyo-night"]{--color-bg:#1a1b26');
    expect(css).not.toContain('data-theme="birch-labs"]'); // brand themes use the base tokens
  });

  it("falls back to the desktop hero on phones when there is no portrait render", () => {
    const base = { id: "x", label: "X", mode: "dark" as const, swatch: [], vars: { "--color-bg": "#000000" } };
    const withPhone = themeCss([{ ...base, hero: "/themes/x.webp", heroPhone: "/themes/x-phone.webp" }]);
    expect(withPhone).toContain('--hero-image:url("/themes/x.webp")');
    expect(withPhone).toContain('--hero-image-phone:url("/themes/x-phone.webp")');
    const noPhone = themeCss([{ ...base, hero: "/themes/x.webp", heroPhone: null }]);
    expect(noPhone).toContain('--hero-image-phone:url("/themes/x.webp")');
    const none = themeCss([{ ...base, hero: null, heroPhone: null }]);
    expect(none).toContain("--hero-image:none;--hero-image-phone:none");
  });

  it("only references hero images that exist in public/", async () => {
    const { existsSync } = await import("node:fs");
    for (const t of ALL_THEMES) {
      for (const src of [t.hero, t.heroPhone]) {
        if (src) expect(existsSync(`public${src}`), src).toBe(true);
      }
    }
  });
});

describe("pickTheme", () => {
  const ids = ["a", "b", "c"];

  it("returns the pinned theme unchanged", () => {
    const state: RotationState = { pinned: "b", seen: ["a"], last: "a" };
    expect(pickTheme(state, ids, 0.9)).toEqual({ id: "b", state });
  });

  it("ignores a pinned theme that no longer exists", () => {
    const r = pickTheme({ pinned: "gone", seen: [], last: null }, ids, 0);
    expect(r.id).toBe("a");
    expect(r.state.pinned).toBeNull();
  });

  it("shows every theme once before repeating", () => {
    let state = EMPTY_ROTATION;
    const shown: string[] = [];
    for (let i = 0; i < ids.length; i++) {
      const r = pickTheme(state, ids, 0.999);
      shown.push(r.id);
      state = r.state;
    }
    expect([...shown].sort()).toEqual(ids);
  });

  it("never starts a new cycle with the previous visit's theme", () => {
    for (const random of [0, 0.34, 0.5, 0.67, 0.999]) {
      const r = pickTheme({ pinned: null, seen: ["a", "b", "c"], last: "c" }, ids, random);
      expect(r.id).not.toBe("c");
      expect(r.state.seen).toEqual([r.id]);
    }
  });

  it("drops seen ids that are no longer themes", () => {
    const r = pickTheme({ pinned: null, seen: ["a", "removed"], last: "a" }, ids, 0);
    expect(r.state.seen).toEqual(["a", "b"]);
  });

  it("tolerates out-of-range random values", () => {
    for (const random of [-1, 1, 7, Number.NaN]) {
      expect(ids).toContain(pickTheme(EMPTY_ROTATION, ids, random).id);
    }
  });

  it("works with a single theme", () => {
    expect(pickTheme({ pinned: null, seen: ["a"], last: "a" }, ["a"], 0.5).id).toBe("a");
  });
});

// ---------- the inlined <head> script, run against fake browser globals ----------
function fakeStorage(initial: Record<string, string> = {}, broken = false) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (k: string) => {
      if (broken) throw new Error("SecurityError");
      return data.get(k) ?? null;
    },
    setItem: (k: string, v: string) => {
      if (broken) throw new Error("QuotaExceededError");
      data.set(k, v);
    },
  };
}
function runBoot(local = fakeStorage(), session = fakeStorage()) {
  const attrs = new Map<string, string>();
  const classes = new Set<string>();
  const document = {
    documentElement: {
      setAttribute: (k: string, v: string) => attrs.set(k, v),
      classList: { toggle: (c: string, on: boolean) => (on ? classes.add(c) : classes.delete(c)) },
    },
  };
  new Function("document", "localStorage", "sessionStorage", THEME_BOOT_SCRIPT)(document, local, session);
  return { theme: attrs.get("data-theme"), dark: classes.has("dark"), local, session };
}

describe("THEME_BOOT_SCRIPT", () => {
  it("picks a theme for a first visit and records it", () => {
    const r = runBoot();
    expect(THEME_IDS).toContain(r.theme);
    expect(r.session.data.get(VISIT_KEY)).toBe(r.theme);
    expect(JSON.parse(r.local.data.get(STORAGE_KEY)!).seen).toEqual([r.theme]);
  });

  it("keeps the same theme for the rest of the visit", () => {
    const session = fakeStorage({ [VISIT_KEY]: "nord" });
    const r = runBoot(fakeStorage(), session);
    expect(r.theme).toBe("nord");
    expect(r.dark).toBe(true);
  });

  it("gives a new visit a different theme from the last one", () => {
    const local = fakeStorage();
    const first = runBoot(local, fakeStorage()).theme;
    const second = runBoot(local, fakeStorage()).theme;
    expect(second).not.toBe(first);
  });

  it("honours a pinned light theme and drops the dark class", () => {
    const local = fakeStorage({ [STORAGE_KEY]: JSON.stringify({ pinned: "rose-pine", seen: [], last: null }) });
    const r = runBoot(local);
    expect(r.theme).toBe("rose-pine");
    expect(r.dark).toBe(false);
  });

  it("falls back to the default theme when storage throws", () => {
    const r = runBoot(fakeStorage({}, true), fakeStorage({}, true));
    expect(r.theme).toBe(DEFAULT_THEME_ID);
    expect(r.dark).toBe(true);
  });

  it("recovers from corrupt stored state", () => {
    const r = runBoot(fakeStorage({ [STORAGE_KEY]: "{not json" }));
    expect(r.theme).toBe(DEFAULT_THEME_ID); // JSON.parse throws -> safe default
    const r2 = runBoot(fakeStorage({ [STORAGE_KEY]: JSON.stringify({ seen: "nope" }) }));
    expect(THEME_IDS).toContain(r2.theme); // wrong shape -> treated as a fresh visitor
  });

  it("ignores a stale visit id from a removed theme", () => {
    const r = runBoot(fakeStorage(), fakeStorage({ [VISIT_KEY]: "deleted-theme" }));
    expect(THEME_IDS).toContain(r.theme);
    expect(r.theme).not.toBe("deleted-theme");
  });
});
