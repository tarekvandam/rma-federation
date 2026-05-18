"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

const navItems = [
  { label: "الأخبار", href: "/admin/news", icon: "📰" },
  { label: "البطولات", href: "/admin/championships", icon: "🏆" },
  { label: "الترتيب", href: "/admin/rankings", icon: "📊" },
  { label: "المدربين", href: "/admin/trainers", icon: "🥋" },
  { label: "الدول", href: "/admin/countries", icon: "🌍" },
  { label: "الميديا", href: "/admin/media", icon: "🎬" },
  { label: "الرئيسية", href: "/", icon: "🏠" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0";
    router.push("/login");
  }

  if (!authenticated) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400">جاري التحقق...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-600">RMA Admin</h1>
          <p className="text-zinc-500 text-xs mt-1">لوحة التحكم</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                pathname === item.href
                  ? "bg-red-600/20 text-red-400 border border-red-600/30"
                  : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30 transition"
        >
          تسجيل الخروج
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-red-600">RMA Admin</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-zinc-800"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 pt-16 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  pathname === item.href
                    ? "bg-red-600/20 text-red-400 border border-red-600/30"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="w-full px-4 py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-red-600/20 hover:text-red-400 transition"
            >
              تسجيل الخروج
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
