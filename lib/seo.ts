import { Metadata } from 'next';

const defaultImage = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop';

export const siteMetadata = {
  title: 'World Real Martial Art Federation',
  description:
    'The official platform for the World Real Martial Art Federation. Join our global community for real combat, discipline, and training in martial arts and self-defense.',
  url: 'https://rma-federation.org',
  keywords: ['martial arts', 'self-defense', 'combat sports', 'fitness', 'real martial art', 'martial arts federation', 'self defense', 'combat training'],
  author: 'World Real Martial Art Federation',
  image: defaultImage,
  sameAs: [
    'https://www.facebook.com/tarekninjateam',
    'https://www.youtube.com/@tarekvandam',
  ],
};

export const generateMetadata = (pageTitle?: string, pageDescription?: string): Metadata => {
  const title = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title;
  const description = pageDescription || siteMetadata.description;

  return {
    title,
    description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    openGraph: {
      title,
      description,
      url: siteMetadata.url,
      siteName: siteMetadata.title,
      type: 'website',
      images: [
        {
          url: siteMetadata.image,
          alt: 'Martial arts training and championship action',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteMetadata.image],
    },
    metadataBase: new URL(siteMetadata.url),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
};
