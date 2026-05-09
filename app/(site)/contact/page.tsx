import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { contactPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageUrl, type SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

type ContactPageData = {
  heading?: string | null;
  intro?: string | null;
  successMessage?: string | null;
  seo?: { title?: string | null; description?: string | null; ogImage?: SanityImage | null } | null;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<ContactPageData | null>({
    query: contactPageQuery,
    tags: ["contactPage"],
  });
  const title = data?.seo?.title ?? data?.heading ?? undefined;
  const description = data?.seo?.description ?? data?.intro ?? undefined;
  const ogImage = sanityImageUrl(data?.seo?.ogImage, { width: 1200, height: 630 });
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ContactPage() {
  const data = await sanityFetch<ContactPageData | null>({
    query: contactPageQuery,
    tags: ["contactPage"],
  });

  return (
    <Section spacing="lg">
      <Container width="narrow" className="space-y-10">
        <div>
          {data?.heading && <Heading level={1}>{data.heading}</Heading>}
          {data?.intro && (
            <p className="mt-4 text-lg text-[color:var(--color-ink-muted)]">{data.intro}</p>
          )}
        </div>
        <ContactForm successMessage={data?.successMessage} />
      </Container>
    </Section>
  );
}
