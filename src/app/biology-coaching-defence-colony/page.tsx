import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('defence-colony')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology coaching defence colony',
    'NEET coaching defence colony delhi',
    'biology tuition defence colony',
    'medical coaching south delhi',
    'NEET preparation defence colony',
    'biology classes defence colony',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-defence-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-defence-colony',
  },
  robots: { index: true, follow: true },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyCoachingDefenceColony() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-coaching-defence-colony" subArea="Defence Colony" />
      <CityHubPage data={cityData} />
    </>
  )
}
