"use client";

import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, LinkedinIcon, SendIcon } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <div className="inline-flex items-center">
            <span className="sr-only">ConsultingUZ</span>
            <Image
              src="/consulting-logo.png"
              alt="ConsultingUZ logo"
              width={36}
              height={36}
              className="dark:hidden"
            />
            <Image
              src="/consultinguz-white.png"
              alt="ConsultingUZ logo"
              width={36}
              height={36}
              className="hidden dark:inline"
            />
            <span className="ml-2 font-bold text-lg">consultinguz</span>
          </div>
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
              <Link className="hover:underline" href="/about/career">
                {t("nav_career")}
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
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">{t("footer_socials")}</div>
          <div className="flex gap-3 text-muted-foreground">
            <Link aria-label="LinkedIn" href="#" className="hover:text-foreground">
              <LinkedinIcon />
            </Link>
            <Link aria-label="Telegram" href="#" className="hover:text-foreground">
              <SendIcon />
            </Link>
            <Link aria-label="Instagram" href="#" className="hover:text-foreground">
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        {t("footer_rights")}
      </div>
    </footer>
  );
}
