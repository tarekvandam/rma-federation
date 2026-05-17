import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageProvider from "../components/LanguageProvider";

import { siteMetadata } from "../lib/seo";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    type: "website",
    images: [
      {
        url: siteMetadata.image,
        alt: "Martial arts training and championship action",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
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
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <LanguageProvider>
          <Navbar />

          {children}

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}