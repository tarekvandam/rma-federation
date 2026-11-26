import { supabase } from "@/lib/supabase";
import { thumbUrl } from "@/lib/gallery";

type Item = { id: number; image_url: string; caption: string };

const text = {
  en: {
    badge: "RMA Gallery",
    title1: "Photo",
    title2: "Gallery",
    sub: "Moments from RMA Federation events, training and championships",
    empty: "No photos added yet.",
    back: "← Back to Media",
  },
  ar: {
    badge: "معرض RMA",
    title1: "معرض",
    title2: "الصور",
    sub: "لحظات من فعاليات وتدريبات وبطولات الاتحاد",
    empty: "لا توجد صور بعد.",
    back: "→ العودة إلى الميديا",
  },
};

export default async function GalleryContent({ locale }: { locale: "en" | "ar" }) {
  const t = text[locale];
  const { data } = await supabase
    .from("gallery_images")
    .select("id,image_url,caption")
    .order("created_at", { ascending: false });
  const items = (data as Item[] | null) ?? [];

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t.title1} <span className="text-red-600">{t.title2}</span>
          </h1>
          <p className="text-gray-400 text-lg">{t.sub}</p>
          <a
            href={"/media"}
            className="inline-flex mt-6 rounded-full border border-zinc-700 px-5 py-2 text-sm text-gray-300 hover:border-red-600 hover:text-white transition"
          >
            {t.back}
          </a>
        </div>

        {items.length === 0 && <p className="text-center text-gray-500 py-20">{t.empty}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-red-600/40 transition-all duration-300"
            >
              <div className="bg-zinc-800 overflow-hidden">
                <img
                  src={thumbUrl(item.image_url)}
                  alt={item.caption || "RMA gallery"}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="block w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {item.caption && (
                <p className="px-4 py-3 text-sm text-gray-300">{item.caption}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
