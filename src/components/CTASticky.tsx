"use client";

import { MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/components/providers/consultation-provider";
import { useI18n } from "@/components/providers/translation-provider";

export default function CTASticky() {
  const { open } = useConsultation();
  const { t } = useI18n();
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Button
        onClick={open}
        className="rounded-2xl shadow-lg hover:shadow-md text-sm md:text-base"
        aria-label={t("cta_form_title")}
      >
        <MessageSquareIcon className="mr-2" /> {t("cta_button")}
      </Button>
    </div>
  );
}
