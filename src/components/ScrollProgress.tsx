"use client";

import { useEffect, useState } from "react";

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const total = Math.max(1, scrollHeight - clientHeight);
  return Math.min(1, Math.max(0, scrollTop / total));
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => setProgress(getScrollProgress());
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-[60] h-0.5 md:h-1 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
