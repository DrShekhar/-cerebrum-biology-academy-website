import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'

const cityData = getCityData('board-exam-biology-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/board-exam-biology-delhi`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/board-exam-biology-delhi`,
  },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <DelhiAreaSchema pageSlug="board-exam-biology-delhi" />
      <CityHubPage data={cityData} />
    </>
  )
}
