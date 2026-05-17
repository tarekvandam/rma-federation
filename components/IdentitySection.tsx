"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";

export default function IdentitySection() {
  const { locale } = useLanguage();
  const t = translations[locale].identity;
  const points = t.points;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative overflow-hidden bg-[#020305] py-20 sm:py-24 px-4 sm:px-6 lg:px-10"
    >
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.16),_rgba(0,0,0,0.96))] opacity-75 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center px-4 sm:px-8">
          <span className="mb-4 inline-block text-xs uppercase tracking-[0.45em] text-red-400/80">
            {t.badge}
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <p className="mt-6 text-base leading-8 text-gray-300 sm:text-lg">
            {t.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {points.map((point, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-black/15 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <span className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-700/20">
                  {`0${index + 1}`}
                </span>
                <h3 className="mt-6 text-2xl font-black text-white tracking-tight sm:text-3xl">
                  {point.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                  {point.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
