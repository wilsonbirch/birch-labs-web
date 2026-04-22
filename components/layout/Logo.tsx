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
  const imageProps = logo ? sanityImageProps(logo, { height: 64 }) : null;

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
    >
      {imageProps ? (
        <Image
          src={imageProps.src}
          alt={imageProps.alt || businessName}
          width={imageProps.width ?? 160}
          height={imageProps.height ?? 32}
          className="h-8 w-auto sm:h-9"
          priority
        />
      ) : (
        <Wordmark businessName={businessName} />
      )}
    </Link>
  );
}

function Wordmark({ businessName }: { businessName: string }) {
  const handle = businessName.toLowerCase().replace(/\s+/g, "_");

  return (
    <span className="inline-flex items-baseline gap-1 font-mono text-sm tracking-tight text-[color:var(--color-ink)] sm:text-base">
      <span className="text-[color:var(--color-accent)]" aria-hidden>
        &gt;
      </span>
      <span>{handle}</span>
      <span
        aria-hidden
        className="inline-block h-3 w-[0.55ch] translate-y-[1px] animate-blink bg-[color:var(--color-accent)] sm:h-4 group-hover:bg-[color:var(--color-ink)]"
      />
    </span>
  );
}
