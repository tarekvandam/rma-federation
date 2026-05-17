import { Metadata } from 'next';

export const siteMetadata = {
  title: 'World Real Martial Art Federation',
  description: 'The official platform for the World Real Martial Art Federation. Join our global community for real combat, discipline, and training in martial arts.',
  url: 'https://rma-federation.org',
  keywords: ['martial arts', 'self-defense', 'combat sports', 'fitness', 'real martial art', 'martial arts federation'],
  author: 'World Real Martial Art Federation',
};

export const generateMetadata = (pageTitle?: string, pageDescription?: string): Metadata => {
  const title = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title;
  const description = pageDescription || siteMetadata.description;

  return {
    title,
    description,
    keywords: siteMetadata.keywords,
    openGraph: {
      title,
      description,
      url: siteMetadata.url,
      siteName: siteMetadata.title,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};
