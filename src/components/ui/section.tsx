import * as React from "react";
import { cn } from "@/lib/utils";

type SectionVariant = "default" | "subtle" | "muted" | "brand";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: SectionVariant;
  contained?: boolean;
}

export function Section({
  as = "section",
  variant = "default",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const Comp = as as any;

  const backgroundClass =
    variant === "brand"
      ? "bg-primary text-primary-foreground"
      : variant === "muted"
        ? "bg-muted"
        : variant === "subtle"
          ? "bg-secondary"
          : "bg-transparent";

  return (
    <Comp
      className={cn(
        "scroll-mt-24", // anchor offset under sticky navbar
        "py-12 sm:py-16 lg:py-20", // consistent vertical rhythm
        backgroundClass,
        className
      )}
      {...props}
    >
      <div className={cn(contained && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>{children}</div>
    </Comp>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 lg:mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <div className="text-xs sm:text-sm font-medium tracking-wide uppercase text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={cn(
          "text-balance text-2xl sm:text-3xl lg:text-4xl font-bold mt-2",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "text-pretty text-muted-foreground mt-3 max-w-2xl mx-auto",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default Section;
