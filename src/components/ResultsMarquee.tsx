"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo } from "react";
import { useI18n } from "@/components/providers/translation-provider";

type ResultItem = {
  id: number;
  name: string;
  role: string;
  country: string;
  imageUrl: string;
};

export default function ResultsMarquee() {
  const { t } = useI18n();

  const items = useMemo<ResultItem[]>(() => {
    const roles = [
      "Pflegekraft",
      "Bauingenieur/in",
      "Elektriker/in",
      "Service Manager/in",
      "Logistik Koordinator/in",
      "Medizinische Assistenz",
      "Koch/Köchin",
      "Schweißer/in",
      "Mechaniker/in",
    ];
    const total = 18;
    return Array.from({ length: total }, (_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Kandidat ${id}`,
        role: roles[i % roles.length],
        country: "Deutschland",
        imageUrl: `https://picsum.photos/seed/result_${id}/400/300`,
      };
    });
  }, []);

  // Duplicate track 3x for seamless looping without visible gaps
  const track = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <section className="relative py-12 border-y border-muted overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-6">{t("results_title")}</h2>
        <p className="font-pt text-muted-foreground mb-6">{t("results_desc")}</p>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent dark:from-muted/10 pointer-events-none" />
        <div className="overflow-hidden" aria-label="Results scrolling marquee">
          <div
            className="flex w-max gap-6 md:gap-8 will-change-transform"
            style={{ animation: "results_marquee 300s linear infinite" }}
          >
            {track.map((item, idx) => (
              <figure
                key={`${item.id}-${idx}`}
                className="shrink-0 relative rounded-xl overflow-hidden border bg-card"
              >
                <img
                  src={item.imageUrl}
                  alt={`${item.name}`}
                  width={320}
                  height={240}
                  loading="lazy"
                  className="h-48 w-[320px] object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="text-sm font-semibold leading-tight">{item.name}</div>
                  <div className="text-xs opacity-90 leading-tight">
                    {item.role} · {item.country}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
