import type { SchemaTypeDefinition } from "sanity";

import { project } from "./documents/project";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";
import { service, serviceTier } from "./objects/service";

import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { siteSettings } from "./singletons/siteSettings";

export const SINGLETON_TYPES = ["siteSettings", "homePage", "contactPage"] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  seo,
  service,
  serviceTier,
  siteSettings,
  homePage,
  contactPage,
  project,
];
