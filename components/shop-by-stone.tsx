import { Reveal, RevealGroup, RevealItem } from "./motion";
import { GemPlaceholder } from "./gem-placeholder";
import { categories } from "@/lib/data";

export function ShopByStone() {
  return (
    <section id="stones" className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            Shop by Stone
          </div>
          <h2 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
            Every Stone, Its Finest Origin
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-[1.7] text-muted sm:mt-4 sm:text-base">
            From Nishapur turquoise to Ceylon sapphire — each category is
            sourced from the origin that defines its quality.
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-12 sm:grid-cols-3 sm:gap-[22px] lg:grid-cols-4">
          {categories.map((category) => (
            <RevealItem key={category.slot} className="h-full">
              <a
                href="#featured"
                className="group block h-full overflow-hidden rounded-2xl border border-ink/7 bg-white text-inherit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-22px_rgba(16,24,22,.28)] sm:rounded-[20px]"
              >
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]">
                    <GemPlaceholder hint={category.imgHint} shape="rect" className="h-[110px] w-full sm:h-[150px] lg:h-[170px]" />
                  </div>
                </div>
                <div className="px-3.5 pt-3 pb-3.5 sm:px-5 sm:pt-4.5 sm:pb-5">
                  <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                    <span className="font-serif text-[15px] text-ink sm:text-[19px]">{category.name}</span>
                    {category.local && (
                      <span className="text-[11px] font-semibold tracking-[.04em] text-gold sm:text-[12.5px]">
                        {category.local}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-muted sm:mt-1.5 sm:text-[12.5px]">{category.note}</div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
