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
      className={`gem-shimmer relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-deep via-ink to-night ${radiusClass} ${className}`}
      style={shape === "rounded" ? { borderRadius: radius ?? 12 } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,.18),transparent_60%)]" />
      <Gem className="h-6 w-6 text-gold/40 sm:h-8 sm:w-8" strokeWidth={1.25} />
      <span className="absolute inset-x-2 bottom-2 line-clamp-2 text-center text-[9.5px] leading-tight text-ivory/45 sm:inset-x-3 sm:bottom-3 sm:text-[11px]">
        {hint}
      </span>
    </div>
  );
}
