import Hero from "../components/Hero";
import NewsSection from "../components/NewsSection";
import Championships from "../components/Championships";

import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata();

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Hero />
      <NewsSection />
      <Championships />
    </main>
  );
}
