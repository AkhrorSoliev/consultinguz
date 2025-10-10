"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/components/providers/translation-provider";
import { ParticleCard, GlobalSpotlight } from "@/components/MagicBento";
import { useRef } from "react";

const items = (t: (k: string) => string) => [
  {
    title: t("emp_hire"),
    desc: t("emp_hire_desc"),
  },
  {
    title: t("emp_docs"),
    desc: t("emp_docs_desc"),
  },
  {
    title: t("emp_extra"),
    desc: t("emp_extra_desc"),
  },
];

export default function ForEmployers() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">{t("emp_title")}</h2>
      <GlobalSpotlight gridRef={gridRef} spotlightRadius={300} />
      <div ref={gridRef} className="bento-section grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items(t).map((it) => (
          <ParticleCard
            key={it.title}
            className="card card--border-glow rounded-2xl shadow-lg"
            glowColor="132, 0, 255"
            enableTilt
            enableMagnetism
            clickEffect
          >
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{it.desc}</p>
              </CardContent>
            </Card>
          </ParticleCard>
        ))}
      </div>
    </section>
  );
}
