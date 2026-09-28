import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export function Logo({
  businessName,
  className,
}: {
  businessName: string;
  className?: string;
}) {

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
    >
      <Image
        src="/images/logo.svg"
        alt={businessName}
        width={64}
        height={64}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
