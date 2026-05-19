"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type Championship = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
};

export default function Championships() {
  const { locale } = useLanguage();
  const t = translations[locale].championships;
  const [events, setEvents] = useState<Championship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("championships")
        .select("*")
        .order("date", { ascending: true });
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-zinc-950 py-20 sm:py-24 px-4 sm:px-6 lg:px-10 min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">{t.loading || "Loading..."}</p>
      </section>
    );
  }

  if (!events.length) return null;

  return (
    <section className="bg-zinc-950 py-20 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-gray-400 text-lg">{t.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition duration-300"
            >
              {event.image && (
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <MapPin size={18} /> <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <CalendarDays size={18} /> <span>{event.date}</span>
                </div>
                {event.description && (
                  <p className="text-gray-500 text-sm mb-4">{event.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
