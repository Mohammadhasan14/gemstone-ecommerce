"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { faqs } from "@/lib/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-[110px]">
      <div className="mx-auto max-w-[820px] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase sm:text-xs sm:tracking-[.22em]">
            FAQ
          </div>
          <h2 className="mt-2.5 font-serif text-3xl font-normal text-ink sm:mt-3 sm:text-4xl lg:text-[44px]">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <RevealGroup className="mt-8 flex flex-col gap-3 sm:mt-11 sm:gap-3.5">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <RevealItem key={faq.q}>
                <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:gap-[18px] sm:px-6 sm:py-5"
                  >
                    <span className="text-sm font-bold text-ink sm:text-[15.5px]">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="flex flex-none text-gold"
                    >
                      <ChevronDown size={16} strokeWidth={2.2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="m-0 px-5 pb-4 text-[13.5px] leading-[1.7] text-muted sm:px-6 sm:pb-[22px] sm:text-[14.5px] sm:leading-[1.75]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
