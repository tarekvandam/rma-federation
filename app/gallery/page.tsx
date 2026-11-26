import { headers } from "next/headers";
import GalleryContent from "@/components/GalleryContent";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Photo Gallery — RMA Federation",
  "Photos from RMA Federation events, training sessions and championships.",
  "صور من فعاليات وتدريبات وبطولات الاتحاد الدولى لفن القتال الواقعى."
);

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const locale = (await headers()).get("x-locale") === "ar" ? "ar" : "en";
  return <GalleryContent locale={locale} />;
}
