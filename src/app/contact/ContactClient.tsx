"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section, SectionHeader } from "@/components/ui/section";
import { useI18n } from "@/components/providers/translation-provider";

type ContactRole = "" | "employer" | "jobseeker";

const OFFICE_PHONE = "+49 176 238 97 113";
const OFFICE_EMAIL = "orif.ahmadaliyev@consultinguz.de";
const OFFICE_ADDRESS = "Alemannenweg 6, 72488 Sigmaringen, Deutschland";

const SOCIALS: Array<{
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { href: "https://www.linkedin.com/in/consulting-uz-39b908297/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://t.me/Consulting_UZB", label: "Telegram", icon: SendIcon },
  { href: "https://www.instagram.com/consulting__uz/", label: "Instagram", icon: InstagramIcon },
  { href: "http://www.youtube.com/@consultingUz1", label: "YouTube", icon: YoutubeIcon },
];

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactClient() {
  const { t } = useI18n();
  const [role, setRole] = useState<ContactRole>("");
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "success" | "error">(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length < 2) next.name = t("error_name");
    if (!formData.email || !/.+@.+\..+/.test(formData.email)) next.email = t("error_email");
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 7) next.phone = t("error_phone");
    if (!formData.message || formData.message.trim().length < 10) next.message = t("error_message");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: role || undefined }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted("success");
      setFormData(initialForm);
      setRole("");
    } catch {
      setSubmitted("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section>
      <SectionHeader title={t("nav_contact")} subtitle={t("cta_desc")} />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{t("contact_info_title")}</h3>
            <ul className="space-y-4">
              <InfoRow icon={Phone} label={t("contact_phone")}>
                <a href={`tel:${OFFICE_PHONE.replace(/\s/g, "")}`} className="hover:underline">
                  {OFFICE_PHONE}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} label={t("contact_email")}>
                <a href={`mailto:${OFFICE_EMAIL}`} className="hover:underline break-all">
                  {OFFICE_EMAIL}
                </a>
              </InfoRow>
              <InfoRow icon={MapPin} label={t("contact_address")}>
                <span>{OFFICE_ADDRESS}</span>
              </InfoRow>
              <InfoRow icon={Clock} label={t("contact_hours_label")}>
                <span>{t("contact_hours_value")}</span>
              </InfoRow>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">{t("contact_follow")}</h3>
            <div className="flex gap-3 text-muted-foreground">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border p-2 hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm space-y-5"
          >
            {submitted === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {t("form_success")}
              </div>
            )}
            {submitted === "error" && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {t("form_error")}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="role">{t("form_role_label")}</Label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value as ContactRole)}
                className="border-input h-9 w-full rounded-md border bg-background px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              >
                <option value="">{t("form_role_select")}</option>
                <option value="employer">{t("contact_role_employer")}</option>
                <option value="jobseeker">{t("contact_role_jobseeker")}</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label={t("form_name")}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
                autoComplete="name"
              />
              <Field
                id="email"
                label={t("form_email")}
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>

            <Field
              id="phone"
              label={t("form_phone")}
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+49 30 123456"
              autoComplete="tel"
            />

            <div className="grid gap-2">
              <Label htmlFor="message">{t("form_message")}</Label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form_message_placeholder")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="border-input min-h-32 w-full rounded-md border bg-background p-3 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
              />
              {errors.message ? (
                <p id="message-error" className="text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("form_sending")}</span>
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
    </Section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="font-medium">{children}</div>
      </div>
    </li>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
