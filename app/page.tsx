import Hero from "../components/Hero";
import IdentitySection from "../components/IdentitySection";
import YouTubeShowcase from "../components/YouTubeShowcase";
import TrainerProfiles from "../components/TrainerProfiles";
import NewsSection from "../components/NewsSection";
import Championships from "../components/Championships";

import { generateMetadata, siteMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Home — Real Combat, Real Discipline, Real Martial Art",
  "Welcome to the World Real Martial Art Federation (RMA). Train in boxing, kickboxing, Muay Thai, MMA, Jiu-Jitsu, Karate, Taekwondo, Krav Maga, and self-defense with world-class coaches. Join our global community for discipline, combat, and championship training.",
  "مرحباً بك في الاتحاد العالمي للفنون القتالية الحقيقية (RMA). تدرب في الملاكمة، الكيك بوكسينغ، المواي تاي، الفنون القتالية المختلطة، الجيو جيتسو، الكاراتيه، التايكوندو، الكراف ماغا، والدفاع عن النفس مع مدربين عالميين."
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
    </main>
  );
}
