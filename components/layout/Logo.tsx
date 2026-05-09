import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

export function Logo({
  businessName,
  logo,
  className,
}: {
  businessName: string;
  logo?: SanityImage | null;
  className?: string;
}) {
  const sanityProps = logo ? sanityImageProps(logo, { height: 64 }) : null;

  const src = sanityProps?.src ?? "/images/logo.svg";
  const alt = sanityProps?.alt || businessName;
  const width = sanityProps?.width ?? 64;
  const height = sanityProps?.height ?? 64;

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
