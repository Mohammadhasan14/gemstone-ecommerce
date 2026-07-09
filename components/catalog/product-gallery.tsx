import { GemPlaceholder } from "@/components/gem-placeholder";

export function ProductGallery({
  images,
  fallbackHint,
}: {
  images: { url: string | null; alt: string | null }[];
  fallbackHint: string;
}) {
  const primary = images[0];

  return (
    <div className="flex flex-col gap-3">
      <GemPlaceholder
        hint={primary?.alt ?? fallbackHint}
        shape="rounded"
        radius={20}
        className="aspect-square w-full"
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5">
          {images.slice(1).map((img, i) => (
            <GemPlaceholder key={i} hint={img.alt ?? fallbackHint} shape="rounded" radius={12} className="aspect-square w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
