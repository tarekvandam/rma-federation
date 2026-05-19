import { supabase } from "@/lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Our Partners — Collaborating Organizations",
  "Partner organizations, collaborating federations, and sponsors supporting the World Real Martial Art Federation worldwide.",
  "منظماتنا الشريكة والاتحادات المتعاونة والرعاة الداعمون للاتحاد العالمي للفنون القتالية الحقيقية حول العالم."
);

export const dynamic = "force-dynamic";

type Partner = {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
};

export default async function PartnersPage() {
  const { data: raw } = await supabase
    .from("media_gallery")
    .select("*")
    .order("created_at", { ascending: false });

  const partners: Partner[] = (raw || [])
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
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            Our Partners
          </span>
          <h1 className="text-5xl font-bold mb-4">
            Collaborating <span className="text-red-600">Organizations</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Federations, councils, and sponsors supporting RMA worldwide
          </p>
        </div>

        {partners.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p) => (
              <div
                key={p.id}
                className="flex flex-col items-center gap-4 bg-zinc-900 rounded-2xl border border-zinc-800 px-8 py-6 hover:border-red-600/40 transition-all duration-300 group w-52"
              >
                {p.logo_url ? (
                  <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.logo_url}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <span className="text-3xl text-gray-600">🤝</span>
                  </div>
                )}
                {p.website_url ? (
                  <a
                    href={p.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white text-center leading-tight transition"
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="text-sm text-gray-400 text-center leading-tight">{p.name}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-16 text-lg">
            No partners added yet — add them from the admin panel.
          </p>
        )}
      </div>
    </main>
  );
}
