"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useI18n } from "@/components/providers/translation-provider";

export default function ComingSoon({ pageName, pageKey }: { pageName?: string; pageKey?: string }) {
  const { t } = useI18n();
  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {pageKey ? t(pageKey) : (pageName ?? t("soon_generic_title"))}
        </h1>
        <p className="text-muted-foreground">
          {pageName ? t("soon_page_in_progress") : t("soon_section_in_progress")}
        </p>
        <Button size="lg" asChild aria-label={t("back_home")}>
          <Link href="/">{t("back_home")}</Link>
        </Button>
      </div>
    </section>
  );
}
