"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GemPlaceholder } from "./gem-placeholder";
import { AnimatedCounter } from "./animated-counter";
import { MountGroup, MountItem } from "./motion";
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
        className="animate-hk-glow pointer-events-none absolute -right-30 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.14),transparent_65%)] will-change-transform sm:h-[520px] sm:w-[520px] lg:h-[640px] lg:w-[640px]"
      />
      <div
        ref={blobB}
        className="pointer-events-none absolute -bottom-55 -left-35 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,.22),transparent_65%)] will-change-transform sm:h-[480px] sm:w-[480px] lg:h-[560px] lg:w-[560px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:px-8 sm:pt-[max(8rem,calc(var(--header-h-max,118px)+20px))] sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pt-[150px] lg:pb-[90px]">
        <MountGroup>
          <MountItem>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#E7D8A8] backdrop-blur-sm sm:text-xs sm:tracking-[.16em]">
              <span className="block h-[7px] w-[7px] rotate-45 bg-gold" />
              Certified Natural Gemstones
            </div>
          </MountItem>

          <MountItem>
            <h1 className="mt-6 text-balance font-serif text-[2.5rem] leading-[1.12] font-normal text-ivory sm:mt-7 sm:text-[3.4rem] lg:text-[66px] lg:leading-[1.08]">
              Nature&apos;s Finest Gemstones.{" "}
              <span className="animate-hk-shimmer bg-[linear-gradient(100deg,#C9A227_20%,#EFDf9E_40%,#C9A227_60%)] bg-[length:200%_100%] bg-clip-text text-transparent">
                Authentic. Certified. Timeless.
              </span>
            </h1>
          </MountItem>

          <MountItem>
            <p className="mt-5 max-w-[520px] text-base leading-[1.7] text-ivory/72 sm:mt-6 sm:text-lg">
              Hand-selected Firoza, Aqiq and Pukhraj — sourced from their finest
              origins, tested in independent laboratories, and delivered with
              full certification.
            </p>
          </MountItem>

          <MountItem>
            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
              <motion.a
                href="#featured"
                whileHover={{ y: -2, backgroundColor: "#D4B14A" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night sm:px-8 sm:py-4 sm:text-[15px]"
              >
                Shop Collection
                <ArrowRight size={16} strokeWidth={2.2} />
              </motion.a>
              <motion.a
                href="#stones"
                whileHover={{ y: -2, borderColor: "#C9A227", color: "#C9A227" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center rounded-full border border-ivory/35 px-7 py-3.5 text-sm font-semibold text-ivory sm:px-8 sm:py-4 sm:text-[15px]"
              >
                Explore Gemstones
              </motion.a>
            </div>
          </MountItem>

          <MountItem>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-ivory/14 pt-6 sm:mt-14 sm:gap-x-9 sm:pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl text-ivory sm:text-[26px]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-0.5 text-[12px] tracking-[.06em] text-ivory/55 sm:text-[12.5px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </MountItem>
        </MountGroup>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="animate-hk-float">
            <GemPlaceholder
              hint="Macro shot — Firoza (Turquoise)"
              shape="circle"
              className="h-[240px] w-[240px] shadow-[0_40px_90px_-30px_rgba(0,0,0,.7),0_0_0_1px_rgba(201,162,39,.25)] sm:h-[320px] sm:w-[320px] lg:h-[420px] lg:w-[420px]"
            />
          </div>
          <div className="animate-hk-float-sm absolute -bottom-2 left-0 hidden sm:block sm:left-2">
            <GemPlaceholder
              hint="Aqiq detail"
              shape="rounded"
              radius={24}
              className="h-28 w-28 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6),0_0_0_1px_rgba(247,244,238,.12)] sm:h-40 sm:w-40"
            />
          </div>
          <div
            className="absolute top-1 -right-1 hidden items-center gap-3 rounded-2xl border border-ivory/16 bg-ivory/8 p-3.5 px-[18px] backdrop-blur-lg sm:flex"
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
        </motion.div>
      </div>
    </section>
  );
}
