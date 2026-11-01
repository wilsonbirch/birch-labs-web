"use client";

import { Check, Palette, Shuffle } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import {
  ALL_THEMES,
  DEFAULT_THEME_ID,
  EMPTY_ROTATION,
  STORAGE_KEY,
  THEME_EVENT,
  THEME_IDS,
  VISIT_KEY,
  findTheme,
  pickTheme,
  type RotationState,
} from "@/lib/themes";

// ---------- external store: <html data-theme> + the rotation state in localStorage ----------

function readRotation(): RotationState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.seen)) {
      return {
        pinned: typeof parsed.pinned === "string" ? parsed.pinned : null,
        seen: parsed.seen.filter((s: unknown): s is string => typeof s === "string"),
        last: typeof parsed.last === "string" ? parsed.last : null,
      };
    }
  } catch {
    // storage disabled or corrupt: behave as a fresh visitor
  }
  return EMPTY_ROTATION;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

const currentId = () => document.documentElement.dataset.theme ?? DEFAULT_THEME_ID;
const pinnedId = () => readRotation().pinned ?? "";
const seenCount = () => readRotation().seen.length;

function applyTheme(id: string, rotation: RotationState) {
  const theme = findTheme(id);
  if (!theme) return;
  const root = document.documentElement;
  root.dataset.theme = id;
  root.classList.toggle("dark", theme.mode === "dark");
  try {
    window.sessionStorage.setItem(VISIT_KEY, id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rotation));
  } catch {
    // storage unavailable: the theme still applies for this page view
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

// ---------- component ----------

export function ThemePicker({ className }: { className?: string }) {
  const current = useSyncExternalStore(subscribe, currentId, () => DEFAULT_THEME_ID);
  const pinned = useSyncExternalStore(subscribe, pinnedId, () => "");
  const seen = useSyncExternalStore(subscribe, seenCount, () => 0);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  // Escape and outside-click close; focus the active option on open.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) close(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  /** Pin a theme: it stays until the visitor turns rotation back on. */
  function choose(id: string) {
    const r = readRotation();
    applyTheme(id, { ...r, pinned: id, last: id });
  }

  /** Jump to the next theme in the rotation now, and keep rotating on future visits. */
  function shuffle() {
    const r = readRotation();
    const next = pickTheme({ ...r, pinned: null, last: current }, THEME_IDS, Math.random());
    applyTheme(next.id, next.state);
  }

  /** Turn rotation back on without changing this visit's theme. */
  function unpin() {
    const r = readRotation();
    applyTheme(current, { ...r, pinned: null });
  }

  const rotating = pinned === "";
  const label = `Theme: ${findTheme(current)?.label ?? "Birch Labs"}. Change theme`;

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls={panelId}
        suppressHydrationWarning
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40"
      >
        <Palette aria-hidden className="h-5 w-5" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Choose a theme"
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-bg)] shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[color:var(--color-rule)] px-3 py-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[color:var(--color-ink)]">
              <input
                type="checkbox"
                checked={rotating}
                onChange={(e) => (e.target.checked ? unpin() : choose(current))}
                className="accent-[color:var(--color-brand)]"
              />
              New theme every visit
            </label>
            <button
              type="button"
              onClick={shuffle}
              aria-label="Shuffle to the next theme"
              title="Shuffle to the next theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40"
            >
              <Shuffle aria-hidden className="h-4 w-4" />
            </button>
          </div>

          <div role="radiogroup" aria-label="Themes" className="max-h-[60vh] overflow-y-auto py-1">
            {ALL_THEMES.map((t) => {
              const active = t.id === current;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(t.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40 focus-visible:bg-[color:var(--color-rule)]/40 focus-visible:outline-none",
                    active && "font-semibold",
                  )}
                >
                  <span aria-hidden className="flex shrink-0 overflow-hidden rounded-full ring-1 ring-[color:var(--color-rule)]">
                    {t.swatch.map((c, i) => (
                      <span key={i} className="block h-4 w-3" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                  <span className="flex-auto">{t.label}</span>
                  {active && <Check aria-hidden className="h-4 w-4 text-[color:var(--color-brand)]" />}
                </button>
              );
            })}
          </div>

          <p className="border-t border-[color:var(--color-rule)] px-3 py-2 font-mono text-xs text-[color:var(--color-ink-muted)]">
            {rotating
              ? `${seen} of ${ALL_THEMES.length} themes seen this cycle`
              : "Pinned. Tick the box to rotate again"}
          </p>
        </div>
      )}
    </div>
  );
}
