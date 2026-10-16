import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { home } from "@/content/home";
import { ownYourSoftware } from "@/content/own-your-software";
import { services } from "@/content/services";
import { work } from "@/content/work";

export type SitePage = {
  path: string;
  /** Link text in llms.txt. */
  name: string;
  description: string;
  /** Header nav label; pages without one stay out of the nav. */
  navLabel?: string;
};

/**
 * Every public page, in nav order. The nav, the sitemap and llms.txt all read
 * this list, so a new page is added here once.
 */
export const pages: ReadonlyArray<SitePage> = [
  { path: "/", name: "Home", description: home.seo.description },
  { path: "/work", name: "Work", navLabel: "Work", description: work.seo.description },
  { path: "/services", name: "Services", navLabel: "Services", description: services.seo.description },
  {
    path: "/own-your-software",
    name: "Own your software",
    navLabel: "Build vs buy",
    description: ownYourSoftware.seo.description,
  },
  { path: "/about", name: "About", navLabel: "About", description: about.seo.description },
  { path: "/contact", name: "Contact", description: contact.seo.description },
];
