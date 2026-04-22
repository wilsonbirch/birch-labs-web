/**
 * GROQ queries — one named export per page or use case.
 */

const imageProjection = `{
  ...,
  asset->{ _id, metadata { lqip, dimensions } }
}`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    businessName,
    tagline,
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
    heroTitle,
    heroSubtitle,
    heroImage${imageProjection},
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    },
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
