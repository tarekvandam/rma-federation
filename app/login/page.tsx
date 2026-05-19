"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("بيانات الدخول غير صحيحة يا كوتش!");
      setLoading(false);
      return;
    }

    if (data?.session?.access_token) {
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Lax`;
    }

    router.push("/admin/news");
    router.refresh();
  }

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">RMA <span className="text-red-600">Admin</span></h1>
        <p className="text-zinc-500 text-center mb-8 italic text-sm">Real Combat. Real Discipline.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="bg-black border border-zinc-700 p-4 rounded-xl outline-none focus:border-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة السر"
            className="bg-black border border-zinc-700 p-4 rounded-xl outline-none focus:border-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold text-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </main>
  );
}
