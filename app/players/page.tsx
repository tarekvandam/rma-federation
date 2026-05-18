import { supabase } from "@/lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Players",
  "Meet the fighters of the Real Martial Art Federation."
);

export const dynamic = "force-dynamic";

type Promotion = { belt: string; date: string };
type Player = {
  id: string;
  name: string;
  image: string;
  belt_color: string;
  date_obtained: string;
  promotions: Promotion[];
};

const beltColors: Record<string, string> = {
  white: "bg-white text-black",
  yellow: "bg-yellow-400 text-black",
  orange: "bg-orange-500 text-white",
  green: "bg-green-500 text-white",
  blue: "bg-blue-600 text-white",
  brown: "bg-amber-800 text-white",
  red: "bg-red-600 text-white",
  black: "bg-gray-900 text-white border border-gray-600",
};

function getBeltClass(belt: string) {
  const base = belt.split(" ")[0].toLowerCase();
  return beltColors[base] || "bg-zinc-700 text-white";
}

export default async function PlayersPage() {
  const { data: players } = await supabase
    .from("player_submissions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            RMA Athletes
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="text-red-600">Players</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Meet the fighters of the Real Martial Art Federation
          </p>
        </div>

        {(!players || players.length === 0) && (
          <p className="text-center text-gray-500 py-20">No players registered yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(players as Player[])?.map((player, index) => {
            const beltClass = getBeltClass(player.belt_color);
            return (
              <div
                key={player.id}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden group hover:border-red-600/40 transition-all duration-300"
              >
                <div className="relative h-56 bg-zinc-800 overflow-hidden">
                  {player.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${player.image})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl text-zinc-700">{player.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${beltClass} shadow-lg`}>
                      {player.belt_color}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-lg font-bold text-white">{player.name}</p>
                    {player.date_obtained && (
                      <p className="text-xs text-gray-400">Since {player.date_obtained}</p>
                    )}
                  </div>
                </div>

                {player.promotions?.length > 0 && (
                  <div className="p-4 border-t border-zinc-800">
                    <p className="text-xs uppercase tracking-wider text-red-400 mb-2">Promotions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {player.promotions.map((p, i) => {
                        const pClass = getBeltClass(p.belt);
                        return (
                          <span key={i} className={`inline-flex items-center gap-1 rounded-full ${pClass} px-2.5 py-0.5 text-xs font-bold shadow`}>
                            {p.belt} {p.date}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
