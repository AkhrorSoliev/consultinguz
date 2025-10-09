export const stats = [
  { label: "Tajriba yillari", value: 7 },
  { label: "Hamkorlar", value: 120 },
  { label: "Joylashtirilganlar", value: 3500 },
  { label: "Qoniqish darajasi", value: 96, suffix: "%" },
] as const;

export const partners = [
  { name: "Adidas", logo: "/partners/adidas.svg" },
  { name: "Allianz", logo: "/partners/allianz-2.svg" },
  { name: "Bayer", logo: "/partners/bayer-5.svg" },
  { name: "Bosch", logo: "/partners/bosch.svg" },
  { name: "Hugo Boss", logo: "/partners/boss-hugo-boss-1.svg" },
  { name: "Coca-Cola", logo: "/partners/coca-cola-2021.svg" },
  { name: "Deutsche Telekom", logo: "/partners/deutsche-telekom-2.svg" },
  { name: "Puma", logo: "/partners/puma.svg" },
  { name: "Siemens", logo: "/partners/siemens.svg" },
] as const;

export const testimonials = [
  {
    role: "Ish beruvchi",
    name: "M.M.",
    text: "Tez va shaffof yollash jarayoni.",
  },
  {
    role: "Ish izlovchi",
    name: "D.A.",
    text: "A'lo darajadagi viza va ko'chish yordami.",
  },
  {
    role: "Ish beruvchi",
    name: "S.T.",
    text: "Professional muloqot va natijalar.",
  },
] as const;

export type Stat = (typeof stats)[number];
export type Partner = (typeof partners)[number];
export type Testimonial = (typeof testimonials)[number];
