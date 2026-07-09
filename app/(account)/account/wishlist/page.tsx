import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import { listWishlistProducts } from "@/lib/db/queries/wishlist";
import { ProductGrid } from "@/components/catalog/product-grid";

export const metadata: Metadata = { title: "Wishlist — HK Gems" };

export default async function WishlistPage() {
  const user = await getUser();
  if (!user) return null;

  const products = await listWishlistProducts(user.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted">Stones you&apos;ve saved for later.</p>
      <div className="mt-6">
        <ProductGrid products={products} wishlistedIds={new Set(products.map((p) => p.id))} />
      </div>
    </div>
  );
}
