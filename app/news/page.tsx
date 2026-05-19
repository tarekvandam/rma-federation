import { supabase } from "../../lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "News — RMA Federation Latest Updates",
  "Stay updated with the latest news, events, and announcements from the World Real Martial Art Federation. Official updates, event highlights, and fighter stories.",
  "أحدث أخبار وفعاليات وإعلانات الاتحاد العالمي للفنون القتالية الحقيقية. تغطية رسمية للبطولات واللاعبين."
);

export const dynamic = "force-dynamic";

type Partner = {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
};

export default async function NewsPage() {

  const [newsRes, partnersRes] = await Promise.allSettled([
    supabase.from("news").select("*").order("created_at", { ascending: false }),
    supabase.from("media_gallery").select("*").order("created_at", { ascending: false }),
  ]);

  const news = newsRes.status === "fulfilled" ? newsRes.value.data : null;
  const rawPartners = partnersRes.status === "fulfilled" ? partnersRes.value.data : null;
  const partners: Partner[] = (rawPartners || [])
    .filter((item: any) => item.title?.startsWith("[PARTNER]"))
    .map((item: any) => ({
      id: item.id,
      name: item.title?.replace("[PARTNER]", "").split("|||")[0] || "",
      logo_url: item.image || "",
      website_url: item.title?.split("|||")[1] || "",
    }));

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

        {/* Partners Section */}
        {partners && partners.length > 0 && (
          <section className="mt-24 border-t border-zinc-800 pt-16">
            <div className="text-center mb-10">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-4">
                Our Partners
              </span>
              <h2 className="text-3xl font-bold">
                Collaborating <span className="text-red-600">Organizations</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {(partners as Partner[]).map((p) => (
                <div key={p.id} className="flex flex-col items-center gap-3 bg-zinc-900 rounded-2xl border border-zinc-800 px-6 py-5 hover:border-red-600/40 transition-all duration-300 group w-44">
                  {p.logo_url ? (
                    <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                      <img src={p.logo_url} alt={p.name} className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  ) : null}
                  {p.website_url ? (
                    <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white text-center leading-tight transition">
                      {p.name}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 text-center leading-tight">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    </main>
  );
}