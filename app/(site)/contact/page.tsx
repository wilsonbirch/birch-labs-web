import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/contact";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(contact.seo);

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow" className="space-y-10">
        <div>
          <h1 className="font-display text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">
            {contact.heading}
          </h1>
          <p className="mt-4 text-lg text-[color:var(--color-ink-muted)]">{contact.intro}</p>
        </div>
        <ContactForm successMessage={contact.successMessage} />
      </Container>
    </Section>
  );
}
