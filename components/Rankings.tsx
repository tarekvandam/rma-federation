"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type Fighter = {
  id: string;
  name: string;
  weight: string;
  country: string;
  rank: number;
  points: number;
  tournament: string;
  rounds: number;
};

export default function Rankings() {
  const { locale } = useLanguage();
  const t = translations[locale].rankings;
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankings() {
      const { data } = await supabase
        .from("rankings")
        .select("*")
        .order("rank", { ascending: true });
      if (data) setFighters(data);
      setLoading(false);
    }
    fetchRankings();
  }, []);

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

          {loading ? (
            <p className="text-gray-500 text-center py-12">Loading rankings...</p>
          ) : fighters.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No rankings available yet.</p>
          ) : (
            <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/40">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-5 py-4">{t.columns.rank}</th>
                    <th className="px-5 py-4">{t.columns.fighter}</th>
                    <th className="px-5 py-4">{t.columns.weightClass}</th>
                    <th className="px-5 py-4">{t.columns.country}</th>
                    <th className="px-5 py-4">{t.columns.tournament}</th>
                    <th className="px-5 py-4">{t.columns.rounds}</th>
                    <th className="px-5 py-4">{t.columns.points}</th>
                  </tr>
                </thead>
                <tbody>
                  {fighters.map((fighter, index) => (
                    <tr
                      key={fighter.id}
                      className={index % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                    >
                      <td className="border-t border-white/10 px-5 py-5 font-semibold text-white">#{fighter.rank}</td>
                      <td className="border-t border-white/10 px-5 py-5">
                        <p className="font-semibold text-white">{fighter.name}</p>
                      </td>
                      <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.weight}</td>
                      <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.country}</td>
                      <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.tournament || "—"}</td>
                      <td className="border-t border-white/10 px-5 py-5 text-gray-300">{fighter.rounds || "—"}</td>
                      <td className="border-t border-white/10 px-5 py-5">
                        <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                          {fighter.points} pts
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
