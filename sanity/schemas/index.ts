import type { SchemaTypeDefinition } from "sanity";

import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";

import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { siteSettings } from "./singletons/siteSettings";

export const SINGLETON_TYPES = ["siteSettings", "homePage", "contactPage"] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  seo,
  siteSettings,
  homePage,
  contactPage,
];
