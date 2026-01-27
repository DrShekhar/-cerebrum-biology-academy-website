import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('how-to-prepare-for-neet-in-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'how to prepare for neet in gurugram',
    'neet preparation tips gurugram',
    'neet study plan gurugram',
    'neet preparation guide gurgaon',
    'how to crack neet gurugram',
    'neet preparation strategy',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
}

export default function HowToPrepareForNEETInGurugramPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Prepare for NEET in Gurugram - Complete Guide 2026',
    description: cityData.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
    datePublished: '2025-01-01',
    dateModified: '2026-01-27',
    mainEntityOfPage: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CityHubPage data={cityData} />
    </>
  )
}
