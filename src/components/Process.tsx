"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  UserRoundCheck,
  Briefcase,
  FileCheck2,
  Plane,
  Home,
  CheckCircle2,
} from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";
import { Section, SectionHeader } from "@/components/ui/section";
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
  const stepLabel = lang === "de" ? "Schritt" : "Bosqich";
  const sectionTitle = lang === "de" ? "So gehen wir vor" : "Qanday ishlaymiz";
  const sectionSubtitle =
    lang === "de"
      ? "Vom ersten Gespräch bis zur Integration – jede Phase ist klar definiert und persönlich begleitet."
      : "Birinchi suhbatdan integratsiyagacha — har bir bosqich aniq va shaxsiy hamrohlik bilan.";
  const completionText =
    lang === "de"
      ? "In jeder Phase persönlich an Ihrer Seite – transparent, planbar und verbindlich."
      : "Har bir bosqichda yoningizdamiz — shaffof, rejali va ishonchli.";

  return (
    <Section>
      <SectionHeader
        align="left"
        eyebrow={lang === "de" ? "Prozess" : "Jarayon"}
        title={sectionTitle}
        subtitle={sectionSubtitle}
      />
      <div className="mx-auto max-w-3xl">
        <ol className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.li
                key={s.title}
                className="relative pl-16 pb-8 last:pb-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.06, 0.3),
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-10 inline-flex size-12 items-center justify-center rounded-full bg-background ring-1 ring-border shadow-sm"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                </span>
                <article className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-sm transition-colors hover:border-primary/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                      {stepLabel} {num}
                    </span>
                    <span className="text-3xl font-bold leading-none text-muted-foreground/15 tabular-nums">
                      {num}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          className="mt-6 ml-16 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="size-5" />
          </span>
          <p className="text-sm text-foreground/90 leading-relaxed">{completionText}</p>
        </motion.div>
      </div>
    </Section>
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
          <div className="absolute inset-0 bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-slate-950/55" />
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
            <div className="space-y-4">
              <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
                {t("process_title")}
              </h1>
              <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl">
                {t("process_desc")}
              </p>
            </div>
            <motion.div className="flex flex-wrap gap-2">
              {steps.slice(0, 4).map((s) => {
                const Icon = s.icon;
                return (
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
                    <Icon className="size-4" />
                    <span className="font-semibold text-white">{s.title}</span>
                  </motion.span>
                );
              })}
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
