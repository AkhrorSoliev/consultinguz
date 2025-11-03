"use client";

import { useReveal } from "@/lib/reveal";
import { FileText, UserRoundCheck, Briefcase, FileCheck2, Plane, Home } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

function buildSteps(t: (k: string) => string) {
  return [
    { title: t("step_apply_title"), desc: t("step_apply_desc"), icon: FileText },
    { title: t("step_internal_title"), desc: t("step_internal_desc"), icon: UserRoundCheck },
    { title: t("step_employer_title"), desc: t("step_employer_desc"), icon: Briefcase },
    { title: t("step_docs_title"), desc: t("step_docs_desc"), icon: FileCheck2 },
    { title: t("step_visa_title"), desc: t("step_visa_desc"), icon: Plane },
    { title: t("step_onboard_title"), desc: t("step_onboard_desc"), icon: Home },
  ] as const;
}

export default function Process() {
  const r = useReveal<HTMLDivElement>();
  const { t } = useI18n();
  const steps = buildSteps(t);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 text-center">
        <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
          {t("process_title")}
        </h2>
        <p className="text-pretty text-muted-foreground mt-3 max-w-2xl mx-auto">
          {t("process_desc")}
        </p>
      </div>
      <div
        ref={r.ref}
        className={`transition duration-300 ${r.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        {/* Mobile/Tablet: horizontal scroll with snap */}
        <div className="relative md:hidden -mx-4 px-4">
          <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
            <ol className="flex gap-4 pr-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="snap-start shrink-0 w-64 sm:w-72 p-4 rounded-2xl bg-card shadow flex items-start gap-3 border"
                  aria-label={`${i + 1}. ${s.title}`}
                >
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary size-9">
                    <s.icon className="size-4" />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <div className="font-semibold">
                      {i + 1}. {s.title}
                    </div>
                    <div className="text-muted-foreground mt-1">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent" />
        </div>
        {/* Tablet/Desktop: grid; connector line only on lg+ */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-6 h-0.5 bg-border" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-4 rounded-2xl bg-card shadow text-center">
                <div className="mx-auto mb-2 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary size-8">
                  <Icon className="size-4" />
                </div>
                <div className="text-sm font-semibold">
                  {i + 1}. {s.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug px-1">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
