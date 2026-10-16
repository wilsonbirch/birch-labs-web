import { about } from "@/content/about";
import { ownYourSoftware } from "@/content/own-your-software";
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
        areaServed,
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

/** /own-your-software: the service itself, and its FAQ. No prices, on purpose. */
export function ownYourSoftwareGraph() {
  const url = absoluteUrl("/own-your-software");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: ownYourSoftware.seo.title,
        serviceType: "Build vs buy software consulting",
        description: ownYourSoftware.seo.description,
        url,
        provider: { "@id": ids.business },
        areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engagement steps",
          itemListElement: ownYourSoftware.steps.map((step) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${step.title}: ${step.outcome}`,
              description: step.description,
              provider: { "@id": ids.business },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: ownYourSoftware.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
