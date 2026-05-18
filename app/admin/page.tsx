"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

const quickLinks = [
  { label: "الأخبار", href: "/admin/news", icon: "📰", color: "from-red-600/20 to-red-900/10", border: "border-red-600/30" },
  { label: "البطولات", href: "/admin/championships", icon: "🏆", color: "from-amber-600/20 to-amber-900/10", border: "border-amber-600/30" },
  { label: "الترتيب", href: "/admin/rankings", icon: "📊", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-600/30" },
  { label: "المدربين", href: "/admin/trainers", icon: "🥋", color: "from-green-600/20 to-green-900/10", border: "border-green-600/30" },
  { label: "الميديا", href: "/admin/media", icon: "🎬", color: "from-purple-600/20 to-purple-900/10", border: "border-purple-600/30" },
  { label: "التوثيق", href: "/admin/verification", icon: "✅", color: "from-green-600/20 to-green-900/10", border: "border-green-600/30" },
  { label: "الرئيسية", href: "/", icon: "🏠", color: "from-zinc-600/20 to-zinc-900/10", border: "border-zinc-600/30" },
];

export default function AdminDashboard() {
  const [newsCount, setNewsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { count } = await supabase.from("news").select("*", { count: "exact", head: true });
      setNewsCount(count || 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">مرحبًا بك في لوحة التحكم</h1>
        <p className="text-gray-400">إدارة محتوى RMA Federation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <p className="text-gray-400 text-sm mb-1">إجمالي الأخبار</p>
          <p className="text-4xl font-bold text-white">{loading ? "..." : newsCount}</p>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="text-xl font-bold text-white mb-4">الأقسام</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`bg-gradient-to-br ${link.color} rounded-2xl border ${link.border} p-6 hover:scale-[1.02] transition duration-300`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{link.icon}</span>
              <div>
                <p className="text-lg font-bold text-white">{link.label}</p>
                <p className="text-gray-400 text-sm">إدارة المحتوى</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
