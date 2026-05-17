"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6"
        >
          WORLD REAL
          <span className="text-red-600"> MARTIAL ART </span>
          FEDERATION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Real Combat. Real Discipline. Real Martial Art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 px-10 py-4 rounded-full text-white font-bold text-lg shadow-lg shadow-red-900/50 transition-all duration-300 transform hover:scale-105">
            Join Federation
          </button>

          <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-10 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105">
            Explore Championships
          </button>
        </motion.div>
      </div>
    </section>
  );
}