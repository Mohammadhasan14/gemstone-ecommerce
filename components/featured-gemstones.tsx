import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { ProductCard } from "./product-card";
import { products } from "@/lib/data";

export function FeaturedGemstones() {
  return (
    <section id="featured" className="pt-[110px] pb-15">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
              The Collection
            </div>
            <h2 className="mt-3 font-serif text-[44px] font-normal text-ink">
              Featured Gemstones
            </h2>
          </div>
          <a
            href="#stones"
            className="inline-flex items-center gap-2 pb-1.5 text-sm font-semibold text-teal"
          >
            View all stones
            <ArrowRight size={15} strokeWidth={2.2} />
          </a>
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slot} index={i} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
