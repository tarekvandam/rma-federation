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

export default function AdminPlayersPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

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

  const pending = submissions.filter((s) => s.status === "pending");
  const approved = submissions.filter((s) => s.status === "approved");
  const rejected = submissions.filter((s) => s.status === "rejected");

  function renderCards(items: Submission[], showAction: boolean) {
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
                {showAction && (
                  <>
                    <button onClick={() => updateStatus(item.id, "approved")}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition">✅ Approve</button>
                    <button onClick={() => updateStatus(item.id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition">❌ Reject</button>
                  </>
                )}
                <button onClick={() => deleteSubmission(item.id)}
                  className="bg-zinc-800 text-gray-400 px-3 py-1.5 rounded-lg text-sm hover:bg-zinc-700 transition">🗑️</button>
              </div>
            </div>
            {item.promotions?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.promotions.map((p, i) => (
                  <span key={i} className="bg-zinc-800 text-gray-300 rounded-full px-2.5 py-0.5 text-xs">{p.belt} - {p.date}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-600 mb-8">🥋 إدارة اللاعبين</h1>

      {/* Pending */}
      <h2 className="text-xl font-bold mb-4 text-yellow-400">قيد المراجعة ({pending.length})</h2>
      <div className="space-y-3 mb-8">
        {pending.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد طلبات</p>}
        {renderCards(pending, true)}
      </div>

      {/* Approved */}
      <h2 className="text-xl font-bold mb-4 text-green-400">تمت الموافقة ({approved.length})</h2>
      <div className="space-y-3 mb-8">
        {approved.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد</p>}
        {renderCards(approved, false)}
      </div>

      {/* Rejected */}
      <h2 className="text-xl font-bold mb-4 text-red-400">مرفوض ({rejected.length})</h2>
      <div className="space-y-3">
        {rejected.length === 0 && <p className="text-gray-500 text-center py-4">لا يوجد</p>}
        {renderCards(rejected, false)}
      </div>
    </div>
  );
}
