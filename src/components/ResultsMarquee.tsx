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
    const imageUrls = [
      "https://json-api.uz/mnt/file-1763267786099.jpg",
      "https://json-api.uz/mnt/file-1763267785896.jpg",
      "https://json-api.uz/mnt/file-1763267786259.jpg",
      "https://json-api.uz/mnt/file-1763267786035.jpg",
      "https://json-api.uz/mnt/file-1763267786785.jpg",
      "https://json-api.uz/mnt/file-1763267786076.jpg",
      "https://json-api.uz/mnt/file-1763267788891.jpg",
      "https://json-api.uz/mnt/file-1763267786306.jpg",
      "https://json-api.uz/mnt/file-1763267786428.jpg",
      "https://json-api.uz/mnt/file-1763267785866.jpg",
      "https://json-api.uz/mnt/file-1763267786544.jpg",
      "https://json-api.uz/mnt/file-1763267786744.jpg",
      "https://json-api.uz/mnt/file-1763267786782.jpg",
      "https://json-api.uz/mnt/file-1763267786218.jpg",
      "https://json-api.uz/mnt/file-1763267786068.jpg",
      "https://json-api.uz/mnt/file-1763267786073.jpg",
      "https://json-api.uz/mnt/file-1763267786208.jpg",
      "https://json-api.uz/mnt/file-1763267786581.jpg",
      "https://json-api.uz/mnt/file-1763267786381.jpg",
      "https://json-api.uz/mnt/file-1763267785862.jpg",
      "https://json-api.uz/mnt/file-1763267786111.jpg",
      "https://json-api.uz/mnt/file-1763267785898.jpg",
      "https://json-api.uz/mnt/file-1763267786830.jpg",
      "https://json-api.uz/mnt/file-1763267786042.jpg",
      "https://json-api.uz/mnt/file-1763267786605.jpg",
      "https://json-api.uz/mnt/file-1763267786394.jpg",
      "https://json-api.uz/mnt/file-1763267788759.jpg",
      "https://json-api.uz/mnt/file-1763267786029.jpg",
      "https://json-api.uz/mnt/file-1763267786252.jpg",
      "https://json-api.uz/mnt/file-1763267786569.jpg",
      "https://json-api.uz/mnt/file-1763267786554.jpg",
      "https://json-api.uz/mnt/file-1763267785864.jpg",
      "https://json-api.uz/mnt/file-1763267786961.jpg",
      "https://json-api.uz/mnt/file-1763267786899.jpg",
      "https://json-api.uz/mnt/file-1763267786731.jpg",
      "https://json-api.uz/mnt/file-1763267786607.jpg",
      "https://json-api.uz/mnt/file-1763267786590.jpg",
      "https://json-api.uz/mnt/file-1763267786783.jpg",
      "https://json-api.uz/mnt/file-1763267786350.jpg",
      "https://json-api.uz/mnt/file-1763267786340.jpg",
      "https://json-api.uz/mnt/file-1763267786726.jpg",
      "https://json-api.uz/mnt/file-1763267786829.jpg",
      "https://json-api.uz/mnt/file-1763267786251.jpg",
      "https://json-api.uz/mnt/file-1763267786429.jpg",
    ];
    const total = imageUrls.length;
    return Array.from({ length: total }, (_, i) => {
      const id = i + 1;
      return {
        id,
        name: `Kandidat ${id}`,
        role: roles[i % roles.length],
        country: "Deutschland",
        imageUrl: imageUrls[i],
      };
    });
  }, []);

  // Duplicate track 3x for seamless looping without visible gaps
  const track = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <section className="relative py-16 sm:py-20 border-y border-muted overflow-hidden bg-background">
      <div className="px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
          {t("results_title")}
        </h2>
        <p className="font-pt text-muted-foreground mt-2 mb-6 text-pretty max-w-prose mx-auto">
          {t("results_desc")}
        </p>
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
                  className="h-48 w-[320px] object-cover object-[20%_40%]"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
