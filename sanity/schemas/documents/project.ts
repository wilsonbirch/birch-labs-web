import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      type: "string",
      description: "Client or company name.",
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (Rule) => Rule.min(2015).max(2100),
    }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Applied Engineering", value: "applied-engineering" },
          { title: "Marketing Site", value: "marketing-site" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "1–3 sentences. Used on the home page card.",
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "Your role on the project (e.g. 'CTO & Lead Developer').",
    }),
    defineField({
      name: "stack",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "heroImage",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        { name: "live", title: "Live URL", type: "url" },
        { name: "github", title: "GitHub URL", type: "url" },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "imageWithAlt" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "heroImage", tier: "tier" },
    prepare: ({ title, subtitle, media, tier }) => ({
      title,
      subtitle: [tier, subtitle].filter(Boolean).join(" · "),
      media,
    }),
  },
});
