"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Reveal } from "./motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("You're subscribed", {
      description: "Rare arrivals and collector guidance, once a month.",
    });
    setEmail("");
  };

  return (
    <section className="pb-16 sm:pb-20 lg:pb-[110px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-[radial-gradient(900px_400px_at_20%_0%,#123B36,#0B1F1C_70%)] px-6 py-10 sm:gap-[50px] sm:rounded-[28px] sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-15 lg:py-[70px]">
            <div className="pointer-events-none absolute -top-30 -right-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.16),transparent_65%)] sm:h-[420px] sm:w-[420px]" />

            <div className="relative">
              <h2 className="font-serif text-2xl leading-[1.25] font-normal text-ivory sm:text-[32px] lg:text-[38px] lg:leading-[1.2]">
                Rare Arrivals, First to Your Inbox
              </h2>
              <p className="mt-3 max-w-[440px] text-sm leading-[1.65] text-ivory/65 sm:mt-4 sm:text-[15px] sm:leading-[1.7]">
                New certified stones, origin stories and collector guidance.
                One email a month — nothing more.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full border border-ivory/20 bg-ivory/8 px-5 py-3.5 text-sm text-ivory placeholder:text-ivory/50 outline-none backdrop-blur-sm sm:px-6 sm:py-4 sm:text-[14.5px]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex-none rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night sm:px-[30px] sm:py-4 sm:text-[14.5px]"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
