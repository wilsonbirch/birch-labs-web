import { about } from "@/content/about";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";
import type { ProjectCard } from "@/lib/types";

/**
 * schema.org JSON-LD built from content/, so search engines and LLM tools read
 * the same facts as the page. Node ids let the graph cross-reference itself.
 */
const ids = {
  person: absoluteUrl("/#person"),
  business: absoluteUrl("/#business"),
  website: absoluteUrl("/#website"),
};

const address = {
  "@type": "PostalAddress",
  addressLocality: site.location.city,
  addressRegion: site.location.region,
  addressCountry: site.location.country,
};

const sameAs = Object.values(site.social).filter(Boolean);

/** Site-wide graph: the person, the business, and the website. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.owner.name,
        jobTitle: site.owner.jobTitle,
        description: about.seo.description,
        url: absoluteUrl("/about"),
        image: absoluteUrl(about.portrait.src.src),
        email: `mailto:${site.email}`,
        address,
        worksFor: { "@id": ids.business },
        knowsAbout: services.stack,
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.business,
        name: site.businessName,
        description: `${site.seo.description} ${site.workingModel}`,
        slogan: site.tagline,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/images/birchlabs-mark.svg"),
        image: absoluteUrl("/og-image.png"),
        email: site.email,
        address,
        areaServed: [
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United States" },
        ],
        founder: { "@id": ids.person },
        sameAs,
        knowsAbout: services.services.map((s) => s.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software development services",
          itemListElement: services.services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description ?? undefined,
              provider: { "@id": ids.business },
            },
          })),
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          url: absoluteUrl("/contact"),
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.businessName,
        url: absoluteUrl("/"),
        publisher: { "@id": ids.business },
      },
    ],
  };
}

/** The /work portfolio as an ItemList of creative works credited to the person. */
export function projectsGraph(projects: ProjectCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected work",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        dateCreated: String(p.year),
        url: p.links.live ?? p.links.github ?? absoluteUrl("/work"),
        image: absoluteUrl(p.heroImage.src.src),
        keywords: p.stack.join(", "),
        creator: { "@id": ids.person },
      },
    })),
  };
}
