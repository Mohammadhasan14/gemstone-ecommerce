import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { ProductGrid } from "@/components/catalog/product-grid";
import { searchProducts } from "@/lib/db/queries/products";
import { getUser } from "@/lib/dal";
import { listWishlistProductIds } from "@/lib/db/queries/wishlist";

export const metadata: Metadata = {
  title: "Search — HK Gems",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const user = await getUser();
  const [results, wishlistedIds] = await Promise.all([
    query ? searchProducts(query, 24) : Promise.resolve([]),
    user ? listWishlistProductIds(user.id) : Promise.resolve(new Set<string>()),
  ]);

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="mb-8 sm:mb-12">
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            Search
          </div>
          <h1 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl">
            {query ? `Results for “${query}”` : "Search gemstones"}
          </h1>
          {query && (
            <p className="mt-2 text-sm text-muted">
              {results.length} {results.length === 1 ? "match" : "matches"}
            </p>
          )}
        </Reveal>

        {query ? (
          <ProductGrid products={results} wishlistedIds={wishlistedIds} />
        ) : (
          <p className="text-sm text-muted">Try searching by stone, name, or category.</p>
        )}
      </div>
    </main>
  );
}
