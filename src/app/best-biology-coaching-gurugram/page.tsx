import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const cityData = getCityData('best-biology-coaching-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/best-biology-coaching-gurugram`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/best-biology-coaching-gurugram`,
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: cityData.metaTitle,
    description: cityData.metaDescription,
  },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="best-biology-coaching-gurugram" />
      <CityHubPage data={cityData} />
    </>
  )
}
