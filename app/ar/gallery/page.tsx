import GalleryPage from "../../gallery/page";
import { generateArMetadata } from "@/lib/seo";

export const metadata = generateArMetadata(
  "/gallery",
  "معرض الصور: اتحاد RMA | الاتحاد الدولى لفن القتال الواقعى",
  "صور من فعاليات وتدريبات وبطولات الاتحاد الدولى لفن القتال الواقعى."
);

export const dynamic = "force-dynamic";

export default GalleryPage;
