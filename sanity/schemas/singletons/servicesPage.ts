import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "tiers", title: "Tiers" },
    { name: "stack", title: "Stack" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
      description: "Short mono-style label above the title (e.g. '// services').",
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
      name: "tiers",
      title: "Service tiers",
      type: "array",
      of: [{ type: "serviceTier" }],
      group: "tiers",
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "stackEyebrow",
      title: "Stack eyebrow",
      type: "string",
      group: "stack",
      description: "Short mono-style label above the marquee (e.g. \"// stack\").",
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "stack",
      description: "Technologies to scroll through the marquee. Order is preserved.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Services Page" }),
  },
});
