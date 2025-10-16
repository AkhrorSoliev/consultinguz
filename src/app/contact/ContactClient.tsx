"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Send,
  UserRound,
  ArrowLeftRight,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section, SectionHeader } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

type ContactRole = "employer" | "jobseeker";

export default function ContactClient() {
  const { t } = useI18n();
  const [role, setRole] = useState<ContactRole | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "success" | "error">(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load role from localStorage on mount
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem("contact_role") : null;
    if (stored === "employer" || stored === "jobseeker") {
      setRole(stored);
    }
  }, []);

  const handleSelect = (next: ContactRole) => {
    setRole(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("contact_role", next);
    }
  };

  const handleClearRole = () => {
    setRole(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("contact_role");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!formData.email || !/.+@+.+\..+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Please enter a valid phone.";
    }
    if (!formData.message || formData.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Placeholder submit logic; hook into API or Telegram later
      await new Promise((res) => setTimeout(res, 900));
      setSubmitted("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitted("error");
    } finally {
      setSubmitting(false);
    }
  };

  const contactCardTitle = useMemo(() => {
    if (role === "employer") return t("contact_card_employer_title");
    if (role === "jobseeker") return t("contact_card_jobseeker_title");
    return "";
  }, [role, t]);

  return (
    <>
      <Section>
        <SectionHeader title={t("nav_contact")} subtitle={t("cta_desc")} />
        {role ? (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearRole}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-accent/60"
            >
              <ArrowLeftRight className="size-4" />
              <span>{t("contact_role_change")}</span>
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="rounded-2xl border bg-card p-6 shadow-lg">
              <div className="text-center space-y-1 mb-4">
                <div className="text-xl font-bold">{t("contact_role_title")}</div>
                <div className="text-sm text-muted-foreground">{t("contact_role_desc")}</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleSelect("employer")}
                  className="group w-full rounded-xl border bg-background hover:bg-accent/50 transition shadow-sm p-5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="rounded-lg bg-primary/10 text-primary p-3">
                      <Briefcase className="size-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{t("contact_role_employer")}</div>
                      <div className="text-sm text-muted-foreground">&nbsp;</div>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelect("jobseeker")}
                  className="group w-full rounded-xl border bg-background hover:bg-accent/50 transition shadow-sm p-5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="rounded-lg bg-primary/10 text-primary p-3">
                      <UserRound className="size-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{t("contact_role_jobseeker")}</div>
                      <div className="text-sm text-muted-foreground">&nbsp;</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
      <Section>
        {role && (
          <div className="grid gap-8 md:grid-cols-2">
            <section className="space-y-4">
              <div className="rounded-2xl p-6 bg-card shadow-lg border">
                <div className="text-lg font-semibold mb-4">{contactCardTitle}</div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="rounded-md bg-primary/10 text-primary p-2">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground">{t("contact_phone")}</div>
                      <div className="font-medium">
                        {role === "employer" ? "+49 (30) 123-456" : "+998 (90) 000-00-00"}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="rounded-md bg-primary/10 text-primary p-2">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground">{t("contact_email")}</div>
                      <div className="font-medium">
                        {role === "employer" ? "employers@consultinguz.uz" : "job@consultinguz.uz"}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="rounded-md bg-primary/10 text-primary p-2">
                      <MapPin className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground">{t("contact_address")}</div>
                      <div className="font-medium">
                        {role === "employer"
                          ? "Berlin, Deutschland"
                          : "Toshkent, O'\u2019zbekiston"}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl p-4 bg-muted/30 border">
                <div className="text-sm text-muted-foreground">{t("cta_desc")}</div>
              </div>
            </section>
            <section>
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {submitted === "success" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-lg border bg-green-50 text-green-800 px-4 py-3 text-sm"
                  >
                    {t("form_submit")} ✓ Your message has been sent.
                  </div>
                )}
                {submitted === "error" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-lg border bg-red-50 text-red-800 px-4 py-3 text-sm"
                  >
                    Something went wrong. Please try again.
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("form_name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("form_email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t("form_phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={role === "employer" ? "+49 30 123456" : "+998 90 000 00 00"}
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="text-xs text-destructive">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{t("form_message")}</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={
                      role === "employer"
                        ? "Describe your hiring needs..."
                        : "Tell us about your experience and goals..."
                    }
                    className="rounded-md border bg-background p-3 min-h-32"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>{t("form_submit")}</span>
                    </>
                  )}
                </Button>
              </form>
            </section>
          </div>
        )}
      </Section>
    </>
  );
}
