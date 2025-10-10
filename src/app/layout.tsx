import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import CTASticky from "@/components/CTASticky";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const ptSans = PT_Sans({
  variable: "--font-pt",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app"),
  title: {
    default: "ConsultingUZ — Die Brücke zwischen Arbeitgebern und Fachkräften",
    template: "%s — ConsultingUZ",
  },
  description:
    "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
  openGraph: {
    title: "ConsultingUZ",
    description:
      "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
    type: "website",
    url: "/",
    siteName: "ConsultingUZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConsultingUZ",
    description:
      "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${ptSans.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Subtle global background decoration */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(800px 300px at 50% -10%, hsl(var(--primary)/0.08), transparent 60%)",
          }}
        />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main" role="main" className="flex-1">
            {children}
          </main>
          <CTASticky />
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ConsultingUZ",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app",
              logo: "/consulting-logo.png",
              sameAs: ["https://www.linkedin.com/", "https://t.me/", "https://instagram.com/"],
            }),
          }}
        />
      </body>
    </html>
  );
}
