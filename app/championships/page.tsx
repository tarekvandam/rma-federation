import Championships from "@/components/Championships";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Championships — RMA Tournaments & Events",
  "Official RMA Federation championships, tournaments, and international fighting events. Real combat sports competitions in boxing, kickboxing, Muay Thai, MMA, and martial arts.",
  "بطولات اتحاد RMA الرسمية، المسابقات والفعاليات القتالية الدولية. منافسات رياضات قتالية حقيقية في الملاكمة، الكيك بوكسينغ، المواي تاي، والفنون القتالية المختلطة."
);

export default function ChampionshipsPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-28">
      <Championships />
    </main>
  );
}
