"use client";

import { ConsultationProvider } from "@/components/providers/consultation-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-provider";
import { TranslationProvider } from "@/components/providers/translation-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <CookieConsentProvider>
        <ConsultationProvider>{children}</ConsultationProvider>
      </CookieConsentProvider>
    </TranslationProvider>
  );
}
