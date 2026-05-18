import { supabase } from "@/lib/supabase";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Media Center",
  "Watch RMA Federation videos, training sessions, championships, and martial arts content."
);

export const revalidate = 60;

const defaultVideos = [
  { title: "RMA Fight Breakdown & Training Analysis", youtube_id: "g5_SF0A4NBo" },
  { title: "Realistic Self-Defense Techniques", youtube_id: "bA7ZVmedMZM" },
  { title: "RMA Championship Highlights", youtube_id: "-1mpvcg5xF0" },
];

const galleryImages = [
  "/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg",
  "/gallery/4.jpg", "/images/hero.jpg", "/gallery/1.jpg",
];

export default async function MediaPage() {
  const { data: dbVideos } = await supabase
    .from("media_videos")
    .select("*")
    .order("created_at", { ascending: false });

  const videos = dbVideos && dbVideos.length > 0 ? dbVideos : defaultVideos;

  return (
    <main className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20 mb-6">
            Media Hub
          </span>
          <h1 className="text-5xl font-bold mb-4">
            Media <span className="text-red-600">Center</span>
          </h1>
          <p className="text-gray-400 text-lg">Official federation videos, training sessions, and gallery</p>
        </div>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-10">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600/40 transition duration-300"
              >
                <iframe
                  className="w-full h-[220px]"
                  src={`https://www.youtube.com/embed/${video.youtube_id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-10">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`RMA gallery image ${index + 1}`}
                className="rounded-2xl object-cover h-72 w-full hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
