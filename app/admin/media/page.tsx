"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { isValidImageUrl, thumbUrl } from "../../../lib/gallery";

export default function AdminMediaPage() {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("");
  const [runtime, setRuntime] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function extractYoutubeId(url: string) {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
  }
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "gallery">("videos");

  async function fetchData() {
    const { data: vData } = await supabase.from("media_videos").select("*").order("created_at", { ascending: false });
    if (vData) setVideos(vData);
    const { data: gData } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (gData) setGallery(gData);
  }

  useEffect(() => { fetchData(); }, []);

  async function addVideo(e: React.FormEvent) {
    e.preventDefault();
    const id = extractYoutubeId(youtubeUrl);
    if (!id) { alert("رابط يوتيوب غير صحيح"); return; }
    const { error } = await supabase.from("media_videos").insert([{ title, channel: channel || "RMA Federation", runtime, youtube_id: id }]);
    if (!error) { setTitle(""); setChannel(""); setRuntime(""); setYoutubeUrl(""); fetchData(); }
    else { alert(`خطأ: ${error.message}`); }
  }

  async function addGallery(e: React.FormEvent) {
    e.preventDefault();
    const clean = imageUrl.trim();
    if (!isValidImageUrl(clean)) { alert("الرابط لازم يبدأ بـ https://"); return; }
    setSaving(true);
    const { error } = await supabase.from("gallery_images").insert([{ image_url: clean, caption: caption.trim().slice(0, 200) }]);
    setSaving(false);
    if (!error) { setImageUrl(""); setCaption(""); fetchData(); }
    else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(table: string, id: string | number) {
    if (confirm("حذف؟")) {
      await supabase.from(table).delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-500 mb-8">🎬 إدارة الميديا</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("videos")} className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === "videos" ? "bg-purple-600" : "bg-zinc-800 text-gray-400"}`}>فيديوهات</button>
        <button onClick={() => setActiveTab("gallery")} className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === "gallery" ? "bg-purple-600" : "bg-zinc-800 text-gray-400"}`}>معرض الصور</button>
      </div>

      {activeTab === "videos" && (
        <div>
          <form onSubmit={addVideo} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
            <input type="text" placeholder="عنوان الفيديو" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <input type="text" placeholder="اسم القناة (مثال: RMA Federation)" value={channel} onChange={(e) => setChannel(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <input type="text" placeholder="المدة (مثال: 12:34)" value={runtime} onChange={(e) => setRuntime(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <input type="text" placeholder="رابط يوتيوب (مثال: https://youtu.be/g5_SF0A4NBo)" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <button type="submit" className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition">إضافة فيديو</button>
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((v) => (
              <div key={v.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <iframe className="w-full h-48 rounded-lg mb-3" src={`https://www.youtube.com/embed/${v.youtube_id}`} title={v.title} allowFullScreen />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{v.title}</p>
                    {v.channel && <p className="text-sm text-gray-400">{v.channel}{v.runtime ? ` · ${v.runtime}` : ""}</p>}
                  </div>
                  <button onClick={() => deleteItem("media_videos", v.id)} className="text-red-400 hover:text-red-300 text-sm">حذف</button>
                </div>
              </div>
            ))}
          </div>
          {videos.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد فيديوهات</p>}
        </div>
      )}

      {activeTab === "gallery" && (
        <div>
          <form onSubmit={addGallery} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
            <p className="text-sm text-gray-400">ارفع الصورة على Cloudinary ثم الصق رابطها هنا.</p>
            <input type="url" dir="ltr" placeholder="رابط الصورة (https://res.cloudinary.com/...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <input type="text" maxLength={200} placeholder="وصف الصورة (اختياري)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            {imageUrl.trim() && isValidImageUrl(imageUrl) && (
              <img src={thumbUrl(imageUrl, 400)} alt="معاينة" referrerPolicy="no-referrer" className="h-40 rounded-xl object-cover" />
            )}
            <button type="submit" disabled={saving} className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition">إضافة للمعرض</button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="relative group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                <img src={thumbUrl(g.image_url, 400)} alt={g.caption || ""} referrerPolicy="no-referrer" className="w-full h-40 object-cover" />
                {g.caption && <p className="p-2 text-xs text-gray-400">{g.caption}</p>}
                <button onClick={() => deleteItem("gallery_images", g.id)} className="absolute top-2 right-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">حذف</button>
              </div>
            ))}
          </div>
          {gallery.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد صور</p>}
        </div>
      )}
    </div>
  );
}
