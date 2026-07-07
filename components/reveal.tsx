"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setRevealed(true);
          io.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = Math.min(index, 7) * 110;

  return (
    <div
      ref={ref}
      className={`hk-reveal ${revealed ? "hk-revealed" : ""} ${className}`}
      style={revealed ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
