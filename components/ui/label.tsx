export function Label({ className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`mb-1.5 block text-[11px] font-bold tracking-[.08em] text-ink/70 uppercase ${className}`}
      {...props}
    />
  );
}
