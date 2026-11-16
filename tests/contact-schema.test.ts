import { describe, expect, it } from "vitest";

import { contactSchema, MESSAGE_MAX, MESSAGE_MIN } from "@/lib/contact-schema";

const valid = { name: "Ada", email: "ada@example.com", message: "We want to own our tools." };

describe("contactSchema", () => {
  it("accepts a valid message and normalizes the email", () => {
    const parsed = contactSchema.parse({ ...valid, email: "  Ada@Example.com " });
    expect(parsed.email).toBe("ada@example.com");
  });

  it("rejects a blank name, a bad email, and a message outside the limits", () => {
    expect(contactSchema.safeParse({ ...valid, name: "   " }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(MESSAGE_MIN - 1) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(MESSAGE_MAX + 1) }).success).toBe(false);
  });
});
