"use client";

import { useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { aiAssistant as page } from "@/content/ai-assistant";
import { FIT_FACTORS, FIT_MAX, fitBand, fitTotal, rankTasks, type FitBand, type FitScores } from "@/lib/fit-score";

const INPUT_CLASS =
  "block w-full rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] px-[0.9rem] py-[0.65rem] text-base leading-[1.4] text-[color:var(--color-ink)] focus:outline-2 focus:outline-offset-2 focus:outline-[color:var(--color-brand)]";

const BAND_TONE: Record<FitBand, "accent" | "outline" | "default"> = {
  start: "accent",
  next: "outline",
  later: "default",
};

const DEFAULT_SCORES = Object.fromEntries(FIT_FACTORS.map((f) => [f, 3])) as FitScores;

type Task = { id: number; name: string; scores: FitScores };

/** The Fit Score self-check. State lives in this component only: nothing is stored or sent. */
export function FitScore({ contactHref }: { contactHref: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [scores, setScores] = useState<FitScores>(DEFAULT_SCORES);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const nextId = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const formId = useId();
  const ranked = rankTasks(tasks);

  function addTask(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(page.fitNameError);
      nameRef.current?.focus();
      return;
    }
    const total = fitTotal(scores);
    setTasks((current) => [...current, { id: nextId.current++, name: trimmed, scores }]);
    setStatus(`Added ${trimmed}: ${total} out of ${FIT_MAX}, ${page.fitBands[fitBand(total)]}.`);
    setName("");
    setScores(DEFAULT_SCORES);
    setError(null);
    nameRef.current?.focus();
  }

  function removeTask(task: Task) {
    setTasks((current) => current.filter((t) => t.id !== task.id));
    setStatus(`Removed ${task.name}.`);
    nameRef.current?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <form noValidate onSubmit={addTask} className="space-y-5 lg:col-span-7">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[color:var(--color-ink)]">{page.fitNameLabel}</span>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={page.fitNamePlaceholder}
            maxLength={80}
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${formId}-error` : undefined}
            className={INPUT_CLASS}
          />
          {error && (
            <span id={`${formId}-error`} className="mt-1 block text-sm text-red-600">
              {error}
            </span>
          )}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.fitFactors.map((factor) => (
            <label key={factor.id} className="block">
              <span className="mb-1 block text-sm font-medium text-[color:var(--color-ink)]">{factor.label}</span>
              <select
                value={scores[factor.id]}
                onChange={(e) => setScores((s) => ({ ...s, [factor.id]: Number(e.target.value) }))}
                className={INPUT_CLASS}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? `1 · ${factor.low}` : n === 5 ? `5 · ${factor.high}` : n}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <Button type="submit" size="lg">
          {page.fitAddButtonText}
        </Button>
      </form>

      <div className="lg:col-span-5">
        <h3 className="font-display text-2xl">{page.fitListHeading}</h3>
        <p role="status" className="sr-only">
          {status}
        </p>
        {ranked.length === 0 ? (
          <p className="mt-4 text-[color:var(--color-ink-muted)]">{page.fitEmpty}</p>
        ) : (
          <ol className="mt-4 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            {ranked.map((task) => (
              <li key={task.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
                <span className="min-w-0 flex-1 break-words font-medium">{task.name}</span>
                <span className="font-mono text-sm">
                  {task.total} / {FIT_MAX}
                </span>
                <Chip tone={BAND_TONE[task.band]}>{page.fitBands[task.band]}</Chip>
                <button
                  type="button"
                  onClick={() => removeTask(task)}
                  aria-label={`Remove ${task.name}`}
                  className="rounded-full px-2 text-sm text-[color:var(--color-ink-muted)] underline underline-offset-4 hover:text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand)]"
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
          {page.fitKey}
        </p>
        <div className="mt-6">
          <Button href={contactHref} variant="secondary">
            {page.fitCtaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
