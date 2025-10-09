"use client";

import {
  Briefcase,
  FileCheck2,
  UsersRound,
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
    <div className="p-5 rounded-2xl bg-card shadow transition hover:shadow-lg border ring-1 ring-transparent hover:ring-primary/10 hover:-translate-y-[2px]">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 text-primary size-9">
          <Icon className="size-4" />
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="font-pt text-sm text-muted-foreground mt-3 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Segments() {
  const { t } = useI18n();
  const emp = [
    {
      icon: Briefcase,
      title: t("emp_hire"),
      desc: t("emp_hire_desc"),
    },
    {
      icon: FileCheck2,
      title: t("emp_docs"),
      desc: t("emp_docs_desc"),
    },
    {
      icon: UsersRound,
      title: t("emp_extra"),
      desc: t("emp_extra_desc"),
    },
  ];
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

  const empReveal = useReveal<HTMLDivElement>();
  const candReveal = useReveal<HTMLDivElement>();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        <div
          ref={empReveal.ref}
          className={`transition duration-300 ${empReveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t("seg_employers_title")}</h2>
            <p className="font-pt text-muted-foreground">{t("seg_employers_desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emp.map((f) => (
              <Feature key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services/employers"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-primary/10 transition"
            >
              {t("seg_details")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div
          ref={candReveal.ref}
          className={`transition duration-300 ${candReveal.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t("seg_jobseekers_title")}</h2>
            <p className="font-pt text-muted-foreground">{t("seg_jobseekers_desc")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cand.map((f) => (
              <Feature key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services/jobseekers"
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-primary/10 transition"
            >
              {t("seg_now")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
