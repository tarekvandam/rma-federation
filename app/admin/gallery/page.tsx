"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { isValidImageUrl, thumbUrl } from "../../../lib/gallery";

export default function AdminGalleryPage() {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  async function fetchData() {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function addImage(e: React.FormEvent) {
    e.preventDefault();
    const clean = url.trim();
    if (!isValidImageUrl(clean)) { alert("الرابط لازم يبدأ بـ https://"); return; }
    setSaving(true);
    const { error } = await supabase.from("gallery_images").insert([{ image_url: clean, caption: caption.trim().slice(0, 200) }]);
    setSaving(false);
    if (!error) { setUrl(""); setCaption(""); fetchData(); }
    else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(id: number) {
    if (confirm("حذف الصورة من المعرض؟ (الصورة الأصلية على Cloudinary لن تُحذف)")) {
      await supabase.from("gallery_images").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-500 mb-8">🖼️ المعرض</h1>

      <form onSubmit={addImage} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <p className="text-sm text-gray-400">الصور تُرفع على Cloudinary، ثم الصق رابط الصورة هنا.</p>
        <input type="url" dir="ltr" placeholder="رابط الصورة (https://res.cloudinary.com/...)" value={url} onChange={(e) => setUrl(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
        <input type="text" maxLength={200} placeholder="وصف الصورة (اختياري)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
        {url.trim() && isValidImageUrl(url) && (
          <img src={thumbUrl(url, 400)} alt="معاينة" referrerPolicy="no-referrer" className="h-40 rounded-xl object-cover" />
        )}
        <button type="submit" disabled={saving} className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition">إضافة للمعرض</button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((g) => (
          <div key={g.id} className="relative group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
            <img src={thumbUrl(g.image_url, 400)} alt={g.caption || ""} referrerPolicy="no-referrer" className="w-full h-40 object-cover" />
            {g.caption && <p className="p-2 text-xs text-gray-400">{g.caption}</p>}
            <button onClick={() => deleteItem(g.id)} className="absolute top-2 right-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">حذف</button>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد صور</p>}
    </div>
  );
}
