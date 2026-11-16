import type { CSSProperties } from "react";
import Link from "next/link";

import { LogoMark } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/cn";

/** The footer sits on --color-footer-bg, so the whole mark takes the footer's text colour. */
const ON_FOOTER = {
  "--logo-a": "var(--color-footer-fg)",
  "--logo-b": "var(--color-footer-fg)",
} as CSSProperties;

/**
 * The mark in the active theme's logo colours (--logo-a/--logo-b, set per theme), or in the
 * footer's text colour via `onDark` for the footer.
 */
export function Logo({
  businessName,
  onDark = false,
  className,
}: {
  businessName: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
      style={onDark ? ON_FOOTER : undefined}
    >
      <LogoMark label={businessName} className="h-10 w-auto sm:h-12" />
    </Link>
  );
}
