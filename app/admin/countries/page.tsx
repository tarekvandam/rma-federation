"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getFlagUrl } from "../../../lib/countryFlags";

export default function AdminCountriesPage() {
  const [country, setCountry] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [flag, setFlag] = useState("");
  const [landline, setLandline] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchData() {
    const { data } = await supabase.from("countries").select("*").order("country", { ascending: true });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  function handleCountryChange(value: string) {
    setCountry(value);
    const autoFlag = getFlagUrl(value);
    if (autoFlag) setFlag(autoFlag);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalFlag = flag || getFlagUrl(country);

    if (editingId) {
      const { error } = await supabase.from("countries").update({ country, trainer_name: trainerName, flag: finalFlag, landline, mobile, email, address, fax }).eq("id", editingId);
      if (!error) { resetForm(); fetchData(); } else { alert(`خطأ: ${error.message}`); }
    } else {
      const { error } = await supabase.from("countries").insert([{ country, trainer_name: trainerName, flag: finalFlag, landline, mobile, email, address, fax }]);
      if (!error) { resetForm(); fetchData(); } else { alert(`خطأ: ${error.message}`); }
    }
  }

  function resetForm() {
    setCountry(""); setTrainerName(""); setFlag(""); setLandline(""); setMobile(""); setEmail(""); setAddress(""); setFax("");
    setEditingId(null);
  }

  function editItem(item: any) {
    setCountry(item.country); setTrainerName(item.trainer_name); setFlag(item.flag || ""); setLandline(item.landline || ""); setMobile(item.mobile || ""); setEmail(item.email || ""); setAddress(item.address || ""); setFax(item.fax || "");
    setEditingId(item.id);
  }

  async function deleteItem(id: string) {
    if (confirm("حذف هذه الدولة؟")) {
      await supabase.from("countries").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-sky-500 mb-8">🌍 إدارة الدول</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">الدولة *</label>
            <input type="text" value={country} onChange={(e) => handleCountryChange(e.target.value)} required placeholder="مثال: مصر" className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">اسم المدرب *</label>
            <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
        </div>

        {flag && (
          <div className="flex items-center gap-3">
            <img src={flag} alt={country} className="w-10 h-auto rounded shadow" />
            <span className="text-sm text-green-400">✅ تم التعرف على العلم تلقائيًا</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">التليفون الأرضي</label>
            <input type="text" value={landline} onChange={(e) => setLandline(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">الموبيل</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">الإيميل</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">الفاكس</label>
            <input type="text" value={fax} onChange={(e) => setFax(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">العنوان</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-sky-600 py-3 rounded-xl font-bold hover:bg-sky-700 transition">
            {editingId ? "تحديث" : "إضافة الدولة"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-zinc-700 px-6 py-3 rounded-xl font-bold hover:bg-zinc-600 transition">
              إلغاء
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">الدول المسجلة</h2>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد دول بعد</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                {item.flag && <img src={item.flag} alt={item.country} className="w-12 h-auto rounded shadow" />}
                <div>
                  <p className="font-bold text-white text-lg">{item.country}</p>
                  <p className="text-sm text-gray-400">المدرب: {item.trainer_name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editItem(item)} className="bg-zinc-800 text-sky-400 hover:bg-sky-600 hover:text-white px-3 py-1.5 rounded-lg text-sm transition">تعديل</button>
                <button onClick={() => deleteItem(item.id)} className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg text-sm transition">حذف</button>
              </div>
            </div>
            {(item.landline || item.mobile || item.email || item.address || item.fax) && (
              <div className="mt-3 text-sm text-gray-500 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {item.landline && <span>📞 {item.landline}</span>}
                {item.mobile && <span>📱 {item.mobile}</span>}
                {item.email && <span>✉️ {item.email}</span>}
                {item.fax && <span>📠 {item.fax}</span>}
                {item.address && <span className="col-span-full">📍 {item.address}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
