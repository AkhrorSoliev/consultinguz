"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const HERO_TRANSITION = { duration: 0.9, ease: EASE_OUT_EXPO };
const PILLS_TRANSITION = { duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO };

export type PageHeroPill = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

type PageHeroProps = {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pills?: PageHeroPill[];
  align?: "left" | "center";
};

export default function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  pills,
  align = "left",
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-slate-950/55" />
      </div>
      <div className="relative max-w-7xl mx-auto w-full px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          className={
            isCenter
              ? "max-w-3xl mx-auto text-center space-y-6"
              : "max-w-3xl space-y-8"
          }
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={HERO_TRANSITION}
        >
          {eyebrow ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-4">
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl">
                {subtitle}
              </p>
            ) : null}
          </div>
          {pills && pills.length > 0 ? (
            <motion.div
              className={
                isCenter
                  ? "flex flex-wrap justify-center gap-2"
                  : "flex flex-wrap gap-2"
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={PILLS_TRANSITION}
            >
              {pills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
