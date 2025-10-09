"use client";

import { useReveal } from "@/lib/reveal";
import { useI18n } from "@/components/providers/translation-provider";

export default function AboutBrief() {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { t } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        ref={ref}
        className={`transition duration-300 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <p className="text-lg text-center mx-auto max-w-3xl">{t("about_brief")}</p>
      </div>
    </section>
  );
}
