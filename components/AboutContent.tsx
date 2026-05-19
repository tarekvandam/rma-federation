"use client";

import { Award, Shield, Target, Flame, Swords, Eye, Globe, ChevronRight, Crown, Crosshair, Users, Video } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Script from "next/script";
import { useLanguage } from "./LanguageProvider";
import { siteMetadata } from "@/lib/seo";

const en = {
  heroBadge: "About the Federation",
  heroPrefix: "Founded by",
  heroName: "Tarek Sayed Ibrahim",
  heroDesc: "— a martial artist, coach, and founder dedicated to realistic combat, exposing fake systems, and building disciplined fighters worldwide. RMA was established in",
  heroYear: "2013",
  heroSuffix: "and has been evolving ever since.",
  joinBtn: "Join the Federation",
  startBtn: "Start Training",
  aboutBadge: "About the Federation",
  aboutTitle: 'World Real Martial Art <span class="text-red-600">Federation</span>',
  aboutP1: 'World Real Martial Art Federation (RMA) is a modern martial arts organization dedicated to building a <strong class="text-white">realistic combat system</strong> based on practical application, scientific training methods, and authentic self-defense principles.',
  aboutP2: 'Founded by <strong class="text-white">Tarek Sayed Ibrahim</strong> in <strong class="text-red-400">2013</strong>, RMA was created to challenge unrealistic martial arts myths and promote effective combat skills that can be applied in real-life situations, competitions, and personal protection.',
  coreMessage: "Not everything you see should be believed.",
  coreDesc: "RMA focuses on testing techniques under realistic pressure instead of relying on exaggerated demonstrations or theatrical movements.",
  missionBadge: "Our Purpose",
  missionTitle: 'Our <span class="text-red-600">Mission</span>',
  missions: [
    "Build strong, disciplined, and confident martial artists.",
    "Create realistic standards for combat training and self-defense.",
    "Develop athletes physically, mentally, and tactically.",
    "Spread awareness against fake and ineffective martial arts content.",
    "Establish an international platform for training, championships, instructor development, and martial arts education.",
  ],
  diffBadge: "The RMA Edge",
  diffTitle: 'What Makes RMA <span class="text-red-600">Different</span>',
  differentiators: [
    "Realistic combat-focused training.",
    "Scientific and practical teaching methods.",
    "Self-defense adapted for modern real-life situations.",
    "Combination of traditional martial arts values with modern combat systems.",
    "Strong emphasis on discipline, mindset, awareness, and adaptability.",
    "Training designed for both competition and real-world application.",
  ],
  trainingBadge: "Programs",
  trainingTitle: 'RMA Training <span class="text-red-600">Areas</span>',
  trainingAreas: [
    "Realistic Self-Defense", "Striking Systems", "Grappling & Clinch Fighting",
    "Tactical Combat Movement", "Physical Conditioning", "Combat Awareness",
    "Psychological Preparedness", "Competition Training",
  ],
  joinBadge: "Open to All",
  joinTitle: 'Who Can <span class="text-red-600">Join</span>',
  whoCanJoin: [
    "Beginners seeking confidence and self-defense skills.",
    "Athletes preparing for combat sports competitions.",
    "Martial artists looking for realistic combat application.",
    "Coaches and instructors seeking professional development.",
    "Anyone interested in discipline, fitness, and personal transformation.",
  ],
  visionBadge: "Our Vision",
  visionTitle: 'The <span class="text-red-600">Vision</span>',
  visionText: 'To become one of the leading international organizations in <strong class="text-white">realistic martial arts education</strong>, <strong class="text-white">competition systems</strong>, and <strong class="text-white">combat development</strong> while creating a global community built on respect, discipline, strength, and truth.',
  visionTagline: "Train Real. Fight Smart. Live Strong.",
  founderBadge: "Founder Story",
  founderTag: "Founder & Lead Coach",
  founderTitle: 'Tarek<br /><span class="text-red-600">Vandam</span>',
  founderP1: 'A martial artist and self-defense coach with years of combat experience, Tarek Sayed Ibrahim founded <strong class="text-white">Real Martial Art (RMA)</strong> in <strong class="text-red-400">2013</strong> to bridge the gap between fantasy fighting and real-world effectiveness.',
  founderP2: 'As the <strong class="text-white">Egypt Representative for the International Kyokushin Karate-do Federation (3rd Dan)</strong> and the <strong class="text-white">International MMA Federation (3rd Dan)</strong>, he brings authentic martial arts lineage combined with modern combat training methodologies.',
  founderP3: 'Through RMA, Tarek has built a global community of disciplined fighters, created millions of views worth of combat education content, and continues to train the next generation of martial artists who value substance over show.',
  founderTags: ["Martial Arts Coach", "Kyokushin 3rd Dan", "IMMAF Representative", "Self-Defense Expert", "Founder of RMA"],
  certBadge: "Professional Credentials",
  certTitle: 'Certifications & <span class="text-red-600">Credentials</span>',
  certDesc: "Officially certified and internationally recognized combat credentials.",
  fedTitle: "Federation Memberships & Dan Ranks",
  federationMemberships: [
    { org: "Egyptian Karate Federation", rank: "2nd Dan Black Belt" },
    { org: "Egyptian Traditional Karate Federation", rank: "2nd Dan Black Belt" },
    { org: "African Traditional Karate Federation", rank: "2nd Dan Black Belt" },
    { org: "International Kyokushin Karate-do Federation", rank: "3rd Dan Black Belt", note: "Egypt Representative" },
    { org: "International MMA Federation (IMMAF)", rank: "3rd Dan Black Belt", note: "Egypt Representative" },
    { org: "International Federation – Canada Shindo Jiu-Jitsu", rank: "6th Dan Black Belt" },
    { org: "Egyptian Kickboxing Federation", rank: "Member" },
    { org: "Egyptian Jeet Kune Do Federation", rank: "Member" },
    { org: "World Council for Sports Training and Investment", rank: "Member" },
  ],
  medTitle: "Medical & Safety Certifications",
  medDesc: "Provided by: The General Union of Egyptian Ambulance Authority Personnel & The International Heart Institute, USA",
  professionalCerts: ["First Aid", "Cardiopulmonary Resuscitation (CPR)", "Basic Life Support (BLS)"],
  diplomaTitle: "Academic Diplomas",
  certifications: [
    { title: "Diploma in Nutrition", issuer: "Stanford University, USA" },
    { title: "Diploma in Sports Training", issuer: "University of Colorado, USA" },
  ],
  achievementsBadge: "Track Record",
  achievementsTitle: 'Federation <span class="text-red-600">Achievements</span>',
  achievementsDesc: "Real impact measured across platforms and international events.",
  ctaBadge: "Join the Movement",
  ctaTitle: 'Ready to Train<br /><span class="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">Real?</span>',
  ctaDesc: "Join the World Real Martial Art Federation. Train with purpose. Fight with discipline. Transform completely.",
  ctaBtn: "Join RMA",
  ctaStart: "Start Training",
};

const ar: typeof en = {
  heroBadge: "عن الاتحاد",
  heroPrefix: "أسسها",
  heroName: "طارق فندام",
  heroDesc: "— فنان قتالي ومدرب مكرس للقتال الواقعي، كشف الأنظمة المزيفة، وبناء مقاتلين منضبطين حول العالم. تأسس RMA في",
  heroYear: "2013",
  heroSuffix: "وما زال يتطور منذ ذلك الحين.",
  joinBtn: "انضم إلى الاتحاد",
  startBtn: "ابدأ التدريب",
  aboutBadge: "عن الاتحاد",
  aboutTitle: 'الاتحاد العالمي للفنون القتالية <span class="text-red-600">الحقيقية</span>',
  aboutP1: 'اتحاد RMA هو منظمة فنون قتالية حديثة مكرسة لبناء <strong class="text-white">نظام قتالي واقعي</strong> قائم على التطبيق العملي وطرق التدريب العلمية ومبادئ الدفاع عن النفس الأصيلة.',
  aboutP2: 'أسس <strong class="text-white">طارق فندام</strong> اتحاد RMA في <strong class="text-red-400">2013</strong> لتحدي أساطير الفنون القتالية غير الواقعية وتعزيز مهارات القتال الفعالة.',
  coreMessage: "ليس كل ما تراه يجب أن تصدقه.",
  coreDesc: "يركز RMA على اختبار التقنيات تحت الضغط الواقعي بدلاً من الاعتماد على العروض المبالغ فيها.",
  missionBadge: "هدفنا",
  missionTitle: '<span class="text-red-600">رسالتنا</span>',
  missions: [
    "بناء فناني قتال أقوياء ومنضبطين وواثقين.",
    "إنشاء معايير واقعية للتدريب القتالي والدفاع عن النفس.",
    "تطوير الرياضيين جسدياً وعقلياً وتكتيكياً.",
    "نشر الوعي ضد محتوى الفنون القتالية المزيف.",
    "إنشاء منصة دولية للتدريب والبطولات وتطوير المدربين.",
  ],
  diffBadge: "ميزة RMA",
  diffTitle: 'ما يميز <span class="text-red-600">RMA</span>',
  differentiators: [
    "تدريب قتالي واقعي.",
    "أساليب تدريس علمية وعملية.",
    "دفاع عن النفس متكيف مع مواقف الحياة العصرية.",
    "مزج قيم الفنون القتالية التقليدية مع الأنظمة القتالية الحديثة.",
    "تركيز قوي على الانضباط والعقلية والوعي والقدرة على التكيف.",
    "تدريب مصمم للمنافسة والتطبيق الواقعي.",
  ],
  trainingBadge: "البرامج",
  trainingTitle: 'مجالات تدريب <span class="text-red-600">RMA</span>',
  trainingAreas: [
    "الدفاع عن النفس الواقعي", "أنظمة الضرب", "المصارعة والقتال القريب",
    "الحركة القتالية التكتيكية", "الإعداد البدني", "الوعي القتالي",
    "الإعداد النفسي", "التدريب التنافسي",
  ],
  joinBadge: "متاح للجميع",
  joinTitle: 'من يمكنه <span class="text-red-600">الانضمام</span>',
  whoCanJoin: [
    "المبتدئون الباحثون عن الثقة ومهارات الدفاع عن النفس.",
    "الرياضيون المستعدون لمنافسات الرياضات القتالية.",
    "فنانو القتال الباحثون عن تطبيق قتالي واقعي.",
    "المدربون والمعلمون الباحثون عن التطوير المهني.",
    "أي شخص مهتم بالانضباط واللياقة والتحول الشخصي.",
  ],
  visionBadge: "رؤيتنا",
  visionTitle: '<span class="text-red-600">الرؤية</span>',
  visionText: 'أن نصبح إحدى المنظمات الدولية الرائدة في <strong class="text-white">التعليم القتالي الواقعي</strong> و<strong class="text-white">أنظمة المنافسة</strong> و<strong class="text-white">التطوير القتالي</strong> مع إنشاء مجتمع عالمي قائم على الاحترام والانضباط والقوة والحقيقة.',
  visionTagline: "تدرب بواقعية. قاتل بذكاء. عش بقوة.",
  founderBadge: "قصة المؤسس",
  founderTag: "المؤسس والمدرب الرئيسي",
  founderTitle: 'طارق<br /><span class="text-red-600">فندام</span>',
  founderP1: 'فنان قتالي ومدرب دفاع عن النفس لديه سنوات من الخبرة القتالية، أسس طارق فندام <strong class="text-white">RMA</strong> في <strong class="text-red-400">2013</strong> لسد الفجوة بين القتال الخيالي والفعالية الواقعية.',
  founderP2: 'كممثل مصر لـ <strong class="text-white">الاتحاد الدولي للكاراتيه كيوكوشين (دان 3)</strong> و<strong class="text-white">الاتحاد الدولي للفنون القتالية المختلطة (دان 3)</strong>، يجمع بين النسب القتالي الأصيل ومنهجيات التدريب الحديثة.',
  founderP3: 'من خلال RMA، بنى طارق مجتمعاً عالمياً من المقاتلين المنضبطين، وخلق محتوى تعليمياً قتاليًا بملايين المشاهدات، ويواصل تدريب الجيل القادم.',
  founderTags: ["مدرب فنون قتالية", "كيوكوشين دان 3", "ممثل IMMAF", "خبير دفاع عن النفس", "مؤسس RMA"],
  certBadge: "الاعتمادات المهنية",
  certTitle: 'الشهادات و<span class="text-red-600">الاعتمادات</span>',
  certDesc: "اعتمادات قتالية معتمدة رسمياً ومعترف بها دولياً.",
  fedTitle: "عضوية الاتحادات ودرجات الدان",
  federationMemberships: [
    { org: "الاتحاد المصري للكاراتيه", rank: "الحزام الأسود دان 2" },
    { org: "الاتحاد المصري للكاراتيه التقليدي", rank: "الحزام الأسود دان 2" },
    { org: "الاتحاد الأفريقي للكاراتيه التقليدي", rank: "الحزام الأسود دان 2" },
    { org: "الاتحاد الدولي لكاراتيه كيوكوشين", rank: "الحزام الأسود دان 3", note: "ممثل مصر" },
    { org: "الاتحاد الدولي للفنون القتالية المختلطة", rank: "الحزام الأسود دان 3", note: "ممثل مصر" },
    { org: "الاتحاد الدولي – كندا شيندو جيو جيتسو", rank: "الحزام الأسود دان 6" },
    { org: "الاتحاد المصري للكيك بوكسينغ", rank: "عضو" },
    { org: "الاتحاد المصري للجيت كون دو", rank: "عضو" },
    { org: "المجلس العالمي للتدريب الرياضي والاستثمار", rank: "عضو" },
  ],
  medTitle: "الشهادات الطبية والسلامة",
  medDesc: "مقدمة من: الاتحاد العام لهيئة الإسعاف المصرية والمعهد الدولي للقلب، الولايات المتحدة",
  professionalCerts: ["الإسعافات الأولية", "الإنعاش القلبي الرئوي", "دعم الحياة الأساسي"],
  diplomaTitle: "الشهادات الأكاديمية",
  certifications: [
    { title: "دبلوم التغذية", issuer: "جامعة ستانفورد، الولايات المتحدة" },
    { title: "دبلوم التدريب الرياضي", issuer: "جامعة كولورادو، الولايات المتحدة" },
  ],
  achievementsBadge: "السجل",
  achievementsTitle: 'إنجازات <span class="text-red-600">الاتحاد</span>',
  achievementsDesc: "تأثير حقيقي عبر المنصات والفعاليات الدولية.",
  ctaBadge: "انضم للحركة",
  ctaTitle: 'مستعد للتدرب<br /><span class="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">بواقعية؟</span>',
  ctaDesc: "انضم إلى الاتحاد العالمي للفنون القتالية الحقيقية. تدرب بهدف. قاتل بانضباط. تحول بالكامل.",
  ctaBtn: "انضم إلى RMA",
  ctaStart: "ابدأ التدريب",
};

const fedItems = [
  { rank_6th: ["6th Dan Black Belt", "الحزام الأسود دان 6"] },
  { rank_3rd: ["3rd Dan Black Belt", "الحزام الأسود دان 3"] },
  { rank_2nd: ["2nd Dan Black Belt", "الحزام الأسود دان 2"] },
];

function getRankClass(rank: string) {
  if (rank.includes("6th") || rank.includes("6")) return "bg-red-600/20 text-red-300 border border-red-500/30";
  if (rank.includes("3rd") || rank.includes("3")) return "bg-orange-600/20 text-orange-300 border border-orange-500/30";
  if (rank.includes("2nd") || rank.includes("2")) return "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30";
  if (rank.includes("دان 6") || rank.includes("6")) return "bg-red-600/20 text-red-300 border border-red-500/30";
  if (rank.includes("دان 3") || rank.includes("3")) return "bg-orange-600/20 text-orange-300 border border-orange-500/30";
  if (rank.includes("دان 2") || rank.includes("2")) return "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30";
  return "bg-white/10 text-gray-300 border border-white/10";
}

const achievements = [
  { icon: FaFacebook, value: "87K", labelEn: "Facebook Followers", labelAr: "متابعون على فيسبوك", color: "#1877F2" },
  { icon: FaYoutube, value: "81.1K", labelEn: "YouTube Subscribers", labelAr: "مشتركون على يوتيوب", color: "#FF0000" },
  { icon: Video, value: "1.1K", labelEn: "YouTube Videos", labelAr: "فيديو على يوتيوب", color: "#FF0000" },
  { icon: Eye, value: "200M+", labelEn: "Total Views", labelAr: "مشاهدة إجمالية", color: "#ef4444" },
  { icon: Globe, value: "International", labelEn: "Events Participation", labelAr: "مشاركة في الفعاليات", color: "#22c55e" },
];

const stagger = (i: number) => ({ animationDelay: `${i * 0.1}s` });

export default function AboutContent() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isAr ? 'عن اتحاد RMA' : 'About RMA Federation',
    description: siteMetadata.description,
    url: `${siteMetadata.url}/about`,
    mainEntity: {
      '@type': 'Organization', name: siteMetadata.title, foundingDate: '2013',
      founder: { '@type': 'Person', name: 'Tarek Sayed Ibrahim' },
      sport: ['MartialArts', 'Boxing', 'Kickboxing', 'MuayThai', 'MixedMartialArts', 'BrazilianJiuJitsu', 'Karate', 'Taekwondo', 'Judo', 'KravMaga'],
    },
  };

  return (
    <>
      <Script id="about-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(aboutSchema)}
      </Script>
      <main className="bg-black text-white" dir={isAr ? "rtl" : "ltr"}>

        {/* ============ HERO ============ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[slowzoom_20s_ease-in-out_infinite]" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(220,38,38,0.15),_rgba(0,0,0,0.95))]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
            <div className="max-w-4xl animate-[fadeUp_1.2s_ease-out]">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-lg shadow-red-900/20 mb-8">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {t.heroBadge}
              </span>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-white">
                {isAr ? <>الحقيقية<br /><span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">الفنون القتالية</span><br />الاتحاد العالمي للفنون القتالية</> : <>REAL<br /><span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">MARTIAL</span><br />ART</>}
              </h1>
              <p className="mt-8 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed">
                {t.heroPrefix} <span className="text-white font-bold">{t.heroName}</span>{t.heroDesc} <span className="text-red-400 font-bold">{t.heroYear}</span> {t.heroSuffix}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="/membership" className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-red-900/40 transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:scale-[1.03]">
                  {t.joinBtn}<ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="/contact" className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]">
                  <Crown size={18} className="text-red-400" />{t.startBtn}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>

        {/* ============ ABOUT RMA ============ */}
        <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.1),_rgba(0,0,0,0.96))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="relative mx-auto max-w-5xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.aboutBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.aboutTitle }} />
            </div>
            <div className="space-y-8 text-center animate-[fadeUp_0.8s_ease-out_0.15s_both]">
              <p className="text-lg sm:text-xl text-gray-300 leading-8 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: t.aboutP1 }} />
              <p className="text-lg sm:text-xl text-gray-300 leading-8 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: t.aboutP2 }} />
            </div>
            <div className="mt-16 animate-[fadeUp_0.8s_ease-out_0.3s_both]">
              <div className="relative max-w-2xl mx-auto rounded-[32px] border border-red-500/20 bg-gradient-to-br from-red-600/10 via-black/40 to-red-800/5 p-10 shadow-[0_24px_80px_rgba(220,38,38,0.1)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/30 px-5 py-2 text-xs uppercase tracking-[0.35em] text-red-300">{isAr ? "الرسالة الأساسية" : "Core Message"}</span>
                </div>
                <p className="text-3xl sm:text-4xl font-black text-white italic leading-tight mt-4">&ldquo;{t.coreMessage}&rdquo;</p>
                <p className="mt-6 text-gray-400 text-base leading-7">{t.coreDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MISSION ============ */}
        <section className="relative overflow-hidden bg-black py-28 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(220,38,38,0.06),_rgba(0,0,0,0.95))]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.missionBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.missionTitle }} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.missions.map((mission, i) => (
                <div key={mission} style={stagger(i)} className="group rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.6s_ease-out_both]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mt-1"><span className="text-red-400 font-black text-lg">{i + 1}</span></div>
                    <p className="text-base font-semibold text-white leading-7">{mission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHAT MAKES RMA DIFFERENT ============ */}
        <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_right,_rgba(220,38,38,0.1),_rgba(0,0,0,0.95))]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.diffBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.diffTitle }} />
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.differentiators.map((item, i) => (
                <div key={item} style={stagger(i)} className="group flex items-start gap-5 rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 animate-[fadeUp_0.6s_ease-out_both]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 shadow-lg shadow-red-900/20"><Crosshair size={22} className="text-red-400" /></div>
                  <p className="text-base font-semibold text-white leading-7 pt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRAINING AREAS ============ */}
        <section className="relative overflow-hidden bg-black py-28 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(220,38,38,0.06),_rgba(0,0,0,0.95))]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.trainingBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.trainingTitle }} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.trainingAreas.map((area, i) => (
                <div key={area} style={stagger(i)} className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mb-5"><span className="text-red-400 font-black text-lg">{String(i + 1).padStart(2, "0")}</span></div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">{area}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHO CAN JOIN ============ */}
        <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.08),_rgba(0,0,0,0.96))]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.joinBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.joinTitle }} />
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.whoCanJoin.map((item, i) => (
                <div key={item} style={stagger(i)} className="group flex items-start gap-5 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-6 transition-all duration-500 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.5s_ease-out_both]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 mt-0.5"><Target size={18} className="text-red-400" /></div>
                  <p className="text-base text-gray-300 leading-7 pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ VISION ============ */}
        <section className="relative overflow-hidden bg-black py-28 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.08),_rgba(0,0,0,0.95))]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.visionBadge}</span>
              <h2 className="mt-8 text-4xl sm:text-5xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.visionTitle }} />
            </div>
            <p className="mt-10 text-xl text-gray-300 leading-9 animate-[fadeUp_0.8s_ease-out_0.2s_both]" dangerouslySetInnerHTML={{ __html: t.visionText }} />
            <div className="mt-14 animate-[fadeUp_0.8s_ease-out_0.4s_both]">
              <div className="inline-flex items-center gap-4 rounded-full border border-red-500/20 bg-red-500/10 px-8 py-5 shadow-lg shadow-red-900/20">
                <span className="text-2xl font-black text-red-400">RMA</span>
                <span className="text-white text-lg font-bold">&mdash;</span>
                <span className="text-xl text-white font-semibold">{isAr ? "الفنون القتالية الحقيقية" : "Real Martial Art"}</span>
              </div>
            </div>
            <p className="mt-6 text-lg uppercase tracking-[0.35em] text-red-300 animate-[fadeUp_0.8s_ease-out_0.5s_both]">{t.visionTagline}</p>
          </div>
        </section>

        {/* ============ FOUNDER STORY ============ */}
        <section className="relative overflow-hidden bg-[#020305] py-28 px-6">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_left,_rgba(220,38,38,0.12),_rgba(0,0,0,0.96))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
              <div className="relative animate-[fadeUp_0.8s_ease-out_both]">
                <div className="relative h-[500px] sm:h-[600px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_32px_120px_rgba(0,0,0,0.6)]">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-flex rounded-full bg-red-600/20 border border-red-500/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-300 backdrop-blur-sm">{t.founderTag}</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-red-600/10 blur-3xl" />
              </div>
              <div className="space-y-8">
                <div className="animate-[fadeUp_0.8s_ease-out_0.1s_both]">
                  <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.founderBadge}</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-white animate-[fadeUp_0.8s_ease-out_0.15s_both]" dangerouslySetInnerHTML={{ __html: t.founderTitle }} />
                <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.2s_both]" dangerouslySetInnerHTML={{ __html: t.founderP1 }} />
                <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.25s_both]" dangerouslySetInnerHTML={{ __html: t.founderP2 }} />
                <p className="text-lg leading-8 text-gray-300 animate-[fadeUp_0.8s_ease-out_0.3s_both]" dangerouslySetInnerHTML={{ __html: t.founderP3 }} />
                <div className="flex flex-wrap gap-4 pt-4 animate-[fadeUp_0.8s_ease-out_0.35s_both]">
                  {t.founderTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-200">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section className="relative overflow-hidden bg-black py-28 px-6">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_right,_rgba(220,38,38,0.1),_rgba(0,0,0,0.95))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.certBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.certTitle }} />
              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">{t.certDesc}</p>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t.fedTitle}</h3>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.federationMemberships.map((item, i) => (
                  <div key={item.org} style={stagger(i)} className="group rounded-[24px] border border-white/[0.08] bg-[#0c0e11] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-red-600/40 hover:bg-white/[0.05] animate-[fadeUp_0.5s_ease-out_both]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20"><Swords size={18} className="text-red-400" /></div>
                      <div>
                        <p className="font-semibold text-white text-sm leading-6">{item.org}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${getRankClass(item.rank)}`}>{item.rank}</span>
                          {item.note && <span className="text-[11px] text-blue-400 uppercase tracking-wider">{item.note}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t.medTitle}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                {isAr ? null : <p className="text-sm text-gray-500 mb-6">{t.medDesc}</p>}
                {isAr ? null : <div className="space-y-4">
                  {t.professionalCerts.map((cert, i) => (
                    <div key={cert} style={stagger(i)} className="group flex items-center gap-4 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-5 transition-all duration-500 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-800/10 border border-emerald-500/20"><Shield size={20} className="text-emerald-400" /></div>
                      <p className="font-semibold text-white text-base">{cert}</p>
                    </div>
                  ))}
                </div>}
              </div>
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{t.diplomaTitle}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="space-y-4">
                  {t.certifications.map((cert, i) => (
                    <div key={cert.title} style={stagger(i)} className="group flex items-start gap-4 rounded-[20px] border border-white/[0.08] bg-[#0c0e11] p-5 transition-all duration-500 hover:border-red-600/40 animate-[fadeUp_0.5s_ease-out_both]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/20"><Award size={20} className="text-blue-400" /></div>
                      <div>
                        <p className="font-semibold text-white text-base">{cert.title}</p>
                        <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ACHIEVEMENTS ============ */}
        <section className="relative overflow-hidden bg-black py-28 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(220,38,38,0.08),_rgba(0,0,0,0.95))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center mb-16 animate-[fadeUp_0.8s_ease-out_both]">
              <span className="inline-flex rounded-full bg-red-600/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-red-300 shadow-sm shadow-red-900/20">{t.achievementsBadge}</span>
              <h2 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight text-white" dangerouslySetInnerHTML={{ __html: t.achievementsTitle }} />
              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">{t.achievementsDesc}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.labelEn} style={stagger(i)} className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0f1114] p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-red-600/30 animate-[fadeUp_0.6s_ease-out_both]">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/20 shadow-lg shadow-red-900/20 mb-6"><Icon size={28} style={{ color: item.color }} /></div>
                      <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">{item.value}</p>
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{isAr ? item.labelAr : item.labelEn}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="relative overflow-hidden py-28 px-6">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[slowzoom_20s_ease-in-out_infinite]" style={{ backgroundImage: "url('/gallery/1.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.12),_rgba(0,0,0,0.95))]" />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="space-y-10 animate-[fadeUp_1s_ease-out_both]">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-xs uppercase tracking-[0.4em] text-red-300 shadow-lg shadow-red-900/20"><Users size={14} />{t.ctaBadge}</span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.ctaTitle }} />
                <p className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">{t.ctaDesc}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <a href="/membership" className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-800 px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-red-900/50 transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:scale-[1.04] hover:shadow-red-900/70">
                  <Crown size={20} />{t.ctaBtn}<ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="/contact" className="group inline-flex items-center gap-3 border border-white/20 bg-white/5 px-10 py-5 rounded-full text-lg font-semibold backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white/10 hover:scale-[1.04] hover:border-white/30">
                  <Flame size={20} className="text-red-400" />{t.ctaStart}
                </a>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slowzoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        `}</style>
      </main>
    </>
  );
}
