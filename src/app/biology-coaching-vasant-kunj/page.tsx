import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('vasant-kunj')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching vasant kunj',
    'NEET coaching vasant kunj',
    'biology classes vasant kunj delhi',
    'medical coaching vasant kunj',
    'NEET preparation vasant kunj',
    'biology tuition south delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-kunj',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-kunj',
  },
  robots: { index: true, follow: true },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyCoachingVasantKunj() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-coaching-vasant-kunj" subArea="Vasant Kunj" />
      <CityHubPage data={cityData} />
    </>
  )
}
