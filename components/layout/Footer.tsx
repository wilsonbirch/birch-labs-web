import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/layout/SocialIcons";
import { site } from "@/content/site";

const SOCIAL_LINKS = [
  { key: "github", label: "GitHub", Icon: GitHubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "twitter", label: "X / Twitter", Icon: TwitterIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
] as const;

export function Footer() {
  const socials = SOCIAL_LINKS.flatMap(({ key, label, Icon }) => {
    const href = site.social[key];
    return href ? [{ key, label, href, Icon }] : [];
  });

  return (
    <footer className="border-t border-[color:var(--color-footer-rule)] dark:border-t-2 bg-[color:var(--color-footer-bg)] text-[color:var(--color-footer-fg)]">
      <Container width="wide" as="div" className="flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="lg:max-w-md">
          <Logo businessName={site.businessName} onDark />
          {site.tagline && (
            <p className="mt-4 font-display text-lg leading-snug text-[color:var(--color-footer-fg)]">
              {site.tagline}
            </p>
          )}
          {site.footerText && (
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-footer-fg-muted)]">
              {site.footerText}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-footer-fg-muted)]">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {site.email && (
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100"
                >
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <a
                  href={`tel:${site.phone}`}
                  className="text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100"
                >
                  {site.phone}
                </a>
              </li>
            )}
            {site.address && (
              <li className="flex items-center gap-3 text-[color:var(--color-footer-fg)] opacity-80">
                <MapPin aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <span>{site.address}</span>
              </li>
            )}
          </ul>

          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-footer-fg-muted)]/40 text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100 hover:border-[color:var(--color-footer-fg)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-[color:var(--color-footer-fg-muted)]/20">
        <Container
          width="wide"
          as="div"
          className="flex flex-col gap-2 py-6 text-xs text-[color:var(--color-footer-fg-muted)] sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} {site.businessName}. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
