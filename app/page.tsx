import Hero from "../components/Hero";
import IdentitySection from "../components/IdentitySection";
import YouTubeShowcase from "../components/YouTubeShowcase";
import TrainerProfiles from "../components/TrainerProfiles";
import NewsSection from "../components/NewsSection";
import Championships from "../components/Championships";

import { generateMetadata, siteMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Home — Real Combat & Discipline",
  "Official platform of the World Real Martial Art Federation (RMA). Train in boxing, kickboxing, Muay Thai, MMA, Jiu-Jitsu, Karate, Taekwondo, and self-defense with world-class coaches.",
  "المنصة الرسمية للاتحاد العالمي للفنون القتالية الحقيقية (RMA). تدرب في الملاكمة، الكيك بوكسينغ، المواي تاي، الفنون القتالية المختلطة، الجيو جيتسو، الكاراتيه، التايكوندو والدفاع عن النفس مع مدربين عالميين.",
  "World Real Martial Art Federation — Real Combat & Discipline"
);

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Hero />
      <IdentitySection />
      <YouTubeShowcase />
      <TrainerProfiles />
      <NewsSection />
      <Championships />
      <section className="border-t border-white/5 bg-[#020305] py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red-400/70 mb-4">RMA Federation</p>
          <p className="text-gray-300 leading-8 text-base sm:text-lg">
            Founded in 2013 by Tarek Sayed Ibrahim, the World Real Martial Art Federation (RMA) brings together authentic combat training, championship competition, and a global community dedicated to real martial arts. From boxing and kickboxing to MMA, Muay Thai, Jiu-Jitsu, and self-defense — RMA sets the standard for realistic fighting arts worldwide.
          </p>
        </div>
      </section>
    </main>
  );
}
