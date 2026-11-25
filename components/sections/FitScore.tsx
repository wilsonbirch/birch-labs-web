"use client";

import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Field, INPUT_CLASS } from "@/components/ui/Field";
import { aiAssistant as page } from "@/content/ai-assistant";
import { FIT_FACTORS, FIT_MAX, fitBand, fitTotal, rankTasks, type FitBand, type FitScores } from "@/lib/fit-score";

const BAND_TONE: Record<FitBand, "accent" | "outline" | "default"> = {
  start: "accent",
  next: "outline",
  later: "default",
};

const DEFAULT_SCORES = Object.fromEntries(FIT_FACTORS.map((f) => [f, 3])) as FitScores;

type Task = { id: number; name: string; scores: FitScores };

const jobCount = (n: number) => `${n} job${n === 1 ? "" : "s"} in the list.`;

/** The Fit Score self-check. State lives in this component only: nothing is stored or sent. */
export function FitScore({ contactHref }: { contactHref: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [scores, setScores] = useState<FitScores>(DEFAULT_SCORES);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const nextId = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const listHeadingRef = useRef<HTMLHeadingElement>(null);
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
    // The count changes on every add, so adding the same job twice is still announced.
    setStatus(`Added ${trimmed}: ${total} out of ${FIT_MAX}, ${page.fitBands[fitBand(total)]}. ${jobCount(tasks.length + 1)}`);
    setName("");
    setScores(DEFAULT_SCORES);
    nameRef.current?.focus();
  }

  function removeTask(task: Task) {
    setTasks((current) => current.filter((t) => t.id !== task.id));
    setStatus(`Removed ${task.name}. ${jobCount(tasks.length - 1)}`);
    // The removed button takes focus with it; keep the reader at the list, not back up at the form.
    listHeadingRef.current?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <form noValidate onSubmit={addTask} className="space-y-5 lg:col-span-7">
        <Field label={page.fitNameLabel} error={error}>
          {(control) => (
            <input
              {...control}
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder={page.fitNamePlaceholder}
              maxLength={80}
              autoComplete="off"
              className={INPUT_CLASS}
            />
          )}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.fitFactors.map((factor) => (
            <Field key={factor.id} label={factor.label}>
              {(control) => (
                <select
                  {...control}
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
              )}
            </Field>
          ))}
        </div>

        <Button type="submit" size="lg">
          {page.fitAddButtonText}
        </Button>
        <p role="status" className="min-h-[1.5em] text-sm text-[color:var(--color-ink)]">
          {status}
        </p>
      </form>

      <div className="lg:col-span-5">
        <h3 ref={listHeadingRef} tabIndex={-1} className="font-display text-2xl">
          {page.fitListHeading}
        </h3>
        {ranked.length === 0 ? (
          <p className="mt-4 text-[color:var(--color-ink-muted)]">{page.fitEmpty}</p>
        ) : (
          <ol className="mt-4 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            {ranked.map((task) => (
              <li key={task.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
                <span className="basis-full break-words font-medium">{task.name}</span>
                <span className="font-mono text-sm">
                  {task.total} / {FIT_MAX}
                </span>
                <Chip tone={BAND_TONE[task.band]}>{page.fitBands[task.band]}</Chip>
                <button
                  type="button"
                  onClick={() => removeTask(task)}
                  aria-label={`Remove ${task.name}`}
                  className="ml-auto rounded-full px-2 py-2 text-sm text-[color:var(--color-ink-muted)] underline underline-offset-4 hover:text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand)]"
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">{page.fitKey}</p>
        <div className="mt-6">
          <Button href={contactHref} variant="secondary">
            {page.fitCtaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
