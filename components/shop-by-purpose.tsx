import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { purposes } from "@/lib/data";

export function ShopByPurpose() {
  return (
    <section id="purpose" className="bg-ink py-14 sm:py-16 lg:py-[90px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            Shop by Purpose
          </div>
          <h2 className="mt-2.5 max-w-[640px] font-serif text-3xl font-normal text-ivory sm:mt-3 sm:text-4xl lg:text-[44px]">
            A Stone for Every Intention
          </h2>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-12 sm:gap-[22px] lg:grid-cols-4">
          {purposes.map((purpose) => (
            <RevealItem key={purpose.title} className="h-full">
              <a
                href="#featured"
                className="flex h-full flex-col gap-2.5 rounded-2xl border border-ivory/10 bg-ivory/5 px-4 py-5 text-inherit backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-ivory/9 sm:gap-3.5 sm:rounded-[20px] sm:px-[26px] sm:py-7"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/14 sm:h-10 sm:w-10 sm:rounded-xl">
                  <span className="block h-2 w-2 rotate-45 bg-gold sm:h-[11px] sm:w-[11px]" />
                </span>
                <div className="font-serif text-base text-ivory sm:text-xl">{purpose.title}</div>
                <p className="text-[12px] leading-[1.6] text-ivory/60 sm:text-[13.5px] sm:leading-[1.65]">
                  {purpose.copy}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gold sm:text-sm">
                  Browse
                  <ArrowRight size={13} strokeWidth={2.2} />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
