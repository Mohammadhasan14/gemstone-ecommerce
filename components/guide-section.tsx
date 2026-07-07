import { Reveal } from "./reveal";
import { GemPlaceholder } from "./gem-placeholder";
import { guides } from "@/lib/data";

export function GuideSection() {
  return (
    <section id="guide" className="bg-cream py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
              The Gemstone Guide
            </div>
            <h2 className="mt-3 font-serif text-[44px] font-normal text-ink">
              Choose with Confidence
            </h2>
          </div>
          <a href="#faq" className="pb-1.5 text-sm font-semibold text-teal">
            Read all guides
          </a>
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, i) => (
            <Reveal key={guide.slot} index={i} className="h-full">
              <a
                href="#faq"
                className="block h-full overflow-hidden rounded-[20px] border border-ink/7 bg-white text-inherit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-22px_rgba(16,24,22,.25)]"
              >
                <GemPlaceholder hint={guide.imgHint} shape="rect" className="h-[150px] w-full" />
                <div className="px-5 pt-4.5 pb-[22px]">
                  <div className="text-[11px] font-bold tracking-[.14em] text-teal uppercase">
                    {guide.tag}
                  </div>
                  <div className="mt-2 font-serif text-lg leading-[1.35] text-ink">
                    {guide.title}
                  </div>
                  <div className="mt-2 text-[12.5px] text-muted">{guide.read}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
