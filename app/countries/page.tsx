import { supabase } from "@/lib/supabase";
import { getFlagUrl } from "@/lib/countryFlags";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "RMA Around the World — Global Countries | RMA Federation",
  description: "Discover RMA Federation trainers and academies worldwide. Real Martial Art is expanding globally across 60+ countries. Find certified martial arts coaches near you.",
};

type Country = {
  id: string;
  country: string;
  trainer_name: string;
  trainer_image: string;
  trainer_title: string;
  flag: string;
  landline: string;
  mobile: string;
  email: string;
  address: string;
  fax: string;
};

async function getCountries(): Promise<Country[]> {
  const { data } = await supabase.from("countries").select("*").order("country", { ascending: true });
  return (data as Country[]) || [];
}

export default async function CountriesPage() {
  const countries = await getCountries();

  if (!countries.length) {
    return (
      <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex rounded-full bg-sky-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300 shadow-sm shadow-sky-900/20 mb-6">
            Global Expansion
          </span>
          <h1 className="text-5xl font-bold mb-4">
            RMA <span className="text-sky-500">Countries</span>
          </h1>
          <p className="text-gray-400 text-lg">No countries registered yet. Coming soon.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-sky-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-300 shadow-sm shadow-sky-900/20 mb-6">
            Global Expansion
          </span>
          <h1 className="text-5xl font-bold mb-4">
            RMA <span className="text-sky-500">Around the World</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The Real Martial Art Federation is expanding globally. Find our certified trainers and academies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-sky-600/40 transition duration-300 group"
            >
              <div className="aspect-[4/6] bg-gradient-to-br from-zinc-800 to-zinc-900 relative flex items-center justify-center overflow-hidden">
                {item.trainer_image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.trainer_image})` }}
                  />
                ) : item.flag ? (
                  <img src={item.flag} alt={item.country} className="w-24 h-auto shadow-lg rounded" />
                ) : (
                  <span className="text-6xl">{item.country.charAt(0).toUpperCase()}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{item.country}</h3>
                  {item.flag && (
                    <img src={item.flag} alt={item.country} className="mt-1 w-8 h-auto rounded shadow opacity-80" />
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <p className="text-white font-bold text-lg">{item.trainer_name}</p>
                  {item.trainer_title && <p className="text-xs text-sky-400">{item.trainer_title}</p>}
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  {item.landline && (
                    <div className="flex items-center gap-2">
                      <span className="text-sky-500">📞</span>
                      <span dir="ltr">{item.landline}</span>
                    </div>
                  )}
                  {item.mobile && (
                    <div className="flex items-center gap-2">
                      <span className="text-sky-500">📱</span>
                      <span dir="ltr">{item.mobile}</span>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-sky-500">✉️</span>
                      <a href={`mailto:${item.email}`} className="hover:text-sky-400 transition underline underline-offset-2">
                        {item.email}
                      </a>
                    </div>
                  )}
                  {item.fax && (
                    <div className="flex items-center gap-2">
                      <span className="text-sky-500">📠</span>
                      <span>{item.fax}</span>
                    </div>
                  )}
                  {item.address && (
                    <div className="flex items-start gap-2 mt-2">
                      <span className="text-sky-500">📍</span>
                      <span>{item.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
