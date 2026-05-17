export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          About <span className="text-red-600">RMA Federation</span>
        </h1>

        <p className="text-gray-300 text-lg leading-9 mb-8">
          World Real Martial Art Federation is an international martial arts
          organization dedicated to real combat systems, discipline,
          physical development, and professional martial arts education.
        </p>

        <p className="text-gray-300 text-lg leading-9 mb-8">
          Founded to create realistic martial arts standards,
          the federation focuses on practical combat,
          self-defense systems, championships,
          instructor certifications, and athlete development.
        </p>

        <p className="text-gray-300 text-lg leading-9">
          RMA Federation combines traditional martial arts values
          with modern combat training methods to build strong,
          disciplined, and skilled martial artists worldwide.
        </p>

      </div>

    </main>
  );
}

import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "About Us",
  "Learn about the World Real Martial Art Federation, our mission, commitment to practical combat systems, athlete development, and martial arts standards."
);
