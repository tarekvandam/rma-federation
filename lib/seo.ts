import { Metadata } from 'next';

const siteUrl = 'https://rma-federation.org';
const defaultImage = `${siteUrl}/images/hero.jpg`;
const logoImage = `${siteUrl}/images/logo.png`;

export const siteMetadata = {
  title: 'World Real Martial Art Federation',
  shortTitle: 'RMA Federation',
  description:
    'Official platform of the World Real Martial Art Federation (RMA). Join a global community dedicated to real combat, self-defense, discipline, and championship-level martial arts training. Programs in boxing, kickboxing, Muay Thai, MMA, Jiu-Jitsu, Karate, Taekwondo, Krav Maga, and more.',
  arDescription:
    'المنصة الرسمية للاتحاد العالمي للفنون القتالية الحقيقية (RMA). انضم إلى مجتمع عالمي مكرس للقتال الحقيقي، الدفاع عن النفس، الانضباط، والتدريب القتالي على مستوى البطولة.',
  url: siteUrl,
  keywords: [
    'real martial art', 'RMA federation', 'martial arts', 'self defense', 'combat sports',
    'boxing', 'kickboxing', 'Muay Thai', 'MMA', 'mixed martial arts', 'Brazilian Jiu-Jitsu',
    'Karate', 'Taekwondo', 'Judo', 'Krav Maga', 'Kung Fu', 'Wrestling',
    'martial arts training', 'self defense classes', 'fight training',
    'martial arts federation', 'world martial arts', 'international martial arts',
    'combat training', 'fighting techniques', 'martial arts near me',
    'martial arts academy', 'martial arts gym', 'learn martial arts online',
    'Tarek Sayed Ibrahim', 'martial arts Egypt', 'RMA champions',
    'martial arts belts', 'belt ranking system', 'martial arts promotion',
    'MMA training', 'kickboxing training', 'boxing training',
    'martial arts for beginners', 'advanced martial arts', 'martial arts competition',
    'martial arts tournament', 'fighting championship', 'martial arts news',
    'real combat training', 'practical self defense', 'street defense techniques',
    'martial arts discipline', 'martial arts philosophy',
    'فنون قتالية', 'دفاع عن النفس', 'اتحاد فنون قتالية', 'ملاكمة', 'كيك بوكسينغ',
    'مواي تاي', 'جيو جيتسو', 'كاراتيه', 'تايكوندو', 'جودو',
  ],
  author: 'Tarek Sayed Ibrahim — World Real Martial Art Federation',
  image: defaultImage,
  logo: logoImage,
  sameAs: [
    'https://www.facebook.com/tarekninjateam',
    'https://www.youtube.com/@tarekvandam',
  ],
  phone: '+20 100 190 4418',
  email: 'realmartialartrma@gmail.com',
  founded: 2013,
  founder: 'Tarek Sayed Ibrahim',
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsOrganization',
        name: siteMetadata.title,
        alternateName: 'RMA Federation',
        description: siteMetadata.description,
        url: siteMetadata.url,
        logo: siteMetadata.logo,
        image: siteMetadata.image,
        sameAs: siteMetadata.sameAs,
        foundingDate: '2013',
        founder: {
          '@type': 'Person',
          name: 'Tarek Sayed Ibrahim',
          jobTitle: 'Founder & Head Coach',
          url: siteMetadata.url,
          sameAs: siteMetadata.sameAs,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: siteMetadata.phone,
            email: siteMetadata.email,
            availableLanguage: ['English', 'Arabic'],
          },
        ],
        sport: ['MartialArts', 'Boxing', 'Kickboxing', 'MuayThai', 'MixedMartialArts', 'JiuJitsu', 'Karate', 'Taekwondo', 'Judo', 'KravMaga', 'SelfDefense'],
        areaServed: 'Worldwide',
        knowsAbout: [
          'Martial Arts', 'Self Defense', 'Combat Sports', 'Boxing', 'Kickboxing', 'MMA',
          'Muay Thai', 'Brazilian Jiu-Jitsu', 'Karate', 'Taekwondo', 'Judo', 'Krav Maga',
        ],
      },
      {
        '@type': 'WebSite',
        name: siteMetadata.title,
        alternateName: siteMetadata.shortTitle,
        url: siteMetadata.url,
        description: siteMetadata.description,
        inLanguage: ['en', 'ar'],
        publisher: {
          '@type': 'Organization',
          name: siteMetadata.title,
          url: siteMetadata.url,
          logo: siteMetadata.logo,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteMetadata.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export const generateMetadata = (pageTitle?: string, pageDescription?: string, arPageDescription?: string, fullTitle?: string): Metadata => {
  const title = fullTitle || (pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title);
  const description = pageDescription || siteMetadata.description;

  return {
    title,
    description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    metadataBase: new URL(siteMetadata.url),
    alternates: {
      canonical: siteMetadata.url,
      languages: {
        'x-default': siteMetadata.url,
        'en': siteMetadata.url,
        'ar': siteMetadata.url,
      },
    },
    openGraph: {
      title,
      description,
      url: siteMetadata.url,
      siteName: siteMetadata.title,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: siteMetadata.image,
          alt: 'RMA Federation martial arts training and championship action',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteMetadata.image],
      creator: '@tarekvandam',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'zxiKr2lYoKAKPNj3ojEM6kug7MPdE4tpweAUodEVmfE',
    },
  };
};
