"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./reveal";
import { faqs } from "@/lib/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-[110px]">
      <div className="mx-auto max-w-[820px] px-8">
        <Reveal className="text-center">
          <div className="text-xs font-bold tracking-[.22em] text-gold uppercase">FAQ</div>
          <h2 className="mt-3 font-serif text-[44px] font-normal text-ink">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="mt-11 flex flex-col gap-3.5">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.q} index={i}>
                <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-[18px] px-6 py-5 text-left"
                  >
                    <span className="text-[15.5px] font-bold text-ink">{faq.q}</span>
                    <span
                      className="flex flex-none text-gold transition-transform duration-300"
                      style={{ transform: open ? "rotate(180deg)" : "none" }}
                    >
                      <ChevronDown size={16} strokeWidth={2.2} />
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: open ? "220px" : "0px", opacity: open ? 1 : 0 }}
                  >
                    <p className="m-0 px-6 pb-[22px] text-[14.5px] leading-[1.75] text-muted">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
