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

  async function fetchData() {
    const { data } = await supabase.from("trainers").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 mb-8">🥋 إدارة المدربين</h1>

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
            <button onClick={() => deleteItem(item.id)} className="bg-zinc-800 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition">حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
}
