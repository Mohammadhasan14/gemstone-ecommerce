import { Check } from "lucide-react";
import { Reveal } from "./reveal";
import { GemPlaceholder } from "./gem-placeholder";
import { certPoints } from "@/lib/data";

export function CertificationSection() {
  return (
    <section id="certification" className="py-[110px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-[70px] px-8 lg:grid-cols-2">
        <Reveal>
          <GemPlaceholder
            hint="Gemologist at work / lab report photo"
            shape="rounded"
            radius={24}
            className="h-[460px] w-full shadow-[0_40px_80px_-36px_rgba(16,24,22,.4)]"
          />
        </Reveal>

        <Reveal>
          <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">
            Certification &amp; Authenticity
          </div>
          <h2 className="mt-3.5 font-serif text-[44px] leading-[1.15] font-normal text-ink">
            Trust, Documented in Every Report
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-muted">
            Every gemstone we sell is examined by independent gemological
            laboratories. Your stone arrives with its full report — no
            exceptions, no fine print.
          </p>
          <div className="mt-8 flex flex-col gap-[18px]">
            {certPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <span className="mt-px flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Check size={13} strokeWidth={2.6} />
                </span>
                <div>
                  <div className="text-[15px] font-bold text-ink">{point.title}</div>
                  <div className="mt-1 text-[13.5px] leading-[1.6] text-muted">{point.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
