"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data";
import { Users, BriefcaseBusiness, Award, ThumbsUp, type LucideIcon } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

function useCountUp(target: number, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const duration = 1200;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return n;
}

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  isInView: boolean;
}

function StatCard({ value, suffix, label, icon: Icon, isInView }: StatCardProps) {
  const n = useCountUp(value, isInView);
  return (
    <div className="p-5 rounded-xl border flex flex-col items-center gap-2">
      <Icon className="size-5 text-primary" />
      <div className="text-2xl font-bold text-primary tabular-nums">
        {n}
        {suffix ?? "+"}
      </div>
      <div className="text-xs text-muted-foreground text-center">{label}</div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const { t } = useI18n();

  const icons = [Award, Users, BriefcaseBusiness, ThumbsUp] as const;

  const translateLabel = (lbl: (typeof stats)[number]["label"]): string => {
    switch (lbl) {
      case "Tajriba yillari":
        return t("stat_years");
      case "Hamkorlar":
        return t("stat_partners");
      case "Joylashtirilganlar":
        return t("stat_placed");
      case "Qoniqish darajasi":
        return t("stat_satisfaction");
    }
  };

  return (
    <section ref={sectionRef} className="py-12 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t("stats_title")}</h2>
          <p className="text-sm text-muted-foreground">{t("stats_desc")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={"suffix" in s ? s.suffix : undefined}
              label={translateLabel(s.label)}
              icon={icons[i % icons.length]}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
