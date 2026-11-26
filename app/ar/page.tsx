import Hero from "../../components/Hero";
import IdentitySection from "../../components/IdentitySection";
import YouTubeShowcase from "../../components/YouTubeShowcase";
import TrainerProfiles from "../../components/TrainerProfiles";
import NewsSection from "../../components/NewsSection";
import Championships from "../../components/Championships";

import { generateArMetadata } from "@/lib/seo";

export const metadata = generateArMetadata(
  "/",
  "الاتحاد الدولى لفن القتال الواقعى: قتال حقيقي وانضباط",
  "الاتحاد الدولى لفن القتال الواقعى (RMA) — المنصة الرسمية لتدريب الملاكمة، الكيك بوكسينغ، المواي تاي، الفنون القتالية المختلطة، الجيو جيتسو، الكاراتيه، التايكوندو والدفاع عن النفس مع مدربين عالميين."
);

export default function HomeAr() {
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
            أسس طارق سيد إبراهيم الاتحاد الدولى لفن القتال الواقعى (RMA) عام 2013، ليجمع بين التدريب القتالي الحقيقي، والمنافسة في البطولات، ومجتمع عالمي مكرس للفنون القتالية الأصيلة. من الملاكمة والكيك بوكسينغ إلى الفنون القتالية المختلطة والمواي تاي والجيو جيتسو والدفاع عن النفس، يضع RMA المعيار للفنون القتالية الواقعية حول العالم.
          </p>
        </div>
      </section>
    </main>
  );
}
