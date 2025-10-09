"use client";

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
      return {
        ...it,
        role: t(roleKey),
        text: t(textKey),
      };
    });
  }, [t]);
  const [idx, setIdx] = useState(0);
  const total = testimonials.length;
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  const [targetIdx, setTargetIdx] = useState<number | null>(null);
  const [slideStarted, setSlideStarted] = useState(false);

  const effectiveTargetIdx = targetIdx ?? (idx + 1) % total;
  const current = testimonials[idx];
  const target = testimonials[effectiveTargetIdx];
  function prev() {
    if (isAnimating) return;
    const to = (idx - 1 + total) % total;
    setDirection("prev");
    setTargetIdx(to);
    setIsAnimating(true);
    // Trigger transform transition on mobile in the next frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideStarted(true));
    });
    setTimeout(() => {
      setIdx(to);
      setIsAnimating(false);
      setTargetIdx(null);
      setSlideStarted(false);
    }, 500);
  }
  function next() {
    if (isAnimating) return;
    const to = (idx + 1) % total;
    setDirection("next");
    setTargetIdx(to);
    setIsAnimating(true);
    // Trigger transform transition on mobile in the next frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideStarted(true));
    });
    setTimeout(() => {
      setIdx(to);
      setIsAnimating(false);
      setTargetIdx(null);
      setSlideStarted(false);
    }, 500);
  }

  function goTo(target: number) {
    if (target === idx || isAnimating) return;
    const isNext = (target - idx + total) % total <= (idx - target + total) % total;
    setDirection(isNext ? "next" : "prev");
    setTargetIdx(target);
    setIsAnimating(true);
    // Trigger transform transition on mobile in the next frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideStarted(true));
    });
    setTimeout(() => {
      setIdx(target);
      setIsAnimating(false);
      setTargetIdx(null);
      setSlideStarted(false);
    }, 500);
  }

  // Auto-advance with pause on hover/focus
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, idx, total]);

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
      {/* Mobile: single item with left slide */}
      <div className="overflow-hidden sm:hidden">
        {!isAnimating && (
          <figure className="p-6 rounded-2xl bg-card shadow-md border border-border/60 relative">
            <Quote className="absolute top-4 left-4 text-primary/30" />
            <blockquote className="font-pt text-foreground/90 leading-relaxed mt-6">
              “{current.text}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              <img
                src={`https://picsum.photos/seed/face-${current.name}-${idx}/64/64`}
                alt={current.name}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-medium text-foreground">{current.name}</div>
                <div>{current.role}</div>
              </div>
            </figcaption>
          </figure>
        )}

        {isAnimating && (
          <div
            className={`flex transition-transform duration-500 ease-out ${slideStarted ? "-translate-x-full" : "translate-x-0"}`}
          >
            <figure className="p-6 rounded-2xl bg-card shadow-md border border-border/60 relative shrink-0 basis-full">
              <Quote className="absolute top-4 left-4 text-primary/30" />
              <blockquote className="font-pt text-foreground/90 leading-relaxed mt-6">
                “{current.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                <img
                  src={`https://picsum.photos/seed/face-${current.name}-${idx}/64/64`}
                  alt={current.name}
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-medium text-foreground">{current.name}</div>
                  <div>{current.role}</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 rounded-2xl bg-card shadow-md border border-border/60 relative shrink-0 basis-full">
              <Quote className="absolute top-4 left-4 text-primary/30" />
              <blockquote className="font-pt text-foreground/90 leading-relaxed mt-6">
                “{target.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                <img
                  src={`https://picsum.photos/seed/face-${target.name}-${effectiveTargetIdx}/64/64`}
                  alt={target.name}
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-medium text-foreground">{target.name}</div>
                  <div>{target.role}</div>
                </div>
              </figcaption>
            </figure>
          </div>
        )}
      </div>

      {/* Tablet/Desktop: 3 items view with one-by-one slide */}
      <div className="hidden sm:block">
        {/* Static view when not animating */}
        {!isAnimating && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials
              .slice(idx)
              .concat(testimonials.slice(0, idx))
              .slice(0, 3)
              .map((t, i) => (
                <figure
                  key={t.name + i}
                  className="p-6 rounded-2xl bg-card shadow-md border border-border/60 relative"
                >
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
              ))}
          </div>
        )}
        {/* Animated sliding track when transitioning */}
        {isAnimating && (
          <div className="relative overflow-hidden">
            <div
              className={`flex gap-6 transition-transform duration-500 ease-out ${
                direction === "next"
                  ? slideStarted
                    ? "-translate-x-[calc((100%-48px)/3+24px)]"
                    : "translate-x-0"
                  : slideStarted
                    ? "translate-x-0"
                    : "-translate-x-[calc((100%-48px)/3+24px)]"
              }`}
            >
              {/* Build 4 cards for sliding window: current 3 + next/prev 1 */}
              {(() => {
                const order = testimonials.slice(idx).concat(testimonials.slice(0, idx));
                const windowItems =
                  direction === "next"
                    ? order.slice(0, 4)
                    : [order[(total - 1) % total], ...order.slice(0, 3)];
                return windowItems.map((t, i) => (
                  <figure
                    key={t.name + i + direction}
                    className="shrink-0 grow-0 basis-[calc((100%-48px)/3)] p-6 rounded-2xl bg-card shadow-md border border-border/60 relative"
                  >
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
                ));
              })()}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Slayd ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 w-4 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </section>
  );
}
