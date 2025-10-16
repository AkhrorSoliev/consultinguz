"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useI18n } from "@/components/providers/translation-provider";
import { Section, SectionHeader } from "@/components/ui/section";

export default function ComingSoon({ pageName, pageKey }: { pageName?: string; pageKey?: string }) {
  const { t } = useI18n();
  const isPage = Boolean(pageName || pageKey);
  return (
    <Section className="min-h-[60vh] flex items-center" variant="subtle">
      <div className="text-center max-w-2xl mx-auto">
        <SectionHeader
          align="center"
          title={pageKey ? t(pageKey) : (pageName ?? t("soon_generic_title"))}
          subtitle={isPage ? t("soon_page_in_progress") : t("soon_section_in_progress")}
        />
        <Button size="lg" asChild aria-label={t("back_home")}>
          <Link href="/">{t("back_home")}</Link>
        </Button>
      </div>
    </Section>
  );
}
