"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Users } from "lucide-react";
import AboutBrief from "./AboutBrief";
import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/translation-provider";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden h-[100svh] -mt-16 flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24 md:pb-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-2xl mx-auto space-y-5 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-primary"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            {t("hero_desc")}
          </motion.p>
          <motion.div
            variants={itemVariants}
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
