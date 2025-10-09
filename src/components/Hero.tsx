"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, Users } from "lucide-react";
import AboutBrief from "./AboutBrief";
import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/translation-provider";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden h-[100svh] -mt-16 flex items-center justify-center">
      {/* Background image + subtle overlay */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0 bg-center bg-cover opacity-90 dark:opacity-100"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
      </div>
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,51,153,0.18),transparent_60%)] blur-2xl opacity-80 dark:opacity-30" />
      <div className="pointer-events-none absolute top-6 -right-16 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.35),transparent_60%)] blur-2xl opacity-90 dark:opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,51,153,0.12),transparent_60%)] blur-2xl opacity-80 dark:opacity-30" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-0 pb-24 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-3xl mx-auto space-y-6 text-center"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium mx-auto"
          >
            {t("hero_pill")}
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="text-[clamp(30px,4.5vw,52px)] font-bold leading-tight tracking-tight text-primary"
          >
            {t("hero_title")}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="font-pt text-[clamp(16px,2.2vw,20px)] text-muted-foreground mx-auto"
          >
            {t("hero_desc")}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/services/jobseekers">
                <Briefcase className="size-4" />
                <span>{t("hero_cta_jobseekers")}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/services/employers">
                <Users className="size-4" />
                <span>{t("hero_cta_employers")}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* AboutBrief anchored to the bottom of the hero without affecting centered content */}
      <div className="absolute inset-x-0 bottom-0">
        <AboutBrief />
      </div>
    </section>
  );
}
