import Contact from "@/components/Contact";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "Contact — Get in Touch with RMA Federation",
  "Contact the World Real Martial Art Federation for media inquiries, membership requests, event bookings, training programs, and general questions. Call +20 100 190 4418 or email realmartialartrma@gmail.com.",
  "تواصل مع الاتحاد الدولى لفن القتال الواقعى للاستفسارات الإعلامية، طلبات العضوية، حجز الفعاليات، برامج التدريب، والأسئلة العامة.",
  undefined, "/contact"
);

export default function ContactPage() {
  return <Contact />;
}
