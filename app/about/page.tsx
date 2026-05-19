import AboutContent from "@/components/AboutContent";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "About — Our Story, Trainers & Mission",
  "Founded in 2013 by Tarek Sayed Ibrahim, the World Real Martial Art Federation (RMA) is a global leader in martial arts, self-defense, combat sports, boxing, kickboxing, Muay Thai, MMA, and Jiu-Jitsu training with 87K Facebook followers and 81.1K YouTube subscribers.",
  "تأسس الاتحاد العالمي للفنون القتالية الحقيقية (RMA) في 2013 على يد طارق سيد إبراهيم، وهو رائد عالمي في تدريب الفنون القتالية والدفاع عن النفس والرياضات القتالية."
);

export default function AboutPage() {
  return <AboutContent />;
}
