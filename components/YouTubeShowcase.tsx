"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function YouTubeShowcase() {
  const { locale } = useLanguage();
  const t = translations[locale].youtube;
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("media_videos")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setVideos(
            data.map((v) => ({
              title: v.title,
              youtube_id: v.youtube_id,
              channel: v.channel || "RMA Federation",
              runtime: v.runtime || "",
              thumbnail: `https://img.youtube.com/vi/${v.youtube_id}/maxresdefault.jpg`,
            }))
          );
        } else {
          setVideos([]);
        }
      });
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#060607] py-20 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.14),_rgba(0,0,0,0.95))] opacity-80 pointer-events-none" />
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
            {t.badge}
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg">
            {t.description}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#111214] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:shadow-red-900/20"
            >
              <div className="relative overflow-hidden">
                <div
                  className="h-72 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm">
                  <span className="block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {t.live}
                </div>
                {video.runtime && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm">
                    {video.runtime}
                  </div>
                )}
              </div>

              <div className="space-y-4 px-6 pb-6 pt-6 sm:px-8">
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400 sm:text-base">
                    {video.channel}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-red-400/80">
                    {t.watchPreview}
                  </span>
                  <button className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20 hover:text-white">
                    {t.play}
                    <span className="text-lg">▶</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
