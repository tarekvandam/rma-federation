"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminRankingsPage() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");
  const [tournament, setTournament] = useState("");
  const [rounds, setRounds] = useState("");
  const [rank, setRank] = useState("");
  const [points, setPoints] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editTournament, setEditTournament] = useState("");
  const [editRounds, setEditRounds] = useState("");
  const [editRank, setEditRank] = useState("");
  const [editPoints, setEditPoints] = useState("");

  async function fetchData() {
    const { data } = await supabase.from("rankings").select("*").order("rank", { ascending: true });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("rankings").insert([{
      name, weight, country, tournament,
      rounds: parseInt(rounds) || 0,
      rank: Number(rank),
      points: Number(points),
    }]);
    if (!error) {
      setName(""); setWeight(""); setCountry(""); setTournament(""); setRounds(""); setRank(""); setPoints("");
      fetchData();
    } else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(id: string) {
    if (confirm("حذف هذا التصنيف؟")) {
      await supabase.from("rankings").delete().eq("id", id);
      fetchData();
    }
  }

  function openEdit(item: any) {
    setEditing(item);
    setEditName(item.name);
    setEditWeight(item.weight);
    setEditCountry(item.country || "");
    setEditTournament(item.tournament || "");
    setEditRounds(String(item.rounds ?? ""));
    setEditRank(String(item.rank));
    setEditPoints(String(item.points));
  }

  async function saveEdit() {
    if (!editing) return;
    await supabase.from("rankings").update({
      name: editName,
      weight: editWeight,
      country: editCountry,
      tournament: editTournament,
      rounds: parseInt(editRounds) || 0,
      rank: Number(editRank),
      points: Number(editPoints),
    }).eq("id", editing.id);
    setEditing(null);
    fetchData();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-8">📊 إدارة الترتيب</h1>

      <form onSubmit={addItem} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم اللاعب" value={name} onChange={(e) => setName(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="الوزن" value={weight} onChange={(e) => setWeight(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="الدولة" value={country} onChange={(e) => setCountry(e.target.value)} className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="اسم البطولة" value={tournament} onChange={(e) => setTournament(e.target.value)} className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="number" placeholder="عدد الجولات" value={rounds} onChange={(e) => setRounds(e.target.value)} className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="number" placeholder="الترتيب" value={rank} onChange={(e) => setRank(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
        </div>
        <input type="number" placeholder="النقاط" value={points} onChange={(e) => setPoints(e.target.value)} required className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
        <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition">إضافة</button>
      </form>

      <h2 className="text-xl font-bold mb-4">الترتيب الحالي</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800 text-gray-400 text-sm">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">اللاعب</th>
              <th className="py-3 px-4">الوزن</th>
              <th className="py-3 px-4">الدولة</th>
              <th className="py-3 px-4">البطولة</th>
              <th className="py-3 px-4">الجولات</th>
              <th className="py-3 px-4">النقاط</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800/50">
                <td className="py-3 px-4 font-bold text-white">{item.rank}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-gray-400">{item.weight}</td>
                <td className="py-3 px-4 text-gray-400">{item.country}</td>
                <td className="py-3 px-4 text-gray-400">{item.tournament || "—"}</td>
                <td className="py-3 px-4 text-gray-400">{item.rounds || "—"}</td>
                <td className="py-3 px-4 font-bold text-blue-400">{item.points}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-blue-400 hover:text-blue-300">✏️</button>
                  <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-300">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد بيانات</p>}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 p-8 w-full max-w-lg space-y-5">
            <h2 className="text-2xl font-bold text-white">تعديل التصنيف</h2>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="اسم اللاعب" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={editWeight} onChange={(e) => setEditWeight(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="الوزن" />
              <input type="text" value={editCountry} onChange={(e) => setEditCountry(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="الدولة" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={editTournament} onChange={(e) => setEditTournament(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="البطولة" />
              <input type="number" value={editRounds} onChange={(e) => setEditRounds(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="الجولات" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" value={editRank} onChange={(e) => setEditRank(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="الترتيب" />
              <input type="number" value={editPoints} onChange={(e) => setEditPoints(e.target.value)}
                className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500 text-white" placeholder="النقاط" />
            </div>
            <div className="flex gap-3">
              <button onClick={saveEdit}
                className="flex-1 bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition">حفظ التعديلات</button>
              <button onClick={() => setEditing(null)}
                className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold hover:bg-zinc-700 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
