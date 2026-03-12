"use client";

import { ThemeProvider } from "next-themes";
import { ConsultationProvider } from "@/components/providers/consultation-provider";
import { TranslationProvider } from "@/components/providers/translation-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConsultationProvider>
        <TranslationProvider>{children}</TranslationProvider>
      </ConsultationProvider>
    </ThemeProvider>
  );
}
