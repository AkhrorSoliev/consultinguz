"use client";

import Link from "next/link";
import { Languages, HeartHandshake, Award } from "lucide-react";
import PageHero, { type PageHeroPill } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

export default function TeamClient() {
  const { t } = useI18n();

  const pills: PageHeroPill[] = [
    { icon: Languages, label: t("team_pill_multilingual") },
    { icon: HeartHandshake, label: t("team_pill_personal") },
    { icon: Award, label: t("team_pill_experienced") },
  ];

  return (
    <>
      <PageHero
        image="/sections/team.jpg"
        title={t("team_hero_title")}
        subtitle={t("team_hero_subtitle")}
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
