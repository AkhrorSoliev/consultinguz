"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useReveal<E extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number } = { threshold: 0.15 }
) {
  const ref = useRef<E | null>(null);
  const [revealed, setRevealed] = useState(false);

  const observe = useCallback(
    (el: E) => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setRevealed(true);
              io.disconnect();
            }
          });
        },
        { threshold: options.threshold }
      );
      io.observe(el);
      return () => io.disconnect();
    },
    [options.threshold]
  );

  useEffect(() => (ref.current ? observe(ref.current) : undefined), [observe]);

  return { ref, revealed } as const;
}
