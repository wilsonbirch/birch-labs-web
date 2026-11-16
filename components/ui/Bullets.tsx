/** A muted list with accent dots, as used on service cards and engagement steps. */
export function Bullets({ items }: { items?: readonly string[] | null }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="mt-4 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
      {items.map((bullet) => (
        <li key={bullet} className="flex gap-2">
          <span aria-hidden className="text-[color:var(--color-accent)]">
            ·
          </span>
          {bullet}
        </li>
      ))}
    </ul>
  );
}
