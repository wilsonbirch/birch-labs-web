import { ContactPanel } from "@/components/sections/ContactPanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/contact";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(contact.seo, "/contact");

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow">
        <ContactPanel headingAs="h1" />
      </Container>
    </Section>
  );
}
