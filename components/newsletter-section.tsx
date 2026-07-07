"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "./reveal";

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
    <section className="pb-[110px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <Reveal>
          <div className="relative grid grid-cols-1 items-center gap-[50px] overflow-hidden rounded-[28px] bg-[radial-gradient(900px_400px_at_20%_0%,#123B36,#0B1F1C_70%)] px-8 py-[70px] sm:px-15 lg:grid-cols-[1.1fr_.9fr]">
            <div className="pointer-events-none absolute -top-30 -right-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.16),transparent_65%)]" />

            <div className="relative">
              <h2 className="font-serif text-[38px] leading-[1.2] font-normal text-ivory">
                Rare Arrivals, First to Your Inbox
              </h2>
              <p className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-ivory/65">
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
                className="flex-1 rounded-full border border-ivory/20 bg-ivory/8 px-6 py-4 text-[14.5px] text-ivory placeholder:text-ivory/50 outline-none backdrop-blur-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-full bg-gold px-[30px] py-4 text-[14.5px] font-bold text-night transition-colors duration-200 hover:bg-gold-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
