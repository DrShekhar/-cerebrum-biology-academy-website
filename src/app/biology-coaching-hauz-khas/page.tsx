import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching hauz khas',
    'NEET preparation hauz khas',
    'biology tuition hauz khas delhi',
    'medical coaching hauz khas',
    'NEET coaching hauz khas',
    'biology classes south delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-hauz-khas',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-hauz-khas',
  },
  robots: { index: true, follow: true },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function BiologyCoachingHauzKhas() {
  return <CityHubPage data={cityData} />
}
