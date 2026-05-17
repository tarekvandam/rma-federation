"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";

const newsImages = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop",
];

export default function NewsSection() {
  const { locale } = useLanguage();
  const t = translations[locale].news;
  const news = t.items.map((item, index) => ({
    ...item,
    image: newsImages[index] ?? newsImages[0],
  }));

  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.16),_rgba(0,0,0,0.96))] opacity-80 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 px-4 sm:px-8"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-red-400/80">
            {t.badge}
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg">
            {t.description}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[32px] border border-zinc-800/80 bg-[#0f1114] shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-red-900/20"
            >
              <div className="relative h-72 overflow-hidden bg-gray-800">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-24">
                  <span className="inline-flex rounded-full border border-red-500/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.35em] text-red-300/90 backdrop-blur-sm">
                    {t.badgeCard}
                  </span>
                </div>
              </div>

              <div className="space-y-5 px-6 pb-6 pt-6 sm:px-8">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-gray-400 sm:text-base">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-red-400/80">
                    {t.category}
                  </span>
                  <motion.button
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 hover:text-white"
                  >
                    {t.readMore}
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}