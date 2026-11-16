import { about } from "@/content/about";
import { ownYourSoftware } from "@/content/own-your-software";
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

const areaServed = [
  { "@type": "Country", name: "Canada" },
  { "@type": "Country", name: "United States" },
];

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
        knowsAbout: site.knowsAbout,
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
        areaServed,
        founder: { "@id": ids.person },
        sameAs,
        knowsAbout: site.knowsAbout,
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

/** /own-your-software: the service itself, in one line. No prices, on purpose. */
export function ownYourSoftwareGraph() {
  const url = absoluteUrl("/own-your-software");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: ownYourSoftware.seo.title,
    serviceType: "Custom software development and maintenance",
    description: ownYourSoftware.seo.description,
    url,
    provider: { "@id": ids.business },
    areaServed,
  };
}
