"use client";

import { useI18n } from "@/components/providers/translation-provider";

export default function ForJobseekers() {
  const { t: tt } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">{tt("job_title")}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card shadow-lg">
          <h3 className="font-semibold">{tt("job_fields")}</h3>
          <p className="text-muted-foreground">{tt("job_fields_desc")}</p>
        </div>
        <div className="p-6 rounded-2xl bg-card shadow-lg">
          <h3 className="font-semibold">{tt("job_steps")}</h3>
          <p className="text-muted-foreground">{tt("job_steps_desc")}</p>
        </div>
        <div className="p-6 rounded-2xl bg-card shadow-lg">
          <h3 className="font-semibold">{tt("job_support")}</h3>
          <p className="text-muted-foreground">{tt("job_support_desc")}</p>
        </div>
      </div>
    </section>
  );
}
