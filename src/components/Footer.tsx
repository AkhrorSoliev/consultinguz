"use client";

import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, LinkedinIcon, SendIcon, YoutubeIcon } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";

export default function Footer() {
  const { t } = useI18n();
  const { openModal: openCookieModal } = useCookieConsent();
  return (
    <footer className="border-t mt-16 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center" aria-label="ConsultingUZ">
            <span className="sr-only">ConsultingUZ</span>
            <Image
              src="/consulting-logo.png"
              alt="ConsultingUZ logo"
              width={32}
              height={32}
            />
            <span className="ml-2 font-bold text-lg">consultinguz</span>
          </Link>
          <p className="text-sm text-muted-foreground">{t("footer_tagline")}</p>
        </div>
        <div>
          <div className="font-semibold mb-3">{t("footer_services")}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/services/employers">
                {t("nav_employers")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/services/jobseekers">
                {t("nav_jobseekers")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/services/partners">
                {t("nav_partners")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/services/process">
                {t("nav_process")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">{t("nav_about")}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/about/mission">
                {t("nav_mission")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/about/team">
                {t("nav_team")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/compliance">
                {t("nav_compliance")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/datenschutz">
                {t("nav_privacy")}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/impressum">
                {t("nav_imprint")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openCookieModal}
                className="hover:underline text-left font-sans"
              >
                {t("nav_cookie_settings")}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">{t("footer_socials")}</div>
          <div className="flex gap-3 text-muted-foreground">
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/consulting-uz-39b908297/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              <LinkedinIcon />
            </a>
            <a
              aria-label="Telegram"
              href="https://t.me/Consulting_UZB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              <SendIcon />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/consulting__uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              <InstagramIcon />
            </a>
            <a
              aria-label="YouTube"
              href="https://www.youtube.com/@consultingUz1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t bg-muted/60 py-4 text-center text-xs text-muted-foreground">
        {t("footer_rights").replace("{{year}}", new Date().getFullYear().toString())}
      </div>
    </footer>
  );
}
