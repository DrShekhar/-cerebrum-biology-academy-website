import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('biology-tuition-east-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-tuition-east-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-tuition-east-delhi`,
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
      <DelhiAreaSchema pageSlug="biology-tuition-east-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
