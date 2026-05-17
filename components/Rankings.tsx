"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";

export default function Rankings() {
  const { locale } = useLanguage();
  const t = translations[locale].rankings;

  return (
    <section className="bg-black text-white min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 rounded-[36px] border border-white/10 bg-[#09090b]/80 p-8 shadow-[0_28px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300 shadow-sm shadow-red-900/20">
            {t.badge}
          </span>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                {t.description}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-gray-200 shadow-xl shadow-black/20 backdrop-blur-xl sm:px-8">
              <p className="font-semibold text-white">{t.currentCycle}</p>
              <p className="mt-2 text-sm text-gray-300">{t.currentCycleNote}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-[32px] border border-white/10 bg-[#0f1114] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">
                    {t.sectionTitle}
                  </p>
                  <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                    {t.weightClassTitle}
                  </h2>
                </div>
                <p className="text-sm text-gray-400 max-w-xl">
                  {t.weightClassSubtitle}
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                {t.weightClasses.map((weight) => (
                  <div
                    key={weight.name}
                    className="rounded-3xl border border-white/10 bg-black/30 p-6 transition hover:-translate-y-1 hover:border-red-600/40"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-white">{weight.name}</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-red-400/80">
                          {weight.limit}
                        </p>
                      </div>
                      <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-red-300">
                        {weight.rankCount}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-gray-400">{weight.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-[32px] border border-white/10 bg-[#0f1114] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">
                    {t.sectionTitle}
                  </p>
                  <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                    {t.tableTitle}
                  </h2>
                </div>
                <span className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
                  {t.highlightLabel}
                </span>
              </div>

              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                  <thead className="bg-white/5 text-gray-400">
                    <tr>
                      <th className="px-5 py-4">{t.columns.rank}</th>
                      <th className="px-5 py-4">{t.columns.fighter}</th>
                      <th className="px-5 py-4">{t.columns.weightClass}</th>
                      <th className="px-5 py-4">{t.columns.record}</th>
                      <th className="px-5 py-4">{t.columns.streak}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.fighters.map((fighter, index) => (
                      <tr
                        key={fighter.name}
                        className={index % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                      >
                        <td className="border-t border-white/10 px-5 py-5 font-semibold text-white">{fighter.rank}</td>
                        <td className="border-t border-white/10 px-5 py-5">
                          <p className="font-semibold text-white">{fighter.name}</p>
                          <p className="mt-1 text-sm text-gray-400">{fighter.country}</p>
                        </td>
                        <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.weightClass}</td>
                        <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.record}</td>
                        <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.streak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[32px] border border-white/10 bg-[#0f1114] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
          >
            <h3 className="text-xl font-black text-white">{t.sideTitle}</h3>
            <p className="mt-4 text-gray-400 leading-7">{t.sideDescription}</p>

            <div className="mt-8 space-y-4">
              {t.highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-3xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-red-400/80">
                    {highlight.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{highlight.value}</p>
                  <p className="mt-2 text-sm text-gray-400">{highlight.description}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
