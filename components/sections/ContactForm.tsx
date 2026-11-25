"use client";

import { useState } from "react";

import { Field, INPUT_CLASS } from "@/components/ui/Field";
import { contact } from "@/content/contact";
import {
  contactSchema,
  DEFAULT_TOPIC,
  isContactTopic,
  MESSAGE_MAX,
  MESSAGE_MIN,
  type ContactInput,
  type ContactResult,
  type ContactTopic,
} from "@/lib/contact-schema";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

function initialValues(topic: ContactTopic = DEFAULT_TOPIC): ContactInput {
  return { name: "", email: "", message: "", topic, website: "" };
}

export function ContactForm({
  successMessage,
  initialTopic,
  showTopic = true,
  messageRows = 6,
}: {
  successMessage?: string | null;
  initialTopic?: ContactTopic;
  /** Off on the home page's compact face, which must fit one short-phone screen; it sends the default topic. */
  showTopic?: boolean;
  messageRows?: number;
} = {}) {
  const [values, setValues] = useState<ContactInput>(() => initialValues(initialTopic));
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
      setValues(initialValues(initialTopic));
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
        {(control) => (
          <input
            {...control}
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            className={INPUT_CLASS}
          />
        )}
      </Field>
      <Field label="Email" error={errors.email}>
        {(control) => (
          <input
            {...control}
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            className={INPUT_CLASS}
          />
        )}
      </Field>
      {showTopic && (
        <Field label={contact.topicLabel} error={errors.topic}>
          {(control) => (
            <select
              {...control}
              value={values.topic}
              onChange={(e) => {
                if (isContactTopic(e.target.value)) update("topic", e.target.value);
              }}
              className={INPUT_CLASS}
            >
              {contact.topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          )}
        </Field>
      )}
      <Field label="Message" error={errors.message}>
        {(control) => (
          <>
            <textarea
              {...control}
              rows={messageRows}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              maxLength={MESSAGE_MAX}
              className={`${INPUT_CLASS} resize-y`}
              aria-describedby={[control["aria-describedby"], "message-hint"].filter(Boolean).join(" ")}
            />
            <span id="message-hint" className="mt-1 block text-xs text-[color:var(--color-ink-muted)]">
              <MessageCount length={values.message.trim().length} />
            </span>
          </>
        )}
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
        <p className="text-sm text-[color:var(--color-ink)]" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-7 text-sm font-medium text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-brand-soft)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

/** "-5" while under the minimum (counting up toward it), then the plain character count. */
function MessageCount({ length }: { length: number }) {
  const remaining = MESSAGE_MIN - length;
  if (remaining > 0) {
    return (
      <>
        <span aria-hidden>-{remaining}</span>
        <span className="sr-only">
          {remaining} more character{remaining === 1 ? "" : "s"} needed
        </span>
      </>
    );
  }
  return <>{length}</>;
}
