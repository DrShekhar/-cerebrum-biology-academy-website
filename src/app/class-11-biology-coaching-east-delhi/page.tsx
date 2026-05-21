import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('class-11-biology-coaching-east-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-east-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-11-biology-coaching-east-delhi`,
  },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <DelhiAreaSchema pageSlug="class-11-biology-coaching-east-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
