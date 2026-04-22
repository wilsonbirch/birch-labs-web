import { siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";

import type { SanityImage } from "@/lib/sanity-image";

export const SITE_DEFAULTS = {
  businessName: "Birch Labs",
  tagline: "",
  availability: "",
  phone: "",
  email: "",
  address: "",
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
  },
  footerText: "",
  defaultSeo: {
    title: "",
    description: "",
    ogImage: null as SanityImage | null,
  },
} as const;

export type SiteSettings = {
  businessName?: string | null;
  tagline?: string | null;
  availability?: string | null;
  logo?: SanityImage | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    github?: string | null;
  } | null;
  footerText?: string | null;
  defaultSeo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: SanityImage | null;
  } | null;
};

function withDefaults(settings: SiteSettings | null | undefined) {
  return {
    businessName: settings?.businessName || SITE_DEFAULTS.businessName,
    tagline: settings?.tagline || SITE_DEFAULTS.tagline,
    availability: settings?.availability || SITE_DEFAULTS.availability,
    logo: settings?.logo ?? null,
    phone: settings?.phone || SITE_DEFAULTS.phone,
    email: settings?.email || SITE_DEFAULTS.email,
    address: settings?.address || SITE_DEFAULTS.address,
    social: {
      facebook: settings?.social?.facebook || SITE_DEFAULTS.social.facebook,
      instagram: settings?.social?.instagram || SITE_DEFAULTS.social.instagram,
      twitter: settings?.social?.twitter || SITE_DEFAULTS.social.twitter,
      linkedin: settings?.social?.linkedin || SITE_DEFAULTS.social.linkedin,
      github: settings?.social?.github || SITE_DEFAULTS.social.github,
    },
    footerText: settings?.footerText || SITE_DEFAULTS.footerText,
    defaultSeo: {
      title: settings?.defaultSeo?.title || SITE_DEFAULTS.defaultSeo.title,
      description: settings?.defaultSeo?.description || SITE_DEFAULTS.defaultSeo.description,
      ogImage: settings?.defaultSeo?.ogImage ?? SITE_DEFAULTS.defaultSeo.ogImage,
    },
  };
}

export type ResolvedSiteSettings = ReturnType<typeof withDefaults>;

/**
 * Fetch the singleton Site Settings doc, layering defaults so consumers
 * always see a complete object. Falls back silently on a Sanity outage
 * so the shell still renders.
 */
export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  try {
    const data = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
    return withDefaults(data);
  } catch (error) {
    console.warn("[site] Failed to fetch siteSettings, using defaults:", error);
    return withDefaults(null);
  }
}
