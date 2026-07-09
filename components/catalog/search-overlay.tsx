"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

type SearchResult = { slug: string; name: string; kind: string; price: string };

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = () => {
    onClose();
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) setLoading(true);
  };

  useEffect(() => {
    if (!query.trim()) return;
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-[71] bg-ivory px-5 pt-6 pb-8 shadow-2xl sm:px-8"
          >
            <div className="mx-auto max-w-[720px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!query.trim()) return;
                  const q = query.trim();
                  close();
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                }}
                className="flex items-center gap-3 border-b border-ink/15 pb-3"
              >
                <Search size={20} strokeWidth={1.8} className="text-ink/50" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={handleChange}
                  type="search"
                  placeholder="Search gemstones by name or stone..."
                  className="flex-1 bg-transparent font-serif text-lg text-ink outline-none placeholder:text-ink/40"
                />
                <button type="button" onClick={close} aria-label="Close search" className="text-ink/60 hover:text-ink">
                  <X size={20} strokeWidth={1.8} />
                </button>
              </form>

              {query.trim() && (
                <div className="mt-4">
                  {loading ? (
                    <p className="py-4 text-sm text-muted">Searching…</p>
                  ) : results.length === 0 ? (
                    <p className="py-4 text-sm text-muted">No gemstones found for “{query}”.</p>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {results.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/gemstones/${r.slug}`}
                            onClick={close}
                            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink/5"
                          >
                            <span>
                              <span className="font-semibold text-ink">{r.name}</span>
                              <span className="ml-2 text-[12.5px] text-muted">{r.kind}</span>
                            </span>
                            <span className="text-[13px] font-semibold text-ink">{r.price}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
