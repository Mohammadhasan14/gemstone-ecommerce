import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/catalog/product-grid";
import { ProductFilters } from "@/components/catalog/product-filters";
import { listProducts, getFilterOptions, type ProductFilters as ProductFilterValues, type ProductSort } from "@/lib/db/queries/products";

export const metadata: Metadata = {
  title: "Shop Gemstones — HK Gems",
  description: "Browse certified, natural gemstones filtered by stone, origin, treatment, and price.",
};

const SORTS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default async function GemstonesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const category = typeof params.category === "string" ? params.category : undefined;
  const origin = typeof params.origin === "string" ? params.origin : undefined;
  const treatment = typeof params.treatment === "string" ? params.treatment : undefined;
  const sort = typeof params.sort === "string" ? (params.sort as ProductSort) : undefined;

  const price = typeof params.price === "string" ? params.price : undefined;
  const [minPriceRaw, maxPriceRaw] = price?.split("-") ?? [];
  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;

  const filters: ProductFilterValues = { category, origin, treatment, minPrice, maxPrice, sort };

  const [products, options] = await Promise.all([listProducts(filters), getFilterOptions()]);

  const currentSearchParams = new URLSearchParams();
  if (category) currentSearchParams.set("category", category);
  if (origin) currentSearchParams.set("origin", origin);
  if (treatment) currentSearchParams.set("treatment", treatment);
  if (price) currentSearchParams.set("price", price);
  if (sort) currentSearchParams.set("sort", sort);

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="mb-8 sm:mb-12">
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            The Collection
          </div>
          <h1 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
            Shop Gemstones
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <ProductFilters options={options} active={filters} searchParams={currentSearchParams} />

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-muted">
                {products.length} {products.length === 1 ? "stone" : "stones"}
              </span>
              <div className="flex gap-1.5">
                {SORTS.map((s) => {
                  const qs = new URLSearchParams(currentSearchParams);
                  const isActive = (sort ?? "newest") === s.value;
                  if (s.value === "newest") qs.delete("sort");
                  else qs.set("sort", s.value);
                  const href = qs.toString() ? `/gemstones?${qs}` : "/gemstones";
                  return (
                    <Link
                      key={s.value}
                      href={href}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                        isActive ? "bg-ink text-ivory" : "text-muted hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </main>
  );
}
