import Link from "next/link";
import { formatPriceMinor } from "@/lib/format";
import type { getFilterOptions } from "@/lib/db/queries/products";
import type { ProductFilters as ProductFilterValues } from "@/lib/db/queries/products";

type FilterOptions = Awaited<ReturnType<typeof getFilterOptions>>;

function buildHref(current: URLSearchParams, key: string, value: string | undefined) {
  const next = new URLSearchParams(current);
  const isActive = next.get(key) === value;
  next.delete(key);
  if (value && !isActive) next.set(key, value);
  const qs = next.toString();
  return qs ? `/gemstones?${qs}` : "/gemstones";
}

function priceBands(min: number, max: number) {
  if (min >= max) return [];
  const step = Math.ceil((max - min) / 3);
  return [
    { min, max: min + step, label: `Under ${formatPriceMinor(min + step, "INR")}` },
    { min: min + step, max: min + step * 2, label: `${formatPriceMinor(min + step, "INR")} – ${formatPriceMinor(min + step * 2, "INR")}` },
    { min: min + step * 2, max, label: `Over ${formatPriceMinor(min + step * 2, "INR")}` },
  ];
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/8 pb-5">
      <div className="mb-3 text-[11px] font-bold tracking-[.1em] text-ink uppercase">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors duration-150 ${
        active
          ? "border-teal bg-teal text-ivory"
          : "border-ink/12 bg-white text-ink hover:border-teal hover:text-teal"
      }`}
    >
      {children}
    </Link>
  );
}

export function ProductFilters({
  options,
  active,
  searchParams,
}: {
  options: FilterOptions;
  active: ProductFilterValues;
  searchParams: URLSearchParams;
}) {
  const bands = priceBands(options.priceRange.min, options.priceRange.max);

  return (
    <aside className="flex flex-col gap-5">
      {options.categories.length > 0 && (
        <FilterGroup title="Stone">
          {options.categories.map((c) => (
            <Chip key={c.slug} href={buildHref(searchParams, "category", c.slug)} active={active.category === c.slug}>
              {c.name}
            </Chip>
          ))}
        </FilterGroup>
      )}

      {options.origins.length > 0 && (
        <FilterGroup title="Origin">
          {options.origins.map((name) => (
            <Chip key={name} href={buildHref(searchParams, "origin", name)} active={active.origin === name}>
              {name}
            </Chip>
          ))}
        </FilterGroup>
      )}

      {options.treatments.length > 0 && (
        <FilterGroup title="Treatment">
          {options.treatments.map((t) => (
            <Chip key={t} href={buildHref(searchParams, "treatment", t)} active={active.treatment === t}>
              {t}
            </Chip>
          ))}
        </FilterGroup>
      )}

      {bands.length > 0 && (
        <FilterGroup title="Price">
          {bands.map((band) => {
            const value = `${band.min}-${band.max}`;
            const isActive = active.minPrice === band.min && active.maxPrice === band.max;
            return (
              <Chip key={value} href={buildHref(searchParams, "price", value)} active={isActive}>
                {band.label}
              </Chip>
            );
          })}
        </FilterGroup>
      )}

      {(active.category || active.origin || active.treatment || active.minPrice !== undefined) && (
        <Link href="/gemstones" className="text-[12.5px] font-semibold text-teal hover:underline">
          Clear all filters
        </Link>
      )}
    </aside>
  );
}
