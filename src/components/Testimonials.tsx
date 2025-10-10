"use client";
/* eslint-disable @next/next/no-img-element */

// Use plain img to avoid remote config issues in production
import { useEffect, useMemo, useState } from "react";
import { testimonials as baseTestimonials } from "@/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useI18n } from "@/components/providers/translation-provider";

export default function Testimonials() {
  const { t } = useI18n();
  const testimonials = useMemo(() => {
    // Map static data to localized role/text while keeping names
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

  // Responsive settings
  const [slidesToShow, setSlidesToShow] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setSlidesToShow(1);
      } else if (w <= 768) {
        setSlidesToShow(2);
      } else if (w <= 1024) {
        setSlidesToShow(3);
      } else {
        // default
        setSlidesToShow(4);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Infinite one-by-one sliding track
  const total = testimonials.length;
  const ANIMATION_MS = 500;
  const track = useMemo(() => [...testimonials, ...testimonials, ...testimonials], [testimonials]);
  const [index, setIndex] = useState(total); // start at middle copy
  const [disableTransition, setDisableTransition] = useState(false);

  // Seamless loop correction after animation completes
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

  // Reset to center when data length changes
  useEffect(() => {
    setDisableTransition(true);
    setIndex(total);
    requestAnimationFrame(() => setDisableTransition(false));
  }, [total]);

  const cardWidthPercent = 100 / slidesToShow;
  const transform = `translateX(-${index * cardWidthPercent}%)`;

  const prev = () => setIndex((i) => i - 1);
  const next = () => setIndex((i) => i + 1);

  // Auto-advance with pause on hover/focus (step by 1)
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  // Dots derived from current starting position within one cycle
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t("testimonials_title")}</h2>
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
            transform,
            transition: disableTransition ? "none" : "transform 500ms ease",
          }}
        >
          {track.map((t, i) => (
            <div key={t.name + i} className="px-3" style={{ minWidth: `${cardWidthPercent}%` }}>
              <figure className="p-6 rounded-2xl bg-card shadow-md border border-border/60 relative h-full">
                <Quote className="absolute top-4 left-4 text-primary/30" />
                <blockquote className="font-pt text-foreground/90 leading-relaxed mt-6">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                  <img
                    src={`https://picsum.photos/seed/face-${t.name}-${i}/64/64`}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-medium text-foreground">{t.name}</div>
                    <div>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1">
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
