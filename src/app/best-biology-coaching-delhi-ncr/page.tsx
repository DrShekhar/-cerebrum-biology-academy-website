import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('best-biology-coaching-delhi-ncr')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/best-biology-coaching-delhi-ncr`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/best-biology-coaching-delhi-ncr`,
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
      <DelhiAreaSchema pageSlug="best-biology-coaching-delhi-ncr" />
      <CityHubPage data={cityData} />
    </>
  )
}
