import Membership from "@/components/Membership";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Membership — Join RMA Federation",
  "Join the World Real Martial Art Federation. Choose from Warrior, Champion, or Elite membership plans for exclusive martial arts training, events, coaching, and community access.",
  "انضم إلى الاتحاد العالمي للفنون القتالية الحقيقية. اختر من خطط العضوية: محارب، بطل، أو نخبة للوصول الحصري إلى التدريب القتالي والفعاليات والتدريب الشخصي."
);

export default function MembershipPage() {
  return <Membership />;
}
