import Rankings from "@/components/Rankings";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Rankings",
  "Explore fighter rankings, weight classes, and win-loss stats across the World Real Martial Art Federation."
);

export default function RankingsPage() {
  return <Rankings />;
}
