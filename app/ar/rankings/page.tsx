import RankingsPage from "../../rankings/page";
import { generateArMetadata } from "@/lib/seo";

export const metadata = generateArMetadata(
  "/rankings",
  "التصنيفات: ترتيب مقاتلي اتحاد RMA | الاتحاد الدولى لفن القتال الواقعى",
  "استعرض تصنيفات المقاتلين وفئات الوزن وسجل الفوز والخسارة في الاتحاد الدولى لفن القتال الواقعى."
);

export default RankingsPage;
