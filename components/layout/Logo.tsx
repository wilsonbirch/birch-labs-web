import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

const MARK = { src: "/images/birchlabs-mark.svg", width: 678, height: 577 };
const MARK_WHITE = { ...MARK, src: "/images/birchlabs-mark-white.svg" };

/**
 * The bundled mark: two-tone on light backgrounds, all-white in dark mode (the
 * royal half vanishes on Ink) — or always white via `onDark` for
 * brand-coloured backgrounds like the footer.
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
  const imgClass = "h-10 w-auto sm:h-12";

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
    >
      {onDark ? (
        <Image {...MARK_WHITE} alt={businessName} className={imgClass} priority />
      ) : (
        <>
          <Image {...MARK} alt={businessName} className={cn(imgClass, "dark:hidden")} priority />
          <Image {...MARK_WHITE} alt="" className={cn(imgClass, "hidden dark:block")} priority />
        </>
      )}
    </Link>
  );
}
