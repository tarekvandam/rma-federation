import MembershipPage from "../../membership/page";
import { generateArMetadata } from "@/lib/seo";

export const metadata = generateArMetadata(
  "/membership",
  "العضوية: انضم إلى اتحاد RMA | الاتحاد الدولى لفن القتال الواقعى",
  "انضم إلى الاتحاد الدولى لفن القتال الواقعى. اختر من خطط العضوية: محارب، بطل، أو نخبة للوصول الحصري إلى التدريب القتالي والفعاليات والتدريب الشخصي."
);

export default MembershipPage;
