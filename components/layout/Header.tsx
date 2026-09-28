import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, navLinks } from "@/lib/nav";
import { site } from "@/content/site";

import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[color:var(--color-rule)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70">
      <Container width="wide" as="div" className="flex h-16 items-center gap-6 lg:h-20">
        <Logo businessName={site.businessName} />

        <div className="ml-auto flex items-center gap-2 lg:gap-4">
          <DesktopNav links={navLinks} />

          {headerCta && (
            <Button
              href={headerCta.href}
              variant={headerCta.style ?? "primary"}
              size="sm"
              className="hidden lg:inline-flex"
            >
              {headerCta.label}
            </Button>
          )}
          <ThemeToggle />
          <MobileNav links={navLinks} cta={headerCta} />
        </div>
      </Container>
    </header>
  );
}
