import type { StructureResolver } from "sanity/structure";

import { SINGLETON_TYPES } from "./schemas";

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home",
  contactPage: "Contact",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...SINGLETON_TYPES.filter((t) => t !== "siteSettings").map((type) =>
        S.listItem()
          .title(SINGLETON_TITLES[type] ?? type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
    ]);
