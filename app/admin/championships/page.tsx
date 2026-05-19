"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminChampionshipsPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchData() {
    const { data } = await supabase.from("championships").select("*").order("date", { ascending: false });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleUpload(file: File) {
    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const name = `${Date.now()}.${ext}`;
      const res = await fetch(
        `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/news-images/${name}`,
        {
          method: "POST",
          headers: {
            apikey: "sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
            Authorization: "Bearer sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
          },
          body: file,
        }
      );
      if (res.ok) return `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${name}`;
      return "";
    } catch { return ""; }
    finally { setUploading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    let imageUrl = selectedFile ? await handleUpload(selectedFile) : editingId ? undefined : "";

    const data: any = { title, date, location, description };
    if (imageUrl) data.image = imageUrl;

    let error;
    if (editingId) {
      const res = await supabase.from("championships").update(data).eq("id", editingId);
      error = res.error;
    } else {
      if (!imageUrl) data.image = "";
      const res = await supabase.from("championships").insert([data]);
      error = res.error;
    }

    setUploading(false);
    if (error) { alert(`خطأ: ${error.message}`); return; }
    setTitle(""); setDate(""); setLocation(""); setDescription(""); setSelectedFile(null); setEditingId(null);
    fetchData();
  }

  function editItem(item: any) {
    setEditingId(item.id);
    setTitle(item.title);
    setDate(item.date);
    setLocation(item.location);
    setDescription(item.description || "");
    setSelectedFile(null);
  }

  async function deleteItem(id: string) {
    if (confirm("حذف هذه البطولة؟")) {
      await supabase.from("championships").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-500 mb-8">🏆 إدارة البطولات</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <h2 className="text-xl font-bold text-white">{editingId ? "تعديل البطولة" : "إضافة بطولة جديدة"}</h2>
        <input type="text" placeholder="اسم البطولة" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-amber-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-amber-500" />
          <input type="text" placeholder="المكان" value={location} onChange={(e) => setLocation(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-amber-500" />
        </div>
        <textarea placeholder="الوصف" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-amber-500" />
        <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer" />
        <div className="flex gap-3">
          <button type="submit" disabled={uploading} className="flex-1 bg-amber-600 py-3 rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50 transition">
            {uploading ? "جاري الرفع..." : editingId ? "حفظ التعديلات" : "إضافة البطولة"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setTitle(""); setDate(""); setLocation(""); setDescription(""); setSelectedFile(null); }}
              className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">إلغاء</button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">البطولات الحالية</h2>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد بطولات بعد</p>}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4">
              {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg" />}
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-gray-500">{item.location} — {item.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editItem(item)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">✏️ تعديل</button>
              <button onClick={() => deleteItem(item.id)} className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
