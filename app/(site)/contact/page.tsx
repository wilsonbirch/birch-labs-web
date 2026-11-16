import { ContactPanel } from "@/components/sections/ContactPanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/contact";
import { isContactTopic } from "@/lib/contact-schema";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(contact.seo, "/contact");

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // Links like /contact?topic=own-your-software preselect the form's topic.
  const { topic } = await searchParams;
  const initialTopic = isContactTopic(topic) ? topic : undefined;

  return (
    <Section spacing="lg">
      <Container width="narrow">
        <ContactPanel headingAs="h1" initialTopic={initialTopic} />
      </Container>
    </Section>
  );
}
