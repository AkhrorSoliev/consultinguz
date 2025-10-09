"use client";

import { useI18n } from "@/components/providers/translation-provider";

export default function ProcessTimeline() {
  const { t } = useI18n();
  const steps = [
    t("step_apply_title"),
    t("step_internal_title"),
    t("step_employer_title"),
    t("step_docs_title"),
    t("step_visa_title"),
    t("step_onboard_title"),
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">{t("process_title")}</h2>
      <ol className="grid md:grid-cols-6 gap-4">
        {steps.map((s, i) => (
          <li key={s} className="p-4 rounded-2xl bg-card shadow-lg">
            <div className="text-primary font-bold">{i + 1}</div>
            <div className="text-sm mt-1">{s}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
