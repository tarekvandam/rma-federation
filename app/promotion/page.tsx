import PromotionContent from "@/components/PromotionContent";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Promotion & Rules — Belt Ranking System & Combat Rules",
  "Complete RMA Federation belt promotion system from White to Black 6th Dan. Official 17-article Real Martial Art combat rules for championships, tournaments, and sparring safety.",
  "نظام الترقيات والأحزمة الكامل لاتحاد RMA من الأبيض إلى الأسود دان 6. القتال الرسمي المكون من 17 مادة لبطولات الفنون القتالية الحقيقية."
);

export default function PromotionPage() {
  return <PromotionContent />;
}
