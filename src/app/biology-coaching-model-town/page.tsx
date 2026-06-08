import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('model-town')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching model town',
    'NEET coaching model town delhi',
    'biology tuition model town north delhi',
    'medical coaching model town',
    'NEET preparation model town',
    'biology classes north delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-model-town',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-model-town',
  },
  robots: { index: true, follow: true },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyCoachingModelTown() {
  return <CityHubPage data={cityData} />
}
