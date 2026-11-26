"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

// Shrinks big phone photos before upload so the public page stays fast.
async function shrinkImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const maxSide = 1000;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export default function AdminCoachesPage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editDegree, setEditDegree] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

  async function fetchData() {
    const { data } = await supabase.from("course_coaches").select("*").order("created_at", { ascending: true });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const blob = await shrinkImage(file);
      const ext = blob === file ? (file.name.split(".").pop() || "jpg") : "jpg";
      const fn = `coach-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("news-images").upload(fn, blob, { contentType: blob.type || "image/jpeg" });
      if (error) throw error;
      return `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fn}`;
    } catch (err: any) {
      alert("Upload error: " + (err?.message || err));
      return "";
    } finally {
      setUploading(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const imageUrl = selectedFile ? await handleUpload(selectedFile) : "";
    if (selectedFile && !imageUrl) return;
    const { error } = await supabase.from("course_coaches").insert([{ name, country, degree, image: imageUrl }]);
    if (!error) {
      setName(""); setCountry(""); setDegree(""); setSelectedFile(null);
      const fi = document.getElementById("coach-photo") as HTMLInputElement | null; if (fi) fi.value = "";
      fetchData();
    } else {
      alert(`خطأ: ${error.message}`);
    }
  }

  async function deleteItem(id: number) {
    if (confirm("حذف هذا المدرب؟")) {
      await supabase.from("course_coaches").delete().eq("id", id);
      fetchData();
    }
  }

  function openEdit(item: any) {
    setEditing(item);
    setEditName(item.name || "");
    setEditCountry(item.country || "");
    setEditDegree(item.degree || "");
    setEditImage(null);
  }

  async function saveEdit() {
    if (!editing) return;
    let imageUrl = editing.image;
    if (editImage) {
      const url = await handleUpload(editImage);
      if (!url) return;
      imageUrl = url;
    }
    const { error } = await supabase.from("course_coaches").update({
      name: editName,
      country: editCountry,
      degree: editDegree,
      image: imageUrl,
    }).eq("id", editing.id);
    if (error) { alert(`خطأ: ${error.message}`); return; }
    setEditing(null);
    fetchData();
  }

  const inputClass = "w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white";
  const fileClass = "text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer w-full";

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-8">🥋 مدربو وحكام الدورة</h1>

      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl mb-6 text-sm text-gray-400">
        هذه القائمة تظهر فقط في صفحة Coaches &amp; Referees (من صفحة اللاعبين)، ولا تظهر في الصفحة الرئيسية.
      </div>

      <form onSubmit={addItem} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          <input type="text" placeholder="الدولة" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
          <input type="text" placeholder="الدرجة" value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">الصورة</label>
          <input id="coach-photo" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className={fileClass} />
        </div>
        <button type="submit" disabled={uploading} className="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition">
          {uploading ? "جاري الرفع..." : "إضافة"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">القائمة الحالية</h2>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا يوجد أحد بعد</p>}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4">
              {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg" />}
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-gray-500">{item.country}</p>
                {item.degree && <p className="text-xs text-green-400">{item.degree}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">✏️ تعديل</button>
              <button onClick={() => deleteItem(item.id)} className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition">حذف</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 w-full max-w-lg space-y-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white">تعديل</h2>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className={inputClass} placeholder="الاسم" />
            <input type="text" value={editCountry} onChange={(e) => setEditCountry(e.target.value)} className={inputClass} placeholder="الدولة" />
            <input type="text" value={editDegree} onChange={(e) => setEditDegree(e.target.value)} className={inputClass} placeholder="الدرجة" />
            <div>
              <label className="block text-sm text-gray-400 mb-2">صورة جديدة (اختياري)</label>
              <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] || null)} className={fileClass} />
            </div>
            <div className="flex gap-3">
              <button onClick={saveEdit} disabled={uploading} className="flex-1 bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50">
                {uploading ? "جاري الرفع..." : "حفظ التعديلات"}
              </button>
              <button onClick={() => setEditing(null)} className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
