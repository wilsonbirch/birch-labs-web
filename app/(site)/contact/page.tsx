import { ContactForm } from "@/components/sections/ContactForm";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { seoMetadata } from "@/lib/metadata";

export const metadata = seoMetadata(contact.seo, "/contact");

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow" className="space-y-10">
        <div>
          <Chip tone="outline" className="mb-8">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
            />
            {site.availability}
          </Chip>
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
