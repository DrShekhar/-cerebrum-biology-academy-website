import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('biology-classes-north-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-north-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-classes-north-delhi`,
  },
}

export default function Page() {
  return (
    <>
      <DelhiAreaSchema pageSlug="biology-classes-north-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
