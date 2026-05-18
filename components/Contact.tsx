"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { MessageSquare, Phone, Send, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { sendEmail } from "@/lib/emailjs";

export default function Contact() {
  const { locale } = useLanguage();
  const t = translations[locale].contactPage;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      await sendEmail({
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 overflow-hidden rounded-[36px] border border-white/10 bg-[#0a0a0f]/80 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300 shadow-sm shadow-red-900/20">
            {t.badge}
          </span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
                {t.subtitle}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-gray-200 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8">
              <p className="font-semibold text-white">{t.socialTitle}</p>
              <p className="mt-2 text-gray-400">{t.socialDescription}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="rounded-[32px] border border-white/10 bg-[#111319] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">{t.badge}</p>
              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">{t.title}</h2>
              <p className="mt-6 text-gray-400 leading-8">{t.description}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                  <div className="flex items-center gap-3 text-red-400">
                    <Phone size={24} />
                    <p className="text-sm uppercase tracking-[0.35em] text-red-300">WhatsApp</p>
                  </div>
                  <p className="mt-4 text-gray-300">{t.whatsapp.description}</p>
                  <a
                    href="https://wa.me/201001904418?text=Hello%20RMA%20Federation"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-200 transition hover:bg-green-500/20"
                  >
                    <MessageSquare size={18} />
                    {t.whatsapp.button}
                  </a>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                  <div className="flex items-center gap-3 text-red-400">
                    <FaYoutube size={24} />
                    <p className="text-sm uppercase tracking-[0.35em] text-red-300">YouTube</p>
                  </div>
                  <p className="mt-4 text-gray-300">{t.youtubeDescription}</p>
                  <div className="mt-6 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                    <iframe
                      className="h-[220px] w-full"
                      src="https://www.youtube.com/embed/g5_SF0A4NBo?start=108"
                      title="RMA Federation Spotlight"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-white/10 bg-[#0b0b12]/80 p-6 transition hover:border-red-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-red-400 transition group-hover:bg-red-500/10">
                  <FaInstagram size={20} />
                </div>
                <p className="mt-5 text-lg font-semibold text-white">{t.socialLinks.instagram}</p>
                <p className="mt-3 text-sm text-gray-400">@rma_federation</p>
              </a>
              <a
                href="https://www.facebook.com/tarekninjateam"
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-white/10 bg-[#0b0b12]/80 p-6 transition hover:border-red-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-red-400 transition group-hover:bg-red-500/10">
                  <FaFacebook size={20} />
                </div>
                <p className="mt-5 text-lg font-semibold text-white">{t.socialLinks.facebook}</p>
                <p className="mt-3 text-sm text-gray-400">/RMA Federation</p>
              </a>
              <a
                href="https://www.youtube.com/@tarekvandam"
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-white/10 bg-[#0b0b12]/80 p-6 transition hover:border-red-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-red-400 transition group-hover:bg-red-500/10">
                  <FaYoutube size={20} />
                </div>
                <p className="mt-5 text-lg font-semibold text-white">{t.socialLinks.youtube}</p>
                <p className="mt-3 text-sm text-gray-400">RMA Highlights</p>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[32px] border border-white/10 bg-[#0f1114] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-3xl font-black text-white">{t.form.button}</h2>
            <p className="mt-4 text-gray-400 leading-7">{t.description}</p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.form.name}</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.form.namePlaceholder}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.form.email}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.form.emailPlaceholder}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.form.subject}</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t.form.subjectPlaceholder}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.form.message}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.form.messagePlaceholder}
                  rows={6}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-800 px-6 py-4 text-base font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t.form.button}
                  </>
                )}
              </button>
              {sent && (
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                  Thank you — your message has been sent. We will reply as soon as possible.
                </div>
              )}
              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                  {error}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
