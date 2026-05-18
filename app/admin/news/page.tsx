"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminNewsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function fetchNews() {
    const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (data) setNewsList(data);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  async function handleFileUpload(file: File) {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/news-images/${fileName}`,
        {
          method: "POST",
          headers: {
            apikey: "sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
            Authorization: "Bearer sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
          },
          body: file,
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      return `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fileName}`;

    } catch (err: any) {
      alert("Upload error: " + (err?.message || err?.error || "unknown error"));
      return "";
    } finally {
      setUploading(false);
    }
  }

  async function addNews(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = "";

    if (selectedFile) {
      imageUrl = await handleFileUpload(selectedFile);
    }

    const { error } = await supabase.from("news").insert([{ title, description, image: imageUrl }]);

    if (!error) {
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      fetchNews();
    } else {
      alert(`خطأ: ${error.message}`);
    }
  }

  async function deleteNews(id: string) {
    if (confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      await supabase.from("news").delete().eq("id", id);
      fetchNews();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-600">📰 إدارة الأخبار</h1>
      </div>

      <form onSubmit={addNews} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div>
          <label className="block text-sm text-gray-400 mb-2">عنوان الخبر</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">وصف الخبر</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-red-600"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">صورة الخبر</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-red-600 py-3 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 transition"
        >
          {uploading ? "جاري الرفع..." : "نشر الخبر"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">الأخبار الحالية</h2>
      <div className="space-y-3">
        {newsList.length === 0 && (
          <p className="text-gray-500 text-center py-8">لا توجد أخبار بعد</p>
        )}
        {newsList.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
            <button
              onClick={() => deleteNews(item.id)}
              className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
