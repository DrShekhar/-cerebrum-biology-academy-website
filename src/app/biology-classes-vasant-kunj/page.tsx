import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('vasant-kunj')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in vasant kunj',
    'biology coaching vasant kunj delhi',
    'neet biology classes vasant kunj',
    'best biology tuition vasant kunj',
    'biology classes south delhi',
    'biology coaching saket',
    'class 11 biology tuition vasant kunj',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-vasant-kunj`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-vasant-kunj',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyClassesVasantKunjPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-classes-vasant-kunj" subArea="Vasant Kunj" />
      <CityHubPage data={cityData} />
    </>
  )
}
