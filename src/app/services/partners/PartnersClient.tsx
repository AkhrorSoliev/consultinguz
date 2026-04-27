"use client";

import Link from "next/link";
import { Handshake, ShieldCheck, Globe } from "lucide-react";
import PageHero, { type PageHeroPill } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

export default function PartnersClient() {
  const { t } = useI18n();

  const pills: PageHeroPill[] = [
    { icon: Handshake, label: t("partners_pill_companies") },
    { icon: ShieldCheck, label: t("partners_pill_verified") },
    { icon: Globe, label: t("partners_pill_languages") },
  ];

  return (
    <>
      <PageHero
        image="/sections/partners.jpg"
        title={t("partners_hero_title")}
        subtitle={t("partners_hero_subtitle")}
        pills={pills}
      />
      <Section variant="subtle">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <p className="text-muted-foreground">{t("soon_page_in_progress")}</p>
          <Button size="lg" asChild aria-label={t("back_home")}>
            <Link href="/">{t("back_home")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
