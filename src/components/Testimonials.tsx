"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { testimonials as baseTestimonials } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

export default function Testimonials() {
  const { t } = useI18n();
  const testimonials = useMemo(() => {
    return baseTestimonials.map((it, i) => {
      const roleKey =
        it.role === "Ish beruvchi" ? "testimonial_role_employer" : "testimonial_role_jobseekers";
      const textKey = `testimonial_${i + 1}_text`;
      const localizedText = t(textKey);
      return {
        ...it,
        role: t(roleKey),
        text: localizedText === textKey ? it.text : localizedText,
      };
    });
  }, [t]);

  const [slidesToShow, setSlidesToShow] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 480) setSlidesToShow(1);
      else if (w <= 768) setSlidesToShow(2);
      else if (w <= 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const total = testimonials.length;
  const ANIMATION_MS = 500;
  const track = useMemo(() => [...testimonials, ...testimonials, ...testimonials], [testimonials]);
  const [index, setIndex] = useState(total);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    if (index >= total * 2) {
      const id = setTimeout(() => {
        setDisableTransition(true);
        setIndex((i) => i - total);
        requestAnimationFrame(() => setDisableTransition(false));
      }, ANIMATION_MS);
      return () => clearTimeout(id);
    }
    if (index < total) {
      const id = setTimeout(() => {
        setDisableTransition(true);
        setIndex((i) => i + total);
        requestAnimationFrame(() => setDisableTransition(false));
      }, ANIMATION_MS);
      return () => clearTimeout(id);
    }
  }, [index, total]);

  useEffect(() => {
    setDisableTransition(true);
    setIndex(total);
    requestAnimationFrame(() => setDisableTransition(false));
  }, [total]);

  const cardWidthPercent = 100 / slidesToShow;
  const transformStyle = `translateX(-${index * cardWidthPercent}%)`;

  const prev = () => setIndex((i) => i - 1);
  const next = () => setIndex((i) => i + 1);

  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  const lastStart = Math.max(0, total - slidesToShow);
  const normalizedStart = (((index - total) % total) + total) % total;
  const currentStart = Math.min(normalizedStart, lastStart);
  const pageCount = lastStart + 1;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance">
          {t("testimonials_title")}
        </h2>
        <p className="text-muted-foreground mt-2 text-pretty max-w-prose mx-auto">
          {t("testimonials_desc")}
        </p>
      </div>
      <div className="flex justify-center sm:justify-end mb-2">
        <div className="flex gap-2">
          <button
            aria-label="Oldingi"
            className="size-9 rounded-full border grid place-items-center"
            onClick={prev}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Keyingi"
            className="size-9 rounded-full border grid place-items-center"
            onClick={next}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="-mx-3 flex will-change-transform"
          style={{
            transform: transformStyle,
            transition: disableTransition ? "none" : "transform 500ms ease",
          }}
        >
          {track.map((item, i) => (
            <div
              key={item.name + i}
              className="px-3"
              style={{ minWidth: `${cardWidthPercent}%` }}
            >
              <figure className="flex flex-col justify-between rounded-xl border p-5 h-full">
                <blockquote className="text-sm text-muted-foreground leading-relaxed">
                  {"\u201C"}{item.text}{"\u201D"}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <Image
                    src={`https://picsum.photos/seed/face-${item.name}-${i}/64/64`}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full size-10 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div>{item.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-1">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            aria-label={`Sahifa ${i + 1}`}
            onClick={() => setIndex(total + i)}
            className={`h-1.5 w-4 rounded-full transition-colors ${i === currentStart ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </section>
  );
}
