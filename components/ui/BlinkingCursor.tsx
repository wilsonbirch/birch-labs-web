import { cn } from "@/lib/cn";

export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block w-[0.6ch] animate-blink bg-[color:var(--color-accent)] align-baseline",
        className,
      )}
    >
      &nbsp;
    </span>
  );
}
