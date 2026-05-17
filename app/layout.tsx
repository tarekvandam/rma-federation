import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { siteMetadata } from "../lib/seo";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}