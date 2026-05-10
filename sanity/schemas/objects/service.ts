import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bullets",
      title: "Bullet points",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "icon",
      title: "Lucide icon name",
      type: "string",
      description:
        "Optional. A lucide-react icon name (e.g. 'code', 'sparkles', 'layout'). Leave blank to render without an icon.",
    }),
  ],
  preview: {
    select: { title: "title", description: "description" },
    prepare: ({ title, description }) => ({
      title: title ?? "Service",
      subtitle: description ?? undefined,
    }),
  },
});

export const serviceTier = defineType({
  name: "serviceTier",
  title: "Service tier",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      description: "Tier header (e.g. 'Applied Engineering' or 'Marketing Sites').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      description: "One-line description shown under the label.",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "service" }],
      validation: (Rule) => Rule.min(1).max(8),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "tagline" },
  },
});
