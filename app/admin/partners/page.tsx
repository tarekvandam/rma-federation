"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

type Partner = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  created_at: string;
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function fetchPartners() {
    const { data, error: fetchErr } = await supabase
      .from("media_gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchErr) { setError("Error loading: " + fetchErr.message); return; }
    if (data) {
      setPartners(data.filter((item: any) => item.title?.startsWith("[PARTNER]")).map((item: any) => ({
        id: item.id,
        name: item.title?.replace("[PARTNER]", "").split("|||")[0] || "",
        logo_url: item.image || "",
        website_url: item.title?.split("|||")[1] || "",
        created_at: item.created_at,
      })));
    }
  }

  useEffect(() => { fetchPartners(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return;
    setUploading(true);

    let logoUrl = "";
    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop();
      const fileName = `partner_${Date.now()}.${ext}`;
      const res = await fetch(
        `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/news-images/${fileName}`,
        {
          method: "POST",
          headers: {
            apikey: "sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
            Authorization: "Bearer sb_publishable_7p64Ye0CsqkP9Iny8QQsTA_y0KRCOIn",
          },
          body: selectedFile,
        }
      );
      if (!res.ok) { setError("Failed to upload image"); setUploading(false); return; }
      logoUrl = `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fileName}`;
    }

    const storedTitle = `[PARTNER]${name.trim()}${websiteUrl.trim() ? `|||${websiteUrl.trim()}` : ""}`;

    let dbError;
    if (editingId) {
      const updateData: any = { title: storedTitle };
      if (logoUrl) updateData.image = logoUrl;
      const { error: e } = await supabase.from("media_gallery").update(updateData).eq("id", editingId);
      dbError = e;
    } else {
      const { error: e } = await supabase.from("media_gallery").insert({
        title: storedTitle,
        image: logoUrl,
      });
      dbError = e;
    }

    setUploading(false);

    if (dbError) { setError("Database error: " + dbError.message); return; }

    setName("");
    setWebsiteUrl("");
    setSelectedFile(null);
    setEditingId(null);
    fetchPartners();
  }

  function editPartner(p: Partner) {
    setEditingId(p.id);
    setName(p.name);
    setWebsiteUrl(p.website_url || "");
    setSelectedFile(null);
  }

  async function deletePartner(id: string) {
    if (confirm("Delete this partner?")) {
      await supabase.from("media_gallery").delete().eq("id", id);
      fetchPartners();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-sky-500 mb-8">🤝 إدارة الشركاء</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-8 space-y-4 max-w-lg">
        <h2 className="text-xl font-bold text-white">{editingId ? "تعديل الشريك" : "إضافة شريك جديد"}</h2>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم المنظمة / الاتحاد" required
          className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500 text-white" />

        <input type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="رابط الموقع (اختياري)"
          className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500 text-white" />

        <div>
          <label className="block text-sm text-gray-400 mb-2">اللوجو</label>
          <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={uploading}
            className="flex-1 bg-sky-600 py-3 rounded-xl font-bold hover:bg-sky-700 transition disabled:opacity-50">
            {uploading ? "جاري الرفع..." : editingId ? "حفظ التعديلات" : "إضافة"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setName(""); setWebsiteUrl(""); setSelectedFile(null); }}
              className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">إلغاء</button>
          )}
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <div key={p.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 flex items-center gap-4">
            {p.logo_url && (
              <img src={p.logo_url} alt={p.name} className="w-16 h-16 object-contain rounded-xl bg-zinc-800" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{p.name}</p>
              {p.website_url && (
                <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 truncate block underline underline-offset-2">
                  {p.website_url}
                </a>
              )}
            </div>
            <div className="flex gap-1">
              <button onClick={() => editPartner(p)}
                className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-xs hover:bg-blue-700 transition">✏️</button>
              <button onClick={() => deletePartner(p.id)}
                className="bg-zinc-800 text-gray-400 px-2.5 py-1.5 rounded-lg text-xs hover:bg-zinc-700 transition">🗑️</button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <p className="text-gray-500 text-center py-8 col-span-full">لا يوجد شركاء بعد</p>
        )}
      </div>
    </div>
  );
}
