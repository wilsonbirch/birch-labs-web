"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

type NavLink = { label: string; href: string };

export function DesktopNav({ links }: { links: ReadonlyArray<NavLink> }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href.startsWith("/") && !link.href.includes("#") && link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative font-mono text-xs uppercase tracking-[0.2em] transition",
              active
                ? "text-[color:var(--color-ink)]"
                : "text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]",
            )}
          >
            {link.label}
            {active && (
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 right-0 mx-auto h-px w-6 bg-[color:var(--color-accent)]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
