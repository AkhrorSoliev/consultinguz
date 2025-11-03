"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  chipTitles: string[];
};

export default function ProcessHero({ chipTitles }: Props) {
  return (
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
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            Prozess
          </span>
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
            Recruitingprozess
          </h1>
          <p className="text-balance text-lg sm:text-xl leading-relaxed text-white/85 max-w-3xl mx-auto">
            Transparent, schnell und verständlich – in fünf klaren Schritten zum Erfolg.
          </p>
          <motion.div className="flex flex-wrap justify-center gap-2">
            {chipTitles.slice(0, 3).map((title) => (
              <motion.span
                key={title}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <span className="font-semibold text-white">{title}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


