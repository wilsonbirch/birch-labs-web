import { cn } from "@/lib/cn";

type Tone = "default" | "accent" | "outline";

const toneStyles: Record<Tone, string> = {
  default:
    "bg-[color:var(--color-surface)] text-[color:var(--color-ink-muted)] border border-[color:var(--color-rule)]",
  accent:
    "bg-[color:var(--color-accent)] text-[color:var(--color-accent-ink)] border border-[color:var(--color-accent)]",
  outline:
    "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-rule)]",
};

export function Chip({
  tone = "default",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
