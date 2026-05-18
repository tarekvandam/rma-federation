"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Cert = {
  certificate_id: string;
  holder_name: string;
  belt: string;
  issue_date: string;
  trainer: string;
  status: string;
};

export default function VerifyPage() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Cert | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);

    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_id", search.trim())
      .single();

    if (data) {
      setResult(data as Cert);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex rounded-full bg-green-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-green-300 shadow-sm shadow-green-900/20 mb-6">
            Certificate Verification
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Verify a <span className="text-green-500">Certificate</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter the certificate ID to verify its authenticity
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. RMA-2026-0001"
            className="flex-1 bg-zinc-900 border border-zinc-700 p-4 rounded-2xl outline-none focus:border-green-500 text-white text-lg text-center font-mono tracking-wider uppercase"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? "..." : "Verify"}
          </button>
        </form>

        {notFound && (
          <div className="bg-zinc-900 border border-red-600/30 rounded-3xl p-8 text-center">
            <p className="text-5xl mb-4">❌</p>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Certificate Not Found</h2>
            <p className="text-gray-400">No certificate matches this ID. Please check and try again.</p>
          </div>
        )}

        {result && (
          <div className="bg-zinc-900 border border-green-600/30 rounded-3xl overflow-hidden">
            <div className="bg-green-600/10 p-6 text-center border-b border-green-600/20">
              <p className="text-5xl mb-2">✅</p>
              <h2 className="text-2xl font-bold text-green-400">Valid Certificate</h2>
              <p className="text-green-600/60 text-sm mt-1">This certificate is registered and authentic</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Certificate ID</p>
                  <p className="font-mono text-green-400 font-bold">{result.certificate_id}</p>
                </div>
                <div className="bg-black/50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Status</p>
                  <p className="text-green-400 font-bold uppercase">{result.status}</p>
                </div>
              </div>
              <div className="bg-black/50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Holder Name</p>
                <p className="text-xl font-bold text-white">{result.holder_name}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Belt</p>
                  <p className="text-lg font-bold text-white">{result.belt}</p>
                </div>
                <div className="bg-black/50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Issue Date</p>
                  <p className="text-lg font-bold text-white">{result.issue_date}</p>
                </div>
                <div className="bg-black/50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Trainer</p>
                  <p className="text-lg font-bold text-white">{result.trainer}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
