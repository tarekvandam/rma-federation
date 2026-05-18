"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminTrainersPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

  async function fetchData() {
    const { data } = await supabase.from("trainers").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fn = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('news-images').upload(fn, file);
      if (error) throw error;
      return `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fn}`;
    } catch (err: any) { alert("Upload error: " + (err?.message || err)); return ""; }
    finally { setUploading(false); }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = selectedFile ? await handleUpload(selectedFile) : "";
    const { error } = await supabase.from("trainers").insert([{ name, role, description, image: imageUrl }]);
    if (!error) {
      setName(""); setRole(""); setDescription(""); setSelectedFile(null);
      fetchData();
    } else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(id: string) {
    if (confirm("حذف هذا المدرب؟")) {
      await supabase.from("trainers").delete().eq("id", id);
      fetchData();
    }
  }

  function openEdit(item: any) {
    setEditing(item);
    setEditName(item.name);
    setEditRole(item.role);
    setEditDesc(item.description || "");
    setEditImage(null);
  }

  async function saveEdit() {
    if (!editing) return;
    let imageUrl = editing.image;
    if (editImage) {
      const url = await handleUpload(editImage);
      if (url) imageUrl = url;
    }
    await supabase.from("trainers").update({
      name: editName,
      role: editRole,
      description: editDesc,
      image: imageUrl,
    }).eq("id", editing.id);
    setEditing(null);
    fetchData();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-8">🥋 إدارة المدربين</h1>

      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl mb-6 text-sm text-yellow-400">
        ⚠️ لتعديل المدربين الأساسيين (Tarek Vandam, Mayada Salah)، أضفهم هنا بنفس الأسماء بالضبط، ثم عدّل بياناتهم.
      </div>

      <form onSubmit={addItem} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم المدرب" value={name} onChange={(e) => setName(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500" />
          <input type="text" placeholder="التخصص" value={role} onChange={(e) => setRole(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500" />
        </div>
        <textarea placeholder="الوصف" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500" />
        <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer" />
        <button type="submit" disabled={uploading} className="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition">إضافة المدرب</button>
      </form>

      <h2 className="text-xl font-bold mb-4">المدربين الحاليين</h2>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا يوجد مدربين بعد</p>}
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-4">
              {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded-lg" />}
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">✏️ تعديل</button>
              <button onClick={() => deleteItem(item.id)} className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition">حذف</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 w-full max-w-lg space-y-5">
            <h2 className="text-2xl font-bold text-white">تعديل المدرب</h2>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="الاسم" />
            <input type="text" value={editRole} onChange={(e) => setEditRole(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="التخصص" />
            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={3}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="الوصف" />
            <div>
              <label className="block text-sm text-gray-400 mb-2">صورة جديدة (اختياري)</label>
              <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer" />
            </div>
            <div className="flex gap-3">
              <button onClick={saveEdit} disabled={uploading}
                className="flex-1 bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50">
                {uploading ? "جاري الرفع..." : "حفظ التعديلات"}
              </button>
              <button onClick={() => setEditing(null)}
                className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
