"use client";
/* eslint-disable @next/next/no-img-element */

// Use plain img tag to ensure reliable rendering in production
import { Quote } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

export default function FounderCard() {
  const { t } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="relative overflow-hidden flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 md:p-8 rounded-2xl bg-card border shadow-lg">
        {/* Decorative subtle gradients */}
        <div className="hidden sm:block pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,51,153,0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)] blur-2xl" />
        <div className="hidden sm:block pointer-events-none absolute -bottom-12 -right-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.32),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.22),transparent_65%)] blur-2xl" />
        <div className="relative shrink-0 w-[200px] xs:w-[240px] sm:w-[300px] md:w-[420px] aspect-[4/5] mx-auto md:mx-0">
          <img
            src="/herr-orif.jpg"
            alt={t("founder_alt")}
            className="rounded-3xl object-cover shadow-2xl ring-4 ring-primary/15 dark:ring-primary/25 h-full w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-col justify-center mt-4 md:mt-0 text-center md:text-left max-w-2xl mx-auto md:mx-0">
          <div className="flex items-start">
            <Quote aria-hidden className="hidden lg:block size-8 mr-2 mt-0.5 text-primary/30" />
            <p className="font-pt text-lg sm:text-xl md:text-2xl leading-snug text-slate-700 dark:text-slate-200">
              {t("founder_quote")}
            </p>
          </div>
          <p className="font-pt text-base sm:text-lg text-muted-foreground dark:text-slate-300 mt-3 md:mt-4">
            {t("founder_desc")}
          </p>
          <div className="mt-5 flex flex-col items-center md:items-start gap-1.5 md:gap-2.5">
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100">
              Herr Orif Akhmadaliyev
            </div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 shadow-sm">
              {t("founder_role")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
