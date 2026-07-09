import { Check } from "lucide-react";
import { Reveal } from "@/components/motion";
import { GemPlaceholder } from "@/components/gem-placeholder";
import { certPoints } from "@/lib/data";

export function CertificationSection() {
  return (
    <section id="certification" className="py-16 sm:py-20 lg:py-[110px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-[70px]">
        <Reveal>
          <GemPlaceholder
            hint="Gemologist at work / lab report photo"
            shape="rounded"
            radius={24}
            className="h-[260px] w-full shadow-[0_40px_80px_-36px_rgba(16,24,22,.4)] sm:h-[340px] lg:h-[460px]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            Certification &amp; Authenticity
          </div>
          <h2 className="mt-3 font-serif text-3xl leading-[1.2] font-normal text-ink sm:mt-3.5 sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            Trust, Documented in Every Report
          </h2>
          <p className="mt-4 text-sm leading-[1.75] text-muted sm:mt-5 sm:text-base">
            Every gemstone we sell is examined by independent gemological
            laboratories. Your stone arrives with its full report — no
            exceptions, no fine print.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-[18px]">
            {certPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-3.5 sm:gap-4">
                <span className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal/10 text-teal sm:h-[26px] sm:w-[26px]">
                  <Check size={12} strokeWidth={2.6} className="sm:hidden" />
                  <Check size={13} strokeWidth={2.6} className="hidden sm:block" />
                </span>
                <div>
                  <div className="text-sm font-bold text-ink sm:text-[15px]">{point.title}</div>
                  <div className="mt-1 text-[13px] leading-[1.6] text-muted sm:text-[13.5px]">{point.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
