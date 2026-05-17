import Script from "next/script";
import Hero from "../components/Hero";
import IdentitySection from "../components/IdentitySection";
import YouTubeShowcase from "../components/YouTubeShowcase";
import TrainerProfiles from "../components/TrainerProfiles";
import NewsSection from "../components/NewsSection";
import Championships from "../components/Championships";

import { generateMetadata, siteMetadata } from "@/lib/seo";

export const metadata = generateMetadata();

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SportsOrganization',
      name: siteMetadata.title,
      description: siteMetadata.description,
      url: siteMetadata.url,
      logo: `${siteMetadata.url}/images/logo.png`,
      sameAs: siteMetadata.sameAs,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+20 100 190 4418',
          email: 'realmartialartrma@gmail.com',
        },
      ],
      sport: 'MartialArts',
      areaServed: 'Worldwide',
    },
    {
      '@type': 'WebSite',
      name: siteMetadata.title,
      url: siteMetadata.url,
      description: siteMetadata.description,
      publisher: {
        '@type': 'Organization',
        name: siteMetadata.title,
        url: siteMetadata.url,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schema)}
      </Script>
      <main className="bg-black min-h-screen text-white">
        <Hero />
        <IdentitySection />
        <YouTubeShowcase />
        <TrainerProfiles />
        <NewsSection />
        <Championships />
      </main>
    </>
  );
}
