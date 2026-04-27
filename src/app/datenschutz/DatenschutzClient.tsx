"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  MapPin,
  Mail,
  Phone,
  ServerCog,
  MessageSquare,
  UserRoundCheck,
  Cookie,
  Lock,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

const COMPANY_NAME = "consultinguz.uz";
const COMPANY_ADDRESS = "Alemannenweg 6, 72488 Sigmaringen, Deutschland";
const COMPANY_EMAIL = "orif.ahmadaliyev@consultinguz.de";
const COMPANY_PHONE = "+49 176 238 97 113";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const HERO_TRANSITION = { duration: 0.9, ease: EASE_OUT_EXPO };
const PILLS_TRANSITION = { duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO };

export default function DatenschutzClient() {
  const { lang } = useI18n();
  const c = lang === "de" ? DE : UZ;

  const topics: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
  }> = [
      { icon: ShieldCheck, title: c.intro_title, body: c.intro_body },
      { icon: ServerCog, title: c.collection_title, body: c.collection_body },
      { icon: MessageSquare, title: c.contact_form_title, body: c.contact_form_body },
      { icon: UserRoundCheck, title: c.rights_title, body: c.rights_body },
      { icon: Cookie, title: c.cookies_title, body: c.cookies_body },
    ];

  const heroPills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }> = [
      { icon: ShieldCheck, label: c.pill_dsgvo },
      { icon: Lock, label: c.pill_secure },
    ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sections/compliance.jpg"
            alt="Datenschutz backdrop"
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
              <p className="text-sm text-white/60">{c.updated}</p>
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
                <h2 className="text-lg font-semibold">{c.responsible_title}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{c.responsible_intro}</p>
              <ul className="space-y-4">
                <InfoRow icon={Building2} label={c.label_company}>
                  <span>{COMPANY_NAME}</span>
                </InfoRow>
                <InfoRow icon={MapPin} label={c.label_address}>
                  <span>{COMPANY_ADDRESS}</span>
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
            {topics.map(({ icon: Icon, title, body }) => (
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
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
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
  eyebrow: "Datenschutz",
  pill_dsgvo: "DSGVO-konform",
  pill_secure: "Sicher gespeichert",
  pill_transparent: "Transparent",
  title: "Datenschutzerklärung",
  subtitle:
    "Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Nachfolgend informieren wir Sie über die Erhebung und Verwendung personenbezogener Daten bei der Nutzung unserer Website.",
  updated: "Stand: April 2026",
  responsible_title: "Verantwortliche Stelle",
  responsible_intro: "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
  label_company: "Unternehmen",
  label_address: "Adresse",
  label_email: "E-Mail",
  label_phone: "Telefon",
  intro_title: "Allgemeines",
  intro_body:
    "Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst und behandeln Ihre Daten vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften und dieser Datenschutzerklärung.",
  collection_title: "Erhebung und Speicherung personenbezogener Daten",
  collection_body:
    "Beim Besuch unserer Website werden automatisch Informationen an unseren Server übermittelt und temporär in einer Logdatei gespeichert: IP-Adresse, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Referrer-URL, verwendeter Browser sowie Ihr Betriebssystem.",
  contact_form_title: "Kontaktformular",
  contact_form_body:
    "Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive Kontaktdaten zwecks Bearbeitung der Anfrage und für Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  rights_title: "Ihre Rechte",
  rights_body:
    "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Verarbeitung. Außerdem haben Sie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.",
  cookies_title: "Cookies",
  cookies_body:
    "Unsere Website verwendet Cookies — kleine Textdateien, die Ihr Browser auf Ihrem Endgerät speichert. Sie helfen uns, unser Angebot nutzerfreundlicher und effektiver zu gestalten. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden.",
  disclaimer:
    "Diese Informationen dienen lediglich der allgemeinen Orientierung und ersetzen keine rechtliche Beratung.",
};

const UZ = {
  eyebrow: "Maxfiylik",
  pill_dsgvo: "DSGVO talablariga mos",
  pill_secure: "Xavfsiz saqlanadi",
  pill_transparent: "Shaffof",
  title: "Maxfiylik siyosati",
  subtitle:
    "Shaxsiy ma'lumotlaringiz himoyasiga juda jiddiy yondashamiz. Quyida saytimizdan foydalanish chog'ida shaxsiy ma'lumotlarni yig'ish va undan foydalanish haqida ma'lumot beramiz.",
  updated: "Yangilangan: Aprel 2026",
  responsible_title: "Mas'ul shaxs",
  responsible_intro: "Ushbu saytda ma'lumotlarni qayta ishlash uchun mas'ul shaxs:",
  label_company: "Kompaniya",
  label_address: "Manzil",
  label_email: "Email",
  label_phone: "Telefon",
  intro_title: "Umumiy qoidalar",
  intro_body:
    "Shaxsiy ma'lumotlaringiz himoyasiga juda jiddiy yondashamiz. Ma'lumotlaringiz qonun talablariga muvofiq, maxfiy tarzda va ushbu siyosatga asosan qayta ishlanadi.",
  collection_title: "Shaxsiy ma'lumotlarni yig'ish va saqlash",
  collection_body:
    "Saytimizga tashrif buyurganingizda ba'zi ma'lumotlar avtomatik tarzda serverimizga yuboriladi va vaqtinchalik log faylda saqlanadi: IP-manzil, kirish sanasi va vaqti, olingan fayl nomi va URL, referrer URL, foydalanilgan brauzer va operatsion tizim.",
  contact_form_title: "Aloqa formasi",
  contact_form_body:
    "Aloqa formasi orqali murojaat yuborganingizda, formada ko'rsatgan ma'lumotlaringiz, jumladan kontakt ma'lumotlari, murojaatni ko'rib chiqish va keyingi savollar uchun saqlanadi. Ularni roziligingizsiz uchinchi shaxslarga bermaymiz.",
  rights_title: "Sizning huquqlaringiz",
  rights_body:
    "Siz istalgan vaqtda saqlangan shaxsiy ma'lumotlaringiz, ularning manbai va qabul qiluvchilari hamda qayta ishlash maqsadi to'g'risida bepul ma'lumot olish, shuningdek, ushbu ma'lumotlarni tuzatish, bloklash yoki o'chirish huquqiga egasiz.",
  cookies_title: "Cookie fayllari",
  cookies_body:
    "Saytimizda cookie fayllaridan foydalaniladi — bular brauzeringiz qurilmangizda saqlaydigan kichik matn fayllaridir. Cookie fayllar xizmatimizni qulayroq va samaraliroq qilishga yordam beradi. Brauzeringizni cookie o'rnatilganidan xabar beradigan tarzda sozlashingiz mumkin.",
  disclaimer:
    "Ushbu ma'lumotlar faqat tanishish maqsadida taqdim etilgan va huquqiy maslahat o'rnini bosmaydi.",
};
