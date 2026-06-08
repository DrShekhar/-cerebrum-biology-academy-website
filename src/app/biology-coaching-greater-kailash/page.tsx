import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('greater-kailash')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching greater kailash',
    'NEET coaching GK',
    'biology tuition GK delhi',
    'medical coaching greater kailash',
    'NEET preparation greater kailash',
    'biology classes GK south delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-greater-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-greater-kailash',
  },
  robots: { index: true, follow: true },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyCoachingGreaterKailash() {
  return <CityHubPage data={cityData} />
}
