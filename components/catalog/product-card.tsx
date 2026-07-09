import Link from "next/link";
import { GemPlaceholder } from "@/components/gem-placeholder";
import { WishlistButton } from "./wishlist-button";
import { formatPriceMinor, formatPricePerCarat } from "@/lib/format";
import type { listProducts } from "@/lib/db/queries/products";

type ProductListItem = Awaited<ReturnType<typeof listProducts>>[number];

export function ProductCard({ product }: { product: ProductListItem }) {
  const perCt = formatPricePerCarat(product.priceMinor, product.currency, product.caratWeight);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/7 bg-white shadow-[0_8px_30px_-18px_rgba(16,24,22,.18)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-22px_rgba(16,24,22,.3)] sm:rounded-[20px]">
      <WishlistButton productName={product.name} />

      <Link href={`/gemstones/${product.slug}`} className="flex h-full flex-col">
        <div className="overflow-hidden">
          <div className="transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
            <GemPlaceholder
              hint={product.imageHint ?? product.kind}
              shape="rect"
              className="h-[130px] w-full sm:h-[190px] lg:h-[240px]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-0 px-3 pt-3 pb-3.5 sm:px-5 sm:pt-5 sm:pb-[22px]">
          <div className="text-[9.5px] font-bold tracking-[.1em] text-teal uppercase sm:text-[11.5px] sm:tracking-[.14em]">
            {product.kind}
          </div>
          <h3 className="mt-1.5 font-serif text-[15px] font-normal text-ink sm:mt-2 sm:text-xl">{product.name}</h3>
          <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-muted sm:mt-2.5 sm:gap-x-3.5 sm:text-[12.5px]">
            {product.grade && <span>{product.grade}</span>}
            {product.caratWeight && <span className="hidden sm:inline">·</span>}
            {product.caratWeight && <span>{product.caratWeight} ct</span>}
            {product.originName && <span className="hidden sm:inline">·</span>}
            {product.originName && <span>{product.originName}</span>}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink/7 pt-3 sm:mt-4 sm:pt-4">
            <div>
              <div className="text-[15px] font-bold text-ink sm:text-lg">
                {formatPriceMinor(product.priceMinor, product.currency)}
              </div>
              {perCt && <div className="text-[10px] text-muted sm:text-[11.5px]">{perCt}</div>}
            </div>
            <span className="rounded-full bg-teal px-3 py-2 text-[11px] font-bold text-ivory transition-colors duration-200 group-hover:bg-teal-dark sm:px-[18px] sm:py-2.5 sm:text-[13px]">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
