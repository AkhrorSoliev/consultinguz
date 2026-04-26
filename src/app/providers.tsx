"use client";

import { ConsultationProvider } from "@/components/providers/consultation-provider";
import { TranslationProvider } from "@/components/providers/translation-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsultationProvider>
      <TranslationProvider>{children}</TranslationProvider>
    </ConsultationProvider>
  );
}
