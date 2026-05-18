"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export default function Membership() {
  const { locale } = useLanguage();
  const t = translations[locale].membership;
  const [plans, setPlans] = useState<any[]>([]);
  const [planOptions, setPlanOptions] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("membership_plans")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          const isAr = locale === "ar";
          setPlans(data);
          const names = data.map((p) => (isAr ? p.name_ar : p.name_en));
          setPlanOptions(names);
          setSelectedPlan(names[1] || names[0]);
        }
      });
  }, [locale]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");

    const { error: err } = await supabase.from("membership_submissions").insert([
      {
        name: formData.name,
        email: formData.email,
        plan: selectedPlan,
        message: formData.message,
      },
    ]);

    if (err) {
      setError("Failed to submit. Please try again.");
    } else {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
    setSending(false);
  };

  const isAr = locale === "ar";

  return (
    <section className="bg-black text-white min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 rounded-[36px] border border-white/10 bg-[#09090b]/80 p-8 shadow-[0_28px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl"
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
              <p className="font-semibold text-white">{t.benefitsTitle}</p>
              <p className="mt-2 text-sm text-gray-300">{t.joinSubtitle}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="space-y-10">
            {plans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rounded-[32px] border border-white/10 bg-[#0f1114] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">{t.badge}</p>
                    <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{t.title}</h2>
                  </div>
                  <span className="inline-flex rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
                    {plans.length} plans
                  </span>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {plans.map((plan) => (
                    <div key={plan.id} className="rounded-[32px] border border-white/10 bg-black/20 p-6 transition hover:-translate-y-1 hover:border-red-600/40">
                      <p className="text-sm uppercase tracking-[0.35em] text-red-400/80">{isAr ? plan.name_ar : plan.name_en}</p>
                      <p className="mt-4 text-3xl font-black text-white">{isAr ? plan.price_ar : plan.price_en}</p>
                      <p className="mt-4 text-sm leading-7 text-gray-300">{isAr ? plan.description_ar : plan.description_en}</p>
                      <ul className="mt-6 space-y-3 text-sm text-gray-300">
                        {(isAr ? plan.features_ar : plan.features_en).map((feature: string) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-red-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[32px] border border-white/10 bg-[#0f1114] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <h3 className="text-3xl font-black text-white">{t.joinTitle}</h3>
            <p className="mt-4 text-gray-400 leading-7">{t.joinSubtitle}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.formLabels.name}</label>
                <input
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder={t.formPlaceholder.name}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.formLabels.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  placeholder={t.formPlaceholder.email}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.formLabels.plan}</label>
                <select
                  value={selectedPlan}
                  onChange={(event) => setSelectedPlan(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                >
                  {planOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#0f1114] text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200">{t.formLabels.message}</label>
                <textarea
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  placeholder={t.formPlaceholder.message}
                  rows={5}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/70"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-800 px-6 py-4 text-base font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin inline mr-2" />
                    Sending...
                  </>
                ) : (
                  t.formLabels.submit
                )}
              </button>

              {submitted && (
                <p className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                  Thank you! Your membership request has been received.
                </p>
              )}
              {error && (
                <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
