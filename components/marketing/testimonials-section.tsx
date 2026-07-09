import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="py-8 pb-16 sm:py-10 sm:pb-20 lg:pb-[110px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            Testimonials
          </div>
          <h2 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
            Trusted by Collectors &amp; Believers
          </h2>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.initials} className="h-full">
              <figure className="m-0 flex h-full flex-col gap-4 rounded-2xl border border-ink/7 bg-white px-6 py-6 shadow-[0_8px_30px_-18px_rgba(16,24,22,.15)] sm:gap-[18px] sm:rounded-[20px] sm:px-7 sm:py-[30px]">
                <div className="tracking-[3px] text-sm text-gold">★★★★★</div>
                <blockquote className="m-0 text-sm leading-[1.7] text-charcoal sm:text-[15px] sm:leading-[1.75]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-[#E7D8A8] sm:h-[38px] sm:w-[38px] sm:text-[13px]">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-ink">{t.name}</div>
                    <div className="text-xs text-muted">{t.meta}</div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
