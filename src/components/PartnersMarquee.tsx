"use client";

import { partners } from "@/data";
import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers/translation-provider";

export default function PartnersMarquee() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const track = [...partners, ...partners, ...partners];

  // Ensure seamless loop without abrupt jump by duplicating track and using longer cycle
  useEffect(() => {
    // No runtime logic needed; using CSS animation only with extended distance
  }, []);
  return (
    <section className="relative py-12 border-y border-muted overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(1000px 400px at 50% -10%, hsl(var(--muted) / 0.6), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">{t("partners_title")}</h2>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent dark:from-muted/10 pointer-events-none" />
        <div
          ref={containerRef}
          className="overflow-hidden group"
          aria-label="Partner logos scrolling marquee"
        >
          <div className="flex w-max gap-6 md:gap-10 animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
            {track.map((p, idx) => (
              <div key={p.name + idx} className="shrink-0 opacity-90">
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-md h-14 w-14 md:h-20 md:w-20 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </section>
  );
}
