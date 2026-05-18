"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminRankingsPage() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");
  const [rank, setRank] = useState("");
  const [points, setPoints] = useState("");
  const [items, setItems] = useState<any[]>([]);

  async function fetchData() {
    const { data } = await supabase.from("rankings").select("*").order("rank", { ascending: true });
    if (data) setItems(data);
  }

  useEffect(() => { fetchData(); }, []);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("rankings").insert([{ name, weight, country, rank: Number(rank), points: Number(points) }]);
    if (!error) {
      setName(""); setWeight(""); setCountry(""); setRank(""); setPoints("");
      fetchData();
    } else { alert(`خطأ: ${error.message}`); }
  }

  async function deleteItem(id: string) {
    if (confirm("حذف هذا التصنيف؟")) {
      await supabase.from("rankings").delete().eq("id", id);
      fetchData();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500 mb-8">📊 إدارة الترتيب</h1>

      <form onSubmit={addItem} className="bg-zinc-900 p-6 rounded-2xl mb-8 space-y-4 border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم اللاعب" value={name} onChange={(e) => setName(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="الوزن" value={weight} onChange={(e) => setWeight(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
          <input type="text" placeholder="الدولة" value={country} onChange={(e) => setCountry(e.target.value)} required className="bg-black border border-zinc-700 p-3 rounded-xl outline-none focus:border-blue-500" />
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
                <td className="py-3 px-4 font-bold text-blue-400">{item.points}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-300">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد بيانات</p>}
      </div>
    </div>
  );
}
