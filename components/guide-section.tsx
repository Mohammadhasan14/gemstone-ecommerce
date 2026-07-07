import { Reveal, RevealGroup, RevealItem } from "./motion";
import { GemPlaceholder } from "./gem-placeholder";
import { guides } from "@/lib/data";

export function GuideSection() {
  return (
    <section id="guide" className="bg-cream py-16 sm:py-20 lg:py-25">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
              The Gemstone Guide
            </div>
            <h2 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
              Choose with Confidence
            </h2>
          </div>
          <a href="#faq" className="pb-1.5 text-sm font-semibold text-teal">
            Read all guides
          </a>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-11 sm:gap-[22px] lg:grid-cols-4">
          {guides.map((guide) => (
            <RevealItem key={guide.slot} className="h-full">
              <a
                href="#faq"
                className="block h-full overflow-hidden rounded-2xl border border-ink/7 bg-white text-inherit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-22px_rgba(16,24,22,.25)] sm:rounded-[20px]"
              >
                <GemPlaceholder hint={guide.imgHint} shape="rect" className="h-[100px] w-full sm:h-[130px] lg:h-[150px]" />
                <div className="px-3.5 pt-3 pb-3.5 sm:px-5 sm:pt-4.5 sm:pb-[22px]">
                  <div className="text-[9.5px] font-bold tracking-[.1em] text-teal uppercase sm:text-[11px] sm:tracking-[.14em]">
                    {guide.tag}
                  </div>
                  <div className="mt-1.5 font-serif text-[14px] leading-[1.3] text-ink sm:mt-2 sm:text-lg sm:leading-[1.35]">
                    {guide.title}
                  </div>
                  <div className="mt-1.5 text-[11px] text-muted sm:mt-2 sm:text-[12.5px]">{guide.read}</div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
