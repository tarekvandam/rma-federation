"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type Trainer = {
  name: string;
  role: string;
  image: string;
  description: string;
  stats?: { label: string; value: string }[];
  certifications?: string[];
};

export default function TrainerProfiles() {
  const { locale } = useLanguage();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainers() {
      const defaults = translations[locale].trainers.profiles;
      const { data, error } = await supabase.from("trainers").select("*").order("created_at", { ascending: true });
      
      const dbTrainers = (data || []).map(t => ({
        ...t,
        stats: t.years_experience ? [{ label: locale === "ar" ? "سنوات الخبرة" : "Years Experience", value: String(t.years_experience) }] : [],
        certifications: t.certifications || [],
      }));
      const merged = defaults.map(d => {
        const match = dbTrainers.find(t => t.name === d.name);
        return match || d;
      });
      setTrainers([...merged, ...dbTrainers.filter(t => !defaults.some(d => d.name === t.name))]);
      setLoading(false);
    }
    fetchTrainers();
  }, [locale]);

  if (loading) return null;

  return (
    <section className="relative overflow-hidden bg-[#07080b] py-20 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.14),_rgba(0,0,0,0.96))] opacity-75 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent opacity-90 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14 px-4 sm:px-8"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-red-400/80">
            {translations[locale].trainers.badge}
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {translations[locale].trainers.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg">
            {translations[locale].trainers.description}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <motion.article
              key={trainer.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#111214] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-red-900/20"
            >
              <div className="relative h-80 overflow-hidden bg-gray-900">
                {trainer.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${trainer.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
                  <span className="inline-flex rounded-full bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300/90 backdrop-blur-sm">
                    {trainer.role}
                  </span>
                </div>
              </div>

              <div className="space-y-6 px-6 pb-8 pt-8 sm:px-8">
                <div className="space-y-3">
                  <h3 className="text-3xl font-black tracking-tight text-white">
                    {trainer.name}
                  </h3>
                  <p className="text-sm leading-7 text-gray-400 sm:text-base">
                    {trainer.description}
                  </p>
                </div>

                {trainer.stats && trainer.stats.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 rounded-3xl bg-black/40 p-4 text-center text-white/90 sm:grid-cols-3">
                    {trainer.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xl font-black tracking-tight text-white">
                          {stat.value}
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div className="space-y-3 rounded-[28px] border border-white/10 bg-black/30 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-red-400/80">
                      Certifications
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-gray-200 transition duration-300 group-hover:bg-red-500/10"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
