import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { ProductCard } from "./product-card";
import { products } from "@/lib/data";

export function FeaturedGemstones() {
  return (
    <section id="featured" className="pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-[110px] lg:pb-15">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
              The Collection
            </div>
            <h2 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
              Featured Gemstones
            </h2>
          </div>
          <Link
            href="/gemstones"
            className="group inline-flex items-center gap-2 pb-1.5 text-sm font-semibold text-teal"
          >
            View all stones
            <ArrowRight size={15} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-11 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <RevealItem key={product.slot} className="h-full">
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
