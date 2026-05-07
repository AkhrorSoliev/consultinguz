"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ScrollText,
  Building2,
  MapPin,
  Mail,
  Phone,
  UserRoundCheck,
  FileBadge,
  ShieldCheck,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

const COMPANY_OWNER = "Orif Akhmadaliev";
const COMPANY_NAME = "ConsultingUZ";
const COMPANY_STREET = "Alemannenweg 6";
const COMPANY_CITY = "72488 Sigmaringen";
const COMPANY_COUNTRY = "Deutschland";
const COMPANY_EMAIL = "orif.ahmadaliyev@consultinguz.de";
const COMPANY_PHONE = "+49 176 238 97 113";

// TODO: Daten werden vom Auftraggeber noch geliefert.
//   - Registereintrag (Handelsregister): Registergericht + Registernummer
//   - Umsatzsteuer-ID nach §27a UStG
//   - Aufsichtsbehörde

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const HERO_TRANSITION = { duration: 0.9, ease: EASE_OUT_EXPO };
const PILLS_TRANSITION = { duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO };

export default function ImpressumClient() {
  const { lang } = useI18n();
  const c = lang === "de" ? DE : UZ;

  const heroPills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }> = [
    { icon: ScrollText, label: c.pill_tmg },
    { icon: ShieldCheck, label: c.pill_legal },
  ];

  const sections: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: React.ReactNode;
  }> = [
    {
      icon: UserRoundCheck,
      title: c.vertreten_title,
      body: (
        <>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {c.vertreten_label}
          </p>
          <p className="text-sm font-medium mt-1">{COMPANY_OWNER}</p>
        </>
      ),
    },
    {
      icon: FileBadge,
      title: c.content_responsible_title,
      body: (
        <address className="not-italic text-sm font-medium leading-relaxed">
          {COMPANY_OWNER}
          <br />
          {COMPANY_NAME}
          <br />
          {COMPANY_STREET}
          <br />
          {COMPANY_CITY}
          <br />
          {COMPANY_COUNTRY}
        </address>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sections/impressum.jpg"
            alt="Impressum backdrop"
            fill
            priority
            className="pointer-events-none object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-slate-950/55" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={HERO_TRANSITION}
          >
            <div className="space-y-4">
              <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
                {c.title}
              </h1>
              <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl">
                {c.subtitle}
              </p>
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={PILLS_TRANSITION}
            >
              {heroPills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center rounded-md bg-primary/10 text-primary size-9">
                  <Building2 className="size-5" />
                </span>
                <h2 className="text-lg font-semibold">{c.address_title}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{c.address_intro}</p>
              <ul className="space-y-4">
                <InfoRow icon={Building2} label={c.label_company}>
                  <span className="flex flex-col">
                    <span>{COMPANY_OWNER}</span>
                    <span>{COMPANY_NAME}</span>
                  </span>
                </InfoRow>
                <InfoRow icon={MapPin} label={c.label_address}>
                  <span className="flex flex-col">
                    <span>{COMPANY_STREET}</span>
                    <span>{COMPANY_CITY}</span>
                    <span>{COMPANY_COUNTRY}</span>
                  </span>
                </InfoRow>
                <InfoRow icon={Mail} label={c.label_email}>
                  <a href={`mailto:${COMPANY_EMAIL}`} className="hover:underline break-all">
                    {COMPANY_EMAIL}
                  </a>
                </InfoRow>
                <InfoRow icon={Phone} label={c.label_phone}>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`}
                    className="hover:underline"
                  >
                    {COMPANY_PHONE}
                  </a>
                </InfoRow>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-4">
            {sections.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center rounded-md bg-primary/10 text-primary size-10">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold mb-2">{title}</h3>
                    {body}
                  </div>
                </div>
              </article>
            ))}

            <p className="text-xs text-muted-foreground pt-2">{c.disclaimer}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-medium break-words">{children}</div>
      </div>
    </li>
  );
}

const DE = {
  title: "Impressum",
  subtitle: "Angaben gemäß § 5 TMG",
  pill_tmg: "§ 5 TMG",
  pill_legal: "Rechtliche Hinweise",
  address_title: "Anschrift",
  address_intro: "Anbieter dieser Website ist:",
  label_company: "Unternehmen",
  label_address: "Adresse",
  label_email: "E-Mail",
  label_phone: "Telefon",
  vertreten_title: "Vertreten durch",
  vertreten_label: "Vertretungsberechtigter Geschäftsführer:",
  content_responsible_title:
    "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
  disclaimer:
    "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
};

const UZ = {
  title: "Kompaniya ma'lumotlari",
  subtitle: "§ 5 TMG (Germaniya qonunchiligi) bo'yicha ma'lumotlar",
  pill_tmg: "§ 5 TMG",
  pill_legal: "Huquqiy ma'lumotlar",
  address_title: "Manzil",
  address_intro: "Ushbu saytning egasi:",
  label_company: "Kompaniya",
  label_address: "Manzil",
  label_email: "Email",
  label_phone: "Telefon",
  vertreten_title: "Vakil shaxs",
  vertreten_label: "Vakolatli direktor:",
  content_responsible_title:
    "§ 55-modda 2-band RStV bo'yicha kontent uchun mas'ul",
  disclaimer:
    "Tashqi havolalar mazmuni biz tomonidan diqqat bilan tekshirilgan bo'lsa-da, ularning keyingi o'zgarishi uchun javobgarlik faqat tegishli sayt egalariga yuklanadi.",
};
