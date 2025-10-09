export const metadata = {
  title: "Muvofiqlik",
  description: "Mehnat va bandlik, Viza, Maxfiylik, Teng imkoniyat, Etika",
};

export default function CompliancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold">Muvofiqlik</h1>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Mehnat va bandlik qonunlari</h2>
        <p className="text-muted-foreground">
          Biz faoliyat yuritayotgan hududlarda amaldagi mehnat me&apos;yorlariga rioya qilamiz:
          qonuniy yollash, adolatli shartnomalar va shaffof shartlar.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Viza qoidalari</h2>
        <p className="text-muted-foreground">
          Hujjatlarni tayyorlash elchixona va konsullik talablari asosida amalga oshiriladi:
          ruxsatnomalar, vizalar va safar hujjatlari.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Ma&apos;lumotlarni muhofaza qilish va maxfiylik</h2>
        <p className="text-muted-foreground">
          Shaxsiy ma&apos;lumotlar mas&apos;uliyat bilan, tegishli xavfsizlik choralarida,
          cheklangan saqlash va ochiq qayta ishlash tamoyillari asosida boshqariladi.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Teng imkoniyatlar kafolati</h2>
        <p className="text-muted-foreground">
          Jins, yosh, millat, din, nogironlik yoki boshqa belgilar bo&apos;yicha kamsitishsiz teng
          imkoniyatlar taqdim etamiz.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Etik me&apos;yorlar</h2>
        <p className="text-muted-foreground">
          Etika bizning ishimizning asosi: shaffoflik, korrupsiyaga qarshi kurash va inson
          huquqlariga hurmat.
        </p>
      </section>
      <p className="text-xs text-muted-foreground">
        Ushbu ma&apos;lumotlar faqat tanishish maqsadida taqdim etilgan.
      </p>
    </div>
  );
}
