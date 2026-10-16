/**
 * Shared validation schema — imported by both the client form
 * (for inline error display) and the API route (for trusted
 * server-side validation).
 */

import { z } from "zod";

import { contact } from "@/content/contact";

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 4000;

const TOPIC_VALUES = contact.topics.map((t) => t.value) as [
  (typeof contact.topics)[number]["value"],
  ...(typeof contact.topics)[number]["value"][],
];

export type ContactTopic = (typeof TOPIC_VALUES)[number];

export const DEFAULT_TOPIC: ContactTopic = TOPIC_VALUES[0];

/** Narrows an untrusted value (a query param, a form field) to a known topic. */
export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (TOPIC_VALUES as readonly string[]).includes(value);
}

export function topicLabel(topic: ContactTopic): string {
  return contact.topics.find((t) => t.value === topic)?.label ?? topic;
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, "A short message helps us reply")
    .max(MESSAGE_MAX, `Keep it under ${MESSAGE_MAX} characters`),
  topic: z.enum(TOPIC_VALUES).default(DEFAULT_TOPIC),
  // Honeypot — real users leave this empty.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };
