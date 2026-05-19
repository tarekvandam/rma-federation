"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale].hero;

  return (
    <section
      className="relative min-h-[680px] sm:min-h-[720px] md:h-screen overflow-hidden bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center gap-10"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.5em] text-red-400/90">
              {t.badge}
            </p>
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">
              {t.label}
            </p>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="max-w-3xl text-base sm:text-xl md:text-2xl text-gray-200/90 leading-relaxed"
          >
            {t.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Link href="/membership" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 px-10 py-4 rounded-full text-white font-semibold text-lg shadow-2xl shadow-red-900/40 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] text-center">
              {t.join}
            </Link>
            <Link href="/championships" className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 px-10 py-4 rounded-full text-white font-semibold text-lg transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] text-center">
              {t.explore}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}