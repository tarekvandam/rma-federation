"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminMembershipPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"plans" | "submissions">("plans");
  const [editing, setEditing] = useState<any | null>(null);

  // Form state
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [priceEn, setPriceEn] = useState("");
  const [priceAr, setPriceAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [featuresEn, setFeaturesEn] = useState("");
  const [featuresAr, setFeaturesAr] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  async function fetchData() {
    const { data: p } = await supabase.from("membership_plans").select("*").order("sort_order");
    if (p) setPlans(p);
    const { data: s } = await supabase.from("membership_submissions").select("*").order("created_at", { ascending: false });
    if (s) setSubmissions(s);
  }

  useEffect(() => { fetchData(); }, []);

  function resetForm() {
    setNameEn(""); setNameAr(""); setPriceEn(""); setPriceAr("");
    setDescEn(""); setDescAr(""); setFeaturesEn(""); setFeaturesAr("");
    setSortOrder(0); setEditing(null);
  }

  function fillForm(plan: any) {
    setNameEn(plan.name_en); setNameAr(plan.name_ar);
    setPriceEn(plan.price_en); setPriceAr(plan.price_ar);
    setDescEn(plan.description_en); setDescAr(plan.description_ar);
    setFeaturesEn(plan.features_en.join("\n")); setFeaturesAr(plan.features_ar.join("\n"));
    setSortOrder(plan.sort_order); setEditing(plan);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name_en: nameEn, name_ar: nameAr,
      price_en: priceEn, price_ar: priceAr,
      description_en: descEn, description_ar: descAr,
      features_en: featuresEn.split("\n").filter(Boolean),
      features_ar: featuresAr.split("\n").filter(Boolean),
      sort_order: sortOrder,
    };
    if (editing) {
      await supabase.from("membership_plans").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("membership_plans").insert([payload]);
    }
    resetForm(); fetchData();
  }

  async function deletePlan(id: string) {
    if (confirm("حذف الخطة؟")) {
      await supabase.from("membership_plans").delete().eq("id", id);
      fetchData();
    }
  }

  async function deleteSubmission(id: string) {
    if (confirm("حذف الطلب؟")) {
      await supabase.from("membership_submissions").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-500 mb-8">العضوية</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("plans")} className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === "plans" ? "bg-purple-600" : "bg-zinc-800 text-gray-400"}`}>خطط العضوية</button>
        <button onClick={() => setActiveTab("submissions")} className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === "submissions" ? "bg-purple-600" : "bg-zinc-800 text-gray-400"}`}>الطلبات ({submissions.length})</button>
      </div>

      {activeTab === "plans" && (
        <div>
          <form onSubmit={handleSave} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="اسم الخطة (إنجليزي)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
              <input type="text" placeholder="اسم الخطة (عربي)" value={nameAr} onChange={(e) => setNameAr(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
              <input type="text" placeholder="السعر (إنجليزي: $49/mo)" value={priceEn} onChange={(e) => setPriceEn(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
              <input type="text" placeholder="السعر (عربي: $49/شهر)" value={priceAr} onChange={(e) => setPriceAr(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
              <input type="text" placeholder="الوصف (إنجليزي)" value={descEn} onChange={(e) => setDescEn(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
              <input type="text" placeholder="الوصف (عربي)" value={descAr} onChange={(e) => setDescAr(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            </div>
            <textarea placeholder="المميزات (إنجليزي) — سطر لكل ميزة" value={featuresEn} onChange={(e) => setFeaturesEn(e.target.value)} required rows={3} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <textarea placeholder="المميزات (عربي) — سطر لكل ميزة" value={featuresAr} onChange={(e) => setFeaturesAr(e.target.value)} required rows={3} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-400">الترتيب:</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-20 bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-purple-500" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition">{editing ? "تحديث" : "إضافة"}</button>
              {editing && <button type="button" onClick={resetForm} className="bg-zinc-700 px-6 py-3 rounded-xl font-bold hover:bg-zinc-600 transition">إلغاء</button>}
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                <h3 className="text-xl font-bold mb-1">{plan.name_en} / {plan.name_ar}</h3>
                <p className="text-purple-400 text-lg font-semibold">{plan.price_en}</p>
                <p className="text-gray-400 text-sm mt-2">{plan.description_en}</p>
                <div className="mt-3 space-y-1">
                  {plan.features_en.map((f: string, i: number) => (
                    <p key={i} className="text-xs text-gray-500">• {f}</p>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => fillForm(plan)} className="text-blue-400 hover:text-blue-300 text-sm">تعديل</button>
                  <button onClick={() => deletePlan(plan.id)} className="text-red-400 hover:text-red-300 text-sm">حذف</button>
                </div>
              </div>
            ))}
          </div>
          {plans.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد خطط</p>}
        </div>
      )}

      {activeTab === "submissions" && (
        <div className="space-y-4">
          {submissions.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد طلبات</p>}
          {submissions.map((s) => (
            <div key={s.id} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{s.name}</p>
                  <p className="text-gray-400 text-sm">{s.email}</p>
                  <p className="text-purple-400 text-sm mt-1">الخطة: {s.plan}</p>
                  {s.message && <p className="text-gray-500 text-sm mt-2">{s.message}</p>}
                  <p className="text-xs text-gray-600 mt-2">{new Date(s.created_at).toLocaleString("ar-EG")}</p>
                </div>
                <button onClick={() => deleteSubmission(s.id)} className="text-red-400 hover:text-red-300 text-sm">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
