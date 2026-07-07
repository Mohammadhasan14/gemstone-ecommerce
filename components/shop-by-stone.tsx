import { Reveal } from "./reveal";
import { GemPlaceholder } from "./gem-placeholder";
import { categories } from "@/lib/data";

export function ShopByStone() {
  return (
    <section id="stones" className="py-20">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal className="text-center">
          <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
            Shop by Stone
          </div>
          <h2 className="mt-3 font-serif text-[44px] font-normal text-ink">
            Every Stone, Its Finest Origin
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-[1.7] text-muted">
            From Nishapur turquoise to Ceylon sapphire — each category is
            sourced from the origin that defines its quality.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-[22px] sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.slot} index={i} className="h-full">
              <a
                href="#featured"
                className="group block h-full overflow-hidden rounded-[20px] border border-ink/7 bg-white text-inherit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-22px_rgba(16,24,22,.28)]"
              >
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]">
                    <GemPlaceholder hint={category.imgHint} shape="rect" className="h-[170px] w-full" />
                  </div>
                </div>
                <div className="px-5 pt-4.5 pb-5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-serif text-[19px] text-ink">{category.name}</span>
                    {category.local && (
                      <span className="text-[12.5px] font-semibold tracking-[.04em] text-gold">
                        {category.local}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-[12.5px] text-muted">{category.note}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
