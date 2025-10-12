import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata = {
  title: "Aloqa",
  description: "Biz bilan bog&apos;laning — forma, telefon yoki email orqali.",
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeader
        align="left"
        title="Aloqa"
        subtitle="Savollaringiz bormi? Quyidagi forma orqali murojaat qiling yoki telefon/email orqali bog'laning."
      />
      <div className="grid md:grid-cols-2 gap-10">
        <section className="space-y-2">
          <div className="rounded-2xl p-6 bg-card shadow-lg space-y-2">
            <div>
              <span className="font-semibold">Telefon:</span> +998 (90) 000-00-00
            </div>
            <div>
              <span className="font-semibold">Email:</span> info@consultinguz.uz
            </div>
            <div>
              <span className="font-semibold">Manzil:</span> Toshkent, O&apos;zbekiston
            </div>
          </div>
        </section>
        <section>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ism</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Xabar</Label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="rounded-md border bg-background p-3"
              />
            </div>
            <Button>
              <Send className="size-4" />
              <span>Yuborish</span>
            </Button>
          </form>
        </section>
      </div>
    </Section>
  );
}
