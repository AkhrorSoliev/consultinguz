"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

type LanguageCode = "uz" | "de";

type Messages = Record<string, string>;

interface I18nContextValue {
  lang: LanguageCode;
  t: (key: string) => string;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const MESSAGES: Record<LanguageCode, Messages> = {
  uz: {
    // Navbar
    nav_services: "Xizmatlar",
    nav_employers: "Ish beruvchilar",
    nav_jobseekers: "Ish izlovchilar",
    nav_partners: "Hamkorlar",
    nav_process: "Jarayon",
    nav_about: "Biz haqimizda",
    nav_mission: "Missiya",
    nav_career: "Karyera",
    nav_team: "Jamoa",
    nav_compliance: "Muvofiqlik",
    nav_contact: "Aloqa",

    // Hero
    hero_pill: "Xalqaro kadr tanlovi",
    hero_title: "Ish beruvchilar va malakali mutaxassislar o'rtasida ishonchli ko'prik.",
    hero_desc: "Tanlovdan viza va ishga joylashuvgacha — shaffof, tez va ishonchli.",
    hero_cta_jobseekers: "Men ish izlayman",
    hero_cta_employers: "Menga xodimlar kerak",

    // About brief
    about_brief:
      "Biz ish beruvchilarga malakali kadrlani topishda, mutaxassislarga esa ishonchli xalqaro imkoniyatlarga yo'l ko'rsatishda yordam beramiz.",

    // Stats
    stats_title: "Ko'rsatkichlar",
    stats_desc: "Natijalarimiz ishonchingiz uchun.",
    stat_years: "Tajriba yillari",
    stat_partners: "Hamkorlar",
    stat_placed: "Joylashtirilganlar",
    stat_satisfaction: "Qoniqish darajasi",

    // Segments
    seg_employers_title: "Ish beruvchilar",
    seg_employers_desc: "Ishga qabul qilish jarayonini tez, shaffof va ishonchli qiling.",
    seg_details: "Batafsil",
    seg_jobseekers_title: "Ish izlovchilar",
    seg_jobseekers_desc: "Ish topish yo'lini aniq va qulay qiling.",
    seg_now: "Vaqtni boy bermang",

    // Testimonials / Partners
    testimonials_title: "Mijozlar fikri",
    testimonials_desc: "Haqiqiy tajribalar va tasdiqlangan natijalar.",
    partners_title: "Ishonchli hamkorlar",

    // Results
    results_title: "Natijalar",
    results_desc: "Biz orqali ishga joylashgan mutaxassislarimizdan namunalar.",

    // Footer / CTA
    footer_tagline:
      "Biz ish beruvchilarni malakali mutaxassislar bilan bog'laymiz — shaffof, tez va ishonchli.",
    footer_services: "Xizmatlar",
    footer_about: "Biz haqimizda",
    footer_socials: "Ijtimoiy tarmoqlar",
    footer_rights: "© 2025 ConsultingUZ. Barcha huquqlar himoyalangan.",
    cta_title: "Ishonchli hamkor izlayapsizmi?",
    cta_desc: "Bepul maslahat oling va jarayonni bugun boshlang.",
    cta_button: "Bepul maslahat",
    cta_badge_compliance: "Muvofiqlik va shaffoflik",
    cta_badge_consulting: "Hamkorlikka asoslangan maslahat",
    cta_badge_speed: "Tezkor va ishonchli",
    cta_form_title: "Bepul maslahat oling",
    cta_form_desc: "2–3 ish kuni ichida siz bilan bog'lanamiz.",
    cta_bullet_1: "Shaffof jarayon va aniq bosqichlar",
    cta_bullet_2: "Shaxsiy maslahatchi va qo'llab-quvvatlash",
    cta_bullet_3: "Tezkor javob va ishonchli natija",

    // Employers / Jobseekers
    emp_title: "Ish beruvchilar uchun",
    emp_hire: "Kadrlar tanlovi",
    emp_hire_desc: "Turli rollar va sohalar bo'yicha ehtiyojingizga mos nomzodlar.",
    emp_docs: "Viza va hujjatlar yordami",
    emp_docs_desc: "Ruxsatnomalar, muvofiqlik va safar bo'yicha to'liq ko'mak.",
    emp_extra: "Qo'shimcha xizmatlar",
    emp_extra_desc: "Onboarding, trening va ishga joylashuvni muvofiqlashtirish.",
    job_title: "Ish izlovchilar uchun",
    job_fields: "Ish yo'nalishlari",
    job_fields_desc: "Tibbiyot, Qurilish, Xizmat ko'rsatish, Logistika va boshqalar.",
    job_steps: "Ariza bosqichlari",
    job_steps_desc: "CV yuborish → Saralash → Suhbat → Taklif → Viza → Ishga joylashuv.",
    job_support: "Qo'llab-quvvatlash",
    job_support_desc: "Viza bo'yicha yo'l-yo'riq, hujjatlar va ko'chib o'tishga ko'mak.",
    // Testimonials
    testimonial_role_employer: "Ish beruvchi",
    testimonial_role_jobseekers: "Ish izlovchi",
    testimonial_1_text: "Tez va shaffof yollash jarayoni.",
    testimonial_2_text: "A'lo darajadagi viza va ko'chish yordami.",
    testimonial_3_text: "Professional muloqot va natijalar.",
    testimonial_4_text: "Jarayon juda tushunarli va qulay bo'ldi.",
    testimonial_5_text: "Nomzodlar sifati kutilganidan yuqori edi.",
    testimonial_6_text: "Hujjatlar bo'yicha to'liq ko'mak oldim.",
    // Candidate listing extras
    job_verified: "Tasdiqlangan ishlar",
    job_verified_desc: "Ishonchli hamkorlar bilan tekshirilgan bo'sh ish o'rinlari.",

    // Founder
    founder_quote:
      "Bizning maqsadimiz — intilish va imkoniyatni shaffof va samarali tarzda bog'lash.",
    founder_desc:
      "Bu qarash bizning har bir hamkorlik va jarayondagi yondashuvimizning markazida. Nomzodlar uchun aniq yo'l xaritasi, ish beruvchilar uchun esa natijaga yo'naltirilgan, halol va mas'uliyatli hamkorlikni ta'minlaymiz.",
    founder_role: "Kompaniya Direktori",
    founder_alt: "Kompaniya direktori Orif Akhmadaliyev",

    // Process
    process_title: "Jarayon",
    process_desc: "Har bir bosqich aniq va tushunarli.",
    step_apply_title: "Ariza topshirish",
    step_apply_desc: "CV va asosiy ma'lumotlarni yuboring.",
    step_internal_title: "Ichki suhbat",
    step_internal_desc: "Mutaxassislarimiz bilan dastlabki suhbat.",
    step_employer_title: "Ish beruvchi bilan suhbat",
    step_employer_desc: "Ish beruvchi bilan kasbiy suhbat.",
    step_docs_title: "Hujjatlarni tayyorlash",
    step_docs_desc: "Shartnoma, ruxsatnoma va boshqa hujjatlar.",
    step_visa_title: "Viza va safar",
    step_visa_desc: "Viza olish, parvoz va ko'chish rejalari.",
    step_onboard_title: "Ishga joylashuv",
    step_onboard_desc: "Borib joylashish va moslashuvga ko'mak.",

    // Coming soon
    soon_generic_title: "Tez orada!",
    soon_page_in_progress: "Ushbu sahifa ishlab chiqilmoqda. Qo'shimcha ma'lumot uchun bog'laning.",
    soon_section_in_progress: "Bu bo'lim ishlab chiqilmoqda. Qo'shimcha ma'lumot uchun bog'laning.",
    back_home: "Asosiy sahifaga qaytish",
  },
  de: {
    // Navbar
    nav_services: "Leistungen",
    nav_employers: "Arbeitgeber",
    nav_jobseekers: "Arbeitssuchende",
    nav_partners: "Partner",
    nav_process: "Prozess",
    nav_about: "Über uns",
    nav_mission: "Mission",
    nav_career: "Karriere",
    nav_team: "Team",
    nav_compliance: "Compliance",
    nav_contact: "Kontakt",

    // Hero
    hero_pill: "Internationale Personalvermittlung",
    hero_title:
      "Die vertrauenswürdige Brücke zwischen Arbeitgebern und qualifizierten Fachkräften.",
    hero_desc:
      "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
    hero_cta_jobseekers: "Ich suche einen Job",
    hero_cta_employers: "Ich suche Mitarbeiter",

    // About brief
    about_brief:
      "Wir unterstützen Arbeitgeber bei der Suche nach qualifizierten Fachkräften und zeigen Kandidaten verlässliche internationale Möglichkeiten.",

    // Stats
    stats_title: "Kennzahlen",
    stats_desc: "Unsere Ergebnisse schaffen Vertrauen.",
    stat_years: "Jahre Erfahrung",
    stat_partners: "Partner",
    stat_placed: "Vermittelte",
    stat_satisfaction: "Zufriedenheit",

    // Segments
    seg_employers_title: "Arbeitgeber",
    seg_employers_desc: "Machen Sie Ihr Recruiting schnell, transparent und zuverlässig.",
    seg_details: "Details",
    seg_jobseekers_title: "Arbeitssuchende",
    seg_jobseekers_desc: "Gestalten Sie die Jobsuche klar und komfortabel.",
    seg_now: "Jetzt starten",

    // Testimonials / Partners
    testimonials_title: "Kundenstimmen",
    testimonials_desc: "Echte Erfahrungen. Verifizierte Ergebnisse.",
    partners_title: "Vertrauensvolle Partner",

    // Results
    results_title: "Ergebnisse",
    results_desc: "Beispiele unserer vermittelten Fachkräfte.",

    // Footer / CTA
    footer_tagline:
      "Wir verbinden Arbeitgeber mit qualifizierten Fachkräften – transparent, schnell und zuverlässig.",
    footer_services: "Leistungen",
    footer_about: "Über uns",
    footer_socials: "Soziale Netzwerke",
    footer_rights: "© 2025 ConsultingUZ. Alle Rechte vorbehalten.",
    cta_title: "Ihr verlässlicher Partner für internationale Fachkräfte",
    cta_desc: "Lassen Sie uns Ihre Anforderungen besprechen – unverbindlich und konkret.",
    cta_button: "Kostenlos beraten lassen",
    cta_badge_compliance: "Compliance & Transparenz",
    cta_badge_consulting: "Beratung auf Augenhöhe",
    cta_badge_speed: "Schnell und zuverlässig",
    cta_form_title: "Kostenlose Beratung anfordern",
    cta_form_desc: "Wir melden uns innerhalb von 2–3 Werktagen.",
    cta_bullet_1: "Transparenter Prozess mit klaren Schritten",
    cta_bullet_2: "Persönliche Beratung und Betreuung",
    cta_bullet_3: "Schnelle Rückmeldung und verlässliche Ergebnisse",

    // Employers / Jobseekers
    emp_title: "Für Arbeitgeber",
    emp_hire: "Personalauswahl",
    emp_hire_desc:
      "Kandidaten passend zu Ihren Anforderungen für verschiedene Rollen und Branchen.",
    emp_docs: "Visum- und Dokumentenhilfe",
    emp_docs_desc: "Genehmigungen, Compliance und Reise – umfassende Unterstützung.",
    emp_extra: "Zusätzliche Leistungen",
    emp_extra_desc: "Onboarding, Training und Koordination der Arbeitsaufnahme.",
    job_title: "Für Arbeitssuchende",
    job_fields: "Arbeitsbereiche",
    job_fields_desc: "Medizin, Bauwesen, Dienstleistungen, Logistik und vieles mehr.",
    job_steps: "Bewerbungsphasen",
    job_steps_desc: "Lebenslauf → Auswahl → Interview → Angebot → Visum → Arbeitsaufnahme.",
    job_support: "Unterstützung",
    job_support_desc: "Anleitung zu Visum, Dokumenten und Unterstützung beim Umzug.",
    // Testimonials
    testimonial_role_employer: "Arbeitgeber",
    testimonial_role_jobseekers: "Arbeitssuchende",
    testimonial_1_text: "Schneller und transparenter Einstellungsprozess.",
    testimonial_2_text: "Hervorragende Unterstützung bei Visum und Umzug.",
    testimonial_3_text: "Professionelle Kommunikation und Ergebnisse.",
    testimonial_4_text: "Der Prozess war sehr verständlich und komfortabel.",
    testimonial_5_text: "Die Qualität der Kandidaten übertraf die Erwartungen.",
    testimonial_6_text: "Ich habe vollständige Unterstützung bei den Unterlagen erhalten.",
    // Candidate listing extras
    job_verified: "Geprüfte Jobs",
    job_verified_desc: "Von vertrauenswürdigen Partnern verifizierte Stellenangebote.",

    // Founder
    founder_quote:
      "Unser Ziel ist es, Ambitionen und Chancen transparent und effizient zu verbinden.",
    founder_desc:
      "Dieser Anspruch steht im Zentrum jeder Zusammenarbeit und jedes Prozesses. Für Kandidaten bieten wir einen klaren Fahrplan, für Arbeitgeber eine ergebnisorientierte, ehrliche und verantwortungsvolle Partnerschaft.",
    founder_role: "Geschäftsführer",
    founder_alt: "Geschäftsführer Orif Akhmadaliyev",

    // Process
    process_title: "Prozess",
    process_desc: "Jeder Schritt ist klar und verständlich.",
    step_apply_title: "Bewerbung einreichen",
    step_apply_desc: "Lebenslauf und Basisdaten senden.",
    step_internal_title: "Internes Gespräch",
    step_internal_desc: "Erstes Gespräch mit unseren Spezialisten.",
    step_employer_title: "Gespräch mit dem Arbeitgeber",
    step_employer_desc: "Fachliches Interview mit dem Arbeitgeber.",
    step_docs_title: "Unterlagen vorbereiten",
    step_docs_desc: "Vertrag, Genehmigungen und weitere Dokumente.",
    step_visa_title: "Visum und Reise",
    step_visa_desc: "Visum, Flug und Umzugsplanung.",
    step_onboard_title: "Arbeitsaufnahme",
    step_onboard_desc: "Ankommen und Unterstützung bei der Einarbeitung.",

    // Coming soon
    soon_generic_title: "Bald verfügbar!",
    soon_page_in_progress:
      "Diese Seite wird derzeit entwickelt. Für weitere Informationen kontaktieren Sie uns bitte.",
    soon_section_in_progress:
      "Dieser Bereich wird derzeit entwickelt. Für weitere Informationen kontaktieren Sie uns bitte.",
    back_home: "Zur Startseite",
  },
};

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("de");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("lang")) as LanguageCode | null;
    if (stored === "uz" || stored === "de") setLang(stored);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const messages = MESSAGES[lang];
    const t = (key: string) => messages[key] ?? key;
    return { lang, t, setLang };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within TranslationProvider");
  return ctx;
}
