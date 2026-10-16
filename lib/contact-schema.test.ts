import { describe, expect, it } from "vitest";

import { contact } from "@/content/contact";
import { contactSchema, isContactTopic, MESSAGE_MAX, MESSAGE_MIN, topicLabel } from "@/lib/contact-schema";

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

  it("defaults the topic to the first one and rejects unknown topics", () => {
    expect(contactSchema.parse(valid).topic).toBe(contact.topics[0].value);
    expect(contactSchema.parse({ ...valid, topic: "own-your-software" }).topic).toBe("own-your-software");
    expect(contactSchema.safeParse({ ...valid, topic: "free-money" }).success).toBe(false);
  });
});

describe("isContactTopic", () => {
  it("accepts only configured topics", () => {
    for (const t of contact.topics) expect(isContactTopic(t.value)).toBe(true);
    for (const bad of [undefined, "", "OWN-YOUR-SOFTWARE", ["own-your-software"], 1]) {
      expect(isContactTopic(bad)).toBe(false);
    }
  });

  it("labels every topic", () => {
    for (const t of contact.topics) expect(topicLabel(t.value)).toBe(t.label);
  });
});
