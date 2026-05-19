"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase";
import { useParams, useRouter } from "next/navigation";

const beltOptions = [
  "White", "Yellow 1st", "Yellow 2nd",
  "Orange 1st", "Orange 2nd", "Green 1st", "Green 2nd",
  "Blue 1st", "Blue 2nd", "Brown 1st", "Brown 2nd",
  "Red 1st", "Red 2nd",
  "Black 1st Dan", "Black 2nd Dan", "Black 3rd Dan",
  "Black 4th Dan", "Black 5th Dan", "Black 6th Dan",
];

export default function PlayerEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [beltColor, setBeltColor] = useState("");
  const [dateObtained, setDateObtained] = useState("");
  const [promotions, setPromotions] = useState<{ belt: string; date: string }[]>([]);
  const [newPromoBelt, setNewPromoBelt] = useState("");
  const [newPromoDate, setNewPromoDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error: fetchError } = await supabase
        .from("player_submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setName(data.name || "");
      setBeltColor(data.belt_color || "");
      setDateObtained(data.date_obtained || "");
      setExistingImage(data.image || "");
      const approvedPromos = (data.promotions || []).map((p: any) => ({ belt: p.belt, date: p.date }));
      setPromotions(approvedPromos);
      setLoading(false);
    }
    load();
  }, [id]);

  function addPromotion() {
    if (!newPromoBelt || !newPromoDate) return;
    setPromotions([...promotions, { belt: newPromoBelt, date: newPromoDate }]);
    setNewPromoBelt("");
    setNewPromoDate("");
  }

  function removePromotion(index: number) {
    setPromotions(promotions.filter((_, i) => i !== index));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    let imageUrl = existingImage;
    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop();
      const fileName = `player_${Date.now()}.${ext}`;
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
      if (res.ok) {
        imageUrl = `https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/${fileName}`;
      }
    }

    const { data: existing } = await supabase
      .from("player_submissions")
      .select("promotions")
      .eq("id", id)
      .single();

    const oldPromos = (existing?.promotions || []) as { belt: string; date: string }[];
    const oldKeys = new Set(oldPromos.map((p: any) => p.belt + "|" + p.date));

    const mergedPromos = promotions.map(p => ({
      belt: p.belt,
      date: p.date,
      approved: oldKeys.has(p.belt + "|" + p.date),
    }));

    const { error: updateError } = await supabase
      .from("player_submissions")
      .update({
        name,
        belt_color: beltColor,
        date_obtained: dateObtained,
        image: imageUrl,
        promotions: mergedPromos,
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
    }
  }

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen pt-32 px-6 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="bg-black text-white min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Not Found</h1>
          <p className="text-gray-400">Player not found. Check your edit link.</p>
        </div>
      </main>
    );
  }

  if (saved) {
    return (
      <main className="bg-black text-white min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <p className="text-6xl mb-6">✅</p>
          <h1 className="text-3xl font-bold mb-4">Profile Updated!</h1>
          <p className="text-gray-400 text-lg mb-6">
            Your changes have been saved.
          </p>
          <a href={`/players/edit/${id}`} className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
            Continue editing
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full bg-sky-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300 shadow-sm shadow-sky-900/20 mb-6">
            Edit Profile
          </span>
          <h1 className="text-4xl font-bold mb-4">
            Update Your <span className="text-sky-500">Profile</span>
          </h1>
          <p className="text-gray-400">
            Edit your name, photo, and belt history. New belts will be reviewed by the admin.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Your Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Photo</label>
            {existingImage && (
              <img src={existingImage} alt={name} className="w-24 h-24 object-cover rounded-xl mb-2" />
            )}
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Belt *</label>
              <select value={beltColor} onChange={(e) => setBeltColor(e.target.value)} required
                className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500">
                <option value="">Select belt</option>
                {beltOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date Obtained *</label>
              <input type="date" value={dateObtained} onChange={(e) => setDateObtained(e.target.value)} required
                className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-sky-500 [color-scheme:dark]" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Belt History</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {promotions.map((p, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1 text-sm">
                  {p.belt} - {p.date}
                  <button type="button" onClick={() => removePromotion(i)} className="text-red-400 hover:text-red-300">&#x2715;</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <select value={newPromoBelt} onChange={(e) => setNewPromoBelt(e.target.value)}
                className="bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-sky-500 text-sm">
                <option value="">Belt</option>
                {beltOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <input type="date" value={newPromoDate} onChange={(e) => setNewPromoDate(e.target.value)}
                className="bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-sky-500 text-sm [color-scheme:dark]" />
              <button type="button" onClick={addPromotion}
                className="bg-zinc-800 px-4 py-2 rounded-xl text-sm hover:bg-sky-600 transition">+ Add</button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              New belts you add here will be reviewed and approved by the admin.
            </p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={saving}
            className="w-full bg-sky-600 py-3 rounded-xl font-bold hover:bg-sky-700 disabled:opacity-50 transition">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
