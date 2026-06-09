import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('cr-park')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in cr park',
    'biology coaching chittaranjan park',
    'neet biology classes cr park',
    'best biology tuition cr park',
    'biology classes south delhi',
    'biology coaching kalkaji',
    'class 11 biology tuition cr park',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Image — Cerebrum Biology Academy' }],
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-cr-park`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-cr-park',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function BiologyClassesCRParkPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-classes-cr-park" subArea="CR Park" />
      <CityHubPage data={cityData} />
    </>
  )
}
