/**
 * GROQ queries — one named export per page or use case.
 */

const imageProjection = `{
  ...,
  asset->{ _id, metadata { lqip, dimensions } }
}`;

const projectProjection = `{
  _id,
  title,
  "slug": slug.current,
  client,
  year,
  tier,
  summary,
  role,
  stack,
  heroImage${imageProjection},
  gallery[]${imageProjection},
  links,
  featured,
  order
}`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    businessName,
    tagline,
    availability,
    logo${imageProjection},
    phone,
    email,
    address,
    social,
    footerText,
    defaultSeo{ ..., ogImage${imageProjection} }
  }
`;

export const homePageQuery = /* groq */ `
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroSubtitle,
    heroImage${imageProjection},
    heroImageDark${imageProjection},
    heroPrimaryButtonText,
    heroSecondaryButtonText,
    availability,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonText,
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const workPageQuery = /* groq */ `
  *[_type == "workPage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    projects[]->${projectProjection},
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const servicesPageQuery = /* groq */ `
  *[_type == "servicesPage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    tiers[]{
      label,
      tagline,
      services[]{
        title,
        description,
        bullets,
        icon
      }
    },
    stackEyebrow,
    stack,
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_type == "aboutPage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    portrait${imageProjection},
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    },
    quickFacts[]{ label, value },
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const contactPageQuery = /* groq */ `
  *[_type == "contactPage"][0]{
    heading,
    intro,
    successMessage,
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const allProjectsQuery = /* groq */ `
  *[_type == "project"] | order(order asc, year desc)${projectProjection}
`;

export const projectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    ...${projectProjection.slice(1, -1)},
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    }
  }
`;
