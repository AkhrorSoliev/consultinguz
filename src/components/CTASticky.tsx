"use client";

import { MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/components/providers/consultation-provider";
import { useI18n } from "@/components/providers/translation-provider";

export default function CTASticky() {
  const { open } = useConsultation();
  const { t } = useI18n();
  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Button
        onClick={open}
        size="icon"
        className="rounded-full size-12 shadow-md"
        aria-label={t("cta_form_title")}
      >
        <MessageSquareIcon className="size-5" />
      </Button>
    </div>
  );
}
