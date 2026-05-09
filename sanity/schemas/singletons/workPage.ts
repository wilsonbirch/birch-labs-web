import { defineField, defineType } from "sanity";

export const workPage = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "projects", title: "Projects" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
      description: "Short mono-style label above the title (e.g. '// work').",
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
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "projects",
      description: "Curated, ordered list of projects to show on the Work page.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Work Page" }),
  },
});
