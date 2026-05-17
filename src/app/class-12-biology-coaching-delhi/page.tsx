import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('class-12-biology-coaching-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/class-12-biology-coaching-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/class-12-biology-coaching-delhi`,
  },
}

export default function Page() {
  return (
    <>
      <DelhiAreaSchema pageSlug="class-12-biology-coaching-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
