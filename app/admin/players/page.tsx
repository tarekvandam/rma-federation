"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

type Promotion = { belt: string; date: string };
type Submission = {
  id: string;
  name: string;
  image: string;
  belt_color: string;
  date_obtained: string;
  promotions: Promotion[];
  status: string;
  created_at: string;
};

const beltOptions = [
  "White", "Yellow 1st", "Yellow 2nd", "Orange 1st", "Orange 2nd",
  "Green 1st", "Green 2nd", "Blue 1st", "Blue 2nd",
  "Brown 1st", "Brown 2nd", "Red 1st", "Red 2nd",
  "Black 1st Dan", "Black 2nd Dan", "Black 3rd Dan",
  "Black 4th Dan", "Black 5th Dan", "Black 6th Dan",
];

export default function AdminPlayersPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editing, setEditing] = useState<Submission | null>(null);
  const [editName, setEditName] = useState("");
  const [editBelt, setEditBelt] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function fetchData() {
    const { data } = await supabase
      .from("player_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubmissions(data as Submission[]);
  }

  useEffect(() => { fetchData(); }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    await supabase.from("player_submissions").update({ status }).eq("id", id);
    fetchData();
  }

  async function deleteSubmission(id: string) {
    if (confirm("Delete this submission?")) {
      await supabase.from("player_submissions").delete().eq("id", id);
      fetchData();
    }
  }

  function openEdit(item: Submission) {
    setEditing(item);
    setEditName(item.name);
    setEditBelt(item.belt_color);
    setEditDate(item.date_obtained || "");
    setEditImage(null);
  }

  async function saveEdit() {
    if (!editing) return;
    let imageUrl = editing.image;
    if (editImage) {
      setUploading(true);
      const ext = editImage.name.split(".").pop();
      const fn = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("news-images").upload(fn, editImage);
      if (!uploadError) {
        imageUrl = `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fn}`;
      }
      setUploading(false);
    }
    await supabase.from("player_submissions").update({
      name: editName,
      belt_color: editBelt,
      date_obtained: editDate,
      image: imageUrl,
    }).eq("id", editing.id);
    setEditing(null);
    fetchData();
  }

  const pending = submissions.filter((s) => s.status === "pending");
  const rejected = submissions.filter((s) => s.status === "rejected");

  const playersWithPendingPromos = submissions.filter((s) => {
    if (s.status !== "approved") return false;
    return (s.promotions || []).some((p: any) => p.approved === false);
  });

  const approved = submissions.filter((s) => {
    if (s.status !== "approved") return false;
    return !(s.promotions || []).some((p: any) => p.approved === false);
  });

  async function approvePromotion(id: string, belt: string, date: string, holderName: string) {
    const { data: sub } = await supabase.from("player_submissions").select("promotions").eq("id", id).single();
    if (!sub) return;

    const promos = (sub.promotions || []) as any[];
    const updated = promos.map((p) => {
      if (p.belt === belt && p.date === date && p.approved === false) {
        return { ...p, approved: true };
      }
      return p;
    });

    await supabase.from("player_submissions").update({ promotions: updated }).eq("id", id);

    const { data: lastCerts } = await supabase.from("certificates").select("certificate_id").order("certificate_id", { ascending: false }).limit(1);
    let seq = 0;
    if (lastCerts && lastCerts.length > 0) {
      const m = lastCerts[0].certificate_id.match(/RMA-(\d{4})-(\d{4})/);
      if (m) seq = parseInt(m[2]);
    }
    seq++;
    const certId = "RMA-2026-" + String(seq).padStart(4, "0");
    await supabase.from("certificates").insert({
      certificate_id: certId,
      holder_name: holderName,
      belt,
      issue_date: date,
      trainer: "Tarek Sayed Ibrahim",
      status: "active",
    });

    fetchData();
  }

  function renderCards(items: Submission[], showAction: boolean) {
    function copyEditLink(id: string, name: string) {
      navigator.clipboard.writeText(`https://rma-federation.vercel.app/players/edit/${id}`);
      alert(`✅ Edit link copied for "${name}"`);
    }

    return items.map((item) => (
      <div key={item.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <div className="flex items-start gap-4">
          {item.image && (
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white text-lg">{item.name}</p>
                <span className="inline-flex rounded-full bg-red-600/20 text-red-300 px-3 py-0.5 text-xs font-bold uppercase">
                  {item.belt_color}
                </span>
                {item.date_obtained && <span className="text-gray-500 text-sm ml-2">Since {item.date_obtained}</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => copyEditLink(item.id, item.name)}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition" title="Copy edit link">🔗</button>
                {showAction && (
                  <>
                    <button onClick={() => updateStatus(item.id, "approved")}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition">✅ Approve</button>
                    <button onClick={() => updateStatus(item.id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition">❌ Reject</button>
                  </>
                )}
                <button onClick={() => openEdit(item)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">✏️ Edit</button>
                <button onClick={() => deleteSubmission(item.id)}
                  className="bg-zinc-800 text-gray-400 px-3 py-1.5 rounded-lg text-sm hover:bg-zinc-700 transition">🗑️</button>
              </div>
            </div>
            {(item.promotions?.length > 0) && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.promotions.map((p: any, i: number) => (
                  <span key={i} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs border ${p.approved === false ? "bg-yellow-600/20 text-yellow-300 border-yellow-600/30" : "bg-zinc-800 text-gray-300 border-transparent"}`}>
                    {p.belt} - {p.date}
                    {p.approved === false && <span className="text-yellow-400 text-[10px]">(pending)</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  }

  function renderPendingPromos() {
    return playersWithPendingPromos.map((item) => {
      const pendingPromos = (item.promotions || []).filter((p: any) => p.approved === false);
      return (
        <div key={item.id} className="bg-zinc-900 rounded-xl border border-yellow-600/30 p-4">
          <div className="flex items-start gap-4">
            {item.image && (
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
            )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white text-lg">{item.name}</p>
                  <button onClick={() => copyEditLink(item.id, item.name)}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition" title="Copy edit link">🔗</button>
                </div>
              <div className="space-y-2 mt-2">
                {pendingPromos.map((p: any, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-800/50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-yellow-300 font-medium">{p.belt}</span>
                      <span className="text-gray-500 mx-2">&#x2022;</span>
                      <span className="text-gray-400 text-sm">{p.date}</span>
                    </div>
                    <button
                      onClick={() => approvePromotion(item.id, p.belt, p.date, item.name)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                    >
                      ✅ Approve &amp; Generate Certificate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-600 mb-8">🥋 إدارة اللاعبين</h1>

      {/* Pending Promotions */}
      {playersWithPendingPromos.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-yellow-400">ترقيات بانتظار الموافقة ({playersWithPendingPromos.length})</h2>
          <div className="space-y-3 mb-8">
            {renderPendingPromos()}
          </div>
        </>
      )}

      {/* Pending */}
      <h2 className="text-xl font-bold mb-4 text-amber-400">قيد المراجعة ({pending.length})</h2>
      <div className="space-y-3 mb-8">
        {pending.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد طلبات</p>}
        {renderCards(pending, true)}
      </div>

      {/* Approved */}
      <h2 className="text-xl font-bold mb-4 text-green-400">تمت الموافقة ({approved.length})</h2>
      <div className="space-y-3 mb-8">
        {approved.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد</p>}
        {renderCards(approved, true)}
      </div>

      {/* Rejected */}
      <h2 className="text-xl font-bold mb-4 text-red-400">مرفوض ({rejected.length})</h2>
      <div className="space-y-3">
        {rejected.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد</p>}
        {renderCards(rejected, false)}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 w-full max-w-lg space-y-5">
            <h2 className="text-2xl font-bold text-white">تعديل اللاعب</h2>

            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="الاسم" />

            <select value={editBelt} onChange={(e) => setEditBelt(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white">
              {beltOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>

            <input type="text" value={editDate} onChange={(e) => setEditDate(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="تاريخ الحصول (DD/MM/YYYY)" />

            <div>
              <label className="block text-sm text-gray-400 mb-2">صورة جديدة (اختياري)</label>
              <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
            </div>

            <div className="flex gap-3">
              <button onClick={saveEdit} disabled={uploading}
                className="flex-1 bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">
                {uploading ? "جاري الرفع..." : "حفظ التعديلات"}
              </button>
              <button onClick={() => setEditing(null)}
                className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
