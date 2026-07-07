"use client";

import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { navLinks } from "@/lib/data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-ink" : "text-ivory";

  return (
    <header className="fixed inset-x-0 top-0 z-[60] transition-all duration-300">
      <div
        className="overflow-hidden text-center transition-all duration-300 ease-out"
        style={{
          background: "var(--color-ink)",
          color: "#E7D8A8",
          padding: scrolled ? "0 32px" : "9px 32px",
          height: scrolled ? 0 : "auto",
        }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[.14em]">
          Complimentary insured shipping across India&nbsp;·&nbsp;Every stone
          lab certified
        </span>
      </div>

      <nav
        className={`transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-ink/10 bg-ivory/90 backdrop-blur-lg"
            : "border-b border-ivory/10 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-9 px-8">
          <a
            href="#top"
            className={`whitespace-nowrap font-serif text-[22px] tracking-[.06em] transition-colors duration-200 ${textColor}`}
          >
            HK <span className="text-gold">GEMS</span>
          </a>

          <div className="flex flex-1 justify-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13.5px] font-semibold tracking-[.03em] transition-colors duration-200 hover:text-gold ${textColor}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className={`cursor-pointer transition-colors duration-200 ${textColor}`}
            >
              <Search size={19} strokeWidth={1.8} />
            </button>
            <button
              aria-label="Wishlist"
              className={`cursor-pointer transition-colors duration-200 ${textColor}`}
            >
              <Heart size={19} strokeWidth={1.8} />
            </button>
            <button
              aria-label="Cart"
              className={`cursor-pointer transition-colors duration-200 ${textColor}`}
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
            </button>
            <a
              href="#featured"
              className="rounded-full bg-gold px-5 py-2.5 text-[13px] font-bold text-night transition-colors duration-200 hover:bg-gold-light"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
