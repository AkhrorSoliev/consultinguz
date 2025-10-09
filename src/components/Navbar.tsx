"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
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
import { Globe, Laptop, Moon, Sun, Menu, Briefcase, Info, ShieldCheck, Phone } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useI18n } from "@/components/providers/translation-provider";

const linkBase =
  "px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none";

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLang } = useI18n();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur bg-background/80 supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/50 border-b"
      role="banner"
    >
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
            className="dark:hidden"
          />
          <Image
            src="/consultinguz-white.png"
            alt="ConsultingUZ logo"
            width={32}
            height={32}
            priority
            className="hidden dark:inline"
          />
          <span className="ml-2 font-bold text-lg">consultinguz</span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent inline-flex items-center gap-2">
                  <Briefcase className="size-4" />
                  <span>{t("nav_services")}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2">
                  <ul className="grid gap-1 p-1 w-64">
                    {[
                      ["/services/employers", t("nav_employers")],
                      ["/services/jobseekers", t("nav_jobseekers")],
                      ["/services/partners", t("nav_partners")],
                      ["/services/process", t("nav_process")],
                    ].map(([href, label]) => (
                      <li key={href}>
                        <NavigationMenuLink asChild active={isActive(href)}>
                          <Link
                            href={href}
                            className={cn(
                              "block rounded-md px-3 py-2 hover:bg-primary/10",
                              isActive(href) && "bg-primary/10"
                            )}
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent inline-flex items-center gap-2">
                  <Info className="size-4" />
                  <span>{t("nav_about")}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2">
                  <ul className="grid gap-1 p-1 w-64">
                    {[
                      ["/about/mission", t("nav_mission")],
                      ["/about/career", t("nav_career")],
                      ["/about/team", t("nav_team")],
                    ].map(([href, label]) => (
                      <li key={href}>
                        <NavigationMenuLink asChild active={isActive(href)}>
                          <Link
                            href={href}
                            className={cn(
                              "block rounded-md px-3 py-2 hover:bg-primary/10",
                              isActive(href) && "bg-primary/10"
                            )}
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/compliance"
                    className={cn(
                      linkBase,
                      "flex flex-row items-center gap-2 whitespace-nowrap",
                      isActive("/compliance") && "bg-primary/10"
                    )}
                  >
                    <ShieldCheck className="size-4" />
                    <span>{t("nav_compliance")}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className={cn(
                      linkBase,
                      "flex flex-row items-center gap-2 whitespace-nowrap",
                      isActive("/contact") && "bg-primary/10"
                    )}
                  >
                    <Phone className="size-4" />
                    <span>{t("nav_contact")}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
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

type ThemeChoice = "light" | "dark" | "system";

function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<ThemeChoice>("system");

  // Apply the theme to the <html> element
  const applyTheme = React.useCallback((choice: ThemeChoice) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const systemPrefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldUseDark = choice === "dark" || (choice === "system" && systemPrefersDark);

    root.classList.toggle("dark", shouldUseDark);
    root.style.colorScheme = shouldUseDark ? "dark" : "light";
  }, []);

  // Initialize from localStorage / system
  React.useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("theme")) as ThemeChoice | null;
    const initial: ThemeChoice =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setTheme(initial);
    applyTheme(initial);

    // Keep in sync with system preference when using system
    const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const handler = () => {
      if (initial === "system") applyTheme("system");
    };
    media?.addEventListener?.("change", handler);
    return () => media?.removeEventListener?.("change", handler);
  }, [applyTheme]);

  const handleChange = (value: ThemeChoice) => {
    setTheme(value);
    try {
      window.localStorage.setItem("theme", value);
    } catch {}
    applyTheme(value);
  };

  if (!mounted) return null;

  const isDarkNow =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {isDarkNow ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Mavzu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => handleChange(v as ThemeChoice)}>
          <DropdownMenuRadioItem value="light">
            <Sun className="size-4" /> Yorug&apos;
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="size-4" /> Qorong&apos;i
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="size-4" /> Tizim
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
  }, []);

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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <div className="p-6 border-b"></div>

        <nav className="p-2 space-y-4" aria-label="Mobile Primary">
          <div className="space-y-1">
            <div className="px-3 text-xs font-medium text-muted-foreground uppercase inline-flex items-center gap-2">
              <Briefcase className="size-3.5" />
              <span>{t("nav_services")}</span>
            </div>
            <ul className="px-1">
              {[
                ["/services/employers", t("nav_employers")],
                ["/services/jobseekers", t("nav_jobseekers")],
                ["/services/partners", t("nav_partners")],
                ["/services/process", t("nav_process")],
              ].map(([href, label]) => (
                <li key={href}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-primary/10",
                        isActive(href) && "bg-primary/10"
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <div className="px-3 text-xs font-medium text-muted-foreground uppercase inline-flex items-center gap-2">
              <Info className="size-3.5" />
              <span>{t("nav_about")}</span>
            </div>
            <ul className="px-1">
              {[
                ["/about/mission", t("nav_mission")],
                ["/about/career", t("nav_career")],
                ["/about/team", t("nav_team")],
              ].map(([href, label]) => (
                <li key={href}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-primary/10",
                        isActive(href) && "bg-primary/10"
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-1 space-y-2">
            <SheetClose asChild>
              <Link
                href="/compliance"
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm hover:bg-primary/10",
                  isActive("/compliance") && "bg-primary/10"
                )}
              >
                <ShieldCheck className="size-4" />
                <span>{t("nav_compliance")}</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/contact"
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm hover:bg-primary/10",
                  isActive("/contact") && "bg-primary/10"
                )}
              >
                <Phone className="size-4" />
                <span>{t("nav_contact")}</span>
              </Link>
            </SheetClose>
          </div>
        </nav>

        <div className="mt-auto p-4 border-t flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle forcedLang={lang} onChangeLang={onChangeLang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
