"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLanguage();
  const t = translations[locale].footer;
  const quickLinks = [
    { label: translations[locale].nav.about, href: "/about" },
    { label: translations[locale].nav.news, href: "/news" },
    { label: translations[locale].nav.championships, href: "/championships" },
    { label: translations[locale].nav.membership, href: "/membership" },
    { label: translations[locale].nav.media, href: "/media" },
    { label: translations[locale].nav.countries, href: "/countries" },
    { label: translations[locale].nav.promotion, href: "/promotion" },
    { label: translations[locale].nav.players, href: "/players" },
  ];

  return (
    <footer className="bg-black border-t border-red-700 pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-4">

        {/* About */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.title}
          </h2>

          <p className="text-gray-400 leading-7">
            {t.description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            {t.resourcesTitle}
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            {t.contactTitle}
          </h3>

          <div className="flex flex-col gap-4 text-gray-400">
            <span>Phone: +20 100 190 4418</span>
            <span>Email: realmartialartrma@gmail.com</span>
            <span>Location: Cairo, Egypt</span>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            {t.followTitle}
          </h3>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/tarekninjateam"
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-900 hover:bg-red-600 transition px-5 py-3 rounded-xl text-white font-bold"
            >
              {t.facebook}
            </a>

            <a
              href="https://www.youtube.com/@tarekvandam"
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-900 hover:bg-red-600 transition px-5 py-3 rounded-xl text-white font-bold"
            >
              {t.youtube}
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 mt-12 pt-6 text-center text-gray-500">
        © 2026 RMA Federation. {t.rights}
      </div>

    </footer>
  );
}