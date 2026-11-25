import { useId } from "react";

/** Text inputs, selects and textareas. An invalid control gets a red border; the error text stays in ink for contrast. */
export const INPUT_CLASS =
  "block w-full rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] px-[0.9rem] py-[0.65rem] text-base leading-[1.4] text-[color:var(--color-ink)] focus:outline-2 focus:outline-offset-2 focus:outline-[color:var(--color-brand)] aria-invalid:border-red-600";

export type FieldControlProps = { id: string; "aria-invalid"?: true; "aria-describedby"?: string };

/**
 * A labelled form control. Spread the props it passes onto the control. The error sits
 * outside the label and is linked by aria-describedby, so screen readers read it once.
 */
export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: (control: FieldControlProps) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-[color:var(--color-ink)]">
        {label}
      </label>
      {children(error ? { id, "aria-invalid": true, "aria-describedby": errorId } : { id })}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-[color:var(--color-ink)]">
          {error}
        </p>
      )}
    </div>
  );
}
