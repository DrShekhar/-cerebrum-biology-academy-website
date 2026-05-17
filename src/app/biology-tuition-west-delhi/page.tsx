import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('biology-tuition-west-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-tuition-west-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-tuition-west-delhi`,
  },
}

export default function Page() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-tuition-west-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
