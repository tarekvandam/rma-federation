import { supabase } from "../../lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "News — RMA Federation Latest Updates",
  "Stay updated with the latest news, events, and announcements from the World Real Martial Art Federation. Official updates, event highlights, and fighter stories.",
  "أحدث أخبار وفعاليات وإعلانات الاتحاد العالمي للفنون القتالية الحقيقية. تغطية رسمية للبطولات واللاعبين."
);

export const dynamic = "force-dynamic";

export default async function NewsPage() {

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="mb-16 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Federation <span className="text-red-600">News</span>
          </h1>

          <p className="text-gray-400 text-lg">
            Latest updates and official announcements
          </p>

        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {news?.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-red-600 transition rounded-2xl overflow-hidden"
            >

              {/* Image */}
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-60 w-full object-cover" />
              ) : (
                <div className="h-60 w-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-gray-600 text-4xl">📰</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6">

                <h2 className="text-2xl font-bold mb-4">
                  {item.title}
                </h2>

                <p className="text-gray-400 leading-8">
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}