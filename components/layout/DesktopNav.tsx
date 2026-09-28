"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

type NavLink = { label: string; href: string };

const MotionLink = motion.create(Link);

// Underline draws left → right on hover/focus and stays drawn on the current page.
const underline = {
  rest: { scaleX: 0 },
  drawn: { scaleX: 1 },
};

export function DesktopNav({ links }: { links: ReadonlyArray<NavLink> }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href.startsWith("/") && !link.href.includes("#") && link.href !== "/" && pathname.startsWith(link.href));
        return (
          <MotionLink
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            initial={false}
            animate={active ? "drawn" : "rest"}
            whileHover="drawn"
            whileFocus="drawn"
            className={cn(
              "relative font-mono text-xs uppercase tracking-[0.2em] transition-colors",
              active
                ? "text-[color:var(--color-brand)]"
                : "text-[color:var(--color-ink)] hover:text-[color:var(--color-brand)] active:text-[color:var(--color-brand-soft)]",
            )}
          >
            {link.label}
            <motion.span
              aria-hidden
              variants={underline}
              transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-[0.2em] h-0.5 origin-left bg-[color:var(--color-brand)]"
            />
          </MotionLink>
        );
      })}
    </nav>
  );
}
