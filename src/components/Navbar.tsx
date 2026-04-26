"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Globe,
  Menu,
  Phone,
  Target,
  Users,
  Handshake,
  Workflow,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useI18n } from "@/components/providers/translation-provider";

const linkBase =
  "px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none";

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLang } = useI18n();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  const mainLinks: Array<{ href: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { href: "/about/mission", label: t("nav_mission"), icon: Target },
    { href: "/about/team", label: t("nav_team"), icon: Users },
    { href: "/services/partners", label: t("nav_partners"), icon: Handshake },
    { href: "/services/process", label: t("nav_process"), icon: Workflow },
    { href: "/contact", label: t("nav_contact"), icon: Phone },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur bg-background/80 supports-[backdrop-filter]:bg-background/60 border-b"
      role="banner"
    >
      <div className="hidden md:block border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center gap-4 text-xs">
          <Link
            href="/services/employers"
            className={cn(
              "rounded-md px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors",
              isActive("/services/employers") && "text-foreground bg-primary/10"
            )}
          >
            {t("nav_employers")}
          </Link>
          <Link
            href="/services/jobseekers"
            className={cn(
              "rounded-md px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors",
              isActive("/services/jobseekers") && "text-foreground bg-primary/10"
            )}
          >
            {t("nav_jobseekers")}
          </Link>
        </div>
      </div>

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <Link href="/" className="inline-flex items-center" aria-label="ConsultingUZ bosh sahifa">
          <span className="sr-only">ConsultingUZ</span>
          <Image
            src="/consulting-logo.png"
            alt="ConsultingUZ logo"
            width={32}
            height={32}
            priority
          />
          <span className="ml-2 font-bold text-lg">consultinguz</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                linkBase,
                "inline-flex items-center gap-2 whitespace-nowrap hover:bg-primary/10",
                isActive(href) && "bg-primary/10"
              )}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle forcedLang={lang} onChangeLang={setLang} />
        </div>

        <div className="md:hidden">
          <MobileMenu isActive={isActive} t={t} lang={lang} onChangeLang={setLang} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

type LanguageCode = "uz" | "de";

function LanguageToggle({
  forcedLang,
  onChangeLang,
}: {
  forcedLang?: LanguageCode;
  onChangeLang?: (v: LanguageCode) => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [language, setLanguage] = React.useState<LanguageCode>("uz");

  React.useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("lang")) as LanguageCode | null;
    const initial: LanguageCode = stored === "uz" || stored === "de" ? stored : "uz";
    setLanguage(forcedLang ?? initial);
  }, [forcedLang]);

  const handleChange = (value: LanguageCode) => {
    setLanguage(value);
    try {
      window.localStorage.setItem("lang", value);
    } catch {}
    onChangeLang?.(value);
  };

  if (!mounted) return null;

  const labelMap: Record<LanguageCode, string> = { uz: "UZ", de: "DE" };
  const fullMap: Record<LanguageCode, string> = { uz: "O'zbekcha", de: "Deutsch" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Change language">
          <Globe className="size-4" />
          <span>{labelMap[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Til</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(v) => handleChange(v as LanguageCode)}
        >
          <DropdownMenuRadioItem value="uz">{fullMap.uz}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="de">{fullMap.de}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
type IsActiveFn = (href: string) => boolean;

function MobileMenu({
  isActive,
  t,
  lang,
  onChangeLang,
}: {
  isActive: IsActiveFn;
  t: (k: string) => string;
  lang: LanguageCode;
  onChangeLang: (v: LanguageCode) => void;
}) {
  const items: Array<{ href: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { href: "/services/employers", label: t("nav_employers"), icon: Users },
    { href: "/services/jobseekers", label: t("nav_jobseekers"), icon: Users },
    { href: "/about/mission", label: t("nav_mission"), icon: Target },
    { href: "/about/team", label: t("nav_team"), icon: Users },
    { href: "/services/partners", label: t("nav_partners"), icon: Handshake },
    { href: "/services/process", label: t("nav_process"), icon: Workflow },
    { href: "/contact", label: t("nav_contact"), icon: Phone },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-base font-medium">Menu</SheetTitle>
        </SheetHeader>

        <nav className="p-2" aria-label="Mobile Primary">
          <ul className="px-1 space-y-1">
            {items.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <SheetClose asChild>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm hover:bg-primary/10",
                      isActive(href) && "bg-primary/10"
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t flex items-center gap-2">
          <LanguageToggle forcedLang={lang} onChangeLang={onChangeLang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
