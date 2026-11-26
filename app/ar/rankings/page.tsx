import RankingsPage from "../../rankings/page";
import { generateArMetadata } from "@/lib/seo";

export const metadata = generateArMetadata(
  "/rankings",
  "التصنيفات: ترتيب مقاتلي اتحاد RMA | الاتحاد العالمي للفنون القتالية الحقيقية",
  "استعرض تصنيفات المقاتلين وفئات الوزن وسجل الفوز والخسارة في الاتحاد العالمي للفنون القتالية الحقيقية."
);

export default RankingsPage;
