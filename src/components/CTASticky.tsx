"use client";

import { MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/components/providers/consultation-provider";

export default function CTASticky() {
  const { open } = useConsultation();
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Button
        onClick={open}
        className="rounded-2xl shadow-lg hover:shadow-md text-sm md:text-base"
        aria-label="Open Free Consultation"
      >
        <MessageSquareIcon className="mr-2" /> Free Consultation
      </Button>
    </div>
  );
}
