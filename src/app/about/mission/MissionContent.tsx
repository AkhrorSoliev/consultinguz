"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Home,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

type BilingualCopy = {
  de: string;
  uz: string;
};

type Highlight = {
  icon: LucideIcon;
  title: BilingualCopy;
  description: BilingualCopy;
};

type Module = {
  step: string;
  title: BilingualCopy;
  description: BilingualCopy;
  icon: LucideIcon;
};

type ServiceBlock = {
  title: BilingualCopy;
  bullets: BilingualCopy[];
  icon: LucideIcon;
};

type ExtendedService = {
  icon: LucideIcon;
  copy: BilingualCopy;
};

const revealAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const heroHighlights: BilingualCopy[] = [
  {
    de: "Rekrutierung",
    uz: "Rekruting",
  },
  {
    de: "Sprach- & Fachtraining",
    uz: "Til va kasbiy tayyorgarlik",
  },
  {
    de: "Visa & Anerkennung",
    uz: "Viza va tan olish",
  },
  {
    de: "Integration",
    uz: "Integratsiya",
  },
];

const missionHighlights: Highlight[] = [
  {
    icon: Users,
    title: {
      de: "Ganzheitliche Begleitung",
      uz: "Bosqichma-bosqich hamroh bo'lamiz",
    },
    description: {
      de: "Wir analysieren Ihren Personalbedarf, wählen Kandidaten gezielt aus und bereiten sie sprachlich wie fachlich auf ihre Rolle vor.",
      uz: "Kadr ehtiyojingizni o‘rganib, mos nomzodlarni tanlaymiz va ularni til hamda kasbiy jihatdan lavozimga tayyorlaymiz.",
    },
  },
  {
    icon: ShieldCheck,
    title: {
      de: "Verlässliche Prozesse",
      uz: "Ishonchli jarayonlar",
    },
    description: {
      de: "Von Behördenwegen bis zu Visa-Terminen – wir managen Formalitäten transparent und termingerecht.",
      uz: "Idoralar bilan yozishmalar va viza uchrashuvlaridan tortib barcha rasmiy jarayonlarni shaffof va o‘z vaqtida olib boramiz.",
    },
  },
  {
    icon: Handshake,
    title: {
      de: "Partnerschaften auf Augenhöhe",
      uz: "Hamkorlik va ishonch",
    },
    description: {
      de: "Wir schaffen langfristige Bindungen – für Unternehmen wie für internationale Fachkräfte.",
      uz: "Korporativ mijozlar hamda xalqaro mutaxassislar uchun uzoq muddatli hamkorlikni ta'minlaymiz.",
    },
  },
];

const modules: Module[] = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: {
      de: "Bedarf verstehen",
      uz: "Ehtiyojni aniqlash",
    },
    description: {
      de: "Wir definieren gemeinsam Rollenprofile, Kompetenzen und gewünschte Sprachniveaus.",
      uz: "Birgalikda rollar, zarur ko‘nikmalar va til darajalarini aniqlab olamiz.",
    },
  },
  {
    step: "02",
    icon: GraduationCap,
    title: {
      de: "Sprach- & Fachtraining",
      uz: "Til va kasbiy o‘sish",
    },
    description: {
      de: "Intensivkurse bereiten Kandidaten auf B1+ sowie branchenspezifische Fachsprache vor.",
      uz: "Intensiv kurslar nomzodlarni B1+ darajasiga va soha terminlariga tayyorlaydi.",
    },
  },
  {
    step: "03",
    icon: Plane,
    title: {
      de: "Visa & Anerkennung",
      uz: "Viza va tan olish",
    },
    description: {
      de: "Wir koordinieren Termine mit Botschaften, Behörden und Anerkennungsstellen.",
      uz: "Elchixona, idoralar va tan olish tashkilotlari bilan uchrashuvlarni muvofiqlashtiramiz.",
    },
  },
  {
    step: "04",
    icon: Home,
    title: {
      de: "Ankommen & Integration",
      uz: "Kelish va moslashish",
    },
    description: {
      de: "Von Wohnraumsuche bis Bankkonto – wir machen den Start in Deutschland leicht.",
      uz: "Uy-joy topishdan bank hisob ochishigacha Germaniyadagi dastlabki qadamlarni yengillashtiramiz.",
    },
  },
];

const serviceBlocks: ServiceBlock[] = [
  {
    icon: ClipboardCheck,
    title: {
      de: "Administration",
      uz: "Administrativ qo‘llab-quvvatlash",
    },
    bullets: [
      {
        de: "Vorbereitung und Einreichung aller Unterlagen bei Behörden und Agenturen.",
        uz: "Hujjatlarni tayyorlab, idoralarga va agentliklarga topshirib boramiz.",
      },
      {
        de: "Status-Tracking bis zur Arbeitserlaubnis und Aufenthaltserteilung.",
        uz: "Ishlash va yashash ruxsatnomasi tasdiqlanguncha jarayonni nazorat qilamiz.",
      },
    ],
  },
  {
    icon: Users,
    title: {
      de: "Auswahlverfahren",
      uz: "Saralash jarayoni",
    },
    bullets: [
      {
        de: "Mehrstufiges Assessment mit Kompetenzprofilen und Cultural-Fit-Prüfung.",
        uz: "Bir necha bosqichli baholash, kompetensiya profili va madaniy moslik tekshiruvi.",
      },
      {
        de: "Endgültige Entscheidung gemeinsam mit Ihrem Team.",
        uz: "So‘nggi qaror sizning jamoangiz bilan hamkorlikda qabul qilinadi.",
      },
    ],
  },
  {
    icon: Handshake,
    title: {
      de: "Rollenverständnis",
      uz: "Rolni anglash",
    },
    bullets: [
      {
        de: "Workshops für Führungskräfte und Teams zur erfolgreichen Integration.",
        uz: "Rahbarlar va jamoalar uchun integratsiyani qo‘llab-quvvatlovchi workshoplar.",
      },
      {
        de: "Begleitung im Alltag für Kandidaten und Arbeitgeber.",
        uz: "Nomzodlar va ish beruvchilarga kundalik hayotda hamroh bo‘lamiz.",
      },
    ],
  },
];

const extendedServices: ExtendedService[] = [
  {
    icon: Users,
    copy: {
      de: "Erstgespräche und gezielte Auswahl der Kandidatinnen und Kandidaten.",
      uz: "Birinchi suhbatlar va mos nomzodlarni aniq saralash.",
    },
  },
  {
    icon: GraduationCap,
    copy: {
      de: "Fundierte Sprachausbildung – Ankunft mit B1+ Niveau.",
      uz: "Chuqurlashtirilgan til kurslari – nomzodlar B1+ darajada yetib keladi.",
    },
  },
  {
    icon: ShieldCheck,
    copy: {
      de: "Vorbereitung der Unterlagen für die Bundesagentur für Arbeit.",
      uz: "Germaniya Mehnat agentligi uchun barcha hujjatlarni tayyorlash.",
    },
  },
  {
    icon: Plane,
    copy: {
      de: "Koordination der Botschaftstermine in Usbekistan.",
      uz: "O‘zbekistonidagi elchixona uchrashuvlarini muvofiqlashtirish.",
    },
  },
  {
    icon: ShieldCheck,
    copy: {
      de: "Reise- und Krankenversicherung über exklusive Partner.",
      uz: "Eksklyuziv hamkor orqali safar va tibbiy sug‘urta bilan ta'minlash.",
    },
  },
  {
    icon: Home,
    copy: {
      de: "Integration vor Ort: Bankkonto, tägliche Begleitung, Wohnungssuche.",
      uz: "Germaniyada moslashuv: bank hisobi, kundalik ko‘mak, uy-joy izlash.",
    },
  },
  {
    icon: Sparkles,
    copy: {
      de: "Komplette Organisation von Einreise und Visa-Prozessen.",
      uz: "Kelish va viza jarayonlarini to‘liq tashkil qilish.",
    },
  },
];

function BilingualBody({ copy }: { copy: BilingualCopy }) {
  const { lang } = useI18n();
  return (
    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
      {lang === "de" ? copy.de : copy.uz}
    </p>
  );
}

export default function MissionContent() {
  const { lang } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sections/mission.jpg"
            alt="Mission backdrop"
            fill
            priority
            className="pointer-events-none object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-slate-900/60 to-slate-950" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <motion.div
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
              {lang === "de" ? "Mission" : "Missiya"}
            </span>
            <div className="space-y-4">
              <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
                {lang === "de"
                  ? "Menschen verbinden, Zukunft gestalten"
                  : "Insonlarni bog‘lab, kelajakni yaratamiz"}
              </h1>
              <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl">
                {lang === "de"
                  ? "Wir sichern Unternehmen verlässliche Fachkräfte, indem wir Rekrutierung, Qualifizierung und Integration unter einem Dach vereinen."
                  : "Biz rekruting, tayyorgarlik va integratsiyani yagona tizimda birlashtirib, kompaniyalarga barqaror va ishonchli mutaxassislarni taqdim etamiz."}
              </p>
            </div>
            <motion.div className="flex flex-wrap gap-2">
              {heroHighlights.map((copy) => (
                <motion.span
                  key={copy.de}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <span className="font-semibold text-white">
                    {lang === "de" ? copy.de : copy.uz}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section>
        <SectionHeader
          align="left"
          eyebrow={lang === "de" ? "Mission" : "Missiya"}
          title={lang === "de" ? "Was uns antreibt" : "Missiyamiz"}
          subtitle={
            lang === "de" ? (
              <span className="block">
                Unsere Mission macht internationale HR-Projekte greifbar und nachhaltig – für
                Arbeitgeber und Kandidaten gleichermaßen.
              </span>
            ) : (
              <span className="block text-foreground/80">
                Missiyamiz xalqaro HR loyihalarini ish beruvchilar va nomzodlar uchun birdek
                tushunarli, barqaror va natijali qiladi.
              </span>
            )
          }
          titleClassName="leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 after:block after:h-1 after:w-16 after:rounded-full after:bg-primary/40 after:mt-3"
          subtitleClassName="mt-4 text-base sm:text-lg text-foreground/80 max-w-3xl"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {missionHighlights.map((item, index) => (
            <motion.div
              key={item.title.de}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 via-background to-background p-8 shadow-sm transition-colors hover:border-primary/40"
              {...revealAnimation}
              transition={{ ...revealAnimation.transition, delay: index * 0.1 }}
            >
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {lang === "de" ? item.title.de : item.title.uz}
                  </h3>
                </div>
                <BilingualBody copy={item.description} />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="subtle">
        <SectionHeader
          eyebrow={
            lang === "de" ? "Modulares Bereitstellungsmodell" : "Modulli taqdim etish modeli"
          }
          title={lang === "de" ? "Flexibel. Planbar. Wirkungsvoll." : "Moslashuvchan va natijali"}
          subtitle={
            lang === "de" ? (
              <span className="block">
                Sie bestimmen das Ziel – wir orchestrieren Recruiting, Qualifizierung und
                Integration Schritt für Schritt.
              </span>
            ) : (
              <span className="block text-foreground/80">
                Siz yo‘nalishni belgilaysiz, biz esa rekruting, tayyorgarlik va integratsiyani
                bosqichma-bosqich uyg‘unlashtiramiz.
              </span>
            )
          }
          align="left"
          titleClassName="leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 after:block after:h-1 after:w-16 after:rounded-full after:bg-primary/40 after:mt-3"
          subtitleClassName="mt-4 text-base sm:text-lg text-foreground/80 max-w-3xl"
        />
        <div className="grid gap-6 lg:grid-cols-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.title.de}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-background p-6 shadow-sm"
              {...revealAnimation}
              transition={{ ...revealAnimation.transition, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-muted-foreground/40">{module.step}</span>
                <module.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {lang === "de" ? module.title.de : module.title.uz}
                </h3>
                <BilingualBody copy={module.description} />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={lang === "de" ? "Begleitung" : "Qo‘llab-quvvatlash"}
          title={
            lang === "de" ? "Wobei wir Sie entlasten" : "Qaysi yo‘nalishlarda yengillik beramiz"
          }
          subtitle={
            lang === "de" ? (
              <span className="block">
                Administrative Entlastung, saubere Auswahlprozesse und echte Integrationserfolge.
              </span>
            ) : (
              <span className="block text-foreground/80">
                Administrativ yukni kamaytiramiz, saralash jarayonini shaffof qilamiz va real
                integratsiya natijalariga erishamiz.
              </span>
            )
          }
          align="left"
          titleClassName="leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 after:block after:h-1 after:w-16 after:rounded-full after:bg-primary/40 after:mt-3"
          subtitleClassName="mt-4 text-base sm:text-lg text-foreground/80 max-w-3xl"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceBlocks.map((block, index) => (
            <motion.div
              key={block.title.de}
              className="flex h-full flex-col rounded-3xl border border-border/40 bg-background p-7 shadow-sm"
              {...revealAnimation}
              transition={{ ...revealAnimation.transition, delay: index * 0.08 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <block.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {lang === "de" ? block.title.de : block.title.uz}
                  </h3>
                </div>
              </div>
              <ul className="mt-6 space-y-6">
                {block.bullets.map((bullet) => (
                  <li key={bullet.de} className="space-y-3 rounded-2xl bg-muted/40 p-4">
                    <BilingualBody copy={bullet} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <SectionHeader
          eyebrow={lang === "de" ? "Leistungen" : "Xizmatlar"}
          title={lang === "de" ? "Was Sie konkret erwarten dürfen" : "Aniq natijalar"}
          subtitle={
            lang === "de" ? (
              <span className="block">
                Wir liefern messbare Ergebnisse und kümmern uns um alle Details – vor, während und
                nach der Einreise.
              </span>
            ) : (
              <span className="block text-foreground/80">
                Kelishdan avval, davomida va keyin ham biz aniq o‘lchanadigan natijalarni taqdim
                etib, barcha mayda detallarni boshqaramiz.
              </span>
            )
          }
          align="left"
          titleClassName="leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 after:block after:h-1 after:w-16 after:rounded-full after:bg-primary/40 after:mt-3"
          subtitleClassName="mt-4 text-base sm:text-lg text-foreground/80 max-w-3xl"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {extendedServices.map((service, index) => (
            <motion.div
              key={service.copy.de}
              className="group flex gap-4 rounded-3xl border border-border/40 bg-background p-6 shadow-sm transition hover:border-primary/50"
              {...revealAnimation}
              transition={{ ...revealAnimation.transition, delay: index * 0.06 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20">
                <service.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <BilingualBody copy={service.copy} />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary to-slate-900 p-10 text-white shadow-lg">
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {lang === "de" ? "Partnerschaft, die trägt" : "Barqaror hamkorlik"}
              </h2>
              <p className="text-lg text-white/80">
                {lang === "de"
                  ? "Wir reagieren flexibel auf Marktanforderungen in Gesundheitswesen, Sozialbereich, Tourismus, Transportlogistik sowie Industrie und Handwerk."
                  : "Sog‘liqni saqlash, ijtimoiy soha, turizm, logistika, sanoat va hunarmandchilikdagi talablaringizga moslashib, siz bilan birga barqaror natija yaratamiz."}
              </p>
            </div>
            <motion.div
              className="rounded-3xl bg-white/10 p-6 backdrop-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <div className="space-y-4">
                {heroHighlights.map((copy) => (
                  <div
                    key={copy.de}
                    className="flex flex-col gap-1 rounded-2xl bg-white/5 px-4 py-3"
                  >
                    <span className="text-base font-semibold">
                      {lang === "de" ? copy.de : copy.uz}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
