import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "body", title: "Body" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
      description: "Short mono-style label above the title (e.g. '// about').",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "imageWithAlt",
      group: "body",
      description: "Self portrait, ideally 4:6 (portrait) ratio.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "imageWithAlt" }],
      group: "body",
      description: "Long-form bio / about content.",
    }),
    defineField({
      name: "quickFacts",
      title: "Quick facts",
      type: "array",
      group: "body",
      description: "Short bio facts shown as a label/value list below the paragraph.",
      of: [
        {
          type: "object",
          name: "quickFact",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
