"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";

export default function AnalyticsGate() {
  const { consent, mounted } = useCookieConsent();
  if (!mounted || !consent?.functional) return null;
  return <Analytics />;
}
