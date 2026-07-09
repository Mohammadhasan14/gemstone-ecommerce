"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { EASE_OUT } from "./motion";
import { SearchOverlay } from "./catalog/search-overlay";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const announceRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keeps --header-h (live) and --header-h-max (expanded, announcement-bar-
  // included) in sync with the real rendered header, since the announcement
  // bar can wrap to 2 lines on narrow screens — a hardcoded offset can't
  // account for that, and hero padding / anchor scroll-margin need it.
  useEffect(() => {
    const announceEl = announceRef.current;
    const navEl = navRef.current;
    if (!announceEl || !navEl) return;

    const update = () => {
      const navH = navEl.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${navH + announceEl.offsetHeight}px`);
      document.documentElement.style.setProperty("--header-h-max", `${navH + announceEl.scrollHeight}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(announceEl);
    ro.observe(navEl);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const textColor = scrolled || menuOpen ? "text-ink" : "text-ivory";
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] transition-all duration-300">
      <div
        ref={announceRef}
        className="overflow-hidden text-center transition-all duration-300 ease-out"
        style={{
          background: "var(--color-ink)",
          color: "#E7D8A8",
          padding: scrolled ? "0 24px" : "9px 24px",
          height: scrolled ? 0 : "auto",
        }}
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[.1em] sm:text-[11px] sm:tracking-[.14em]">
          Complimentary insured shipping across India&nbsp;·&nbsp;Every stone
          lab certified
        </span>
      </div>

      <nav
        ref={navRef}
        className={`relative z-[59] transition-all duration-300 ease-out ${
          scrolled || menuOpen
            ? "border-b border-ink/10 bg-ivory/95 backdrop-blur-lg"
            : "border-b border-ivory/10 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center gap-9 px-5 sm:px-8 lg:h-[72px]">
          <Link
            href="/"
            className={`whitespace-nowrap font-serif text-lg tracking-[.06em] transition-colors duration-200 sm:text-xl lg:text-[22px] ${textColor}`}
          >
            HK <span className="text-gold">GEMS</span>
          </Link>

          <div className="hidden flex-1 justify-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] font-semibold tracking-[.03em] transition-colors duration-200 hover:text-gold ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className={`cursor-pointer transition-colors duration-200 ${textColor}`}
            >
              <Search size={19} strokeWidth={1.8} />
            </button>
            <button aria-label="Wishlist" className={`cursor-pointer transition-colors duration-200 ${textColor}`}>
              <Heart size={19} strokeWidth={1.8} />
            </button>
            <button aria-label="Cart" className={`cursor-pointer transition-colors duration-200 ${textColor}`}>
              <ShoppingBag size={19} strokeWidth={1.8} />
            </button>
            <motion.a
              href="/gemstones"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-gold px-5 py-2.5 text-[13px] font-bold text-night"
            >
              Shop Collection
            </motion.a>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`ml-auto flex h-9 w-9 items-center justify-center transition-colors duration-200 lg:hidden ${textColor}`}
          >
            {menuOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-ink/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="fixed inset-y-0 right-0 z-[58] flex w-[82%] max-w-xs flex-col gap-8 overflow-y-auto bg-ivory px-7 pt-[120px] pb-8 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-ink/8 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <button
                  aria-label="Search"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="text-ink"
                >
                  <Search size={20} strokeWidth={1.8} />
                </button>
                <button aria-label="Wishlist" className="text-ink">
                  <Heart size={20} strokeWidth={1.8} />
                </button>
                <button aria-label="Cart" className="text-ink">
                  <ShoppingBag size={20} strokeWidth={1.8} />
                </button>
              </div>

              <motion.a
                href="/gemstones"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.96 }}
                className="mt-auto rounded-full bg-gold px-6 py-3.5 text-center text-[14px] font-bold text-night"
              >
                Shop Collection
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
