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
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-2xl mx-auto space-y-5 text-center"
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-primary"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            {t("hero_desc")}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            <Button asChild size="lg">
              <Link href="/services/employers">
                <Users className="size-4" />
                <span>{t("hero_cta_employers")}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services/jobseekers">
                <Briefcase className="size-4" />
                <span>{t("hero_cta_jobseekers")}</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <AboutBrief />
      </div>
    </section>
  );
}
