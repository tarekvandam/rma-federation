"use client";

import { motion } from "framer-motion";

const news = [
  {
    title: "RMA International Championship 2026",
    description:
      "The biggest Real Martial Art championship with fighters from multiple countries.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Official Coach Certification",
    description:
      "New international certification program for coaches and instructors.",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "RMA Youth Development Program",
    description:
      "Building the next generation of disciplined martial artists worldwide.",
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function NewsSection() {
  return (
    <section className="bg-black py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Latest <span className="text-red-600">News</span>
          </h2>

          <p className="text-gray-400 text-lg">
            Official updates from the World Real Martial Art Federation
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition duration-300"
            >
              {/* Image */}
              <div
                className="h-60 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              {/* Content */}
              <div className="p-6">

                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 mb-6">
                  {item.description}
                </p>

                <button className="text-red-500 font-semibold hover:text-red-400 transition">
                  Read More →
                </button>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}