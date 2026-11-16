import { ContactForm } from "@/components/sections/ContactForm";
import { Chip } from "@/components/ui/Chip";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Availability chip, "Start a project" heading, intro and the contact form.
 * Used by /contact (h1, full size) and the home page's front face (h2, compact:
 * the face is pinned to one screen height, so it must fit short phones or the
 * Send button would sit unreachably below the fold while the card is pinned).
 */
export function ContactPanel({
  headingAs: Heading,
  compact = false,
}: {
  headingAs: "h1" | "h2";
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-6" : "space-y-10"}>
      <div>
        <Chip
          tone="outline"
          className={cn(
            "text-balance",
            compact ? "mb-5 [@media(max-height:700px)]:hidden" : "mb-8",
          )}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
          />
          {site.availability}
        </Chip>
        <Heading
          className={cn(
            "font-display leading-[1.0]",
            compact ? "text-4xl sm:text-5xl lg:text-6xl" : "text-5xl sm:text-6xl lg:text-7xl",
          )}
        >
          {contact.heading}
        </Heading>
        <p
          className={cn(
            "text-[color:var(--color-ink-muted)]",
            compact ? "mt-3 text-base sm:text-lg" : "mt-4 text-lg",
          )}
        >
          {contact.intro}
        </p>
      </div>
      <ContactForm successMessage={contact.successMessage} messageRows={compact ? 3 : 6} />
    </div>
  );
}
