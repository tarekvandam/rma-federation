"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminTrainersPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [certs, setCerts] = useState<string[]>([]);
  const [newCert, setNewCert] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editYears, setEditYears] = useState("");
  const [editCerts, setEditCerts] = useState<string[]>([]);
  const [editNewCert, setEditNewCert] = useState("");
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

  function addCert() {
    const c = newCert.trim();
    if (c && !certs.includes(c)) { setCerts([...certs, c]); setNewCert(""); }
  }

  function removeCert(c: string) {
    setCerts(certs.filter(x => x !== c));
  }

  function addEditCert() {
    const c = editNewCert.trim();
    if (c && !editCerts.includes(c)) { setEditCerts([...editCerts, c]); setEditNewCert(""); }
  }

  function removeEditCert(c: string) {
    setEditCerts(editCerts.filter(x => x !== c));
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = selectedFile ? await handleUpload(selectedFile) : "";
    const { error } = await supabase.from("trainers").insert([{
      name, role, description,
      years_experience: parseInt(yearsExp) || 0,
      certifications: certs,
      image: imageUrl,
    }]);
    if (!error) {
      setName(""); setRole(""); setDescription(""); setYearsExp(""); setCerts([]); setSelectedFile(null);
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
    setEditYears(String(item.years_experience ?? ""));
    setEditCerts(item.certifications || []);
    setEditNewCert("");
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
      years_experience: parseInt(editYears) || 0,
      certifications: editCerts,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">سنوات الخبرة</label>
            <input type="number" min="0" value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">صورة المدرب</label>
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">الشهادات</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {certs.map(c => (
              <span key={c} className="inline-flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1 text-sm text-white">
                {c}
                <button type="button" onClick={() => removeCert(c)} className="text-red-400 hover:text-red-300">✕</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newCert} onChange={(e) => setNewCert(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCert(); } }} placeholder="شهادة جديدة" className="flex-1 bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-green-500 text-sm" />
            <button type="button" onClick={addCert} className="bg-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition">إضافة</button>
          </div>
        </div>
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
                {item.years_experience > 0 && <p className="text-xs text-green-400">{item.years_experience} years</p>}
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
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 w-full max-w-lg space-y-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white">تعديل المدرب</h2>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="الاسم" />
            <input type="text" value={editRole} onChange={(e) => setEditRole(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="التخصص" />
            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={3}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" placeholder="الوصف" />
            <div>
              <label className="block text-sm text-gray-400 mb-1">سنوات الخبرة</label>
              <input type="number" min="0" value={editYears} onChange={(e) => setEditYears(e.target.value)}
                className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-green-500 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">الشهادات</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {editCerts.map(c => (
                  <span key={c} className="inline-flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1 text-sm text-white">
                    {c}
                    <button type="button" onClick={() => removeEditCert(c)} className="text-red-400 hover:text-red-300">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={editNewCert} onChange={(e) => setEditNewCert(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addEditCert(); } }} placeholder="شهادة جديدة" className="flex-1 bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-green-500 text-sm text-white" />
                <button type="button" onClick={addEditCert} className="bg-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition">إضافة</button>
              </div>
            </div>
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
