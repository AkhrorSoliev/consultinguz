"use client";

import Image from "next/image";
import { useI18n } from "@/components/providers/translation-provider";

export default function FounderCard() {
  const { t } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 lg:gap-10 p-6 md:p-8 rounded-2xl bg-card border">
        <div className="relative shrink-0 w-[200px] sm:w-[280px] md:w-[380px] aspect-[4/5] mx-auto md:mx-0">
          <Image
            src="/herr-orif.jpg"
            alt={t("founder_alt")}
            fill
            className="rounded-2xl object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center mt-4 md:mt-0 text-center md:text-left max-w-2xl mx-auto md:mx-0">
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/80">
            {"\u201C"}{t("founder_quote")}{"\u201D"}
          </p>

          <div className="mt-6 flex flex-col items-center md:items-end gap-1">
            <div className="text-base font-semibold">Herr Orif Akhmadaliev</div>
            <div className="text-sm text-muted-foreground">{t("founder_role")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
