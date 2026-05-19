import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageProvider from "../components/LanguageProvider";

import { siteMetadata, generateOrganizationSchema } from "../lib/seo";
import Script from "next/script";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  alternates: {
    canonical: siteMetadata.url,
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteMetadata.image,
        alt: "RMA Federation martial arts training and championship action",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
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
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateOrganizationSchema();

  return (
    <html lang="en" dir="auto">
      <body className="bg-black text-white">
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(schema)}
        </Script>
        <LanguageProvider>
          <Navbar />

          {children}

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
