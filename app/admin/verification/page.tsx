"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Cert = {
  id: string;
  certificate_id: string;
  holder_name: string;
  belt: string;
  issue_date: string;
  trainer: string;
  status: string;
};

const beltOptions = [
  "White",
  "Yellow 1st", "Yellow 2nd",
  "Orange 1st", "Orange 2nd",
  "Green 1st", "Green 2nd",
  "Blue 1st", "Blue 2nd",
  "Brown 1st", "Brown 2nd",
  "Red 1st", "Red 2nd",
  "Black 1st Dan", "Black 2nd Dan", "Black 3rd Dan",
  "Black 4th Dan", "Black 5th Dan", "Black 6th Dan",
];

export default function AdminVerificationPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [holder, setHolder] = useState("");
  const [belt, setBelt] = useState("");
  const [date, setDate] = useState("");
  const [trainer, setTrainer] = useState("");
  const [generated, setGenerated] = useState("");

  async function fetchCerts() {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    if (data) setCerts(data as Cert[]);
  }

  useEffect(() => { fetchCerts(); }, []);

  async function generateId() {
    const { data: existing } = await supabase.from("certificates").select("certificate_id").order("created_at", { ascending: false }).limit(1);
    let nextNum = 1;
    if (existing && existing.length > 0) {
      const last = existing[0].certificate_id;
      const num = parseInt(last.split("-").pop() || "0", 10);
      nextNum = num + 1;
    }
    return `RMA-${new Date().getFullYear()}-${String(nextNum).padStart(4, "0")}`;
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!holder || !belt || !date || !trainer) { alert("املأ كل الحقول"); return; }

    const certId = await generateId();
    const { error } = await supabase.from("certificates").insert([{
      certificate_id: certId,
      holder_name: holder,
      belt,
      issue_date: date,
      trainer,
    }]);

    if (error) {
      alert("خطأ: " + error.message);
    } else {
      setGenerated(certId);
      setHolder(""); setBelt(""); setDate(""); setTrainer("");
      fetchCerts();
    }
  }

  async function revokeCert(id: string) {
    if (!confirm("إلغاء هذه الشهادة؟")) return;
    await supabase.from("certificates").update({ status: "revoked" }).eq("id", id);
    fetchCerts();
  }

  async function deleteCert(id: string) {
    if (!confirm("حذف هذه الشهادة نهائياً؟")) return;
    await supabase.from("certificates").delete().eq("id", id);
    fetchCerts();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-8">✅ نظام التحقق من الشهادات</h1>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <h2 className="text-xl font-bold text-white">إنشاء شهادة جديدة</h2>

        {generated && (
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 text-center">
            <p className="text-green-400 font-bold text-lg mb-1">✅ تم إنشاء الشهادة!</p>
            <p className="text-2xl font-mono text-white tracking-wider">{generated}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الحاصل على الشهادة" value={holder} onChange={(e) => setHolder(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" />
          <input type="text" placeholder="اسم المدرب" value={trainer} onChange={(e) => setTrainer(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select value={belt} onChange={(e) => setBelt(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white">
            <option value="">اختر الحزام</option>
            {beltOptions.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white [color-scheme:dark]" />
        </div>
        <button type="submit" className="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 transition">إنشاء الشهادة</button>
      </form>

      {/* Certificate List */}
      <h2 className="text-xl font-bold mb-4">الشهادات ({certs.length})</h2>
      <div className="space-y-3">
        {certs.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد شهادات بعد</p>}
        {certs.map((c) => (
          <div key={c.id} className={`bg-zinc-900 p-4 rounded-xl border ${c.status === "revoked" ? "border-red-600/30 opacity-60" : "border-zinc-800"}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-green-400 font-bold text-lg">{c.certificate_id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full uppercase font-bold ${c.status === "active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>{c.status}</span>
                </div>
                <p className="text-white font-medium">{c.holder_name}</p>
                <p className="text-sm text-gray-400">{c.belt} — {c.trainer} — {c.issue_date}</p>
              </div>
              <div className="flex gap-2">
                {c.status === "active" && (
                  <button onClick={() => revokeCert(c.id)} className="bg-red-600/20 text-red-400 px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 hover:text-white transition">إلغاء</button>
                )}
                <button onClick={() => deleteCert(c.id)} className="bg-zinc-800 text-gray-400 px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 hover:text-white transition">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
