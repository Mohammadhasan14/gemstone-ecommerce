import { ProductCard } from "./product-card";
import type { listProducts } from "@/lib/db/queries/products";

export function ProductGrid({ products }: { products: Awaited<ReturnType<typeof listProducts>> }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-ink/7 bg-white px-6 py-16 text-center text-sm text-muted">
        No gemstones match these filters yet. Try widening your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
