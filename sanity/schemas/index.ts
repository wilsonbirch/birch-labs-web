import type { SchemaTypeDefinition } from "sanity";

import { project } from "./documents/project";
import { imageWithAlt } from "./objects/imageWithAlt";
import { seo } from "./objects/seo";
import { service, serviceTier } from "./objects/service";

import { aboutPage } from "./singletons/aboutPage";
import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { servicesPage } from "./singletons/servicesPage";
import { siteSettings } from "./singletons/siteSettings";
import { workPage } from "./singletons/workPage";

export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "workPage",
  "servicesPage",
  "aboutPage",
  "contactPage",
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  seo,
  service,
  serviceTier,
  siteSettings,
  homePage,
  servicesPage,
  workPage,
  aboutPage,
  contactPage,
  project,
];
