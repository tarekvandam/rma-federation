"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "News", path: "/news" },
    { name: "Championships", path: "/championships" },
    { name: "Rankings", path: "/rankings" },
    { name: "Media", path: "/media" },
    { name: "Membership", path: "/membership" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-black/92 shadow-2xl shadow-black/40 border-b border-red-700/20 backdrop-blur-2xl"
          : "bg-transparent border-b border-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-black shadow-2xl shadow-red-900/30 ring-1 ring-white/10 overflow-hidden border border-white/10">
              <Image
                src="/images/logo.png"
                alt="RMA Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm uppercase tracking-[0.35em] text-red-400/90 font-semibold">
                RMA Federation
              </p>
              <p className="text-xs text-white/60 truncate">
                Real Martial Art
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-[0.02em] text-white/85">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="group relative overflow-hidden transition duration-300 hover:text-red-400"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <button
            className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 hover:text-red-400"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="mx-5 mb-4 mt-2 rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/10 hover:text-red-400"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}