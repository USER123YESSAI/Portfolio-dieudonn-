import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MotionProvider } from "@/components/ui/MotionPrimitives";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dieudonné Routouang Souloukna — Spécialiste en Nutrition et Diététique",
    template: "%s | Dieudonné Routouang Souloukna",
  },
  description:
    "Portfolio professionnel de Dieudonné Routouang Souloukna, diplômé d'une Licence en Nutrition et Diététique.",
  keywords: [
    "Dieudonné Routouang Souloukna",
    "Nutrition",
    "Diététique",
    "Licence en Nutrition et Diététique",
    "Portfolio nutrition et diététique",
  ],
  authors: [{ name: "Dieudonné Routouang Souloukna", url: siteUrl }],
  creator: "Dieudonné Routouang Souloukna",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dieudonné Routouang Souloukna — Spécialiste en Nutrition et Diététique",
    description:
      "Portfolio professionnel de Dieudonné Routouang Souloukna, diplômé en Nutrition et Diététique.",
    url: siteUrl,
    siteName: "Dieudonné Routouang Souloukna — Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/profil5.png",
        width: 1200,
        height: 630,
        alt: "Dieudonné Routouang Souloukna — Nutrition et Diététique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dieudonné Routouang Souloukna — Nutrition et Diététique",
    description:
      "Portfolio professionnel de Dieudonné Routouang Souloukna — Nutrition et Diététique.",
    images: ["/images/profil5.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Dieudonné Routouang Souloukna",
      jobTitle: "Spécialiste en Nutrition et Diététique",
      description:
        "Diplômé d'une Licence en Nutrition et Diététique.",
      url: siteUrl,
      image: `${siteUrl}/images/profil5.png`,
      email: "routouangdieudonnesouloukna@gmail.com",
      knowsAbout: ["Nutrition", "Diététique"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Dieudonné Routouang Souloukna — Portfolio",
      description: "Portfolio professionnel de Dieudonné Routouang Souloukna",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${jakarta.variable} ${playfair.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var theme=t==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',theme);}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full antialiased">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
