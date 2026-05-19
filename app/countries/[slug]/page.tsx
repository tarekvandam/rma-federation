import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Country = {
  id: string;
  country: string;
  trainer_name: string;
  trainer_image: string;
  trainer_title: string;
  continent: string;
  flag: string;
  landline: string;
  mobile: string;
  email: string;
  address: string;
  fax: string;
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getFlagEmoji(country: string) {
  const map: Record<string, string> = {
    Egypt: "\u{1F1EA}\u{1F1EC}", "Saudi Arabia": "\u{1F1F8}\u{1F1E6}", UAE: "\u{1F1E6}\u{1F1EA}",
    Qatar: "\u{1F1F6}\u{1F1E6}", Kuwait: "\u{1F1F0}\u{1F1FC}", Bahrain: "\u{1F1E7}\u{1F1ED}",
    Oman: "\u{1F1F4}\u{1F1F2}", Jordan: "\u{1F1EF}\u{1F1F4}", Lebanon: "\u{1F1F1}\u{1F1E7}",
    Iraq: "\u{1F1EE}\u{1F1F6}", Syria: "\u{1F1F8}\u{1F1FE}", Palestine: "\u{1F1F5}\u{1F1F8}",
    Yemen: "\u{1F1FE}\u{1F1EA}", Libya: "\u{1F1F1}\u{1F1FE}", Tunisia: "\u{1F1F9}\u{1F1F3}",
    Algeria: "\u{1F1E9}\u{1F1FF}", Morocco: "\u{1F1F2}\u{1F1E6}", Sudan: "\u{1F1F8}\u{1F1E9}",
    Turkey: "\u{1F1F9}\u{1F1F7}", USA: "\u{1F1FA}\u{1F1F8}", UK: "\u{1F1EC}\u{1F1E7}",
    Germany: "\u{1F1E9}\u{1F1EA}", France: "\u{1F1EB}\u{1F1F7}", Italy: "\u{1F1EE}\u{1F1F9}",
    Spain: "\u{1F1EA}\u{1F1F8}", China: "\u{1F1E8}\u{1F1F3}", India: "\u{1F1EE}\u{1F1F3}",
    Japan: "\u{1F1EF}\u{1F1F5}", Australia: "\u{1F1E6}\u{1F1FA}", Brazil: "\u{1F1E7}\u{1F1F7}",
    Argentina: "\u{1F1E6}\u{1F1F7}", Canada: "\u{1F1E8}\u{1F1E6}", Russia: "\u{1F1F7}\u{1F1FA}",
    "South Korea": "\u{1F1F0}\u{1F1F7}", Pakistan: "\u{1F1F5}\u{1F1F0}", Bangladesh: "\u{1F1E7}\u{1F1E9}",
    Nigeria: "\u{1F1F3}\u{1F1EC}", "South Africa": "\u{1F1FF}\u{1F1E6}", Kenya: "\u{1F1F0}\u{1F1EA}",
    Ghana: "\u{1F1EC}\u{1F1ED}", Ethiopia: "\u{1F1EA}\u{1F1F9}", Malaysia: "\u{1F1F2}\u{1F1FE}",
    Indonesia: "\u{1F1EE}\u{1F1E9}", Philippines: "\u{1F1F5}\u{1F1ED}", Thailand: "\u{1F1F9}\u{1F1ED}",
    Vietnam: "\u{1F1FB}\u{1F1F3}", Sweden: "\u{1F1F8}\u{1F1EA}", Norway: "\u{1F1F3}\u{1F1F4}",
    Denmark: "\u{1F1E9}\u{1F1F0}", Netherlands: "\u{1F1F3}\u{1F1F1}", Belgium: "\u{1F1E7}\u{1F1EA}",
    Switzerland: "\u{1F1E8}\u{1F1ED}", Austria: "\u{1F1E6}\u{1F1F9}", Poland: "\u{1F1F5}\u{1F1F1}",
    Ukraine: "\u{1F1FA}\u{1F1E6}", Romania: "\u{1F1F7}\u{1F1F4}", Greece: "\u{1F1EC}\u{1F1F7}",
    Portugal: "\u{1F1F5}\u{1F1F9}", Ireland: "\u{1F1EE}\u{1F1EA}", Mexico: "\u{1F1F2}\u{1F1FD}",
    Colombia: "\u{1F1E8}\u{1F1F4}", Chile: "\u{1F1E8}\u{1F1F1}", Peru: "\u{1F1F5}\u{1F1EA}",
    Venezuela: "\u{1F1FB}\u{1F1EA}", "New Zealand": "\u{1F1F3}\u{1F1FF}", Fiji: "\u{1F1EB}\u{1F1EF}",
    Scotland: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    Wales: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
    Tanzania: "\u{1F1F9}\u{1F1FF}", Uganda: "\u{1F1FA}\u{1F1EC}", Angola: "\u{1F1E6}\u{1F1F4}",
    Cameroon: "\u{1F1E8}\u{1F1F2}", "Ivory Coast": "\u{1F1E8}\u{1F1EE}",
    "DRC": "\u{1F1E8}\u{1F1E9}", Madagascar: "\u{1F1F2}\u{1F1EC}",
    Mozambique: "\u{1F1F2}\u{1F1FF}", Senegal: "\u{1F1F8}\u{1F1F3}",
    Zambia: "\u{1F1FF}\u{1F1F2}", Zimbabwe: "\u{1F1FF}\u{1F1FC}",
    "Sri Lanka": "\u{1F1F1}\u{1F1F0}", Nepal: "\u{1F1F3}\u{1F1F5}",
    Myanmar: "\u{1F1F2}\u{1F1F2}", Cambodia: "\u{1F1F0}\u{1F1ED}",
    Mongolia: "\u{1F1F2}\u{1F1F3}", Afghanistan: "\u{1F1E6}\u{1F1EB}",
    Iran: "\u{1F1EE}\u{1F1F7}", Uzbekistan: "\u{1F1FA}\u{1F1FF}",
    Kazakhstan: "\u{1F1F0}\u{1F1FF}", Turkmenistan: "\u{1F1F9}\u{1F1F2}",
    Azerbaijan: "\u{1F1E6}\u{1F1FF}", Georgia: "\u{1F1EC}\u{1F1EA}",
    Armenia: "\u{1F1E6}\u{1F1F2}", Bulgaria: "\u{1F1E7}\u{1F1EC}",
    Croatia: "\u{1F1ED}\u{1F1F7}", "Czech Republic": "\u{1F1E8}\u{1F1FF}",
    Hungary: "\u{1F1ED}\u{1F1FA}", Serbia: "\u{1F1F7}\u{1F1F8}",
    Slovakia: "\u{1F1F8}\u{1F1F0}", Slovenia: "\u{1F1F8}\u{1F1EE}",
    Lithuania: "\u{1F1F1}\u{1F1F9}", Latvia: "\u{1F1F1}\u{1F1FB}",
    Estonia: "\u{1F1EA}\u{1F1EA}", Finland: "\u{1F1EB}\u{1F1EE}",
    Iceland: "\u{1F1EE}\u{1F1F8}", Luxembourg: "\u{1F1F1}\u{1F1FA}",
    Malta: "\u{1F1F2}\u{1F1F9}", Cyprus: "\u{1F1E8}\u{1F1FE}",
    Montenegro: "\u{1F1F2}\u{1F1EA}", Albania: "\u{1F1E6}\u{1F1F1}",
    "Bosnia and Herzegovina": "\u{1F1E7}\u{1F1E6}", Moldova: "\u{1F1F2}\u{1F1E9}",
    Belarus: "\u{1F1E7}\u{1F1FE}", "North Macedonia": "\u{1F1F2}\u{1F1F0}",
    "Costa Rica": "\u{1F1E8}\u{1F1F7}", Panama: "\u{1F1F5}\u{1F1E6}",
    Guatemala: "\u{1F1EC}\u{1F1F9}", Honduras: "\u{1F1ED}\u{1F1F3}",
    "Dominican Republic": "\u{1F1E9}\u{1F1F4}", Cuba: "\u{1F1E8}\u{1F1FA}",
    Jamaica: "\u{1F1EF}\u{1F1F2}", "Trinidad and Tobago": "\u{1F1F9}\u{1F1F9}",
    Bahamas: "\u{1F1E7}\u{1F1F8}", Uruguay: "\u{1F1FA}\u{1F1FE}",
    Paraguay: "\u{1F1F5}\u{1F1FE}", Bolivia: "\u{1F1E7}\u{1F1F4}",
    Ecuador: "\u{1F1EA}\u{1F1E8}", Guyana: "\u{1F1EC}\u{1F1FE}",
    Suriname: "\u{1F1F8}\u{1F1F7}", "Papua New Guinea": "\u{1F1F5}\u{1F1EC}",
  };
  return map[country] || "\u{1F310}";
}

async function getCountryBySlug(slug: string): Promise<Country | null> {
  const { data } = await supabase.from("countries").select("*");
  const countries = (data as Country[]) || [];
  return countries.find((c) => slugify(c.country) === slug) || null;
}

export async function generateStaticParams() {
  const { data } = await supabase.from("countries").select("country");
  const countries = (data as { country: string }[]) || [];
  return countries.map((c) => ({ slug: slugify(c.country) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return { title: "Trainer Not Found | RMA Federation" };

  const title = `${country.trainer_name} — ${country.country} | RMA Federation`;
  const description = `${country.trainer_name}${country.trainer_title ? ` — ${country.trainer_title}` : ""} — RMA Federation certified trainer in ${country.country}. Contact for martial arts training, self-defense, and combat sports coaching.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rma-federation.vercel.app/countries/${slug}`,
      type: "profile",
      images: country.trainer_image
        ? [{ url: country.trainer_image, alt: country.trainer_name, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: country.trainer_image ? [country.trainer_image] : undefined,
    },
    alternates: {
      canonical: `https://rma-federation.vercel.app/countries/${slug}`,
    },
  };
}

export default async function CountryProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  const flagEmoji = getFlagEmoji(country.country);

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/countries"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition mb-8"
        >
          <span>&larr;</span> Back to All Countries
        </Link>

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          {/* Image */}
          <div className="bg-zinc-800 flex items-center justify-center">
            {country.trainer_image ? (
              <img
                src={country.trainer_image}
                alt={country.trainer_name}
                className="w-full max-h-[80vh] object-contain bg-zinc-900"
              />
            ) : (
              <div className="h-64 sm:h-80 flex items-center justify-center">
                <span className="text-8xl opacity-20">{flagEmoji}</span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{country.trainer_name}</h2>
              {country.trainer_title && (
                <p className="text-sky-400 text-lg mt-1">{country.trainer_title}</p>
              )}
              {country.continent && (
                <p className="text-gray-500 text-sm mt-2">{country.continent}</p>
              )}
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {country.landline && (
                <div className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-sky-500 text-xl">&#x1F4DE;</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Landline</p>
                    <p className="text-white font-medium" dir="ltr">{country.landline}</p>
                  </div>
                </div>
              )}
              {country.mobile && (
                <div className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-sky-500 text-xl">&#x1F4F1;</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Mobile</p>
                    <p className="text-white font-medium" dir="ltr">{country.mobile}</p>
                  </div>
                </div>
              )}
              {country.email && (
                <div className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-sky-500 text-xl">&#x2709;&#xFE0F;</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${country.email}`} className="text-sky-400 hover:text-sky-300 transition font-medium break-all">
                      {country.email}
                    </a>
                  </div>
                </div>
              )}
              {country.fax && (
                <div className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-sky-500 text-xl">&#x1F4E0;</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Fax</p>
                    <p className="text-white font-medium">{country.fax}</p>
                  </div>
                </div>
              )}
            </div>

            {country.address && (
              <div className="bg-zinc-800/50 rounded-xl p-4 flex items-start gap-3">
                <span className="text-sky-500 text-xl mt-0.5">&#x1F4CD;</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-white">{country.address}</p>
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-gray-500 mb-3">Share this profile</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rma-federation.vercel.app/countries/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${country.trainer_name} — ${country.country} | RMA Federation\nhttps://rma-federation.vercel.app/countries/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${country.trainer_name} — ${country.country} | RMA Federation`)}&url=${encodeURIComponent(`https://rma-federation.vercel.app/countries/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
