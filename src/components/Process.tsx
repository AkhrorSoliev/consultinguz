"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, UserRoundCheck, Briefcase, FileCheck2, Plane, Home } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";
import { type ComponentType } from "react";

function buildSteps(t: (k: string) => string, lang: string) {
  if (lang === "de") {
    // Loaded from src/process.txt content, adapted for UI cards
    return [
      {
        title: "Analyse Ihres Personalbedarfs",
        desc: "Im ersten Schritt führen wir ein Gespräch mit Ihnen, um Ihren Personalbedarf hinsichtlich einer Zeitachse und des entsprechenden Bedarfs zu bestimmen.",
        icon: FileText,
      },
      {
        title: "Anforderungsprofile für die Bewerber",
        desc: "Wir besprechen mit Ihnen gemeinsam, welche Arbeitserfahrungen und Sprachkenntnisse Ihre zukünftigen Mitarbeiter mitbringen müssen, um Ihren Betrieb ideal zu unterstützen.",
        icon: UserRoundCheck,
      },
      {
        title: "Vorstellungsgespräche, Sprachausbildung und Anerkennung",
        desc: "Wir stellen Ihnen die ersten Kandidaten vor und bereiten diese durch fachspezifische Sprachkurse und die Einleitung der beruflichen Anerkennung ihres Abschlusses in Deutschland auf den Arbeitsbeginn vor.",
        icon: Briefcase,
      },
      {
        title: "Visum, Einreise",
        desc: "Wir organisieren die Termine bei der deutschen Botschaft und die Einreise Ihrer Fachkräfte und unterstützen alle Beteiligten bei bürokratischen Prozessen.",
        icon: Plane,
      },
      {
        title: "Betreuung und Integration",
        desc: "Wir unterstützen Sie und die Fachkräfte bzw. Auszubildenden beim Onboarding und bei der Integration vor Ort.",
        icon: Home,
      },
    ] as const;
  }

  if (lang === "uz") {
    return [
      {
        title: "Kadrlar ehtiyojini tahlil qilish",
        desc: "Dastlab siz bilan suhbat oʻtkazib, vaqt jadvali va zarur ehtiyojlaringizni aniqlaymiz.",
        icon: FileText,
      },
      {
        title: "Nomzodlar uchun talab profillari",
        desc: "Boʻlajak xodimlaringiz qanday ish tajribasi va til koʻnikmalariga ega boʻlishi kerakligini birgalikda belgilaymiz.",
        icon: UserRoundCheck,
      },
      {
        title: "Suhbatlar, til oʻqitish va malakani tan olish",
        desc: "Dastlabki nomzodlarni tanishtiramiz, soha boʻyicha til kurslarini tashkil etamiz va Germaniyada kasbiy malakani tan olish jarayonini boshlaymiz.",
        icon: Briefcase,
      },
      {
        title: "Viza va kirib kelish",
        desc: "Germaniya elchixonasidagi uchrashuvlar va safarni tashkil qilamiz, byurokratik jarayonlarda yordam beramiz.",
        icon: Plane,
      },
      {
        title: "Qoʻllab-quvvatlash va integratsiya",
        desc: "Onboardingda hamda joyida moslashuv va integratsiyada sizni va mutaxassislarni qoʻllab-quvvatlaymiz.",
        icon: Home,
      },
    ] as const;
  }

  return [
    { title: t("step_apply_title"), desc: t("step_apply_desc"), icon: FileText },
    { title: t("step_internal_title"), desc: t("step_internal_desc"), icon: UserRoundCheck },
    { title: t("step_employer_title"), desc: t("step_employer_desc"), icon: Briefcase },
    { title: t("step_docs_title"), desc: t("step_docs_desc"), icon: FileCheck2 },
    { title: t("step_visa_title"), desc: t("step_visa_desc"), icon: Plane },
    { title: t("step_onboard_title"), desc: t("step_onboard_desc"), icon: Home },
  ] as const;
}

type StepItem = {
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
};
function VerticalProcessList({ steps, lang }: { steps: readonly StepItem[]; lang: string }) {
  return (
    <section className="relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ol className="relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === steps.length - 1;
            const gid = `v-connector-${i}`;
            const rightCurve = i % 2 === 0;
            const path = rightCurve
              ? "M310 0 C 540 10 540 110 310 120"
              : "M310 0 C 80 10 80 110 310 120";
            const tiltClass =
              i % 2 === 0
                ? "md:-rotate-[0.8deg] md:-translate-x-1"
                : "md:rotate-[0.8deg] md:translate-x-1";
            return (
              <li key={s.title} className="relative">
                <motion.div
                  className={`relative mx-auto w-full rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow transition-transform ${tiltClass}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary size-10 shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                        {(lang === "de" ? "Schritt" : "Bosqich") + " " + (i + 1)}
                      </div>
                      <h3 className="mt-1 text-lg sm:text-xl font-bold text-foreground">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {!isLast && (
                  <motion.svg
                    aria-hidden
                    className="my-2 mx-auto block h-[120px] w-[620px] max-w-full"
                    viewBox="0 0 620 120"
                    preserveAspectRatio="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <defs>
                      <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                        <stop offset="50%" stopColor="rgba(59,130,246,0.7)" />
                        <stop offset="100%" stopColor="rgba(59,130,246,0.25)" />
                      </linearGradient>
                      <filter id={`${gid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke={`url(#${gid})`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      filter={`url(#${gid}-glow)`}
                    />
                    <motion.circle
                      cx="310"
                      cy="0"
                      r="4"
                      fill={`url(#${gid})`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    />
                    <motion.circle
                      cx="310"
                      cy="120"
                      r="4"
                      fill={`url(#${gid})`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    />
                  </motion.svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function Process() {
  const { t, lang } = useI18n();
  const steps = buildSteps(t, lang);
  return (
    <div className="min-h-screen bg-background">
      {/* HERO — styled like MissionContent hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sections/prozess.jpg"
            alt="Prozess backdrop"
            fill
            priority
            className="pointer-events-none object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-slate-900/30 to-slate-900/60 dark:from-primary/30 dark:via-slate-900/60 dark:to-slate-950" />
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
              {lang === "de" ? "Prozess" : "Jarayon"}
            </span>
            <div className="space-y-4">
              <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
                {t("process_title")}
              </h1>
              <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl">
                {t("process_desc")}
              </p>
            </div>
            <motion.div className="flex flex-wrap gap-2">
              {steps.slice(0, 4).map((s) => (
                <motion.span
                  key={s.title}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <span className="font-semibold text-white">{s.title}</span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-1/2 bottom-6 sm:bottom-10 -translate-x-1/2 flex flex-col items-center text-white/85"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <motion.span
              className="relative flex h-12 w-8 items-start justify-center rounded-full bg-white/5 p-1 ring-1 ring-inset ring-white/30"
              animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/5 blur-sm" />
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Vertical connected steps */}
      <VerticalProcessList steps={steps as readonly StepItem[]} lang={lang} />
    </div>
  );
}
