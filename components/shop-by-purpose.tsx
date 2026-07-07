import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { purposes } from "@/lib/data";

export function ShopByPurpose() {
  return (
    <section id="purpose" className="bg-ink py-[90px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal>
          <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
            Shop by Purpose
          </div>
          <h2 className="mt-3 max-w-[640px] font-serif text-[44px] font-normal text-ivory">
            A Stone for Every Intention
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {purposes.map((purpose, i) => (
            <Reveal key={purpose.title} index={i} className="h-full">
              <a
                href="#featured"
                className="flex h-full flex-col gap-3.5 rounded-[20px] border border-ivory/10 bg-ivory/5 px-[26px] py-7 text-inherit backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-ivory/9"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/14">
                  <span className="block h-[11px] w-[11px] rotate-45 bg-gold" />
                </span>
                <div className="font-serif text-xl text-ivory">{purpose.title}</div>
                <p className="text-[13.5px] leading-[1.65] text-ivory/60">{purpose.copy}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-gold">
                  Browse
                  <ArrowRight size={14} strokeWidth={2.2} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
