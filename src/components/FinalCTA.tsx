"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";
import { Section, SectionHeader } from "@/components/ui/section";

export default function FinalCTA() {
  const { t } = useI18n();
  return (
    <Section as="section" variant="brand">
      <div className="relative">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="mx-auto max-w-6xl h-40 blur-[60px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            title={t("cta_title")}
            subtitle={t("cta_desc")}
            titleClassName="text-3xl sm:text-4xl lg:text-5xl"
            subtitleClassName="text-base sm:text-lg text-primary-foreground/90"
            className="mb-0"
          />
          <div className="mt-7">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
            >
              <Link href="/contact">
                <span>{t("cta_button")}</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
