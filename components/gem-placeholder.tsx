import { Gem } from "lucide-react";

type Shape = "rect" | "rounded" | "circle";

export function GemPlaceholder({
  hint,
  shape = "rect",
  radius,
  className = "",
}: {
  hint: string;
  shape?: Shape;
  radius?: number;
  className?: string;
}) {
  const radiusClass =
    shape === "circle" ? "rounded-full" : shape === "rect" ? "rounded-none" : "";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-deep via-ink to-night ${radiusClass} ${className}`}
      style={shape === "rounded" ? { borderRadius: radius ?? 12 } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,.18),transparent_60%)]" />
      <Gem className="h-8 w-8 text-gold/40" strokeWidth={1.25} />
      <span className="absolute inset-x-3 bottom-3 line-clamp-2 text-center text-[11px] leading-tight text-ivory/45">
        {hint}
      </span>
    </div>
  );
}
