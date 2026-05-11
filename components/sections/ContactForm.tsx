"use client";

import { useState } from "react";

import { contactSchema, type ContactInput, type ContactResult } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const INPUT_CLASS =
  "block w-full rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] px-[0.9rem] py-[0.65rem] text-base leading-[1.4] text-[color:var(--color-ink)] focus:outline-2 focus:outline-offset-2 focus:outline-[color:var(--color-accent)]";

const INITIAL: ContactInput = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm({ successMessage }: { successMessage?: string | null } = {}) {
  const [values, setValues] = useState<ContactInput>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const p = issue.path[0];
        if (typeof p === "string" && !fe[p as keyof ContactInput]) {
          fe[p as keyof ContactInput] = issue.message;
        }
      }
      setErrors(fe);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: ContactResult = await res.json();
      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        setStatus("error");
        return;
      }
      setValues(INITIAL);
      setStatus("success");
    } catch {
      setFormError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8 text-center">
        {successMessage && (
          <p className="font-display text-2xl text-[color:var(--color-ink)]">{successMessage}</p>
        )}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <Field label="Name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          autoComplete="name"
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${INPUT_CLASS} resize-y`}
          aria-describedby="message-hint"
        />
        <span
          id="message-hint"
          className="mt-1 block text-xs text-[color:var(--color-ink-muted)]"
        >
          {values.message.trim().length < 10
            ? `${10 - values.message.trim().length} more character${
                10 - values.message.trim().length === 1 ? "" : "s"
              } needed (minimum 10)`
            : `${values.message.trim().length} / 4000`}
        </span>
      </Field>

      {/* Honeypot — visually hidden, real users leave it blank */}
      <div aria-hidden className="sr-only">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website ?? ""}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      {formError && (
        <p className="text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-7 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-[color:var(--color-ink)]">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
