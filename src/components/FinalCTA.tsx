"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

export default function FinalCTA() {
  const { t } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-xl md:text-2xl font-bold">{t("cta_title")}</h3>
          <p className="font-pt opacity-90">{t("cta_desc")}</p>
        </div>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
          <Link href="/contact">
            <MessageSquare className="size-4" />
            <span>{t("cta_button")}</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
