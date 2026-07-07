import { Reveal } from "./reveal";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="pt-10 pb-[110px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal className="text-center">
          <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
            Testimonials
          </div>
          <h2 className="mt-3 font-serif text-[44px] font-normal text-ink">
            Trusted by Collectors &amp; Believers
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.initials} index={i} className="h-full">
              <figure className="m-0 flex h-full flex-col gap-[18px] rounded-[20px] border border-ink/7 bg-white px-7 py-[30px] shadow-[0_8px_30px_-18px_rgba(16,24,22,.15)]">
                <div className="tracking-[3px] text-sm text-gold">★★★★★</div>
                <blockquote className="m-0 text-[15px] leading-[1.75] text-charcoal">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-ink text-[13px] font-bold text-[#E7D8A8]">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-ink">{t.name}</div>
                    <div className="text-xs text-muted">{t.meta}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
