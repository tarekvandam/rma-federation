export const supportedLocales = ["en", "ar"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const isRightToLeft = (locale: Locale) => locale === "ar";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      news: "News",
      championships: "Championships",
      rankings: "Rankings",
      media: "Media",
      membership: "Membership",
      contact: "Contact",
      languageToggle: "عربي",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "Elite combat culture",
      label: "Cinematic combat. Authentic discipline.",
      title: "WORLD REAL MARTIAL ART FEDERATION",
      tagline: "Train like a champion with modern martial arts, cinematic energy, and real discipline.",
      join: "Join Federation",
      explore: "Explore Championships",
    },
    identity: {
      badge: "RMA Philosophy",
      title: "Martial Art Built for Reality",
      description: "We stand for practical combat, honest discipline, and a transformation mindset that separates real fighting from fantasy.",
      points: [
        {
          title: "Realistic Combat Philosophy",
          text: "We train for the fight that actually happens, not the one in fantasy. Every strike and stance is designed for real results under pressure.",
        },
        {
          title: "Self Defense with Purpose",
          text: "True martial art protects you and your community—teaching awareness, control, and the ability to respond effectively when it matters.",
        },
        {
          title: "Exposing Fake Martial Arts Myths",
          text: "We call out flashy tricks, empty claims, and hollow systems. Real skill is built through honesty, consistency, and the right mindset.",
        },
        {
          title: "Discipline and Transformation",
          text: "Mastery is a daily journey. Discipline turns training into growth, humbles ego, and transforms body, mind, and spirit.",
        },
        {
          title: "Real Fighting vs. Fantasy",
          text: "This is not choreography. We emphasize practicality, toughness, and the subtle difference between showmanship and true fighting ability.",
        },
      ],
    },
    youtube: {
      badge: "YouTube Showcase",
      title: "Cinematic Training Videos from the RMA Channel",
      description: "Explore modern martial arts lesson previews, real-world defense drills, and myth-busting fight analysis.",
      live: "LIVE",
      runtimeLabel: "Duration",
      watchPreview: "Watch Preview",
      play: "Play",
      videos: [
        {
          title: "RMA Fight Breakdown: Real Impact Training",
          channel: "RMA Federation",
          runtime: "12:34",
        },
        {
          title: "Discipline & Defense: Night Training Session",
          channel: "RMA Insights",
          runtime: "9:18",
        },
        {
          title: "Myth-Busting Martial Arts Techniques",
          channel: "RMA Academy",
          runtime: "10:52",
        },
      ],
    },
    trainers: {
      badge: "Coach Profiles",
      title: "Professional Trainers Built on Authentic Combat",
      description: "Meet the coaches leading our federation—each profile blends real fighting experience with elite certifications and training excellence.",
      profiles: [
        {
          name: "Master Akira Sato",
          role: "Head Combat Coach",
          description: "A relentless practitioner of realistic combat systems, guiding fighters through authentic preparation and disciplined development.",
          stats: [
            { label: "Years Training", value: "18" },
            { label: "Certified Students", value: "1.2k" },
            { label: "Elite Certifications", value: "9" },
          ],
          certifications: ["ISMA Level 3", "Krav Maga Pro", "Defensive Tactics", "Mental Resilience"],
        },
        {
          name: "Coach Lina Torres",
          role: "Defense & Strategy",
          description: "Specializes in defensive systems, tactical awareness, and transforming athletes into confident, adaptable martial artists.",
          stats: [
            { label: "Years Training", value: "14" },
            { label: "Seminars Delivered", value: "280" },
            { label: "Certifications", value: "7" },
          ],
          certifications: ["Women's Defense", "Combat Analytics", "Situational Awareness", "Fight Psychology"],
        },
        {
          name: "Sensei Mateo Cruz",
          role: "Transformation Mentor",
          description: "A mentor who blends technical precision with mindset transformation for fighters who demand real results.",
          stats: [
            { label: "Years Training", value: "20" },
            { label: "Ranked Masters", value: "37" },
            { label: "Academy Awards", value: "12" },
          ],
          certifications: ["Holistic Martial Arts", "Leadership Coaching", "Combat Conditioning", "Ring Control"],
        },
      ],
    },
    news: {
      badge: "Federation Dispatch",
      title: "Latest Martial Arts News",
      description: "Official updates, event highlights, and fighter stories from the World Real Martial Art Federation.",
      items: [
        {
          title: "RMA International Championship 2026",
          description: "The biggest Real Martial Art championship with fighters from multiple countries.",
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "Official Coach Certification",
          description: "New international certification program for coaches and instructors.",
          image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "RMA Youth Development Program",
          description: "Building the next generation of disciplined martial artists worldwide.",
          image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      badgeCard: "Breaking",
      category: "RMA News",
      readMore: "Read More",
    },
    championships: {
      badge: "Event Highlights",
      title: "Upcoming Championships",
      description: "Elite bouts, international events, and real martial arts competitions around the world.",
      events: [
        {
          title: "RMA World Championship",
          location: "Cairo, Egypt",
          date: "March 12, 2026",
          image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "International Fighters Camp",
          location: "Dubai, UAE",
          date: "June 8, 2026",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "RMA Continental League",
          location: "Tokyo, Japan",
          date: "September 21, 2026",
          image: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      button: "Learn More",
      dateLabel: "Date",
      locationLabel: "Location",
    },
    footer: {
      title: "Real Martial Art Federation",
      description: "A cinematic federation built on real training, discipline, and performance.",
      contactTitle: "Contact",
      resourcesTitle: "Resources",
      followTitle: "Follow",
      facebook: "Facebook",
      youtube: "YouTube",
      rights: "All rights reserved.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      news: "الأخبار",
      championships: "البطولات",
      rankings: "التصنيفات",
      media: "الوسائط",
      membership: "العضوية",
      contact: "اتصل بنا",
      languageToggle: "EN",
      openMenu: "افتح القائمة",
      closeMenu: "أغلق القائمة",
    },
    hero: {
      badge: "ثقافة القتال النخبة",
      label: "قتال سينمائي. انضباط حقيقي.",
      title: "الاتحاد العالمي للفنون القتالية الحقيقية",
      tagline: "تدرب كالبطل بأساليب فنون قتالية حديثة، وطاقة سينمائية، وانضباط حقيقي.",
      join: "انضم إلى الاتحاد",
      explore: "استكشف البطولات",
    },
    identity: {
      badge: "فلسفة الاتحاد",
      title: "فنون قتالية موجهة نحو الواقع",
      description: "نؤمن بالقتال العملي، والانضباط الصادق، وعقلية التحول التي تفرق بين القتال الحقيقي والخيال.",
      points: [
        {
          title: "فلسفة قتال واقعية",
          text: "ندرب للقتال الذي يحدث بالفعل، وليس للعرض. كل ضربة ووضعية مصممة لتحقيق نتيجة حقيقية تحت الضغط.",
        },
        {
          title: "الدفاع عن النفس بغاية",
          text: "الفنون القتالية الحقيقية تحميك وتحمي مجتمعك—تعلم الوعي والتحكم والقدرة على الاستجابة بفعالية.",
        },
        {
          title: "كشف أساطير الفنون القتالية المزيفة",
          text: "نفضح الحيل اللامعة والادعاءات الفارغة والأنظمة الفارغة. المهارة الحقيقية تُبنى على الصدق والاستمرارية والعقلية الصحيحة.",
        },
        {
          title: "الانضباط والتحول",
          text: "الإتقان رحلة يومية. يحول الانضباط التدريب إلى نمو، ويضع الح ego, ويحوّل الجسد والعقل والروح.",
        },
        {
          title: "القتال الحقيقي مقابل الخيال",
          text: "هذا ليس تنسيقًا. نركز على العملية والقوة، والفارق الدقيق بين العرض والقدرة الحقيقية على القتال.",
        },
      ],
    },
    youtube: {
      badge: "عرض يوتيوب",
      title: "فيديوهات تدريب سينمائية من قناة الاتحاد",
      description: "استعرض معاينات دروس فنون قتالية حديثة، وتمارين دفاع حقيقي، وتحليلات تكتيكية.",
      live: "مباشر",
      runtimeLabel: "المدة",
      watchPreview: "شاهد المعاينة",
      play: "تشغيل",
      videos: [
        {
          title: "تحليل قتال الاتحاد: تدريب التأثير الحقيقي",
          channel: "اتحاد RMA",
          runtime: "12:34",
        },
        {
          title: "الانضباط والدفاع: تدريب ليلي",
          channel: "رؤى RMA",
          runtime: "9:18",
        },
        {
          title: "كشف أساطير تقنيات الفنون القتالية",
          channel: "أكاديمية RMA",
          runtime: "10:52",
        },
      ],
    },
    trainers: {
      badge: "ملفات المدربين",
      title: "مدربون محترفون مبنيون على القتال الحقيقي",
      description: "التقِ بالمدربين الذين يقودون اتحادنا—كل ملف يجمع بين خبرة القتال الحقيقية والشهادات المميزة.",
      profiles: [
        {
          name: "الأستاذ أكيرا ساتو",
          role: "المدرب الرئيسي",
          description: "ممارس حقيقي لأنظمة القتال الواقعي، يقود المقاتلين إلى التحضير الأصلي والتطوير المنضبط.",
          stats: [
            { label: "سنوات التدريب", value: "18" },
            { label: "الطلاب المعتمدون", value: "1.2 ألف" },
            { label: "شهادات النخبة", value: "9" },
          ],
          certifications: ["ISMA مستوى 3", "كراف ماغا برو", "تكتيكات دفاعية", "المرونة الذهنية"],
        },
        {
          name: "المدربة لينا توريس",
          role: "الدفاع والاستراتيجية",
          description: "متخصصة في أنظمة الدفاع والوعي التكتيكي، وتحويل الرياضيين إلى مقاتلين واثقين.",
          stats: [
            { label: "سنوات التدريب", value: "14" },
            { label: "الندوات", value: "280" },
            { label: "الشهادات", value: "7" },
          ],
          certifications: ["دفاع المرأة", "تحليل القتال", "الوعي الموقفي", "علم نفس القتال"],
        },
        {
          name: "سينسي ماتييو كروز",
          role: "مرشد التحول",
          description: "مرشد يجمع الدقة التقنية مع عقلية التحول للمقاتلين الذين يطلبون نتائج حقيقية.",
          stats: [
            { label: "سنوات التدريب", value: "20" },
            { label: "المدرّبين المصنّفين", value: "37" },
            { label: "جوائز الأكاديمية", value: "12" },
          ],
          certifications: ["الفنون القتالية الشاملة", "تدريب القيادة", "تكييف القتال", "التحكم في الحلبة"],
        },
      ],
    },
    news: {
      badge: "تغريدة الاتحاد",
      title: "أحدث أخبار الفنون القتالية",
      description: "التحديثات الرسمية، أبرز الأحداث، وقصص المقاتلين من الاتحاد العالمي للفنون القتالية الحقيقية.",
      items: [
        {
          title: "بطولة RMA الدولية 2026",
          description: "أكبر بطولة للفنون القتالية الحقيقية بمقاتلين من عدة دول.",
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "شهادة المدربين الرسمية",
          description: "برنامج شهادة دولي جديد للمدربين والمدربات.",
          image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "برنامج تطوير الشباب RMA",
          description: "نبني الجيل القادم من الفنانين القتاليين المنضبطين حول العالم.",
          image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      badgeCard: "عاجل",
      category: "أخبار RMA",
      readMore: "اقرأ المزيد",
    },
    championships: {
      badge: "أبرز الأحداث",
      title: "البطولات القادمة",
      description: "المباريات النخبوية، الفعاليات الدولية، والمنافسات الحقيقية في عالم الفنون القتالية.",
      events: [
        {
          title: "بطولة العالم RMA",
          location: "القاهرة، مصر",
          date: "12 مارس 2026",
          image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "معسكر المقاتلين الدولي",
          location: "دبي، الإمارات",
          date: "8 يونيو 2026",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop",
        },
        {
          title: "دوري القارات RMA",
          location: "طوكيو، اليابان",
          date: "21 سبتمبر 2026",
          image: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=2070&auto=format&fit=crop",
        },
      ],
      button: "تعرف على المزيد",
      dateLabel: "التاريخ",
      locationLabel: "الموقع",
    },
    footer: {
      title: "الاتحاد العالمي للفنون القتالية الحقيقية",
      description: "اتحاد سينمائي مبني على التدريب الحقيقي، الانضباط، والأداء.",
      contactTitle: "اتصل",
      resourcesTitle: "الموارد",
      followTitle: "تابعنا",
      facebook: "فيسبوك",
      youtube: "يوتيوب",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export type Translations = typeof translations;
