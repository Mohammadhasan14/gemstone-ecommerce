"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { GemPlaceholder } from "./gem-placeholder";
import { AnimatedCounter } from "./animated-counter";
import { Reveal } from "./reveal";
import { stats } from "@/lib/data";

export function HeroSection() {
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (blobA.current) blobA.current.style.transform = `translateY(${(y * 0.18).toFixed(1)}px)`;
      if (blobB.current) blobB.current.style.transform = `translateY(${(y * -0.12).toFixed(1)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(1200px_700px_at_75%_20%,#123B36_0%,#0B1F1C_55%,#08110F_100%)]"
    >
      <div
        ref={blobA}
        className="animate-hk-glow pointer-events-none absolute -right-30 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.14),transparent_65%)] will-change-transform"
      />
      <div
        ref={blobB}
        className="pointer-events-none absolute -bottom-55 -left-35 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,.22),transparent_65%)] will-change-transform"
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-16 px-8 py-[150px] pb-[90px] lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#E7D8A8] backdrop-blur-sm">
              <span className="block h-[7px] w-[7px] rotate-45 bg-gold" />
              Certified Natural Gemstones
            </div>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-7 text-balance font-serif text-5xl leading-[1.08] font-normal text-ivory sm:text-[66px]">
              Nature&apos;s Finest Gemstones.{" "}
              <span className="animate-hk-shimmer bg-[linear-gradient(100deg,#C9A227_20%,#EFDf9E_40%,#C9A227_60%)] bg-[length:200%_100%] bg-clip-text text-transparent">
                Authentic. Certified. Timeless.
              </span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-6 max-w-[520px] text-lg leading-[1.7] text-ivory/72">
              Hand-selected Firoza, Aqiq and Pukhraj — sourced from their finest
              origins, tested in independent laboratories, and delivered with
              full certification.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-[15px] font-bold text-night transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Shop Collection
                <ArrowRight size={16} strokeWidth={2.2} />
              </a>
              <a
                href="#stones"
                className="inline-flex items-center rounded-full border border-ivory/35 px-8 py-4 text-[15px] font-semibold text-ivory transition-all duration-200 hover:border-gold hover:text-gold"
              >
                Explore Gemstones
              </a>
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-14 flex gap-9 border-t border-ivory/14 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[26px] text-ivory">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-0.5 text-[12.5px] tracking-[.06em] text-ivory/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative flex justify-center">
          <div className="animate-hk-float">
            <GemPlaceholder
              hint="Macro shot — Firoza (Turquoise)"
              shape="circle"
              className="h-[420px] w-[420px] shadow-[0_40px_90px_-30px_rgba(0,0,0,.7),0_0_0_1px_rgba(201,162,39,.25)]"
            />
          </div>
          <div className="animate-hk-float-sm absolute -bottom-2 left-2">
            <GemPlaceholder
              hint="Aqiq detail"
              shape="rounded"
              radius={24}
              className="h-40 w-40 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6),0_0_0_1px_rgba(247,244,238,.12)]"
            />
          </div>
          <div
            className="absolute top-3 -right-1 flex items-center gap-3 rounded-2xl border border-ivory/16 bg-ivory/8 p-3.5 px-[18px] backdrop-blur-lg"
            style={{ animation: "hk-float-sm 8s ease-in-out infinite 1.2s" }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gold/18">
              <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
            </span>
            <div>
              <div className="text-[13px] font-bold text-ivory">IGI · GIA Certified</div>
              <div className="text-[11.5px] text-ivory/55">Report with every stone</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
