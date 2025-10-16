"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";
import { Section, SectionHeader } from "@/components/ui/section";

const FluidGlass = dynamic(() => import("@/components/FluidGlass"), {
  ssr: false,
  loading: () => null,
});

export default function FinalCTA() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Section as="section" variant="brand">
      <div className="relative">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {mounted && isProd ? <FluidGlass mode="lens" /> : null}
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
