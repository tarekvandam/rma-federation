"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminMediaPage() {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("");
  const [runtime, setRuntime] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function extractYoutubeId(url: string) {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : url;
  }
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "gallery">("videos");

  async function fetchData() {
    const { data: vData } = await supabase.from("media_videos").select("*").order("created_at", { ascending: false });
    if (vData) setVideos(vData);
    const { data: gData } = await supabase.from("media_gallery").select("*").order("created_at", { ascending: false });
    if (gData) setGallery(gData.filter((item: any) => !item.title?.startsWith("[PARTNER]")));
  }

  useEffect(() => { fetchData(); }, []);

  async function handleUpload(file: File) {
    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const fn = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('news-images').upload(fn, file);
      if (error) throw error;
      const { data } = supabase.storage.from('news-images').getPublicUrl(fn);
      return data.publicUrl;
    } catch { return ""; }
    finally { setUploading(false); }
  }

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
    if (!selectedFile) return;
    const imageUrl = await handleUpload(selectedFile);
    if (!imageUrl) { alert("فشل رفع الصورة — تأكد من وجود Storage bucket"); return; }
    const { error } = await supabase.from("media_gallery").insert([{ image: imageUrl, title: title || "Gallery Image" }]);
    if (!error) { setTitle(""); setSelectedFile(null); fetchData(); }
    else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(table: string, id: string) {
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
            <input type="text" placeholder="عنوان الصورة (اختياري)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-purple-500" />
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} required className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer" />
            <button type="submit" disabled={uploading} className="w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition">رفع الصورة</button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="relative group">
                <img src={g.image} className="w-full h-40 object-cover rounded-xl" />
                <button onClick={() => deleteItem("media_gallery", g.id)} className="absolute top-2 right-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">حذف</button>
              </div>
            ))}
          </div>
          {gallery.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد صور</p>}
        </div>
      )}
    </div>
  );
}
