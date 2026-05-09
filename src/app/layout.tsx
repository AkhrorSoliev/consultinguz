import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import CTASticky from "@/components/CTASticky";
import Footer from "@/components/Footer";
import AnalyticsGate from "@/components/AnalyticsGate";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});


const OG_IMAGE = {
  url: "/consulting-logo.png",
  width: 512,
  height: 512,
  alt: "ConsultingUZ",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app"),
  title: {
    default: "ConsultingUZ — Die Brücke zwischen Arbeitgebern und Fachkräften",
    template: "%s — ConsultingUZ",
  },
  description:
    "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ConsultingUZ",
    description:
      "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
    type: "website",
    url: "/",
    siteName: "ConsultingUZ",
    locale: "de_DE",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConsultingUZ",
    description:
      "Vom Auswahlprozess bis Visum und Arbeitsaufnahme – transparent, schnell und zuverlässig.",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- "Google Sans Flex" is not in the public Google Fonts catalog, so next/font/google cannot load it */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,100..1000&display=swap"
        />
      </head>
      <body
        className={`${sourceSerif.variable} antialiased min-h-screen flex flex-col`}
      >
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
          <AnalyticsGate />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EmploymentAgency",
              name: "ConsultingUZ",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app",
              logo: "/consulting-logo.png",
              description:
                "Internationale Personalvermittlung — vom Auswahlprozess bis Visum und Arbeitsaufnahme.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Alemannenweg 6",
                addressLocality: "Sigmaringen",
                postalCode: "72488",
                addressCountry: "DE",
              },
              telephone: "+49 176 238 97 113",
              email: "orif.ahmadaliyev@consultinguz.de",
              areaServed: ["DE", "UZ"],
              sameAs: ["https://www.linkedin.com/", "https://t.me/", "https://instagram.com/"],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Personalvermittlung",
                    description:
                      "Kandidaten passend zu Ihren Anforderungen für verschiedene Rollen und Branchen.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Visum- und Dokumentenhilfe",
                    description: "Genehmigungen, Compliance und Reise — umfassende Unterstützung.",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
