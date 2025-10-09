import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Aloqa",
  description: "Biz bilan bog&apos;laning — forma, telefon yoki email orqali.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Aloqa</h1>
        <p className="font-pt text-muted-foreground">
          Savollaringiz bormi? Quyidagi forma orqali murojaat qiling yoki telefon/email orqali
          bog&apos;laning.
        </p>
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
  );
}
