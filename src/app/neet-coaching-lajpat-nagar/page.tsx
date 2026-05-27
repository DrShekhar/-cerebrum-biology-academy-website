import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('lajpat-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching lajpat nagar',
    'biology coaching lajpat nagar delhi',
    'NEET classes lajpat nagar',
    'NEET preparation near lajpat nagar',
    'best biology tutor lajpat nagar',
    'medical entrance coaching lajpat nagar',
    'NEET coaching near central market',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lajpat-nagar',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lajpat-nagar',
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function NEETCoachingLajpatNagarPage() {
  return <CityHubPage data={cityData} />
}
