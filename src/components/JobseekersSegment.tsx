"use client";

import {
  BadgeCheck,
  Workflow,
  LifeBuoy,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useReveal } from "@/lib/reveal";
import { useI18n } from "@/components/providers/translation-provider";

function Feature({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="p-5 rounded-xl border transition hover:border-primary/30">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-primary" />
        <div className="font-semibold">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function JobseekersSegment({ showCta = true }: { showCta?: boolean }) {
  const { t } = useI18n();
  const cand = [
    {
      icon: BadgeCheck,
      title: t("job_verified") ?? "Tasdiqlangan ishlar",
      desc: t("job_verified_desc") ?? "Ishonchli hamkorlar bilan tekshirilgan bo'sh ish o'rinlari.",
    },
    {
      icon: Workflow,
      title: t("job_steps"),
      desc: t("job_steps_desc"),
    },
    {
      icon: LifeBuoy,
      title: t("job_support"),
      desc: t("job_support_desc"),
    },
  ];

  const candReveal = useReveal<HTMLDivElement>();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div
        ref={candReveal.ref}
        className={`transition duration-300 ${candReveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
            {t("seg_jobseekers_title")}
          </h2>
          <p className="text-muted-foreground mt-2 text-pretty max-w-prose mx-auto">
            {t("seg_jobseekers_desc")}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cand.map((f) => (
            <Feature key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
        {showCta && (
          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-primary/10 transition"
            >
              {t("seg_now")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
