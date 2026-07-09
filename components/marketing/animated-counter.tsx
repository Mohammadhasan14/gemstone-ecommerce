"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(() => value.toLocaleString("en-IN") + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          const start = performance.now();
          const duration = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const ease = 1 - Math.pow(1 - p, 3);
            setText(Math.round(value * ease).toLocaleString("en-IN") + suffix);
            if (p < 1) requestAnimationFrame(tick);
            else setText(value.toLocaleString("en-IN") + suffix);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>{text}</span>;
}
