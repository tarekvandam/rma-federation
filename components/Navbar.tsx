"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-red-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="RMA Logo"
            width={60}
            height={60}
            className="rounded-full"
          />

          <div>
            <h1 className="text-white text-xl font-bold">
              RMA Federation
            </h1>

            <p className="text-red-500 text-sm">
              Real Martial Art
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          {navLinks.map((link) => (
            <Link
          key={link.name}
        href={link.path}
     className="hover:text-red-500 transition duration-300"
     >
             {link.name}
         </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-red-700 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-white hover:text-red-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
}