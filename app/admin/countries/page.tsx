"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getFlagUrl } from "../../../lib/countryFlags";

export default function AdminCountriesPage() {
  const [country, setCountry] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [trainerTitle, setTrainerTitle] = useState("");
  const [trainerImage, setTrainerImage] = useState<File | null>(null);
  const [flag, setFlag] = useState("");
  const [landline, setLandline] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [continent, setContinent] = useState("");
  const [uploading, setUploading] = useState(false);
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

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fn = `country_${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('news-images').upload(fn, file);
      if (error) throw error;
      return `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fn}`;
    } catch (err: any) { alert("Upload error: " + (err?.message || err)); return ""; }
    finally { setUploading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    const finalFlag = flag || getFlagUrl(country);
    let imageUrl = editingId ? items.find(i => i.id === editingId)?.trainer_image || "" : "";
    if (trainerImage) {
      const url = await uploadImage(trainerImage);
      if (url) imageUrl = url;
    }

    const payload = {
      country, trainer_name: trainerName, trainer_title: trainerTitle, trainer_image: imageUrl,
      continent, flag: finalFlag, landline, mobile, email, address, fax,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("countries").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("countries").insert([payload]));
    }

    setUploading(false);
    if (!error) { resetForm(); fetchData(); } else { alert(`خطأ: ${error.message}`); }
  }

  function resetForm() {
    setCountry(""); setTrainerName(""); setTrainerTitle(""); setTrainerImage(null); setFlag("");
    setLandline(""); setMobile(""); setEmail(""); setAddress(""); setFax(""); setContinent("");
    setEditingId(null);
  }

  function editItem(item: any) {
    setCountry(item.country); setTrainerName(item.trainer_name); setTrainerTitle(item.trainer_title || "");
    setFlag(item.flag || ""); setLandline(item.landline || ""); setMobile(item.mobile || "");
    setEmail(item.email || ""); setAddress(item.address || ""); setFax(item.fax || "");
    setContinent(item.continent || ""); setTrainerImage(null);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">صفة المدرب</label>
            <input type="text" value={trainerTitle} onChange={(e) => setTrainerTitle(e.target.value)} placeholder="مثال: مدرب معتمد - رئيس الاتحاد" className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">صورة المدرب الشخصية</label>
            <input type="file" accept="image/*" onChange={(e) => setTrainerImage(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer w-full" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">القارة</label>
            <select value={continent} onChange={(e) => setContinent(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500 text-white">
              <option value="">اختر القارة</option>
              <option value="Africa">أفريقيا</option>
              <option value="Asia">آسيا</option>
              <option value="Europe">أوروبا</option>
              <option value="North America">أمريكا الشمالية</option>
              <option value="South America">أمريكا الجنوبية</option>
              <option value="Oceania">أوقيانوسيا</option>
            </select>
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
          <button type="submit" disabled={uploading} className="flex-1 bg-sky-600 py-3 rounded-xl font-bold hover:bg-sky-700 transition disabled:opacity-50">
            {uploading ? "جاري الرفع..." : editingId ? "تحديث" : "إضافة الدولة"}
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
                {item.trainer_image ? (
                  <img src={item.trainer_image} className="w-12 h-12 object-cover rounded-full" />
                ) : item.flag ? (
                  <img src={item.flag} alt={item.country} className="w-12 h-auto rounded shadow" />
                ) : null}
                <div>
                  <p className="font-bold text-white text-lg">{item.country}</p>
                  <p className="text-sm text-gray-400">{item.trainer_name}</p>
                  {item.trainer_title && <p className="text-xs text-sky-400">{item.trainer_title}</p>}
                  {item.continent && <p className="text-xs text-gray-500">{item.continent}</p>}
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
