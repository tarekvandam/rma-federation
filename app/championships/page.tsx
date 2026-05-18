import Championships from "@/components/Championships";

export const metadata = {
  title: "Championships | RMA Federation",
  description: "Official RMA tournaments, international events, and championship fights across the globe.",
};

export default function ChampionshipsPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-28">
      <Championships />
    </main>
  );
}