"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { CtaStyle } from "@/lib/nav";

type NavLink = { label: string; href: string };
type Cta = { label: string; href: string; style?: CtaStyle } | null;

export function MobileNav({
  links,
  cta,
}: {
  links: ReadonlyArray<NavLink>;
  cta: Cta;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-0 z-[100] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/70 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.25)] transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-[color:var(--color-rule)] bg-[color:var(--color-bg)] px-6 py-4">
            <span className="font-display text-lg">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-rule)]/40"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-auto flex-col gap-1 bg-[color:var(--color-bg)] px-4 py-6 text-lg">
            {links.map((link) => {
              const active =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "rounded-md px-4 py-3 font-display transition",
                    active
                      ? "bg-[color:var(--color-rule)]/60 text-[color:var(--color-brand)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-rule)]/40",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          {cta && (
            <div className="mt-auto border-t border-[color:var(--color-rule)] bg-[color:var(--color-bg)] px-6 py-6">
              <Button
                href={cta.href}
                variant={cta.style ?? "primary"}
                size="lg"
                onClick={close}
                className="w-full"
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
