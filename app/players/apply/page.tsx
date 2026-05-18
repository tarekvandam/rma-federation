"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function PlayerApplyPage() {
  const [name, setName] = useState("");
  const [beltColor, setBeltColor] = useState("");
  const [dateObtained, setDateObtained] = useState("");
  const [promotions, setPromotions] = useState<{ belt: string; date: string }[]>([]);
  const [newPromoBelt, setNewPromoBelt] = useState("");
  const [newPromoDate, setNewPromoDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const beltOptions = [
    "White",
    "Yellow 1st", "Yellow 2nd",
    "Orange 1st", "Orange 2nd",
    "Green 1st", "Green 2nd",
    "Blue 1st", "Blue 2nd",
    "Brown 1st", "Brown 2nd",
    "Red 1st", "Red 2nd",
    "Black 1st Dan", "Black 2nd Dan", "Black 3rd Dan",
    "Black 4th Dan", "Black 5th Dan", "Black 6th Dan",
  ];

  function addPromotion() {
    if (!newPromoBelt || !newPromoDate) return;
    setPromotions([...promotions, { belt: newPromoBelt, date: newPromoDate }]);
    setNewPromoBelt("");
    setNewPromoDate("");
  }

  function removePromotion(index: number) {
    setPromotions(promotions.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";
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

    const { error } = await supabase.from("player_submissions").insert([
      {
        name,
        image: imageUrl,
        belt_color: beltColor,
        date_obtained: dateObtained,
        promotions,
      },
    ]);

    setUploading(false);

    if (!error) {
      setSubmitted(true);
    } else {
      alert("Error submitting: " + error.message);
    }
  }

  if (submitted) {
    return (
      <main className="bg-black text-white min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <p className="text-6xl mb-6">✅</p>
          <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
          <p className="text-gray-400 text-lg">
            Your information has been submitted. The federation admin will review it and approve it shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            Player Registration
          </span>
          <h1 className="text-4xl font-bold mb-4">
            Join the <span className="text-red-600">Roster</span>
          </h1>
          <p className="text-gray-400">
            Submit your info and belt history. The admin will review and approve your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Your Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-red-600" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Your Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Belt *</label>
              <select value={beltColor} onChange={(e) => setBeltColor(e.target.value)} required
                className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-red-600">
                <option value="">Select belt</option>
                {beltOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date Obtained *</label>
              <input type="date" value={dateObtained} onChange={(e) => setDateObtained(e.target.value)} required
                className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-red-600 [color-scheme:dark]" />
            </div>
          </div>

          {/* Promotions */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Belt History (optional)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {promotions.map((p, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1 text-sm">
                  {p.belt} - {p.date}
                  <button type="button" onClick={() => removePromotion(i)} className="text-red-400 hover:text-red-300">✕</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <select value={newPromoBelt} onChange={(e) => setNewPromoBelt(e.target.value)}
                className="bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-red-600 text-sm">
                <option value="">Belt</option>
                {beltOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <input type="date" value={newPromoDate} onChange={(e) => setNewPromoDate(e.target.value)}
                className="bg-black border border-zinc-700 p-2 rounded-xl outline-none focus:border-red-600 text-sm [color-scheme:dark]" />
              <button type="button" onClick={addPromotion}
                className="bg-zinc-800 px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition">+ Add</button>
            </div>
          </div>

          <button type="submit" disabled={uploading}
            className="w-full bg-red-600 py-3 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 transition">
            {uploading ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </main>
  );
}
