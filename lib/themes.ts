// Site themes: the two original Birch Labs palettes plus one per Omarchy desktop theme
// (generated into ./themes.generated.ts by scripts/generate-themes.mjs).
//
// How a theme is applied:
//   <html data-theme="tokyo-night" class="dark">  — set before first paint by THEME_BOOT_SCRIPT.
//   themeCss() emits `html[data-theme="…"] { --color-…: … }` blocks, injected in <head> by the
//   root layout, which override the base :root / .dark tokens in app/globals.css.
//   `html[data-theme]` (0,1,1) deliberately out-ranks `.dark` (0,1,0).
//
// Rotation: every new visit (a new browser tab/session) gets a different theme, cycling through
// all of them before any repeats. A theme picked in the ThemePicker is "pinned" and stops the
// rotation until the visitor chooses "New theme every visit" again.

import { OMARCHY_THEMES } from "./themes.generated";

export type ThemeMode = "light" | "dark";

export type SiteTheme = {
  id: string;
  label: string;
  mode: ThemeMode;
  /** [background, brand, accent] — for the picker's swatch dots. */
  swatch: readonly string[];
  /** CSS custom properties overriding app/globals.css. Empty = use the base :root/.dark tokens. */
  vars: Readonly<Record<string, string>>;
  /** Hero background image (public path) or null for none. */
  hero: string | null;
  /** Portrait (20:9) hero for narrow screens; falls back to `hero` when null. */
  heroPhone: string | null;
};

export const DEFAULT_THEME_ID = "birch-labs";

const BRAND_THEMES: readonly SiteTheme[] = [
  {
    id: DEFAULT_THEME_ID,
    label: "Birch Labs",
    mode: "dark",
    swatch: ["#0d131c", "#60a5fa", "#ffb81c"],
    vars: {},
    hero: null,
    heroPhone: null,
  },
  {
    id: "birch-labs-light",
    label: "Birch Labs Light",
    mode: "light",
    swatch: ["#ffffff", "#003087", "#ffb81c"],
    vars: {},
    hero: null,
    heroPhone: null,
  },
];

export const ALL_THEMES: readonly SiteTheme[] = [...BRAND_THEMES, ...OMARCHY_THEMES];

export const THEME_IDS: readonly string[] = ALL_THEMES.map((t) => t.id);

export function findTheme(id: string | null | undefined): SiteTheme | undefined {
  return ALL_THEMES.find((t) => t.id === id);
}

/** The `html[data-theme]` override blocks for every theme that changes a token or has a hero. */
export function themeCss(themes: readonly SiteTheme[] = ALL_THEMES): string {
  return themes
    .filter((t) => Object.keys(t.vars).length > 0 || t.hero)
    .map((t) => {
      const decls = Object.entries(t.vars).map(([k, v]) => `${k}:${v}`);
      decls.push(`--hero-image:${t.hero ? `url("${t.hero}")` : "none"}`);
      const phone = t.heroPhone ?? t.hero;
      decls.push(`--hero-image-phone:${phone ? `url("${phone}")` : "none"}`);
      return `html[data-theme="${t.id}"]{${decls.join(";")}}`;
    })
    .join("\n");
}

// ---------- rotation ----------

export const STORAGE_KEY = "bl-theme"; // localStorage: RotationState (JSON)
export const VISIT_KEY = "bl-theme-visit"; // sessionStorage: theme id for this visit
export const THEME_EVENT = "bl-themechange";

export type RotationState = {
  /** Theme chosen explicitly in the picker; null = rotate every visit. */
  pinned: string | null;
  /** Themes already shown in the current cycle. */
  seen: string[];
  /** The previous visit's theme, so a new cycle never starts with a repeat. */
  last: string | null;
};

export const EMPTY_ROTATION: RotationState = { pinned: null, seen: [], last: null };

/**
 * Pick this visit's theme. Pure, and SELF-CONTAINED ON PURPOSE: THEME_BOOT_SCRIPT inlines it into
 * <head> with Function.prototype.toString, so it must not reference anything outside its own
 * body (no imports, no module constants, no helpers).
 *
 * @param random a number in [0, 1), Math.random() in the browser.
 */
export function pickTheme(
  state: RotationState,
  ids: readonly string[],
  random: number,
): { id: string; state: RotationState } {
  if (state.pinned !== null && ids.indexOf(state.pinned) !== -1) {
    return { id: state.pinned, state };
  }
  let seen = state.seen.filter((s) => ids.indexOf(s) !== -1);
  let pool = ids.filter((s) => seen.indexOf(s) === -1);
  if (pool.length === 0) {
    // cycle complete: start over, but never open the new cycle with last visit's theme
    seen = [];
    pool = ids.filter((s) => s !== state.last);
    if (pool.length === 0) pool = ids.slice();
  }
  const r = random >= 0 && random < 1 ? random : 0;
  const id = pool[Math.floor(r * pool.length)];
  return { id, state: { pinned: null, seen: seen.concat([id]), last: id } };
}

/**
 * Runs in <head> before first paint. Self-contained for the same reason as pickTheme.
 * Any storage failure (private mode, disabled storage, corrupt JSON) falls back to the default.
 */
function bootTheme(
  ids: readonly string[],
  darkIds: readonly string[],
  fallback: string,
  keys: { store: string; visit: string },
  pick: typeof pickTheme,
) {
  const root = document.documentElement;
  let id = fallback;
  try {
    const visit = sessionStorage.getItem(keys.visit);
    if (visit !== null && ids.indexOf(visit) !== -1) {
      id = visit;
    } else {
      let state: RotationState = { pinned: null, seen: [], last: null };
      const raw = localStorage.getItem(keys.store);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.seen)) {
          state = {
            pinned: typeof parsed.pinned === "string" ? parsed.pinned : null,
            seen: parsed.seen.filter((s: unknown) => typeof s === "string"),
            last: typeof parsed.last === "string" ? parsed.last : null,
          };
        }
      }
      const result = pick(state, ids, Math.random());
      id = result.id;
      localStorage.setItem(keys.store, JSON.stringify(result.state));
      sessionStorage.setItem(keys.visit, id);
    }
  } catch {
    id = fallback;
  }
  root.setAttribute("data-theme", id);
  root.classList.toggle("dark", darkIds.indexOf(id) !== -1);
}

export const THEME_BOOT_SCRIPT = `(${bootTheme.toString()})(${JSON.stringify(THEME_IDS)},${JSON.stringify(
  ALL_THEMES.filter((t) => t.mode === "dark").map((t) => t.id),
)},${JSON.stringify(DEFAULT_THEME_ID)},${JSON.stringify({
  store: STORAGE_KEY,
  visit: VISIT_KEY,
})},${pickTheme.toString()});`;
