import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata = {
  title: "404 — Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section>
      <SectionHeader
        eyebrow="404"
        title="Seite nicht gefunden"
        subtitle="Die angeforderte Seite existiert nicht oder wurde verschoben. / So'ralgan sahifa mavjud emas yoki ko'chirilgan."
      />
      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/">Zur Startseite / Asosiy sahifaga</Link>
        </Button>
      </div>
    </Section>
  );
}
