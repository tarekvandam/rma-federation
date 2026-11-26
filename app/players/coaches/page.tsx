import { supabase } from "@/lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Coaches & Referees — RMA Federation",
  "Meet the coaches and referees of the Real Martial Art Federation, with their country and degree.",
  "تعرف على مدربي وحكام اتحاد الفنون القتالية الحقيقية مع الدولة والدرجة."
);

export const dynamic = "force-dynamic";

type Coach = {
  id: number;
  name: string;
  image: string;
  country: string;
  degree: string;
};

export default async function CoachesPage() {
  const { data: coaches } = await supabase
    .from("course_coaches")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            RMA Coaches
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Coaches <span className="text-red-600">&amp; Referees</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Meet the coaches and referees of the Real Martial Art Federation
          </p>
          <a
            href="/players"
            className="inline-flex mt-6 rounded-full border border-zinc-700 px-5 py-2 text-sm text-gray-300 hover:border-red-600 hover:text-white transition"
          >
            ← Back to Players
          </a>
        </div>

        {(!coaches || coaches.length === 0) && (
          <p className="text-center text-gray-500 py-20">No coaches added yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(coaches as Coach[])?.map((coach) => (
            <div
              key={coach.id}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 group hover:border-red-600/40 transition-all duration-300"
            >
              <div className="relative bg-zinc-800 overflow-hidden rounded-t-2xl" style={{ aspectRatio: "3/4" }}>
                {coach.image ? (
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl text-zinc-700">{coach.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {coach.degree && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex rounded-full bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                      {coach.degree}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <p className="text-lg font-bold text-white">{coach.name}</p>
                  {coach.country && <p className="text-xs text-gray-400">{coach.country}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
